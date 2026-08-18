# Rodriguez Enterprises — Website Design & Content Plan

**Prepared for:** Rodriguez Enterprises
**Build:** Static site, HTML / CSS / vanilla JS
**Structure:** Hub page + 4 dedicated service pages

---

## 1. The Core Challenge (and the Solution)

Rodriguez Enterprises isn't one business — it's **four businesses under one name**:

| Service | Audience | Emotional register |
|---|---|---|
| Poured Up Vibez (private bartending) | Party/event hosts, brides, birthday planners | Fun, upscale, celebratory |
| Security (via M.L. Security) | Event hosts, property managers | Safety, professionalism |
| Appliance Repair Tech | Homeowners/renters in a stressful moment | Fast, trustworthy, competent |
| Apartment & Building Maintenance | Landlords, property managers | Reliable, low-drama, responsive |

A single homepage trying to sell "bottle service" and "my fridge is broken" in the same breath will feel confusing and cheapen both. The fix is a **hub-and-spoke model**:

- **The Hub (homepage)** acts like a lobby directory — it introduces Rodriguez Enterprises as a trusted multi-service company and lets the visitor self-select which service they came for.
- **Each service gets its own full page** with its own accent color, tone, imagery, and content — but shares the same header/footer/typography system so it never feels like a different website. Think "one building, four doors."

This is a very common pattern for holding companies / multi-vertical local businesses, so it'll read as intentional rather than disorganized.

---

## 2. Sitemap

```
/                          Hub / Homepage
/poured-up-vibez.html      Private Bartending
/security.html             Event & Property Security
/appliance-repair.html     Appliance Repair Tech
/maintenance.html          Apartment & Building Maintenance
/contact.html              (optional — or per-page contact forms)
```

Shared includes across all pages: header/nav, footer, contact form component, color system (CSS variables), typography.

---

## 3. Brand System

### 3.1 Master brand — Rodriguez Enterprises
- **Palette:** Deep charcoal `#1C1C1E` + warm gold `#C9A24B` + off-white `#F7F5F1`
- **Why gold:** The client's own bartending tiers are literally named Silver/Gold/Platinum/Diamond — gold as the unifying accent quietly echoes that language across the whole brand without forcing it.
- **Typography:**
  - Headings: a confident serif or slab-serif (e.g., "Fraunces" or "Playfair Display") — feels established, not startup-y
  - Body: a clean sans (e.g., "Inter" or "Work Sans") for readability
- **Logo direction:** Wordmark-based — "RODRIGUEZ ENTERPRISES" in the serif, with a small geometric mark (e.g., an interlocking "R" monogram or a simple compass/shield motif suggesting "we handle everything") in gold.

### 3.2 Sub-brand — Poured Up Vibez
This one gets more visual freedom since it already has its own name and tagline ("Pouring up the Vibez, Not just the Drinks").
- **Accent:** Deep plum/wine `#5C2A4D` over the shared charcoal/gold base — reads nightlife/upscale without clashing
- **Feel:** Photography-forward, moody lighting, cocktail glassware, string lights — think boutique event brand, not clip-art bar cart
- **Logo treatment:** Its own script or hand-lettered wordmark for "Poured Up Vibez," presented as "a Rodriguez Enterprises company" in small print — same trick agencies use for sister brands.

### 3.3 Service accent colors (applied as page accents only — base shell stays consistent)
| Service | Accent color | Rationale |
|---|---|---|
| Poured Up Vibez | Plum `#5C2A4D` | Upscale nightlife |
| Security | Steel blue `#2F4A5C` | Calm authority, safety |
| Appliance Repair | Burnt orange `#C1682B` | Energetic, "we fix it fast" |
| Maintenance | Slate green `#3E5C4A` | Dependable, grounded |

Each service page uses charcoal/off-white as the base (for consistency) and its accent color for buttons, icons, and section dividers only. This keeps brand cohesion while giving each page its own identity at a glance.

---

## 4. Page-by-Page Plan

### 4.1 Homepage (Hub)

**Goal:** Establish trust in the parent company fast, then route the visitor to the right service in one click.

Sections top to bottom:
1. **Header** — logo, nav (Home / each service / Contact), phone number visible top-right
2. **Hero** — full-width, short and confident: *"One Company. Every Need Handled."* Subhead naming all 4 services in one line. No single service dominates.
3. **Service Directory (the core of this page)** — 4 large clickable cards/tiles in a grid (2x2 on desktop, stacked on mobile), each with:
   - Icon or photo
   - Service name
   - One-sentence description
   - "Explore [Service] →" button in that service's accent color
   This is the "self-select your door" moment — do this well and the rest of the confusion disappears.
4. **Why Rodriguez Enterprises** — 3 short trust points (e.g., licensed & insured, local & responsive, one call for everything)
5. **Contact / Quote strip** — simple form or phone/email, works for any inquiry type (with a dropdown: "I'm interested in...")
6. **Footer** — logo, nav links, social, licensing info

### 4.2 Poured Up Vibez page

**Goal:** Sell the party experience, then make the pricing tiers easy to compare.

1. **Hero** — moody event photography, tagline front and center: *"Pouring up the Vibez, Not just the Drinks."*
2. **What's Included in Every Package** — Set up & breakdown, straws, napkins, cups, fresh mixers & garnish (pull directly from client notes)
3. **Package Comparison** (this is the trickiest content to design — see 4.2a below)
4. **Add-Ons** — Jello Shots ($150), Alcohol-Infused Gummy Bears ($100), Additional Hour ($150), Ice ($75), Additional Personalized Signature Drink ($150), Personalized Signature Shots ($150)
5. **Fine print** — "Alcohol provided by host" clearly noted (this is a legal/liability detail — should not be buried)
6. **Gallery** — event photos (if client has them) or stock in the interim
7. **Booking/Quote form** — event date, guest count, package interest

**4.2a — Package Comparison Design**
Four tiers is a lot to lay out cleanly. Recommend a **responsive comparison table** (desktop: side-by-side columns; mobile: stacked cards with a sticky tier name/price header) rather than plain bullet lists, so guest count and price are scannable at a glance:

| | Silver $600 | Gold $800 | Platinum $950 | Diamond $1,200 |
|---|---|---|---|---|
| Guests | Up to 60 | 60–75 | 75–100 | 100+ |
| Hours | 4 | 4 | 5 | 5 |
| Bartenders | 1 licensed | 1 licensed | 2 licensed | 2 licensed |
| Signature drinks | 2 | 3 | 4 | 4 |
| Extras | Custom drink menu | Custom drink menu | Premium garnish, custom decor | Add-on of choice, premium garnish, custom decor |

Highlight "Platinum" or "Gold" visually (e.g., a "Most Popular" ribbon) — gives the eye a default choice, which reduces decision fatigue on a 4-option table. Client should confirm which tier they'd want to feature.

### 4.3 Security page

**Goal:** Reassure, establish legitimacy, make it dead simple to request a quote.

1. **Hero** — clean, professional photography (not stock "guy in sunglasses" cliché — think entryway/event staff presence)
2. **What we offer** — Professional, trained security provided in partnership with M.L. Security; coverage for any and all events
3. **Use cases** — bullet or icon row: private events, weddings, corporate functions, property patrol
4. **Trust signals** — licensing, partnership credibility (name M.L. Security as the licensed provider), professionalism
5. **Quote form** — event type, date, guest count, duration

### 4.4 Appliance Repair Tech page

**Goal:** Speak to someone mid-crisis (broken fridge, dead washer) — fast, clear, no friction.

1. **Hero** — direct and practical: *"Appliance Broken? We'll Fix It — Fast."* Phone number prominent (people in this mindset want to call, not read).
2. **Services grid** — Washers & Dryers, Microwaves, Stoves, Refrigerators, Any Household Appliance (icon-based grid, very scannable)
3. **How it works** — 3-step: Call/Request → Diagnose → Fixed (builds confidence fast)
4. **Service area / response time** (client to confirm details)
5. **Request service form** — appliance type, issue description, contact info

### 4.5 Apartment & Building Maintenance page

**Goal:** Speak to landlords/property managers — reliability and ongoing relationship, not one-time crisis.

1. **Hero** — professional, calm tone: *"Reliable Maintenance for Your Property."*
2. **Services** — general apartment & building maintenance (client may want to expand this list — flag for follow-up)
3. **Why property managers choose us** — responsiveness, consistency, single point of contact
4. **Recurring service angle** — consider messaging around ongoing/contract maintenance vs one-off jobs (worth asking the client)
5. **Contact form** — property type, unit count, service needed

---

## 5. Navigation & UX Strategy

- **Persistent header** across all 5 pages so the visitor never feels lost or like they've left "Rodriguez Enterprises" — logo always links back to the hub.
- **Service switcher in the footer** ("Looking for something else? [4 service links]") so a visitor who lands directly on a service page via Google can still discover the others.
- **Consistent CTA pattern**: every service page ends in a form tailored to that service (different fields), but visually matching the same component style.
- **Mobile-first**: given 3 of the 4 services (repair, security, maintenance) are likely searched from a phone in an urgent moment, tap-to-call buttons should be sticky/visible, especially on the Appliance Repair page.

---

## 6. Technical Plan (HTML/CSS/JS)

Recommended file structure for a simple static build:

```
/index.html
/pouredupvibez.html
/security.html
/appliancerepair.html
/maintenance.html
/css/
  variables.css      (shared color/type tokens + per-page accent overrides)
  base.css           (typography, resets, layout grid)
  components.css     (cards, buttons, nav, forms, comparison table)
/js/
  nav.js             (mobile menu toggle)
  forms.js           (basic validation, form handling)
/images/
  [organized by service subfolder]
```

- Use **CSS custom properties** for the accent color per page (e.g., `--accent: #5C2A4D;` set once in a `<body>` class like `body.vibez`), so components.css can stay shared and DRY instead of duplicating styles per service.
- Comparison table and service cards can be built with plain CSS Grid/Flexbox — no framework needed given the "simple HTML/CSS/JS" requirement.
- Forms: without a backend, plan to wire these to a service like Formspree or a mailto fallback — flag this as a decision point for later.

---

## 7. Content Still Needed From Client

To finish this properly, worth confirming with the client:
1. Real photography for Poured Up Vibez (events, drinks) — stock will look generic for a brand this specific. 
2. Service area / response time claims for Repair & Maintenance (i will provide the areas)
3. Licensing/insurance details to display as trust badges 
4. Whether Maintenance is one-off jobs, contracts, or both 
5. Which bartending tier (if any) should be visually "featured" (gold)
6. Preferred contact method for lead capture (phone-first vs form-first)
