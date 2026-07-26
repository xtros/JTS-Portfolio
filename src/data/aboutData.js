const STORAGE_KEY = 'jts_about_data';

const defaultAboutData = {
  bio1: "I'm Jwalith T Suresh (JTS), a developer from Kerala, India, currently pursuing a Bachelor of Computer Applications (BCA). I specialize in full-stack development, AI automation, and Discord & Telegram bot development, with a passion for transforming ideas into practical, scalable digital solutions.",
  bio2: "Driven by a problem-solving mindset, I build solutions that address real-world challenges and streamline digital experiences. From developing secure verification systems and intelligent automation workflows to building powerful bots and responsive web applications, I focus on clean code, reliability, performance, and creating products that deliver real value.",
  academic1: "I'm currently pursuing a Bachelor of Computer Applications (BCA), building a strong foundation in software development, programming, database systems, and modern computing concepts. Beyond academics, I actively turn what I learn into hands-on projects, bridging the gap between theoretical knowledge and practical development.",
  academic2: "Alongside my studies, I continuously explore full-stack development, AI automation, bot development, and database-driven applications. Through experimentation and real-world projects, I keep expanding my technical knowledge, refining my skills, and adapting to evolving technologies.",
  skills: [
    { name: 'Python', level: 88, color: '#3776ab' },
    { name: 'JavaScript', level: 74, color: '#f7df1e' },
    { name: 'PHP', level: 65, color: '#777bb4' },
    { name: 'HTML', level: 65, color: '#e34f26' },
    { name: 'CSS', level: 60, color: '#1572b6' },
    { name: 'Discord.js', level: 80, color: '#5865f2' },
    { name: 'React.js', level: 82, color: '#61dafb' },
    { name: 'TypeScript', level: 78, color: '#3178c6' },
    { name: 'SQL', level: 80, color: '#00758f' },
    { name: 'Django', level: 58, color: '#092e20' },
    { name: 'AI Automation', level: 85, color: '#8a2be2' },
  ],
};

export function getAboutData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultAboutData, ...JSON.parse(stored) };
  } catch (_) {}
  return { ...defaultAboutData };
}

export function saveAboutData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

export function resetAboutData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultAboutData };
}

export { defaultAboutData };
