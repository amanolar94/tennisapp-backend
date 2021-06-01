import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { userRouter } from "./routers/user";
import { tokenGuard } from "./middlewares/tokenGuard";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", userRouter);

// Unprotected Get
app.get("/some-resource", (req, res) => {
  res.json({ response: "Hello World!" });
});
app.use(tokenGuard());

// Protected Get
app.get("/some-protected-resource", (req, res) => {
  res.json("Protected Hello World");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
