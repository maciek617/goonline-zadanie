export const extractSaturation = (color: string): [number] => {
  const hslRegex = /hsl\(\s*\d+\s*,\s*(\d+(\.\d+)?)%\s*,\s*\d+(\.\d+)?%\s*\)/;
  const match = color.match(hslRegex);
  if (!match) {
    throw new Error(`Invalid HSL string: ${color}`);
  }
  const [, s] = match;
  return [parseFloat(s)];
};
