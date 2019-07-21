const appRoot = require('app-root-path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'aniang' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new DailyRotateFile({ filename: `${appRoot}/logs/error`,  level: 'error' }),
    new DailyRotateFile({ filename: `${appRoot}/logs/combined`,  })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;