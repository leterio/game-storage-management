export class Constants {
  private constructor() {}

  public static appName: string = 'Game Storage Management';

  public static everythingMocked: boolean = false;

  public static imageMocked: boolean = true || Constants.everythingMocked;
  public static jogosMocked: boolean = true || Constants.everythingMocked;
}
