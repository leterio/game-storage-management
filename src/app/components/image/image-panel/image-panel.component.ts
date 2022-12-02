import { Component, Input } from '@angular/core';
import { Images } from '../../../entity/image/image';

@Component({
  selector: 'image-panel[images]',
  templateUrl: './image-panel.component.html',
})
export class ImagePanelComponent {
  @Input() images!: Images;
}