import { DI } from "../DI";

export function InjectableSingleton<T>() {
  return function (constructor: new () => T) {
    DI.addSingleton(constructor);
  };
}
