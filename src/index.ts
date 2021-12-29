import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { authRouter } from "./routers";
import { appRouter } from "routers";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}
const app = express();
const port = process.env.PORT;
// initialize_firebase();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", authRouter);
app.use("/app", appRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
