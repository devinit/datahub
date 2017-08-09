// @flow
import React from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import glamorous from 'glamorous';
import {red} from 'components/theme/semantic';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};
const Wrapper = glamorous.div({
  width: '440px',
  top: '30px',
  opacity: '0.9',
  left: '415px',
  zIndex: '300!important',
  border: '1px solid #e4e4e4',
  position: 'absolute',
  fontSize: '.9rem',
  backgroundColor: '#fff',
  color: '#666',
  borderRadius: '3px',
  padding: '10px'
});
const FloatLeft = glamorous.div({
  float: 'left',
  width: '172px',
  '& a': {
    color: red,
  }
});

const Annotation = ({ onChange, options }: Props) => (
  <Wrapper>
    <Header as="h5">
      Since 2000, when the Millennium Development Goals were agreed, the domestic public
      resources available to many countries have grown and extreme poverty rates have fallen.
    </Header>
    <p>
      Poverty rates in Far East Asia have fallen rapidly and domestic public resources are
      growing fast. Yet in sub-Saharan Africa the story is more mixed; domestic public resources
      remain scarce and poverty rates, although falling slowly in some countries are
      actually rising in others.
    </p>
    <FloatLeft>
      <p>
        <a href="">Click the years to see how countries have progressed</a>
      </p>
    </FloatLeft>
    <FloatLeft>
      <Button.Group>
        <Button>2000</Button>
        <Button>latest <Icon name="info circle" /></Button>
      </Button.Group>
    </FloatLeft>
  </Wrapper>
);

export default Annotation;
