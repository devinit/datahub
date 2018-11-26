import * as React from 'react';
import { Div, H1 } from 'glamorous';
import { Icon } from 'semantic-ui-react';
import { Router, router } from '../../../../utils';
import { Input, InputContainer, List } from '../../../atoms/SearchInput';
import { SingletonRouter } from 'next/router';
import { LinkState } from 'next/link';

// const Router = process.env.npm_package_config_IS_NEXT_APP  ? require('next/router') : router;

// const Link = process.env.npm_package_config_IS_NEXT_APP ? require('next/link') : null;

export interface Entity {
  slug: string;
  name: string;
}

export interface Props {
  entities: Entity[];
  routePath: string;
  router?: SingletonRouter;
  nextLink?: React.ComponentClass<LinkState>;
  placeholder: string;
  profile: boolean; // whether appears on a country profile page or on the front landing page
  visible: boolean;
  onSelected?: (slug: any) => void;
}

export interface State {
  selected: number;
  entities: Entity[];
  showList: boolean;
  value: string;
}

class SearchInput extends React.Component <Props, State> {
  public onBlurTimer: any;
  public textInput?: HTMLInputElement;
  public router: Router;

  constructor(props: Props) {
    super(props);
    if (!props.entities || !props.entities.length) {
      throw new Error('entities data prop mixing');
    }
    this.state = {
      selected: -1,
      entities: props.entities,
      value: '',
      showList: false
    };
    this.router = this.props.router ? this.props.router : router;
  }

  public onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        if (selected !== 0) { selected -= 1; }
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

  public onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ value });
    const filteredCountries: Entity[] = this.props.entities.filter((country: Entity) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredCountries.length) {
      this.setState({ entities: filteredCountries });
    }
  }

  public onBlur = () => {
    if (this.setState) {
      this.onBlurTimer = setTimeout(() => {
        this.resetState();
      }, 200);
    }
  }

  public onCaretDownClick = () => {
    this.resetState();
    this.setState({ showList: true });
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  public onSubmit = () => {
    const country: Entity | void = this.state.entities[0] || null;
    if (!country) { return false; }
    // reset state
    this.resetState();
    if (this.textInput) {
      this.textInput.blur();
    }
    if (this.props.onSelected) { return this.props.onSelected(country.slug); }

    return this.router
      .push(`/${this.props.routePath}?id=${country.slug}`, `/${this.props.routePath}/${country.slug}`);
  }

  public resetState() {
    this.setState({
      value: '',
      showList: false,
      selected: -1,
      entities: this.props.entities
    });
    if (this.onBlurTimer) { clearTimeout(this.onBlurTimer); }
  }

  public componentWillReceive(props: Props) {
    this.setState({ entities: props.entities });
  }

  // tslint:disable jsx-no-lambda
  public render() {
    return (
      <Div>
        <InputContainer
          visible={ this.props.visible }
          profile={ this.props.profile }
          height={ this.props.profile ? '5em' : '10em' }
        >
          { this.props.profile
            ? <H1 textTransform="capitalize" backgroundColor={ this.state.showList ? 'white' : 'none' }>
              { this.props.placeholder }
              <Icon name="caret down" onClick={ this.onCaretDownClick } />
            </H1>
            : '' }
          <Input
            value={ this.state.value }
            data-cy="Search__Input"
            placeholder={ this.props.profile ? '' : this.props.placeholder }
            onBlur={ this.onBlur }
            innerRef={ (input: HTMLInputElement) => { this.textInput = input; } }
            onFocus={ () => this.setState({ showList: true }) }
            onChange={ this.onChange }
            onKeyDown={ this.onKeyDown }
          />
        </InputContainer>
        <Div position="relative" visibility={ this.state.showList ? 'visible' : 'hidden' }>
          <List>
            { this.renderCountryList() }
          </List>
        </Div>
      </Div>
    );
  }

  private renderCountryList = () => {
    if (this.state.entities) {
      return this.state.entities.map(this.renderCountryListItem);
    }

    return <li>country list is not available</li>;
  }

  private renderCountryListItem = (country: Entity, index: number) => {
    const className = this.state.selected === index ? 'active' : 'not-active';

    return (
      <li key={ country.slug } className={ className }>
        { this.renderCountryLink(country) }
      </li>
    );
  }

  private renderCountryLink({ name, slug }: Entity) {
    const { nextLink: NextLink, routePath } = this.props;

    if (NextLink) {
      return (
        <NextLink href={ `/${routePath}?id=${slug}` } as={ `/${routePath}/${slug}` }>
          <a role="link">{ name }</a>
        </NextLink>
      );
    }

    return (
      <a href={ `/${this.props.routePath}/${slug}` }>
        { name }
      </a>
    );
  }
}

export default SearchInput;
