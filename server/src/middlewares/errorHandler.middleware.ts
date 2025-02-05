/** @format */

import { Logger } from "../utils";
import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logger.error(err);

  res.status(500).json({
    type: "Internal Server Error!",
    ok: false,
    message: err.message,
    code: err.code,
  });
};
