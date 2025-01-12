import { getRabbitMQChannel } from "../../config/rabbitmq";
import { ISms } from "./type";
import { generateMockSMS } from "./model";

const SMS_QUEUE = "sms_queue";
const processedPhoneNumbers = new Set<string>(); // Deduplication

// Calculate the profit from a transaction
export const calculateProfit = (amount: number): number => {
  const commissionRate = 0.03; // 3% commission
  return amount * commissionRate;
};

// Send SMS to the RabbitMQ queue
export const sendSMSRequest = async (data: ISms) => {
  const channel = getRabbitMQChannel();
  const smsPayload = {
    phoneNumber: data.phoneNumber,
    message: data.message,
    timestamp: new Date().toISOString(),
  };

  channel.sendToQueue(SMS_QUEUE, Buffer.from(JSON.stringify(smsPayload)), {
    persistent: true,
  });

  return {
    success: true,
    message: `SMS request sent for phone number: ${data.phoneNumber}`,
  };
};

// Process transaction event and enqueue SMS notification
export const processTransactionEvent = async (amount: number, phoneNumber: string) => {
  const profit = calculateProfit(amount);
  const message = `Transaction successful! Profit: $${profit.toFixed(2)}`;

  const smsData: ISms = {
    phoneNumber,
    message,
    sentAt: new Date(),
  };

  // Send the transaction SMS request
  await sendSMSRequest(smsData);

  return {
    success: true,
    message: `Processed transaction event for phone number: ${phoneNumber}`,
  };
};

// Poll messages from the SMS queue and send mock SMS
export const pollQueue = async () => {
  const channel = getRabbitMQChannel();

  // Generate mock SMS for testing (for a given count of 10 messages)
  const mockSMSMessages = generateMockSMS(10);

  // Send each mock SMS to the RabbitMQ queue
  mockSMSMessages.forEach(async (sms) => {
    await sendSMSRequest(sms);
  });

  channel.consume(SMS_QUEUE, async (msg) => {
    if (msg) {
      const smsData: ISms = JSON.parse(msg.content.toString());

      try {
        // Deduplication: Skip if already processed
        if (processedPhoneNumbers.has(smsData.phoneNumber)) {
          console.warn(`Skipping duplicate SMS for ${smsData.phoneNumber}`);
          channel.ack(msg); // Acknowledge the message
          return;
        }

        processedPhoneNumbers.add(smsData.phoneNumber);

        console.log(`Sending SMS to ${smsData.phoneNumber}: ${smsData.message}`);

        // Acknowledge the message after successful processing
        channel.ack(msg);
        console.log(`SMS sent successfully to ${smsData.phoneNumber}`);
      } catch (error) {
        console.error(`Failed to process SMS for ${smsData.phoneNumber}:`, error);
        channel.nack(msg, false, true); // Requeue the message
      }
    }
  });
};
