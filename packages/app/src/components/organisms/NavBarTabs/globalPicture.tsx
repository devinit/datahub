import * as React from 'react';
import { changeGlobalIndicator, changeLoadingStatus, GlobalIndicator, LoadingStatus} from '../../../redux/actions';
import { bindActionCreators} from 'redux';
import { connect,  MapStateToProps,  MapDispatchToPropsFunction } from 'react-redux';
import { Props } from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import { State} from '../../../redux/reducers';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import {BoundAction, BoundState} from './types';
import data from './data';

interface OwnProps {
  state?: StateToShare;
}

const mapDispatchToProps: MapDispatchToPropsFunction<BoundAction<GlobalIndicator>, OwnProps> = (dispatch) =>
  ({
    changeActiveIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps: MapStateToProps<BoundState, OwnProps, State> = ({ app }) =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });

export type GlobalPictureProps = Props<GlobalIndicator,  LoadingStatus> & OwnProps
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
