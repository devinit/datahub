// @flow

import { ChangeActiveIndicator, ChangeLoadingStatus } from 'components/molecules/NavigationBarTabs';

export interface BoundAction<T>  {
  changeActiveIndicator: ChangeActiveIndicator<T>;
  changeLoadingStatus: ChangeLoadingStatus;
}

export interface BoundState  {
  activeIndicator: string;
  loading: boolean;
}
