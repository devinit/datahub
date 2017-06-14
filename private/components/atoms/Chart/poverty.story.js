import React from 'react';
import Chart from './';
import Statistic from '../Statistic';
import area from './stubs/area.chart';
import histogram from './stubs/histogram.chart';

export default (<div>
  <div className="ui top attached tabular menu">
    <div className="item">Overview</div>
    <div className="item active">Poverty</div>
    <div className="item">Population</div>
    <div className="item">Government Finance</div>
    <div className="item">International Resources</div>
  </div>
  <div className="ui bottom attached active tab segment">

    <div className="ui very padded basic segment">

      <div className="ui three column grid">

        <div className="column">
          <h3 className="ui header">
            IS POVERTY REDUCING OVER TIME?
          </h3>
          <Chart config={area.config} data={area.data} height="120px" />
        </div>

        <div className="column">
          <h3 className="ui center aligned header">
            HOW DEEP IS POVERTY?
          </h3>
          <Statistic value="10%" label="Depth of extreme poverty" />
        </div>

        <div className="column">
          <h3 className="ui header">HOW IS INCOME DISTRIBUTED? </h3>
          <Chart config={histogram.config} data={histogram.data} height="120px" />
        </div>

      </div>

    </div>
  </div>
</div>);
