import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, isDevMode, NgModule } from '@angular/core';
import { getBrowserLang, Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoLoader, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export function translocoBrowserLangLoader(transloco: TranslocoService) {
  return function () {
    const lang = getBrowserLang() || transloco.getDefaultLang();
    transloco.setActiveLang(lang);
    return firstValueFrom(transloco.load(lang));
  };
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    { provide: TRANSLOCO_CONFIG, useValue: translocoConfig({ availableLangs: [ 'en', 'it' ], defaultLang: 'en', prodMode: !isDevMode() }) },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: APP_INITIALIZER, multi: true, useFactory: translocoBrowserLangLoader, deps: [ TranslocoService ] },
  ],
})
export class TranslocoRootModule {}
