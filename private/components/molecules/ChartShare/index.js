import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import glamorous from 'glamorous';
import {Container} from '../../atoms/ChartShare';

export const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em',
});

const ChartShare = () => (
  <Modal
    trigger={
      <Button size="big" secondary>
        <Icon name="share alternate" />Share Chart</Button>}
    closeIcon="close"
  >
    <Modal.Content>
      <Modal.Description>
        <Container>
          <h4>Share this Visualization</h4>
          <input type="radio"value="default" /> in default view <br />
          <input type="radio"value="default" />  as I configured it<br />
          <input className="link" />
          <SocialIconsContainer>
            <Button icon="facebook f" />
            <Button icon="twitter" />
            <Button icon="mail outline" />
          </SocialIconsContainer>
        </Container>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ChartShare;

