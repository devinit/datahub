import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import {
  LoadingStatus,
  SpotLightlIndicatorKe,
  changeLoadingStatus,
  changeSpotlightIndicatorKe } from '../../../redux/actions';
import { State } from '../../../redux/reducers';
import { StateToShare } from '../../molecules/ChartShare';
import NavigationBarTabs, { Props } from '../../molecules/NavigationBarTabs';
import data from './kenya';
import { BoundAction, BoundState } from './types';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoundAction<SpotLightlIndicatorKe> =>
  ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorKe, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
  });

export type SpotlightKeProps = Props<SpotLightlIndicatorKe, LoadingStatus> & {state?: StateToShare}
  & BoundAction<SpotLightlIndicatorKe>;

const mapStateToProps = ({ app }: State): BoundState => ({ activeIndicator: app.indicatorKenya, loading: app.loading });

class SpotlightNavBarTabs extends React.Component<SpotlightKeProps> {
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
        loading={ this.props.loading }
        isForSpotlightsKe
        changeActiveIndicator={ this.props.changeActiveIndicator }
        changeLoadingStatus={ this.props.changeLoadingStatus }
        activeIndicator={ this.props.activeIndicator }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightNavBarTabs) as any;
