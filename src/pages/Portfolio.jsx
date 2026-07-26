import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, Maximize2, X, Monitor, Code, ExternalLink } from 'lucide-react';
import { getProjects } from '../data/projects';
import { getTechLogo } from '../utils/techLogos';
import './Portfolio.css';

export default function Portfolio() {
  const [activeId, setActiveId] = useState(null);
  const [activeTabs, setActiveTabs] = useState({}); // { [projectId]: 'demo' | 'code' }
  const [lightbox, setLightbox] = useState(null); // { src, title }

  const projects = getProjects();

  const toggleProject = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const setTab = (projectId, tab) => {
    setActiveTabs(prev => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="portfolio" className="portfolio-page">
      <header className="portfolio-header border-bottom">
        <div className="container portfolio-header-container">
          <span className="section-number reveal">004 / WORKS</span>
          <h1 className="portfolio-title reveal delay-1">PORTFOLIO</h1>
          <p className="portfolio-subtitle reveal delay-2">
            A curated collection of digital tools, Discord/Telegram integrations, web systems, and AI automation.
          </p>
        </div>
      </header>

      <div className="portfolio-list-section border-bottom">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, index) => {
              const isOpen = activeId === project.id;
              const isBotProject = project.hasVisualDemo === false || project.category?.toLowerCase().includes('bot');
              const currentTab = activeTabs[project.id] || (isBotProject ? 'code' : 'demo');

              return (
                <div key={project.id} className="project-row border-bottom reveal">
                  <button 
                    onClick={() => toggleProject(project.id)} 
                    className={`project-row-header-btn ${isOpen ? 'open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <div className="project-row-left">
                      <span className="project-num">({project.num})</span>
                      <div className="project-meta-info">
                        <h2 className="project-title">{project.title}</h2>
                        <span className="project-category">{project.category}</span>
                      </div>
                    </div>

                    <div className="project-row-right">
                      <span className="project-year">{project.year}</span>
                      <span className="project-action-btn">
                        {isOpen ? 'Close' : 'Details'} {isOpen ? <ArrowDown size={18} /> : <ArrowUpRight size={18} />}
                      </span>
                    </div>
                  </button>

                  {/* Inline Expanded Project Details Drawer */}
                  <div className={`project-details-expanded-drawer ${isOpen ? 'expanded' : ''}`}>
                    <div className="expanded-details-grid">
                      {/* Visual & Code Column */}
                      <div className="expanded-media-col">
                        {!isBotProject ? (
                          <div className="media-header-controls">
                            <div className="media-tabs">
                              <button 
                                className={`media-tab-btn ${currentTab === 'demo' ? 'active' : ''}`}
                                onClick={() => setTab(project.id, 'demo')}
                              >
                                <Monitor size={14} /> Visual Demo
                              </button>
                              <button 
                                className={`media-tab-btn ${currentTab === 'code' ? 'active' : ''}`}
                                onClick={() => setTab(project.id, 'code')}
                              >
                                <Code size={14} /> Code Spec
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="media-header-controls">
                            <div className="media-tabs">
                              <button className="media-tab-btn active" style={{ cursor: 'default' }}>
                                <Code size={14} /> Code Spec
                              </button>
                            </div>
                          </div>
                        )}

                        {currentTab === 'demo' && !isBotProject ? (
                          <div className="project-demo-card">
                            <div className="demo-top-bar">
                              <div className="pv-dots">
                                <span /><span /><span />
                              </div>
                              <div className="demo-url-pill">
                                <span className="demo-live-dot" />
                                <span className="demo-filename">
                                  {project.title.toLowerCase().replace(/\s+/g, '-')}-demo.gif
                                </span>
                              </div>
                              <div className="demo-top-actions">
                                {project.demoUrl && (
                                  <a 
                                    href={project.demoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="demo-test-top-btn"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink size={12} /> {project.demoBtnLabel || 'Test Demo'}
                                  </a>
                                )}
                                <span className="demo-badge">{project.demoType || 'Live Demo'}</span>
                              </div>
                            </div>

                            <div className="demo-visual-wrapper" onClick={() => setLightbox({ src: project.gif, title: project.title })}>
                              {project.gif ? (
                                <img 
                                  src={project.gif} 
                                  alt={`${project.title} Visual Demo`} 
                                  className="project-demo-gif" 
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div className="demo-placeholder-box">
                                  <span>No visual demo media loaded</span>
                                </div>
                              )}
                              
                              <div className="demo-hover-overlay">
                                <span className="demo-expand-badge">
                                  <Maximize2 size={16} /> Click to Fullscreen Demo
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="project-visual-card" style={{ '--pv-hue': (index * 70 + 260) % 360 }}>
                            <div className="pv-top-bar">
                              <div className="pv-dots">
                                <span /><span /><span />
                              </div>
                              <span className="pv-filename">{project.title.toLowerCase().replace(/\s+/g, '-')}.js</span>
                            </div>
                            <div className="pv-body">
                              <div className="pv-line"><span className="pv-keyword">const</span> <span className="pv-var">project</span> = {'{'}</div>
                              <div className="pv-line pv-indent"><span className="pv-key">name</span>: <span className="pv-string">"{project.title}"</span>,</div>
                              <div className="pv-line pv-indent"><span className="pv-key">category</span>: <span className="pv-string">"{project.category}"</span>,</div>
                              <div className="pv-line pv-indent"><span className="pv-key">year</span>: <span className="pv-num">{project.year}</span>,</div>
                              <div className="pv-line pv-indent"><span className="pv-key">stack</span>: [</div>
                              {project.techStack.slice(0, 4).map((tech, ti) => (
                                <div key={ti} className="pv-line pv-indent2"><span className="pv-string">"{tech}"</span>{ti < Math.min(project.techStack.length, 4) - 1 ? ',' : ''}</div>
                              ))}
                              <div className="pv-line pv-indent">],</div>
                              <div className="pv-line">{'}'}</div>
                            </div>
                            <div className="pv-glow" />
                          </div>
                        )}
                      </div>
                      
                      {/* Text details col */}
                      <div className="expanded-text-col">
                        <h3 className="expanded-section-title">OVERVIEW</h3>
                        <div className="expanded-description" dangerouslySetInnerHTML={{ __html: project.description }} />

                        <h3 className="expanded-section-title" style={{ marginTop: '24px' }}>KEY FEATURES</h3>
                        <ul className="expanded-features-list">
                          {project.features.map((feature, i) => (
                            <li key={i} className="expanded-feature-item" dangerouslySetInnerHTML={{ __html: feature }} />
                          ))}
                        </ul>

                        <h3 className="expanded-section-title" style={{ marginTop: '24px' }}>TECH STACK</h3>
                        <div className="expanded-tech-tags">
                          {project.techStack.map((tech, i) => {
                            const logoUrl = getTechLogo(tech);
                            return (
                              <span key={i} className="expanded-tech-tag" title={tech}>
                                {logoUrl && <img src={logoUrl} alt={tech} className="tech-tag-logo" />}
                                <span>{tech}</span>
                              </span>
                            );
                          })}
                        </div>

                        <div className="project-actions-row" style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {project.demoUrl && project.demoUrl !== project.githubUrl && (
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-demo-test"
                            >
                              <ExternalLink size={15} /> {project.demoBtnLabel || 'Test Live Demo'}
                            </a>
                          )}
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-outline"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '0.85rem' }}
                            >
                              View Code on GitHub <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Under Development Banner */}
          <div className="more-projects-banner reveal delay-2">
            <span className="pulse-dot"></span>
            <span>More projects are currently under active development. Stay tuned or check my <a href="https://github.com/xtros" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a> for upcoming releases!</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Visual Demo */}
      {lightbox && (
        <div className="demo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="demo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="demo-lightbox-header">
              <span className="demo-lightbox-title">{lightbox.title} — Visual Demo</span>
              <button className="demo-lightbox-close" onClick={() => setLightbox(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="demo-lightbox-body">
              <img src={lightbox.src} alt={`${lightbox.title} Full visual demo`} className="demo-lightbox-img" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
