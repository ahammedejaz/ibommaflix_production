#!/usr/bin/env node

/**
 * Sitemap Generator for iBommaFlix
 * Generates a comprehensive sitemap.xml with all movie URLs
 * Run: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://ibommaflix.com';
const TODAY = new Date().toISOString().split('T')[0];

// Read and parse movie lists from source file
function extractMovieTitles() {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'movieList.js');
  const content = fs.readFileSync(filePath, 'utf-8');

  const titles = [];
  const regex = /"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    titles.push(match[1]);
  }

  // Deduplicate
  return [...new Set(titles)];
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrl(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const movieTitles = extractMovieTitles();
  const urls = [];

  // Static pages
  urls.push(buildUrl(`${DOMAIN}/`, TODAY, 'daily', '1.0'));
  urls.push(buildUrl(`${DOMAIN}/category/tollywood`, TODAY, 'daily', '0.9'));
  urls.push(buildUrl(`${DOMAIN}/category/bollywood`, TODAY, 'daily', '0.9'));
  urls.push(buildUrl(`${DOMAIN}/category/hollywood`, TODAY, 'daily', '0.9'));
  urls.push(buildUrl(`${DOMAIN}/about`, TODAY, 'monthly', '0.5'));
  urls.push(buildUrl(`${DOMAIN}/contact`, TODAY, 'monthly', '0.5'));
  urls.push(buildUrl(`${DOMAIN}/privacy-policy`, TODAY, 'yearly', '0.3'));
  urls.push(buildUrl(`${DOMAIN}/terms-of-service`, TODAY, 'yearly', '0.3'));
  urls.push(buildUrl(`${DOMAIN}/disclaimer`, TODAY, 'yearly', '0.3'));

  // Dynamic movie pages
  for (const title of movieTitles) {
    const encodedTitle = encodeURIComponent(title);
    urls.push(buildUrl(`${DOMAIN}/movie/${encodedTitle}`, TODAY, 'weekly', '0.7'));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, sitemap, 'utf-8');

  console.log(`Sitemap generated: ${outPath}`);
  console.log(`  Static pages: 9`);
  console.log(`  Movie pages:  ${movieTitles.length}`);
  console.log(`  Total URLs:   ${9 + movieTitles.length}`);
}

generateSitemap();
