import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CoreModule } from '@app/core/core.module';
// import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [TicketListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class HomeModule { }
