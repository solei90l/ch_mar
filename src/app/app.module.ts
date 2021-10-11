import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, DefaultRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '@environments/environment';
import { AppEffects } from '@effects/index';
import { metaReducers, reducers } from '@reducers/index';
import { CustomSerializer } from '@reducers/router.reducer';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // ngx-translate module Loader
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      }
    }),

    // NgRx Store Module Loader
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,
      stateKey: 'router',
    }),
    EffectsModule.forRoot(AppEffects),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 25,
      name: 'BetClic Store',
    }),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),


    // SharedModule,
    // CoreModule,

  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
  ],
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
