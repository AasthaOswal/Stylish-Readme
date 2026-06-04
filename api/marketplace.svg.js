function escXml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const PLATFORMS = {
  producthunt: { label: 'Product Hunt', color: '#ff6154' },
  chrome:      { label: 'Chrome',       color: '#4285f4' }
};

export default function handler(req, res) {
  const { platform, id } = req.query;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');

  if (!platform || !id) {
    return res.status(400).send(`<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="320" height="80"><rect width="320" height="80" rx="12" fill="#1a1a1a"/><text x="20" y="45" font-size="13" fill="#f4f1ea" font-family="monospace">Missing: platform and id are required.</text></svg>`);
  }

  const match = PLATFORMS[String(platform).toLowerCase()];
  const label = match ? match.label : 'Marketplace';
  const color = match ? match.color : '#4A90E2';
  const title = `${label}: ${escXml(id)}`;

  const svg = `
<svg width="320" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="80" rx="12" fill="${color}"/>
  <text x="20" y="45" font-size="16" fill="white" font-family="monospace">${title}</text>
</svg>
  `;

  res.status(200).send(svg);
}
