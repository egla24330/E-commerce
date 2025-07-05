import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Function to send a welcome email
export const sendWelcomeEmail = async (email, name) => {
    try {
       const info = await transporter.sendMail({
  from: process.env.E_SENDER,
  to: email,
  subject: "Welcome to ZayCommerce 🎉",
  html: `
    <div style="background: linear-gradient(135deg, #00c6ff, #0072ff); width: 90%; max-width: 420px; margin: 20px auto; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); font-family: 'Segoe UI', sans-serif; color: #fff; text-align: center;">

      <h2 style="margin: 0 0 10px;">🎉 Welcome to ZayCommerce, ${name}!</h2>

      <p style="font-size: 15px; line-height: 1.6;">
        We’re thrilled to have you join our growing community. Start exploring a wide range of products and exclusive offers made just for you.
      </p>

      <p style="font-size: 13px; margin-top: 12px;">
        Ready to dive in? Your next favorite product is just a click away.
      </p>

      <a href="https://www.zaycommerce.com" target="_blank"
         style="display: inline-block; background: linear-gradient(135deg, #38ef7d, #11998e); padding: 12px 28px; margin-top: 20px; color: #fff; font-weight: bold; font-size: 14px; border-radius: 8px; text-decoration: none; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
        🚀 Start Shopping
      </a>

      <p style="font-size: 11px; margin-top: 24px;">
        Need help? <a href="mailto:support@zaycommerce.com" style="color: #fff; text-decoration: underline;">Contact our support team</a> anytime.
      </p>

      <p style="font-size: 10px; color: #e0e0e0; margin-top: 8px;">
        This message was sent by ZayCommerce. If you did not sign up, please ignore it.
      </p>
    </div>
  `,
});

        // console.log("✅ Welcome email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending welcome email:", error);
    }
};
export default transporter;


