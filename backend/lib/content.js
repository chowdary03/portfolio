const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');

function loadJson(filename) {
  const filepath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(raw);
}

function loadAll() {
  return {
    profile: loadJson('profile.json'),
    projects: loadJson('projects.json'),
    experience: loadJson('experience.json'),
    education: loadJson('education.json'),
    achievements: loadJson('achievements.json'),
    certifications: loadJson('certifications.json'),
    skills: loadJson('skills.json'),
  };
}

module.exports = { loadAll };
