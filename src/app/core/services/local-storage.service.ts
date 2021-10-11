import { Injectable } from '@angular/core';

import { SupportedLanguages } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public reset() {
    localStorage.clear();
  }

  public getItem(key: string) {
    return localStorage.getItem('betclic.' + key);
  }

  public setItem(key: string, newValue: any) {
    return localStorage.setItem('betclic.' + key, JSON.stringify(newValue));
  }

  public getLang(): SupportedLanguages {
    return localStorage.getItem('betclic.lang') as SupportedLanguages;
  }

  public setLang(lang: string) {
    localStorage.setItem('betclic.lang', lang);
  }

}
