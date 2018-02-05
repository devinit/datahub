// @flow
import * as React from 'react';
import { changeSpotlightIndicatorUg, changeLoadingStatus} from '@devinit/dh-base/lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SpotLightlIndicatorUg} from '@devinit/dh-base/lib/actions';
import { State, Action } from '@devinit/dh-base/lib/reducers';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {BoundAction, BoundState} from './types';
import data from './uganda';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<SpotLightlIndicatorUg> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorUg, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorUganda, loading: app.loading });

interface SpotlightProps<T> 
  Props<T> & {
      state?: StateToShare;
      ...BoundState;
  }

const spotlightNavBarTabs = (props: SpotlightProps<SpotLightlIndicatorUg>) => {
  return (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    showUsingThisViz
    isForSpotlightsUg
    loading={props.loading}
    changeActiveIndicator={props.changeActiveIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);
};

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
