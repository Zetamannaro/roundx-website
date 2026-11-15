export const grainientPreset = {
  colors: ['#ffffff', '#d0b7b2', '#baa29a', '#c69370', '#c69358'],
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

export const grainientEndColors = ['#ffffff', '#b2cad0', '#9ab3ba', '#7094c6', '#5c58c6'];

function interpolateColor(start: string, end: string, progress: number) {
  const channels = [1, 3, 5].map(offset => {
    const a = parseInt(start.slice(offset, offset + 2), 16);
    const b = parseInt(end.slice(offset, offset + 2), 16);
    return Math.round(a + (b - a) * progress).toString(16).padStart(2, '0');
  });
  return `#${channels.join('')}`;
}

// Both palettes and the angle reach their exact endpoints at the document bottom.
export function grainientAtScroll(scrollY: number, scrollHeight: number, viewportHeight: number) {
  const range = scrollHeight - viewportHeight;
  const progress = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
  return {
    colors: grainientPreset.colors.map((color, index) => interpolateColor(color, grainientEndColors[index], progress)),
    angle: 55 + (90 - 55) * progress,
    flow: 0.8 + (2 - 0.8) * progress,
  };
}
