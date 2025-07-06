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
    <div style="background-color:#f3f4f6; padding: 0; margin: 0; font-family: 'Segoe UI', sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.05);">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <img src="https://www.zaycommerce.com/logo.png" alt="ZayCommerce Logo" style="width: 120px; margin-bottom: 15px;" />
            <h2 style="font-size: 24px; color: #111111; margin: 10px 0;">🎉 Welcome to ZayCommerce, ${name}!</h2>
            <p style="font-size: 16px; color: #444444; margin: 0 0 20px;">We’re excited to have you in our growing community. Find trusted deals in electronics, fashion, construction materials, and more across Ethiopia.</p>
            <a href="https://www.zaycommerce.com" target="_blank" style="display:inline-block; background: linear-gradient(135deg, #38ef7d, #11998e); color:#fff; text-decoration:none; padding: 14px 28px; border-radius:8px; font-weight:600;">🚀 Start Shopping</a>
            <p style="font-size: 13px; color: #999999; margin-top: 30px;">Need help? <a href="mailto:support@zaycommerce.com" style="color:#007BFF; text-decoration:underline;">Contact our support</a></p>
          </td>
        </tr>
      </table>
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
      from: `ZayCommerce <${process.env.E_SENDER}>`,
      to: email,
      subject: "🎉 Welcome to ZayCommerce – Your Ethiopian Online Store",
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ Welcome email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

export default transporter;
