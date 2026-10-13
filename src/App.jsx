import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/motion/PageTransition';
import WebNestHome from './pages/WebNestHome';

const IronCoreDemo = lazy(() => import('./demos/ironcore/IronCoreDemo'));
const SpiceAvenueDemo = lazy(() => import('./demos/spice-avenue/SpiceAvenueDemo'));
const UrbanCutsDemo = lazy(() => import('./demos/urban-cuts/UrbanCutsDemo'));
const OnlyFishDemo = lazy(() => import('./demos/only-fish/OnlyFishDemo'));
const OzoneDemo = lazy(() => import('./demos/ozone/OzoneDemo'));
const NovaDemo = lazy(() => import('./demos/nova/NovaDemo'));

// Centralized CSS & Design Tokens
import './tokens.css';
import './index.css';
import './components/Navbar.css';
import './components/Hero.css';
import './components/TrustStrip.css';
import './components/ProblemSection.css';
import './components/Services.css';
import './components/Portfolio.css';
import './components/Packages.css';
import './components/Process.css';
import './components/WhyWebNest.css';
import './components/Team.css';
import './components/ContactSection.css';
import './components/FinalCTA.css';
import './components/Footer.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0B0B0A' }} />}>
        <Routes location={location} key={location.pathname}>
          {/* WebNest Official Marketing Website */}
          <Route
            path="/"
            element={
              <PageTransition>
                <WebNestHome />
              </PageTransition>
            }
          />

          {/* Portfolio Live Demos (Locked Architecture - Clean Routes) */}
          <Route
            path="/demo/ironcore"
            element={
              <PageTransition>
                <IronCoreDemo />
              </PageTransition>
            }
          />
          <Route
            path="/demo/spice-avenue"
            element={
              <PageTransition>
                <SpiceAvenueDemo />
              </PageTransition>
            }
          />
          <Route
            path="/demo/urban-cuts"
            element={
              <PageTransition>
                <UrbanCutsDemo />
              </PageTransition>
            }
          />
          <Route
            path="/demo/only-fish"
            element={
              <PageTransition>
                <OnlyFishDemo />
              </PageTransition>
            }
          />
          <Route
            path="/demo/ozone"
            element={
              <PageTransition>
                <OzoneDemo />
              </PageTransition>
            }
          />
          <Route
            path="/demo/nova"
            element={
              <PageTransition>
                <NovaDemo />
              </PageTransition>
            }
          />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/webnest">
      {/* Scroll restoration helper */}
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
