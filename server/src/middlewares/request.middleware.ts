import { Request, Response, NextFunction } from "express";

import { Logger } from "../utils";
import { validateIp } from "../utils/ipValidator";
// import { clientInspector } from "valid-ip-scope"; -- Library is causing deployment to fail on vercel
import "dotenv/config";

const formatRequestData = (req: Request) => ({
  url: `${req.protocol}://${req.hostname ?? "localhost"}:${process.env.port}${
    req.url
  }`,
  params: req.params,
  query: req.query,
  body: req.body,
});

export const routeMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.path === "/health") {
      return next();
    }

    // Skip logging if running tests
    if (process.env.NODE_ENV == "test") {
      return next();
    }
    const ipValidation = validateIp(req.ip);
    // const clientInfo = ipValidation.isValid
    //   ? await clientInspector(req)
    //   : { error: ipValidation.reason };

    Logger.group({
      title: "New Request",
      descriptions: [
        { description: "URL", info: formatRequestData(req).url },
        { description: "PARAMS", info: formatRequestData(req).params },
        { description: "QUERY", info: formatRequestData(req).query },
        {
          description: "BODY",
          info: JSON.stringify(formatRequestData(req).body, null, 2),
        },
        {
          description: "CLIENTINFO",
          // info: JSON.stringify(clientInfo, null, 2),
        },
      ],
    });

    next();
  } catch (error) {
    Logger.error("Route middleware error:", error);
    next(error);
  }
};
