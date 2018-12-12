import { Scales } from 'plottable';
import { easeCircleInOut } from 'd3';

export const createScaleAnimator = (duration: number) => {
  // Animator function:
  // takes an array of scales and a list of transformations for each scale
  return (scales: Scales.Linear[], nextDomains: number[][]) => new Promise(resolve => {
      const currentDomains = scales.map(scale => scale.domain());
      const diffs = currentDomains.map(([ currentMin, currentMax ], index) => {
        const [ nextMin, nextMax ] = nextDomains[index];

        return [ currentMin - nextMin, nextMax - currentMax ];
      });

      const stepFn = progress => {
        const movements = currentDomains.map(([ fn, fx ], index) => {
          const [ dn, dx ] = diffs[index];

          return [
            fn - (dn * easeCircleInOut(progress)),
            fx + (dx * easeCircleInOut(progress))
          ];
        });

        focusScale(scales, movements);
      };

      requestAnimationFrame(timestamp => {
        const animate = createAnimator(stepFn, timestamp, duration, resolve);
        animate(timestamp);
      });
    });
};

export const createAnimator = (stepFn: (number: number) => any, startTime: number, duration: number, callback: () => void) => { // tslint:disable-line
  let animationFrame: number | null = null;

  return function animate(timestamp) {
    const runtime = timestamp - startTime;
    const progress = Math.min(runtime / duration, 1);

    stepFn(progress);

    if (runtime < duration) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame as number);
      callback();
    }
  };
};

export const focusScale = (scales: Scales.Linear[], domains: number[][]) => {
  scales.forEach((scale, index) => {
    scale.domain();
    const domain = domains[index] || [];
    const [ min, max ] = domain;
    scale.domainMin(min);
    scale.domainMax(max);
  });
};
