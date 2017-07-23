// @flow
import React from 'react';
import {connect} from 'react-redux';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type {ChangeActiveIndicator} from 'components/molecules/NavigationBarTabs';
import type {Action} from 'lib/reducers';
import { bindActionCreators } from 'redux';
import {changeGlobalIndicator} from 'lib/actions';
import type {GlobalIndicator} from 'lib/actions';
import data from './data';

type Props = {
  changeGlobalIndicator: ChangeActiveIndicator<GlobalIndicator>,
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): Props => {
  return {
    changeGlobalIndicator: bindActionCreators(changeGlobalIndicator, dispatch)
  };
};

const globalPictureNavBarTab = (props: Props) =>
  (<NavigationBarTabs
    navBarItems={data.globalPictureThemes}
    changeActiveIndicator={props.changeGlobalIndicator}
  />);

export default connect(null, mapDispatchToProps)(globalPictureNavBarTab);

