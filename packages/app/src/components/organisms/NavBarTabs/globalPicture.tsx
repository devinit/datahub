import * as React from 'react';
import { changeGlobalIndicator, changeLoadingStatus, GlobalIndicator, LoadingStatus} from '../../../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import { State, Action } from '../../../redux/reducers';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
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

type GlobalPictureProps = Props<GlobalIndicator,  LoadingStatus> & {state?: StateToShare}
  & BoundAction<GlobalIndicator>;

const gloalPictureNavBarTabs: React.SFC<GlobalPictureProps> = (props) =>
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
