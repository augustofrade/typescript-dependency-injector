import { DI } from "../DI";

export function InjectableTransient<T>() {
  return function (constructor: new () => T) {
    DI.addTransient(constructor);
  };
}
