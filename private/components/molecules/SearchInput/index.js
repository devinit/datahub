// @flow
import React from 'react';
import glamorous, {Div} from 'glamorous';
import {Container} from 'semantic-ui-react';
import {SocialMediaLink} from 'components/atoms/Link';
import Link from 'next/link';
import {List} from 'components/atoms/SearchInput/list';
import {Input, InputContainer} from '../../atoms/SearchInput/input';


type Country ={
  id: string,
  name: string
}
export type Props = {
  countries: Country[],
  placeholder: string,
  visible: boolean,
  onSelected?: (any) => void
};
type State = {
  selected: number,
  countries: Country[],
  value: string
}

class SearchInput extends React.Component {
  // static onClickHandler(event: any, country: Country): void {
  //   event.preventDefault();
  //   const state = Router
  //     .prefetch(`/country/${country.id}`).then(obj => {
  //       console.log('prefetched', obj);
  //       Router.push(`/country/${country.id}`);
  //     }).catch((error) => console.error('router error', error));
  // }
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
      case 40: { // down arrow
        if ((selected + 1) < countries.length) {
          selected += 1;
        }
        break;
      }
      case 38: { // up arrow
        if (selected !== 0) {
          selected -= 1;
        }
        break;
      }
      case 13: { // enter key code
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
    console.log('on submit');
    this.setState({value: value.name});
    if (this.props.onSelected) {
      this.props.onSelected(value);
    } else {
      // Router.push(`/country/${value.id}`);
    }
  }
  componentWillReceive(props: Props) {
    this.setState({countries: props.countries});
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
            // onChange={(e) => this.onChange(e.target.value)}
            // onKeyDown={(e) => this.onKeyDown(e)}
          />
          <Div position="relative">
            <List >
              { this.state.countries ?
                  this.state.countries
                  .map((country, i) =>
                    (<li
                      key={country.id}
                      className={this.state.selected === i ? 'active' : false}
                    >
                      <Link href={`/country?id=${country.id}`} as={`/country/${country.id}`}><a>{country.name}</a></Link>
                    </li>))
                    : <li> Error getting countries </li>
              }
            </List>
          </Div>
        </Container>
      </InputContainer>
    );
  }
}
export default SearchInput;
