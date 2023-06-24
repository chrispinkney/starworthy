/* eslint-disable no-console */
interface Logger {
  log(message: string): void;
}

class DefaultLogger {
  public log(message: string): void {
    console.log(`${new Date().toLocaleString('en-CA')} ${message}`);
  }
}

class LoggerDecorator implements Logger {
  protected logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public log(message: string): void {
    this.logger.log(message);
  }
}

class PerformanceLogger extends LoggerDecorator {
  private startTime = 0;

  private endTime: number;

  public startNow() {
    this.startTime = performance.timeOrigin + performance.now();
  }

  public log(): void {
    if (this.startTime === 0) {
      this.logger.log('Performance : Timer not initialized');
    } else {
      this.endTime = performance.timeOrigin + performance.now();

      this.logger.log(`Performance : ${this.endTime - this.startTime}ms`);
    }
  }
}

class UserActionLogger extends LoggerDecorator {
  public log(message: string): void {
    this.logger.log(`User        : ${message}`);
  }
}

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
