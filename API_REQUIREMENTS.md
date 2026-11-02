# Realto — Backend API Requirements

Frontend: Next.js 16 + axios. Base URL = `NEXT_PUBLIC_API_URL`. Auth = `Authorization: Bearer <token>` (token in localStorage `token`), cookies enabled (`withCredentials`).

**Conventions the frontend already assumes**
- Response envelope: `{ "success": boolean, "message"?: string, "data"?: T }`
- Errors: non-2xx with `{ success:false, message }`. `401` → frontend clears token and redirects to `/login`.
- Lists: `{ data: [...], total, current_page, last_page, per_page }` (page-based, `?page=&per_page=`).
- Roles: `user`, `agent`, `admin`.

**Status legend**
- ✅ Already called by the frontend (`lib/api/Endpoints.ts`) — please confirm/implement exactly as listed.
- 🆕 Frontend currently uses mock/static data — new endpoint needed.
- ⚠️ Path was guessed — please confirm.

---

## 1. Authentication

| Status | Method | Path | Body / Notes |
|---|---|---|---|
| ✅ | POST | `/api/agents/signup` | `name, email, phone, country_code, password, company_name?, license_no?, role:"agent"` → sends OTP |
| ✅ | POST | `/api/users/signup` | `name, email, phone, country_code, password, role:"user"` → sends OTP |
| ✅ | POST | `/api/agents/login` | `email, password` → `{ token, agent }` |
| ✅ | POST | `/api/users/login` | `email, password` → `{ token, user }` |
| ⚠️ | POST | `/api/agents/verify-otp` | `email, otp` |
| ✅ | POST | `/api/users/verify-code` | `email, code` |
| ⚠️ | POST | `/api/agents/resend-otp` | `email` |
| 🆕 | POST | `/api/users/resend-otp` | `email` (user flow uses the same OTP screen) |
| 🆕 | POST | `/api/auth/forgot-password` | `email` → sends reset link/OTP (login page needs it) |
| 🆕 | POST | `/api/auth/reset-password` | `token, password` |
| 🆕 | POST | `/api/auth/logout` | invalidate token |
| 🆕 | POST | `/api/admin/login` | `email, password` (admin panel) |

## 2. Profile & Settings (Agent + User panels)

| Status | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/api/agents/profile` | agent profile (name, title, bio, languages, license_no, company_name/address, social_links, total_experience, website, image, member_since…) |
| ✅ | PUT | `/api/agents/profile` | update the above |
| ✅ | GET | `/api/profile/` | user profile |
| ✅ | PUT | `/api/users/profile` | `name, phone, address, bio…` |
| 🆕 | POST | `/api/profile/avatar` | multipart `image` (agent + user) |
| ✅ | POST | `/api/agents/change-password` | `current_password, new_password` |
| ✅ | POST | `/api/users/change-password` | same |
| ✅ | POST | `/api/agents/notification-settings` | `email_notifications, sms_notifications` (0/1) |
| ✅ | POST | `/api/users/notification-settings` | same |

## 3. Properties (Buy / Rent / Land) — agent CRUD + public browsing

| Status | Method | Path | Notes |
|---|---|---|---|
| ✅ | POST | `/api/properties` | multipart. `purpose(buy/rent/land), type, category, title, bedrooms, bathrooms, car_spaces, location, area_sqft, inspection_date, inspection_time, price_range, description, is_auction, amenities[], photos[]` |
| ✅ | PUT | `/api/properties/:id` | multipart, same fields |
| ✅ | DELETE | `/api/properties/:id` | |
| ✅ | GET | `/api/properties` | agent's own listings + filters (`purpose, type, location, min_price, max_price, bedrooms, search, sort, page, per_page`). **Needs a public variant** for site browsing → see below |
| ✅ | GET | `/api/properties/statistics` | `total_properties, for_sale, for_rent, for_investment` |
| 🆕 | GET | `/api/public/properties` | public search for Buy/Rent/Land pages. Params: `listing_variant(buy/rent/land), search, sort(relevant/newest/price_asc/price_desc), page, page_size, bedrooms, bathrooms, price range, property type`. Returns property + embedded agent (name, phone, email, company, image) |
| 🆕 | GET | `/api/public/properties/:id` | property detail page |
| 🆕 | GET | `/api/public/properties/map` | markers (id, lat, lng, price) for map view — include `latitude/longitude` on property |
| 🆕 | GET | `/api/public/properties/featured?type=luxury\|new\|buy\|rent\|land&limit=` | home page sliders |
| 🆕 | GET | `/api/public/properties/popular-cities?city=` | "popular city properties" tabs on home |
| 🆕 | GET | `/api/public/locations/suggest?q=` | search-bar autocomplete |
| ✅ | GET | `/api/properties/saved` | user's saved properties |
| ✅ | GET | `/api/properties/:id/is-saved` | `{ is_saved }` |
| 🆕 | POST | `/api/saved-properties` | `{ property_id }` (heart icon — save) |
| ✅ | DELETE | `/api/saved-properties/:property_id` | unsave |

## 4. Agent Directory (public)

| Status | Method | Path | Notes |
|---|---|---|---|
| 🆕 | GET | `/api/public/agents` | `search, specialization, min_rating, location, sort(Highest Rated/Most Experience/Most Properties Sold), page, page_size` → `{items,totalItems,totalPages,currentPage,pageSize}` |
| 🆕 | GET | `/api/public/agents/recommended?limit=` | |
| 🆕 | GET | `/api/public/agents/:idOrSlug` | profile: bio, agency, service areas, languages, performance (avg sale price, days on market, response time), socials, certifications, career highlights |
| 🆕 | GET | `/api/public/agents/:idOrSlug/listings?status=current\|sold` | |
| 🆕 | GET | `/api/public/agents/:idOrSlug/reviews` | client reviews & ratings |
| 🆕 | POST | `/api/public/agents/:id/reviews` | `rating, comment` (auth user) |
| 🆕 | POST | `/api/public/agents/match` | "Get matched with agents" form: `name, phone, company, job_title, country…` |
| 🆕 | GET | `/api/public/agencies/top` | "Top real estate agencies" section |

## 5. Enquiries / Leads (Agent panel)

| Status | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/api/inquiries` | agent's leads. Params: search, status, page |
| ✅ | POST | `/api/inquiries` | `name, email, phone, status, message, property_id, agent_id` |
| ✅ | PUT | `/api/inquiries/:id` | same body |
| ✅ | DELETE | `/api/inquiries/:id` | |
| ✅ | DELETE | `/api/inquiries/bulk` | body `{ ids: [] }` |
| ✅ | GET | `/api/dashboard/stats` | `total_leads, active_listings, closed_deals, types_count{}, recent_leads[], breakdown{total_leads, open_leads, closed_leads}` |
| 🆕 | POST | `/api/public/inquiries` | public "Contact agent / Get matched now" form on property & agent pages (name, email, phone, message, property_id, agent_id) |
| 🆕 | POST | `/api/public/contact` | Home "Contact us" form (name, email, phone, message) |

## 6. Documents (Agent panel) ✅ already integrated

| Method | Path | Notes |
|---|---|---|
| GET | `/api/documents/stats` | `total_documents, folders, uploaded_this_month, total_downloads` |
| GET / POST | `/api/folders` | list / create `{name}` |
| PUT / DELETE | `/api/folders/:id` | delete supports `?delete_files=true\|false` |
| GET | `/api/documents` | `folder_id, search, page` |
| POST | `/api/documents/upload` | multipart `file, folder_id?` |
| GET | `/api/documents/:id/view` | file blob |
| GET | `/api/documents/:id/download` | file blob (increments downloads) |
| PUT / DELETE | `/api/documents/:id` | rename/move / delete |

**User-panel Documents (new page)** 🆕 — rental application + user documents:
- Same document/folder endpoints scoped to the user, plus verification state: `status = Verified | Pending | Rejected` (tabs on UI).
- `GET /api/users/rental-application` / `PUT /api/users/rental-application` — leaseholder, occupants, pets (type→count), emergency contact, current/previous address, lease term, rent period, employment details.
- `POST /api/users/rental-application/submit`

## 7. Agent Panel — Analytics 🆕

| Method | Path | Notes |
|---|---|---|
| GET | `/api/agents/analytics?from=&to=` | listing series by month, lead sources, top listings (views, leads, conversion), leads vs views, recent activity feed, KPI tiles |
| GET | `/api/agents/analytics/export` | CSV/PDF download |

## 8. Hotels

| Status | Method | Path | Notes |
|---|---|---|---|
| 🆕 | GET | `/api/hotels` | search/browse: `destination, check_in, check_out, guests, rooms, property_type, min_price, max_price, rating, amenities, sort, page` |
| 🆕 | GET | `/api/hotels/:idOrSlug` | title, subtitle, location, rating, badge, gallery, amenities, host (name, company, avatar, socials), summary, phone, email, lat/lng, price/old price |
| 🆕 | GET | `/api/hotels/:id/rooms` | rooms: name, size, bed, bathrooms, amenities, price, taxes, member price |
| 🆕 | GET | `/api/hotels/:id/rooms/:roomId` | room detail + availability |
| 🆕 | GET | `/api/hotels/:id/availability?room_id&check_in&check_out` | |
| 🆕 | GET | `/api/hotels/map` | markers for map page (bounds query) |
| 🆕 | GET | `/api/hotels/trending-destinations` | |
| 🆕 | GET | `/api/hotels/last-minute?lat&lng` | "last minute near you" |
| 🆕 | GET | `/api/hotels/property-types` | "browse by property type" w/ counts |
| 🆕 | GET | `/api/hotels/:id/reviews` | guest experiences |
| 🆕 | POST | `/api/coupons/validate` | `{ code, hotel_id, amount }` |
| 🆕 | POST | `/api/bookings/hotel` | checkout: `hotel_id, room_id, check_in, check_out, rooms, guests, first_name, last_name, email, phone, nationality, passport_id, special_request, coupon_code` → returns booking + payment intent |
| 🆕 | POST | `/api/payments/intent` / `/api/payments/confirm` | payment provider to be decided with product |
| 🆕 | GET | `/api/bookings/hotel/:bookingId` | booking confirmation page |

**User panel — hotel bookings** 🆕
- `GET /api/users/hotel-bookings?status=CONFIRMED|PENDING|COMPLETED|CANCELLED&search&page` (+ summary counts; upcoming/past)
- `GET /api/users/hotel-bookings/:id`, `PUT .../:id/cancel`
- Row fields: bookingId, hotel name, address, thumbnail, check-in/out, time, rooms, guests, status.

## 9. Inspection Bookings 🆕 (User panel; visible to agents)

3-step flow: select property → date & time → details.
- `POST /api/inspections` — `property_id, date, time, notes/requirements`
- `GET /api/users/inspections?status&page` — list (property, type Villa/Apartment…, date, time, status)
- `PUT /api/inspections/:id` (reschedule), `PUT /api/inspections/:id/cancel`
- `GET /api/inspections/available-slots?property_id&date`
- Agent side: `GET /api/agents/inspections`, `PUT /api/agents/inspections/:id/status` (confirm/decline)

## 10. Messages (User + Agent panels) 🆕

Contact list, conversation, send message, unread count.
- `GET /api/conversations` — `{ id, participant{name,avatar}, last_message, time, unread }`
- `POST /api/conversations` — `{ recipient_id, property_id? }` (start chat from property/agent page)
- `GET /api/conversations/:id/messages?before=&limit=`
- `POST /api/conversations/:id/messages` — `{ text }` (+ attachment multipart)
- `PUT /api/conversations/:id/read`
- Realtime: WebSocket / SSE channel for new messages (needs decision).

## 11. User Dashboard 🆕
- `GET /api/users/dashboard` — saved count, upcoming inspections, hotel bookings, recent messages, recent activity.

## 12. Commercial 🆕
- `GET /api/public/commercial` — `listing_type(Buy/Lease), property_type, location, price, size, search, page`
- `GET /api/public/commercial/:id`
- `GET /api/public/commercial/types` — property type categories + counts
- `GET /api/public/commercial/type/:slug` — listings by type
- `GET /api/public/commercial/featured` — premium featured / new
- `GET /api/public/news?category=commercial|home-loan` — "Latest commercial property news" / "Latest home loan news"
- Franchise enquiry: `POST /api/public/franchise-enquiries`
- Agent create/edit commercial listing: reuse `/api/properties` with `purpose=commercial` (confirm).

## 13. Flatmates 🆕
- `GET /api/flatmates` — `type(flatmate/place), location, min/max price, available_from, room type, page`
- `GET /api/flatmates/:id` — rooms (rent + bills), room icons, features, about flatmates, description, host (name, avatar, status)
- `POST /api/flatmates` — create free listing (multipart gallery) — auth
- `PUT/DELETE /api/flatmates/:id`
- `POST /api/flatmates/:id/contact`

## 14. Student Residency 🆕
- `GET /api/student-residencies` — `city, price, page`
- `GET /api/student-residencies/:id`
- `GET /api/student-residencies/popular-cities`
- `GET /api/student-residencies/partners`, `GET /api/student-residencies/offers`
- `POST /api/student-residencies/:id/bookings` — booking steps flow
- `POST /api/student-residencies/referrals`

## 15. Brokers (Home loans) 🆕
- `GET /api/brokers` — `location, search, page`
- `GET /api/brokers/:slug`
- `GET /api/brokers/banks` — lender logos
- `POST /api/brokers/pre-approval` — pre-approval form (name, email, phone, income, loan amount, etc.)
- `POST /api/brokers/match` — "Find your broker" form

## 16. Home page / Misc (public) 🆕
- `GET /api/public/home` (or individual): reviews/testimonials, hotel offers, hotel logos, state galleries/counts, categories counts, student residency partners
- `GET /api/public/reviews`
- `POST /api/public/newsletter` — footer subscribe
- `GET /api/public/languages` (language selector — optional, may stay frontend-only)

## 17. Admin Panel (all 🆕)

| Page | Endpoints |
|---|---|
| Dashboard / Overview | `GET /api/admin/overview?from=&to=` → KPIs (revenue, active bookings, new customers, properties listed, active agents), revenue series, bookings split (Confirmed/Pending/Cancelled), category split (Hotels/Apartments/Villas/Land), top properties (views, bookings, revenue, conversion), growth (fresh vs returning) |
| Analytics | `GET /api/admin/analytics`, `GET /api/admin/analytics/export` |
| Agents | `GET /api/admin/agents` (filters: status, location, specialization, performance; page) + stats (total, active, new this month, top performers) · `POST /api/admin/agents` · `PUT /api/admin/agents/:id` · `PUT /api/admin/agents/:id/status` (approve/suspend) · `DELETE /api/admin/agents/:id` · `GET /api/admin/agents/export` |
| Customers | `GET /api/admin/customers` (filters: status, budget range, location, assigned agent; page) + stats (total, active, new, high value) · `PUT /api/admin/customers/:id` · `PUT /api/admin/customers/:id/assign-agent` · `DELETE …/:id` · export |
| Listings | `GET /api/admin/listings` (filters: type, category, location, price, bedrooms, status, agent; page) + stats (total, buy, rent, active) · `PUT /api/admin/listings/:id/status` (approve/reject/deactivate) · `DELETE …/:id` · export |
| Bookings | `GET /api/admin/bookings` (hotel + inspection) |

---

## Cross-cutting requests
1. **Uploads**: serve at `/uploads/...` (frontend prefixes with base URL); accept multipart for images/documents. Max sizes & allowed types to be agreed.
2. **Pagination** consistent on all list endpoints (see conventions).
3. **Image fields** returned as URL strings (not objects).
4. **CORS** allow frontend origin with credentials.
5. **Rate-limit** OTP / login endpoints.
6. **Role guards**: agent endpoints reject users; `/api/admin/*` admin only.
7. **Currency/price**: please return numeric values + currency code (UI currently shows pre-formatted strings like "$750 - $850").
8. Items marked ⚠️ — confirm paths; they were guessed from the `/api/agents/*` pattern.

*Generated by scanning `app/`, `components/`, `lib/` of the realto frontend. Sections 1–3, 5, 6 reflect code already calling the API; the rest reflect screens currently running on mock/static data.*
