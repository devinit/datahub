import React from 'react';
import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import theme from 'components/theme';

const SearchTitle = glamorous.div({
  backgroundColor: theme.black,
  fontSize: theme.big,
  textAlign: 'center',
  color: theme.plainWhite,
  fontWeight: '700',
  paddingTop: '24px',
  paddingBottom: '24px',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

class Search extends React.Component {
  componentWillMount() {
  }

  render() {
    return (<div>
      <SearchTitle>
        <Container>
          <h2>Explore by <span className="clickable">country</span> </h2>
        </Container>
      </SearchTitle>
    </div>);
  }
}

export default Search;
