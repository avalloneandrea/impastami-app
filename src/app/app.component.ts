import { Component } from '@angular/core';
import packageInfo from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

  appVersion: string;

  constructor() {
    this.appVersion = packageInfo.version;
  }

}
