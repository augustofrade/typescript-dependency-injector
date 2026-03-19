# Dave Dependency Injector

Dave is a very simple and lightweight dependency injector for TypeScript inspired by C#'s DI.

## Installation

Run the following in your project directory to install Dave:
`npm i dave-di`

## Usage

### Dependency Registration

Dependencies can be registred as:

- Singleton: a single instance is used for the entire DI scope.
- Transient: a new instance is created at every injection call.

Dependencies can be registered through **decorators** and **DI method calls**.

#### Registration with Decorators

Register dependencies with `@InjectableSingleton` and `@InjectableTransient()`:

```typescript
import { InjectableSingleton, InjectableTransient } from "dave-di";

@InjectableSingleton()
class Logger {
  // ...
}

@InjectableTransient()
class UserService {
  // ...
}
```

#### Registration with DI Method Calls

```typescript
import { DI } from "dave-di";

class Logger {
  // ...
}

class UserService {
  // ...
}

DI.addSingleton(Logger);
DI.addTransient(UserService);
```

### Dependency Injection

Dependencies can be injected through the `inject()` function or `DI.getService()`:

```typescript
class UserService {
  private logger = inject(Logger);
}

// or

const logger = DI.getService(Logger);
```

### Build

To build the project simply run `npm run build` or `npm run build:dev` for the source map build.
