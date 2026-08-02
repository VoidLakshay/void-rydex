import nodemailer from "nodemailer";

export const sendMail = async ({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Nodemailer transport verified: ", testResult);
  } catch (error) {
    console.error("Error verifying nodemailer transport: ", error);
    return null;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("Email sent successfully: ", sendResult);
    return sendResult;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
};
