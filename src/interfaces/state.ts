import { IHit } from './hit';
import { REQUEST_STATUS } from './request-status';

export interface IState {
  status: REQUEST_STATUS;
  data: Array<IHit>;
  error: string | null;
}

