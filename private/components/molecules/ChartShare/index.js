import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ChartShare = () => (
  <Modal trigger={<Button>Show Modal</Button>} closeIcon='close'>
    <Modal.Content>
      <Modal.Description>

        <h5>Share this Visualization</h5>
          <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ChartShare;

