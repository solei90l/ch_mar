import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import {
  UsersActionTypes,
  FetchAllUsers,
  FetchAllUsersSuccess,
  FetchAllUsersFailure,
} from '@actions/users.actions';
import { BackendService } from '@app/core/services';
import { User } from '@interfaces/index';

@Injectable()
export class UsersEffects {
  @Effect() public fetchAllUsers$: Observable<Action> = this.actions$.pipe(
    ofType<FetchAllUsers>(UsersActionTypes.FetchAllUsersAction),
    mergeMap((action: FetchAllUsers) =>
      this.backendService.users().pipe(
        switchMap((payload: User[]) => {
          const actions: Action[] = [new FetchAllUsersSuccess(payload)];
          return actions;
        }),
        catchError((err: Error) =>
          of(new FetchAllUsersFailure(err)),
        ),
      ),
    ),
  );


  constructor(
    private actions$: Actions,
    private backendService: BackendService,
  ) { }
}
