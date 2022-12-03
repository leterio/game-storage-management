import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImageModule } from './image/image.module';
import { RouterModule } from '../router/router.module';

import { PageTitleComponent } from './page-title/page-title.component';

import { TextFieldComponent } from './forms/text-field/text-field.component';
import { CheckFieldComponent } from './forms/check-field/check-field.component';
import { DropDownFieldComponent } from './forms/drop-down-field/drop-down-field.component';
import { TextAreaFieldComponent } from './forms/text-area-field/text-area-field.component';
import { ImageFieldComponent } from './forms/image-field/image-field.component';

const components: Type<any>[] = [
  PageTitleComponent,
  TextFieldComponent,
  CheckFieldComponent,
  DropDownFieldComponent,
  TextAreaFieldComponent,
  ImageFieldComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, ImageModule, RouterModule, FormsModule],
  exports: [ImageModule].concat(components),
})
export class ComponentsModule {}
