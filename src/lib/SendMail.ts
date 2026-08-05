import nodemailer from "nodemailer";

/**
 * Utility function to send an email using nodemailer.
 * Configured with standard SMTP options and validates the transport connection.
 * 
 * @param to - The recipient's email address
 * @param name - The recipient's name
 * @param subject - The subject of the email
 * @param body - The HTML content of the email
 */
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
