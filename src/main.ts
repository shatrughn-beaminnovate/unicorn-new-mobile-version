import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // This is the code that will be executed when the app is in production mode
  // window.console.log = function () { };
  // window.console.warn = function () { };
  // window.console.error = function () { };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
