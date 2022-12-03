import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageContainerComponent } from './image-container/image-container.component';
import { ImagePanelComponent } from './image-panel/image-panel.component';

@NgModule({
  declarations: [ImagePanelComponent, ImageContainerComponent],
  exports: [ImagePanelComponent, ImageContainerComponent],
  imports: [CommonModule],
})
export class ImageModule {}
