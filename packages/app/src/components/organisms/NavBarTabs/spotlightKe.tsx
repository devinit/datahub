// @flow
import * as React from 'react';
import { changeSpotlightIndicatorKe, changeLoadingStatus} from '@devinit/dh-base/lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SpotLightlIndicatorKe} from '@devinit/dh-base/lib/actions';
import { State, Action } from '@devinit/dh-base/lib/reducers';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {BoundAction, BoundState} from './types';
import data from './kenya';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<SpotLightlIndicatorKe> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorKe, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorKenya, loading: app.loading });

interface SpotlightProps<T>
  Props<T> & {
      state?: StateToShare;
      ...BoundState;
  }

const spotlightNavBarTabs = (props: SpotlightProps<SpotLightlIndicatorKe>) => {
  return (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    showUsingThisViz
    loading={props.loading}
    isForSpotlightsKe
    changeActiveIndicator={props.changeActiveIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);
};

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
