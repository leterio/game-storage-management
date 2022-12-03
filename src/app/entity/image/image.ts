export declare type Images = Image[];
export class Image {
  constructor(public id?: number, public src: string = '') {}
}

export class ActionImage extends Image {
  constructor(id?: number, src: string = '', public clickRoute?: string, public clickHandler?: () => void) {
    super(id, src);
  }

  public static fromImage(image: Image, clickRoute?: string, clickHandler?: () => void): ActionImage {
    return new ActionImage(image.id, image.src, clickRoute, clickHandler);
  }

  public toImage(): Image {
    return {
      id: this.id,
      src: this.src,
    };
  }
}
