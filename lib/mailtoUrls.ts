/** Canonical mailto URLs — subjects encoded for reliable parsing in all clients */

const enc = encodeURIComponent;

export const MAILTO_CONTACT = `mailto:info@rebuildthemanprotocol.com?subject=${enc(
  'Rebuild The Man Protocol - General enquiry'
)}`;

export const MAILTO_SUPPORT = `mailto:support@rebuildthemanprotocol.com?subject=${enc(
  'Rebuild The Man Protocol - App support'
)}`;

export const MAILTO_FEEDBACK = `mailto:feedback@rebuildthemanprotocol.com?subject=${enc(
  'Rebuild The Man Protocol Feedback'
)}`;

export const MAILTO_REQUESTS = `mailto:requests@rebuildthemanprotocol.com?subject=${enc(
  'Rebuild The Man Protocol - Data / privacy request'
)}`;
