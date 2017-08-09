// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { white, black } from 'components/theme/semantic';
import { big } from 'components/theme';

type Props = {
  children: any,
};
type State = {
  showInput: boolean,
};
const SearchTitle = glamorous.div({
  backgroundColor: black,
  fontSize: big,
  textAlign: 'center',
  color: white,
  fontWeight: '700',
  paddingTop: '1em',
  paddingBottom: '1em',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

class Search extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      showInput: false,
    };
  }
  state: State;
  showInput = () => {
    this.state.showInput ? this.setState({ showInput: false }) : this.setState({ showInput: true });
  };

  render() {
    return (
      <div>
        <SearchTitle>
          <Container>
            <h2>
              Explore by
              <span onClick={this.showInput} className="clickable" role="button">
                {' '}country
              </span>
            </h2>
          </Container>
        </SearchTitle>
        {React.cloneElement(this.props.children, { visible: this.state.showInput })}
      </div>
    );
  }
}

export default Search;
