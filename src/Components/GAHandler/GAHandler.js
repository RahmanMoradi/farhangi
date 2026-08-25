"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GAHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-H9C5RW2FNJ", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}