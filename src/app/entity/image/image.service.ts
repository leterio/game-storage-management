import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageFieldComponent } from 'src/app/components/forms/image-field/image-field.component';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { BaseEntityService } from '../base-entity-service';
import { Image, Images } from './image';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends BaseEntityService<Image, number> {
  public getById(id: number): Observable<Image | undefined> {
    let image: Image | undefined;

    if (Constants.imageMocked) image = ImageService.mocked()[0];
    else image = undefined;

    return of(image);
  }

  public newEmpty(): Image {
    return new Image();
  }

  public static mocked(count: number = 1): Images {
    if (count <= 1) return [new ImageMock()];

    let jogos: Images = [];
    for (let i = 0; i < count; i++) jogos.push(new ImageMock());
    return jogos;
  }
}

class ImageMock extends Image {
  private static counter: number = 1;

  constructor(alt: string = MockHelper.getWords(3)) {
    super(ImageMock.counter++, alt, ImageMock.generatePlaceholder());
  }

  private static generatePlaceholder(): string {
    let color: string = MockHelper.generateColorHEX();
    let textColor: string = MockHelper.generateContrastantColor(color);
    let width: number = MockHelper.getInt(200, 600);
    let height: number = MockHelper.getInt(200, 600);
    return `https://via.placeholder.com/${width}x${height}/${color}/${textColor}`;
  }
}
