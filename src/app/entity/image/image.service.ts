import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { BaseEntityService } from '../base-entity-service';
import { Image, Images } from './image';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends BaseEntityService<Image, number> {
  private static localStorageKey: string = 'imageDatabase';

  public getById(id: number): Observable<Image | undefined> {
    let image: Image | undefined;

    if (Constants.imageMocked) image = this.mocked()[0];
    if (Constants.imageLocalStorage) image = super.getByIdLocalStorage(ImageService.localStorageKey, id);
    else image = undefined;

    return of(image);
  }

  public newEmpty(): Image {
    return new Image();
  }

  public save(image: Image): Observable<number | undefined> {
    if (Constants.imageMocked) return of(1);
    else if (Constants.imageLocalStorage) return of(this.saveLocalStorage(ImageService.localStorageKey, image));
    return of(undefined);
  }

  public remove(image: Image): Observable<boolean> {
    if (Constants.jogosMocked) return of(true);
    else if (Constants.jogosLocalStorage) return of(this.removeLocalStorage(ImageService.localStorageKey, image));
    return of(true);
  }

  private mocked(count: number = 1): Images {
    if (count <= 1) return [new ImageMock()];

    let jogos: Images = [];
    for (let i = 0; i < count; i++) jogos.push(new ImageMock());
    return jogos;
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
