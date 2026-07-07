# Head Star Global Pvt Ltd — Corporate Website

A modern, mobile-first, fully responsive corporate website built for **Head Star Global Pvt Ltd**, an agricultural commodity trading company operating across Dubai, Bahrain and Congo.

Reference site: https://headstargroups.com/

---

## 🧱 Tech Stack

| Layer          | Technology                                  |
|----------------|----------------------------------------------|
| Markup         | Semantic HTML5                                |
| Styling        | Standard CSS3 (custom, no framework)          |
| Interactivity  | Vanilla JS + jQuery 3.7                       |
| Scroll Animation | AOS (Animate On Scroll) library             |
| Form Handling  | jQuery validation + Web3Forms API             |
| Icons          | Google Material Icons + Font Awesome 6 (brand icons), free, CDN |
| Fonts          | Google Fonts — Fraunces (display serif) & Inter (body) |
| Images         | Unsplash / Pexels (free stock, hotlinked)     |

No build tools, no bundlers, no frameworks (React/Vue/Bootstrap) — pure hand-written front-end code, exactly as requested.

---

## 📁 Folder Structure

```
headstar/
├── index.html                 → Home / landing page (hero video, services, stats, FAQ)
├── about.html                 → About Us
├── agro-products.html         → Agro Products (8 real product categories)
├── domestic-trading.html      → Domestic Trading
├── merchant-trading.html      → Merchant Trading
├── retail.html                → Retail
├── contact.html                → Contact Us (enquiry form)
├── 404.html                    → Custom "page not found"
├── css/
│   └── style.css               → All site styles (single, well-organised file)
├── js/
│   ├── main.js                 → Preloader, mobile menu, sticky header, active-nav,
│   │                              back-to-top, AOS init, lazy-load fade, scroll-spy,
│   │                              counters, FAQ accordion
│   └── validate.js             → jQuery form validation + Web3Forms submission + toast
└── images/
    ├── logo.png                → Head Star Global logo
    └── favicon*.png/.ico       → Generated favicons
```

Header and footer markup is **written directly into every HTML file** (no fetch/include mechanism), so the site can be opened straight from the file system or hosted anywhere with zero server requirements. Any static host (Netlify, Vercel, GitHub Pages, cPanel, Nginx, Apache) — or just double-clicking `index.html` — works out of the box.

To preview locally with a server (optional, but recommended for AOS/CDN caching behaviour):

```bash
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

---

## ✅ Feature Checklist

- [x] Mobile-first responsive design (320–480 / 481–768 / 769–1024 / 1025px+)
- [x] Video-background hero section (with poster fallback image)
- [x] Sticky header with scroll shadow
- [x] Mobile hamburger menu with slide-in animation + **backdrop blur**
- [x] Active nav-link highlighting (current page + scroll-spy on home sections)
- [x] Back-to-top button with smooth animation
- [x] Floating chat (WhatsApp) icon with tooltip, always above back-to-top
- [x] AOS scroll animations throughout
- [x] Enquiry form with jQuery validation (name, email, phone, message rules)
- [x] Web3Forms API submission (`access_key` pre-configured)
- [x] Success/error toast notification — **auto-dismisses after 5 seconds**
- [x] Custom 404 page
- [x] Lazy-loaded images (`loading="lazy"`) with fade-in on load
- [x] `prefers-reduced-motion` respected (AOS + smooth-scroll + counters disable automatically)
- [x] Touch-optimised tap targets (44px+ buttons, no hover-only interactions)
- [x] SEO: unique title/description/keywords per page, canonical tags, Open Graph tags, JSON-LD Organization schema, semantic heading structure
- [x] Favicons generated from the brand logo (16/32/48/180px + .ico)
- [x] Separate CSS / JS / images files (no inline spaghetti); header/footer inlined per page
- [x] FAQ accordion section (Home page) — click-to-expand, only one open at a time
- [x] Unified 4-column responsive footer grid (Brand+Social | Quick Links | Our Trading | Registered Office), centered and stacked cleanly on mobile
- [x] Real Facebook / LinkedIn / Instagram / WhatsApp brand icons (Font Awesome) in header bar and footer — no more generic Material Icon stand-ins
- [x] Footer logo uses a transparent-background version of your logo at full original brightness/colour (no invert filter)
- [x] Full visual redesign: editorial serif/sans type pairing (Fraunces + Inter), warm cream/ink colour system, dramatic bottom-aligned hero, refined pill buttons, top-accent hover cards, italic emphasis headings
- [x] "Trust & Compliance" section rebuilt as a two-row, opposite-direction infinite auto-scroll marquee of certification badges (pauses on hover, fades at edges) instead of a static logo grid
- [x] Content cross-checked against the live site again — added the missing "Expert Shipping Team" home section and corrected the Retail page title to "Retail Distribution & Franchising" to match real site naming

---

## 🔑 Web3Forms Integration

The enquiry form on `contact.html` submits to Web3Forms using:

```
Access Key: cbc7d883-ef24-431a-849d-cf9cbbf31915
Endpoint:   https://api.web3forms.com/submit
```

Validation rules (in `js/validate.js`) run **before** submission:
- Name → required, letters only, 2–60 chars
- Email → required, valid email format
- Phone → required, valid phone pattern
- Message → required, minimum 10 characters

On success, a green toast appears bottom-right and **disappears automatically after 5 seconds** (or immediately if the user clicks the close icon).

---

## ✅ Verified Real Business Details Used

Content, contact details and certifications were cross-checked against the live headstargroups.com site and applied throughout:

- **Registered Office:** Head Star Global Pvt Ltd, No.509, Rupa Solitaire, Millennium Business Park, Thane Belapur Highway, Mahape, Navi Mumbai – 400 710, Maharashtra, India *(branch offices in Kerala, Karnataka, Bahrain, Dubai & Congo were intentionally omitted per your instructions — only the registered address is shown)*
- **Phone:** +91-22-46019037 | +91 89284 92450
- **Email:** info@headstargroups.com
- **WhatsApp:** wa.me/+918928492450 with a pre-filled "I'm interested in your business model" message
- **Social:** real Facebook, LinkedIn and Instagram profile links
- **Certifications:** ISO 9001:2015, ISO 22000:2018, FSSAI, APEDA, UKAS, DGFT, Halal Committee, Star Export House, Saudi FDA, MSME, Spices Board, Make in India
- **Products:** Food Grains, Pulses & Lentils, Edible Oils, Spices, Oil Seeds, Oil Meal Extractions, Fruits & Vegetables, Other Agro-Products
- Per your instructions, the management-team section is intentionally omitted from About Us.

**Still worth double-checking:** the Google Map pin on the Contact page uses a general area search for "Millennium Business Park, Mahape" — swap in your exact Google Maps place link/embed code for pinpoint accuracy. Product photography is free stock (Unsplash) representing each category, not your actual product photos — replace with real photos if available.

---

## 🖼️ Image Credits

All photography is free stock sourced from **Unsplash** and the hero background video from **Pexels**, both hotlinked directly (no local storage needed, always up to date, zero licensing cost). If you prefer permanently hosted assets, download these and place them in `/images/` and update the `src` paths.

---

## 🚀 Performance Notes

- Images use `loading="lazy"` + explicit `width`/`height` to prevent layout shift
- Fonts/icons are preconnected for faster loading
- CSS and JS are external and cacheable (no inline blocking scripts except JSON-LD)
- `background-attachment: fixed` on CTA sections is disabled on mobile (≤768px) for performance and iOS compatibility

---

Built with care for **Head Star Global Pvt Ltd**.
