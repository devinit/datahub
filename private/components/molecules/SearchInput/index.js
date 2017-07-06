// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import {SocialMediaLink} from 'components/atoms/Link';
import {Input, InputContainer} from '../../atoms/SearchInput/input';
import {List} from '../../atoms/SearchInput/list';

type Props = {
  countries: [Object],
  placeholder: string,
  visible: boolean,
};
type State = {
  selected: number,
  countries: [Object],
}
const Wrapper = glamorous.div({
  position: 'relative',
});

class SearchInput extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: -1,
      countries: props.countries,
    };
  }
  state: State;
  onKeyDown(e: Object) {
    let {selected} = this.state;
    const {countries} = this.state;
    if (e.keyCode === 40) {
      if ((selected + 1) < countries.length) {
        selected += 1;
      }
    } else if (e.keyCode === 38) {
      if (selected !== 0) {
        selected -= 1;
      }
    } else {
      selected = -1;
    }
    console.log('selected', selected);
    this.setState({selected});
  }
  render() {
    return (
      <InputContainer
        visible={this.props.visible}
      >
        <Container>
          <Input
            placeholder={this.props.placeholder}
            onKeyDown={(e) => this.onKeyDown(e)}
          />
          <Wrapper
            className="list"
          >
            <List >
              {this.props.countries.map((country, i) => <li key={country.id} className={this.state.selected === i ? 'active' : false}>{country.name}</li>)}
            </List>
          </Wrapper>
        </Container>
      </InputContainer>
    );
  }
}
export default SearchInput;
