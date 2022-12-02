import { Component } from '@angular/core';
import { Constants } from 'src/app/helper/constants';

@Component({
  selector: 'app-footer',
  template: `<footer class="text-center p-3 d-print-none">${Constants.appName} @ 2022</footer>`,
})
export class FooterComponent {}
