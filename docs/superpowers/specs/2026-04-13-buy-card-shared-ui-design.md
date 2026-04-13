# Buy Card Shared UI Design

## Goal
Make the buy listing card use the same UI as the home property slider card, while keeping the current rent and land card variants unchanged.

## Current State
- [PropertySlider.tsx](/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx) contains its own premium buy-card UI inline.
- [PropertyListingCard.tsx](/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx) has a separate buy branch with a different layout.
- Both cards render similar property content, but the visual systems have drifted.

## Approved Approach
Extract the existing slider buy-card UI into one shared component and use that component in both places:

1. Home slider
2. Buy listing flow

## Why This Approach
- Gives exact visual parity between the home slider and buy listings
- Avoids duplicating the buy card layout in two files
- Keeps rent and land isolated from the refactor
- Lets future buy-card changes happen in one place

## Component Design

### New shared component
Create a dedicated shared buy-card renderer under the property listing area, for example:

- [BuyPropertyCard.tsx](/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/BuyPropertyCard.tsx)

This component should own:
- image carousel
- hover border / scale behavior
- tooltip behavior
- icon preview row
- location / size row
- date / time row
- price / property type row
- agent strip
- share / like actions

### Property slider usage
[PropertySlider.tsx](/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx) should stop rendering its own inline buy-card layout and instead pass mapped props into the shared buy-card component.

### Listing card usage
[PropertyListingCard.tsx](/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx) should render the shared buy-card only when:

- `listingVariant === "buy"`

The existing rent branch and land-specific behavior should remain untouched.

## Data Shape Strategy
The slider currently uses `PropertyData` and the listing flow uses `ListingProperty`.

Instead of forcing one domain type to depend on the other, the shared component should accept a smaller presentational prop shape that both sources can map into.

That shared shape should include:
- id
- images
- location
- size
- date
- date icon if needed
- time
- price range
- property type
- agent name
- agent company
- agent location
- agent phone
- agent email
- agent image
- icon images / labels

## Architecture Impact
This is a presentation-layer refactor only.

No changes needed to:
- repositories
- listing routes
- property routes
- mock data structure

The only change is that buy presentation becomes shared instead of duplicated.

## Verification
Verify:
- home slider still matches the current buy card UI
- buy listing page now matches the home slider card UI
- rent card unchanged
- land card unchanged
- map/detail contexts still render without type or layout regressions
- TypeScript and ESLint pass

## Out of Scope
- changing rent card UI
- changing land card UI
- changing data repositories
- changing navigation behavior
