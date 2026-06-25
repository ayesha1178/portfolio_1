// src/hooks/use-mobile.ts

import * as React from "react";

/**
 * Hook to detect if the screen is mobile-sized.
 * Uses a media query (default: max-width 768px).
 */
export function useMobile(breakpoint: number = 768): boolean {
  const query = `(max-width: ${breakpoint}px)`;

  const getMatches = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [isMobile, setIsMobile] = React.useState<boolean>(getMatches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Initial check
    handleChange();

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return isMobile;
}