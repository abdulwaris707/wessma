"use client";

import { useEffect } from "react";

/** Signals that the shared React shell, including the navbar, has mounted. */
export function InitialRenderReady() {
  useEffect(() => {
    window.dispatchEvent(new Event("wessmaa:app-mounted"));
  }, []);
  return null;
}
