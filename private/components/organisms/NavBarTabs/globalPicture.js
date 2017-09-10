// @flow
import React from 'react';
import { changeGlobalIndicator, changeLoadingStatus } from 'lib/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { GlobalIndicator} from 'lib/actions';
import type { State, Action } from 'lib/reducers';
import type {BoundAction, BoundState} from '.';
import NavBarTabs from '.';
import data from './data';

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction<GlobalIndicator> =>
  ({
    changeIndicator: bindActionCreators(changeGlobalIndicator, dispatch),
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
  });

const mapStateToProps = ({ app }: State): BoundState =>
  ({ activeIndicator: app.globalIndicator, loading: app.loading });


const gloalPictureNavBarTabs = (props) =>
  <NavBarTabs navBarItems={data.globalPictureThemes} showUsingThisViz {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(gloalPictureNavBarTabs);
