/* eslint-disable no-console */
interface Logger {
  log(message: string): void;
}

// DefaultLogger class that implements the Logger interface
class DefaultLogger {
  public log(message: string): void {
    console.log(`${new Date().toLocaleString('en-CA')} ${message}`);
  }
}

// LoggerDecorator class implements the Logger interface and acts as the base class for other decorators
class LoggerDecorator implements Logger {
  protected logger: Logger;

  constructor(logger: Logger) {
    // Constructor takes a Logger instance to decorate
    this.logger = logger;
  }

  // delegates the logging to the decorated logger instance
  public log(message: string): void {
    this.logger.log(message);
  }
}

// Adds the ability to log the performance time of an operation
class PerformanceLogger extends LoggerDecorator {
  private startTime = 0;

  private endTime: number;

  // sets the start time for performance measurement
  public startNow() {
    this.startTime = performance.timeOrigin + performance.now();
  }

  public log(): void {
    if (this.startTime === 0) {
      // If the start time is not initialized, log an error message
      this.logger.log('Performance : Timer not initialized');
    } else {
      // calculate the end time and log the performance duration
      this.endTime = performance.timeOrigin + performance.now();
      this.logger.log(`Performance : ${this.endTime - this.startTime}ms`);
    }
  }
}

// UserActionLogger class is a decorator that extends LoggerDecorator
class UserActionLogger extends LoggerDecorator {
  public log(message: string): void {
    this.logger.log(`User        : ${message}`);
  }
}

// ErrorLogger class is a decorator that extends LoggerDecorator
class ErrorLogger extends LoggerDecorator {
  public log(message: string): void {
    console.error(`Error       : ${message}`);
    this.logger.log(message);
  }
}

export const defaultLogger: DefaultLogger = new DefaultLogger();

export const logger: LoggerDecorator = new LoggerDecorator(defaultLogger);

export const errorLogger: ErrorLogger = new ErrorLogger(defaultLogger);

export const performanceLogger: PerformanceLogger = new PerformanceLogger(
  defaultLogger,
);

export const userActionLogger: UserActionLogger = new UserActionLogger(
  defaultLogger,
);
