import { MockHelper } from 'src/app/helper/mock-helper';

export declare type Images = Image[];
export class Image {
  constructor(public id: number = 0, public alt: string = '', public src: string = '') {}

  public toString(): string {
    return JSON.stringify(this, null, 4);
  }
}

export class ActionImage extends Image {
  constructor(
    id: number = 0,
    alt: string = '',
    src: string = '',
    public clickRoute?: string,
    public clickHandler?: () => void
  ) {
    super(id, alt, src);
  }

  public static fromImage(image: Image): ActionImage {
    return new ActionImage(image.id, image.alt, image.src);
  }
}
