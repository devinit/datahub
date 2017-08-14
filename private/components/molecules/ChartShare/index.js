// @flow
import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { white, black} from 'components/theme/semantic';
import glamorous, { Div, Span } from 'glamorous';

const Container = glamorous.div({
  padding: '5em',
  '& input.link': {
    display: 'inline-block',
    width: '100%',
    marginTop: '2em',
    height: '3em',
    padding: '.5em 1.5em',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: black,
    backgroundColor: white,
    boxSizing: 'border-box',
    borderRadius: '.25em',
    outline: 0,
    border: `2px solid ${black}`,
  },
});

type Props = {
  size: string,
  color: string,
  backgroundColor?: string,
  label?: string,
  className?: string
};

const ChartShare = ({className, size, color, label }: Props) =>
  (<Modal
    trigger={
      <Button className={className} size={size} color={color}>
        <Icon name="share alternate" />
        <Span fontSize={'1.2em'}>{label || 'Share'}</Span>
      </Button>
    }
    closeIcon="close"
  >
    <Modal.Content>
      <Modal.Description>
        <Container>
          <h4>Share this Visualization</h4>
          <input type="radio" value="default" /> in default view <br />
          <input type="radio" value="default" /> as I configured it<br />
          <input className="link" />
          <Div marginTop={'1.5em'}>
            <Button icon="facebook f" />
            <Button icon="twitter" />
            <Button icon="mail outline" />
          </Div>
        </Container>
      </Modal.Description>
    </Modal.Content>
  </Modal>);

export default ChartShare;
