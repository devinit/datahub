import React from 'react';
import * as d3 from 'd3';
import glamarous from 'glamorous';
import {Container} from 'semantic-ui-react';
import Controls from 'components/molecules/PoorVizControls';
import * as utils from '../../../lib/utils/poorVizUtils';

const SvgContainer = glamarous.div({
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  paddingBottom: '3%',
  verticalAlign: 'middle',
  overflow: 'hidden',
});

class Poor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2013,
      indicator: 'Baseline',
      level: 'global',
      change: false,
    };
  }
  componentDidMount() {
    this.renderVisualization();
  }
  componentDidUpdate() {
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
  getData() {
    const {year, indicator} = this.state;
    return utils.entities
      .map(item => {
        const value = utils.getValue(item.id, year, indicator);
        return {...item, value};
      })
      .filter(item => item.level === 'region')
      .map(item => ({...item, icons: Math.round(item.value / 5)}));
  }
  getSvg() {
    /* eslint-disable react/no-string-refs */
    const svg = d3.select(this.refs.svg);
    return svg;
  }
  createIconData(data) {
    const {level} = this.state;
    const iconData = [];
    const labelPlacement = {};
    const colMap = utils.colMap;
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
        icon.shape = utils.shape;
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
    return {iconData, labelPlacement};
  }
  createGlobalIconData(iconData) {
    const {level} = this.state;
    const startX = utils.getX('world');
    const startY = utils.getY('world');

    let row = 0;
    let col = 0;
    return iconData.map((o, index) => {
      const cols = utils.getCols(level);

      if (index % cols === 0) {
        row += 1;
        col = 0;
      }

      const currentX = startX + (col * 12);
      const currentY = startY - (row * 25);
      col += 1;
      return {...o, x: currentX, y: currentY, shape: utils.shape, color: '#333'};
    });
  }
  createRegionalLabels(regionLabelData) {
    const svg = this.getSvg();
    const {change} = this.state;
    let regionLabels = svg.selectAll('.regionLabel').data(regionLabelData);
    regionLabels.exit().transition()
      .attr('fill-opacity', 10e-6).remove();
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


    regionLabels = svg.selectAll('.millionLabel')
      .data(regionLabelData);

    regionLabels.exit().transition()
      .attr('fill-opacity', 10e-6).remove();
    if (change) {
      regionLabels.transition().duration(200).delay(100)
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
    regionLabels.transition()
      .text((d) => {
        return utils.formatNumber(d.value * 1000000);
      })
      .attr('fill-opacity', 1);

    return svg;
  }
  createGlobalLabels(globalLabelData) {
    const width = 940;
    const svg = this.getSvg();
    const {change} = this.state;
    let globalLabel = svg.selectAll('.globalLabel')
      .data(globalLabelData);

    globalLabel.exit().transition().attr('fill-opacity', 10e-6).remove();

    if (change) {
      globalLabel.transition().duration(200).delay(100)
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

    globalLabel = globalLabel.enter()
      .append('text')
      .attr('class', 'globalLabel')
      .attr('x', () => width / 2)
      .attr('y', () => 460)
      .attr('text-anchor', 'middle')
      .text((d) => {
        return utils.formatNumber(d.value * 1000000);
      })
      .attr('fill-opacity', 10e-6);

    globalLabel.transition()
      .text((d) => {
        return `In extreme poverty:  ${utils.formatNumber(d.value * 1000000)}`;
      })
      .attr('fill-opacity', 1);
  }
  createIcons(iconData) {
    const {change, level} = this.state;
    const svg = this.getSvg();
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

    icons.exit().transition().duration(100)
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.1)`; })
      .attr('fill-opacity', 10e-6)
      .remove();

    icons = icons.enter().append('path')
      .attr('class', 'icon')
      .attr('d', (d) => { return d.shape; })
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.1)`; })
      .attr('fill-opacity', 10e-6);

    icons.transition().duration(100)
      .attr('fill-opacity', 1)
      .attr('transform', (d) => { return `translate(${d.x},${d.y} ),scale(0.5)`; })
      .attr('fill', (d) => { return d.color; });
  }
  renderVisualization() {
    const {level} = this.state;
    const data = this.getData();
    let {iconData} = this.createIconData(data);
    if (level === 'global') {
      iconData = this.createGlobalIconData(iconData);
    }
    let regionLabelData = d3.values(data);
    let sum;
    if (level === 'global') {
      sum = d3.sum(regionLabelData, (d) => {
        return d.value;
      });
      regionLabelData = [];
    }
    let globalLabelData = [{value: sum}];
    this.createRegionalLabels(regionLabelData);

    if (level !== 'global') globalLabelData = [];
    this.createGlobalLabels(globalLabelData);
    this.createIcons(iconData);
  }
  /* eslint-disable react/no-string-refs */
  render() {
    return (
      <Container textAlign="center">
        <SvgContainer>
          <svg ref="svg" version="1.1" viewBox="0 0 940 600" preserveAspectRatio="xMinYMin meet" />
          <Controls
            year={this.state.year}
            scenario={this.state.indicator}
            level={this.state.level}
            onScenarioChange={(x) => this.onScenarioChange(x)}
            onYearChange={(x) => this.onYearChange(x)}
            onLevelChange={(x) => this.onLevelChange(x)}
          />
        </SvgContainer>
      </Container>);
  }
}

export default Poor;
