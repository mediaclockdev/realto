# Buy Card Shared UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the buy property card so the home slider and the buy listing flow render the same shared UI while leaving rent and land unchanged.

**Architecture:** Extract the current premium slider card into a dedicated shared buy-card component with a presentational prop shape that both the home slider and listing flow can map into. Keep repository/data contracts unchanged and limit the refactor to presentation components and local type adapters.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Next Image, Lucide React

---

## File Structure

- Create: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/BuyPropertyCard.tsx`
  - Shared buy-card renderer for premium buy UI
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx`
  - Replace inline slider card implementation with shared component usage
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx`
  - Route the buy variant to the shared component while leaving rent and land logic intact

### Task 1: Create the shared buy-card component

**Files:**
- Create: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/BuyPropertyCard.tsx`

- [ ] **Step 1: Define the presentational prop type in the new component**

Add a prop type that covers the fields both sources already have:

```tsx
interface BuyPropertyCardData {
  id: string;
  images: ImageSource[];
  location: string;
  size: string;
  date: string;
  dateIcon?: ImageSource;
  time: string;
  priceRange: string;
  propertyType: string;
  agentName: string;
  agentCompany: ImageSource;
  agentLocation: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: ImageSource;
  iconImages?: ImageSource[];
  iconLabels?: string[];
}

interface BuyPropertyCardProps {
  property: BuyPropertyCardData;
  onClick?: () => void;
}
```

- [ ] **Step 2: Move the slider card UI into the new shared component**

Copy the current buy visual layout from `/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx` into the new component, preserving:

```tsx
const GOLD_GRADIENT =
  "linear-gradient(90deg, #CB9E33, #EDD06A, #FCEA94, #FADE7B, #FDEE9D, #C29225)";
```

and the existing image carousel, lower hover region, share modal, and like button interactions.

- [ ] **Step 3: Keep the shared component self-contained**

Inside the new component, keep local UI state:

```tsx
const [isLowerHovered, setIsLowerHovered] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [liked, setLiked] = useState(false);
const [showShareModal, setShowShareModal] = useState(false);
const [isHovered, setIsHovered] = useState(false);
```

- [ ] **Step 4: Export the new shared component**

Use:

```tsx
export default BuyPropertyCard;
export type { BuyPropertyCardData };
```

### Task 2: Switch the home slider to the shared component

**Files:**
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx`

- [ ] **Step 1: Import the shared component**

Add:

```tsx
import BuyPropertyCard from "@/components/PropertyListing/BuyPropertyCard";
```

- [ ] **Step 2: Keep the slider data type intact**

Do not change `PropertyData` in the slider file yet. Keep the existing interface and map it into the shared card.

- [ ] **Step 3: Replace the inline `PropertyCard` usage**

Inside the slider map, swap:

```tsx
<PropertyCard
  key={property.id}
  property={property}
  onCardClick={onPropertyClick}
/>
```

for:

```tsx
<BuyPropertyCard
  key={property.id}
  property={{
    id: property.id,
    images: property.images,
    location: property.location,
    size: property.size,
    date: property.date,
    dateIcon: property.dateicon,
    time: property.time,
    priceRange: property.priceRange,
    propertyType: property.propertyType,
    agentName: property.agentName,
    agentCompany: property.agentCompany,
    agentLocation: property.agentLocation,
    agentPhone: property.agentPhone,
    agentEmail: property.agentEmail,
    agentImage: property.agentImage,
    iconImages: property.iconImages,
    iconLabels: property.iconLabels,
  }}
  onClick={() => onPropertyClick?.(property)}
/>;
```

- [ ] **Step 4: Remove the old inline slider `PropertyCard` implementation**

Delete the local `PropertyCard`, `Tooltip`, and `FollowCursorTooltip` implementations that only existed to support the slider card.

### Task 3: Switch the buy listing flow to the shared component

**Files:**
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx`

- [ ] **Step 1: Import the shared buy-card component**

Add:

```tsx
import BuyPropertyCard from "./BuyPropertyCard";
```

- [ ] **Step 2: Keep the rent branch unchanged**

Do not modify the `listingVariant === "rent"` branch.

- [ ] **Step 3: Replace the buy branch with the shared component**

Before the existing fallback card return, add:

```tsx
if (listingVariant === "buy") {
  return (
    <BuyPropertyCard
      property={{
        id: property.id,
        images: property.images,
        location: property.location,
        size: property.size,
        date: property.date,
        dateIcon: Array.isArray(property.dateicon)
          ? property.dateicon[0]
          : property.dateicon,
        time: property.time,
        priceRange: property.priceRange,
        propertyType: property.propertyType,
        agentName: property.agentName,
        agentCompany: property.agentCompany,
        agentLocation: property.agentLocation,
        agentPhone: property.agentPhone,
        agentEmail: property.agentEmail,
        agentImage: property.agentImage,
        iconImages: property.iconImages,
        iconLabels: property.iconLabels,
      }}
      onClick={onClick}
    />
  );
}
```

- [ ] **Step 4: Keep land using the current fallback branch**

The remaining existing branch should continue to handle `land`.

### Task 4: Verify the refactor

**Files:**
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx`
- Modify: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx`
- Create: `/Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/BuyPropertyCard.tsx`

- [ ] **Step 1: Run ESLint on the touched files**

Run:

```bash
npx eslint /Users/viveksinghmehta/Documents/MediaClock/realto/components/Home/PropertySlider.tsx /Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/PropertyListingCard.tsx /Users/viveksinghmehta/Documents/MediaClock/realto/components/PropertyListing/BuyPropertyCard.tsx
```

Expected: no lint errors

- [ ] **Step 2: Run TypeScript verification**

Run:

```bash
npx tsc --noEmit --pretty false
```

Expected: exit code 0

- [ ] **Step 3: Manually verify UI**

Check:
- home slider still renders the same premium buy card UI
- buy listing cards now match the home slider card UI
- rent cards remain unchanged
- land cards remain unchanged
- map/detail contexts still render and click correctly
