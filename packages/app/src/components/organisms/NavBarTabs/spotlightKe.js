import * as React from 'react';
import { changeSpotlightIndicatorKe, changeLoadingStatus } from '../../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import data from './kenya';
const mapDispatchToProps = (dispatch) => ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorKe, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
});
const mapStateToProps = ({ app }) => ({ activeIndicator: app.indicatorKenya, loading: app.loading });
const spotlightNavBarTabs = (props) => {
    return (React.createElement(NavigationBarTabs, { navBarItems: data.spotlightThemes, showUsingThisViz: true, loading: props.loading, isForSpotlightsKe: true, changeActiveIndicator: props.changeActiveIndicator, changeLoadingStatus: props.changeLoadingStatus, activeIndicator: props.state && props.state.indicator ?
            props.state.indicator : props.activeIndicator }));
};
export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
