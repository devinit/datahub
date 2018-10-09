import { ChangeActiveIndicator, ChangeLoadingStatus } from '../../molecules/NavigationBarTabs';
import { LoadingStatus } from '../../../redux/actions';

export interface BoundAction<T> {
  changeActiveIndicator: ChangeActiveIndicator<T>;
  changeLoadingStatus: ChangeLoadingStatus<LoadingStatus>;
}

export interface BoundState {
  activeIndicator: string;
  loading: boolean;
}
