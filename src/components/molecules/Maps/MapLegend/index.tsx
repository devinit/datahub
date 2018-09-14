import glamorous, { Div, P, Ul } from 'glamorous';
import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { howTo } from '../../../../utils/howTo';
import { Intro } from '../../../atoms/Intro';
import { mediaQueries } from '../../../theme';

export interface LegendField {
  label?: string;
  color?: string;
  backgroundColor: string;
}

export interface Props {
  title: string;
  description: string;
  legendData: LegendField[];
  visible: boolean;
}

export interface LegendItemStyleProps {
  color?: string;
  backgroundColor: string;
}

const LegendContainer = glamorous.div<{length: any; visible: boolean; }>(
  {
    position: 'absolute',
    left: '2%',
    width: '18%',
    display: 'flex',
    flexDirection: 'column',
    [mediaQueries.tabs]: {
      width: '50%'
    },
    [mediaQueries.phone]: {
      width: '100%',
      display: 'none'
    }
  },
  props => ({
    top: props.length ? `${140 / props.length}%` : '25%',
    [mediaQueries.phone]: {
      display: props.visible ? 'flex !important' : 'none'
    }
  })
);

const LegendKey = glamorous.li(
  {
    fontSize: '.75em',
    padding: '0.5em',
    listStyle: 'none',
    textAlign: 'center'
  },
  (props: LegendItemStyleProps) => ({
    color: props.color ? props.color : 'white',
    backgroundColor: props.backgroundColor
  })
);

const Legend = (props: Props) =>
  <LegendContainer length={ props.legendData.length } visible={ props.visible }>
    <Intro step={ 4 } intro={ howTo.globalPicture.legend }>
      <Div>
        <Header as="h3">{ props.title }</Header>
        <P justifyContent="center">{ props.description }</P>
      </Div>
      <Div>
        <Ul display={ 'inline-block' } padding={ 0 }>
          { props.legendData.map(item =>
            (<LegendKey key={ item.backgroundColor } { ...item }>
              { item.label }
            </LegendKey>)
          ) }
        </Ul>
      </Div>
    </Intro>
  </LegendContainer>;

export default Legend;
