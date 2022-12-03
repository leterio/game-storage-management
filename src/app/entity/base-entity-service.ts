import { Observable } from 'rxjs';

export abstract class BaseEntityService<T, P> {
  public list(total: number, currentPage?: number): Observable<T[]> {
    throw new Error('Not Supported.');
  }
  public listTop(count: number): Observable<T[]> {
    throw new Error('Not Supported.');
  }
  public abstract getById(id: P): Observable<T | undefined>;
  public abstract newEmpty(): T;
}
