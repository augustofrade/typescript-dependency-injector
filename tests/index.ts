import { inject } from "../src/common";
import { DI } from "../src/core";
import {
  InjectableSingleton,
  InjectableTransient,
} from "../src/core/decorators";

@InjectableSingleton()
class Logger {
  public logLevel = 1;

  public logInfo(msg: string) {
    console.log(msg);
  }
}

@InjectableTransient()
class UserService {
  public logger = inject(Logger);
  public currentUserName = "not-set";

  public createUser(username: string) {
    this.currentUserName = username;
  }

  public logName() {
    this.logger.logInfo(this.currentUserName);
  }
}

const service = DI.getService(UserService);
service.logName();
