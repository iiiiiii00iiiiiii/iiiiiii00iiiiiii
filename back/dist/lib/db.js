"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectID = exports.mongoDB = void 0;
const mongodb_1 = require("mongodb");
const modules_1 = require("./modules");
const config_1 = __importDefault(require("../config"));
const mongoClient = mongodb_1.MongoClient;
const ObjectID = mongodb_1.ObjectId;
exports.ObjectID = ObjectID;
// Database Name
const dbHost = process.env.NODE_ENV == 'production' ? '127.0.0.1' : config_1.default.db.host; // You can use 'localhost\\instance' to connect to named instance
const dbPort = config_1.default.db.port;
const dbName = config_1.default.db.name;
const dbUser = encodeURIComponent(config_1.default.db.id);
const dbPassword = encodeURIComponent(config_1.default.db.password);
const url = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/?authMechanism=SCRAM-SHA-1&authSource=${dbName}`;
// Create a new mongoClient
const client = new mongoClient(url);
let pool = null;
const mongoDB = {
    connect: () => new Promise((resolve, reject) => {
        if (pool) {
            resolve(pool);
            return;
        }
        client.connect(function (err) {
            if (err) {
                modules_1.logger.info('Database Connection Failed! Bad Config: ', err);
                pool = null;
                resolve(pool);
                return;
            }
            modules_1.logger.info("Connected successfully to MongoDB Server");
            modules_1.logger.info(dbHost);
            modules_1.logger.info(dbName);
            pool = client.db(dbName);
            resolve(pool);
        });
    })
};
exports.mongoDB = mongoDB;
