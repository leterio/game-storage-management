import { Observable } from 'rxjs';

export abstract class BaseEntityService<T, P> {
  public list(total?: number, currentPage?: number): Observable<T[]> {
    throw new Error('Not Supported.');
  }

  protected listLocalStorage(localStorageKey: string, total?: Number, currentPage?: number): T[] {
    let localStorageJSON = localStorage.getItem(localStorageKey);
    if (!localStorageJSON) return [];

    let localStorageDatabase = JSON.parse(localStorageJSON);
    let entryKeys = Object.keys(localStorageDatabase);

    if (entryKeys.length == 0) return [];

    let listed: T[] = [];
    let counter = 0;
    for (let key of entryKeys) {
      if (total && counter++ >= total) break;
      listed.push(localStorageDatabase[key]);
    }

    return listed;
  }

  public listTop(count: number): Observable<T[]> {
    throw new Error('Not Supported.');
  }

  public abstract getById(id: P): Observable<T | undefined>;

  protected getByIdLocalStorage(localStorageKey: string, id: P): T | undefined {
    let localStorageJSON = localStorage.getItem(localStorageKey);
    if (!localStorageJSON) return undefined;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    return localStorageDatabase[id];
  }

  public abstract newEmpty(): T;

  public abstract save(object: T): Observable<P | undefined>;

  protected saveLocalStorage(localStorageKey: string, object: T): P {
    let localStorageJSON = localStorage.getItem(localStorageKey);
    let localStorageDatabase: any;

    if (localStorageJSON) {
      localStorageDatabase = JSON.parse(localStorageJSON);
    } else {
      localStorageDatabase = {};
    }

    if (!(<any>object).id) {
      (<any>object).id = new Date().getTime();
    }

    localStorageDatabase[(<any>object).id] = object;

    localStorageJSON = JSON.stringify(localStorageDatabase);
    localStorage.setItem(localStorageKey, localStorageJSON);

    return (<any>object).id;
  }

  public abstract remove(object: T): Observable<boolean>;

  protected removeLocalStorage(localStorageKey: string, object: T): boolean {
    if ((<any>object).id === undefined || (<any>object).id === null) return true;

    let localStorageJSON = localStorage.getItem(localStorageKey);
    if (!localStorageJSON) return true;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    localStorageDatabase[(<any>object).id] = undefined;

    localStorageJSON = JSON.stringify(localStorageDatabase);
    localStorage.setItem(localStorageKey, localStorageJSON);

    return true;
  }
}
