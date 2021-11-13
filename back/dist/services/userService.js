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
        this.checkDuplicate = (id, nick) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        $or: [
                            { id: (0, modules_1.mongoSanitize)(id) },
                            { nick: (0, modules_1.mongoSanitize)(nick) }
                        ]
                    };
                    const whatQuery = {
                        projection: {
                            id: 1,
                            nick: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > checkDuplicate');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.recommendCode = (recommendCode) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        status: 1,
                        recommendStatus: true,
                        availableRecommendCode: (0, modules_1.mongoSanitize)(recommendCode)
                    };
                    const setQuery = {
                        $inc: {
                            recommendCount: 1
                        }
                    };
                    const options = {
                        projection: {
                            id: 1,
                            nick: 1,
                            grade: 1,
                            recommendTree: 1,
                            recommendLevel: 1,
                            isAgent: 1,
                            salary: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, options);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > recommendCode');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.join = (id, password, passwordExchange, nick, cell, bank, bankAccount, bankOwner, recommendTree, recommendLevel, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        id: (0, modules_1.mongoSanitize)(id),
                        password: modules_1.crypto.createHash('sha512').update(password).digest('base64'),
                        passwordExchange: modules_1.crypto.createHash('sha512').update(passwordExchange).digest('base64'),
                        apiKey: null,
                        nick: (0, modules_1.mongoSanitize)(nick),
                        cell: (0, modules_1.mongoSanitize)(cell),
                        bank: (0, modules_1.mongoSanitize)(bank),
                        bankAccount: (0, modules_1.mongoSanitize)(bankAccount),
                        bankOwner: (0, modules_1.mongoSanitize)(bankOwner),
                        grade: 1,
                        status: 0,
                        betStatus: true,
                        isTest: false,
                        firstBonusStatus: true,
                        everyTimeBonusStatus: true,
                        recommendStatus: true,
                        recommendCount: 0,
                        recommendTree: recommendTree,
                        recommendLevel: recommendLevel,
                        availableRecommendCode: (0, modules_1.mongoSanitize)(id),
                        money: 0,
                        casinoMoney: 0,
                        point: 0,
                        totalCharge: 0,
                        totalExchange: 0,
                        memo: null,
                        memoShort: null,
                        walletID: null,
                        sportsConfig: {
                            bet1FolderStatus: true,
                            bet2FolderStatus: true
                        },
                        isAgent: false,
                        topConfig: {
                            powerball: {
                                POEStatus: true,
                                POERate: 100,
                                PUOStatus: true,
                                PUORate: 100,
                                NOEStatus: true,
                                NOERate: 100,
                                NUOStatus: true,
                                NUORate: 100,
                                PCOMBOStatus: true,
                                PCOMBORate: 100,
                                NCOMBOStatus: true,
                                NCOMBORate: 100,
                                BMSStatus: true,
                                BMSRate: 100,
                                BMSCOMBOStatus: true,
                                BMSCOMBORate: 100,
                                RNAPOEStatus: true,
                                RNAPOERate: 100,
                                RNCOMBOStatus: true,
                                RNCOMBORate: 100
                            },
                            powerladder: {
                                LRStatus: true,
                                LRRate: 100,
                                TFStatus: true,
                                TFRate: 100,
                                OEStatus: true,
                                OERate: 100,
                                COMBOStatus: true,
                                COMBORate: 100
                            },
                            kenoladder: {
                                LRStatus: true,
                                LRRate: 100,
                                TFStatus: true,
                                TFRate: 100,
                                OEStatus: true,
                                OERate: 100,
                                COMBOStatus: true,
                                COMBORate: 100
                            },
                            boglePowerball: {
                                POEStatus: true,
                                POERate: 100,
                                PUOStatus: true,
                                PUORate: 100,
                                NOEStatus: true,
                                NOERate: 100,
                                NUOStatus: true,
                                NUORate: 100,
                                PCOMBOStatus: true,
                                PCOMBORate: 100,
                                NCOMBOStatus: true,
                                NCOMBORate: 100,
                                BMSStatus: true,
                                BMSRate: 100,
                                BMSCOMBOStatus: true,
                                BMSCOMBORate: 100,
                                RNAPOEStatus: true,
                                RNAPOERate: 100,
                                RNCOMBOStatus: true,
                                RNCOMBORate: 100
                            },
                            bogleladder: {
                                LRStatus: true,
                                LRRate: 100,
                                TFStatus: true,
                                TFRate: 100,
                                OEStatus: true,
                                OERate: 100,
                                COMBOStatus: true,
                                COMBORate: 100
                            },
                            googlePowerball1: {
                                POEStatus: true,
                                POERate: 100,
                                PUOStatus: true,
                                PUORate: 100,
                                NOEStatus: true,
                                NOERate: 100,
                                NUOStatus: true,
                                NUORate: 100,
                                PCOMBOStatus: true,
                                PCOMBORate: 100,
                                NCOMBOStatus: true,
                                NCOMBORate: 100,
                                BMSStatus: true,
                                BMSRate: 100,
                                BMSCOMBOStatus: true,
                                BMSCOMBORate: 100,
                                RNAPOEStatus: true,
                                RNAPOERate: 100,
                                RNCOMBOStatus: true,
                                RNCOMBORate: 100
                            },
                            googlePowerball3: {
                                POEStatus: true,
                                POERate: 100,
                                PUOStatus: true,
                                PUORate: 100,
                                NOEStatus: true,
                                NOERate: 100,
                                NUOStatus: true,
                                NUORate: 100,
                                PCOMBOStatus: true,
                                PCOMBORate: 100,
                                NCOMBOStatus: true,
                                NCOMBORate: 100,
                                BMSStatus: true,
                                BMSRate: 100,
                                BMSCOMBOStatus: true,
                                BMSCOMBORate: 100,
                                RNAPOEStatus: true,
                                RNAPOERate: 100,
                                RNCOMBOStatus: true,
                                RNCOMBORate: 100
                            }
                        },
                        betHistory: {
                            betCount: 0,
                            betAmount: 0,
                            betWinCount: 0,
                            betWinAmount: 0,
                            betLoseCount: 0,
                            betLoseAmount: 0
                        },
                        sportsBetHistory: {
                            folder1: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder2: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder3: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0,
                                winRate: 0
                            },
                            folder4: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder5: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder6: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder7: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder8: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder9: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            folder10: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            }
                        },
                        minigamesBetHistory: {
                            powerball: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            powerladder: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            kenoladder: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            boglePowerball: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            bogleladder: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            googlePowerball1: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            googlePowerball3: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            }
                        },
                        regIpaddress: ipaddress,
                        regDateTime: new Date(),
                        loginCount: 0,
                        lastLoginDateTime: null,
                        lastLoginIpaddress: null,
                        lastLoginDevice: null,
                        location: null,
                        lastAccessIpaddress: null,
                        lastAccessDateTime: null,
                        token: null
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > join');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.joinAlarm = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'alarm'
                    };
                    const setQuery = {
                        $set: {
                            newUsers: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > joinAlarm');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getUserInfo = (userOID, getKeys) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID)
                    };
                    let whatQuery = {
                        projection: {}
                    };
                    for (let i = 0; i < getKeys.length; i++) {
                        whatQuery.projection[getKeys[i]] = 1;
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > getUserInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.subtractUserMoney = (userOID, exchangeAmount) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID),
                        money: {
                            $gte: Math.trunc((0, modules_1.mongoSanitize)(exchangeAmount))
                        }
                    };
                    const setQuery = {
                        $inc: {
                            money: -Math.trunc((0, modules_1.mongoSanitize)(exchangeAmount))
                        }
                    };
                    const optionsQuery = {
                        projection: {
                            money: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > subtractUserMoney');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.pointLog = (userOID, exchangeAmount) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID),
                        money: {
                            $gte: Math.trunc((0, modules_1.mongoSanitize)(exchangeAmount))
                        }
                    };
                    const setQuery = {
                        $inc: {
                            money: -Math.trunc((0, modules_1.mongoSanitize)(exchangeAmount))
                        }
                    };
                    const optionsQuery = {
                        projection: {
                            money: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > subtractUserMoney');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = UserService;
