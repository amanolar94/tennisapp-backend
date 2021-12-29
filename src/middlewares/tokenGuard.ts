import { RequestHandler } from "express";
import { IncomingHttpHeaders } from "http";
import { verifyFirebaseToken } from "services/firebase";

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;
  if (!header) return header;

  return header.split(" ")[1];
}

export const tokenGuard: RequestHandler = async (req, res, next) => {
  const token =
    getTokenFromHeaders(req.headers) || req.query.token || req.body.token || "";
  try {
    //TODO: until the front end is built to obtain a token this is commented out
    // const userInfo = await verifyFirebaseToken(token);
    return next();
  } catch (e) {
    return res
      .status(403)
      .send({ error: "You are not authorised to make this request" });
  }
};
