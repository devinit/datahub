import React from 'react';
import {Container} from 'semantic-ui-react';
import SearchInput from '../SearchInput';
import {SearchTitle} from '../../atoms/SearchInput';

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
  };

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
        countries={[{name: 'Uganda', id: 1}, {name: 'Kenya', id: 2}, {name: 'Tanzania', id: 3}]}
        placeholder="Type Your Country Name"
      />
    </div>);
  }
}

export default Search;
