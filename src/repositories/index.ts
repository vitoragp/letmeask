/***
 * RepositoryBase
 */

export abstract class RepositoryBase<T> {
  abstract get(id: string): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract create(obj: T): Promise<T>;

  abstract update(obj: T): void;

  abstract delete(obj: T): void;
}
