import { Router } from "express";
import SmsRoute from "../modules/sms/index";

export const PREFIXES = {
  API: "/api/v1/",
};

const route = Router();

const Sms = `/sms`;

route.use(Sms, SmsRoute);

export default route;
