import app from "./app";
import http from "http";
import swaggerDocs from "./utils/swagger";
import configs from "./config/configs";
import { connectRabbitMQ, setupQueue } from "./config/rabbitmq";

const server = http.createServer(app);

const startServer = async () => {
  try {
    // Connect to RabbitMQ
    console.log("Connecting to RabbitMQ...");
    await connectRabbitMQ();

    // Set up the required queue
    const SMS_QUEUE = "sms_queue";
    console.log(`Setting up RabbitMQ queue: ${SMS_QUEUE}`);
    await setupQueue(SMS_QUEUE);

    // Start the server
    const port = configs.PORT || 3001;
    server.listen(port, () => {
      console.log(`Server up and running, listening on http://localhost:${port}`);
      swaggerDocs(app, port);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();

export default server;
