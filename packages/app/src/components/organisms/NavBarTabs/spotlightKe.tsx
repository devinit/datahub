import * as React from 'react';
import { changeSpotlightIndicatorKe, changeLoadingStatus,
  SpotLightlIndicatorKe,  LoadingStatus} from '../../../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import { State, Action } from '../../../redux/reducers';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {BoundAction, BoundState} from './types';
import data from './kenya';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<SpotLightlIndicatorKe> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorKe, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

type SpotlightKeProps = Props<SpotLightlIndicatorKe,  LoadingStatus> & {state?: StateToShare}
  & BoundAction<SpotLightlIndicatorKe>;

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorKenya, loading: app.loading });

const spotlightNavBarTabs: React.SFC<SpotlightKeProps> = (props) => {
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
