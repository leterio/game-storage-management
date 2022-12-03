import { environment as env } from '../../environments/environment';

export class Constants {
  private constructor() {}

  public static appName: string = 'Game Storage Management';

  public static jsonServerBaseUrl = env.jsonServerBaseUrl;

  public static imageMocked: boolean = false || env.everythingMocked;
  public static jogosMocked: boolean = false || env.everythingMocked;
  public static plataformasMocked: boolean = false || env.everythingMocked;
  public static prateleirasMocked: boolean = false || env.everythingMocked;

  public static imageLocalStorage: boolean = false || env.everythingLocalStorage;
  public static jogosLocalStorage: boolean = false || env.everythingLocalStorage;
  public static plataformasLocalStorage: boolean = false || env.everythingLocalStorage;
  public static prateleirasLocalStorage: boolean = false || env.everythingLocalStorage;
}
