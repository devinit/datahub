// @flow
import React from 'react';
import type { Element } from 'react';

class Tabs extends React.Component {

  static defaultProps = {
    selected: 0,
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }
  state: {
    selected?: number
  }
  props: {
    children: any,
    selected?: number
  }
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  _renderTitles() {
    function labels(child, index) {
      const activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a
            href=""
            className={activeClass}
            onClick={(e) => this.handleClick.bind(this, index)}
          >
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}

