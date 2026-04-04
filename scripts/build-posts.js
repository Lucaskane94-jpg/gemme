const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR    = path.join(__dirname, '..', 'posts');
const OUTPUT_DIR   = path.join(__dirname, '..');
const TEMPLATE     = fs.readFileSync(path.join(__dirname, 'post-template.html'), 'utf8');
const INDEX_OUTPUT = path.join(__dirname, '..', 'posts-index.json');

// Configure marked for clean HTML
marked.setOptions({ breaks: true, gfm: true });

const posts = [];

fs.readdirSync(POSTS_DIR).forEach(file => {
  if (!file.endsWith('.md')) return;

  const raw     = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const slug    = file.replace('.md', '');
  const html    = marked.parse(content || '');
  const date    = data.date ? new Date(data.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
  const dateISO = data.date ? new Date(data.date).toISOString().split('T')[0] : '';
  const image   = data.image || '';
  const desc    = data.description || '';
  const title   = data.title || 'Articolo';

  // Generate full HTML page from template
  let page = TEMPLATE
    .replace(/{{TITLE}}/g,       title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{DATE}}/g,        date)
    .replace(/{{DATE_ISO}}/g,    dateISO)
    .replace(/{{SLUG}}/g,        slug)
    .replace(/{{IMAGE}}/g,       image)
    .replace(/{{CONTENT}}/g,     html)
    .replace(/{{CANONICAL}}/g,   `https://gianmarcomonaco.org/${slug}.html`);

  // Hero image block
  const imgBlock = image
    ? `<img src="${image}" alt="${title}" class="post-hero-img">`
    : '';
  page = page.replace('{{IMAGE_BLOCK}}', imgBlock);

  // OG image meta
  const ogImg = image
    ? `<meta property="og:image" content="https://gianmarcomonaco.org${image}">`
    : '';
  page = page.replace('{{OG_IMAGE}}', ogImg);

  fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), page);
  console.log(`✓ Generated ${slug}.html`);

  posts.push({ slug, title, description: desc, date: dateISO, image });
});

// Sort by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write index JSON for blog.html to consume
fs.writeFileSync(INDEX_OUTPUT, JSON.stringify(posts, null, 2));
console.log(`✓ Generated posts-index.json (${posts.length} posts)`);
