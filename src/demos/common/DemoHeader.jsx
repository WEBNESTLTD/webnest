import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import './DemoBanner.css';

export default function DemoHeader({ currentDemo = 'ironcore' }) {
  const demos = [
    { id: 'ironcore', name: 'IronCore Fitness', route: '/demo/ironcore' },
    { id: 'spice-avenue', name: 'Spice Avenue', route: '/demo/spice-avenue' },
    { id: 'urban-cuts', name: 'Urban Cuts', route: '/demo/urban-cuts' },
    { id: 'only-fish', name: 'Only Fish', route: '/demo/only-fish' },
    { id: 'ozone', name: 'Ozone', route: '/demo/ozone' },
    { id: 'nova', name: 'NOVA Lounge', route: '/demo/nova' },
  ];

  return (
    <aside className="demo-persistent-banner" aria-label="WebNest Portfolio Concept Notification">
      <div className="demo-banner-container">
        {/* Left: Obvious return link to WebNest home */}
        <div className="demo-banner-left">
          <Link to="/" className="demo-back-link" aria-label="Return to WebNest studio homepage">
            <ArrowLeft size={16} aria-hidden="true" />
            <span className="demo-back-text">Back to WebNest</span>
          </Link>
          <span className="demo-banner-divider" aria-hidden="true" />
          <div className="demo-concept-badge">
            <Sparkles size={13} aria-hidden="true" />
            <span>WebNest Portfolio Concept</span>
          </div>
        </div>

        {/* Right: Quick switcher across the 3 demo concepts */}
        <nav className="demo-switcher-nav" aria-label="Switch between live portfolio demos">
          <span className="demo-switcher-label">Other Demos:</span>
          <div className="demo-switcher-links">
            {demos.map((d) => (
              <Link
                key={d.id}
                to={d.route}
                className={`demo-switcher-pill ${d.id === currentDemo ? 'is-active' : ''}`}
                aria-current={d.id === currentDemo ? 'page' : undefined}
              >
                <span>{d.name}</span>
                {d.id === currentDemo && <span className="demo-current-dot" aria-hidden="true" />}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
