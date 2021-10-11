import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import * as fromTickets from '@reducers/tickets.reducer';
import { DataGridOptions } from '@app/shared/classes';
import { BaseComponent } from '@app/shared/components';
import { DataGridColumn, PTableInputs, Ticket, User } from '@app/shared/interfaces';
import {
  AddTicket,
  AddTicketFailure,
  AddTicketSuccess,
  AssignTicket,
  TicketsActionTypes,
} from '@actions/tickets.actions';
import { Actions, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { FetchAllUsers, FetchAllUsersSuccess, UsersActionTypes } from '@app/store/actions/users.actions';
import { BackendService } from '@app/core/services';

@Component({
  selector: 'betclic-ticket-list',
  styleUrls: ['./ticket-list.component.scss'],
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent extends BaseComponent implements OnInit {
  public loading$: Observable<boolean>;
  public globalFilterFields: string[] = ['id', 'description'];
  public pageTitle = 'dataGrid.titles.ticketList';
  public tableData: Ticket[];
  public displayedColumns: DataGridColumn[] = [];
  public pTableInputs: PTableInputs;
  public dataGridOptions: DataGridOptions = new DataGridOptions();

  public ticketDialogVisibility = false;
  public selectedTicket: Ticket;

  public users: User[] = [];
  public selectedUser: User = {
    id: 111,
    name: 'Wis'
  };

  constructor(
    private store: Store<AppState>,
    private dispatcher: Actions,
    private messageService: MessageService,
    private backendService: BackendService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setupDataGrid();

    this.subscriptions.push(
      // add subscriptions here

      this.dispatcher
        .pipe(
          ofType(
            UsersActionTypes.FetchAllUsersSuccessAction,
          )
        )
        .subscribe((action: FetchAllUsersSuccess) => {
          // console.log(action.payload);
          this.users = action.payload;
        }),

      this.dispatcher
        .pipe(
          ofType(
            TicketsActionTypes.AddTicketSuccessAction,
            TicketsActionTypes.AddTicketFailureAction
          )
        )
        .subscribe((action: AddTicketSuccess | AddTicketFailure) => {
          if (action instanceof AddTicketSuccess) {
            this.messageService.add({
              detail: 'Ticket Created',
              life: 3000,
              severity: 'success',
              summary: 'Succefully',
            });
          } else {
            this.messageService.add({
              detail: action.error.message,
              life: 3000,
              severity: 'error',
              summary: 'Oops',
            });
          }
        }),

      this.store
        .pipe(select(fromTickets.getTicketsFeatureState))
        .subscribe(async (state) => {
          if (state && state.tickets) {
            this.tableData = state.tickets;
          }
        })
    );

    this.loading$ = this.store.pipe(
      select(fromTickets.getLoadingStatus),
      takeUntil(this.ngDestroyed$),
      map((status) => status)
    );
  }

  public editTicket(data: Ticket) {
    this.selectedTicket = { ...data };
    this.ticketDialogVisibility = true;
  }

  public hideDialog(): void {
    this.selectedTicket = undefined;
    this.ticketDialogVisibility = false;
  }

  public save(): void {
    if (this.selectedTicket.id === undefined) {
      this.store.dispatch(new AddTicket(this.selectedTicket));
    }
    // Not Implemented If edit
    this.ticketDialogVisibility = false;
  }

  public handleCompletedChange(e): void {
    const isChecked = e.checked;
    // Not Implemented Yet
  }

  public AddNewTicket(): void {
    const newTicket: Ticket = {
      description: '',
    };
    this.selectedTicket = { ...newTicket };
    this.ticketDialogVisibility = true;
  }

  public findUser(id: number): string {
    // console.log(id);
    const user = (this.users || []).find((u: User) => u.id === id);
    return user?.name || '';
  }

  public onUserSelectionChange(ticket: Ticket, event: User): void {
    // Not Implemented Yet
    // console.log(ticket, event);
    /* this.store.dispatch(
      new AssignTicket(ticket.id, event.id)
    ); */
  }

  private setupDataGrid(): void {
    // intialise data grid properties
    this.pTableInputs = {
      autoLayout: true,
      paginator: true,
    };

    // configure functionality
    this.dataGridOptions.toolBarGrid.enabletoolBarTemplate = true;
    this.dataGridOptions.actionRow.showActionRow = true;

    // setup columns
    this.displayedColumns = [
      { field: 'id', header: 'models.id' },
      {
        cellTemplate: 'ticketCompletedTemplate',
        field: 'completed',
        header: 'models.completed',
      },
      { cellTemplate: 'assignedIdTemplate',
        field: 'assignedId', header: 'models.assignedId' },
      { field: 'description', header: 'models.description' },
    ];
  }
}
