import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  {
    component: TicketListComponent,
    path: '',
  },
  /* {
    component: TicketDetailComponent,
    path: 'detail/:id',
  } */
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule { }
