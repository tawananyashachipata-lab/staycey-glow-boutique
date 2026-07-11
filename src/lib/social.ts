// Replace these placeholder handles/numbers with your real accounts.
export const social = {
  instagram: "https://instagram.com/stayceyglow",
  facebook: "https://facebook.com/stayceyglow",
  // International format, digits only — used to build the wa.me link.
  whatsappNumber: "1234567890",
  whatsappMessage: "Hi Staycey Glow! I'd love to know more about your products.",
};

export const whatsappLink = () =>
  `https://wa.me/${social.whatsappNumber}?text=${encodeURIComponent(social.whatsappMessage)}`;
