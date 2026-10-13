import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Utensils,
  Sparkles,
  Navigation,
  Wine,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import DemoHeader from '../common/DemoHeader';
import Hero3DCanvas from './components/Hero3DCanvas';
import ReservationModal from './components/ReservationModal';
import {
  NOVA_CONFIG,
  MENU_CATEGORIES,
  SIGNATURE_MENU,
  EXPERIENCE_CARDS,
  UPCOMING_EVENTS,
  GUEST_REVIEWS
} from './novaData';
import { BUSINESS_CONFIG, createWhatsAppLink } from '../../config/business';
import './Nova.css';

// Gallery Items Mapping
const GALLERY_ITEMS = [
  {
    id: 'gal-cocktail',
    title: 'The Obsidian Signature',
    sub: 'Smoked mezcal, charcoal-infused agave & 24k gold leaf mist',
    img: `${import.meta.env.BASE_URL}portfolio/nova/cocktail.jpg`,
    alt: 'Signature smoky craft cocktail in crystal coupe glass on black marble'
  },
  {
    id: 'gal-dining',
    title: 'A5 Wagyu & Black Truffle',
    sub: 'Robata-grilled striploin with charred chanterelles and gold leaf',
    img: `${import.meta.env.BASE_URL}portfolio/nova/dining.jpg`,
    alt: 'Michelin-grade wagyu beef plate with shaved black truffle'
  },
  {
    id: 'gal-bar',
    title: 'The Obsidian Bar',
    sub: 'Monolithic black marble counter with bespoke brass table lamps',
    img: `${import.meta.env.BASE_URL}portfolio/nova/bar.jpg`,
    alt: 'Atmospheric cocktail bar with amber lights and bartender crafting drinks'
  },
  {
    id: 'gal-lounge',
    title: 'Midnight Lounge & Vinyl',
    sub: 'Velvet curved banquettes, warm wall sconces, and vinyl DJ booth',
    img: `${import.meta.env.BASE_URL}portfolio/nova/lounge.jpg`,
    alt: 'Luxury nightlife lounge with burgundy velvet seating and evening guests'
  }
];

export default function NovaDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationSeating, setReservationSeating] = useState('dining');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  // WebNest Pitch WhatsApp CTA
  const webNestSalesWhatsAppUrl = createWhatsAppLink(
    BUSINESS_CONFIG.messages.nova || "Hi WebNest, I saw the NOVA luxury 3D bar & restaurant website concept and would like to discuss a website for my business.",
    BUSINESS_CONFIG.whatsapp.rawNumber
  );

  // SEO Document Title
  useEffect(() => {
    document.title = 'NOVA — Bar · Restaurant · Lounge | Luxury Nightlife Demo';

    const schemaId = 'nova-hospitality-schema';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BarOrPub',
        name: NOVA_CONFIG.name,
        description: 'Luxury bar, restaurant, and late-night lounge featuring contemporary wood-fired dining, signature mixology, and curated vinyl sound.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: NOVA_CONFIG.address.line1,
          addressLocality: NOVA_CONFIG.address.district,
          postalCode: NOVA_CONFIG.address.city,
          addressCountry: 'GB'
        },
        telephone: NOVA_CONFIG.contact.phoneDisplay,
        servesCuisine: ['Contemporary Fine Dining', 'Craft Cocktails', 'Raw Bar'],
        priceRange: '££££',
        url: 'https://sakeeb24.github.io/webnest/demo/nova'
      });
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById(schemaId);
      if (existing) existing.remove();
    };
  }, []);

  // Sticky nav blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu or lightbox is open
  useEffect(() => {
    if (mobileMenuOpen || activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, activeLightboxIndex]);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (activeLightboxIndex !== null) setActiveLightboxIndex(null);
    } else if (activeLightboxIndex !== null) {
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    }
  }, [mobileMenuOpen, activeLightboxIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOpenReservation = (seating = 'dining') => {
    setReservationSeating(seating);
    setIsReservationOpen(true);
  };

  // Filter menu items
  const filteredMenu = SIGNATURE_MENU.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="nova-app" id="top">
      {/* 0. Accessible Skip Link */}
      <a href="#main-content" className="nova-skip-link">
        Skip to main content
      </a>

      {/* 1. WebNest Portfolio Persistent Banner */}
      <DemoHeader currentDemo="nova" />

      {/* 2. Client Acquisition Demo Strip */}
      <div className="nova-concept-strip" role="region" aria-label="Demo notice">
        <span className="nova-concept-strip-badge">
          <Sparkles size={11} aria-hidden="true" />
          WebNest 3D Portfolio Concept
        </span>
        <span>
          Bespoke 3D hospitality website concept for <strong>NOVA — Bar · Restaurant · Lounge</strong>.
        </span>
      </div>

      {/* ===================================================================
          SECTION 1: NAVIGATION
          =================================================================== */}
      <header className={`nova-navbar ${isScrolled ? 'nova-navbar-scrolled' : ''}`}>
        <div className="nova-container nova-nav-inner">
          {/* Left Wordmark */}
          <a href="#top" className="nova-brand" aria-label="NOVA — Back to top">
            <span className="nova-brand-wordmark">{NOVA_CONFIG.brandWordmark}</span>
            <span className="nova-brand-sub">{NOVA_CONFIG.tagline}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nova-nav-links" aria-label="Primary navigation">
            <a href="#top" className="nova-nav-link">Home</a>
            <a href="#menu" className="nova-nav-link">Menu</a>
            <a href="#experience" className="nova-nav-link">Experience</a>
            <a href="#bar" className="nova-nav-link">The Bar</a>
            <a href="#story" className="nova-nav-link">Our Story</a>
            <a href="#events" className="nova-nav-link">Events</a>
            <a href="#gallery" className="nova-nav-link">Gallery</a>
            <a href="#location" className="nova-nav-link">Contact</a>
          </nav>

          {/* Right Action CTA */}
          <div className="nova-nav-actions">
            <button
              type="button"
              className="nova-nav-res-btn"
              onClick={() => handleOpenReservation('dining')}
              aria-label="Reserve a table at NOVA"
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Reserve a Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="nova-mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open mobile navigation menu"
            >
              <MenuIcon size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="nova-mobile-drawer"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="nova-drawer-header">
              <div className="nova-brand">
                <span className="nova-brand-wordmark">{NOVA_CONFIG.brandWordmark}</span>
                <span className="nova-brand-sub">{NOVA_CONFIG.tagline}</span>
              </div>
              <button
                type="button"
                className="nova-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <ul className="nova-drawer-links">
              <li>
                <a href="#top" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#experience" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  The Experience
                </a>
              </li>
              <li>
                <a href="#bar" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  The Bar
                </a>
              </li>
              <li>
                <a href="#story" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Our Story
                </a>
              </li>
              <li>
                <a href="#events" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Events &amp; Nightlife
                </a>
              </li>
              <li>
                <a href="#gallery" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="nova-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                  Location &amp; Hours
                </a>
              </li>
            </ul>

            <div className="nova-drawer-footer">
              <button
                type="button"
                className="nova-btn-gold"
                style={{ width: '100%' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenReservation('dining');
                }}
              >
                <span>Reserve a Table</span>
              </button>
              <a
                href={`tel:${NOVA_CONFIG.contact.phoneRaw}`}
                className="nova-btn-ghost"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call {NOVA_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        {/* ===================================================================
            SECTION 2: CINEMATIC 3D ABSTRACT HERO
            =================================================================== */}
        <section className="nova-hero" aria-labelledby="hero-title">
          {/* Interactive Three.js 3D Canvas */}
          <Hero3DCanvas shouldReduceMotion={shouldReduceMotion} />

          <div className="nova-container">
            <div className="nova-hero-grid">
              <motion.div
                className="nova-hero-content"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="nova-hero-eyebrow">
                  <span className="nova-eyebrow-line" aria-hidden="true" />
                  <span>{NOVA_CONFIG.kicker}</span>
                </div>

                <h1 id="hero-title" className="nova-hero-headline">
                  <span>{NOVA_CONFIG.heroHeadline[0]}</span>
                  <span className="highlight-gold">{NOVA_CONFIG.heroHeadline[1]}</span>
                </h1>

                <p className="nova-hero-supporting">
                  {NOVA_CONFIG.heroSupporting}
                </p>

                <div className="nova-hero-ctas">
                  <a href="#menu" className="nova-btn-gold">
                    <Utensils size={17} aria-hidden="true" />
                    <span>Explore the Menu</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    className="nova-btn-ghost"
                    onClick={() => handleOpenReservation('dining')}
                    aria-label="Open table reservation form"
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Reserve a Table</span>
                  </button>
                </div>

                {/* Compact Highlights Near Bottom */}
                <div className="nova-hero-highlights">
                  {NOVA_CONFIG.highlights.map((h, i) => (
                    <div key={i} className="nova-hero-highlight-col">
                      <span className="nova-highlight-num">0{i + 1}</span>
                      <h3 className="nova-highlight-title">{h.title}</h3>
                      <p className="nova-highlight-sub">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: EXPERIENCE HIGHLIGHTS
            =================================================================== */}
        <section className="nova-experience-section" id="experience" aria-labelledby="exp-title">
          <div className="nova-container">
            <div style={{ textAlign: 'center' }}>
              <span className="nova-section-kicker">THREE REALMS</span>
              <h2 id="exp-title" className="nova-section-title">
                The NOVA Experience
              </h2>
              <p className="nova-section-desc" style={{ margin: '0 auto' }}>
                Three distinct expressions of hospitality under one roof, designed to transition effortlessly as the evening evolves.
              </p>
            </div>

            <div className="nova-exp-grid">
              {EXPERIENCE_CARDS.map((card) => {
                const imgUrl = `${import.meta.env.BASE_URL}portfolio/nova/${card.imageKey}.jpg`;

                return (
                  <article key={card.id} className="nova-exp-card">
                    <div className="nova-exp-img-wrap">
                      <img
                        src={imgUrl}
                        alt={`${card.title} - ${card.subtitle}`}
                        className="nova-exp-img"
                        loading="lazy"
                        width="400"
                        height="240"
                      />
                      <span className="nova-exp-badge">{card.badge}</span>
                    </div>

                    <div className="nova-exp-body">
                      <h3 className="nova-exp-title">{card.title}</h3>
                      <span className="nova-exp-sub">{card.subtitle}</span>
                      <p className="nova-exp-desc">{card.desc}</p>

                      <a href={card.link} className="nova-exp-action">
                        <span>{card.cta}</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: SIGNATURE MENU
            =================================================================== */}
        <section className="nova-menu-section" id="menu" aria-labelledby="menu-title">
          <div className="nova-container">
            <div className="nova-menu-header">
              <span className="nova-section-kicker">GASTRONOMY &amp; SPIRITS</span>
              <h2 id="menu-title" className="nova-section-title">
                Curated Signature Menu
              </h2>
              <p className="nova-section-desc">
                An editorial tasting showcase of our kitchen's wood-fired masterworks and bar alchemy. Fictional demo pricing provided for client presentation.
              </p>
            </div>

            {/* Category Navigation Tabs */}
            <div className="nova-menu-tabs" role="tablist" aria-label="Menu category tabs">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`nova-menu-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="nova-menu-grid">
              {filteredMenu.map((item) => (
                <article key={item.id} className="nova-menu-card">
                  <div>
                    <div className="nova-menu-card-top">
                      <h3 className="nova-menu-item-title">{item.name}</h3>
                      <span className="nova-menu-item-price">{item.price}</span>
                    </div>
                    <p className="nova-menu-item-desc">{item.description}</p>
                  </div>

                  <div className="nova-menu-item-meta">
                    {item.badge && <span className="nova-item-badge">{item.badge}</span>}
                    {(item.diet || item.alcohol) && (
                      <span className="nova-item-diet">{item.diet || item.alcohol}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="nova-menu-cta-wrap">
              <button
                type="button"
                className="nova-btn-gold"
                onClick={() => handleOpenReservation('dining')}
              >
                <Sparkles size={16} aria-hidden="true" />
                <span>Book a Table to Dine</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: THE BAR EXPERIENCE
            =================================================================== */}
        <section className="nova-bar-section" id="bar" aria-labelledby="bar-title">
          <div className="nova-container">
            <div className="nova-bar-grid">
              {/* Media Left */}
              <div className="nova-bar-media">
                <img
                  src={`${import.meta.env.BASE_URL}portfolio/nova/bar.jpg`}
                  alt="Bartender preparing craft cocktails at the obsidian marble bar"
                  className="nova-bar-img"
                  loading="lazy"
                  width="600"
                  height="480"
                />
                <div className="nova-bar-media-badge">
                  <span style={{ fontSize: '11px', color: 'var(--nv-gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    CELEBRATED MIXOLOGY
                  </span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: 'var(--nv-ivory)', fontFamily: 'var(--nv-font-serif)' }}>
                    Hand-carved crystalline ice &amp; vintage spirits
                  </p>
                </div>
              </div>

              {/* Content Right */}
              <div>
                <span className="nova-section-kicker">{NOVA_CONFIG.barExperience.eyebrow}</span>
                <h2 id="bar-title" className="nova-section-title">
                  {NOVA_CONFIG.barExperience.title}
                </h2>
                <p className="nova-section-desc">
                  {NOVA_CONFIG.barExperience.lead}
                </p>

                <ul className="nova-bar-bullets">
                  {NOVA_CONFIG.barExperience.bullets.map((bullet, idx) => (
                    <li key={idx} className="nova-bar-bullet-item">
                      <Wine size={18} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="nova-btn-gold"
                  onClick={() => handleOpenReservation('bar')}
                >
                  <Wine size={16} aria-hidden="true" />
                  <span>Reserve at the Bar</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: OUR STORY
            =================================================================== */}
        <section className="nova-story-section" id="story" aria-labelledby="story-title">
          <div className="nova-container">
            <div className="nova-story-grid">
              {/* Content Left */}
              <div className="nova-story-content">
                <span className="nova-section-kicker">PHILOSOPHY &amp; CRAFT</span>
                <h2 id="story-title" className="nova-section-title">
                  {NOVA_CONFIG.story.title}
                </h2>
                <p className="nova-story-lead">
                  {NOVA_CONFIG.story.lead}
                </p>

                {NOVA_CONFIG.story.body.map((para, i) => (
                  <p key={i} className="nova-story-body">
                    {para}
                  </p>
                ))}

                <div className="nova-story-curator">
                  <div className="nova-curator-name">{NOVA_CONFIG.story.curator}</div>
                  <div className="nova-curator-role">{NOVA_CONFIG.story.curatorRole}</div>
                </div>
              </div>

              {/* Media Right */}
              <div className="nova-story-media">
                <img
                  src={`${import.meta.env.BASE_URL}portfolio/nova/dining.jpg`}
                  alt="Architectural culinary plating at NOVA"
                  className="nova-story-img"
                  loading="lazy"
                  width="600"
                  height="500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: EVENTS AND NIGHTLIFE
            =================================================================== */}
        <section className="nova-events-section" id="events" aria-labelledby="events-title">
          <div className="nova-container">
            <div style={{ textAlign: 'center' }}>
              <span className="nova-section-kicker">AFTER DARK</span>
              <h2 id="events-title" className="nova-section-title">
                Events &amp; Nightlife
              </h2>
              <p className="nova-section-desc" style={{ margin: '0 auto' }}>
                Curated sonic residencies, vinyl selectors, and bespoke spirits masterclasses under low amber light.
              </p>
            </div>

            <div className="nova-events-grid">
              {UPCOMING_EVENTS.map((evt) => (
                <article key={evt.id} className="nova-event-card">
                  <div className="nova-event-img-wrap">
                    <img
                      src={`${import.meta.env.BASE_URL}portfolio/nova/${evt.imageKey}.jpg`}
                      alt={evt.title}
                      className="nova-event-img"
                      loading="lazy"
                      width="400"
                      height="200"
                    />
                    <span className="nova-event-tag">{evt.tag}</span>
                  </div>

                  <div className="nova-event-body">
                    <div className="nova-event-schedule">
                      <Calendar size={13} aria-hidden="true" />
                      <span>{evt.date}</span>
                      <span>•</span>
                      <span>{evt.time}</span>
                    </div>

                    <h3 className="nova-event-title">{evt.title}</h3>
                    <p className="nova-event-desc">{evt.desc}</p>

                    <button
                      type="button"
                      className="nova-btn-ghost"
                      onClick={() => handleOpenReservation('lounge')}
                      style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                    >
                      <Sparkles size={14} aria-hidden="true" />
                      <span>Reserve for Event</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: GALLERY (ACCESSIBLE LIGHTBOX)
            =================================================================== */}
        <section className="nova-gallery-section" id="gallery" aria-labelledby="gal-title">
          <div className="nova-container">
            <div style={{ textAlign: 'center' }}>
              <span className="nova-section-kicker">VISUAL CHRONICLES</span>
              <h2 id="gal-title" className="nova-section-title">
                The NOVA Gallery
              </h2>
              <p className="nova-section-desc" style={{ margin: '0 auto' }}>
                An intimate look inside our dining room, obsidian bar, and late-night lounge spaces.
              </p>
            </div>

            <div className="nova-gallery-grid">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className="nova-gallery-item"
                  onClick={() => setActiveLightboxIndex(idx)}
                  aria-label={`Enlarge photo: ${item.title}`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="nova-gallery-img"
                    loading="lazy"
                  />
                  <div className="nova-gallery-overlay">
                    <h3 className="nova-gallery-caption">{item.title}</h3>
                    <span style={{ fontSize: '11px', color: 'var(--nv-gold)' }}>View Details</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxIndex !== null && (
            <motion.div
              className="nova-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged photo modal"
            >
              <div
                style={{
                  position: 'relative',
                  maxWidth: '920px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="nova-modal-close"
                  style={{ alignSelf: 'flex-end', marginBottom: '12px' }}
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close enlarged view (Esc)"
                >
                  <X size={20} aria-hidden="true" />
                </button>

                <div style={{ position: 'relative', width: '100%', maxHeight: '70vh', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--nv-gold-border)' }}>
                  <img
                    src={GALLERY_ITEMS[activeLightboxIndex].img}
                    alt={GALLERY_ITEMS[activeLightboxIndex].alt}
                    style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#000', display: 'block' }}
                  />

                  {/* Left Button */}
                  <button
                    type="button"
                    onClick={() => setActiveLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
                    aria-label="Previous image"
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(11, 11, 10, 0.8)',
                      border: '1px solid var(--nv-gold-border)',
                      color: 'var(--nv-ivory)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Right Button */}
                  <button
                    type="button"
                    onClick={() => setActiveLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)}
                    aria-label="Next image"
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(11, 11, 10, 0.8)',
                      border: '1px solid var(--nv-gold-border)',
                      color: 'var(--nv-ivory)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center', width: '100%' }}>
                  <h3 style={{ fontFamily: 'var(--nv-font-serif)', fontSize: '20px', color: 'var(--nv-ivory)', margin: '0 0 4px 0' }}>
                    {GALLERY_ITEMS[activeLightboxIndex].title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--nv-ivory-muted)', margin: 0 }}>
                    {GALLERY_ITEMS[activeLightboxIndex].sub} ({activeLightboxIndex + 1} of {GALLERY_ITEMS.length})
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            SECTION 9: GUEST REVIEWS
            =================================================================== */}
        <section className="nova-reviews-section" aria-labelledby="reviews-title">
          <div className="nova-container">
            <div style={{ textAlign: 'center' }}>
              <span className="nova-section-kicker">ACCOLADES &amp; PRAISE</span>
              <h2 id="reviews-title" className="nova-section-title">
                What Diners Say
              </h2>
              <p className="nova-section-desc" style={{ margin: '0 auto' }}>
                Curated sample guest impressions demonstrating our commitment to memorable hospitality.
              </p>
            </div>

            <div className="nova-reviews-grid">
              {GUEST_REVIEWS.map((rev) => (
                <blockquote key={rev.id} className="nova-review-card">
                  <div className="nova-review-stars" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--nv-gold)" color="var(--nv-gold)" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="nova-review-quote">
                    "{rev.quote}"
                  </p>

                  <div>
                    <div className="nova-review-author">{rev.author}</div>
                    <div className="nova-review-title">{rev.title} • {rev.verified}</div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 10: LOCATION AND HOURS
            =================================================================== */}
        <section className="nova-location-section" id="location" aria-labelledby="loc-title">
          <div className="nova-container">
            <div style={{ textAlign: 'center' }}>
              <span className="nova-section-kicker">JOIN US TONIGHT</span>
              <h2 id="loc-title" className="nova-section-title">
                Location &amp; Hours
              </h2>
              <p className="nova-section-desc" style={{ margin: '0 auto' }}>
                Situated in the heart of the Mayfair District. Valet parking and private entrance available.
              </p>
            </div>

            <div className="nova-location-grid">
              {/* Hours Card */}
              <div className="nova-hours-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--nv-gold)', marginBottom: '8px' }}>
                  <Clock size={18} aria-hidden="true" />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    OPENING SCHEDULE
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--nv-font-serif)', fontSize: '24px', color: 'var(--nv-ivory)', margin: '0 0 16px 0' }}>
                  Hours of Operation
                </h3>

                <div className="nova-hours-list">
                  {NOVA_CONFIG.hours.map((h, idx) => (
                    <div key={idx} className="nova-hour-row">
                      <span className="nova-hour-days">{h.days}</span>
                      <span className="nova-hour-time">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Card */}
              <div className="nova-location-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--nv-gold)', marginBottom: '8px' }}>
                    <MapPin size={18} aria-hidden="true" />
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      SANCTUARY ADDRESS
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--nv-font-serif)', fontSize: '24px', color: 'var(--nv-ivory)', margin: '0 0 8px 0' }}>
                    {NOVA_CONFIG.address.full}
                  </h3>
                  <p style={{ color: 'var(--nv-ivory-muted)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                    Telephone: <a href={`tel:${NOVA_CONFIG.contact.phoneRaw}`} style={{ color: 'var(--nv-gold)' }}>{NOVA_CONFIG.contact.phoneDisplay}</a><br />
                    Concierge Email: <a href={`mailto:${NOVA_CONFIG.contact.email}`} style={{ color: 'var(--nv-ivory-soft)' }}>{NOVA_CONFIG.contact.email}</a>
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a
                    href={NOVA_CONFIG.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nova-btn-gold"
                  >
                    <Navigation size={16} aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    className="nova-btn-ghost"
                    onClick={() => handleOpenReservation('dining')}
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Reserve a Table</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 11: CLOSING RESERVATION CTA
            =================================================================== */}
        <section className="nova-closing-cta-section" aria-labelledby="closing-title">
          <div className="nova-container">
            <span className="nova-section-kicker">JOIN THE NOCTURNE</span>
            <h2 id="closing-title" className="nova-closing-title">
              Make Tonight Memorable.
            </h2>
            <p className="nova-closing-desc">
              Your next great evening starts here. Tables and private lounge booths are available by advance reservation.
            </p>

            <button
              type="button"
              className="nova-btn-gold"
              onClick={() => handleOpenReservation('dining')}
              style={{ fontSize: '15px', padding: '16px 36px' }}
            >
              <Sparkles size={17} aria-hidden="true" />
              <span>Reserve Your Table</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: WEBNEST CLIENT ACQUISITION PITCH
            =================================================================== */}
        <section className="nova-webnest-pitch-section" aria-labelledby="pitch-title">
          <div className="nova-container">
            <div className="nova-webnest-pitch-card">
              <div className="nova-pitch-badge">
                <Sparkles size={12} aria-hidden="true" />
                <span>WebNest Studio Concept</span>
              </div>

              <h2 id="pitch-title" className="nova-pitch-title">
                Want a luxury 3D presence like this for your venue?
              </h2>

              <p className="nova-pitch-desc">
                WebNest creates bespoke, immersive web architectures for high-end dining, cocktail lounges, and boutique hospitality brands worldwide. From Three.js art direction to direct table reservation conversions.
              </p>

              <a
                href={webNestSalesWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nova-pitch-btn"
                aria-label="Talk to WebNest on WhatsApp about getting a luxury website"
              >
                <MessageCircle size={19} aria-hidden="true" />
                <span>Talk to WebNest on WhatsApp</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <p style={{ fontSize: '12px', color: 'var(--nv-ivory-muted)', marginTop: '20px' }}>
                Direct founder consultation with Sakeeb I Mulla • {BUSINESS_CONFIG.whatsapp.displayNumber}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          SECTION 13: FOOTER
          =================================================================== */}
      <footer className="nova-footer" role="contentinfo">
        <div className="nova-container">
          <div className="nova-footer-grid">
            {/* Brand Column */}
            <div className="nova-footer-brand">
              <h4>{NOVA_CONFIG.brandWordmark}</h4>
              <p style={{ color: 'var(--nv-gold)', fontSize: '13px', letterSpacing: '0.1em' }}>
                {NOVA_CONFIG.tagline}
              </p>
              <p>
                {NOVA_CONFIG.address.full}
              </p>
              <p>
                <strong>Telephone:</strong>{' '}
                <a href={`tel:${NOVA_CONFIG.contact.phoneRaw}`} style={{ color: 'var(--nv-gold)' }}>
                  {NOVA_CONFIG.contact.phoneDisplay}
                </a>
              </p>
            </div>

            {/* Navigation Column */}
            <div className="nova-footer-col">
              <h5>Navigation</h5>
              <ul>
                <li><a href="#top">Back to Top</a></li>
                <li><a href="#menu">Signature Menu</a></li>
                <li><a href="#experience">The Experience</a></li>
                <li><a href="#bar">The Bar</a></li>
                <li><a href="#story">Our Story</a></li>
                <li><a href="#events">Events &amp; Nightlife</a></li>
                <li><a href="#gallery">Photo Gallery</a></li>
                <li><a href="#location">Hours &amp; Location</a></li>
              </ul>
            </div>

            {/* WebNest Attribution Column */}
            <div className="nova-footer-col">
              <h5>WebNest Studio</h5>
              <ul>
                <li>
                  <a
                    href={webNestSalesWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#93C5FD', fontWeight: 600 }}
                  >
                    Need a website? Talk to WebNest →
                  </a>
                </li>
                <li>
                  <span style={{ fontSize: '12px', color: 'var(--nv-ivory-muted)' }}>
                    Bespoke 3D web design &amp; digital architecture for premium hospitality brands.
                  </span>
                </li>
                <li>
                  <span style={{ fontSize: '12px', color: 'var(--nv-gold)' }}>
                    WhatsApp: {BUSINESS_CONFIG.whatsapp.displayNumber}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="nova-footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} {NOVA_CONFIG.name}. Fictional portfolio concept created by WebNest Studio.
            </span>
            <a
              href={webNestSalesWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Want a website like this for your venue? Talk to WebNest →
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        defaultSeating={reservationSeating}
      />
    </div>
  );
}
