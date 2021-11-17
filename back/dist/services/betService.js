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
class BetService {
    constructor() {
        this.betMinMax = (category, betGameType, betCart, userGrade) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: category,
                    };
                    let whatQuery = {
                        projection: {}
                    };
                    if (betGameType === 'minigames') {
                        whatQuery.projection[betCart[0].type] = 1;
                    }
                    else {
                        whatQuery.projection[`lv${userGrade}`] = 1;
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betMinMax');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.folderInfo = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(userOID)
                    };
                    const whatQuery = {
                        projection: {
                            sportsConfig: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > folderInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsInfo = (betGameType, betCart) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                let ids = [];
                for (let i = 0; i < betCart.length; i++) {
                    ids.push(new db_1.ObjectID(betCart[i]._id));
                }
                try {
                    const findQuery = {
                        _id: {
                            $in: ids
                        },
                        resultStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            leagueKor: 1,
                            gameDateTime: 1,
                            showStatus: 1,
                            showConfig: 1,
                            games: 1,
                            resultData: 1,
                            resultStatus: 1,
                            rollbackStatus: 1,
                            deleteStatus: 1
                        }
                    };
                    let collection = 'sportsPrematch';
                    if (betGameType === 'sportsLive' || betGameType === 'sportsLiveKor') {
                        collection = 'sportsLive';
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection(collection).find(findQuery, whatQuery).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betSubtractSports = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v.decoded._id),
                        money: {
                            $gte: v.betAmount
                        },
                        status: 1,
                        betStatus: true,
                        isAgent: false
                    };
                    let betLimitCount = v.betCount;
                    if (betLimitCount > 10)
                        betLimitCount = 10;
                    let setQuery = {
                        $inc: {
                            money: -v.betAmount,
                            'betHistory.betCount': 1,
                            'betHistory.betAmount': parseInt(v.betAmount)
                        }
                    };
                    setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.count`] = 1;
                    setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.amount`] = parseInt(v.betAmount);
                    const optionsQuery = {
                        projection: {
                            isTest: 1,
                            recommendTree: 1,
                            money: 1,
                            topConfig: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betSubtractSports');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betSports = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        userOID: new db_1.ObjectID(v.decoded._id),
                        userID: v.decoded.id,
                        userNick: v.decoded.nick,
                        userGrade: v.decoded.grade,
                        bankOwner: v.decoded.bankOwner,
                        recommendTree: v.resultBetSubtractSports.recommendTree,
                        gameType: v.gameKind,
                        isAuto: false,
                        isTest: v.resultBetSubtractSports.isTest,
                        betAmount: v.betAmount,
                        betRate: v.betRate,
                        betBenefit: v.betBenefit,
                        afterBetMoney: v.resultBetSubtractSports.money - v.betAmount,
                        betResult: 'I',
                        betCount: parseInt(v.betCount),
                        detail: v.betCart,
                        calcStatus: false,
                        regDateTime: new Date(),
                        resultDateTime: null,
                        calcDateTime: null,
                        deleteStatus: false
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betSports');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setBetSports = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                let ids = [];
                for (let i = 0; i < v.betCart.length; i++) {
                    ids.push(v.betCart[i]._id);
                }
                try {
                    const findQuery = {
                        _id: {
                            $in: ids
                        }
                    };
                    const setQuery = {
                        $inc: {
                            betAmount: parseInt(v.betAmount),
                            betCount: 1,
                            betTotalCount: 1
                        }
                    };
                    let collection = 'sportsPrematch';
                    if (v.betGameType === 'sportsLive' || v.betGameType === 'sportsLiveKor') {
                        collection = 'sportsLive';
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection(collection).updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > setBetSports');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setBetMoneyLogSports = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: null,
                        userOID: new db_1.ObjectID(v.decoded._id),
                        userID: v.decoded.id,
                        userNick: v.decoded.nick,
                        userGrade: v.decoded.grade,
                        bankOwner: v.decoded.bankOwner,
                        recommendTree: v.resultBetSubtractSports.recommendTree,
                        before: v.resultBetSubtractSports.money,
                        process: -v.betAmount,
                        after: v.resultBetSubtractSports.money - v.betAmount,
                        sortation: 'bet',
                        reason: `배팅-${v.gameKind}`,
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        regDateTime: new Date(),
                        deleteStatus: false,
                        cartOID: new db_1.ObjectID(v.cartOID),
                        isTest: v.resultBetSubtractSports.isTest
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > setBetMoneyLogSports');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getSportsBetList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            gameType: 1,
                            betAmount: 1,
                            betRate: 1,
                            betBenefit: 1,
                            betResult: 1,
                            betCount: 1,
                            detail: 1,
                            regDateTime: 1,
                            bonusRate: 1
                        }
                    };
                    const sortQuery = {
                        _id: -1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('betSports').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > getSportsBetList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsCart = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v._id),
                        gameType: {
                            $ne: 'sportsLive'
                        },
                        betResult: 'I',
                        regDateTime: {
                            $gt: (0, modules_1.moment)().subtract(10, 'minute').toDate()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            gameType: 1,
                            betAmount: 1,
                            detail: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsCart');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsCartCancel = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v._id),
                        gameType: {
                            $ne: 'sportsLive'
                        },
                        betResult: 'I',
                        regDateTime: {
                            $gt: (0, modules_1.moment)().subtract(10, 'minute').toDate()
                        }
                    };
                    const setQuery = {
                        $set: {
                            betResult: 'C',
                            'detail.$[elem].betResult': 'C',
                            calcStatus: true,
                            calcDateTime: new Date()
                        }
                    };
                    const options = {
                        arrayFilters: [{ 'elem.betResult': { $ne: 'C' } }]
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').updateOne(findQuery, setQuery, options);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsCartCancel');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.subtractBetSports = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                let ids = [];
                for (let i = 0; i < v.resultSportsCart.detail.length; i++) {
                    ids.push(v.resultSportsCart.detail[i]._id);
                }
                try {
                    const findQuery = {
                        _id: {
                            $in: ids
                        }
                    };
                    const setQuery = {
                        $inc: {
                            betAmount: -parseInt(v.resultSportsCart.betAmount),
                            betCount: -1,
                            totalBetCount: -1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > subtractBetSports');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsCartCancelUpdateUser = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v.decoded._id)
                    };
                    let betLimitCount = v.resultSportsCart.detail.length;
                    if (betLimitCount > 10)
                        betLimitCount = 10;
                    let setQuery = {
                        $inc: {
                            money: v.resultSportsCart.betAmount,
                            'betHistory.betCount': -1,
                            'betHistory.betAmount': -v.resultSportsCart.betAmount
                        }
                    };
                    setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.count`] = -1;
                    setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.amount`] = -v.resultSportsCart.betAmount;
                    const optionsQuery = {
                        projection: {
                            recommendTree: 1,
                            money: 1,
                            topConfig: 1,
                            isTest: 1,
                            isAgent: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsCartCancelUpdateUser');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsCartCancelMoneyLog = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        moneyOID: null,
                        userOID: new db_1.ObjectID(v.decoded._id),
                        userID: v.decoded.id,
                        userNick: v.decoded.nick,
                        userGrade: v.decoded.grade,
                        bankOwner: v.decoded.bankOwner,
                        recommendTree: v.resultSportsCartCancelUpdateUser.recommendTree,
                        before: v.resultSportsCartCancelUpdateUser.money,
                        process: v.resultSportsCart.betAmount,
                        after: v.resultSportsCartCancelUpdateUser.money + v.resultSportsCart.betAmount,
                        sortation: 'betCancel',
                        reason: `배팅취소-${v.resultSportsCart.gameType}`,
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        regDateTime: new Date(),
                        deleteStatus: false,
                        cartOID: new db_1.ObjectID(v.resultSportsCart._id),
                        isTest: v.resultSportsCartCancelUpdateUser.isTest,
                        isAgent: v.resultSportsCartCancelUpdateUser.isAgent
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsCartCancelMoneyLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.sportsBetDelete = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v._id),
                        userOID: new db_1.ObjectID(v.decoded._id)
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > sportsBetDelete');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteSportsBetAll = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(v.decoded._id),
                        betResult: {
                            $ne: 'I'
                        }
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > deleteSportsBetAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = BetService;
