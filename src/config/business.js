/**
 * WebNest Centralized Business & Contact Configuration
 * Single Source of Truth for Phone Numbers, URLs, Team Details, and Pre-filled Messages.
 */

export const BUSINESS_CONFIG = {
  brandName: 'WebNest',
  tagline: 'Modern Websites for Growing Businesses',
  positioning: 'Professional websites for businesses that want to grow online.',
  
  // Primary Business Contact (Section 6 & 58)
  whatsapp: {
    displayNumber: '+91 70197 07247',
    rawNumber: '917019707247', // Digits only for wa.me URL
  },
  
  email: 'hello@webnest.studio',
  
  // Public Team Information (Section 5 & 53)
  team: {
    founder: {
      name: 'Sakeeb I Mulla',
      role: 'Web/SaaS Developer',
      whatsappDisplay: '+91 70197 07247',
      whatsappRaw: '917019707247',
      githubUsername: 'Sakeeb24',
      githubUrl: 'https://github.com/Sakeeb24',
    },
    sales: {
      name: 'Manikanth Jainer',
      role: 'Sales & Client Communication',
      whatsappDisplay: '+91 93536 27411',
      whatsappRaw: '919353627411',
    }
  },

  // Context-Aware Pre-filled WhatsApp Messages (Section 9, 55, 59)
  messages: {
    // Default general enquiry
    default: "Hi WebNest, I'm interested in getting a website for my business. I'd like to know more about your services and packages.",
    
    // Hero CTA
    hero: "Hi WebNest, I'm interested in getting a website for my business.",
    
    // Main "Get Your Website" CTA
    main: "Hi WebNest, I'm interested in getting a website for my business. I'd like to know more about your services and packages.",
    
    // Starter Plan
    starter: "Hi WebNest, I'm interested in the Starter website package. I'd like to know more.",
    
    // Business Plan
    business: "Hi WebNest, I'm interested in the Business website package. I'd like to know more.",
    
    // Premium Plan
    premium: "Hi WebNest, I'm interested in a custom website and would like to discuss the Premium package.",
    
    // Contact Section
    contact: "Hi WebNest, I'd like to discuss a website for my business.",
    
    // Contact Form Error / Fallback
    fallback: "Hi WebNest, I tried to send an enquiry through your website and would like to discuss getting a website for my business.",
    
    // Demo Portfolio CTAs
    ironcore: "Hi WebNest, I saw your IronCore Fitness website concept and I'd like to discuss a similar website for my business.",
    spiceAvenue: "Hi WebNest, I saw your Spice Avenue website concept and I'd like to discuss a similar website for my business.",
    urbanCuts: "Hi WebNest, I saw your Urban Cuts website concept and I'd like to discuss a similar website for my business.",
    onlyFish: "Hi WebNest, I saw the Only Fish website concept and I'd like to discuss a similar website for my business.",
    ozone: "Hi WebNest, I saw the Ozone website concept and would like to discuss a website for my business.",
    nova: "Hi WebNest, I saw the NOVA luxury 3D bar & restaurant website concept and would like to discuss a website for my business.",
  }
};

/**
 * Reusable helper to generate clean, URL-encoded WhatsApp URLs.
 * Ensures the telephone number is formatted without spaces or plus signs.
 *
 * @param {string} message - Text message to prefill in WhatsApp
 * @param {string} [phone] - Optional override phone number (default: WebNest primary)
 * @returns {string} Fully encoded https://wa.me/ URL
 */
export function createWhatsAppLink(message, phone = BUSINESS_CONFIG.whatsapp.rawNumber) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message || BUSINESS_CONFIG.messages.default);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
