import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import {
  LoadingStatus,
  SpotLightlIndicatorUg,
  changeLoadingStatus,
  changeSpotlightIndicatorUg } from '../../../redux/actions';
import { State } from '../../../redux/reducers';
import { StateToShare } from '../../molecules/ChartShare';
import NavigationBarTabs, { Props } from '../../molecules/NavigationBarTabs';
import { BoundAction, BoundState } from './types';
import data from './uganda';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction<SpotLightlIndicatorUg> =>
({
  changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorUg, dispatch),
  changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
});

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorUganda, loading: app.loading });

export type SpotlightUgProps = Props<SpotLightlIndicatorUg, LoadingStatus> & { state?: StateToShare }
  & BoundAction<SpotLightlIndicatorUg>;

// TODO: fix types
class SpotlightNavBarTabs extends React.Component<SpotlightUgProps> {
  componentDidMount() {
    const { state } = this.props;
    if (state && state.indicator && this.props.activeIndicator !== state.indicator) {
      this.props.changeActiveIndicator(state.indicator);
    }
  }

  render() {
    return (
      <NavigationBarTabs
        navBarItems={ data.spotlightThemes }
        showUsingThisViz
        isForSpotlightsUg
        loading={ this.props.loading }
        changeActiveIndicator={ this.props.changeActiveIndicator }
        changeLoadingStatus={ this.props.changeLoadingStatus }
        activeIndicator={ this.props.activeIndicator }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightNavBarTabs) as any;
