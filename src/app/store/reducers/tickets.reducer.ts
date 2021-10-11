import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Ticket } from '@app/shared/interfaces';
import { TicketsActionsUnion, TicketsActionTypes } from '@app/store/actions/tickets.actions';

export interface State {
    tickets: Ticket[];
    loading: boolean;
}
export const defaultState: State = {
    loading: true,
    tickets: [],
};

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState = adapter.getInitialState(defaultState);

export function reducer(
    state = initialState,
    action: TicketsActionsUnion,
): State {
    switch (action.type) {
        case TicketsActionTypes.FetchAllTicketsSuccessAction: {
            return {
                loading: false,
                tickets: action.payload,
            };
        }
        case TicketsActionTypes.FetchAllTicketsFailureAction: {
            return {
                ...state,
                loading: false,
            };
        }
        case TicketsActionTypes.AddTicketAction: {
            return {
                loading: true,
                tickets: [...state.tickets],
            };
        }
        case TicketsActionTypes.AddTicketSuccessAction: {
            return {
                loading: false,
                tickets: [...state.tickets, action.payload],
            };
        }
        case TicketsActionTypes.AddTicketFailureAction: {
            return {
                loading: false,
                tickets: [...state.tickets],
            };
        }

        case TicketsActionTypes.AssignTicketAction: {
            // const tikets = state.tickets;
            // const findTicket = tikets.find((t: Ticket) => t.id === action.ticketId);
            // findTicket.assignedId = action.userId;
            // console.log(state.tickets);
            return {
                loading: true,
                tickets: [...state.tickets],
            };
        }
        default: {
            return state;
        }
    }
}

export const getTicketsFeatureState = createFeatureSelector<State>(
    'tickets',
);

export const getLoadingStatus = createSelector(
    getTicketsFeatureState,
    (state: State) => state.loading,
);
