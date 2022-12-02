import { Image } from 'src/app/entity/image/image';

export declare type DataGridModels = DataGridModel[];
export class DataGridModel {
  image?: Image;
  title!: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  routerLink!: string;
}
