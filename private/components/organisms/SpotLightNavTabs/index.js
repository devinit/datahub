// @flow
import React from 'react';
import {connect} from 'react-redux';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {ChangeActiveIndicator} from 'components/molecules/NavigationBarTabs';
import type {State, Action} from 'lib/reducers';
import { bindActionCreators } from 'redux';
import {changeSpotlightIndicator} from 'lib/actions';
import type {SpotLightlIndicator} from 'lib/actions';
import data from './ug-data';

type BoundAction = {
  changeSpotlightIndicator: ChangeActiveIndicator<SpotLightlIndicator>,
}
type BoundState = {
  activeIndicator: string
}

type Props = BoundAction & BoundState

const mapDispatchToProps = (dispatch: Dispatch<Action>): BoundAction => {
  return {
    changeSpotlightIndicator: bindActionCreators(changeSpotlightIndicator, dispatch)
  };
};

const mapStateToProps = ({app}: State): BoundState => ({activeIndicator: app.globalIndicator});

const spotlightNavBarTab = (props: Props) =>
  (<NavigationBarTabs
    navBarItems={data.spotlightThemes}
    activeIndicator={props.activeIndicator}
    changeActiveIndicator={props.changeSpotlightIndicator}
  />);

export default connect(null, mapDispatchToProps)(spotlightNavBarTab);
