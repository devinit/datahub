import * as React from 'react';
import { changeGlobalIndicator, changeLoadingStatus } from '../../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import data from './data';
const mapDispatchToProps = (dispatch) => ({
    changeActiveIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
});
const mapStateToProps = ({ app }) => ({ activeIndicator: app.globalIndicator, loading: app.loading });
const gloalPictureNavBarTabs = (props) => (React.createElement(NavigationBarTabs, { navBarItems: data.globalPictureThemes, showUsingThisViz: true, loading: props.loading, changeActiveIndicator: props.changeActiveIndicator, changeLoadingStatus: props.changeLoadingStatus, activeIndicator: props.state && props.state.indicator ?
        props.state.indicator : props.activeIndicator }));
export default connect(mapStateToProps, mapDispatchToProps)(gloalPictureNavBarTabs);
