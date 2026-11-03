# JADORI — PRD (Visual Prototype)
## Original problem
Client-approved visual revision of JADORI, a P2P luxury handbag Rent/Lend/Buy marketplace (Massachusetts). Exact tokens (#F8F7F5 etc.), Prata + Jost, square 52px buttons, homepage order: header → LEND/RENT/BUY doors (Rent crossfade) → listings → THE BRANDS (7) → BUILT ON AUTHENTICITY → How it works → newsletter → footer. Catalogue w/ filter slide-out, product page w/ booking, registration, renter/lender dashboards, listing creation, support, handoff docs. All data sample; no real payments/authentication.
## User choices
Forms save to DB · LV & Prada provisional brands · Style-guide page + HANDOFF.md · Stock editorial photos.
## Architecture
React (CRA+Tailwind, custom screens nav 860/wide 1100) + FastAPI + MongoDB. Sample listings seeded from backend/seed.py on startup.
## Implemented (Nov 2026)
- All pages/routes listed in /app/HANDOFF.md; newsletter, registration (concept, no password), rental/purchase requests, listing submissions, contact stored in Mongo.
- Auth status rules: verified → seal; pending → "Authenticated before handoff".
- Responsive desktop/mobile; reduced-motion support. Tested (iteration_1) and fixes applied.
- Later sessions: Rent/Buy/Lend worlds, edits, authenticity experience, how-it-works guides, minimal homepage.
- Nov 2026 (iteration_4, all pass): seasonal hero videos for all 4 seasons (desktop only), homepage Edit Spotlight, Rent where+dates search with per-date totals, protection plans + pickup/courier at booking, Make an Offer (simulated owner replies), lender closet pages with Follow, Top Lender badge, lender protection explainer. See HANDOFF.md "Marketplace additions".

## Backlog
P0: real sign-in, payments, authentication workflow (developer). P1: photo upload + thumbnail background removal, availability calendar, lender accept/decline. P2: messaging, reviews, final brand/social/legal content.
- Nov 2026: bag availability calendar (booked + inspection-buffer days, next-available on cards, overlap validation).
- Nov 2026: catalogue date search hides bags booked for those dates, with a hidden-count note.
- Nov 2026: JADORI Creators page (/creators) with AI editorial images, phone mock-ups, application form (saved; team email MOCKED), menu + footer links.
- Nov 2026: pill-shaped buttons & chips site-wide with lift, fill sweep (outline) and shimmer (solid/light) animations (iteration_5 pass).
