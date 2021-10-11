import { environment } from '@environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromRouter from './router.reducer';
import * as fromTickets from '@app/store/reducers/tickets.reducer';


export interface AppState {
  router: RouterReducerState<fromRouter.RouterStateUrl>;
  tickets: fromTickets.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  tickets: fromTickets.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
