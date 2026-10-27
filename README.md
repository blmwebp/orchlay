# Orchlay Solutions — Single-Page React Website

A responsive, editable React website based on the content in **ORCHLAY SOLUTIONS Website Content.docx**. Its visual direction follows the provided Techtonica single-page reference: deep-purple sections, cyan and violet service tiles, white typography, Open Sans Condensed body text, and a large technology-themed hero illustration.

This is an original implementation for **Orchlay Solutions Pvt Ltd**, not a copy of Techtonica's brand, client claims, or proprietary assets.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local address displayed by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production-ready static files are placed in `dist/`. They can be hosted on Vercel, Netlify, Cloudflare Pages, or any static host with HTTPS. Use `npm run build` as the build command and `dist` as the output folder.

## Where to make changes

```text
orchlay-react/
├── index.html                  SEO and font loading
├── package.json                React and Vite scripts
├── vite.config.js              Build configuration
├── .env.example                Optional contact setup
├── public/assets/
│   ├── hero-tech.svg           Original hero illustration
│   ├── services-scene.svg      Original services illustration
│   └── planning-dashboard.svg  Illustrative planning graphic
└── src/
    ├── main.jsx                React application entry
    ├── App.jsx                 All one-page sections and navigation
    ├── styles.css              Colors, typography and responsiveness
    ├── data/content.js         Service details and Acterys topics
    └── components/
        ├── Icon.jsx            Reusable line icons
        └── ContactForm.jsx     Enquiry form and submission logic
```

- Update copy and service lists in `src/data/content.js` and `src/App.jsx`.
- Change global colors in the CSS variables at the top of `src/styles.css`.
- Swap the temporary text-based Orchlay wordmark inside `Brand` in `App.jsx` for your official logo when available.
- All illustrative graphics are included inside `public/assets`, so no external image host is needed.
- The Google Fonts link in `index.html` loads **Open Sans Condensed**. Helvetica/Arial is used for headings. If the font CDN is unavailable, the site falls back to Arial Narrow/Arial.

## Contact form setup

The supplied content doesn't specify an approved contact email, so the site doesn't invent one.

By default, the enquiry form validates the fields and **copies the formatted enquiry to the visitor's clipboard**. No enquiry is sent or stored by the preview. For a working production form, create `.env` from `.env.example` and set **one** of:

1. `VITE_CONTACT_ENDPOINT=https://your-backend.example/enquiries` — sends form data as JSON in a `POST` request. Your backend must allow the website origin with appropriate CORS rules and return a 2xx response on success. The Vite variable is public client configuration and must not contain secrets.
2. `VITE_CONTACT_EMAIL=you@yourdomain.com` — opens the visitor's email app with the populated enquiry for them to review and send.

If both variables are present, the endpoint takes precedence. For production, use a spam-protected submission service or your own server and include a privacy policy as required.

## Content and design notes

- Reference color tokens: purple `#390959`, cyan `#29B7DD`, violet `#8B72EE`, off-white `#FAFAFA`.
- Main content: Microsoft services, Acterys planning and analytics, delivery experience with organizations in the United States and Australia, About Orchlay, and enquiry form.
- The Acterys graphic is illustrative, not a live dashboard. The page does **not** claim numerical client metrics or display unauthorized client logos.
- Validate any Acterys partnership wording, partner status, and brand usage against the actual agreement before public launch.
- No backend, tracking scripts, cookie banners, or external analytics are included.

## Accessibility and responsiveness

The page uses semantic sections and headings, keyboard-accessible navigation and controls, descriptive form labels, focus states, and reduced-motion support. Layouts adjust for desktop, tablet, and mobile widths.
