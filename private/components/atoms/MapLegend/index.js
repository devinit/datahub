// @flow
import {Container, Grid, Header} from 'semantic-ui-react';
import glamorous, {P, Div, Ul} from 'glamorous';
import React from 'react';


export type LegendField = {|
    label: ?string,
    color: ?string,
    backgroundColor: ?string,
|}

type Props = {
  title: string,
  description: string,
  legendData: Array<LegendField>
}

type LegendItemStyleProps = {
  color?: string,
  backgroundColor: string,
}
type LegendItemProps = LegendItemStyleProps & {
  rangeLabel: string
}
const LegendContainer = glamorous.div({
  position: 'absolute',
  left: '2%',
  width: '18%',
  display: 'flex',
  flexDirection: 'column'
},
(props) => ({
  top: props.length ? `${(110 / props.length)}%` : '25%'
}));

const LegendKey = glamorous.li({
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
const pStyles = {
  textAlign: 'center'
};

const legend = (props: Props) => (
  <LegendContainer length={props.legendData.length}>
    <Div>
      <Header as="h3">{props.title}</Header>
      <P justifyContent="center">{props.description}</P>
    </Div>
    <Div>
      <Ul display={'inline-block'} padding={0}>
        {props.legendData
          .map(item => (<LegendKey key={item.label} {...item}>{item.label}</LegendKey>))}
      </Ul>
    </Div>
  </LegendContainer>
);

export default legend;
