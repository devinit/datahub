import React from 'react';
import glamorous from 'glamorous';
import {Container, Grid} from 'semantic-ui-react';
import theme from 'components/theme';

const SearchTitle = glamorous.div({
  backgroundColor: theme.black,
  fontSize: theme.big,
  textAlign: 'center',
  color: theme.plainWhite,
});
class Search extends React.Component {
  componentWillMount() {
  }
  render() {
    return (<div>
      <Container>
        <SearchTitle>
          <span>Explore by <span className="clickable">country</span> </span>
        </SearchTitle>

      </Container>
    </div>);
  }
}

export default Search;
