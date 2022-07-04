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
class EtcService {
    constructor() {
        this.getConfigInfo = (category, getKeys) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                if (getKeys.length === 0) {
                    r.error = 'Empty getKeys';
                    resolve(r);
                    return;
                }
                try {
                    let findQuery = {
                        category
                    };
                    let whatQuery = {
                        projection: {}
                    };
                    for (let i = 0; i < getKeys.length; i++) {
                        whatQuery.projection[getKeys[i]] = 1;
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getConfigInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getConfigInfo1Folder = (getKeys) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                if (getKeys.length === 0) {
                    r.error = 'Empty getKeys';
                    resolve(r);
                    return;
                }
                try {
                    let findQuery = {
                        category: 'sportsBet1Folder'
                    };
                    let whatQuery = {
                        projection: {}
                    };
                    for (let i = 0; i < getKeys.length; i++) {
                        whatQuery.projection[getKeys[i]] = 1;
                    }
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getConfigInfo1Folder');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getConfigAttendance = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {};
                    let whatQuery = {
                        projection: {}
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('daily').find(findQuery).sort({ category: -1 }).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getConfigAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setAttendance = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, setDate) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        userID,
                        userNick,
                        userGrade,
                        userBankOwner,
                        userRecommendTree,
                        setDate: (0, modules_1.moment)(setDate).startOf('day').toDate(),
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > setAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getBeforeAttendance = (startDate, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        setDate: {
                            $gte: (0, modules_1.moment)(startDate).startOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').find(findQuery).sort({ setDate: -1 }).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getBeforeAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getYesterdayAttendance = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        setDate: (0, modules_1.moment)().subtract(1, 'day').startOf('day').toDate()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').findOne(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getYesterdayAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.setUpdateAttendance = (_id, isLast) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id)
                    };
                    const setQuery = {
                        $set: {
                            isLast
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > setUpdateAttendance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getBeforeAttendanceOne = (startDate, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        // setDate: moment(startDate).startOf('day').toDate()
                        setDate: {
                            $gt: (0, modules_1.moment)(startDate).startOf('day').toDate(),
                            $lt: (0, modules_1.moment)(startDate).endOf('day').toDate()
                        }
                    };
                    // console.log(findQuery)
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').findOne(findQuery);
                    // console.log(r.data)
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getBeforeAttendanceOne');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPopups = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        status: true,
                        startDateTime: {
                            $lte: new Date()
                        },
                        endDateTime: {
                            $gte: new Date()
                        }
                    };
                    const whatQuery = {
                        projection: {
                            images: 1,
                            location: 1,
                            popupSize: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('popup').find(findQuery, whatQuery).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getPopups');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getMaintenance = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'maintenance'
                    };
                    const whatQuery = {
                        projection: {
                            startDateTime: 1,
                            endDateTime: 1,
                            content: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getMaintenance');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getShortNotice = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'notice'
                    };
                    const whatQuery = {
                        projection: {
                            content: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getShortNotice');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFriendsList = (page, _id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        'recommendTree._id': new db_1.ObjectID(_id),
                        status: 1
                    };
                    const whatQuery = {
                        projection: {
                            id: 1,
                            nick: 1,
                            totalCharge: 1,
                            totalExchange: 1,
                            lastLoginDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('users').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('users').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFriendsList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getHomeMatch = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        resultStatus: false,
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true
                    };
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameDateTime: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).limit(4).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getHomeMatch');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getHomeLive = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        resultStatus: false,
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        onAir: {
                            $in: ['ready', 'onAir']
                        },
                        sport: {
                            $in: ['Basketball', 'Baseball']
                        }
                    };
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameDateTime: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsLive').find(findQuery, whatQuery).limit(4).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getHomeLive');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = EtcService;
