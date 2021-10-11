import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { CoreInterceptor } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
    },
  ]
})
export class CoreModule { }
