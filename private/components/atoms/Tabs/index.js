// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: any,
    selected?: number
}

class Tabs extends React.Component {

  static defaultProps = {
    selected: 0,
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }
  state: {
    selected?: number
  }
  handleClick(index: number, event: any) {
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
    const labels = (child, index) => {
      const activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a
            href=""
            className={activeClass}
            onClick={(e) => this.handleClick(index, e)}
          >
            {child.props.label}
          </a>
        </li>
      );
    };
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels)}
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

export default Tabs;
