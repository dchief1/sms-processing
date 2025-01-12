import { NextFunction, Request, Response } from "express";

export type Controller = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => Promise<any>;
