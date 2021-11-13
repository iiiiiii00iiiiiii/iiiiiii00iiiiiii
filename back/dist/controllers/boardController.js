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
const tools_1 = __importDefault(require("../lib/tools"));
const validate_1 = __importDefault(require("../lib/validate"));
const validate = new validate_1.default();
const boardService_1 = __importDefault(require("../services/boardService"));
const boardService = new boardService_1.default();
const userService_1 = __importDefault(require("../services/userService"));
const userService = new userService_1.default();
const etcService_1 = __importDefault(require("../services/etcService"));
const etcService = new etcService_1.default();
class MoneyController {
    constructor() {
        this.getNoticeList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                page: {
                    value: req.query.page,
                    rule: {
                        required: true,
                        number: true,
                        gte: 1
                    },
                    message: {
                        required: '파라메터 오류, 관리자에게 문의하세요.',
                        number: '파라메터 오류, 관리자에게 문의하세요.',
                        gte: '파라메터 오류, 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '공지사항 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '공지사항 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '공지사항 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                const r = yield boardService.getNoticeList(v.page);
                if (r.error) {
                    data.errorTitle = '공지사항 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '공지사항 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getNoticeDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                _id: {
                    value: req.query._id,
                    rule: {
                        required: true,
                        alphaNumber: true,
                        min: 24,
                        max: 24
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                        min: '파라메터 오류. 관리자에게 문의하세요.',
                        max: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '공지사항 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '공지사항 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '공지사항 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                const r = yield boardService.getNoticeDetail(v._id);
                if (r.error) {
                    data.errorTitle = '공지사항 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                res.json(r.data.value);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '공지사항 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getEventList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                page: {
                    value: req.query.page,
                    rule: {
                        required: true,
                        number: true,
                        gte: 1
                    },
                    message: {
                        required: '파라메터 오류, 관리자에게 문의하세요.',
                        number: '파라메터 오류, 관리자에게 문의하세요.',
                        gte: '파라메터 오류, 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '이벤트 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '이벤트 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '이벤트 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-이벤트 가져오기 ■■■■■■■■■■
                const r = yield boardService.getEventList(v.page);
                if (r.error) {
                    data.errorTitle = '이벤트 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-이벤트 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '이벤트 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getEventDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                _id: {
                    value: req.query._id,
                    rule: {
                        required: true,
                        alphaNumber: true,
                        min: 24,
                        max: 24
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                        min: '파라메터 오류. 관리자에게 문의하세요.',
                        max: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '공지사항 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '공지사항 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '공지사항 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                const r = yield boardService.getEventDetail(v._id);
                if (r.error) {
                    data.errorTitle = '공지사항 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                res.json(r.data.value);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '공지사항 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getHelpList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                page: {
                    value: req.query.page,
                    rule: {
                        required: true,
                        number: true,
                        gte: 1
                    },
                    message: {
                        required: '파라메터 오류, 관리자에게 문의하세요.',
                        number: '파라메터 오류, 관리자에게 문의하세요.',
                        gte: '파라메터 오류, 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '고객센터 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '고객센터 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '고객센터 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-고객센터 가져오기 ■■■■■■■■■■
                const r = yield boardService.getHelpList(v.decoded._id, v.page);
                if (r.error) {
                    data.errorTitle = '고객센터 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-고객센터 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '고객센터 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getHelpDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                _id: {
                    value: req.query._id,
                    rule: {
                        required: true,
                        alphaNumber: true,
                        min: 24,
                        max: 24
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                        min: '파라메터 오류. 관리자에게 문의하세요.',
                        max: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '문의 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '문의 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '문의 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-문의 가져오기 ■■■■■■■■■■
                const r = yield boardService.getHelpDetail(v._id, v.decoded._id);
                if (r.error) {
                    data.errorTitle = '문의 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 가져오기 ■■■■■■■■■■
                let answer = null;
                if (r.data.value.answerStatus) {
                    // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
                    const rAnswer = yield boardService.getHelpAnswer(v._id);
                    if (rAnswer.error) {
                        data.errorTitle = '문의 상세 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
                    if (!rAnswer.data) {
                        data.errorTitle = '문의 상세 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    answer = rAnswer.data;
                }
                res.json({
                    help: r.data.value,
                    answer
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '문의 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.help = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                title: {
                    value: req.body.title,
                    rule: {
                        required: true,
                        max: 100
                    },
                    message: {
                        required: '제목은 100자 이내로 입력하세요.',
                        max: '제목은 100자 이내로 입력하세요.'
                    }
                },
                content: {
                    value: req.body.content,
                    rule: {
                        required: true,
                        max: 500
                    },
                    message: {
                        required: '문의내용은 500자 이내로 입력하세요.',
                        max: '문의내용은 500자 이내로 입력하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '문의하기 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '문의하기 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '문의하기 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                const getKeys = ['recommendTree'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys);
                if (rUserInfo.error) {
                    data.errorTitle = '문의하기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
                const r = yield boardService.help(v.title, v.content, v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, v.decoded.isAgent, v.reqIpaddress);
                if (r.error) {
                    data.errorTitle = '문의하기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
                if (r.data.insertedCount === 0) {
                    data.errorTitle = '문의하기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 알립 ■■■■■■■■■■
                yield boardService.helpAlarm();
                // ■■■■■■■■■■ DB-문의 알림 ■■■■■■■■■■
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '문의하기 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.chargeInformation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                let getKeys = [`lv${v.decoded.grade}`];
                // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
                const rConfigInfo = yield etcService.getConfigInfo('bank', getKeys);
                if (rConfigInfo.error) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
                if (!rConfigInfo.data) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                getKeys = ['recommendTree'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys);
                if (rUserInfo.error) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (!rUserInfo.data) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-계좌 문의 가져오기 ■■■■■■■■■■
                const rChargeInformation = yield boardService.chargeInformation(v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, v.decoded.isAgent, v.reqIpaddress);
                if (rChargeInformation.error) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-계좌 문의 가져오기 ■■■■■■■■■■
                if (rChargeInformation.data.insertedId === 0) {
                    data.errorTitle = '입금계좌 문의 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // 자동 답변 기능 On
                if (rConfigInfo.data[`lv${v.decoded.grade}`].autoAnswer) {
                    getKeys = ['content'];
                    // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
                    const rConfigTemplate = yield etcService.getConfigInfo('bankTemplate', getKeys);
                    if (rConfigTemplate.error) {
                        data.errorTitle = '입금계좌 문의 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
                    if (!rConfigTemplate.data) {
                        data.errorTitle = '입금계좌 문의 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    const comment = rConfigTemplate.data.content.replace(/{{bank}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bank).replace(/{{bankOwner}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bankOwner).replace(/{{bankAccount}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bankAccount);
                    // ■■■■■■■■■■ DB-자동답변 ■■■■■■■■■■
                    yield boardService.autoAnswer(rChargeInformation.data.insertedId, comment);
                    // ■■■■■■■■■■ DB-자동답변 ■■■■■■■■■■
                    // ■■■■■■■■■■ DB-자동답글에 대한 원글 업데이트 ■■■■■■■■■■
                    yield boardService.updateHelpForAnswer(rChargeInformation.data.insertedId);
                    // ■■■■■■■■■■ DB-자동답글에 대한 원글 업데이트 ■■■■■■■■■■
                }
                else {
                    // ■■■■■■■■■■ DB-문의 알립 ■■■■■■■■■■
                    yield boardService.helpAlarm();
                    // ■■■■■■■■■■ DB-문의 알림 ■■■■■■■■■■
                }
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '출금 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteHelp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                _id: {
                    value: req.query._id,
                    rule: {
                        required: true,
                        alphaNumber: true,
                        min: 24,
                        max: 24
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                        min: '파라메터 오류. 관리자에게 문의하세요.',
                        max: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '문의 내역 삭제 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '문의 내역 삭제 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '문의 내역 삭제 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
                const rDeleteHelp = yield boardService.deleteHelp(v._id, v.decoded._id);
                if (rDeleteHelp.error) {
                    v.errorTitle = '문의 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '문의 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteHelpAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
                const rDeleteHelp = yield boardService.deleteHelpAll(v.decoded._id);
                if (rDeleteHelp.error) {
                    v.errorTitle = '문의 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '문의 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = MoneyController;
