import express from "express";
import * as controller from "./controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/sms/send:
 *   post:
 *     summary: Send an SMS
 *     tags: [SMS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 default: "+234-903-500-4810"
 *               message:
 *                 type: string
 *                 default: "Your transaction was successful!"
 *     responses:
 *       200:
 *         description: SMS sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.route("/send").post(controller.sendSMS);

/**
 * @swagger
 * /api/v1/sms/transaction:
 *   post:
 *     summary: Handle a transaction event
 *     tags: [SMS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 default: "+234-903-500-4810"
 *               amount:
 *                 type: number
 *                 default: 100
 *     responses:
 *       200:
 *         description: Transaction event processed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.route("/transaction").post(controller.handleTransactionEvent);

/**
 * @swagger
 * /api/v1/sms/poll:
 *   get:
 *     summary: Poll messages from the SMS queue
 *     tags: [SMS]
 *     responses:
 *       200:
 *         description: Queue processed successfully
 *       500:
 *         description: Server error
 */
router.route("/poll").get(controller.pollQueueHandler);

export default router;
