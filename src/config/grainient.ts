export const grainientPreset = {
  colors: ['#ff8a24', '#dd5e13', '#78350f', '#21120a', '#000000'],
  angle: 55,
  flow: 0.8,
  silk: 0.35,
  grainAmount: 0.08,
  type: 'linear' as const,
  bands: 1,
  softness: 1,
  scale: 1,
  speed: 1,
  grainSize: 1.2,
  grainAnimated: true,
  contrast: 1,
  saturation: 1,
  variation: 0,
  interactive: true,
  stir: 1,
  clickSwirl: true,
  intro: true,
  lightMode: false,
};

// Endpoints match the sliders in the official Grainient demo (angle 360°, flow 2).
export function grainientAtScroll(scrollY: number, scrollHeight: number, viewportHeight: number) {
  const range = scrollHeight - viewportHeight;
  const progress = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
  return { angle: 55 + (360 - 55) * progress, flow: 0.8 + (2 - 0.8) * progress };
}
