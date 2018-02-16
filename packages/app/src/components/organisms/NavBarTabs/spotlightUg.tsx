import * as React from 'react';
import { changeSpotlightIndicatorUg, changeLoadingStatus, SpotLightlIndicatorUg,
  LoadingStatus} from '../../../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { } from '@devinit/dh-base/lib/actions';
import { State, Action } from '../../../redux/reducers';
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

type SpotlightUgProps = Props<SpotLightlIndicatorUg,  LoadingStatus> & {state?: StateToShare}
  & BoundAction<SpotLightlIndicatorUg>;


const spotlightNavBarTabs: React.SFC<SpotlightUgProps> = (props) => {
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
