import * as React from 'react';
import { Container } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { lightBlack, white } from '../../../theme/semantic';
import data from '../global';
import SearchInput from '../Basic';
import { SingletonRouter } from 'next/router';
import { LinkState } from 'next/link';
import { big } from '../../../theme';
import ErrorBoundary from '../../ErrorBoundary';

export interface State  {
  showInput: boolean;
}
export interface Props {
  router?: SingletonRouter;
  nextLink?: React.ComponentClass<LinkState>;
}
const SearchTitle = glamorous.div({
  'backgroundColor': lightBlack,
  'fontSize': big,
  'textAlign': 'center',
  'color': white,
  'fontWeight': 700,
  'paddingTop': '1em',
  'paddingBottom': '1em',
  '& .clickable': {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
});

class Search extends React.Component<Props> {
  public state: State = { showInput: false };

  constructor(props) {
    super(props);
  }

  public showInput = () => {
    this.state.showInput ? this.setState({ showInput: false }) : this.setState({ showInput: true });
  }

  public render() {
    return (
      <div>
        <SearchTitle>
          <Container>
            <h2>
              Explore by
              <span onClick={ this.showInput } className="clickable" role="button">
                { ' ' }country
              </span>
            </h2>
          </Container>
        </SearchTitle>
        <ErrorBoundary>
        <SearchInput
          nextLink={ this.props.nextLink }
          router={ this.props.router }
          entities={ data.countries }
          routePath={ 'country' } // for route
          visible={ this.state.showInput }
          profile={ false }
          placeholder={ 'Type a country name...' }
        />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Search;
