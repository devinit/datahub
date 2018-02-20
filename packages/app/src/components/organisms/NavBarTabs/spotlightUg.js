import * as React from 'react';
import { changeSpotlightIndicatorUg, changeLoadingStatus } from '../../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationBarTabs from '@devinit/dh-ui/lib/molecules/NavigationBarTabs';
import data from './uganda';
const mapDispatchToProps = (dispatch) => ({
    changeActiveIndicator: bindActionCreators(changeSpotlightIndicatorUg, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
});
const mapStateToProps = ({ app }) => ({ activeIndicator: app.indicatorUganda, loading: app.loading });
const spotlightNavBarTabs = (props) => {
    return (React.createElement(NavigationBarTabs, { navBarItems: data.spotlightThemes, showUsingThisViz: true, isForSpotlightsUg: true, loading: props.loading, changeActiveIndicator: props.changeActiveIndicator, changeLoadingStatus: props.changeLoadingStatus, activeIndicator: props.state && props.state.indicator ?
            props.state.indicator : props.activeIndicator }));
};
export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
