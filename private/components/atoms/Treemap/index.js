// @flow
import React, {Component} from 'react';
import {draw} from 'lib/treemap';

type Props = {
  data: Object[]
}

export default class Treemap extends Component {
  /* eslint-disable no-useless-constructor */
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {data} = this.props;
    const height = '450';
    const width = '900';
    return (
      <section>
        <h4>Treemap test</h4>
        <svg
          width={width}
          height={height}
          ref={element => {
            if (element) draw({element, width, height}, data);
          }}
        />
      </section>
    );
  }
}
