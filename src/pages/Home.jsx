import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
const avatarImg = '/avatar.webp';
const webDevGif = 'https://i.postimg.cc/C1z7v0r9/Web-Developer.gif';
const botDevGif = 'https://i.postimg.cc/6pfMqYvB/discord-and-telegram-Bot-Dev.gif';
const automationGif = 'https://i.postimg.cc/XYb2nTXK/Automation-Builder.gif';
import TerminalConsole from '../components/TerminalConsole';
import { getHeroData } from '../data/heroData';
import './Home.css';



export default function Home() {
  const hero = getHeroData();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <header className="hero-section border-bottom">
        <div className="hero-glow-blob-1"></div>
        <div className="hero-glow-blob-2"></div>

        <div className="container hero-container-split">
          {/* Left Block */}
          <div className="hero-left-block">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text">{hero.statusText}</span>
            </div>

            <h1 className="hero-title" aria-label={`${hero.firstName} ${hero.lastName}`}>
              {hero.firstName} <br />
              <span className="hero-gradient-text">{hero.lastName}</span>
            </h1>

            <div className="hero-bio" dangerouslySetInnerHTML={{ __html: hero.bio }} />

            <div className="hero-actions">
              <button onClick={() => scrollToSection('portfolio')} className="btn-outline">
                {hero.btn1Text} <ArrowUpRight size={18} />
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                {hero.btn2Text} <ArrowUpRight size={18} />
              </button>
              <a href="/resume.pdf" download="Jwalith_T_Suresh_Resume.pdf" className="btn-outline btn-download-resume">
                Download Resume <Download size={18} />
              </a>
            </div>
          </div>

          {/* Right Block */}
          <div className="hero-right-block">
            <div className="showcase-card-wrapper">
              <div className="showcase-card">
                <div className="showcase-card-border-glow"></div>
                <div className="avatar-frame">
                  <img src={avatarImg} alt="Jwalith T Suresh" className="avatar-img-glow" fetchPriority="high" decoding="async" width="300" height="300" />
                </div>
              </div>

              <div className="floating-badge tag-bots animate-float-slow">
                <span className="badge-icon">{hero.badge1Icon}</span>
                <span className="badge-text">{hero.badge1Text}</span>
              </div>
              <div className="floating-badge tag-react animate-float-medium">
                <span className="badge-icon">{hero.badge2Icon}</span>
                <span className="badge-text">{hero.badge2Text}</span>
              </div>
              <div className="floating-badge tag-loc animate-float-fast">
                <span className="badge-icon">{hero.badge3Icon}</span>
                <span className="badge-text">{hero.badge3Text}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Focus Area Grid */}
      <section className="focus-section border-bottom">
        <div className="container focus-container">
          <div className="section-header-row">
            <span className="section-number reveal">002 / CORE SPECIALTIES</span>
            <h2 className="section-title reveal delay-1">WHAT I BUILD</h2>
          </div>

          <div className="focus-grid">
            <div className="focus-card border-bottom border-top reveal">
              <div className="focus-card-meta">
                <span className="focus-card-num"># 01</span>
                <span className="focus-card-label">DEVELOPMENT</span>
              </div>
              <h3 className="focus-card-title">Web Developer</h3>
              <p className="focus-card-desc">
                Building fast, responsive, and visual frontend layouts with React.js and HTML/CSS, backed by PHP and Django CMS backends.
              </p>
              <div className="focus-card-media">
                <img src={webDevGif} alt="Web Developer workflow" className="focus-gif" loading="lazy" decoding="async" />
              </div>
            </div>

            <div className="focus-card border-bottom border-top reveal delay-1">
              <div className="focus-card-meta">
                <span className="focus-card-num"># 02</span>
                <span className="focus-card-label">INTEGRATION</span>
              </div>
              <h3 className="focus-card-title">Bot Developer</h3>
              <p className="focus-card-desc">
                Creating interactive Discord and Telegram bots using discord.js and Python. Integrating automated verification, moderator engines, and APIs.
              </p>
              <div className="focus-card-media">
                <img src={botDevGif} alt="Bot Developer workflow" className="focus-gif" loading="lazy" decoding="async" />
              </div>
            </div>

            <div className="focus-card border-bottom border-top reveal delay-2">
              <div className="focus-card-meta">
                <span className="focus-card-num"># 03</span>
                <span className="focus-card-label">AUTOMATION</span>
              </div>
              <h3 className="focus-card-title">Automation Builder</h3>
              <p className="focus-card-desc">
                Designing custom AI automation workflows, backend tasks, content scrapers, schedulers, and webhook receivers using Python and modern scripting tools.
              </p>
              <div className="focus-card-media">
                <img src={automationGif} alt="Automation Builder workflow" className="focus-gif" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Terminal */}
      <section className="terminal-section border-bottom">
        <div className="container terminal-section-container">
          <div className="section-header-row">
            <span className="section-number reveal">003 / INTERACTIVE SIMULATOR</span>
            <h2 className="section-title reveal delay-1">CLIENT SHELL CONSOLE</h2>
          </div>
          <div className="terminal-wrapper">
            <TerminalConsole />
          </div>
          <div className="narrative-footer reveal delay-3" style={{ marginTop: '40px' }}>
            <button onClick={() => scrollToSection('about')} className="btn-outline">
              Learn More About Me <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
