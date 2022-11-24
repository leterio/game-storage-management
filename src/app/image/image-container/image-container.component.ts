import { Component, Input } from '@angular/core';
import { IImage } from '../iimage';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css'],
})
export class ImageContainerComponent {
  @Input() image?: IImage;
}
