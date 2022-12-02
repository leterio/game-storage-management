import { map, Observable, of } from 'rxjs';

export abstract class BaseEntityService<T, P> {
  abstract get localStorageKey(): string;
  abstract get useMocks(): boolean;
  abstract get useLocalStorage(): boolean;

  public list(total: number, currentPage?: number): Observable<T[]> {
    if (total <= 0) return of([]);

    let results: T[] = [];
    if (this.useMocks) {
      if (total == 1) results = [this.generateMock()];
      else {
        for (let i = 0; i < total; i++) {
          results.push(this.generateMock());
        }
      }
    } else if (this.useLocalStorage) {
      results = this.listLocalStorage(total, currentPage);
    }

    for (let result of results) {
      this.postProcessResult(result);
    }

    return of(results);
  }

  protected listLocalStorage(total?: Number, currentPage?: number): T[] {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
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

  public getById(id: P): Observable<T | undefined> {
    let result: T | undefined;

    if (this.useMocks) result = this.generateMock();
    else if (this.useLocalStorage) result = this.getByIdLocalStorage(id);
    else result = undefined;

    if (result) {
      this.postProcessResult(result);
    }

    return of(result);
  }

  protected getByIdLocalStorage(id: P): T | undefined {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
    if (!localStorageJSON) return undefined;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    return localStorageDatabase[id];
  }

  public save(object: T): Observable<P | undefined> {
    let resultKey: P | undefined;

    if (this.useMocks) resultKey = <P>1;
    else if (this.useLocalStorage) resultKey = this.saveLocalStorage(object);
    else resultKey = undefined;

    return of(resultKey);
  }

  protected saveLocalStorage(object: T): P {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
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
    localStorage.setItem(this.localStorageKey, localStorageJSON);

    return (<any>object).id;
  }

  public remove(id: P): Observable<boolean> {
    let success: boolean;

    if (this.useMocks) success = true;
    else if (this.useLocalStorage) success = this.removeLocalStorage(id);
    else success = true;

    return of(success);
  }

  protected removeLocalStorage(id: P): boolean {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
    if (!localStorageJSON) return true;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    localStorageDatabase[id] = undefined;

    localStorageJSON = JSON.stringify(localStorageDatabase);
    localStorage.setItem(this.localStorageKey, localStorageJSON);

    return true;
  }

  public abstract newEmpty(): T;

  protected postProcessResult(result: T): void {
    // Do nothing here!
  }

  protected abstract generateMock(): T;
}
