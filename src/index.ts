import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { authRouter } from "./routers/auth";
import { tokenGuard } from "./middlewares/tokenGuard";
// import { initialize_firebase } from "./services/firebase";

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

// Unprotected Get
app.get("/some-resource", (req, res) => {
  res.json({ response: "Unprotected Hello World!" });
});

app.use(tokenGuard());

// Protected Get
app.get("/some-protected-resource", (req, res) => {
  res.json("Protected Hello World");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
