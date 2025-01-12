import amqp from "amqplib";

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ on CloudAMQP!");
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    throw error;
  }
};

export const getRabbitMQChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized. Call connectRabbitMQ first.");
  }
  return channel;
};

export const setupQueue = async (queueName: string) => {
  try {
    const ch = getRabbitMQChannel();
    await ch.assertQueue(queueName, { durable: true });
    console.log(`Queue "${queueName}" is ready.`);
  } catch (error) {
    console.error(`Error setting up queue "${queueName}":`, error);
    throw error;
  }
};
