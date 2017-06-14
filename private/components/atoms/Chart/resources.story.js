import React from 'react';
import Chart from './';
import Statistic from '../Statistic';
import donut from './stubs/donut.chart';
import line from './stubs/line.chart';

export default (<div>
  <div className="ui top attached tabular menu">
    <div className="item">Overview</div>
    <div className="item">Poverty</div>
    <div className="item">Population</div>
    <div className="item">Government Finance</div>
    <div className="item active">International Resources</div>
  </div>
  <div className="ui bottom attached active tab segment">

    <div className="ui very padded basic segment">

      <div className="ui three column grid">

        <div className="column">
          <h3 className="ui center aligned header">AS A SHARE OF GNI, HOW MUCH AID IS ALLOCATED TO UGANDA?</h3>
          <Statistic size="tiny" value="6.0% of GNI" label="Gross national income is 27.1bn" />
        </div>

        <div className="column">
          <h3 className="ui center aligned header">HOW HAVE RESOURCE INFLOWS CHANGED OVER TIME?</h3>
          <Chart config={line.config} data={line.data} height="150px" />
        </div>

        <div className="column">
          <h3 className="ui header">WHAT’S THE MIX OF RESOURCES?</h3>
          <Chart config={donut.config} data={donut.data} height="150px" />
        </div>

      </div>

    </div>
  </div>
</div>);
