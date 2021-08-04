const nodemailer = require("nodemailer"); //eslint-disable-line

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
const port = parseInt(process.env.SMTP_PORT);
const host = process.env.SMTP_SERVER;

async function mailer() {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Tennis App" <aristos.manolarakis@gmail.com>', //eslint-disable-line
    to: "aristos.man94@gmail.com",
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  return info;
}

export default mailer;
