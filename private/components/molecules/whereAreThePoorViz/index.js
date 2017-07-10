import React from 'react';
import * as d3 from 'd3';
import glamarous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import Controls from 'components/molecules/PoorVizControls';
import * as utils from '../../../lib/utils/poorVizUtils';

const SvgContainer = glamarous.div({
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  left: 0,
});

class Poor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2013,
      indicator: 'Baseline',
      level: 'regional',
      change: false,
    };
  }
  componentDidMount() {
    this.renderVisualization();
  }
  componentDidUpdate(prevProps, prevState) {
    this.renderVisualization();
  }
  onLevelChange(level) {
    this.setState({change: true});
    this.setState({level});
  }
  onYearChange(year) {
    this.setState({change: true});
    this.setState({year});
  }
  onScenarioChange(scenario) {
    this.setState({change: true});
    this.setState({indicator: scenario});
  }

  renderVisualization() {
    let data = [];
    /* eslint-disable react/no-string-refs */
    const svg = d3.select(this.refs.svg);
    const width = 940;
    const height = 600;
    const scale = d3.scaleSqrt().domain([1, 1500]).range([2, 150]);
    const colMap = utils.colMap;
    const {year, indicator, level, change} = this.state;
    data = utils.entities.map(item => {
      const value = utils.getValue(item.id, year, indicator);
      return {...item, value};
    });
    data = data.filter(item => item.level === 'region');
    data = data.map(item => ({...item, icons: Math.round(item.value / 5)}));
    const shape = 'M0-21L0-21L0-21c2.146,0.002,4.086,0.869,5.491,2.274   s2.272,3.346,2.273,5.488l0,0v0.003v0.001l0,0c-0.001,2.143-0.869,4.085-2.273,5.49C5.083-7.337,4.631-6.977,4.144-6.668H4.24   c3.612,0,6.567,2.955,6.567,6.566v12.567h-21.614V-0.102c0-3.611,2.955-6.566,6.566-6.566h0.097    c-0.588-0.309-0.94-0.569-1.348-1.076c-1.404-1.404-2.271-3.346-2.272-5.488h-0.001v-0.002v-0.001h0.001    c0-2.145,0.868-4.085,2.272-5.49c1.405-1.405,3.346-2.272,5.489-2.273V-21H0z';

    let iconData = [];

    const labelPlacement = {};
    data.forEach(o => {
      const startX = utils.getX(o.id);
      const startY = utils.getY(o.id);
      let row = 0;
      let col = 0;
      d3.range(o.icons).forEach((d, i) => {
        const cols = utils.getCols(level);
        const icon = {};

        if (i % cols === 0) {
          row += 1;
          col = 0;
        }

        const currentX = startX + (col * 12);
        const currentY = startY - (row * 25);

        icon.x = currentX;
        icon.y = currentY;
        icon.shape = shape;
        icon.color = colMap[o.id];

        icon.region = o.id;
        icon.id = `${o.id}_${i}`;

        col += 1;
        iconData.push(icon);
      });
      if (typeof iconData[iconData.length - 1] !== 'undefined') {
        labelPlacement[o.id] = iconData[iconData.length - 1].y;
      } else {
        labelPlacement[o.id] = 10000;
      }
    });
    if (level === 'global') {
      const startX = (width / 2) - (utils.getCols('global') / (2 * 12));
      const startY = utils.getY('world');

      let row = 0;
      let col = 0;
      iconData = iconData.map((o, index) => {
        const cols = utils.getCols(level);

        if (index % cols === 0) {
          row += 1;
          col = 0;
        }

        const currentX = startX + (col * 12);
        const currentY = startY - (row * 25);
        col += 1;
        return {...o, x: currentX, y: currentY, shape, color: '#333'};
      });
    }
    let regionLabelData = d3.values(data);
    let sum;
    if (level === 'global') {
      sum = d3.sum(regionLabelData, (d) => {
        return d.value;
      });

      regionLabelData = [];
    }

    let regionLabels = svg.selectAll('.regionLabel').data(regionLabelData);
    regionLabels = regionLabels.enter()
      .append('text')
      .attr('class', 'regionLabel')
      .attr('x', (d) => {
        return d.x + 90;
      })
      .attr('y', (d) => {
        return d.y;
      })
      .attr('text-anchor', 'middle')

      .text((d) => {
        return d.name;
      })
      .attr('fill-opacity', 10e-6);

    regionLabels.transition().duration(500).delay(2000)
      .text((d) => {
        return d.name;
      })
      .attr('fill-opacity', 1);
    regionLabels.exit().transition()
      .attr('fill-opacity', 10e-6).remove();


    regionLabels = svg.selectAll('.millionLabel')
      .data(regionLabelData);

    regionLabels = regionLabels.enter()
      .append('text')
      .attr('class', 'millionLabel')
      .attr('x', (d) => {
        return d.x + 90;
      })

      .attr('y', (d) => {
        return d.y + 20;
      })
      .attr('text-anchor', 'middle')

      .text((d) => {
        return utils.formatNumber(d.value * 1000000);
      })
      .attr('fill-opacity', 10e-6);
    if (change) {
      regionLabels.transition().duration(500).delay(2000)
        .text((d) => {
          return utils.formatNumber(d.value * 1000000);
        })
        .attr('fill-opacity', 1);
    } else {
      regionLabels.transition()
        .text((d) => {
          return utils.formatNumber(d.value * 1000000);
        })
        .attr('fill-opacity', 1);
    }
    regionLabels.exit().transition()
      .attr('fill-opacity', 10e-6).remove();

    let globalLabelData = [{value: sum}];

    if (level !== 'global') globalLabelData = [];

    let globalLabel = svg.selectAll('.globalLabel')
      .data(globalLabelData);


    globalLabel = globalLabel.enter()
      .append('text')
      .attr('class', 'globalLabel')
      .attr('x', (d) => {
        return width / 2;
      })
      .attr('y', (d) => {
        return 460;
      })
      .attr('text-anchor', 'middle')
      .text((d) => {
        return utils.formatNumber(d.value * 1000000);
      })
      .attr('fill-opacity', 10e-6);
    if (change) {
      globalLabel.transition().duration(500).delay(2000)
        .text((d) => {
          return `In extreme poverty:  ${utils.formatNumber(d.value * 1000000)}`;
        })
        .attr('fill-opacity', 1);
    } else {
      globalLabel.transition()
        .text((d) => {
          return `In extreme poverty:  ${utils.formatNumber(d.value * 1000000)}`;
        })
        .attr('fill-opacity', 1);
    }
    globalLabel.transition()
      .text((d) => {
        return `In extreme poverty:  ${utils.formatNumber(d.value * 1000000)}`;
      })
      .attr('fill-opacity', 1);
    globalLabel.exit().transition().attr('fill-opacity', 10e-6).remove();
    let icons;
    if (change) {
      icons = svg.selectAll('.icon')
        .data(iconData, (d) => { return d.id; });
      icons.transition().duration(500).delay((d) => {
        const dur = 300;
        if (d.region === 'LAC') {
          return dur * 0;
        }
        if (d.region === 'ECA') {
          return dur * 1;
        }
        if (d.region === 'MENA') {
          return dur * 2;
        }
        if (d.region === 'SA') {
          return dur * 3;
        }
        if (d.region === 'EAP') {
          return dur * 4;
        }
        if (d.region === 'SSA') {
          return dur * 5;
        }
        return dur;
      })
        .attr('fill-opacity', 1)
        .attr('transform', (d) => { return `translate(${d.x} , ${d.y}),scale(${utils.getScale(d.region)})`; })
        .attr('fill', (d) => { return d.color; });
    }
    if (level === 'global') {
      icons = svg.selectAll('.icon').data(iconData);
    } else {
      icons = svg.selectAll('.icon')
        .data(iconData, (d) => {
          return d.id;
        });
    }

    icons = icons.enter().append('path')
      .attr('class', 'icon')
      .attr('d', (d) => { return d.shape; })
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.1)`; })
      .attr('fill-opacity', 10e-6);

    icons.transition().duration(100)
      .attr('fill-opacity', 1)
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.5)`; })
      .attr('fill', (d) => { return d.color; });

    icons.exit().transition().duration(100)
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.1)`; })
      .attr('fill-opacity', 10e-6)
      .remove();
  }
/* eslint-disable react/no-string-refs */
  render() {
    return (
      <Container textAlign="center">
        <svg ref="svg" version="1.1" viewBox="0 0 940 600" preserveAspectRatio="xMinYMin meet" />
        <Controls
          year={this.state.year}
          scenario={this.state.indicator}
          level={this.state.level}
          onScenarioChange={(x) => this.onScenarioChange(x)}
          onYearChange={(x) => this.onYearChange(x)}
          onLevelChange={(x) => this.onLevelChange(x)}
        />
      </Container>);
  }
}

export default Poor;
