"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidv4 = exports.mongoSanitize = exports.sleep = exports.logger = exports._ = exports.crypto = exports.request = exports.numeral = exports.moment = void 0;
const moment_1 = __importDefault(require("moment"));
exports.moment = moment_1.default;
const numeral_1 = __importDefault(require("numeral"));
exports.numeral = numeral_1.default;
const request_1 = __importDefault(require("request"));
exports.request = request_1.default;
const crypto_1 = __importDefault(require("crypto"));
exports.crypto = crypto_1.default;
const lodash_1 = __importDefault(require("lodash"));
exports._ = lodash_1.default;
const winston_1 = __importStar(require("winston"));
require("winston-daily-rotate-file");
const util_1 = __importDefault(require("util"));
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
exports.mongoSanitize = mongo_sanitize_1.default;
const uuid_1 = require("uuid");
Object.defineProperty(exports, "uuidv4", { enumerable: true, get: function () { return uuid_1.v4; } });
const sleep = util_1.default.promisify(setTimeout);
exports.sleep = sleep;
const transport = new (winston_1.default.transports.DailyRotateFile)({
    filename: 'logs/system.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
});
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${typeof info.message === 'object' ? JSON.stringify(info.message) : info.message} ${info.stack ? info.stack : ''}`)),
    transports: [
        transport,
        new winston_1.default.transports.Console()
    ]
});
exports.logger = logger;
