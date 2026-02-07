import nodemailer from 'nodemailer';
import { format } from 'date-fns';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates
const templates = {
  'email-verification': (data: any) => ({
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Welcome to Labor Migration Platform</h2>
        <p>Hello ${data.firstName},</p>
        <p>Thank you for registering with our labor migration platform. To complete your registration, please verify your email address using the code below:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin: 0; font-size: 24px;">${data.verificationCode}</h3>
        </div>
        <p>This code will expire in 15 minutes. If you didn't create this account, please ignore this email.</p>
        <p>Best regards,<br>Labor Migration Platform Team</p>
      </div>
    `
  }),

  'password-reset': (data: any) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Password Reset Request</h2>
        <p>Hello ${data.firstName},</p>
        <p>We received a request to reset your password. Use the code below to reset your password:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin: 0; font-size: 24px;">${data.resetCode}</h3>
        </div>
        <p>This code will expire in 1 hour. If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>Labor Migration Platform Team</p>
      </div>
    `
  }),

  'application-status': (data: any) => ({
    subject: 'Application Status Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Application Status Update</h2>
        <p>Hello ${data.firstName},</p>
        <p>Your application status has been updated:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Application ID:</strong> ${data.applicationId}</p>
          <p><strong>New Status:</strong> ${data.status}</p>
          <p><strong>Updated on:</strong> ${format(new Date(data.updatedAt), 'PPP')}</p>
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        </div>
        <p>Please log in to your account to view more details.</p>
        <p>Best regards,<br>Labor Migration Platform Team</p>
      </div>
    `
  }),

  'payment-confirmation': (data: any) => ({
    subject: 'Payment Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Payment Confirmation</h2>
        <p>Hello ${data.firstName},</p>
        <p>Your payment has been processed successfully:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Payment ID:</strong> ${data.paymentId}</p>
          <p><strong>Amount:</strong> ${data.amount}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Date:</strong> ${format(new Date(data.paymentDate), 'PPP')}</p>
        </div>
        <p>Thank you for your payment. You can now proceed with the next steps in your migration process.</p>
        <p>Best regards,<br>Labor Migration Platform Team</p>
      </div>
    `
  }),

  'document-request': (data: any) => ({
    subject: 'Document Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Document Request</h2>
        <p>Hello ${data.firstName},</p>
        <p>We need the following document(s) to proceed with your application:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <ul>
            ${data.documents.map((doc: string) => `<li>${doc}</li>`).join('')}
          </ul>
          <p><strong>Deadline:</strong> ${format(new Date(data.deadline), 'PPP')}</p>
        </div>
        <p>Please upload these documents through your account dashboard.</p>
        <p>Best regards,<br>Labor Migration Platform Team</p>
      </div>
    `
  }),
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log('Email service not configured. Skipping email:', options);
      return;
    }

    const template = templates[options.template as keyof typeof templates];
    if (!template) {
      throw new Error(`Email template '${options.template}' not found`);
    }

    const { subject, html } = template(options.data);

    const info = await transporter.sendMail({
      from: `"Labor Migration Platform" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: subject || options.subject,
      html,
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendSMS = async (phone: string, message: string): Promise<void> => {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('SMS service not configured. Skipping SMS:', { phone, message });
      return;
    }

    // This is a placeholder for Twilio integration
    // In a real implementation, you would integrate with Twilio or similar service
    console.log('SMS would be sent to:', phone, 'Message:', message);
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
};