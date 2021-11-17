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
class BoardService {
    constructor() {
        this.getDashboard = (n) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: {}, count: null };
                try {
                    const findQuery = {
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data.notice = yield pool.collection('boardNotice').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray();
                    r.data.event = yield pool.collection('boardEvents').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray();
                    r.data.faq = yield pool.collection('boardFAQ').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getDashboard');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getNoticeList = (page) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardNotice').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardNotice').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getNoticeList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getNoticeDetail = (_id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $inc: {
                            hit: 1
                        }
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            content: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardNotice').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getNoticeDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFaqList = (page) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFAQ').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardFAQ').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFaqList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFaqDetail = (_id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $inc: {
                            hit: 1
                        }
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            content: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFAQ').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFaqDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getEventList = (page) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardEvents').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardEvents').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getEventList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getEventDetail = (_id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $inc: {
                            hit: 1
                        }
                    };
                    const whatQuery = {
                        projection: {
                            header: 1,
                            headerColor: 1,
                            title: 1,
                            titleColor: 1,
                            content: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardEvents').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getEventDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getHelpList = (page, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        writerOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            title: 1,
                            content: 1,
                            answerStatus: 1,
                            readAnswerStatus: 1,
                            regDateTime: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardHelp').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getHelpList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getHelpDetail = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        writerOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            readAnswerStatus: true
                        },
                        $inc: {
                            hit: 1
                        }
                    };
                    const whatQuery = {
                        projection: {
                            title: 1,
                            content: 1,
                            answerStatus: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getHelpDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getHelpAnswer = (_id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        boardOID: new db_1.ObjectID(_id),
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            comment: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardComments').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getHelpAnswer');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.help = (title, content, userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, isAgent, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        title: (0, modules_1.mongoSanitize)(title),
                        content: (0, modules_1.mongoSanitize)(content),
                        commentsCount: 0,
                        writerOID: new db_1.ObjectID(userOID),
                        userRecommendTree,
                        writerID: userID,
                        writerNick: userNick,
                        writerGrade: userGrade,
                        bankOwner: userBankOwner,
                        hit: 0,
                        answerStatus: false,
                        check: false,
                        readAnswerStatus: false,
                        deleteStatus: false,
                        isAgent,
                        ipaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > help');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.helpAlarm = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'alarm'
                    };
                    const setQuery = {
                        $set: {
                            newHelp: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > helpAlarm');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.chargeInformation = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, isAgent, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        title: `[${userNick}] 계좌문의`,
                        content: `${userNick}님 계좌문의 입니다.`,
                        commentsCount: 0,
                        writerOID: new db_1.ObjectID(userOID),
                        userRecommendTree,
                        writerID: userID,
                        writerNick: userNick,
                        writerGrade: userGrade,
                        bankOwner: userBankOwner,
                        hit: 0,
                        answerStatus: false,
                        check: false,
                        readAnswerStatus: false,
                        deleteStatus: false,
                        isAgent,
                        ipaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > chargeInformation');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.autoAnswer = (boardOID, comment) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        boardOID: new db_1.ObjectID(boardOID),
                        which: 'help',
                        isMember: false,
                        writerOID: new db_1.ObjectID('5f09fa5500badbc8621d57dc'),
                        writerID: 'master',
                        writerNick: '마스터',
                        writerGrade: 0,
                        comment,
                        deleteStatus: false,
                        ipaddress: '127.0.0.1',
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardComments').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > autoAnswer');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.updateHelpForAnswer = (boardOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(boardOID)
                    };
                    const setQuery = {
                        $set: {
                            commentsCount: 1,
                            answerStatus: true,
                            check: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > updateHelpForAnswer');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteHelp = (_id, userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(_id),
                        writerOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteHelp');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.deleteHelpAll = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        writerOID: new db_1.ObjectID(userOID),
                        deleteStatus: false
                    };
                    const setQuery = {
                        $set: {
                            deleteStatus: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').updateMany(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > deleteHelpAll');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.helpCount = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        writerOID: new db_1.ObjectID(userOID),
                        answerStatus: true,
                        readAnswerStatus: false,
                        deleteStatus: false
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardHelp').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > helpCount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = BoardService;
