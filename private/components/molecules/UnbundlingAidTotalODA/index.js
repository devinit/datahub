// @flow
import React from 'react';
import glamorous from 'glamorous';
import { white, primaryColor, black } from 'components/theme/semantic';
import { Header, Button } from 'semantic-ui-react';

type Props = {
  onClickHandler: () => void,
  yearTotal: { year: number, total: number},
  aidType: string
}
const ParentContainer = glamorous.div({
  height: '36em',
  padding: '1em',
});
const Container = glamorous.div({
  position: 'absolute',
  zIndex: '2',
  height: '36em',
  backgroundColor: primaryColor,
  width: '100%',
  paddingTop: '8em',
  opacity: 1,
  transition: 'all ease-in .25s',
  display: 'block',
  textAlign: 'center',
  '& h1.ui.header': {
    fontSize: '4em',
  },
  '& h5.ui.header': {
    fontSize: '1.2rem',
    margin: '.06em 0',
    marginBottom: '1.5em',
  },
  '& h1.ui.header span.red': {
    color: black,
    opacity: 0.6,
  },
  '& h1.ui.header span.small': {
    fontSize: '.5em',
  },
  '& .ui.header': {
    color: white,
  },
  '& .ui.white.button': {
    color: black,
  },
});

const UnbundlingAidTotalODA = (props: Props) =>
  (<ParentContainer>
    <div style={{ position: 'relative' }}>
      <Container>
        <Header as="h1">
          <span className="red"> {props.yearTotal.year}</span> US$ {props.yearTotal.total}
        </Header>
        <Header as="h5">
          {
            props.aidType === 'oda' ?
              'Official development assistance (total gross disbursements, 2015 prices)'
              :
              'Total other official flows (non export credit) (total gross disbursements, 2015 prices)'
          }
        </Header>
        <Button onClick={() => props.onClickHandler()}>Explore</Button>
      </Container>
    </div>
  </ParentContainer>);

export default UnbundlingAidTotalODA;
