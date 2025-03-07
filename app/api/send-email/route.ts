import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "mail1.netim.hosting",
  port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : 465,
  secure: process.env.EMAIL_SERVER_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USERNAME || "info@dbaincomeboost.com",
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Base URL for absolute paths to images
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dbaincomeboost.com"
    const emailFrom = process.env.EMAIL_FROM || "info@dbaincomeboost.com"

    const mailOptions = {
      from: emailFrom,
      to: emailFrom,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Message</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              :root {
                --primary: #2563eb;
                --primary-dark: #1d4ed8;
                --primary-light: #60a5fa;
                --background: #f8fafc;
                --card: #ffffff;
                --foreground: #0f172a;
                --muted: #f1f5f9;
                --accent: #f8fafc;
                --border: #e2e8f0;
              }

              * {
                box-sizing: border-box;
              }

              body {
                font-family: 'Inter', Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: var(--background);
                color: var(--foreground);
              }

              .container {
                max-width: 600px;
                margin: 20px auto;
                background: var(--card);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
              }

              .header {
                background: linear-gradient(135deg, #0f172a, #1e293b);
                padding: 30px 20px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }

              .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="1" height="1" fill="rgba(255,255,255,0.05)"/></svg>');
                opacity: 0.3;
                z-index: 0;
              }

              .header-content {
                position: relative;
                z-index: 1;
              }

              .logo-container {
                margin-bottom: 15px;
                position: relative;
                display: inline-block;
              }

              .logo {
                width: 120px;
                height: auto;
                filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
              }

              .glow {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 150px;
                height: 150px;
                background: radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(96, 165, 250, 0) 70%);
                border-radius: 50%;
                z-index: -1;
              }

              .content {
                padding: 30px;
                background: var(--card);
              }

              .profile-section {
                text-align: center;
                margin: 20px 0;
                padding: 20px;
                background: var(--muted);
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                border: 1px solid var(--border);
              }

              .profile-section::before {
                content: '';
                position: absolute;
                height: 200px;
                width: 200px;
                background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
                opacity: 0.1;
                top: -100px;
                right: -100px;
                border-radius: 100%;
              }

              .profile-image {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                margin-bottom: 15px;
                border: 3px solid white;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
                object-fit: cover;
              }

              .badge {
                display: inline-block;
                background-color: rgba(37, 99, 235, 0.1);
                color: var(--primary);
                font-size: 12px;
                padding: 4px 10px;
                border-radius: 12px;
                border: 1px solid rgba(37, 99, 235, 0.3);
                margin-top: 5px;
              }

              .message-box {
                background: #f8fafc;
                padding: 20px;
                border-radius: 12px;
                margin-top: 25px;
                border: 1px solid var(--border);
                position: relative;
              }

              .message-box::before {
                content: """;
                position: absolute;
                top: 10px;
                left: 15px;
                font-size: 60px;
                color: rgba(37, 99, 235, 0.1);
                font-family: serif;
                line-height: 0;
              }

              .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 25px 0;
              }

              .info-item {
                background-color: var(--muted);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid var(--border);
              }

              .label {
                font-weight: 600;
                color: #334155;
                display: block;
                margin-bottom: 5px;
                font-size: 14px;
              }

              .value {
                font-size: 16px;
                color: var(--foreground);
                word-break: break-word;
              }

              .button-container {
                text-align: center;
                margin-top: 30px;
              }

              .button {
                display: inline-block;
                padding: 12px 24px;
                background: var(--primary);
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 500;
                font-size: 15px;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
              }

              .button:hover {
                background-color: var(--primary-dark);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
              }

              .divider {
                height: 1px;
                background-color: var(--border);
                margin: 30px 0;
                position: relative;
              }

              .divider::after {
                content: '';
                position: absolute;
                height: 5px;
                width: 60px;
                background-color: var(--primary);
                top: -2px;
                left: calc(50% - 30px);
                border-radius: 10px;
              }

              .footer {
                background: #f8fafc;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #64748b;
                border-top: 1px solid var(--border);
              }

              .social-links {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin: 15px 0;
              }

              .social-icon {
                display: inline-block;
                width: 30px;
                height: 30px;
                background-color: #f1f5f9;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                text-decoration: none;
                transition: all 0.2s;
                font-size: 14px;
              }

              .social-icon:hover {
                background-color: var(--primary);
                color: white;
                transform: translateY(-3px);
              }

              .timestamp {
                font-size: 12px;
                color: #94a3b8;
                margin-top: 5px;
              }

              .message-content {
                position: relative;
                padding-left: 10px;
                padding-top: 10px;
                white-space: pre-line;
              }

              @media only screen and (max-width: 600px) {
                .container {
                  margin: 0;
                  border-radius: 0;
                }
                
                .info-grid {
                  grid-template-columns: 1fr;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-content">
                  <div class="logo-container">
                    <div class="glow"></div>
                    <img src="${baseUrl}/logoimage-removebg-preview.png" alt="Digital BOSS Logo" class="logo">
                  </div>
                  <h1 style="margin: 0; font-size: 24px; color: white;">New Message Received</h1>
                  <p style="margin: 8px 0 0; opacity: 0.9; color: #e2e8f0;">Digital BOSS Academy Affiliate Program</p>
                </div>
              </div>
              
              <div class="content">
                <div class="profile-section">
                  <img src="${baseUrl}/Me.jpg" alt="Profile" class="profile-image">
                  <h3 style="margin: 10px 0; color: #0f172a; font-size: 18px;">New Contact Request</h3>
                  <span class="badge">Website Form Submission</span>
                </div>
                
                <div class="info-grid">
                  <div class="info-item">
                    <span class="label">From</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Email</span>
                    <span class="value">${email}</span>
                  </div>
                </div>
                
                <div class="message-box">
                  <span class="label">Message</span>
                  <div class="message-content">${message}</div>
                  <div class="timestamp">Received: ${new Date().toLocaleString()}</div>
                </div>

                <div class="button-container">
                  <a href="mailto:${email}" class="button">Reply to ${name}</a>
                </div>
                
                <div class="divider"></div>
                
                <div style="text-align: center;">
                  <p style="font-size: 14px; color: #64748b;">
                    This message was sent from your affiliate website contact form.<br>
                    <strong style="color: var(--primary);">Digital BOSS Academy</strong> 
                    makes it easy to manage your affiliate marketing business.
                  </p>
                </div>
              </div>

              <div class="footer">
                <div class="social-links">
                  <a href="#" class="social-icon">f</a>
                  <a href="#" class="social-icon">t</a>
                  <a href="#" class="social-icon">in</a>
                </div>
                <p>© ${new Date().getFullYear()} Digital BOSS Academy Affiliate Program</p>
                <p style="margin: 5px 0 0;">
                  <a href="https://www.digitalbossacademy.co" style="color: var(--primary); text-decoration: none;">
                    www.digitalbossacademy.co
                  </a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to send email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}