# Official Cars — GitHub-ready starter

A responsive, dynamic front-end for a multi-dealer NYC vehicle discovery and referral business.

## What is included

- Responsive marketplace-style homepage
- Vehicle search and filters
- Make, body style, price and borough filters
- Dealer/location directory
- Vehicle detail modal
- Partner/dealer lead form
- Partner compensation disclosure
- Demo inventory stored in `data.js`
- No framework or build step required
- Ready for GitHub Pages

## Run locally

Open `index.html` in a browser, or use any static server.

## Publish on GitHub Pages

1. Create a GitHub repository, e.g. `official-cars`.
2. Upload `index.html`, `styles.css`, `app.js`, `data.js`.
3. In GitHub: Settings → Pages → Deploy from branch → `main` → `/root`.
4. Open the published Pages URL.

## How the real business should work

The demo uses fake inventory and `example.com`. For launch, do NOT copy/scrape dealer inventory from websites unless the dealer/feed/license terms authorize it.

Recommended production flow:

Dealer → signed partnership agreement → authorized inventory feed/API/CSV → Official Cars database → normalized vehicle listing → tracked referral/lead click → dealer website/CRM → commission/lead reporting.

### Inventory options

1. Dealer portal: dealers log in and add/update vehicles.
2. Authorized CSV feed: dealer sends a scheduled inventory file.
3. Authorized API/feed: dealership/DMS provider gives permission and credentials.
4. Manual admin import: upload CSV from a dealer.

Suggested fields:

`dealer_id, vin, year, make, model, trim, price, mileage, body_style, fuel_type, transmission, photos, stock_number, location, listing_url, updated_at, status`

## Production architecture

For a real business, use:

- Front end: this design, later React/Next.js if desired
- Database: Postgres/Supabase
- Auth: Supabase Auth or equivalent
- Storage: object storage for authorized vehicle images
- Backend: server-side API
- Dealer portal: protected dashboard
- Admin portal: approve/edit/deactivate listings
- Tracking: unique referral IDs and click/lead events
- Payments: contract-specific commission reporting
- Email: transactional email provider
- Analytics: privacy-conscious analytics

## Important legal/product boundary

This site is designed as a referral/advertising marketplace, not as a claim that Official Cars itself is a motor-vehicle dealer.

Before taking commissions for activities that go beyond advertising/referral generation — such as negotiating or brokering vehicle transactions — get New York-specific legal advice and check DMV requirements. New York DMV has a separate Automobile Broker Business Application and dealer/broker requirements.

Also use clear disclosures wherever Official Cars has a financial relationship with a dealer. Do not imply that a paid placement is an independent recommendation.

## Launch checklist

- Form the business entity and obtain tax/business registrations as appropriate.
- Have a NY attorney review the business model and dealer agreements.
- Create dealer agreement + commission schedule.
- Create privacy policy, terms, advertising disclosure and lead-consent language.
- Obtain written permission for dealer logos, photos, descriptions and inventory feeds.
- Build an authenticated dealer portal.
- Add inventory freshness timestamps and remove sold/expired vehicles.
- Track clicks/leads by dealer and campaign.
- Never represent dealer inventory as your own inventory.
- Clearly label sponsored placements.
- Do not promise vehicle availability until confirmed by the dealer.

This starter is intentionally not connected to a live dealer feed or payment processor.
