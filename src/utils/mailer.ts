const nodemailer = require("nodemailer"); //eslint-disable-line

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
const port = parseInt(process.env.SMTP_PORT);
const host = process.env.SMTP_SERVER;

type MailerProps = { userEmail: string; token: string };

async function mailer({ userEmail, token }: MailerProps) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const html = `<p>To reset your password please follow <a href="localhost:3030/resetPasword?token=${token}">this</a>link</p> `;

  const info = await transporter.sendMail({
    from: '"Tennis App" <aristos.manolarakis@gmail.com>', //eslint-disable-line
    to: userEmail,
    subject: "Reset your password",
    text: `To reset your password please follow this link localhost:3030/resetPasword?token=${token} `,
    html,
  });

  return info;
}

export default mailer;
