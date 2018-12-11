import { Datum } from './types';

export const calculatePercentage = (width: number, height: number) => {
  const percentArea = (width * height) / 100;

  return (datum: Datum) =>
    Math.round(((datum.x1 - datum.x0) * (datum.y1 - datum.y0)) / percentArea);
};

export * from './types';
export * from './labels';
