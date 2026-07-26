const webDevGif = 'https://i.postimg.cc/C1z7v0r9/Web-Developer.gif';
const botDevGif = 'https://i.postimg.cc/6pfMqYvB/discord-and-telegram-Bot-Dev.gif';
const automationGif = 'https://i.postimg.cc/XYb2nTXK/Automation-Builder.gif';

const STORAGE_KEY = 'jts_projects_data';

// GIF map — used so saved projects can reference a gif by key
export const gifMap = {
  webDevGif,
  botDevGif,
  automationGif,
};


export const projects = [
  {
    id: 'yatra',
    num: '01',
    title: 'Yatra',
    category: 'Web Application',
    subcategory: 'Culture & Travel Showcase',
    year: '2026',
    gif: 'https://i.ibb.co/G3GJX5GG/website-tour.webp',
    demoType: 'Web Portal',
    githubUrl: 'https://github.com/xtros/Yatra',
    summary: 'A dynamic web portal highlighting India\'s rich heritage, top travel destinations, and interactive cultural experiences.',
    description: 'Yatra is an immersive digital platform showcasing popular tourist destinations, historical landmarks, travel guides, and interactive cultural insights across India.',
    features: [
      'Interactive destination showcases and regional travel highlights',
      'Responsive, modern UI with rich Indian cultural aesthetics',
      'Search and filter features for tourist spots and heritage places',
      'Clean modular architecture designed for fast loading speeds'
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'React'],
    demoUrl: 'https://yatra-jts.vercel.app',
    demoBtnLabel: 'Test Live Website'
  },
  {
    id: 'pookie-musix',
    num: '02',
    title: 'Pookie Musix',
    category: 'Discord Bot Development',
    subcategory: 'Music & Audio Streaming',
    year: '2026',
    hasVisualDemo: false,
    githubUrl: 'https://github.com/xtros/Pookie-Musix',
    summary: 'A high-performance Discord music bot for low-latency voice streaming and server playlist management.',
    description: 'Pookie Musix is a feature-rich Discord music bot engineered for seamless high-fidelity audio playback, custom queue management, and persistent playlist controls across Discord servers.',
    features: [
      'Low-latency voice channel audio streaming connections',
      'Dynamic music queue management and playback controls',
      'Custom playlist creation and server integrations',
      'Spam reduction controls and intuitive bot command triggers'
    ],
    techStack: ['JavaScript', 'Node.js', 'Discord.js', 'MongoDB'],
    demoUrl: 'https://github.com/xtros/Pookie-Musix',
    demoBtnLabel: 'View Code on GitHub'
  }
];

// Serialize projects for storage (replace gif object refs with key strings)
function serializeProjects(list) {
  return list.map(p => ({
    ...p,
    gifKey: typeof p.gif === 'string' ? p.gif : (p.gifKey || (p.gif === gifMap.botDevGif ? 'botDevGif' : p.gif === gifMap.automationGif ? 'automationGif' : 'webDevGif')),
    gif: typeof p.gif === 'string' ? p.gif : undefined,
  }));
}

// Rehydrate projects from storage (restore gif objects from keys)
function deserializeProjects(list) {
  return list.map(p => ({
    ...p,
    gif: (typeof p.gifKey === 'string' && (p.gifKey.startsWith('http://') || p.gifKey.startsWith('https://')))
      ? p.gifKey
      : (gifMap[p.gifKey] || p.gif || gifMap.webDevGif),
  }));
}

export function getProjects() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) { }
  return projects;
}

export function saveProjects(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeProjects(list)));
  } catch (_) { }
}

export function resetProjects() {
  localStorage.removeItem(STORAGE_KEY);
  return projects;
}
