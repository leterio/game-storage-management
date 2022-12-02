import { v4 as uuid } from 'uuid';
export class Utils {
  private constructor() {}

  public static generateEntityId(): string {
    return uuid();
  }

  public static valueOrDefault<T>(value: T | undefined, _default: T): T {
    if (value) return value;
    else return _default;
  }
}
