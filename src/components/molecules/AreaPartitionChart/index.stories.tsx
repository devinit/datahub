import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AreaPartition, {UProps} from '.';
import config from '../../visbox/areaTreemapChart';
import {RECIPIENT} from '../../../utils/constants';
import flowCache from './flows.data';
const data = require('./testData.json').data.internationalResources;

const { inflows, outflows } = flowCache[RECIPIENT];

class Stub extends React.Component<UProps> {
  constructor(props) {
    super(props);
  }
  public render() {
    return <div>
          <p>unbundling international Resouces chart stub</p>
          <p>year: {this.props.year}</p>
        </div>;
  }
}

storiesOf('Area Partition', module)
  .add('Chart', () =>
    <AreaPartition
      id={'ug'}
      countryType={RECIPIENT}
      startYear={data.startYear}
      data={data.resourcesOverTime.data}
      config={config}
      year={2015} // look in countryProfile lower tabs
      country="Uganda"
      inflows={inflows}
      outflows={outflows}
      unbundlingInternationalResources={Stub}
    />
  );
