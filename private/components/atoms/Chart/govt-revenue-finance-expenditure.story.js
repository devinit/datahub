import React from 'react';
import Chart from './';
import chart from './stubs/line-partition.chart';

export default (<div>
  <div className="ui basic segment">

    <div className="ui very padded basic segment">

      <div className="ui compact segment">
        <h3 className="ui header">REVENUE AND GRANTS 2016</h3>
      </div>

      <div className="ui two column grid">

        <div className="four wide column">
          <div className="ui segment">
            <Chart
              height="180px"
              config={chart.lineConfig}
              data={chart.data.filter(d => d.type === 'total-revenue-and-grants' && d.id === 'total-revenue-and-grants')}
            />
          </div>
        </div>

        <div className="twelve wide column">
          <Chart
            height="210px"
            config={chart.partitionConfig}
            data={chart.data.filter(d => d.type === 'total-revenue-and-grants' && d.year === 2016)}
          />
        </div>

      </div>

      <div className="ui two column grid">

        <div className="four wide column">
          <div className="ui segment">
            <Chart
              height="180px"
              config={chart.lineConfig}
              data={chart.data.filter(d => d.type === 'financing' && d.id === 'financing')}
            />
          </div>
        </div>

        <div className="twelve wide column">
          <Chart
            height="210px"
            config={chart.partitionConfig}
            data={chart.data.filter(d => d.type === 'financing' && d.year === 2016)}
          />
        </div>

      </div>

      <div className="ui compact segment">
        <h3 className="ui header">FINANCING 2016</h3>
      </div>

    </div>

    <div className="ui very padded basic segment">

      <div className="ui compact segment">
        <h3 className="ui header">EXPENDITURE 2016</h3>
      </div>

      <div className="ui two column grid">

        <div className="four wide column">
          <div className="ui segment">
            <Chart
              height="180px"
              config={chart.lineConfig}
              data={chart.data.filter(d => d.type === 'total-expenditure' && d.id === 'total-expenditure')}
            />
          </div>
        </div>

        <div className="twelve wide column">
          <Chart
            height="210px"
            config={chart.partitionConfig}
            data={chart.data.filter(d => d.type === 'total-expenditure' && d.year === 2016)}
          />
        </div>

      </div>

    </div>

  </div>

</div>);
