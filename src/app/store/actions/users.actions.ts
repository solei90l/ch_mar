import { Action } from '@ngrx/store';

import { User } from '@interfaces/index';

export enum UsersActionTypes {
  FetchAllUsersAction = '[Users] fetch all Users action',
  FetchAllUsersSuccessAction = '[Users] fetch all Users success action',
  FetchAllUsersFailureAction = '[Users] fetch all Users failure action',
}

export class FetchAllUsers implements Action {
  public readonly type = UsersActionTypes.FetchAllUsersAction;
}
// tslint:disable-next-line: max-classes-per-file
export class FetchAllUsersSuccess implements Action {
  public readonly type = UsersActionTypes.FetchAllUsersSuccessAction;
  constructor(public payload: User[]) {}
}
// tslint:disable-next-line: max-classes-per-file
export class FetchAllUsersFailure implements Action {
  public readonly type = UsersActionTypes.FetchAllUsersFailureAction;
  constructor(public error: Error) {}
}

export type UsersActionsUnion =
  | FetchAllUsers
  | FetchAllUsersSuccess
  | FetchAllUsersFailure
  ;
