export const extractRgbValues = (
  rgbString: string
): [number, number, number] => {
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    throw new Error(`Invalid RGB string: ${rgbString}`);
  }
  const [, r, g, b] = match;
  return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10)];
};
