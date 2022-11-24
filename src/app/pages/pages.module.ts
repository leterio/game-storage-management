import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from '../image/image.module';
import { HomePageComponent } from './home-page/home-page.component';

const modules: Array<Type<any> | any[]> = [HomePageComponent];

@NgModule({
  declarations: modules,
  exports: modules,
  imports: [CommonModule, ImageModule],
})
export class PagesModule {}
