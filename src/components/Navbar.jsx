import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';
const logoImg = '/logo-sm.png';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const scrollToSection = (id) => {
    setIsOpen(false);
    setActiveSection(id);
    
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const sections = ['home', 'portfolio', 'about', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar border-bottom">
      <div className="navbar-container container">
        <button onClick={() => scrollToSection('home')} className="nav-logo-btn">
          <img src={logoImg} alt="JTS Logo" className="nav-logo-img" width="42" height="67" />
          <span className="nav-logo-sub">/ JWALITH</span>
        </button>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <button 
            onClick={() => scrollToSection('home')} 
            className={`nav-btn-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            <span className="nav-link-num">01</span>Home
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className={`nav-btn-link ${activeSection === 'portfolio' ? 'active' : ''}`}
          >
            <span className="nav-link-num">02</span>Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className={`nav-btn-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            <span className="nav-link-num">03</span>About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={`nav-btn-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            <span className="nav-link-num">04</span>Contact
          </button>
          
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
          <button 
            onClick={() => scrollToSection('home')} 
            className={`nav-btn-link-mobile ${activeSection === 'home' ? 'active' : ''}`}
          >
            <span className="nav-link-num">01</span>Home
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className={`nav-btn-link-mobile ${activeSection === 'portfolio' ? 'active' : ''}`}
          >
            <span className="nav-link-num">02</span>Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className={`nav-btn-link-mobile ${activeSection === 'about' ? 'active' : ''}`}
          >
            <span className="nav-link-num">03</span>About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={`nav-btn-link-mobile ${activeSection === 'contact' ? 'active' : ''}`}
          >
            <span className="nav-link-num">04</span>Contact
          </button>
          
          <button 
            onClick={() => { toggleTheme(); setIsOpen(false); }} 
            className="theme-toggle-btn-mobile" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
          </button>
        </div>
      </div>
    </nav>
  );
}
