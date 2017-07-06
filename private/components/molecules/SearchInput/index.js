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
  onSelected?: (any) => void
};
type State = {
  selected: number,
  countries: [Object],
  value: string
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
      value: '',
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
    } else if (e.keyCode === 13) {
      if (selected !== -1) {
        this.onSubmit(countries[selected]);
      }
    } else {
      selected = -1;
    }
    this.setState({selected});
  }
  onChange(text: string) {
    this.setState({value: text});
    const countries = this.props.countries
      .filter(country =>
        country.name.toLowerCase().includes(text.toLowerCase()));
    /* eslint-disable flowtype-errors/show-errors */
    this.setState({countries});
  }
  onSubmit(value: Object) {
    this.setState({value: value.name});
    if (this.props.onSelected) {
      this.props.onSelected(value);
    }
  }
  render() {
    return (
      <InputContainer
        visible={this.props.visible}
      >
        <Container>
          <Input
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={(e) => this.onChange(e.target.value)}
            onKeyDown={(e) => this.onKeyDown(e)}
          />
          <Wrapper
            className="list"
          >
            <List >
              {this.state.countries.map((country, i) => <li key={country.id} className={this.state.selected === i ? 'active' : false}>{country.name}</li>)}
            </List>
          </Wrapper>
        </Container>
      </InputContainer>
    );
  }
}
export default SearchInput;
