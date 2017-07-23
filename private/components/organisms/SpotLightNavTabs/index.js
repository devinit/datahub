// @flow
import React from 'react';
import {connect} from 'react-redux';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {ChangeActiveIndicator} from 'components/molecules/NavigationBarTabs';
import type {Action} from 'lib/reducers';
import { bindActionCreators } from 'redux';
import {changeSpotlightIndicator} from 'lib/actions';
import type {SpotLightlIndicator} from 'lib/actions';
import data from './ug-data';

type Props = {
  changeGlobalIndicator: ChangeActiveIndicator<SpotLightlIndicator>,
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): Props => {
  return {
    changeGlobalIndicator: bindActionCreators(changeSpotlightIndicator, dispatch)
  };
};

const globalPictureNavBarTab = (props: Props) =>
  (<NavigationBarTabs
    navBarItems={data.globalPictureThemes}
    changeActiveIndicator={props.changeGlobalIndicator}
  />);

export default connect(null, mapDispatchToProps)(globalPictureNavBarTab);

