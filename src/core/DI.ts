import { SingletonDependency, TransientDependency } from "./Dependency";
import { DIList } from "./DIList";

export class DI {
  public static dependencies: DIList = {};

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
