// @flow
import React from 'react';
import { changeSpotlightIndicatorUg, changeLoadingStatus} from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { SpotLightlIndicatorUg} from 'lib/actions';
import type { State, Action } from 'lib/reducers';
import type { Props } from 'components/molecules/NavigationBarTabs';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {StateToShare} from 'components/molecules/ChartShare';
import type {BoundAction, BoundState} from './types';
import data from './uganda';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<SpotLightlIndicatorUg> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorUg, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorUganda, loading: app.loading });

type SpotlightProps<T> =
  Props<T> & {
      state?: StateToShare,
      ...BoundState
  };

const spotlightNavBarTabs = (props: SpotlightProps<SpotLightlIndicatorUg>) => {
  return (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    showUsingThisViz
    isForSpotlights
    loading={props.loading}
    changeActiveIndicator={props.changeActiveIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);
};

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
