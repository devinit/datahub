// @flow

import type { ChangeActiveIndicator, ChangeLoadingStatus } from 'components/molecules/NavigationBarTabs';

export type BoundAction<T> = {
  changeIndicator: ChangeActiveIndicator<T>,
  changeLoadingStatus: ChangeLoadingStatus
};

export type BoundState = {
  activeIndicator: string,
  loading: boolean,
};
