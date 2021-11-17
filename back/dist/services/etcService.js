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
                    const findQuery = {
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
                        setDate: new Date(setDate),
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
        this.getBeforeAttendanceCount = (startDate, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        regDateTime: {
                            $gte: (0, modules_1.moment)(startDate).startOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('attendance').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('EtcService > getBeforeAttendanceCount');
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
        this.maintenance = () => {
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
                    modules_1.logger.error('EtcService > getPopups');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = EtcService;
