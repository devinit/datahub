import * as React from 'react';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  GlobalIndicator,
  LoadingStatus,
  changeGlobalIndicator,
  changeLoadingStatus
} from '../../../redux/actions';
import { State } from '../../../redux/reducers';
import { StateToShare } from '../../molecules/ChartShare';
import NavigationBarTabs, { Props } from '../../molecules/NavigationBarTabs';
import data from './data';
import { BoundAction, BoundState } from './types';

interface OwnProps {
  state?: StateToShare;
}

const mapDispatchToProps: MapDispatchToProps<BoundAction<GlobalIndicator>, OwnProps> = dispatch =>
  ({
    changeActiveIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch)
  });

const mapStateToProps: MapStateToProps<BoundState, OwnProps, State> = ({ app }) =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });

export type GlobalPictureProps = Props<GlobalIndicator, LoadingStatus> & OwnProps & BoundAction<GlobalIndicator>;

class GlobalPictureNavbarTabs extends React.Component<GlobalPictureProps> {
  componentDidMount() {
    const { state } = this.props;
    if (state && state.indicator && this.props.activeIndicator !== state.indicator) {
      this.props.changeActiveIndicator(state.indicator);
    }
  }

  render() {
    return (
      <NavigationBarTabs
        navBarItems={ data.globalPictureThemes }
        showUsingThisViz
        loading={ this.props.loading }
        changeActiveIndicator={ this.props.changeActiveIndicator }
        changeLoadingStatus={ this.props.changeLoadingStatus }
        activeIndicator={ this.props.activeIndicator }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPictureNavbarTabs) as any;
