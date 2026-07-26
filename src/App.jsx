import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollRevealHandler() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    const timer = setTimeout(() => {
      const currentRevealElements = document.querySelectorAll('.reveal');
      currentRevealElements.forEach((el) => observer.observe(el));
    }, 150);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);
  return null;
}

export default function App() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollRevealHandler />
      <Navbar />
      <main className="main-content">
        <div id="home">
          <Home />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="about">
          <div className="border-top"></div>
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>

        {/* CTA Section */}
        <section className="cta-section border-top">
          <div className="container cta-container">
            <div className="cta-content reveal">
              <h2 className="cta-title">HAVE A PROJECT IN MIND?</h2>
              <p className="cta-subtitle">Let's build custom bot tools, automated scripts, or dynamic websites together.</p>
              <button onClick={scrollToContact} className="btn-outline cta-btn">
                Contact Now <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

