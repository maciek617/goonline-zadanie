export const hexToRgb = (hex: string) => {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Return RGB as string
  return `rgb(${r}, ${g}, ${b})`;
};
