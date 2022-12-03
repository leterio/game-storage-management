import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { Utils } from 'src/app/helper/utils';
import { BaseEntityService } from '../base-entity-service';
import { Image } from './image';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends BaseEntityService<Image> {
  get localStorageKey(): string {
    return 'imageDatabase';
  }

  get jsonServerEntity(): string {
    return 'images';
  }

  get useMocks(): boolean {
    return Constants.imageMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.imageLocalStorage;
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public newEmpty(): Image {
    return new Image();
  }

  public copyClean(object: Image): Image {
    return new Image(object.id, object.src);
  }

  protected generateMock(): Image {
    return new ImageMock();
  }
}

class ImageMock extends Image {
  constructor() {
    super(Utils.generateEntityId(), ImageMock.generatePlaceholder());
  }

  private static generatePlaceholder(): string {
    let color: string = MockHelper.generateColorHEX();
    let textColor: string = MockHelper.generateContrastantColor(color);
    let width: number = MockHelper.getInt(200, 600);
    let height: number = MockHelper.getInt(200, 600);
    return `https://via.placeholder.com/${width}x${height}/${color}/${textColor}`;
  }
}
