import winston from "winston";

function loggerDev() {
    const prodLogger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });
    return prodLogger;
  };

let logger = loggerDev();
export default logger;