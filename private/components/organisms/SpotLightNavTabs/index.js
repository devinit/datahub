// @flow
import React from 'react';
import { connect } from 'react-redux';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type { ChangeActiveIndicator, ChangeLoadingStatus } from 'components/molecules/NavigationBarTabs';
import type { State, Action } from 'lib/reducers';
import { bindActionCreators } from 'redux';
import type {StateToShare} from 'components/molecules/ChartShare';
import { changeSpotlightIndicator, changeLoadingStatus } from 'lib/actions';
import type { SpotLightlIndicator } from 'lib/actions';
import data from './ug-data';

type BoundAction = {
  changeSpotlightIndicator: ChangeActiveIndicator<SpotLightlIndicator>,
  changeLoadingStatus: ChangeLoadingStatus
};
type BoundState = {
  activeIndicator: string,
  loading: boolean,
};

type Props = BoundAction & BoundState & {
  state: StateToShare,
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction => {
  return {
    changeSpotlightIndicator: bindActionCreators(changeSpotlightIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  };
};

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });

const spotlightNavBarTab = (props: Props) =>
  (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    loading={props.loading}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
    changeActiveIndicator={props.changeSpotlightIndicator}
  />);

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTab);
