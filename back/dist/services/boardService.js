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
        this.getRulesList = (page) => {
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
                    r.data = yield pool.collection('boardGameRule').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardGameRule').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getRulesList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getRulesDetail = (_id) => {
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
                    r.data = yield pool.collection('boardGameRule').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getRulesDetail');
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
        this.help = (title, content, userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, isAgent, memoShort, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        title: (0, modules_1.mongoSanitize)(title),
                        content: (0, modules_1.mongoSanitize)(content),
                        commentsCount: 0,
                        writerOID: new db_1.ObjectID(userOID),
                        recommendTree: userRecommendTree,
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
                        memoShort,
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
        this.chargeInformation = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, isAgent, memoShort, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        title: `[${userNick}] 계좌문의`,
                        content: `${userNick}님 계좌문의 입니다.`,
                        commentsCount: 0,
                        writerOID: new db_1.ObjectID(userOID),
                        recommendTree: userRecommendTree,
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
                        memoShort,
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
        this.getFreeList = (page) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            title: 1,
                            content: 1,
                            commentsCount: 1,
                            hit: 1,
                            writerNick: 1,
                            writerGrade: 1,
                            regDateTime: 1,
                            gameID: 1
                        }
                    };
                    const skip = (page - 1) * config_1.default.pageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFree').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config_1.default.pageSize).toArray();
                    r.count = yield pool.collection('boardFree').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFreeList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFreeDetail = (_id) => {
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
                            title: 1,
                            content: 1,
                            hit: 1,
                            writerNick: 1,
                            writerGrade: 1,
                            gameID: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFree').findOneAndUpdate(findQuery, setQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFreeDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getFreeComments = (_id) => {
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
                            writerNick: 1,
                            writerGrade: 1,
                            regDateTime: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardComments').find(findQuery, whatQuery).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getFreeComments');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.free = (title, content, userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, isAgent, memoShort, ipaddress, gameID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        title: (0, modules_1.mongoSanitize)(title),
                        content: (0, modules_1.mongoSanitize)(content),
                        commentsCount: 0,
                        writerOID: new db_1.ObjectID(userOID),
                        recommendTree: userRecommendTree,
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
                        memoShort,
                        ipaddress,
                        regDateTime: new Date(),
                        gameID: gameID ? new db_1.ObjectID(gameID) : null
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFree').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > free');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.freeComment = (boardOID, userOID, userID, userNick, userGrade, comment, ipaddress) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const insertQuery = {
                        boardOID: new db_1.ObjectID(boardOID),
                        which: 'free',
                        isMember: true,
                        writerOID: userOID,
                        writerID: userID,
                        writerNick: userNick,
                        writerGrade: userGrade,
                        comment: (0, modules_1.mongoSanitize)(comment),
                        deleteStatus: false,
                        ipaddress,
                        regDateTime: new Date()
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardComments').insertOne(insertQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > freeComment');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getBoardInfo = (userGrade) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        category: 'configBoard'
                    };
                    const whatQuery = {
                        projection: {
                            [`lv${userGrade}`]: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('config').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getBoardInfo');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPrizeLogCount = (userOID, isBet) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        sortation: isBet ? 'bettingPrize' : 'normalPrize',
                        regDateTime: {
                            $gte: (0, modules_1.moment)().startOf('day').toDate(),
                            $lte: (0, modules_1.moment)().endOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getPrizeLogCount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getCommentPrizeLogCount = (userOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        userOID: new db_1.ObjectID(userOID),
                        sortation: 'replyPrize',
                        regDateTime: {
                            $gte: (0, modules_1.moment)().startOf('day').toDate(),
                            $lte: (0, modules_1.moment)().endOf('day').toDate()
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('moneyLog').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('BoardService > getCommentPrizeLogCount');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.addPointForBoard = (userOID, point) => {
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
                    modules_1.logger.error('MoneyService > addPointForBoard');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.addMoneyForBoardLog = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, process, point, isTest, isAgent, isBet) => {
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
                        sortation: `${isBet ? 'bettingPrize' : 'normalPrize'}`,
                        reason: `게시판 등록 ${isBet ? '- 배팅' : ' - 일반'}`,
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
                    modules_1.logger.error('MoneyService > addMoneyForBoardLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.addMoneyForBoardCommentLog = (userOID, userID, userNick, userGrade, userBankOwner, userRecommendTree, process, point, isTest, isAgent, isBet) => {
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
                        sortation: 'replyPrize',
                        reason: '게시판 댓글',
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
                    modules_1.logger.error('MoneyService > addMoneyForBoardCommentLog');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.betUpdate = (userOID, gameID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(gameID),
                        userOID: new db_1.ObjectID(userOID)
                    };
                    const setQuery = {
                        $set: {
                            useBoard: true
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('betSports').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > betUpdate');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.freeCommentCountUpdate = (boardOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(boardOID)
                    };
                    const setQuery = {
                        $inc: {
                            commentsCount: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('boardFree').updateOne(findQuery, setQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('MoneyService > freeCommentCountUpdate');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = BoardService;
