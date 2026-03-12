import React, { useEffect, useState } from 'react';
import logo from '../assets/img/logo.svg';
import './Navbar.css';

const navItems = [
  { label: 'Methodology', href: '#methodology' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Force light mode always — dark mode disabled
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('arp-theme');
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className="nb">
        <div className="nb__inner">

          {/* ── Logo (Left) ────────────────────────────────── */}
          <a href="/" className="nb__brand" aria-label="ARP Brothers — Home">
            <img src={logo} alt="ARP Brothers" className="nb__logo" />
          </a>

          {/* ── Nav (Center) ────────────────────────────────── */}
          <nav className="nb__nav" aria-label="Primary">
            <ul className="nb__list">
              {navItems.map(({ label, href }) => (
                <li key={label} className="nb__item">
                  <a href={href} className="nb__link">
                    <span className="nb__link-text">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Socials & Mobile Toggle (Right) ─────────────────────────────── */}
          <div className="nb__right">
            <div className="nb__socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nb__social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nb__social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nb__social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" /></svg>
              </a>
            </div>

            <button
              className={`nb__hamburger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <span className="nb__bar"></span>
              <span className="nb__bar"></span>
              <span className="nb__bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav Overlay ────────────────────────────── */}
      <div className={`nb__mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="nb__mobile-inner">
          <div className="nb__mobile-header">
            <img src={logo} alt="ARP Brothers" className="nb__mobile-logo" />
          </div>
          <ul className="nb__mobile-list">
            {navItems.map(({ label, href }) => (
              <li key={label} className="nb__mobile-item">
                <a href={href} className="nb__mobile-link" onClick={() => setIsOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nb__mobile-footer">
            <p>© {new Date().getFullYear()} ARP Brothers. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`nb__backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
}

export default Navbar;
