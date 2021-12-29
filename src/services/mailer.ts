const nodemailer = require("nodemailer"); //eslint-disable-line

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
const port = parseInt(process.env.SMTP_PORT);
const host = process.env.SMTP_SERVER;

type MailerProps = { userEmail: string; link: string };

async function requestEmailVerification({ userEmail, link }: MailerProps) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const html = `<p>To verify your email please follow <a href="${link}">this</a> link</p> `;

  const info = await transporter.sendMail({
    from: '"Tennis App" <aristos.manolarakis@gmail.com>', //eslint-disable-line
    to: userEmail,
    subject: "Email verification",
    text: `To verify your email please follow this link ${link}`,
    html,
  });

  return info;
}

export default requestEmailVerification;
