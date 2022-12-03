export class Constants {
  private constructor() {}

  public static appName: string = 'Game Storage Management';

  public static everythingMocked: boolean = false;
  public static everythingLocalStorage: boolean = true;

  public static imageMocked: boolean = false || Constants.everythingMocked;
  public static jogosMocked: boolean = false || Constants.everythingMocked;

  public static imageLocalStorage: boolean = true || Constants.everythingLocalStorage;
  public static jogosLocalStorage: boolean = true || Constants.everythingLocalStorage;
}
