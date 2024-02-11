class Logger {
  static info (message: string): void {
    console.info('\x1b[37m%s\x1b[0m', message); // White color
  }

  static success (message: string): void {
    console.log('\x1b[32m%s\x1b[0m', `Success: ${message}`); // Green color
  }

  static error (message: string): void {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${message}`); // Red color
  }
}

export default Logger;
