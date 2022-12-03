import { ImplicitReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-title[title]',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css'],
})
export class PageTitleComponent {
  @Input() title!: string;
  @Input() routerLinkTarget?: string;
}
