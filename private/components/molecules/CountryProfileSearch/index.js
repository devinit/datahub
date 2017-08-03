// @flow
import React from 'react';
import CountrySeachInput from 'components/organisms/CountrySearchInput';
import {Icon, Header} from 'semantic-ui-react';
import glamorous from 'glamorous';

type State = {
  showSearch: boolean
}
type Props = {
  country: string
}
const TitleWrapper = glamorous.div({
  '& i': {
    fontSize: '1em !important',
    marginTop: '-0.39em',
  }
});

class CountryProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }
  state: State;
  props: Props;
  renderCountry() {
    return (
      <TitleWrapper
        onClick ={() => this.setState({showSearch: true})}
      >
        <Header as="h1">
          {this.props.country}
          <Icon name="caret down" />
        </Header>
      </TitleWrapper>
    );
  }
  render() {
    return (
      <div>
        {this.state.showSearch ? <CountrySeachInput visible /> : this.renderCountry()}
      </div>
    );
  }
}

export default CountryProfileSearch;
