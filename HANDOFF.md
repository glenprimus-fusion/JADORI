# JADORI — Visual Prototype Developer Handoff

Creative Direction & Visual Design: Tyrell Primus · Client: Kathy Nguyen · Contact: Cedric Masengere

This is a **concept prototype**. All listings, lenders, ratings, prices, retail references and authentication statuses are SAMPLE DATA. Payments, authentication, sign-in, photo upload and email are **simulated / not implemented**.

Live style guide: `/style-guide` (in the running app).

## 1. Design tokens
| Token | Hex | Use |
|---|---|---|
| bg | #F8F7F5 | Main background |
| panel | #FFFFFF | Cards, booking panel, forms |
| photo | #EFEEEC | Product photo background |
| divider | #E2DFDA | Rules, borders, inactive inputs |
| ink | #1B1714 | Primary text and buttons |
| ink-2 | #4A423C | Secondary text |
| muted | #7A716A | Muted text, captions |
| dark | #1F1A17 | Dark sections, footer, notice bar |
| light | #F3F1ED | Text on dark |

No gold or burgundy in UI. Errors use ink + medium weight (no red). Defined as CSS variables in `frontend/src/index.css` (`--jd-*`).

## 2. Typography
- **Prata Regular** — headlines and provisional wordmark (`JADORI`, uppercase, letter-spacing 0.42em). Wordmark is provisional pending approval.
- **Jost 400/500** — body, navigation, forms, buttons.
- Major statements 30–56px · Section headings 28–42px · Product titles 28–40px · Body 16px / 1.6 · Eyebrow 11px Jost Medium, 0.22em, uppercase.

## 3. Components (`frontend/src/components/jadori/`)
- Buttons (`.jd-btn-solid`, `.jd-btn-outline`, `.jd-btn-light`): 52px, square, uppercase Jost Medium 12px, 0.16em tracking.
- Forms (`.jd-input`, `.jd-select`, `.jd-label`): underline only, labels above, thin 1px chevron on selects.
- `Header` (wordmark centred, Lend/Rent/Buy left, Authenticity/Search/Account right; Menu sheet <860px).
- `Footer` (dark; Instagram/TikTok are **placeholders — links pending**).
- `ListingCard` (2:3 image, Sample tag, auth status, brand, name, $/day, crossed retail only when `retail_verified`, optional buy price, lender · rating or "New lender" · city, MA).
- `AuthBadge` / `AuthSeal` / `SampleTag`. Seal is a proposed visual; only shown for `auth_status = verified`.
- `FilterSheet` (right slide-out: Brand, Color, Availability, Authentication status).
- `Gallery` (desktop: vertical condition strip + main image + arrows; mobile: swipe with progress ticks).
- `BookingCard` (date range popover, duration, $/day, itemised fees, refundable deposit, total, Request to Rent; Buy section only if `buy_enabled`).
- `RequestDialog` (rent/buy request form, simulated).
- `Newsletter` (inline validation, success / already-subscribed / error states).

## 4. Navigation map
**Homepage simplified (latest client request):** the client wants a fashion-house style homepage where visitors click through rather than scroll. The order is now Hero → LEND/RENT/BUY doors → 4 new arrivals → THE BRANDS → one-line authenticity band → newsletter → footer. The "Why trust" statements, the 3-step authenticity explainer, sustainability and "How it works" moved into dedicated pages: `/authenticity`, `/how-renting-works`, `/how-lending-works`, `/how-buying-works`, plus the Rent/Buy/Lend worlds. They're reachable from the doors, the menu ("How it works") and the footer.
**Seasonal hero:** `lib/seasons.js` defines Winter (Dec–Feb), Spring (Mar–May), Summer (Jun–Aug) and Autumn (Sep–Nov). Each has its own campaign still, headline and copy, and the right season is picked automatically from the date. The hero also links to the current month's two edits from `lib/edits.js`. Add `?season=winter|spring|summer|autumn` to the URL, or use the small top-right switcher, to preview a season. Autumn has a 5-second slow campaign video at `frontend/public/hero/autumn.mp4`. It was generated with fal.ai Kling 2.1 image-to-video from the autumn still and compressed to about 380 KB. The video plays muted and looped on desktop only (≥860px, no reduced-motion preference); phones and reduced-motion users see the still. All hero media are AI placeholders until original campaign photography and film are available.
**Layout change, documented (latest client request):** the homepage now opens with a full-bleed campaign hero banner (`components/jadori/HeroBanner.jsx`) between the header and the LEND/RENT/BUY doors. The original brief listed the doors as the first element. The hero was added at the client's request for a top-tier fashion-house first impression. Its text is minimal ("Carry the icon.") and a scroll cue points to the doors. Images are AI-generated placeholders: wide for ≥860px, tall for mobile. Replace them with original JADORI campaign photography.
Each of Rent, Buy and Lend now has its own landing page ("world"). They share components in `components/jadori/World.jsx`: WorldHero, SectionHead, Timeline, Pillars, FeaturedRow, WorldFAQ, CTABand.
- `/rent`: occasions (link to `?style=`), monthly edits (`lib/edits.js`: 6 curated sample edits, 2 featured per month, rotating automatically by calendar month; "Shop the edit" opens `/rent/all?edit=<slug>`), 5-step rental timeline, 3-day price example (sample-01), inclusions, available bags, FAQ, CTA. Catalogue is at `/rent/all`.
- `/buy`: dark hero, why buy, purchase-enabled bags, condition grading guide, purchase timeline, "rent before you buy" (proposed), FAQ. Catalogue is at `/buy/all`.
- `/authenticity` (v2 experience, `pages/AuthenticityExperience.jsx` + `components/jadori/auth/*`):
  - dark hero with a large seal over the monogram pattern
  - interactive inspection hotspots (6 points on a sample bag)
  - "Follow a bag's journey": 6 stage tabs showing how the listing badge changes from pending to verified
  - two-status explainer
  - simulated record lookup: `JD-SAMPLE-000N` for verified sample bags, which renders a certificate design
  - commitments, FAQ and CTA

  Verified product pages show their record number.
- `/lend`: lending timeline, earnings illustration (sliders; 20% commission is proposed), what we accept, 8-view photo guide, lender protection, FAQ.
| Route | Page |
|---|---|
| `/` | Home: Header → LEND/RENT/BUY doors → listings → THE BRANDS → Why trust / BUILT ON AUTHENTICITY → How it works → Newsletter → Footer |
| `/lend` | Lend landing |
| `/lend/new` | Listing creation (3 steps: bag, photos, pricing) |
| `/rent`, `/buy` | Catalogue (Rent/Buy switch, `?brand=`, `?q=`) |
| `/bag/:id` | Product page |
| `/authenticity` | Authentication explainer & status definitions |
| `/register` | Account registration (concept, no password) |
| `/account/renter`, `/account/lender` | Dashboards |
| `/support` | FAQ + contact form |
| `/about` `/press` `/faq` `/privacy` `/terms` `/legal` | Placeholder copy |
| `/style-guide` | Live design system |

## 5. Interactions & motion
- Photo loading: `LoadingImg` / `PlaceholderTile` (`components/jadori/LoadingImg.jsx`) show the monogram in muted #7A716A on #EFEEEC. It softly fades between 25% and 70% opacity over 1.8s, and the photo fades in when it has loaded. This is used on cards, Quick View, the product gallery and the loading grids. With reduced motion, the mark stays still.
- RENT door crossfades three images: 1.4s fade, ~5.2s hold (6.6s cycle). Not a carousel.
- Entrance fade 700ms / 8px rise; photo hover zoom 1.03 over 900ms.
- No bounce, spin or parallax. `prefers-reduced-motion` disables animation and stops the crossfade.
- Brand strip: horizontal scroll-snap, 52px square arrow buttons scroll ~80% viewport.

## 6. Responsive
- ≥1100px catalogue 4 columns; 860–1099px 3 columns; <860px 2 columns.
- <860px: Menu button + left sheet; doors become swipeable row (order Lend, Rent, Buy); product gallery becomes swipe; sticky bottom booking bar; filters as full-width sheet.
- Custom Tailwind screens: `nav: 860px`, `wide: 1100px`.

## 7. Authenticity rules
- Recurring notice (top bar): "Every bag is independently authenticated before it reaches you."
- `verified` → "Authenticated" + seal (only bags that previously passed inspection).
- `pending` (all new listings) → "Authenticated before handoff". New lender submissions are always `pending`.

## 8. Photography
- Monogram (provisional): an original interlocked J·D mark (`components/jadori/Monogram.jsx`: `Monogram`, `MarkPaths`, `MonogramPattern`) plus the favicon `public/favicon.svg`. It's used on the footer pattern band, beside the footer wordmark, and at the centre of the authenticity seal. The style guide has a "Monogram" section with the pattern (120px half-drop tile: mark + double lozenge) and concept applications (dust bag, hang tag, seal). Use espresso or light-on-dark only; no gold. It doesn't replace the approved header wordmark.
- v3 additions: Quick View dialog (`QuickView.jsx`, opened from card hover button or mobile eye icon). Saved bags (`lib/wishlist.js`) are stored in localStorage per account email, and guest saves merge into the account on sign-up. They appear on `/account/saved` and in the header heart count; a backend table is needed for real persistence. Style shortcuts (Totes/Shoulder/Crossbody/Mini) use the `?style=` URL param and the listing `style` field; they're also in the Filters & Sort sheet.
- Catalogue (v2, after client reference): each card shows an unbranded AI-generated studio sample shot on #EFEEEC (`backend/seed.py` STUDIO), a second "worn" editorial image appears on desktop hover, there's a wishlist heart, and the authentication status sits top-left. The catalogue header has a row of brand image shortcuts, a sticky Rent/Buy + count + "Filters & Sort" bar, and a 2-column editorial tile inside the grid (hidden when filtering or sorting). The presentation is inspired by luxury-house catalogues without copying any brand identity.
- Editorial images are licensed Unsplash/Pexels stock placeholders (URLs in `frontend/src/lib/content.js`, `backend/seed.py`). Replace with original JADORI photography.
- Product thumbnails sit on #EFEEEC with `mix-blend-mode: multiply`. **Automatic background removal is NOT implemented** — developer to add for the main thumbnail only. Condition photos (front, back, sides, bottom, interior, hardware, wear & damage) must remain unretouched.

## 9. Backend (FastAPI + MongoDB, prototype only)
`GET /api/listings`, `GET /api/listings/{id}`, `POST /api/listings` (lender submission, stored in `lender_submissions`), `GET /api/lender/submissions?email=`, `POST /api/newsletter`, `POST /api/registrations`, `POST /api/rental-requests`, `GET /api/rental-requests?email=`, `POST /api/purchase-requests`, `GET /api/purchase-requests?email=`, `POST /api/contact`, `POST /api/quote`. Sample listings re-seeded on startup.

Illustrative fees: service 10% of rental, $25 authentication & handling, $4/day damage protection, refundable deposit ≈15% of value. **Not final.**

## 10. Unfinished / to be built by the full-stack developer
- Real sign-in (registration currently stores name/email/role only; "session" is localStorage).
- Payments, deposits holds, payouts — none operational.
- Real authentication workflow & partner, inspection scheduling.
- Photo upload/storage and background removal for main thumbnail.
- Availability calendar per bag; lender accept/decline of requests; messaging.
- Final brands (Louis Vuitton & Prada are provisional), social URLs, legal copy, launch service areas in Massachusetts.

## Marketplace additions (Poshmark / Turo inspired)
- **Seasonal hero videos**: `/public/hero/{winter,spring,summer,autumn}.mp4` (5s seamless loops, desktop ≥860px only; still image on mobile). Config in `src/lib/seasons.js`. Generator script: `/app/scripts/gen_season_videos.py`.
- **Edit Spotlight** (`EditSpotlight.jsx`): homepage tile for this month's first edit (`lib/edits.js`), photo + 3 bags.
- **Rent search** (`RentSearch.jsx`): town + dates → `/rent/all?city=&from=&to=`; cards show the rental total for those dates; dates carry into the product booking card.
- **Protection plans & handoff** (`lib/plans.js`, mirrored in `server.py fees_for`): Essential $4/day full deposit, Signature $9/day half deposit, Complete $16/day quarter deposit; Meet the owner (free) or Courier $45. Sample pricing.
- **Make an Offer** (`OfferDialog.jsx`, `POST /api/offers`, `POST /api/offers/{id}/accept-counter`, `GET /api/offers?email=`): owner replies are SIMULATED (≥90% accept, 75–90% counter at midpoint, <75% decline, <60% rejected).
- **Closets** (`/closet/:slug`, `GET /api/lenders/{slug}`): lender profile, stats, bags, Follow (localStorage `jadori_following`). Lenders defined in `backend/seed.py LENDERS`.
- **Top Lender** (`TopLender.jsx`): badge + criteria popover; `lender.top` flag. **Lender protection** explainer on `/lend` (`LendExtras.jsx`).

