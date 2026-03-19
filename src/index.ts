import { inject } from "./common";
import { DI } from "./core/DI";

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
