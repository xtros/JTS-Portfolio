import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { getProjects } from '../data/projects';
import './TerminalConsole.css';

function TypingLog({ text, speed = 15, onComplete, bodyRef }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < text.length) {
        const char = text.charAt(index);
        setDisplayedText((prev) => prev + char);
        index++;
      }

      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }

      if (bodyRef && bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete, bodyRef]);

  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {displayedText}
      {isTyping && <span className="terminal-cursor-block">█</span>}
    </span>
  );
}

export default function TerminalConsole() {
  const [logs, setLogs] = useState([]);
  const [hasStarted, setHasStarted] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef(null);
  const bodyRef = useRef(null);

  const commandList = [
    { cmd: '/help', desc: 'List commands' },
    { cmd: '/about', desc: 'Developer bio' },
    { cmd: '/skills', desc: 'Core skills' },
    { cmd: '/projects', desc: 'GitHub works' },
    { cmd: '/ping', desc: 'Latency test' }
  ];

  // Trigger boot sequence when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const initialLines = [
      { type: 'system', text: 'Initializing JTS bot shell interface...' },
      { type: 'system', text: 'Status: Connected. Client version: jts-terminal-1.01' },
      { type: 'system', text: 'Type a command or click the buttons below to interact.' }
    ];

    const timer1 = setTimeout(() => {
      setLogs(prev => [...prev, initialLines[0]]);
    }, 200);

    const timer2 = setTimeout(() => {
      setLogs(prev => [...prev, initialLines[1]]);
    }, 850);

    const timer3 = setTimeout(() => {
      setLogs(prev => [...prev, initialLines[2]]);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [hasStarted]);

  useEffect(() => {
    // Auto scroll the terminal log list internally
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (commandText) => {
    const trimmed = commandText.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...logs, { type: 'input', text: `JTS_client > ${commandText}` }];

    if (trimmed === '/help') {
      newLogs.push({
        type: 'output',
        text: 'Available Commands:\n  /about    - Brief profile of Jwalith T Suresh\n  /skills   - Core tech stack & tools\n  /projects - Highlighted GitHub repositories\n  /ping     - Bot command latency test\n  /clear    - Reset the terminal logs'
      });
    } else if (trimmed === '/about') {
      newLogs.push({
        type: 'output',
        text: 'Jwalith T Suresh (JTS)\n=======================\n- Role: BCA Student, Full-Stack Developer & Bot Builder\n- Location: Kerala, India\n- Passion: Visual web interfaces, bot integrations, and AI workflow scheduling.'
      });
    } else if (trimmed === '/skills') {
      newLogs.push({
        type: 'output',
        text: 'Languages: Python, JavaScript, TypeScript, PHP, HTML/CSS, SQL\nFrameworks: React.js, Django\nLibraries: Discord.js, Telegram Bot API\nSpecialties: Custom bot logic, Webhooks, Canvas API graphics generation'
      });
    } else if (trimmed === '/projects') {
      const activeProjects = getProjects();
      const projectLines = activeProjects.map((p, idx) => {
        const mainLang = p.techStack && p.techStack.length ? p.techStack[0] : 'JS';
        return `  ${idx + 1}. ${p.title.padEnd(22)} [${mainLang}] - ${p.summary}`;
      }).join('\n');
      newLogs.push({
        type: 'output',
        text: `Featured Public Repositories:\n${projectLines}\nTry typing: /project 1, /project 2, etc. for details.`
      });
    } else if (trimmed.startsWith('/project')) {
      const parts = trimmed.split(' ');
      const activeProjects = getProjects();
      if (parts.length > 1) {
        const idx = parseInt(parts[1], 10) - 1;
        if (idx >= 0 && idx < activeProjects.length) {
          const p = activeProjects[idx];
          const techList = p.techStack ? p.techStack.join(', ') : '';
          newLogs.push({
            type: 'output',
            text: `Name: ${p.title}\nTech Stack: ${techList}\nDescription: ${p.description || p.summary}\nGitHub: ${p.githubUrl || ''}`
          });
        } else {
          newLogs.push({
            type: 'error',
            text: `Project index out of bounds. Enter a value between 1 and ${activeProjects.length}.`
          });
        }
      } else {
        const projectLines = activeProjects.map((p, idx) => {
          const mainLang = p.techStack && p.techStack.length ? p.techStack[0] : 'JS';
          return `  ${idx + 1}. ${p.title.padEnd(22)} [${mainLang}] - ${p.summary}`;
        }).join('\n');
        newLogs.push({
          type: 'output',
          text: `Featured Public Repositories:\n${projectLines}\nTry typing: /project 1, /project 2, etc. for details.`
        });
      }
    } else if (trimmed === '/ping') {
      newLogs.push({
        type: 'output',
        text: `Pong! Latency: ${Math.floor(Math.random() * 20) + 25}ms. System state: Operational.`
      });
    } else if (trimmed === '/clear') {
      setLogs([]);
      setInputValue('');
      return;
    } else {
      newLogs.push({
        type: 'error',
        text: `Command not found: "${commandText}". Type /help to view list.`
      });
    }

    setLogs(newLogs);
    setInputValue('');
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputValue);
  };

  return (
    <div className="terminal-container reveal" ref={containerRef}>
      {/* Top Header Mocking OS bar */}
      <div className="terminal-header">
        <div className="terminal-actions">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">
          <Terminal size={14} /> root@jts: ~
        </div>
        <div className="terminal-spacer"></div>
      </div>

      {/* Terminal Output Logs */}
      <div className="terminal-body" ref={bodyRef}>
        {logs.map((log, idx) => (
          <div key={idx} className={`log-line log-${log.type}`}>
            {log.type === 'input' ? (
              log.text
            ) : (
              <TypingLog text={log.text} speed={12} bodyRef={bodyRef} />
            )}
          </div>
        ))}
      </div>

      {/* Quick Suggested Buttons */}
      <div className="terminal-suggestions">
        <span className="suggestions-label">Try commands:</span>
        <div className="suggestions-buttons">
          {commandList.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="suggestion-btn"
              onClick={() => handleCommand(item.cmd)}
            >
              {item.cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={onFormSubmit} className="terminal-input-form border-top">
        <span className="input-prompt">JTS_client &gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a bot command (e.g. /help, /skills) and press Enter..."
          className="terminal-input"
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" className="terminal-submit" aria-label="Submit command">
          <CornerDownLeft size={16} />
        </button>
      </form>
    </div>
  );
}
