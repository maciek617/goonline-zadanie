export const hexToHsl = (hex: string) => {
  const red = parseInt(hex.substring(1, 3), 16) / 255;
  const green = parseInt(hex.substring(3, 5), 16) / 255;
  const blue = parseInt(hex.substring(5, 7), 16) / 255;

  // Convert RGB to HSL
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red:
        h = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        h = (blue - red) / d + 2;
        break;
      case blue:
        h = (red - green) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  // Convert hue, saturation, and lightness to HSL string
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
