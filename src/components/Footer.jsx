import React from 'react';
import './Footer.css';
const logoImg = '/logo-sm.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer border-top">
      <div className="footer-container container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logoImg} alt="JTS Logo" className="footer-logo-img" width="40" height="64" />
          </div>
          <p className="footer-tagline">BCA Student & Developer from Kerala, India.</p>
        </div>

        <div className="footer-nav">
          <button onClick={() => scrollToSection('home')} className="footer-btn-link">Home</button>
          <button onClick={() => scrollToSection('portfolio')} className="footer-btn-link">Portfolio</button>
          <button onClick={() => scrollToSection('about')} className="footer-btn-link">About</button>
          <button onClick={() => scrollToSection('contact')} className="footer-btn-link">Contact</button>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} JTS. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://github.com/xtros" target="_blank" rel="noopener noreferrer" className="social-link">Github</a>
            <a href="https://t.me/jtsxtros" target="_blank" rel="noopener noreferrer" className="social-link">Telegram</a>
            <a href="https://discord.com/users/1290158416664203285" target="_blank" rel="noopener noreferrer" className="social-link">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
