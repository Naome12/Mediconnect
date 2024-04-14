const {createLogger,combine,transports} = require("winston")

const logger = createLogger({
    level: 'info',
    format: winston.format.combine(
      format.timestamp(),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'server.log' })
    ]
})

module.exports=logger;