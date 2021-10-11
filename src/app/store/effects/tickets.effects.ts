import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  switchMap,
  mergeMap,
  concatMap,
  map,
} from 'rxjs/operators';

import {
  TicketsActionTypes,
  FetchAllTickets,
  FetchAllTicketsSuccess,
  FetchAllTicketsFailure,
  AddTicketSuccess,
  AddTicket,
  AddTicketFailure,
  AssignTicketSuccess,
  AssignTicketFailure,
} from '@app/store/actions/tickets.actions';
import { Ticket } from '@interfaces/index';
import { BackendService } from '@app/core/services';
import { AssignTicket } from '../actions/tickets.actions';

@Injectable()
export class TicketsEffects {

  @Effect() public fetchAllTickets$: Observable<Action> = this.actions$.pipe(
    ofType<FetchAllTickets>(TicketsActionTypes.FetchAllTicketsAction),
    mergeMap((action: FetchAllTickets) =>
      this.backendService.tickets().pipe(
        switchMap((payload: Ticket[]) => {
          const actions: Action[] = [new FetchAllTicketsSuccess(payload)];
          return actions;
        }),
        catchError((err: Error) => of(new FetchAllTicketsFailure(err)))
      )
    )
  );

  @Effect() public addNewTicket$: Observable<Action> = this.actions$.pipe(
    ofType<AddTicket>(TicketsActionTypes.AddTicketAction),
    mergeMap((action: AddTicket) =>
      this.backendService.newTicket(action.payload).pipe(
        switchMap((payload: Ticket) => {
          // this.backendService.storedTickets.concat([payload]);
          const actions: Action[] = [new AddTicketSuccess(payload)];
          return actions;
        }),
        catchError((err: Error) => of(new AddTicketFailure(err)))
      )
    )
  );

  @Effect() public assignTicket$: Observable<Action> = this.actions$.pipe(
    ofType<AssignTicket>(TicketsActionTypes.AssignTicketAction),
    mergeMap((action: AssignTicket) =>
      this.backendService.assign(action.ticketId, action.userId).pipe(
        switchMap((payload: Ticket) => {
          const actions: Action[] = [new AssignTicketSuccess(payload)];
          return actions;
        }),
        catchError((err: Error) => of(new AssignTicketFailure(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {}
}
