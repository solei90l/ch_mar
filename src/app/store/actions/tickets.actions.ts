import { Action } from '@ngrx/store';

import { Ticket } from '@interfaces/index';

export enum TicketsActionTypes {
  FetchAllTicketsAction = '[Tickets] fetch all Tickets action',
  FetchAllTicketsSuccessAction = '[Tickets] fetch all Tickets success action',
  FetchAllTicketsFailureAction = '[Tickets] fetch all Tickets failure action',


  AddTicketAction = '[Tickets] Add Ticket action',
  AddTicketSuccessAction = '[Tickets] Add Ticket success action',
  AddTicketFailureAction = '[Tickets] Add Ticket failure action',


  AssignTicketAction = '[Tickets] Assign Ticket action',
  AssignTicketSuccessAction = '[Tickets] Assign Ticket success action',
  AssignTicketFailureAction = '[Tickets] Assign Ticket failure action',
}

export class FetchAllTickets implements Action {
  public readonly type = TicketsActionTypes.FetchAllTicketsAction;
}
// tslint:disable-next-line: max-classes-per-file
export class FetchAllTicketsSuccess implements Action {
  public readonly type = TicketsActionTypes.FetchAllTicketsSuccessAction;
  constructor(public payload: Ticket[]) {}
}
// tslint:disable-next-line: max-classes-per-file
export class FetchAllTicketsFailure implements Action {
  public readonly type = TicketsActionTypes.FetchAllTicketsFailureAction;
  constructor(public error: Error) {}
}



// tslint:disable-next-line: max-classes-per-file
export class AddTicket implements Action {
  public readonly type = TicketsActionTypes.AddTicketAction;
  constructor(public payload: Ticket) {}
}
// tslint:disable-next-line: max-classes-per-file
export class AddTicketSuccess implements Action {
  public readonly type = TicketsActionTypes.AddTicketSuccessAction;
  constructor(public payload: Ticket) {}
}
// tslint:disable-next-line: max-classes-per-file
export class AddTicketFailure implements Action {
  public readonly type = TicketsActionTypes.AddTicketFailureAction;
  constructor(public error: Error) {}
}


// tslint:disable-next-line: max-classes-per-file
export class AssignTicket implements Action {
  public readonly type = TicketsActionTypes.AssignTicketAction;
  constructor(public ticketId: number, public userId: number) {}
}
// tslint:disable-next-line: max-classes-per-file
export class AssignTicketSuccess implements Action {
  public readonly type = TicketsActionTypes.AssignTicketSuccessAction;
  constructor(public payload: Ticket) {}
}
// tslint:disable-next-line: max-classes-per-file
export class AssignTicketFailure implements Action {
  public readonly type = TicketsActionTypes.AssignTicketFailureAction;
  constructor(public error: Error) {}
}

export type TicketsActionsUnion =
  | FetchAllTickets
  | FetchAllTicketsSuccess
  | FetchAllTicketsFailure

  | AddTicket
  | AddTicketSuccess
  | AddTicketFailure


  | AssignTicket
  | AssignTicketSuccess
  | AssignTicketFailure
  ;
