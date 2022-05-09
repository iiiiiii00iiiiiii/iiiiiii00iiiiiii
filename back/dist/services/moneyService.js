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
class MoneyService {
    constructor() {
        // 입금
        this.getChargeList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false,
                        type: 'C'
                    };
                    const whatQuery = {
                        projection: {
                            status: 1,
                            money: 1,
                            moneyMethod: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('money').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > getChargeList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.checkIngCharge = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        status: 0,
                        type: 'C'
                    };
                    const whatQuery = {
                        projection: {
                            status: 1,
                            money: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > checkIngCharge');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setCharge = (userOID, userID, userNick, userGrade, userBank, userBankOwner, userBankAccount, isAgent, isTest, userRecommendTree, chargeAmount, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        status: 0,
                        type: 'C',
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        bank: userBank,
                        bankOwner: userBankOwner,
                        bankAccount: userBankAccount,
                        isAgent,
                        isTest,
                        recommendTree: userRecommendTree,
                        money: (0, modules_1.mongoSanitize)(chargeAmount),
                        deleteStatus: false,
                        ipaddress: ipaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setCharge');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.chargeAlarm = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'alarm'
                    };
                    const setQuery = {
                        $set: {
                            newCharge: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > chargeAlarm');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteCharge = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        status: {
                            $ne: 0
                        },
                        type: 'C',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteCharge');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteChargeAll = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        status: {
                            $ne: 0
                        },
                        type: 'C',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteChargeAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.chargeInformation = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        status: {
                            $ne: 0
                        },
                        type: 'C',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > chargeInformation');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setChargePent = (userOID, userID, userNick, userGrade, userBank, userBankOwner, userBankAccount, isAgent, isTest, userRecommendTree, memoShort, chargeAmount, moneyMethod, ipaddress, method) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        status: 0,
                        type: 'C',
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        bank: userBank,
                        bankOwner: userBankOwner,
                        bankAccount: userBankAccount,
                        isAgent,
                        isTest,
                        recommendTree: userRecommendTree,
                        money: (0, modules_1.mongoSanitize)(chargeAmount),
                        moneyMethod,
                        memoShort,
                        deleteStatus: false,
                        ipaddress: ipaddress,
                        regDateTime: new Date(),
                        method
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setChargePent');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        // 출금
        this.getExchangeList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false,
                        type: 'E'
                    };
                    const whatQuery = {
                        projection: {
                            status: 1,
                            money: 1,
                            regDateTime: 1,
                            moneyMethod: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('money').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > getExchangeList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setExchange = (userOID, userID, userNick, userGrade, userBank, userBankOwner, userBankAccount, isAgent, isTest, userRecommendTree, exchangeAmount, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        status: 0,
                        type: 'E',
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        bank: userBank,
                        bankOwner: userBankOwner,
                        bankAccount: userBankAccount,
                        isAgent,
                        isTest,
                        recommendTree: userRecommendTree,
                        money: (0, modules_1.mongoSanitize)(exchangeAmount),
                        deleteStatus: false,
                        ipaddress: ipaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setExchange');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setExchangeLog = (_id, userOID, userID, userNick, userGrade, userBankOwner, isAgent, isTest, userRecommendTree, money, exchangeAmount) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        userID: userID,
                        userNick: userNick,
                        userGrade: userGrade,
                        bankOwner: userBankOwner,
                        isTest,
                        isAgent,
                        recommendTree: userRecommendTree,
                        before: Math.trunc(money),
                        process: Math.trunc(-exchangeAmount),
                        after: Math.trunc(money) - Math.trunc(exchangeAmount),
                        sortation: 'exchange',
                        reason: '환전',
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        deleteStatus: false,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setExchangeLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setExchangeLogPent = (_id, userOID, userID, userNick, userGrade, userBankOwner, isAgent, isTest, userRecommendTree, money, minigameMoney, exchangeAmount, moneyMethod, method) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        userID: userID,
                        userNick: userNick,
                        userGrade: userGrade,
                        bankOwner: userBankOwner,
                        isTest,
                        isAgent,
                        recommendTree: userRecommendTree,
                        before: moneyMethod === 'money' ? Math.trunc(money) : Math.trunc(minigameMoney),
                        process: Math.trunc(-exchangeAmount),
                        after: moneyMethod === 'money' ? Math.trunc(money) - Math.trunc(exchangeAmount) : Math.trunc(minigameMoney) - Math.trunc(exchangeAmount),
                        sortation: 'exchange',
                        reason: moneyMethod === 'money' ? '환전-스포츠 머니' : '환전-파워볼 머니',
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        deleteStatus: false,
                        regDateTime: new Date(),
                        method
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setExchangeLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.exchangeAlarm = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'alarm'
                    };
                    const setQuery = {
                        $set: {
                            newExchange: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > exchangeAlarm');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteExchange = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        status: {
                            $ne: 0
                        },
                        type: 'E',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteExchange');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteExchangeAll = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        status: {
                            $ne: 0
                        },
                        type: 'E',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteExchangeAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setExchangePent = (userOID, userID, userNick, userGrade, userBank, userBankOwner, userBankAccount, isAgent, isTest, userRecommendTree, memoShort, exchangeAmount, moneyMethod, ipaddress, method) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        status: 0,
                        type: 'E',
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        bank: userBank,
                        bankOwner: userBankOwner,
                        bankAccount: userBankAccount,
                        isAgent,
                        isTest,
                        recommendTree: userRecommendTree,
                        money: (0, modules_1.mongoSanitize)(exchangeAmount),
                        moneyMethod,
                        memoShort,
                        deleteStatus: false,
                        ipaddress: ipaddress,
                        regDateTime: new Date(),
                        method
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('money').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > setExchangePent');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        // 포인트
        this.getPointList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false,
                        sortation: 'PointChange'
                    };
                    const whatQuery = {
                        projection: {
                            before: 1,
                            process: 1,
                            after: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('moneyLog').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > getPointList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.exchangePoint = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID),
                        point: {
                            $gt: 0
                        }
                    };
                    const setQuery = [
                        {
                            $set: {
                                money: {
                                    $sum: ['$money', '$point']
                                },
                                point: 0
                            }
                        }
                    ];
                    const optionsQuery = {
                        projection: {
                            id: 1,
                            nick: 1,
                            grade: 1,
                            bankOwner: 1,
                            recommendTree: 1,
                            isAgent: 1,
                            isTest: 1,
                            money: 1,
                            point: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > exchangePoint');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.exchangePointLog = (userOID, userID, userNick, userGrade, userBankOwner, isAgent, isTest, userRecommendTree, money, point) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: null,
                        userOID: new db_1.ObjectID(userOID),
                        userID: userID,
                        userNick: userNick,
                        userGrade: userGrade,
                        bankOwner: userBankOwner,
                        recommendTree: userRecommendTree,
                        before: money,
                        process: point,
                        after: money + point,
                        sortation: 'PointChange',
                        reason: '포인트 전환',
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        regDateTime: new Date(),
                        deleteStatus: false,
                        isAgent,
                        isTest
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > exchangePointLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deletePoint = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        userOID: new db_1.ObjectID(userOID),
                        sortation: 'PointChange',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deletePoint');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deletePointAll = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        sortation: 'PointChange',
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deletePointAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        // 출석
        this.addPointForAttendance = (userOID, point, attendanceDateTime) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID)
                    };
                    let setQuery = {
                        $inc: {
                            point
                        }
                    };
                    if (attendanceDateTime !== null) {
                        setQuery.$set = {
                            attendanceDateTime
                        };
                    }
                    const optionsQuery = {
                        projection: {
                            point: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > addPointForAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.addMoneyForAttendanceLog = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, process, point, isTest, isAgent, daily) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: null,
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        userBankOwner,
                        userRecommendTree,
                        before: point,
                        process,
                        after: point + process,
                        sortation: 'daily',
                        reason: `출석 포인트-${daily}일`,
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        deleteStatus: false,
                        regDateTime: new Date(),
                        isTest,
                        isAgent
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > addMoneyForAttendanceLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        // home
        this.getTopExchange = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        regDateTime: {
                            $gte: (0, modules_1.moment)().subtract(30, 'day').toDate()
                        },
                        type: 'E'
                    };
                    const whatQuery = {
                        projection: {
                            type: 1,
                            id: 1,
                            amount: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('fake').find(findQuery, whatQuery).sort({ amount: -1 }).limit(30).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > getTopExchange');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFake = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        regDateTime: {
                            $gte: (0, modules_1.moment)().subtract(30, 'day').toDate()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            type: 1,
                            id: 1,
                            amount: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('fake').find(findQuery, whatQuery).sort({ _id: -1 }).limit(30).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > getFake');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = MoneyService;
