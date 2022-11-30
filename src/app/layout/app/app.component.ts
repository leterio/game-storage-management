import { Component } from '@angular/core';
import { Constants } from 'src/app/helper/constants';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet id="content"></router-outlet><app-footer></app-footer>',
})
export class AppComponent {
  title = Constants.appName;
}
