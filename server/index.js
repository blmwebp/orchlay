
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_URL =process.env.FRONTEND_URL || "http://localhost:5173";

/* ==========================================
   MIDDLEWARE
========================================== */

app.use(
  cors({
    origin: FRONTEND_URL || "https://blm-orchlay.vercel.app",
    methods: ["POST", "GET"],
  })
);

app.use(express.json({ limit: "16kb" }));

/* Limit repeated submissions */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries. Please try again later.",
  },
});

/* ==========================================
   GMAIL SMTP TRANSPORTER
========================================== */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),

  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* ========================================
   MICROSOFT OAUTH 2.0 ACCESS TOKEN
======================================== */

// async function getMicrosoftAccessToken() {
//   const {
//     AZURE_TENANT_ID,
//     AZURE_CLIENT_ID,
//     AZURE_CLIENT_SECRET,
//   } = process.env;

//   const tokenUrl =
//     `https://login.microsoftonline.com/` +
//     `${AZURE_TENANT_ID}/oauth2/v2.0/token`;

//   const body = new URLSearchParams({
//     client_id: AZURE_CLIENT_ID,
//     client_secret: AZURE_CLIENT_SECRET,
//     scope: "https://graph.microsoft.com/.default",
//     grant_type: "client_credentials",
//   });

//   const response = await fetch(tokenUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body,
//   });

//   const result = await response.json();

//     if (!response.ok || !result.access_token) {
//         console.error("Microsoft OAuth Error:", {
//             status: response.status,
//             error: result.error,
//             description: result.error_description,
//             errorCodes: result.error_codes,
//         });

//         throw new Error(
//             "Microsoft authentication failed. Check backend logs."
//         );
//     }

//   return result.access_token;
// }

/* ========================================
   SEND EMAIL USING SMTP GMAIL
======================================== */

async function sendContactEmail(enquiry) {
  const {
    name,
    email,
    company,
    country,
    interest,
    message,
  } = enquiry;

  const emailBody = `
NEW WEBSITE ENQUIRY — ORCHLAY SOLUTIONS

A new enquiry has been submitted through
the Orchlay Solutions website.

----------------------------------------

CUSTOMER DETAILS

Name:
${name}

Email:
${email}

Company:
${company || "Not provided"}

Country:
${country || "Not provided"}

Area of Interest:
${interest}

----------------------------------------

CUSTOMER MESSAGE

${message}

----------------------------------------

Submitted through the Orchlay Solutions website.

You can reply directly to this email
to contact the customer.
  `.trim();

  const mailOptions = {
    from: {
      name: "Orchlay Website Enquiries",
      address: process.env.SMTP_FROM,
    },

    // Fixed client email
    to: process.env.CONTACT_RECEIVER,

    // Reply directly to customer
    replyTo: {
      name,
      address: email,
    },

    subject: "New Enquiry | Orchlay Solutions",

    text: emailBody,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Enquiry accepted by SMTP:", {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  });

  return info;
}

/* ==========================================
   HELPERS
========================================== */

const clean = (value, maxLength = 200) => {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
  email.length <= 254;

/* ==========================================
   CONTACT FORM API
========================================== */

app.post(
  "/api/contact",
  contactLimiter,
  async (req, res) => {
    try {
      const {
        name,
        email,
        company,
        country,
        interest,
        message,
      } = req.body || {};

      const enquiry = {
        name: clean(name, 100),
        email: clean(email, 254),
        company: clean(company, 150),
        country: clean(country, 100),
        interest: clean(interest, 150),
        message: clean(message, 5000),
      };

      /* Validation */
      if (
        !enquiry.name ||
        !isValidEmail(enquiry.email) ||
        !enquiry.interest ||
        !enquiry.message
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please complete all required fields with valid details.",
        });
      }

      /* Send email */
      await sendContactEmail(enquiry);

      /* Success response */
      return res.status(200).json({
        success: true,
        message:
          "Thank you! Your enquiry has been submitted successfully.",
      });

    } catch (error) {
      console.error("Contact email failed:", error);

      return res.status(500).json({
        success: false,
        message:
          "We couldn't send your enquiry right now. Please try again later.",
      });
    }
  }
);

/* ==========================================
   HEALTH CHECK
========================================== */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Orchlay contact API is running",
  });
});

/* ==========================================
   START SERVER
========================================== */

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
  "CONTACT_RECEIVER",
];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key]
);

// if (missingEnv.length > 0) {
//   console.error(
//     `Missing SMTP configuration: ${missingEnv.join(", ")}`
//   );
//   process.exit(1);
// }

app.listen(PORT, () => {
  console.log(`Orchlay API running on port ${PORT}`);
});
