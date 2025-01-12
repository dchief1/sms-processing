# SMS Queue Processing with RabbitMQ

This project demonstrates the integration of RabbitMQ for processing SMS notifications. The system calculates transaction profits, enqueues SMS requests to a RabbitMQ queue, and processes those requests to simulate sending SMS messages. Mock SMS messages can also be generated for testing purposes.

## Overview

### Key Features:

1. **Profit Calculation**: The system calculates the profit from a transaction based on a commission rate (3%).
2. **SMS Queueing**: SMS data is sent to RabbitMQ for further processing.
3. **Transaction Event Handling**: After a transaction, an SMS is enqueued with the transaction details, such as the profit.
4. **Queue Polling & SMS Processing**: The system polls the queue to process messages, simulates sending the SMS, and handles deduplication to avoid multiple SMS to the same phone number.

### Process Flow:

1. **Transaction Event**: Upon transaction completion, the profit is calculated, and an SMS is queued with the transaction information.
2. **Queue Polling**: The queue is polled continuously. When messages are received, the system simulates sending SMS (e.g., logs the message to the console).
3. **Deduplication**: To avoid sending multiple SMS to the same phone number, the system keeps track of previously processed phone numbers using a `Set`.

### Mock SMS Generation:

For testing purposes, mock SMS messages are generated to simulate system behavior without actual transactions. This is useful for ensuring the system handles different message types and queue events correctly.

### Dependencies:

- **RabbitMQ**: The project relies on RabbitMQ for message queueing.
- **SMS Sending Simulation**: Instead of actual SMS APIs, SMS messages are simulated by logging to the console.
- **Deduplication**: The system ensures that no SMS is sent to the same phone number multiple times.

### Setup Instructions:

1. Install dependencies using `npm install`.
2. Configure RabbitMQ connection in the `config/rabbitmq.ts` file.
3. Run the application with `npm start`.
4. Use the `processTransactionEvent` and `pollQueue` functions to simulate transactions and queue processing.

---
