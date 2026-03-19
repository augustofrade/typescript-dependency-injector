import { Dependency } from "./Dependency";

export interface DIList {
  [key: string]: Dependency<any>;
}
