// Runs after `npm run deploy`. Tells Bing (and other IndexNow engines) that every URL in the
// sitemap may have changed, so they recrawl sooner. Google does not use IndexNow.
// The key file public/db347eeef9ed33d49a20389700be343e.txt must stay at the site root.
import { readFileSync } from 'node:fs'

const KEY = 'db347eeef9ed33d49a20389700be343e'
const HOST = 'ready4refurb.com'
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`indexnow: ${res.status} for ${urlList.length} URLs`)
