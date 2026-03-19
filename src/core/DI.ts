import { SingletonDependency, TransientDependency } from "./Dependency";
import { DIList } from "./DIList";

export class DI {
  private static dependencies: DIList = {};

  public static get registeredDependencies(): string[] {
    return Object.keys(this.dependencies);
  }

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
        `Could not inject dependency ${dependency.name}: register it with addTransient() or addSingleton()`,
      );
    }

    return registeredDependency.getInstance() as T;
  }
}
