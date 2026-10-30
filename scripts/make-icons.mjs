// Generates favicon, Apple touch icon and the Open Graph share image into /public.
// Run once (or after changing branding): node scripts/make-icons.mjs
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { heroSvg } from '../src/lib/art.js';

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="13" fill="#0755E8"/>
  <path d="M48 30v5a13 13 0 0 1-13 13h-9c8-2 17-8 22-18Z" fill="#10244D" opacity=".55"/>
  <text x="23" y="32" text-anchor="middle" font-family="Poppins, Arial Black, Arial, sans-serif" font-weight="800" font-size="21" fill="#fff" letter-spacing="-1">SS</text>
  <path d="M38.5 6.5 34 15h4l-2.5 7.5L42 12.5h-4.2l2.2-6Z" fill="#FFD600"/>
</svg>`;

const hero = heroSvg().replace('<svg ', '<svg x="640" y="40" width="560" height="480" ');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F4F7FC"/>
  <rect y="560" width="1200" height="70" fill="#FFD600"/>
  ${hero}
  <g transform="translate(70 80) scale(2)">${mark.replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="190" y="128" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44" fill="#10244D">SS <tspan fill="#0755E8">ENTERPRISES</tspan></text>
  <text x="70" y="270" font-family="Arial, sans-serif" font-weight="700" font-size="48" fill="#10244D">Home Appliance Repair</text>
  <text x="70" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="48" fill="#10244D">&amp; RO Service in Ballia</text>
  <text x="70" y="395" font-family="Arial, sans-serif" font-size="27" fill="#4B5B7C">RO • AC • Cooler • Washing Machine • Fridge • Geyser</text>
  <rect x="70" y="440" width="330" height="70" rx="16" fill="#0755E8"/>
  <text x="235" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="30" fill="#fff">81828 18841</text>
  <text x="70" y="605" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#10244D">Flat 30% OFF on spare parts • Home service in Ballia</text>
</svg>`;

await fs.mkdir('public', { recursive: true });
await fs.writeFile('public/icon.svg', mark);
await sharp(Buffer.from(mark)).resize(180, 180).png().toFile('public/apple-icon.png');
await sharp(Buffer.from(mark)).resize(512, 512).png().toFile('public/icon-512.png');
await sharp(Buffer.from(mark)).resize(48, 48).toFormat('png').toFile('public/favicon-48.png');
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png');
console.log('Icons written to /public');
