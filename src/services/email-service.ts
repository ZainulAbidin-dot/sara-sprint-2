import ejs from 'ejs';
import nodemailer from 'nodemailer';

import { getEmailTemplatePath } from '@/lib/utils.js';

export class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;
  private emailFrom: string;

  private constructor() {
    const emailUser = process.env.EMAIL_USER as string;
    const emailPassword = process.env.EMAIL_PASSWORD as string;
    const emailPortParsed = process.env.EMAIL_PORT as string;
    const emailHost = process.env.EMAIL_HOST as string;
    const clientUrl = process.env.CLIENT_URL as string;
    const emailFrom = process.env.EMAIL_FROM as string;
    const secure = emailPortParsed === '465';

    this.emailFrom = emailFrom;

    this.transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPortParsed),
      secure: secure,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    } as nodemailer.TransportOptions);
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to,
        subject,
        text,
        html,
      });

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  public async sendOtpEmail({
    name,
    email,
    otp,
  }: {
    name: string;
    email: string;
    otp: string;
  }) {
    const templatePath = getEmailTemplatePath('otp.ejs');

    const html = await ejs.renderFile(templatePath, {
      name,
      otp,
    });

    return this.sendEmail({
      to: email,
      subject: 'You requested an OTP',
      html: html,
    });
  }
}
