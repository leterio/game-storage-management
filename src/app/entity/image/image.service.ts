import { Injectable } from '@angular/core';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { BaseEntityService } from '../base-entity-service';
import { Image } from './image';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends BaseEntityService<Image, number> {
  get localStorageKey(): string {
    return 'imageDatabase';
  }

  get useMocks(): boolean {
    return Constants.imageMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.imageLocalStorage;
  }

  public newEmpty(): Image {
    return new Image();
  }

  protected generateMock(): Image {
    return new ImageMock();
  }
}

class ImageMock extends Image {
  private static counter: number = 1;

  constructor() {
    super(ImageMock.counter++, ImageMock.generatePlaceholder());
  }

  private static generatePlaceholder(): string {
    let color: string = MockHelper.generateColorHEX();
    let textColor: string = MockHelper.generateContrastantColor(color);
    let width: number = MockHelper.getInt(200, 600);
    let height: number = MockHelper.getInt(200, 600);
    return `https://via.placeholder.com/${width}x${height}/${color}/${textColor}`;
  }
}
