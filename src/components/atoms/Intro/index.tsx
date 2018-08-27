import * as React from 'react';

interface IntroProps {
  step: number;
  intro: string;
  position?: string;
  className?: string;
  style?: object;
  span?: boolean;
}

const Intro: React.SFC<IntroProps> = ({ step, intro, children, className, position, style, span }) => {
  return React.createElement(`${span ? 'span' : 'div' }`, {
    'data-step': step,
    'data-intro': intro,
    className,
    style,
    'data-position': position
  }, children);
};

export { Intro };
