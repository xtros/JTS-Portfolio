import React from 'react';
import { Download } from 'lucide-react';
const avatarImg = '/avatar.webp';
import { getAboutData } from '../data/aboutData';
import './About.css';

export default function About() {
  const about = getAboutData();

  return (
    <div className="about-page animate-fade-in">
      <header className="about-header border-bottom">
        <div className="container about-header-container">
          <span className="section-number reveal">003 / INFO</span>
          <h1 className="about-title reveal delay-1">ABOUT ME</h1>
          <p className="about-subtitle reveal delay-2">
            A developer dedicated to building automated systems, backend bot integrations, and interactive web solutions.
          </p>
        </div>
      </header>

      {/* Main Info Blocks */}
      <section className="about-content-section">
        <div className="container">
          {/* Block 1: Bio */}
          <div className="about-block border-bottom reveal">
            <div className="block-num-col">
              <span className="block-num">001</span>
            </div>
            <div className="block-content-col">
              <h2 className="block-title">BIOGRAPHY</h2>
              <div className="bio-layout">
                <div className="bio-text">
                  <div className="block-desc-text" dangerouslySetInnerHTML={{ __html: about.bio1 }} />
                  <div className="block-desc-text" dangerouslySetInnerHTML={{ __html: about.bio2 }} />
                  <div style={{ marginTop: '24px' }}>
                    <a href="/resume.pdf" download="Jwalith_T_Suresh_Resume.pdf" className="btn-outline">
                      Download Full Resume <Download size={18} />
                    </a>
                  </div>
                </div>
                <div className="bio-avatar-container">
                  <img src={avatarImg} alt="Jwalith T Suresh Avatar" className="bio-avatar" />
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Studies */}
          <div className="about-block border-bottom reveal">
            <div className="block-num-col">
              <span className="block-num">002</span>
            </div>
            <div className="block-content-col">
              <h2 className="block-title">ACADEMIC JOURNEY</h2>
              <div className="block-desc-text" dangerouslySetInnerHTML={{ __html: about.academic1 }} />
              <div className="block-desc-text" dangerouslySetInnerHTML={{ __html: about.academic2 }} />
            </div>
          </div>

          {/* Block 3: Skills */}
          <div className="about-block border-bottom reveal">
            <div className="block-num-col">
              <span className="block-num">003</span>
            </div>
            <div className="block-content-col">
              <h2 className="block-title">TECHNICAL EXPERTISE</h2>
              <p className="block-desc-text">
                Over the course of my projects, I have developed skills across various backend languages, visual scripting, and framework stacks:
              </p>
              <div className="skills-list">
                {about.skills.map((skill, i) => (
                  <div key={i} className="skill-row reveal">
                    <span className="skill-row-num">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="skill-row-name">{skill.name}</span>
                    <div className="skill-row-progress-container">
                      <div className="skill-row-progress-bar" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                    </div>
                    <span className="skill-row-pct">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
