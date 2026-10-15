import { useTransform } from "motion/react";

/* Copia el progreso de scroll en un motion value derivado por función.
   Así motion no intenta acelerar las transformaciones con WAAPI/ScrollTimeline,
   que falla con rangos parciales («Offsets must be null or in the range [0,1]»). */
export function useScrollProgress(progress) {
  return useTransform(progress, (v) => v);
}
