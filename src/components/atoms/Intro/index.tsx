import * as React from 'react';

interface IntroProps {
  step: number;
  intro: string;
  position?: string;
  className?: string;
  style?: object;
}

const Intro: React.SFC<IntroProps> = ({ step, intro, children, className, position, style }) => {
  return (
    <div
      data-step={ `${step}` }
      data-intro={ intro }
      className={ className }
      style={ style }
      data-position={ position }
    >
      { children }
    </div>
  );
};

export { Intro };
