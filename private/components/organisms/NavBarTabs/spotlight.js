// @flow
import React from 'react';
import { changeSpotlightIndicator, changeLoadingStatus } from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { GlobalIndicator} from 'lib/actions';
import type { State, Action } from 'lib/reducers';
import type {BoundAction, BoundState} from '.';
import NavBarTabs from '.';
import data from './ug-data';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<GlobalIndicator> =>
  ({
    changeIndicator: bindActionCreators(changeSpotlightIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });


const spotlightNavBarTabs = (props) =>
  <NavBarTabs navBarItems={data.spotlightThemes} showUsingThisViz {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(spotlightNavBarTabs);
