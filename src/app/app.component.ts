import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SupportedLanguages } from '@utils/index';
import { LocalStorageService } from '@services/index';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { FetchAllTickets } from '@actions/tickets.actions';
import { FetchAllUsers } from './store/actions/users.actions';

@Component({
  selector: 'betclic-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private store: Store<AppState>,
  ) {
    this.setDefaultLang();
    this.executeActions();
  }

  private setDefaultLang(): void {
    this.translateService.addLangs([SupportedLanguages.EN, SupportedLanguages.FR]); // set Supported languages
    const browserLang = this.translateService.getBrowserLang(); // get browser language
    const storedLang = this.localStorageService.getLang(); // get stored language
    const lang = storedLang ? storedLang : browserLang;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(
      this.translateService.getLangs().includes(lang) ? lang : browserLang
    );
  }

  private executeActions(): void {
    this.store.dispatch(
      new FetchAllTickets(),
    );
    this.store.dispatch(
      new FetchAllUsers(),
    );
  }
}
