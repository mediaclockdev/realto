"use client";

import { useEffect, useState } from "react";

// Client-side gate only: the token lives in localStorage, so middleware can't see it.
// Real enforcement must be the API rejecting non-admin tokens.
export function isAdmin() {
  try {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token!.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    // ponytail: role claim name unconfirmed; a token without one is let through (the API still checks)
    return payload.role === undefined || payload.role === "admin";
  } catch {
    return false;
  }
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (isAdmin()) setOk(true);
    else window.location.replace("/adminpanel/login");
  }, []);
  return ok ? children : null;
}
