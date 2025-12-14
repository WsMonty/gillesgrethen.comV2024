import { useEffect } from "react";

export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    const body = document.body;

    if (isLocked) {
      const prevOverflow = body.style.overflow || "";

      body.style.overflow = "hidden";

      return () => {
        body.style.overflow = prevOverflow || "";
      };
    } else {
      body.style.overflow = "";
    }
  }, [isLocked]);
}
