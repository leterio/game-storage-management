export class Utils {
  private constructor() {}

  public static tryParseInt(string: string | undefined | null): number | undefined {
    if (string === null || string === undefined) return undefined;
    try {
      return parseInt(string);
    } catch {
      return undefined;
    }
  }
}
