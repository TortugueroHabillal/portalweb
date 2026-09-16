import { useOnScreen } from "../hooks/useOnScreen";

const OFFSETS = {
  up: (d) => `translateY(${d}px)`,
  left: (d) => `translateX(${-d * 1.6}px)`,
  right: (d) => `translateX(${d * 1.6}px)`,
};

export function Reveal({ children, delay = 0, distance = 22, from = "up", style, className }) {
  const [ref, visible] = useOnScreen();
  const offset = OFFSETS[from] || OFFSETS.up;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0) scale(1)" : `${offset(distance)} scale(0.98)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
