import * as React from 'react';
import { Container } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { white, lightBlack } from '../../../theme/semantic';
import data from '@devinit/dh-base/lib/__generated__/data';
import SearchInput from '../Basic';
import {SingletonRouter} from 'next/router';
import {LinkState} from 'next/link';
import { big } from '../../../theme';

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
    cursor: 'pointer',
  },
});

class Search extends React.Component<Props> {
  public state: State = {showInput: false};

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
              <span onClick={this.showInput} className="clickable" role="button">
                {' '}country
              </span>
            </h2>
          </Container>
        </SearchTitle>
        <SearchInput
          nextLink={this.props.nextLink}
          router={this.props.router}
          entities={data.countries}
          routePath={'country'} // for route
          visible={false}
          profile={false}
          placeholder={'Type a country name...'}
        />
      </div>
    );
  }
}

export default Search;
