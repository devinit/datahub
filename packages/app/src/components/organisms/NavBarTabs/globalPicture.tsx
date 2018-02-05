// @flow
import * as React from 'react';
import { changeGlobalIndicator, changeLoadingStatus } from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GlobalIndicator} from '@devinit/dh-base/lib/actions';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import { State, Action } from '@devinit/dh-base/lib/reducers';
import NavigationBarTabs from '@devinit/dh-ui//molecules/NavigationBarTabs';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {BoundAction, BoundState} from './types';
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
