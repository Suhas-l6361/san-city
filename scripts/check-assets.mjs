#!/usr/bin/env node
/**
 * Run before Vercel deploy: node scripts/check-assets.mjs
 * Exits 1 if any referenced image/icon is missing (prevents broken site on Vercel).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_EXT = new Set(['.html', '.css', '.js']);
const ASSET_EXT = /\.(png|jpe?g|webp|gif|svg|ico|mp4|pdf)(\?|#|$)/i;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.name === 'node_modules' || name.name === '.git') continue;
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function norm(p) {
  return p.replace(/\\/g, '/');
}

function decodeRef(ref) {
  try {
    return decodeURIComponent(ref.split(/[?#]/)[0]);
  } catch {
    return ref.split(/[?#]/)[0];
  }
}

function resolveRef(fromFile, ref) {
  const clean = decodeRef(ref);
  if (/^https?:\/\//i.test(clean) || clean.startsWith('data:')) return null;
  if (clean.startsWith('/')) return path.join(ROOT, clean.replace(/^\//, ''));
  const base = path.dirname(fromFile);
  return path.normalize(path.join(base, clean));
}

const diskFiles = walk(ROOT);
const diskLower = new Map();
for (const f of diskFiles) {
  diskLower.set(norm(f).toLowerCase(), norm(f));
}

function existsOnDisk(absPath) {
  if (!absPath) return true;
  const n = norm(absPath);
  if (fs.existsSync(n)) return true;
  return diskLower.has(n.toLowerCase());
}

const refs = new Map();
const refRe =
  /(?:\.\.\/|\.\/|\/)(?:images|icons|videos)\/[^\s"'`)<>]+|(?:^|["'`])(?:images|icons|videos)\/[^\s"'`)<>]+/gi;

for (const file of diskFiles.filter((f) => SCAN_EXT.has(path.extname(f).toLowerCase()))) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = refRe.exec(text))) {
    let r = m[0].replace(/^["'`]/, '').trim();
    if (!ASSET_EXT.test(r)) continue;
    const abs = resolveRef(file, r);
    if (!abs) continue;
    const key = norm(abs);
    if (!refs.has(key)) refs.set(key, { ref: r, from: norm(path.relative(ROOT, file)) });
  }
}

// Project card slots & popup brochures (from projects.js logic)
for (let i = 1; i <= 12; i += 1) {
  refs.set(norm(path.join(ROOT, 'images', `p${i}.jpg`)), { ref: `images/p${i}.jpg`, from: 'projects.js slots' });
}

const popupStems = [
  'san sity popup', 'new town popup', 'kaveri popup', 'rachana popup', 'wonder wood popup', 'kalapataru popup',
  'kamal enclave popup', 'orchid popup', 'prakruthi popup', 'gardenia popup', 'grand popup',
  'gold popup', 'vc galaxy popup', 'bhoomi popup', 'blue bell popup', 'comfort popup',
  'diamond popup', 'disha popup', 'lave view popup', 'lake view popup', 'prerana popup', 'sky city popup',
  'sun flower popup', 'nature popup', 'sun shine popup', 'mcc popup',
];
for (const stem of popupStems) {
  const candidates = ['.png', '.jpg', '.jpeg'].map((ext) => path.join(ROOT, 'images', `${stem}${ext}`));
  const found = candidates.find((p) => existsOnDisk(p));
  if (!found) {
    refs.set(norm(candidates[0]), {
      ref: `images/${stem}.png (or .jpg)`,
      from: 'projects.js popups',
    });
  }
}

const mapPrefixes = [
  'New Town', 'Kaveri', 'Rachana', 'Wonder Wood', 'Kalapataru', 'Kamal Enclave', 'Orchid',
  'Prakruthi', 'Gardenia', 'Grand', 'Gold', 'vc galaxy', 'Bhoomi', 'Blue Bell', 'comfort',
  'sancity diamond', 'Disha', 'lake view', 'prerana', 'sky city', 'sun flower', 'Sun Shine',
  'Vapour', 'Voilet', 'Elegance', 'Fortune', 'Green', 'Nature', 'Pride', 'Silver',
  'MCC', 'White Lotus',
];
const map1Ext = ['.png', '.jpg', '.jpeg'];
for (const prefix of mapPrefixes) {
  const candidates = map1Ext.map((ext) => path.join(ROOT, 'images', `${prefix} map${ext}`));
  const found = candidates.find((p) => existsOnDisk(p));
  if (!found) {
    refs.set(norm(candidates[0]), {
      ref: `images/${prefix} map.png (or .jpg)`,
      from: 'projects.js maps',
    });
  }
}

const cardImages = [
  'VC Gallexy Logo.png', 'bluebell.png', 'comfort.png', 'sancity diamond.png',
  'disha.png', 'lake view.png', 'prerana.png', 'skycity.png', 'sunflower.png',
];
for (const name of cardImages) {
  refs.set(norm(path.join(ROOT, 'images', name)), { ref: `images/${name}`, from: 'projects.js cards' });
}

for (let i = 1; i <= 12; i += 1) {
  refs.set(norm(path.join(ROOT, 'images', `award${i}.jpg`)), { ref: `images/award${i}.jpg`, from: 'awards.js' });
}

const mustExist = [
  'index.html',
  'images/Sancity logo.jpg',
  'brochure.pdf',
];
for (const rel of mustExist) {
  refs.set(norm(path.join(ROOT, rel)), { ref: rel, from: 'deploy root' });
}

const missing = [];
const caseMismatch = [];

for (const [abs, meta] of refs) {
  if (fs.existsSync(abs)) {
    const actual = diskLower.get(abs.toLowerCase());
    if (actual && actual !== abs) caseMismatch.push({ ...meta, expected: abs, actual });
    continue;
  }
  if (diskLower.has(abs.toLowerCase())) {
    caseMismatch.push({ ...meta, expected: abs, actual: diskLower.get(abs.toLowerCase()) });
    continue;
  }
  missing.push(meta);
}

console.log(`\nSan City asset check — ${refs.size} references scanned\n`);

if (missing.length) {
  console.error(`MISSING FILES (${missing.length}) — Vercel will show broken images:\n`);
  for (const m of missing) console.error(`  ✗ ${m.ref}  (used in ${m.from})`);
  console.error('\nCopy missing files into Frontend/images/ or Frontend/icons/, then redeploy.\n');
}

if (caseMismatch.length) {
  console.warn(`CASE MISMATCH (${caseMismatch.length}) — works on Windows, breaks on Vercel/Linux:\n`);
  for (const m of caseMismatch) console.warn(`  ! code expects: ${m.expected}\n    disk has:     ${m.actual}`);
  console.warn('');
}

if (!missing.length && !caseMismatch.length) {
  console.log('OK — all referenced assets found.\n');
  console.log('Vercel Drop: upload the Frontend folder (index.html at top level), NOT the parent SanCity Project folder.\n');
  process.exit(0);
}

if (missing.length) process.exit(1);
process.exit(caseMismatch.length ? 1 : 0);
