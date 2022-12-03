export declare type Images = Image[];
export class Image {
  public label?: string;

  constructor(public id?: string, public src: string = '') {}
}

export class ActionImage extends Image {
  constructor(
    id?: string,
    src: string = '',
    label: string = '',
    public clickRoute?: string,
    public clickHandler?: () => void
  ) {
    super(id, src);
    // this.label = label;
  }

  public static fromImage(image: Image, clickRoute?: string, clickHandler?: () => void): ActionImage {
    return new ActionImage(image.id, image.src, image.label, clickRoute, clickHandler);
  }

  public toImage(): Image {
    return new Image(this.id, this.src);
  }
}
