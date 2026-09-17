import { useOnScreen } from "../hooks/useOnScreen";

const OFFSETS = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  left: (d) => `translate3d(${-Math.min(d * 1.2, 36)}px, 0, 0)`,
  right: (d) => `translate3d(${Math.min(d * 1.2, 36)}px, 0, 0)`,
};

export function Reveal({ children, delay = 0, distance = 20, from = "up", style, className }) {
  const [ref, visible] = useOnScreen();
  const offset = OFFSETS[from] || OFFSETS.up;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : `${offset(distance)} scale(0.98)`,
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
