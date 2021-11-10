import moment from 'moment'
import numeral from 'numeral'
import request from 'request'
import crypto from 'crypto'
import _ from 'lodash'
import winston, { format } from 'winston'
import 'winston-daily-rotate-file'
import util from 'util'
import mongoSanitize from 'mongo-sanitize'
import { v4 as uuidv4 } from 'uuid'

const sleep = util.promisify(setTimeout)

const transport: any = new (winston.transports.DailyRotateFile) ({
    filename: 'logs/system.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
})
const logger: any = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${typeof info.message === 'object' ? JSON.stringify(info.message) : info.message} ${info.stack ? info.stack : ''}`)
      ),
    transports: [
        transport,
        new winston.transports.Console()
    ]
})

export { moment, numeral, request, crypto, _, logger, sleep, mongoSanitize, uuidv4 }