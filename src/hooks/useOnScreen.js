import { useEffect, useRef, useState } from "react";

/* ---------- Reveal al hacer scroll ---------- */
export function useOnScreen(threshold = 0.02) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduced = false;
    }
    if (reduced) {
      setVisible(true);
      return;
    }

    // Check if element is already within viewport on initial render
    const rect = node.getBoundingClientRect();
    if (rect.top < (window.innerHeight || document.documentElement.clientHeight) + 60 && rect.bottom > -60) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: "60px 0px 60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ---------- Igual, pero se reactiva cada vez que vuelve a entrar en pantalla (para contadores) ---------- */
export function useOnScreenRepeat(threshold = 0.4) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduced = false;
    }
    if (reduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
