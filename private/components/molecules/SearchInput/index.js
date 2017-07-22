// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import {SocialMediaLink} from 'components/atoms/Link';
import {Input, InputContainer} from '../../atoms/SearchInput/input';
import {List} from 'components/atoms/SearchInput/list';

type Country ={
  id: string,
  name: string
}
type Props = {
  countries: Country[],
  placeholder: string,
  loading: boolean,
  visible: boolean,
  onSelected?: (any) => void
};
type State = {
  selected: number,
  countries: Country[],
  value: string
}
const Wrapper = glamorous.div({
  position: 'relative',
});

class SearchInput extends React.Component {
  constructor(props: Props) {
    super(props);
    if (!props.countries || !props.countries.length) throw new Error('countries data prop mixing');
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
    const keyCode = e.keyCode;
    switch (keyCode) {
      case 40: {
        if ((selected + 1) < countries.length) {
          selected += 1;
        }
        break;
      }
      case 38: {
        if (selected !== 0) {
          selected -= 1;
        }
        break;
      }
      case 13: {
        if (selected !== -1) {
          this.onSubmit(countries[selected]);
        }
        break;
      }
      default: {
        selected = -1;
        break;
      }
    }
    this.setState({selected});
  }
  onChange(text: string) {
    this.setState({value: text});
    const filteredCountries: Country[] = this.props.countries
      .filter((country: Country) => country.name.toLowerCase().includes(text.toLowerCase()));
    if (filteredCountries.length) this.setState({countries: filteredCountries});
  }
  onSubmit(value: Object) {
    this.setState({value: value.name});
    if (this.props.onSelected) {
      this.props.onSelected(value);
    }
  }
  componentWillReceive(props: Props) {
    this.setState({countries: props.countries});
  }
  render() {
    if (this.props.loading) return (<p> loading ...</p>);
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
              { this.state.countries ?
                  this.state.countries
                  .map((country, i) =>
                    (<li key={country.id} className={this.state.selected === i ? 'active' : false}>
                      {country.name}
                    </li>))
                    : <li> Error getting countries </li>
              }
            </List>
          </Wrapper>
        </Container>
      </InputContainer>
    );
  }
}
export default SearchInput;
