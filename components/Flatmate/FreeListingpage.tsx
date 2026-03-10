"use client";

import { useState } from "react";
import CreateFreeListing from './CreateFreeListing'
import ListingsGrid from "./ListingGrid";

const FreeListingpage = () => {
    const [mode, setMode] = useState<"flatmate" | "place" | "all">("all");
  return (
      <div>
          <CreateFreeListing setMode={setMode} />
        <ListingsGrid mode={mode} />
    </div>
  )
}

export default FreeListingpage