import * as React from 'react';
import { Div, H1} from 'glamorous';
import { Icon } from 'semantic-ui-react';
import {router, IRouter} from '../../../../utils';
import { Input, InputContainer, List } from '../../../atoms/SearchInput';
import {SingletonRouter} from 'next/router';
import {LinkState} from 'next/link';

// const Router = process.env.npm_package_config_IS_NEXT_APP  ? require('next/router') : router;

// const Link = process.env.npm_package_config_IS_NEXT_APP ? require('next/link') : null;

export interface Entity  {
  slug: string;
  name: string;
}

export interface Props  {
  entities: Entity[];
  routePath: string;
  router?: SingletonRouter;
  nextLink?: React.ComponentClass<LinkState>;
  placeholder: string;
  profile: boolean; // whether appears on a country profile page or on the front landing page
  visible: boolean;
  onSelected?: (any) => void;
}

export interface State  {
  selected: number;
  entities: Entity[];
  showList: boolean;
  value: string;
}

class SearchInput extends React.Component <Props, State> {
  public onBlurTimer: any;
  public textInput: HTMLInputElement;
  public router: IRouter;
  constructor(props: Props) {
    super(props);
    if (!props.entities || !props.entities.length) throw new Error('entities data prop mixing');
    this.state = {
      selected: -1,
      entities: props.entities,
      value: '',
      showList: false,
    };
    this.router = this.props.router ? this.props.router : router;
  }
  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    let { selected } = this.state;
    const { entities } = this.state;
    const keyCode = e.keyCode;
    switch (keyCode) {
      case 40: {
        // down arrow
        if (selected + 1 < entities.length) {
          selected += 1;
        }
        break;
      }
      case 38: {
        // up arrow
        if (selected !== 0) selected -= 1;
        break;
      }
      case 13: {
        // enter key code
        this.onSubmit();
        break;
      }
      default: {
        selected = -1;
        break;
      }
    }
    this.setState({ selected });
  }
  public onChange(text: string) {
    this.setState({ value: text });
    const filteredCountries: Entity[] = this.props.entities.filter((country: Entity) =>
      country.name.toLowerCase().includes(text.toLowerCase()),
    );
    if (filteredCountries.length) this.setState({ entities: filteredCountries });
  }
  public onBlur() {
    if (this.setState) {
      this.onBlurTimer = setTimeout(() => {
        this.resetState();
      }, 200);
    }
  }
  public onCaretDownClick() {
    this.resetState();
    this.setState({showList: true});
    this.textInput.focus();
  }
  public onSubmit() {
    const country: Entity | void = this.state.entities[0] || null;
    if (!country) return false;
    // reset state
    this.resetState();
    this.textInput.blur();
    if (this.props.onSelected) return this.props.onSelected(country.slug);
    return this.router
      .push(`/${this.props.routePath}?id=${country.slug}`, `/${this.props.routePath}/${country.slug}`);
  }
  public resetState() {
    this.setState({
      value: '',
      showList: false,
      selected: -1,
      entities: this.props.entities,
    });
    if (this.onBlurTimer) clearTimeout(this.onBlurTimer);
  }
  public componentWillReceive(props: Props) {
    this.setState({ entities: props.entities });
  }
  public render() {
    return (
      <Div>
        <InputContainer
          visible={this.props.visible}
          profile={this.props.profile}
          height={this.props.profile ? '5em' : '10em'}
        >
          {this.props.profile
            ? <H1 textTransform="capitalize" backgroundColor={this.state.showList ? 'white' : 'none'}>
              {this.props.placeholder}
              <Icon name="caret down" onClick={this.onCaretDownClick} />
            </H1>
            : ''}
          <Input
            value={this.state.value}
            placeholder={this.props.profile ? '' : this.props.placeholder}
            onBlur={this.onBlur}
            // tslint:disable-next-line:jsx-no-lambda
            innerRef={input => { this.textInput = input; }}
            // tslint:disable-next-line:jsx-no-lambda
            onFocus={() => this.setState({ showList: true })}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange(e.target.value)}
            onKeyDown={this.onKeyDown}
          />
        </InputContainer>
        <Div position="relative" visibility={this.state.showList ? 'visible' : 'hidden'}>
          <List>
            {this.state.entities
              ? this.state.entities.map((country, i) =>
                (<li key={country.slug} className={this.state.selected === i ? 'active' : 'not-active'}>
                  {this.props.nextLink ?
                      <this.props.nextLink
                        href={`/${this.props.routePath}?id=${country.slug}`}
                        as={`/${this.props.routePath}/${country.slug}`}
                      >
                        <a role="link">
                          {country.name}
                        </a>
                      </this.props.nextLink> :
                      <a href={`/${this.props.routePath}?id=${country.slug}`}>
                       {country.name}
                      </a>
                  }
                </li>),
              )
              : <li>country list is not available</li>}
          </List>
        </Div>
      </Div>
    );
  }
}
export default SearchInput;
