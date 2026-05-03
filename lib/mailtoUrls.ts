/**
 * Canonical mailto: URLs — use plain <a href="..."> only (no JS mail navigation).
 * Subjects use Unicode em dash (—).
 */
const enc = encodeURIComponent;

export const SUBJECT_GENERAL_ENQUIRY = 'General Enquiry — The Rebuild Protocol';
export const SUBJECT_SUPPORT_REQUEST = 'Support Request — The Rebuild Protocol';
export const SUBJECT_REQUEST = 'Request — The Rebuild Protocol';

/** Inline email links app-wide */
export const EMAIL_LINK_CLASS =
  'text-tactical-orange hover:text-tactical-orange-bright underline underline-offset-2 cursor-pointer font-semibold transition-colors break-all';

/** Support page primary CTA button */
export const EMAIL_SUPPORT_BUTTON_CLASS =
  'block w-full sm:w-auto sm:mx-auto cursor-pointer text-center bg-tactical-orange hover:bg-tactical-orange-bright text-white font-bold uppercase tracking-wide text-base sm:text-lg py-4 px-10 transition-colors duration-200';

/** Settings / landing: mailto presented as full-width row buttons */
export const EMAIL_ROW_BUTTON_CLASS = `${EMAIL_LINK_CLASS} block bg-tactical-gray hover:bg-tactical-lightgray border border-tactical-lightgray font-bold uppercase px-6 py-3 transition-colors text-center no-underline hover:underline`;

export const MAILTO_INFO = `mailto:info@rebuildthemanprotocol.com?subject=${enc(SUBJECT_GENERAL_ENQUIRY)}`;
export const MAILTO_SUPPORT = `mailto:support@rebuildthemanprotocol.com?subject=${enc(SUBJECT_SUPPORT_REQUEST)}`;
export const MAILTO_REQUESTS = `mailto:requests@rebuildthemanprotocol.com?subject=${enc(SUBJECT_REQUEST)}`;

/** @deprecated use MAILTO_INFO */
export const MAILTO_CONTACT = MAILTO_INFO;

export const MAILTO_FEEDBACK = `mailto:feedback@rebuildthemanprotocol.com?subject=${enc('Feedback — The Rebuild Protocol')}`;

export const MAILTO_TEAM = `mailto:team@rebuildthemanprotocol.com?subject=${enc('Contributor Enquiry — The Rebuild Protocol')}`;

const SUPPORT_EMAIL_BODY = `Hi,\n\nI need help with the following issue:\n\n[Please describe your issue here]\n\nDevice/Browser:\nAccount email:\n\nThank you`;

export const MAILTO_SUPPORT_PRIMARY_CTA =
  `mailto:support@rebuildthemanprotocol.com?subject=${enc(SUBJECT_SUPPORT_REQUEST)}&body=${enc(SUPPORT_EMAIL_BODY)}`;
