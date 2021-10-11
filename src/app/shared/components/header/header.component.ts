import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { SupportedLanguages } from '@app/core/utils';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '@app/core/services';

@Component({
  selector: 'betclic-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {

  public supportedLanguages = SupportedLanguages;

  constructor(
    public translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    super();
  }

  public ngOnInit(): void {
    //
  }

  /**
   * Function to change current language and store it to current Local Storage
   * @param lang : string
   */
  public switchLanguage(lang: string): void {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    this.localStorageService.setLang(lang);
  }

}
