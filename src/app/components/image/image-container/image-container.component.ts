import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ActionImage, Image } from '../../../entity/image/image';

@Component({
  selector: 'image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css'],
})
export class ImageContainerComponent {
  @Input() image?: Image | ActionImage;

  constructor(private router: Router) {}

  imageClicked() {
    if (this.image instanceof ActionImage) {
      if (this.image.clickRoute) {
        this.router.navigate([this.image.clickRoute]);
        console.log(`navigate to ${this.image.clickRoute}`);
      } else if (this.image.clickHandler) {
        this.image.clickHandler();
      }
    }
  }
}
