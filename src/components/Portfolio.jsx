import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Info, Check, Eye } from 'lucide-react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import ProjectModal from './ProjectModal';
import './Portfolio.css';

export default function Portfolio({ onOpenEnquiry: _onOpenEnquiry = () => {} }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCursorProject, setActiveCursorProject] = useState(null);
  const [isPointerDevice, setIsPointerDevice] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  });
  const shouldReduceMotion = useReducedMotion();

  // Floating cursor pill position tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { damping: 20, stiffness: 250 });
  const smoothCursorY = useSpring(cursorY, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const listener = (e) => setIsPointerDevice(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handleMouseMoveProject = (e) => {
    if (!isPointerDevice || shouldReduceMotion) return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const projects = [
    {
      id: 'only-fish',
      code: 'PROJECT 01',
      title: 'ONLY FISH',
      category: 'Seafood Restaurant',
      tagline: 'Coastal Seafood Restaurant • Dharwad',
      route: '/demo/only-fish',
      image: `${import.meta.env.BASE_URL}portfolio/only-fish/bangda-thali.jpg`,
      shortDesc: 'Authentic coastal seafood dining experience with digital menu, dish showcases, direct WhatsApp ordering, and local directions.',
      deliverables: [
        'Curated coastal seafood & regional thali menu',
        'Direct WhatsApp ordering and availability',
        'Google Maps location routing for Dharwad diners',
        'Dine-in, Takeaway & No-Contact delivery options',
      ],
      layout: 'image-left',
    },
    {
      id: 'ironcore',
      code: 'PROJECT 02',
      title: 'IRONCORE FITNESS',
      category: 'Fitness & Gym',
      tagline: 'Strength & Conditioning Facility',
      route: '/demo/ironcore',
      image: `${import.meta.env.BASE_URL}portfolio/ironcore.jpg`,
      shortDesc: 'High-octane athletic dark mode website featuring real-time training schedules, trainer credentials, and membership enquiry funnels.',
      deliverables: [
        'Interactive membership tier selection',
        'Weekly training discipline breakdowns',
        'Certified coach credential showcases',
        '1-tap membership enquiry WhatsApp flow',
      ],
      layout: 'image-right',
    },
    {
      id: 'spice-avenue',
      code: 'PROJECT 03',
      title: 'SPICE AVENUE',
      category: 'Restaurant',
      tagline: 'Contemporary Italian & Artisan Dining',
      route: '/demo/spice-avenue',
      image: `${import.meta.env.BASE_URL}portfolio/spice-avenue.jpg`,
      shortDesc: 'Warm, sensory culinary dining website celebrating vibrant spices, curated tasting menus, and seamless table reservation enquiries.',
      deliverables: [
        'Categorized digital dinner & cocktail menu',
        'Interactive table reservation enquiry module',
        'Chef signature dish showcases & story',
        'One-click Google Maps location & valet directions',
      ],
      layout: 'image-left',
    },
    {
      id: 'urban-cuts',
      code: 'PROJECT 04',
      title: 'URBAN CUTS',
      category: 'Salon & Grooming',
      tagline: 'Modern Grooming & Hair Studio',
      route: '/demo/urban-cuts',
      image: `${import.meta.env.BASE_URL}portfolio/urban-cuts.jpg`,
      shortDesc: 'Monochrome architectural grooming studio portal with transparent service menus, stylist lookbooks, and mobile appointment booking.',
      deliverables: [
        'Clear haircut, styling & grooming service lists',
        'Stylist lookbook gallery with portfolio previews',
        'Mobile-first appointment scheduling module',
        'Operating schedule with real-time status',
      ],
      layout: 'image-right',
    },
    {
      id: 'ozone',
      code: 'PROJECT 05',
      title: 'OZONE – DHARWAD',
      category: 'Restaurant & Bar',
      tagline: 'A Taste of Vanashree Hotel • Dharwad',
      route: '/demo/ozone',
      image: `${import.meta.env.BASE_URL}portfolio/ozone.jpg`,
      shortDesc: 'Warm, garden dining restaurant concept featuring categorized tandoori, Indo-Chinese and desserts menu, interactive spirits catalog, and 1-tap local contact.',
      deliverables: [
        'Curated Tandoori, Chinese & Desserts digital menu',
        'Verified whisky & rum bar measures catalog',
        'Direct 1-tap phone booking & Google Maps directions',
        'Responsive gallery with accessible image lightbox',
      ],
      layout: 'image-left',
    },
    {
      id: 'nova',
      code: 'PROJECT 06',
      title: 'NOVA — LUXURY 3D LOUNGE',
      category: 'Bar · Restaurant · Nightlife',
      tagline: 'Cinematic 3D Hospitality Concept • Mayfair',
      route: '/demo/nova',
      image: `${import.meta.env.BASE_URL}portfolio/nova.jpg`,
      shortDesc: 'Award-winning dark luxury hospitality website with real-time 3D Three.js hero, wood-fired tasting menu, mixology showcase, and table reservation engine.',
      deliverables: [
        'Interactive Three.js 3D kinetic sculptural hero',
        'Wood-fired gastronomy & signature cocktail tasting catalog',
        'Interactive table booking modal with guest validation',
        'Curated vinyl nightlife & acoustic residency programming',
      ],
      layout: 'image-right',
    },
  ];

  return (
    <section className="section portfolio-editorial-section" id="work" aria-labelledby="portfolio-heading">
      {/* Floating subtle cursor pill for portfolio items on desktop */}
      {isPointerDevice && !shouldReduceMotion && activeCursorProject && (
        <motion.div
          className="portfolio-cursor-pill"
          style={{
            left: smoothCursorX,
            top: smoothCursorY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          aria-hidden="true"
        >
          <span>View Project</span>
          <ArrowUpRight size={13} />
        </motion.div>
      )}

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portfolio-section-eyebrow">
            <span className="eyebrow-indicator" aria-hidden="true" />
            <span>SELECTED CLIENT WORKS</span>
          </div>
          <h2 id="portfolio-heading" className="display-sm portfolio-heading-title">
            Work That Speaks for Itself.
          </h2>
          <p className="body-lg portfolio-subtitle">
            Realistic website concepts designed for real businesses.
          </p>
        </motion.div>

        {/* Alternating Editorial Project Showcases */}
        <div className="portfolio-projects-stack">
          {projects.map((project, idx) => {
            const isImageLeft = project.layout === 'image-left';

            return (
              <motion.article
                key={project.id}
                className={`portfolio-item ${isImageLeft ? 'layout-image-left' : 'layout-image-right'}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Visual Column with Browser Frame & Hover Physics */}
                <div
                  className="portfolio-visual-col"
                  onMouseEnter={() => setActiveCursorProject(project.id)}
                  onMouseLeave={() => setActiveCursorProject(null)}
                  onMouseMove={handleMouseMoveProject}
                >
                  <Link
                    to={project.route}
                    className="portfolio-mockup-link"
                    aria-label={`Open live demo for ${project.title}`}
                  >
                    <div className="portfolio-browser-mockup">
                      <div className="portfolio-mockup-bar">
                        <div className="mockup-bar-dots" aria-hidden="true">
                          <span className="dot dot-red" />
                          <span className="dot dot-yellow" />
                          <span className="dot dot-green" />
                        </div>
                        <span className="mockup-url-label">webnest.studio{project.route}</span>
                        <span className="mockup-live-pill">LIVE CONCEPT</span>
                      </div>

                      <div className="portfolio-image-container">
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.category} website preview`}
                          className="portfolio-project-image"
                          loading="lazy"
                        />
                        <div className="portfolio-image-scrim" />
                        <div className="portfolio-hover-overlay">
                          <span className="hover-view-badge">
                            <Eye size={15} aria-hidden="true" />
                            <span>Explore Demo</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content Column */}
                <div className="portfolio-content-col">
                  <div className="portfolio-meta-header">
                    <span className="portfolio-code">{project.code}</span>
                    <span className="portfolio-category-pill">{project.category}</span>
                  </div>

                  <h3 className="portfolio-project-title">{project.title}</h3>
                  <p className="portfolio-project-tagline">{project.tagline}</p>

                  <p className="portfolio-project-desc">{project.shortDesc}</p>

                  {/* Key Deliverables */}
                  <div className="portfolio-deliverables-list">
                    <span className="deliverables-heading">SCOPE &amp; CAPABILITIES</span>
                    <ul>
                      {project.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>
                          <Check size={14} className="text-brand" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="portfolio-actions">
                    <Link
                      to={project.route}
                      className="btn btn-primary portfolio-demo-btn"
                      aria-label={`View live demo website for ${project.title}`}
                    >
                      <span>View Demo</span>
                      <ArrowRight size={16} aria-hidden="true" className="arrow-icon" />
                    </Link>

                    <button
                      type="button"
                      className="btn btn-secondary portfolio-details-btn"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View detailed project scope for ${project.title}`}
                    >
                      <Info size={15} aria-hidden="true" />
                      <span>Project Scope</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={{
            ...selectedProject,
            kicker: selectedProject.category,
            businessType: selectedProject.tagline,
            features: selectedProject.deliverables,
            fullDescription: selectedProject.shortDesc,
          }}
          onClose={() => setSelectedProject(null)}
          onOpenEnquiry={(_title) => {
            setSelectedProject(null);
            const contactEl = document.getElementById('contact');
            if (contactEl) {
              contactEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}
    </section>
  );
}
