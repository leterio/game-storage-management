import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePanelComponent } from './image-panel/image-panel.component';
import { ImageContainerComponent } from './image-container/image-container.component';

const modules: Array<Type<any> | any[]> = [ImagePanelComponent, ImageContainerComponent];

@NgModule({
  declarations: modules,
  exports: modules,
  imports: [CommonModule],
})
export class ImageModule {}
