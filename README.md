# SS Enterprises – Website & Admin Panel

Mobile-first website for **SS Enterprises, Ballia** (home appliance repair, RO sales, spare parts), with English/Hinglish, service booking, a WhatsApp-ordering shop, and an admin dashboard.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS · Lucide icons · MongoDB + Mongoose · JWT (jose, httpOnly cookie) · sharp (image compression). One project, deploys to Vercel as-is.

## Run locally

Requires Node.js 20+ (22 recommended) and MongoDB (local or Atlas).

```bash
npm install
cp .env.example .env.local      # then edit values (JWT_SECRET, ADMIN_PASSWORD, MONGODB_URI)
npm run seed                    # admin user, categories, services, sample products, settings
npm run photos                  # optional: real stock photos for services & products
npm run dev                     # http://localhost:3000
```

Admin panel: **http://localhost:3000/admin** – log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env.local` (default `admin` / `ChangeMe@123`). Change the password under **My Account** after first login.

| Script | What it does |
| --- | --- |
| `npm run seed` | Adds missing starter data (safe to run again) |
| `npm run seed:fresh` | Resets catalogue/content to the starter data (keeps bookings & enquiries) |
| `npm run photos` | Downloads free Pexels photos, compresses and stores them in MongoDB |
| `npm run icons` | Regenerates favicon / share image in `public/` |

## Deploy on Vercel

1. Create a free **MongoDB Atlas** cluster → *Database Access*: add a user → *Network Access*: allow `0.0.0.0/0` → copy the connection string.
2. Push this folder to GitHub and import it in Vercel (framework: Next.js, no extra settings).
3. In Vercel → *Settings → Environment Variables* add:
   - `MONGODB_URI` – Atlas connection string (with a database name, e.g. `/ss_enterprises`)
   - `JWT_SECRET` – long random string
   - `NEXT_PUBLIC_SITE_URL` – your live URL, e.g. `https://ssenterprisesballia.in`
4. Seed the Atlas database once from your computer: put the Atlas URI in `.env.local`, then `npm run seed && npm run photos`.
5. Deploy. Submit `https://your-domain/sitemap.xml` in Google Search Console and create a Google Business Profile for local search.

## Features

- **English / Hinglish** switcher (saved in a cookie, so pages render in the chosen language on the server – fast and SEO-friendly). UI text lives in `src/lib/i18n.js`; services, products, categories and reviews store `{ en, hi }` in the database.
- **Service booking** (`/book-service`): appliance → service type, validation, saved to MongoDB, then a pre-filled WhatsApp message to **+91 81828 18841** plus a call button.
- **Shop** (`/shop`): categories, search, sort, product pages with specs, related products; **30% offer** shown as MRP ~~struck~~ → offer price. Default discount is set in *Admin → Website Content* (with an option to apply it to all products).
- **Cart → WhatsApp order**: no payment gateway; order is saved (prices re-checked on the server) and sent on WhatsApp for the shop to confirm.
- **WhatsApp everywhere**: floating button, mobile bottom bar, and pre-filled messages for general, service, product, spare-part and order enquiries.
- **Images in MongoDB, compressed**: uploads are shrunk in the browser, then converted by sharp to WebP (max 1200px + 480px thumbnail) and cached for a year.
- **Admin**: dashboard stats; bookings (filters by status/appliance/date, status updates, internal notes, call/WhatsApp customer, delete); enquiries & cart orders; products (add/edit, photos, price, offer %, stock, availability, featured); categories; services; testimonials; contact details, address, map, about text, homepage banner; change password.
- **SEO**: page titles/descriptions with Ballia keywords, LocalBusiness / Service / Product structured data, Open Graph image, `sitemap.xml`, `robots.txt`.

## Project layout

```
src/
  app/(site)/        public pages (home, services, shop, cart, book-service, about, contact)
  app/admin/         login + admin panel
  app/api/           REST API (route handlers)
  components/        site, admin, layout, ui components
  lib/               db, auth, i18n, WhatsApp messages, queries, image compression, illustrations
  models/            Mongoose models
  data/seed.js       starter content (edit freely)
scripts/             seed, photo import, icon generator
```

## Before going live – please check

- **Sample data:** product MRPs/stock, and the 4 customer reviews are placeholders. Replace them in the admin panel.
- **Photos:** stock photos are representative. Upload real photos of your shop and products (Admin → Products / Services / Website Content → banner).
- **Map:** in Admin → Website Content, paste the Google Maps *Embed* code and *Share* link for the exact shop pin.
- Brand names are only used to describe compatibility; the site does not claim to be an authorised service centre.
