import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '@interfaces/index';
import { UsersActionsUnion, UsersActionTypes } from '@actions/users.actions';

export interface State {
    users: User[];
    loading: boolean;
}
export const defaultState: State = {
    loading: true,
    users: [],
};

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState = adapter.getInitialState(defaultState);

export function reducer(
    state = initialState,
    action: UsersActionsUnion,
): State {
    switch (action.type) {
        case UsersActionTypes.FetchAllUsersSuccessAction: {
            return {
                loading: false,
                users: action.payload,
            };
        }
        case UsersActionTypes.FetchAllUsersFailureAction: {
            return {
                ...state,
                loading: false,
            };
        }
        default: {
            return state;
        }
    }
}

export const getTicketsFeatureState = createFeatureSelector<State>(
    'users',
);

export const getLoadingStatus = createSelector(
    getTicketsFeatureState,
    (state: State) => state.loading,
);
