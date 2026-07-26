const STORAGE_KEY = 'jts_hero_data';

const defaultHeroData = {
  firstName: 'JWALITH T',
  lastName: 'SURESH',
  statusText: 'Available for custom work',
  bio: 'Currently pursuing a Bachelor of Computer Applications (BCA), blending academic foundations with hands-on development and emerging technologies. I am a <span class="highlight-tag">Full-Stack Developer</span>, <span class="highlight-tag">AI Automation Specialist</span>, and <span class="highlight-tag">Discord/Telegram Bot Specialist</span> from Kerala, India, building intelligent automation workflows, powerful bots, and scalable web solutions.',
  highlights: ['Full-Stack Developer', 'AI Automation Specialist', 'Discord/Telegram Bot Specialist'],
  btn1Text: 'View Projects',
  btn2Text: "Let's Talk",
  badge1Icon: '🤖',
  badge1Text: 'AI Expert',
  badge2Icon: '💻',
  badge2Text: 'Full-Stack Dev',
  badge3Icon: '📍',
  badge3Text: 'Kerala, IN',
};

export function getHeroData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultHeroData, ...JSON.parse(stored) };
  } catch (_) { }
  return { ...defaultHeroData };
}

export function saveHeroData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) { }
}

export function resetHeroData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultHeroData };
}

export { defaultHeroData };
