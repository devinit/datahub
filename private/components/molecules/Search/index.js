import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import theme from 'components/theme';
import SearchInput from '../SearchInput';

const SearchTitle = glamorous.div({
  backgroundColor: theme.black,
  fontSize: theme.big,
  textAlign: 'center',
  color: theme.plainWhite,
  fontWeight: '700',
  paddingTop: '1em',
  paddingBottom: '1em',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
  }

  showInput = () => {
    if (this.state.showInput) {
      this.setState({showInput: false});
    } else {
      this.setState({showInput: true});
    }
  }

  render() {
    return (<div>
      <SearchTitle>
        <Container>
          <h2>Explore by
            <span
              onClick={this.showInput}
              className="clickable"
              role="button"
            > country
            </span>
          </h2>
        </Container>
      </SearchTitle>
      <SearchInput
        visible={this.state.showInput}
        countries={['Test']}
        placeholder="Type Your Country Name"
      />
    </div>);
  }
}

export default Search;
