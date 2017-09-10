// @flow
import React from 'react';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import type { Props, ChangeActiveIndicator, ChangeLoadingStatus } from 'components/molecules/NavigationBarTabs';

export type BoundAction<T> = {
  changeIndicator: ChangeActiveIndicator<T>,
  changeLoadingStatus: ChangeLoadingStatus
};

export type BoundState = {
  activeIndicator: string,
  loading: boolean,
};

function NavBarTabs <T>(props: Props<T>) {
  return (
    <NavigationBarTabs
      showUsingThisViz={props.showUsingThisViz}
      loading={props.loading}
      navBarItems={props.navBarItems}
      changeActiveIndicator={props.changeActiveIndicator}
      changeLoadingStatus={props.changeLoadingStatus}
      activeIndicator={props.state && props.state.indicator ?
        props.state.indicator : props.activeIndicator}
    />);
}

export default NavBarTabs;
