// Runs after `vite build`. Writes one HTML file per route with that page's own title,
// description, canonical and schema, plus a plain-HTML copy of the page's main content
// inside #root. React replaces that copy on load (createRoot), so visitors see the normal
// site, while Google and AI crawlers that do not run JavaScript still get real text.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { posts } from '../src/blogPosts.js'

const SITE = 'https://ready4refurb.com'
const DIST = new URL('../dist/', import.meta.url)
const template = readFileSync(new URL('index.html', DIST), 'utf8')
const BUSINESS = { '@id': `${SITE}/#localbusiness` }
const AREAS = ['Towcester', 'Northampton', 'Milton Keynes', 'Northamptonshire'].map((name) => ({ '@type': 'Place', name }))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const wrap = (html) =>
  `<div style="max-width:720px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;line-height:1.6">${html}</div>`

// Minimal markdown for the blog bodies: headings, bold, lists, rules and paragraphs.
function markdown(md) {
  const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  const out = []
  let list = false
  for (const line of md.trim().split('\n')) {
    const l = line.trim()
    if (!l.startsWith('- ') && list) { out.push('</ul>'); list = false }
    if (!l || l === '---') continue
    if (l.startsWith('### ')) out.push(`<h3>${inline(l.slice(4))}</h3>`)
    else if (l.startsWith('## ')) out.push(`<h2>${inline(l.slice(3))}</h2>`)
    else if (l.startsWith('- ')) { if (!list) { out.push('<ul>'); list = true } out.push(`<li>${inline(l.slice(2))}</li>`) }
    else out.push(`<p>${inline(l)}</p>`)
  }
  if (list) out.push('</ul>')
  return out.join('\n')
}

const nav = `<p><a href="/">Bathroom fitting</a> · <a href="/book-snagging/">New build snagging</a> · <a href="/quote/">Free quote</a> · <a href="/blog/">Advice</a> · <a href="tel:+447734024192">07734 024192</a></p>`

const pages = [
  {
    path: '/',
    title: 'Bathroom Fitters in Towcester | Ready For Refurb',
    description: 'Bathroom fitting, wet rooms, tiling and home renovations in Towcester, Northampton and Milton Keynes. One team, fixed-price quotes, rated 5 stars on Google.',
    body: `${nav}
<h1>Bathroom fitters in Towcester, Northampton and Milton Keynes</h1>
<p>Ready For Refurb LTD fits bathrooms, wet rooms and kitchens across Towcester, Northampton, Milton Keynes and the surrounding areas. One team handles the whole job from survey to handover, with a fixed price agreed up front.</p>
<h2>What we do</h2>
<ul><li>Bathroom fitting: full strip-out, plumbing, tiling and finishing</li><li>Wet rooms: fully tanked floors and graded drainage</li><li>Kitchen fitting and renovation</li><li>Tiling, plastering and carpentry</li><li><a href="/book-snagging/">New build snagging inspections</a> by an RPSA-qualified inspector</li></ul>
<h2>Why people use us</h2>
<ul><li>100+ bathrooms installed and handed over on time</li><li>10+ years of trade experience</li><li>Typical full bathroom refit takes 2 to 3 weeks</li><li>Fixed-price quotes with no hidden costs</li></ul>
<p>Call George on <a href="tel:+447734024192">07734 024192</a> or <a href="/quote/">ask for a free quote</a>.</p>`,
  },
  {
    path: '/book-snagging/',
    title: 'New Build Snagging Inspection Towcester, Northampton & Milton Keynes | Ready For Refurb',
    description: 'Book an independent new build snagging inspection in Towcester, Northampton or Milton Keynes. RPSA-qualified inspector, fixed prices from £325, report within 24 hours.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'New Build Snagging Inspection',
      serviceType: 'Snagging inspection',
      url: `${SITE}/book-snagging/`,
      provider: BUSINESS,
      areaServed: AREAS,
      description: 'Independent pre completion and post completion snagging inspections for new build homes by an RPSA-qualified inspector, with a digital report within 24 hours.',
      offers: { '@type': 'AggregateOffer', priceCurrency: 'GBP', lowPrice: '325', highPrice: '750' },
    },
    body: `${nav}
<h1>New build snagging inspection in Towcester, Northampton and Milton Keynes</h1>
<p>Independent new build snagging inspections in Towcester, Northampton, Milton Keynes and the surrounding areas. Fixed prices from £325, with your report within 24 hours.</p>
<ul><li>Independent RPSA-qualified inspector</li><li>Comprehensive digital report</li><li>Fixed pricing</li><li>Easy online booking</li></ul>
<h2>Snagging inspection prices</h2>
<p>Pre completion inspection: 1 to 2 bed apartment £325, 1 to 2 bed house £350, 3 bed house £400, 3 bed detached £425, 4 bed house £450, 5 bed house £500, 5 bed+ house £550.</p>
<p>Pre and post completion: 1 to 2 bed apartment £575, 1 to 2 bed house £625, 3 bed house £650, 3 bed detached £675, 4 bed house £685, 5 bed house £700, 5 bed+ house £750.</p>
<p>Add a drone roof inspection for £75 or a thermal imaging check for £50.</p>
<h2>Areas we cover</h2>
<p>Based in Towcester, we inspect new builds in Northampton, Milton Keynes and across Northamptonshire, Buckinghamshire and Oxfordshire. Call George on <a href="tel:+447734024192">07734 024192</a>.</p>
<h2>Common questions</h2>
<h3>What is the difference between pre completion and post completion?</h3>
<p>A pre completion inspection happens before you legally complete, so the builder can put snags right before you move in. A post completion inspection happens after you have the keys, while the builder is still responsible for fixing defects.</p>
<h3>Who does the inspection?</h3>
<p>An independent RPSA-qualified inspector who works for you, not the builder.</p>
<h3>When do I get my report?</h3>
<p>Your digital report arrives within 24 hours of the inspection, ready to send to your builder.</p>`,
  },
  {
    path: '/quote/',
    title: 'Free Bathroom Quote | Ready For Refurb, Towcester',
    description: 'Ask Ready For Refurb for a free, fixed-price quote for bathroom fitting, wet rooms, kitchens and renovations in Towcester, Northampton and Milton Keynes.',
    body: `${nav}<h1>Get a free, fixed-price quote</h1><p>Tell us about your bathroom, kitchen or renovation in Towcester, Northampton, Milton Keynes or nearby and we will come back with a fixed price.</p>`,
  },
  {
    path: '/blog/',
    title: 'Bathroom Renovation Advice | Ready For Refurb',
    description: 'Straight answers on bathroom costs, wet rooms and choosing a fitter in Towcester and Northamptonshire, from the Ready For Refurb team.',
    body: `${nav}<h1>Renovation advice</h1><ul>${posts.map((p) => `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a>: ${esc(p.excerpt)}</li>`).join('')}</ul>`,
  },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}/`,
    title: p.metaTitle || `${p.title} | Ready For Refurb`,
    description: p.metaDescription || p.excerpt,
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.metaDescription || p.excerpt,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}/`,
      author: BUSINESS,
      publisher: BUSINESS,
    },
    body: `${nav}<article><h1>${esc(p.title)}</h1><p><time datetime="${p.date}">${p.date}</time></p>${markdown(p.content)}</article>`,
  })),
]

for (const page of pages) {
  const url = SITE + page.path
  const title = esc(page.title)
  const desc = esc(page.description)
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`)
    .replace('<div id="root"></div>', `<div id="root">${wrap(page.body)}</div>`)
  if (page.type) html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${page.type}"`)
  if (page.schema) html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n  </head>`)

  const dir = new URL(`.${page.path}`, DIST)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), html)
}

// Sitemap generated from the same list so it always matches the canonicals.
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${p.schema?.datePublished || today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('sitemap.xml', DIST), sitemap)
console.log(`seo-pages: wrote ${pages.length} pages and sitemap.xml`)
