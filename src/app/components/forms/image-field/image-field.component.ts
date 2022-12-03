import { Component } from '@angular/core';
import { ImageService } from 'src/app/entity/image/image.service';
import { JogoService } from 'src/app/entity/jogo/jogo-service';
import { Constants } from 'src/app/helper/constants';
import { Image } from '../../../entity/image/image';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.css'],
})
export class ImageFieldComponent extends AbstractField<Image> {
  remove(): void {
    this.fieldValue = undefined;
    this.fieldValueChange.emit(undefined);
  }

  change(): void {
    if (Constants.imageMocked) {
      this.fieldValue = ImageService.mocked()[0];
    } else {
      console.log('TODO');
    }

    this.fieldValueChange.emit(this.fieldValue);
  }
}
