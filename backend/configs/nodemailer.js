import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email, name) => {
  try {
    const htmlContent = `
    <div style="background: #f3f4f6; padding: 20px; font-family: 'Segoe UI', sans-serif;">
      <div style="background: #fff; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
        <img src="https://www.zaycommerce.com/logo.png" alt="ZayCommerce Logo" style="width: 120px; margin-bottom: 20px;" />
        <h2 style="color: #111;">🎉 Welcome to ZayCommerce, ${name}!</h2>
        <p style="font-size: 15px; color: #444;">We’re thrilled to have you join our growing community. Discover unbeatable deals on electronics, fashion, and more – all from trusted sellers across Ethiopia.</p>
        <a href="https://www.zaycommerce.com" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #38ef7d, #11998e); color: #fff; padding: 12px 24px; margin-top: 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">🚀 Start Shopping</a>
        <p style="font-size: 12px; color: #777; margin-top: 25px;">Need help? <a href="mailto:support@zaycommerce.com" style="color: #007BFF; text-decoration: underline;">Contact Support</a></p>
      </div>
    </div>
    `;

    const textContent = `
🎉 Welcome to ZayCommerce, ${name}!

We’re excited to have you join our growing community.

Start exploring unbeatable deals from trusted sellers across Ethiopia.

Click here to start shopping: https://www.zaycommerce.com

Need help? Contact our team at support@zaycommerce.com
    `;

    const info = await transporter.sendMail({
      from: `"support" <${process.env.E_SENDER}>`,
      to: email,
      subject: "Welcome to ZayCommerce 🎉",
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ Welcome email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

export default transporter;
