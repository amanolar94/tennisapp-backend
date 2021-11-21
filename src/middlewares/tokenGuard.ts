import { RequestHandler } from "express";
import { IncomingHttpHeaders } from "http";
import { AuthService } from "services/auth";

const authService = new AuthService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;
  if (!header) return header;

  return header.split(" ")[1];
}

export const tokenGuard: () => RequestHandler = () => (req, res, next) => {
  const token =
    getTokenFromHeaders(req.headers) || req.query.token || req.body.token || "";

  const hasAccess = authService.verifyToken(token);

  hasAccess.then((a) => {
    if (!a) return res.status(403).send({ message: "No access" });
    next();
  });
};
