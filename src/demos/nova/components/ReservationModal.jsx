import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { NOVA_CONFIG } from '../novaData';

export default function ReservationModal({ isOpen, onClose, defaultSeating = 'dining' }) {
  const [formData, setFormData] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    return {
      date: tomorrow,
      time: '20:00',
      guests: '2',
      seating: defaultSeating,
      fullName: '',
      phone: '',
      email: '',
      requests: '',
    };
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Lock body scroll and register Escape key listener while open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid telephone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.date) errs.date = 'Reservation date is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Generate demo confirmation reference
    const randomCode = `NV-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrors({});
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    setFormData({
      date: tomorrow,
      time: '20:00',
      guests: '2',
      seating: defaultSeating,
      fullName: '',
      phone: '',
      email: '',
      requests: '',
    });
  };

  return (
    <div className="nova-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div
        className="nova-modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="nova-modal-header">
          <div>
            <div className="nova-modal-kicker">
              <Sparkles size={13} aria-hidden="true" />
              <span>TABLE RESERVATION</span>
            </div>
            <h2 id="modal-title" className="nova-modal-title">
              Reserve at {NOVA_CONFIG.name}
            </h2>
          </div>
          <button
            type="button"
            className="nova-modal-close"
            onClick={onClose}
            aria-label="Close reservation modal (Esc)"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Demo Mode Notice */}
        <div className="nova-modal-demo-badge">
          <Sparkles size={12} aria-hidden="true" />
          <span>Demo Booking: Real-time form validation. In production, this syncs with SevenRooms / OpenTable.</span>
        </div>

        {isSubmitted ? (
          /* Confirmation Success State */
          <div className="nova-modal-success">
            <div className="nova-success-icon-wrap">
              <CheckCircle2 size={48} className="nova-success-icon" aria-hidden="true" />
            </div>

            <h3 className="nova-success-title">Reservation Confirmed</h3>
            <p className="nova-success-code">
              Confirmation Reference: <strong>{confirmationCode}</strong>
            </p>

            <div className="nova-success-summary">
              <div className="nova-summary-row">
                <span>Guest</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="nova-summary-row">
                <span>Date &amp; Time</span>
                <strong>{formData.date} at {formData.time}</strong>
              </div>
              <div className="nova-summary-row">
                <span>Party Size</span>
                <strong>{formData.guests} Guests</strong>
              </div>
              <div className="nova-summary-row">
                <span>Seating Area</span>
                <strong style={{ textTransform: 'capitalize' }}>
                  {formData.seating === 'lounge' ? 'Velvet Lounge Booth' : formData.seating === 'bar' ? 'Marble Bar Counter' : 'Main Dining Room'}
                </strong>
              </div>
            </div>

            <p className="nova-success-note">
              A confirmation summary has been formatted. Our concierge will welcome you at {NOVA_CONFIG.address.line1}.
            </p>

            <div className="nova-success-actions">
              <button type="button" className="nova-btn-gold" onClick={onClose} style={{ width: '100%' }}>
                <span>Done</span>
              </button>
              <button type="button" className="nova-btn-ghost" onClick={handleReset} style={{ width: '100%', marginTop: '8px' }}>
                <span>Book Another Table</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form className="nova-modal-form" onSubmit={handleSubmit} noValidate>
            {/* Step 1: When & Who */}
            <div className="nova-form-row-grid">
              {/* Date */}
              <div className="nova-form-group">
                <label htmlFor="res-date" className="nova-form-label">
                  <Calendar size={13} aria-hidden="true" />
                  <span>Date</span>
                </label>
                <input
                  id="res-date"
                  type="date"
                  className={`nova-form-input ${errors.date ? 'is-invalid' : ''}`}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {errors.date && <span className="nova-form-error">{errors.date}</span>}
              </div>

              {/* Time */}
              <div className="nova-form-group">
                <label htmlFor="res-time" className="nova-form-label">
                  <Clock size={13} aria-hidden="true" />
                  <span>Seating Time</span>
                </label>
                <select
                  id="res-time"
                  className="nova-form-select"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="17:30">17:30 — Early Dinner</option>
                  <option value="18:30">18:30 — Evening</option>
                  <option value="20:00">20:00 — Prime Dining</option>
                  <option value="21:30">21:30 — Late Night</option>
                  <option value="23:00">23:00 — Midnight Lounge</option>
                </select>
              </div>

              {/* Guests */}
              <div className="nova-form-group">
                <label htmlFor="res-guests" className="nova-form-label">
                  <Users size={13} aria-hidden="true" />
                  <span>Guests</span>
                </label>
                <select
                  id="res-guests"
                  className="nova-form-select"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests (Couple)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests (Booth)</option>
                  <option value="8">8+ Guests (Private Area)</option>
                </select>
              </div>
            </div>

            {/* Step 2: Seating Area */}
            <div className="nova-form-group">
              <label className="nova-form-label">
                <span>Preferred Seating Area</span>
              </label>
              <div className="nova-seating-pills">
                <button
                  type="button"
                  className={`nova-seating-pill ${formData.seating === 'dining' ? 'is-active' : ''}`}
                  onClick={() => setFormData({ ...formData, seating: 'dining' })}
                >
                  Main Dining Room
                </button>
                <button
                  type="button"
                  className={`nova-seating-pill ${formData.seating === 'lounge' ? 'is-active' : ''}`}
                  onClick={() => setFormData({ ...formData, seating: 'lounge' })}
                >
                  Velvet Lounge Booth
                </button>
                <button
                  type="button"
                  className={`nova-seating-pill ${formData.seating === 'bar' ? 'is-active' : ''}`}
                  onClick={() => setFormData({ ...formData, seating: 'bar' })}
                >
                  Obsidian Bar Counter
                </button>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="nova-form-row-grid">
              <div className="nova-form-group" style={{ gridColumn: 'span 2' }}>
                <label htmlFor="res-name" className="nova-form-label">Full Name *</label>
                <input
                  id="res-name"
                  type="text"
                  placeholder="e.g. Lord Alexander Wright"
                  className={`nova-form-input ${errors.fullName ? 'is-invalid' : ''}`}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <span className="nova-form-error">{errors.fullName}</span>}
              </div>
            </div>

            <div className="nova-form-row-grid">
              <div className="nova-form-group">
                <label htmlFor="res-phone" className="nova-form-label">Telephone *</label>
                <input
                  id="res-phone"
                  type="tel"
                  placeholder="+44 7911 123456"
                  className={`nova-form-input ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span className="nova-form-error">{errors.phone}</span>}
              </div>

              <div className="nova-form-group">
                <label htmlFor="res-email" className="nova-form-label">Email Address *</label>
                <input
                  id="res-email"
                  type="email"
                  placeholder="name@domain.com"
                  className={`nova-form-input ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="nova-form-error">{errors.email}</span>}
              </div>
            </div>

            {/* Special Requests */}
            <div className="nova-form-group">
              <label htmlFor="res-requests" className="nova-form-label">
                <span>Special Requests / Dietary Notes (Optional)</span>
              </label>
              <textarea
                id="res-requests"
                rows={2}
                placeholder="Anniversary, champagne on arrival, allergies, preferred music volume..."
                className="nova-form-textarea"
                value={formData.requests}
                onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
              />
            </div>

            {/* Submit Action */}
            <div className="nova-modal-actions">
              <button type="submit" className="nova-btn-gold" style={{ width: '100%' }}>
                <span>Confirm Reservation</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
