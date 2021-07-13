/***
 * RepositoryBase
 */

export abstract class RepositoryBase<T> {
  abstract get(id: string): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract create(obj: T): Promise<T>;

  abstract update(obj: T): Promise<T>;

  abstract delete(obj: T): Promise<void>;
}
