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
                            isAgent: 1,
                            seq: 1
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
        this.getSeq = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'userCounter'
                    };
                    const setQuery = {
                        $inc: {
                            counter: 1
                        }
                    };
                    const options = {
                        projection: {
                            counter: 1
                        },
                        returnDocument: 'after'
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOneAndUpdate(findQuery, setQuery, options);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > getSeq');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.updateSeq = (userID, counter) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        id: (0, modules_1.mongoSanitize)(userID)
                    };
                    const setQuery = {
                        $set: {
                            kplayUserID: null,
                            kplayUserSeq: null,
                            seq: counter
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > updateSeq');
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
        this.join = (id, password, passwordExchange, nick, cell, bank, bankAccount, bankOwner, recommendTree, recommendLevel, ipaddress, calcType) => {
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
                        salary: {
                            calcType,
                            incomeRate: 0,
                            sport: {
                                folder1: 0,
                                folder2: 0,
                                folder3: 0,
                                folder4: 0,
                                folder5: 0,
                                folder6: 0,
                                folder7: 0,
                                folder8: 0,
                                folder9: 0,
                                folder10: 0
                            },
                            cross: {
                                folder1: 0,
                                folder2: 0,
                                folder3: 0,
                                folder4: 0,
                                folder5: 0,
                                folder6: 0,
                                folder7: 0,
                                folder8: 0,
                                folder9: 0,
                                folder10: 0
                            },
                            special: {
                                folder1: 0,
                                folder2: 0,
                                folder3: 0,
                                folder4: 0,
                                folder5: 0,
                                folder6: 0,
                                folder7: 0,
                                folder8: 0,
                                folder9: 0,
                                folder10: 0
                            },
                            live: {
                                folder1: 0,
                                folder2: 0,
                                folder3: 0,
                                folder4: 0,
                                folder5: 0,
                                folder6: 0,
                                folder7: 0,
                                folder8: 0,
                                folder9: 0,
                                folder10: 0
                            },
                            liveKor: {
                                folder1: 0,
                                folder2: 0,
                                folder3: 0,
                                folder4: 0,
                                folder5: 0,
                                folder6: 0,
                                folder7: 0,
                                folder8: 0,
                                folder9: 0,
                                folder10: 0
                            },
                            powerball: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            powerladder: {
                                OERate: 0,
                                LRRate: 0,
                                TFRate: 0,
                                COMBORate: 0,
                                AutoOERate: 0,
                                AutoLRRate: 0,
                                AutoTFRate: 0,
                                AutoCOMBORate: 0
                            },
                            kenoladder: {
                                OERate: 0,
                                LRRate: 0,
                                TFRate: 0,
                                COMBORate: 0,
                                AutoOERate: 0,
                                AutoLRRate: 0,
                                AutoTFRate: 0,
                                AutoCOMBORate: 0
                            },
                            boglePowerball: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            bogleladder: {
                                OERate: 0,
                                LRRate: 0,
                                TFRate: 0,
                                COMBORate: 0,
                                AutoOERate: 0,
                                AutoLRRate: 0,
                                AutoTFRate: 0,
                                AutoCOMBORate: 0
                            },
                            googlePowerball1: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            googlePowerball3: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            coinPowerball: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            coinPowerball3: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            eosPowerball: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            eosPowerball1: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            eosPowerball3: {
                                POERate: 0,
                                PUORate: 0,
                                NOERate: 0,
                                NUORate: 0,
                                PCOMBORate: 0,
                                NCOMBORate: 0,
                                BMSRate: 0,
                                BMSCOMBORate: 0,
                                AutoPOERate: 0,
                                AutoPUORate: 0,
                                AutoNOERate: 0,
                                AutoNUORate: 0,
                                AutoPCOMBORate: 0,
                                AutoNCOMBORate: 0,
                                AutoBMSRate: 0,
                                AutoBMSCOMBORate: 0
                            },
                            speedladder: {
                                OERate: 0,
                                LRRate: 0,
                                TFRate: 0,
                                COMBORate: 0,
                                AutoOERate: 0,
                                AutoLRRate: 0,
                                AutoTFRate: 0,
                                AutoCOMBORate: 0
                            },
                            casinoRate: 0,
                            casinoWinLoseRate: 0,
                            slotsRate: 0,
                            slotsWinLoseRate: 0
                        },
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
                            },
                            eosPowerball1: {
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
                            eosPowerball3: {
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
                            eosPowerball: {
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
                            coinPowerball3: {
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
                            coinPowerball: {
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
                            speedladder: {
                                LRStatus: true,
                                LRRate: 100,
                                TFStatus: true,
                                TFRate: 100,
                                OEStatus: true,
                                OERate: 100,
                                COMBOStatus: true,
                                COMBORate: 100
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
                            },
                            eosPowerball1: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            eosPowerball3: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            eosPowerball: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            coinPowerball3: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            coinPowerball: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            },
                            speedladder: {
                                count: 0,
                                amount: 0,
                                winCount: 0,
                                winAmount: 0
                            }
                        },
                        avg: {
                            totalChargeAmount: 0,
                            totalChargeCount: 0,
                            avgChargeAmount: 0,
                            totalExchangeAmount: 0,
                            totalExchangeCount: 0,
                            avgExchangeAmount: 0
                        },
                        isJoinCoin: false,
                        coinId: '',
                        coinPassword: '',
                        firstBonusStatus: false,
                        firstBonusPersonal: false,
                        firstBonusRate: 0,
                        firstBonusMin: 0,
                        firstBonusMax: 0,
                        everyTimeBonusStatus: false,
                        everyTimeBonusPersonal: false,
                        everyTimeBonusRate: 0,
                        everyTimeBonusMin: 0,
                        everyTimeBonusMax: 0,
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
        this.editUser = (userOID, passwordNow, password, passwordExchange) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID),
                        password: modules_1.crypto.createHash('sha512').update(passwordNow).digest('base64')
                    };
                    let setQuery = {
                        $set: {
                            password: modules_1.crypto.createHash('sha512').update(password).digest('base64')
                        }
                    };
                    if (passwordExchange) {
                        setQuery.$set.passwordExchange = modules_1.crypto.createHash('sha512').update(passwordExchange).digest('base64');
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > editUser');
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
        this.getUserInfo = (userOID, getKeys, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID)
                    };
                    const setQuery = {
                        $set: {
                            lastAccessIpaddress: ipaddress,
                            lastAccessDateTime: new Date()
                        }
                    };
                    let whatQuery = {
                        projection: {}
                    };
                    for (let i = 0; i < getKeys.length; i++) {
                        whatQuery.projection[getKeys[i]] = 1;
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    r.data = r.data.value;
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
        this.getAttendance = (userOID, month) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        setDate: {
                            $gte: (0, modules_1.moment)(month).startOf('month').toDate(),
                            $lte: (0, modules_1.moment)(month).endOf('month').toDate()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            setDate: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').find(findQuery, whatQuery).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > getAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getAttendanceTodayCount = (userOID, setDate) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        setDate: new Date(setDate)
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > getAttendanceTodayCount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.chargeToday = (userOID, setDate) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        type: 'C',
                        status: 1,
                        regDateTime: {
                            $gte: (0, modules_1.moment)(setDate).startOf('day').toDate(),
                            $lte: (0, modules_1.moment)(setDate).endOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').aggregate([
                        { $match: findQuery },
                        { $group: {
                                _id: null,
                                totalMoney: { $sum: '$money' }
                            } }
                    ]).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > chargeToday');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.checkDToken = (userOID, dToken) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID),
                        token: dToken,
                        status: 1
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('UserService > checkDToken');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = UserService;
