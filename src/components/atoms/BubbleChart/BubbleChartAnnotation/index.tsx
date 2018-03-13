
import * as React from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { red } from '../../../theme/semantic';
import pageData from '../../../pageData/data';

// type Props = {
//   onChange?: (value: string | void) => void,
//   options?: Array<Object>
// };
const Wrapper = glamorous.div({
  opacity: 0.9,
  zIndex: 1000,
  border: '1px solid #e4e4e4',
  fontSize: '.9rem',
  backgroundColor: '#fff',
  color: '#666',
  borderRadius: '3px',
  padding: '10px',
  overflow: 'hidden',
});

const FloatLeft = glamorous.div({
  'float': 'left',
  'width': '172px',
  '& a': {
    color: red,
  },
});

const Annotation = () =>
  (<Wrapper>
    <Header as="h5">
     {pageData.bubbleChart[0].narrative}
    </Header>
    <p>
     {pageData.bubbleChart[1].narrative}
    </p>
    <FloatLeft>
      <p>
        <a href="">{pageData.bubbleChart[2].narrative}</a>
      </p>
    </FloatLeft>
    <FloatLeft>
      <Button.Group>
        <Button>2000</Button>
        <Button>
          latest <Icon name="info circle" />
        </Button>
      </Button.Group>
    </FloatLeft>
  </Wrapper>);

export default Annotation;
