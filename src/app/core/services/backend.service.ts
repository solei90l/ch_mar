import { Injectable } from '@angular/core';
import { Ticket, User } from '@app/shared/interfaces';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  public storedTickets: Ticket[] = [
    {
      assignedId: 111,
      completed: false,
      description: 'Install a monitor arm',
      id: 0,
    },
    {
      assignedId: 111,
      completed: false,
      description: 'Move the desk to the new location',
      id: 1,
    },
  ];

  public storedUsers: User[] = [
    { id: 111, name: 'Victor' },
    { id: 112, name: 'Wissem' },
  ];

  private lastId = 1;

  public tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  public ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  public users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  public user(id: number): Observable<User> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  public newTicket(payload: Ticket): Observable<Ticket> {
    const newTicket: Ticket = {
      assignedId: undefined,
      completed: false,
      description: payload.description,
      id: ++this.lastId,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
    );
  }

  public assign(ticketId: number, userId: number): Observable<Ticket> {
    const user = this.findUserById(+userId);
    const foundTicket = this.findTicketById(+ticketId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        /* tap((ticket: Ticket) => {
          ticket.assignedId = +userId;
        }) */
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  public complete(ticketId: number, completed: boolean): Observable<Ticket> {
    const foundTicket = this.findTicketById(+ticketId);

    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = true;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }

  private findUserById = (id) =>
    this.storedUsers.find((user: User) => user.id === +id);

  private findTicketById = (id) =>
    this.storedTickets.find((ticket: Ticket) => ticket.id === +id);
}
