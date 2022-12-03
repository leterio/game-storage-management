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

  public static valueOrDefault<T>(value: T | undefined, _default: T): T {
    if (value) return value;
    else return _default;
  }
}
