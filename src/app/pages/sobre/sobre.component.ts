import { Component } from '@angular/core';
import { Constants } from 'src/app/helper/constants';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
})
export class SobreComponent {
  title = Constants.appName;
}
