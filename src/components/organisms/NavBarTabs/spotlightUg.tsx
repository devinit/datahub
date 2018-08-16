import { State } from '../../../redux/reducers';
import * as React from 'react';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoadingStatus, SpotLightlIndicatorUg, changeLoadingStatus,
  changeSpotlightIndicatorUg } from '../../../redux/actions';
import NavigationBarTabs, { Props } from '../../molecules/NavigationBarTabs';
import { StateToShare } from '../../molecules/ChartShare';
import { BoundAction, BoundState } from './types';
import data from './uganda';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction<SpotLightlIndicatorUg> =>
({
  changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorUg, dispatch),
  changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
});

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.indicatorUganda, loading: app.loading });

export type SpotlightUgProps = Props<SpotLightlIndicatorUg, LoadingStatus> & {state?: StateToShare}
  & BoundAction<SpotLightlIndicatorUg>;

// TODO: fix types
const spotlightNavBarTabs: React.SFC<any> = (props) => {
  return (<NavigationBarTabs
    navBarItems={ data.spotlightThemes }
    showUsingThisViz
    isForSpotlightsUg
    loading={ props.loading }
    changeActiveIndicator={ props.changeActiveIndicator }
    changeLoadingStatus={ props.changeLoadingStatus }
    activeIndicator={ props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator }
  />);
};

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
