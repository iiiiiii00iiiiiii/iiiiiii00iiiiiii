"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../lib/modules");
const db_1 = require("../lib/db");
const config_1 = __importDefault(require("../config"));
class MessageService {
    constructor() {
        this.getMessageList = (userOID, page) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            title: 1,
                            content: 1,
                            checkStatus: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('messages').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > getMessageList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getMessageDetail = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            checkStatus: true,
                            checkDateTime: new Date()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            title: 1,
                            content: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > getMessageDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.checkMessageAll = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        checkStatus: false
                    };
                    const setQuery = {
                        $set: {
                            checkStatus: true,
                            checkDateTime: new Date()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > deleteMessage');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteMessage = (_id, userOID, userID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        checkStatus: true
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true,
                            deleteBy: 'User',
                            deleteWhoOID: new db_1.ObjectID(userOID),
                            deleteWhoID: userID,
                            deleteDateTime: new Date()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > deleteMessage');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteMessageAll = (userOID, userID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        checkStatus: true,
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true,
                            deleteBy: 'User',
                            deleteWhoOID: new db_1.ObjectID(userOID),
                            deleteWhoID: userID,
                            deleteDateTime: new Date()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > deleteMessage');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.messageCount = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        checkStatus: false,
                        deleteStatus: false
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('messages').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MessageService > messageCount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = MessageService;
