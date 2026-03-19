import { DI } from "../core/DI";

export function inject<T>(dependency: new () => T): T {
  return DI.getService(dependency);
}
