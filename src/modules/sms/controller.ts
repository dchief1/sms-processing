import { StatusCodes } from "http-status-codes";
import { sendSMSRequest, processTransactionEvent, pollQueue } from "./service";
import { Controller } from "../../utils/constant";
import { smsDto, transactionDto } from "./validator";
import { validateRequest } from "../../middleware/validation";

export const sendSMS: Controller = async (req, res, next) => {
  validateRequest(smsDto)(req, res, async () => {
    try {
      res.status(StatusCodes.CREATED).json(await sendSMSRequest(req.body));
    } catch (error) {
      next(error);
    }
  });
};

export const handleTransactionEvent: Controller = async (req, res, next) => {
  validateRequest(transactionDto)(req, res, async () => {
    try {
      const { amount, phoneNumber } = req.body;

      res.status(StatusCodes.OK).json(await processTransactionEvent(amount, phoneNumber));
    } catch (error) {
      next(error);
    }
  });
};

export const pollQueueHandler: Controller = async (req, res, next) => {
  try {
    await pollQueue();
    res.status(StatusCodes.OK).json({ success: true, message: "Queue processing started" });
  } catch (error) {
    next(error);
  }
};
