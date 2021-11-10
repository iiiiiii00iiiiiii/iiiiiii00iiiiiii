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
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../lib/modules");
const db_1 = require("../lib/db");
class UserService {
    constructor() {
        this.login = (id, password, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        id: (0, modules_1.mongoSanitize)(id),
                        password: modules_1.crypto.createHash('sha512').update(password).digest('base64')
                    };
                    const setQuery = {
                        $set: {
                            lastLoginIpaddress: ipaddress,
                            lastLoginDateTime: new Date()
                        },
                        $inc: {
                            loginCount: 1
                        }
                    };
                    const whatQuery = {
                        projection: {
                            id: 1,
                            nick: 1,
                            type: 1,
                            status: 1
                        }
                    };
                    const options = {
                        projection: {
                            id: 1,
                            nick: 1,
                            name: 1,
                            bankOwner: 1,
                            grade: 1,
                            status: 1,
                            recommendCount: 1,
                            recommendLevel: 1,
                            money: 1,
                            point: 1,
                            isAgent: 1
                        },
                        returnDocument: 'before'
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, options);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > login');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.loginLog = (id, nick, status, reason, reqIpaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        id: (0, modules_1.mongoSanitize)(id),
                        nick,
                        status,
                        reason,
                        ipaddress: reqIpaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('userLoginLogs').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > loginLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.updateToken = (id, token) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        id: (0, modules_1.mongoSanitize)(id)
                    };
                    const setQuery = {
                        $set: {
                            token: token
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > updateToken');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = UserService;
