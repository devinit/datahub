// @flow
import React from 'react';
import { changeGlobalIndicator, changeLoadingStatus } from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { GlobalIndicator} from 'lib/actions';
import type { Props } from 'components/molecules/NavigationBarTabs';
import type { State, Action } from 'lib/reducers';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {StateToShare} from 'components/molecules/ChartShare';
import type {BoundAction, BoundState} from './types';
import data from './data';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<GlobalIndicator> =>
  ({
    changeActiveIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });

type GlobalPictureProps<T> = Props<T> & {state?: StateToShare, ... BoundState};

const gloalPictureNavBarTabs = (props: GlobalPictureProps<GlobalIndicator>) =>
  (<NavigationBarTabs
    navBarItems={data.globalPictureThemes}
    showUsingThisViz
    loading={props.loading}
    changeActiveIndicator={props.changeActiveIndicator}
    changeLoadingStatus={props.changeLoadingStatus}
    activeIndicator={props.state && props.state.indicator ?
      props.state.indicator : props.activeIndicator}
  />);

export default connect(mapStateToProps, mapDispatchToProps)(gloalPictureNavBarTabs);
