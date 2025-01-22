import winston from 'winston';

const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `${info.timestamp}  [${info.level}] : ${info.message}`
  )
);

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        customFormat
      ),
    }),
    new winston.transports.File({
      filename: `${process.cwd()}/error.log`,
      level: 'error',
      format: customFormat,
    }),
  ],
});