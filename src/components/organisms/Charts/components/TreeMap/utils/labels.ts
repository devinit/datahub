export const autofitMetrics = (width: number, height: number, text: string) => {
  const baseFont = 9;
  const availableArea = width * height;
  const words = text.split(/\s+/);
  const longestWordLength = Math.max.apply(null, words.map((l) => l.length));
  const estimatedArea = longestWordLength * (baseFont * 0.8) * words.length * baseFont;

  const areaRatio = Math.floor(availableArea / estimatedArea);
  const widthRatio = width / (longestWordLength * baseFont * 0.8);

  if (areaRatio < 1 || widthRatio < 0.8) {
    return { fontSize: 0, showLabels: false };
  }

  if (widthRatio < 1.5) {
    return { fontSize: baseFont * 1.2, showLabels: widthRatio > 0.7 };
  }

  if (widthRatio < 2) {
    return { fontSize: baseFont * 1.5, showLabels: widthRatio > 0.7 };
  }

  if (widthRatio < 3) {
    return { fontSize: baseFont * 1.6, showLabels: widthRatio > 0.7 };
  }

  return { fontSize: baseFont * 1.8, showLabels: widthRatio > 0.7 };
};

export const autofitStyles = (width: number, height: number, text: string) => {
  const autoFit = autofitMetrics(width, height, text);

  return {
    label: `style="display: ${autoFit.showLabels ? 'block' : 'none'}"`,
    font: `style="font-size: ${autoFit.fontSize}px"`
  };
};
