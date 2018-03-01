import * as React from 'react';
import { changeSpotlightIndicatorKe, changeLoadingStatus,
  SpotLightlIndicatorKe,  LoadingStatus} from '../../../redux/actions';
import { bindActionCreators, Dispatch, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { Props } from '../../molecules/NavigationBarTabs';
import { State} from '../../../redux/reducers';
import NavigationBarTabs from '../../molecules/NavigationBarTabs';
import {StateToShare} from '../../molecules/ChartShare';
import {BoundAction, BoundState} from './types';
import data from './kenya';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction<SpotLightlIndicatorKe> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorKe, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

export type SpotlightKeProps = Props<SpotLightlIndicatorKe,  LoadingStatus> & {state?: StateToShare}
  & BoundAction<SpotLightlIndicatorKe>;

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorKenya, loading: app.loading });

// TODO: fix types
const spotlightNavBarTabs: React.SFC<any> = (props) => {
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
