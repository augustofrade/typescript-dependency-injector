export abstract class Dependency<T> {
  constructor(protected readonly type: new () => T) {}

  abstract getInstance(): T;

  protected generateInstance(): T {
    return Reflect.construct(this.type, []);
  }
}

export class TransientDependency<T> extends Dependency<T> {
  getInstance(): T {
    return this.generateInstance();
  }
}

export class SingletonDependency<T> extends Dependency<T> {
  private instance: T | null = null;

  constructor(type: new () => T) {
    super(type);
  }

  getInstance(): T {
    if (this.instance == null) {
      this.instance = this.generateInstance();
    }

    return this.instance!;
  }
}
