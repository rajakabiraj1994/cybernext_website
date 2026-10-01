/**
 * ============================================================
 *  CYBERNEXT 2026 — site settings
 *  Edit this one file to update event details or connect
 *  the registration backend. Rebuild after changing it.
 * ============================================================
 */

export const EVENT = {
  name: "CYBERNEXT 2026",
  theme: "Beyond Compliance",
  pillars: ["Cybersecurity", "Privacy", "Resilience", "Digital Trust"],
  campaign: "Celebrating Cybersecurity Awareness Month 2026",
  dateLabel: "9th October 2026",
  timeLabel: "5:00 p.m. – 9:00 p.m.",
  venue: "Hotel Altair",
  city: "Kolkata",
  format: "By Invitation Only",
  audience: "75+",
  /** Event start, used for the countdown (IST). */
  startsAt: "2026-10-09T17:00:00+05:30",
  website: "https://www.cybernext.co.in",
};

/**
 * REGISTRATION BACKEND
 * --------------------
 * Option A — your own API: set REGISTRATION_ENDPOINT to a URL that accepts
 *   a POST with a JSON body:
 *   { fullName, designation, organisation, email, phone, industry, consent, submittedAt }
 *   Any 2xx response is treated as success.
 *
 * Option B — an external form (Google Forms, Typeform, HubSpot, etc.):
 *   set EXTERNAL_REGISTRATION_URL. Every "Request an invitation" button
 *   will then open that link instead of the on-page form.
 *
 * Leave both empty and the form shows a friendly "opening shortly" notice
 * instead of pretending to submit.
 */
export const REGISTRATION_ENDPOINT = "";
export const EXTERNAL_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSciwZbIYstyfAJo1YsKenEf_5xqQriprhpUGxW9NB7M201X4g/viewform";

export const CONTACTS = [
  { name: "Raja Kabiraj", phone: "+91 9748949393", email: "raja.kabiraj@intglobal.com" },
  { name: "Sushobhan Mukherjee", phone: "+91 9830017040", email: "smukherjee@primeinfoserv.com" },
];

/**
 * ANNOUNCEMENT BAR — a thin strip at the very top of the site.
 * Set show: true to display it. link is optional ("" for none).
 * Example: { show: true, text: "Registrations are now open", link: "/register", linkText: "Register" }
 */
export const ANNOUNCEMENT = {
  show: false,
  text: "",
  link: "",
  linkText: "",
};

/**
 * SPEAKERS — leave the list empty to show the "Coming soon" cards.
 * To add a speaker, copy one block, fill it in, and keep the comma between blocks.
 * photo: upload the image to public/img/speakers/ and write its file name here,
 *        e.g. "/img/speakers/firstname-lastname.jpg" (portrait, about 800 × 1000 px).
 *        Leave photo as "" to show a neutral placeholder instead.
 *
 * Example:
 *   { name: "Firstname Lastname", designation: "Chief Information Security Officer", organisation: "Company Name", photo: "/img/speakers/firstname-lastname.jpg" },
 */
export const SPEAKERS: { name: string; designation: string; organisation: string; photo: string }[] = [
];
