// @flow
import React from 'react';
import { connect } from 'react-redux';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type { ChangeActiveIndicator, ChangeLoadingStatus } from 'components/molecules/NavigationBarTabs';
import { bindActionCreators } from 'redux';
import { changeGlobalIndicator, changeLoadingStatus } from 'lib/actions';
import type { GlobalIndicator} from 'lib/actions';
import type { State, Action } from 'lib/reducers';
import type {StateToShare} from 'components/molecules/ChartShare';
import data from './data';

type BoundAction = {
  changeIndicator: ChangeActiveIndicator<GlobalIndicator>,
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
    changeIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  };
};
const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });

const globalPictureNavBarTab = (props: Props) =>
  (<NavigationBarTabs
    showUsingThisViz
    loading={props.loading}
    navBarItems={data.globalPictureThemes}
    changeActiveIndicator={props.changeIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);

export default connect(mapStateToProps, mapDispatchToProps)(globalPictureNavBarTab);
