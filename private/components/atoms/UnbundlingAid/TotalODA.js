import React from 'react';
import glamorous from 'glamorous';
import { white, red, primaryColor, black, redHeaderColor} from 'components/theme/semantic';
import { Header, Button } from 'semantic-ui-react';

const ParentContainer = glamorous.div({
  height: '32em',
  padding: '1em',
});
const Container = glamorous.div({
  position: 'absolute',
  zIndex: '2',
  height: '30em',
  backgroundColor: primaryColor,
  width: '100%',
  paddingTop: '8em',
  opacity: 1,
  transition: 'all ease-in .25s',
  display: 'block',
  textAlign: 'center',
  '& h1.ui.header': {
    fontSize: '4em'
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
    fontSize: '.5em'
  },
  '& .ui.header': {
    color: white,
  },
  '& .ui.white.button': {
    color: black,
  }
});

const InteractiveChartToolBar = () => (
  <ParentContainer>
    <div style={{position: 'relative'}}>
      <Container>
        <Header as="h1"><span className="red"> 2015</span> US$ 174.1 <span className="small">bn</span></Header>
        <Header as="h5">Official development assistance (total gross disbursements, 2015 prices)</Header>
        <Button color="white">Explore</Button>
      </Container>
    </div>
  </ParentContainer>
);

export default InteractiveChartToolBar;
