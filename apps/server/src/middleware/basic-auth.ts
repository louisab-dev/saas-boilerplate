import { NextFunction, Request, Response } from "express";
import { env } from "../env";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  // Get authorization header
  const authHeader = req.headers.authorization;

  // Check if auth header exists and starts with 'Basic '
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }

  // Get credentials
  // @ts-ignore
  const credentials = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const username = credentials[0];
  const password = credentials[1];

  // Check credentials (use environment variables for security)
  if (
    username === env.TRPC_PANEL_USERNAME &&
    password === env.TRPC_PANEL_PASSWORD
  ) {
    next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Invalid credentials");
  }
};
