interface DependencyMap {
  [key: string]: Dependency<any>;
}

abstract class Dependency<T> {
  constructor(protected readonly type: new () => T) {}

  abstract getInstance(): T;

  protected generateInstance(): T {
    return Reflect.construct(this.type, []);
  }
}

class TransientDependency<T> extends Dependency<T> {
  getInstance(): T {
    return this.generateInstance();
  }
}

class SingletonDependency<T> extends Dependency<T> {
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

class DI {
  public static dependencies: DependencyMap = {};

  public static addTransient<T>(dependency: new () => T) {
    this.dependencies[dependency.name] = new TransientDependency(dependency);
  }

  public static addSingleton<T>(dependency: new () => T) {
    this.dependencies[dependency.name] = new SingletonDependency(dependency);
  }

  public static getService<T>(dependency: new () => T): T {
    const registeredDependency = this.dependencies[dependency.name];
    if (registeredDependency === undefined) {
      throw new Error(
        `Could not inject dependency ${dependency.name}: define it with addTransient() or addSingleton()`,
      );
    }

    return registeredDependency.getInstance() as T;
  }
}

function inject<T>(dependency: new () => T): T {
  return DI.getService(dependency);
}

class Logger {
  public logLevel = 1;

  public logInfo(msg: string) {
    console.log(msg);
  }
}

class UserService {
  public logger = inject(Logger);

  public createUser(username: string) {
    this.logger.logInfo(username);
  }
}

DI.addSingleton(UserService);
DI.addSingleton(Logger);

const userService = DI.getService(UserService);
userService.createUser("test");
