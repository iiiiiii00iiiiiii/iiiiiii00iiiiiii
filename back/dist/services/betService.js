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
                        whatQuery.projection[betCart[0].betType] = 1;
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
        this.betBonus = (gameKindForBonus, betCount) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        type: gameKindForBonus,
                        folder: {
                            $lte: betCount
                        }
                    };
                    const whatQuery = {
                        projection: {
                            allowRate: 1,
                            bonusRate: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betBonus').find(findQuery, whatQuery).sort({ folder: -1 }).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betBonus');
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
                    if (config_1.default.db.id === 'napoli') {
                        delete findQuery.isAgent;
                    }
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
                        bonusRate: v.bonusRate,
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
        this.getMinigamesBetList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            gameKind: 1,
                            betAmount: 1,
                            betRate: 1,
                            betBenefit: 1,
                            betResult: 1,
                            rotation: 1,
                            round: 1,
                            betType: 1,
                            betSelect: 1,
                            regDateTime: 1
                        }
                    };
                    const sortQuery = {
                        _id: -1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betMinigame').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('betMinigame').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > getMinigamesBetList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getCasinoBetList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            userOID: 1,
                            userID: 1,
                            userNick: 1,
                            userGrade: 1,
                            productID: 1,
                            gameID: 1,
                            betAmount: 1,
                            betBenefit: 1,
                            betResult: 1,
                            regDateTime: 1
                        }
                    };
                    const sortQuery = {
                        _id: -1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betKplay').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('betKplay').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > getCasinoBetList');
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
                            $nin: ['sportsLive', 'sportsLiveKor']
                        },
                        betResult: 'I'
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
        this.countOfCancelToday = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(v.decoded._id),
                        betResult: 'C',
                        cancelDateTime: {
                            $gte: (0, modules_1.moment)().startOf('day').toDate(),
                            $lte: (0, modules_1.moment)().endOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > countOfCancelToday');
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
                            calcDateTime: new Date(),
                            cancelDateTime: new Date()
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
        this.minigamesBetDelete = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v._id),
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
                    r.data = yield pool.collection('betMinigame').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > minigamesBetDelete');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.casinoBetDelete = (v) => {
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
                    r.data = yield pool.collection('betKplay').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > casinoBetDelete');
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
        this.deleteMinigamesBetAll = (v) => {
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
                    r.data = yield pool.collection('betMinigame').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > deleteMinigamesBetAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteCasinoBetAll = (v) => {
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
                    r.data = yield pool.collection('betKplay').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > deleteCasinoBetAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getMinigameBetListRecent = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        deleteStatus: false,
                        regDateTime: {
                            $gte: (0, modules_1.moment)().subtract(7, 'day').toDate()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            gameKind: 1,
                            isAuto: 1,
                            betAmount: 1,
                            betRate: 1,
                            betBenefit: 1,
                            afterBetMoney: 1,
                            betResult: 1,
                            rotation: 1,
                            round: 1,
                            betType: 1,
                            betSelect: 1,
                            regDateTime: 1,
                            isFollow: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betMinigame').find(findQuery, whatQuery).sort({ _id: -1 }).limit(50).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > getMinigameBetListRecent');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betSwitch = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: v.categorySwitch
                    };
                    const whatQuery = {
                        projection: {
                            betStatus: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betSwitch');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.minigameInfo = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                let term = 0;
                if (v.betCart[0].gameKind === 'powerball') {
                    term = config_1.default.powerballTime;
                }
                else if (v.betCart[0].gameKind === 'powerladder') {
                    term = config_1.default.powerladderTime;
                }
                else if (v.betCart[0].gameKind === 'kenoladder') {
                    term = config_1.default.kenoladderTime;
                }
                else if (v.betCart[0].gameKind === 'boglePowerball') {
                    term = config_1.default.boglePowerballTime;
                }
                else if (v.betCart[0].gameKind === 'bogleladder') {
                    term = config_1.default.bogleladderTime;
                }
                else if (v.betCart[0].gameKind === 'googlePowerball1') {
                    term = config_1.default.googlePowerball1;
                }
                else if (v.betCart[0].gameKind === 'googlePowerball3') {
                    term = config_1.default.googlePowerball3;
                }
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v.betCart[0]._id),
                        gameDateTime: {
                            $gte: new Date((0, modules_1.moment)().add(term, "second").format('YYYY-MM-DD HH:mm:ss'))
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            gameType: 1,
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > minigameInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.previousBetAmount = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameOID: new db_1.ObjectID(v.resultMinigameInfo._id),
                        userOID: new db_1.ObjectID(v.decoded._id),
                        betType: v.betCart[0].betType
                    };
                    const whatQuery = {
                        _id: null,
                        betAmount: { $sum: '$betAmount' }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betMinigame').aggregate([{
                            $match: findQuery
                        },
                        {
                            $group: whatQuery
                        }
                    ]).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > previousBetAmount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betSubtractMinigame = (v) => {
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
                    if (config_1.default.db.id === 'napoli') {
                        delete findQuery.isAgent;
                    }
                    const setQuery = {
                        $inc: {
                            money: -v.betAmount,
                            'betHistory.betCount': 1,
                            'betHistory.betAmount': v.betAmount
                        }
                    };
                    setQuery.$inc[`minigamesBetHistory.${v.resultMinigameInfo.gameType}.count`] = 1;
                    setQuery.$inc[`minigamesBetHistory.${v.resultMinigameInfo.gameType}.amount`] = v.betAmount;
                    let optionsQuery = {
                        projection: {
                            isTest: 1,
                            isAgent: 1,
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
                    modules_1.logger.error('BetService > betSubtractMinigame');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betMinigame = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        userOID: new db_1.ObjectID(v.decoded._id),
                        userID: v.decoded.id,
                        userNick: v.decoded.nick,
                        userGrade: v.decoded.grade,
                        bankOwner: v.decoded.bankOwner,
                        recommendTree: v.resultBetSubtractMinigame.recommendTree,
                        gameType: 'minigame',
                        gameKind: v.gameKind,
                        isAuto: false,
                        isTest: v.resultBetSubtractMinigame.isTest,
                        betAmount: v.betAmount,
                        betRate: v.betRate,
                        betBenefit: v.betBenefit,
                        afterBetMoney: v.resultBetSubtractMinigame.money - v.betAmount,
                        betResult: 'I',
                        gameOID: new db_1.ObjectID(v.resultMinigameInfo._id),
                        rotation: v.resultMinigameInfo.rotation,
                        round: v.resultMinigameInfo.round,
                        betType: v.betCart[0].betType,
                        betSelect: v.betCart[0].betSelect,
                        betTopInfo: v.betTopInfo,
                        regDateTime: new Date(),
                        resultDateTime: null,
                        calcDateTime: null,
                        deleteStatus: false
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betMinigame').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > betMinigame');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setBetMinigame = (v) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(v.resultMinigameInfo._id)
                    };
                    const setQuery = {
                        $inc: {
                            [`bet.${v.betCart[0].betType}.amountOf${v.betCart[0].betSelect}`]: v.betAmount,
                            [`betKill.${v.betCart[0].betType}.amountOf${v.betCart[0].betSelect}`]: v.betTopInfo.betKillAmount
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > setBetMinigame');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setBetMoneyLog = (v) => {
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
                        recommendTree: v.resultBetSubtractMinigame.recommendTree,
                        before: v.resultBetSubtractMinigame.money,
                        process: v.betAmount,
                        after: v.resultBetSubtractMinigame.money - v.betAmount,
                        sortation: 'bet',
                        reason: '배팅',
                        adminOID: null,
                        adminID: null,
                        adminNick: null,
                        adminGrade: null,
                        regDateTime: new Date(),
                        deleteStatus: false,
                        gameOID: new db_1.ObjectID(v.resultMinigameInfo._id),
                        isTest: v.resultBetSubtractMinigame.isTest,
                        isAgent: v.resultBetSubtractMinigame.isAgent
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BetService > setBetMoneyLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = BetService;
