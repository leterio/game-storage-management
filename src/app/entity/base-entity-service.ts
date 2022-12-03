import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Constants } from '../helper/constants';
import { Utils } from '../helper/utils';

export abstract class BaseEntityService<T> {
  abstract get localStorageKey(): string;
  abstract get jsonServerEntity(): string;
  abstract get useMocks(): boolean;
  abstract get useLocalStorage(): boolean;

  constructor(protected httpClient: HttpClient) {}

  public list(total?: number, currentPage?: number): Observable<T[]> {
    if (total && total <= 0) return of([]);

    let observableResults: Observable<T[]>;
    if (this.useMocks) {
      if (total == 1) observableResults = of([this.generateMock()]);
      else {
        let _total: number = total ? total : 10;
        let mockedResults: T[] = [];
        for (let i = 0; i < _total; i++) {
          mockedResults.push(this.generateMock());
        }
        observableResults = of(mockedResults);
      }
    } else if (this.useLocalStorage) observableResults = of(this.listLocalStorage(total, currentPage));
    else observableResults = this.listJsonServer(total, currentPage);

    return observableResults.pipe(
      map((resultsEmitted) => {
        let newResults: T[] = [];
        for (let resultEmitted of resultsEmitted) {
          newResults.push(this.copyClean(resultEmitted));
        }
        return newResults;
      })
    );
  }

  private listLocalStorage(total?: Number, currentPage?: number): T[] {
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

  private listJsonServer(total?: Number, currentPage?: number): Observable<T[]> {
    return this.httpClient.get<T[]>(`${Constants.jsonServerBaseUrl}/${this.jsonServerEntity}`);
  }

  public getById(id: string): Observable<T | undefined> {
    let observableResult: Observable<T | undefined>;

    if (this.useMocks) observableResult = of(this.generateMock());
    else if (this.useLocalStorage) observableResult = of(this.getByIdLocalStorage(id));
    else observableResult = this.getByIdJsonServer(id);

    return observableResult.pipe(
      map((resultEmitted) => {
        if (resultEmitted) {
          return this.copyClean(resultEmitted);
        }
        return undefined;
      })
    );
  }

  private getByIdLocalStorage(id: string): T | undefined {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
    if (!localStorageJSON) return undefined;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    return localStorageDatabase[id];
  }

  private getByIdJsonServer(id: string): Observable<T | undefined> {
    return this.httpClient.get<T | undefined>(`${Constants.jsonServerBaseUrl}/${this.jsonServerEntity}/${id}`);
  }

  public save(object: T): Observable<string> {
    if (this.useMocks) return of(Utils.generateEntityId());
    else if (this.useLocalStorage) return of(this.saveLocalStorage(object));
    else return this.saveJsonServer(object);
  }

  private saveLocalStorage(object: T): string {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
    let localStorageDatabase: any;

    if (localStorageJSON) {
      localStorageDatabase = JSON.parse(localStorageJSON);
    } else {
      localStorageDatabase = {};
    }

    if (!(<any>object).id) {
      (<any>object).id = Utils.generateEntityId();
    }

    localStorageDatabase[(<any>object).id] = object;

    localStorageJSON = JSON.stringify(localStorageDatabase);
    localStorage.setItem(this.localStorageKey, localStorageJSON);

    return (<any>object).id;
  }

  private saveJsonServer(object: T): Observable<string> {
    let operationResult: Observable<any>;

    if (!(<any>object).id) {
      (<any>object).id = Utils.generateEntityId();
      operationResult = this.httpClient.post(`${Constants.jsonServerBaseUrl}/${this.jsonServerEntity}`, this.copyClean(object));
    } else {
      operationResult = this.httpClient.put(
        `${Constants.jsonServerBaseUrl}/${this.jsonServerEntity}/${(<any>object).id}`,
        object
      );
    }

    return operationResult.pipe(
      map((result) => {
        return (<any>result).id;
      })
    );
  }

  public remove(id: string): Observable<void> {
    if (this.useMocks) return of();
    else if (this.useLocalStorage) return of(this.removeLocalStorage(id));
    else return this.removeJsonServer(id);
  }

  private removeLocalStorage(id: string): void {
    let localStorageJSON = localStorage.getItem(this.localStorageKey);
    if (!localStorageJSON) return;

    let localStorageDatabase = JSON.parse(localStorageJSON);

    localStorageDatabase[id] = undefined;

    localStorageJSON = JSON.stringify(localStorageDatabase);
    localStorage.setItem(this.localStorageKey, localStorageJSON);
  }

  private removeJsonServer(id: string): Observable<void> {
    console.log(`Delete: ${id}`);
    return this.httpClient.delete(`${Constants.jsonServerBaseUrl}/${this.jsonServerEntity}/${id}`).pipe(
      map(() => {
        return;
      })
    );
  }

  public abstract newEmpty(): T;

  public abstract copyClean(object: T): T;

  protected abstract generateMock(): T;
}
