import { Component, Input } from '@angular/core';
import { IImage } from '../iimage';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
})
export class ImagePanelComponent {
  @Input() images?: IImage[];
}
