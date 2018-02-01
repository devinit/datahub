// @flow
import React from 'react';

interface Props  {
  size?: string;
  value: string;
  label?: string;
}

const Statistic = (props: Props) => {
  return (
    <div className="ui center aligned very padded basic segment">
      <div className={`ui ${props.size || 'tiny'} statistic`}>
        <div className="value">
          {props.value}
        </div>
        <div className="label">
          {props.label || ''}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
