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
        this.getDashboard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                n: {
                    value: req.query.n,
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
                    v.errorTitle = 'Dash board 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = 'Dash board 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = 'Dash board validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                let dashboard = modules_1.cache.get('dashboard');
                if (!modules_1.cache.get('dashboard')) {
                    // ■■■■■■■■■■ DB-Dash board 가져오기 ■■■■■■■■■■
                    const r = yield boardService.getDashboard(v.n);
                    if (r.error) {
                        data.errorTitle = 'Dash board 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    // ■■■■■■■■■■ DB-Dash board 가져오기 ■■■■■■■■■■
                    modules_1.cache.put('dashboard', {
                        notice: r.data.notice,
                        event: r.data.event,
                        faq: r.data.faq
                    }, 300000);
                }
                dashboard = modules_1.cache.get('dashboard');
                res.json(dashboard);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = 'Dash board 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
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
        this.getRulesList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '경기규정 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '경기규정 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '경기규정 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
                const r = yield boardService.getRulesList(v.page);
                if (r.error) {
                    data.errorTitle = '경기규정 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '경기규정 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getRulesDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '경기규정 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '경기규정 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '경기규정 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
                const r = yield boardService.getRulesDetail(v._id);
                if (r.error) {
                    data.errorTitle = '경기규정 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
                res.json(r.data.value);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '경기규정 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getFaqList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = 'FAQ 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = 'FAQ 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = 'FAQ validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
                const r = yield boardService.getFaqList(v.page);
                if (r.error) {
                    data.errorTitle = 'FAQ 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = 'FAQ 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getFaqDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = 'FAQ 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = 'FAQ 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = 'FAQ 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
                const r = yield boardService.getFaqDetail(v._id);
                if (r.error) {
                    data.errorTitle = 'FAQ 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
                res.json(r.data.value);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = 'FAQ 상세 실패 - 500';
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
                const r = yield boardService.getHelpList(v.page, v.decoded._id);
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
                const getKeys = ['recommendTree', 'memoShort'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '문의하기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
                const r = yield boardService.help(v.title, v.content, v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, v.decoded.isAgent, rUserInfo.data.memoShort, v.reqIpaddress);
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
                getKeys = ['recommendTree', 'memoShort'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
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
                const rChargeInformation = yield boardService.chargeInformation(v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, v.decoded.isAgent, rUserInfo.data.memoShort, v.reqIpaddress);
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
        this.getFreeList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '게시판 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '게시판 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '게시판 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
                const r = yield boardService.getFreeList(v.page);
                if (r.error) {
                    data.errorTitle = '게시판 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '게시판 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getFreeDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '게시판 상세 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '게시판 상세 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '게시판 상세 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
                const r = yield boardService.getFreeDetail(v._id);
                if (r.error) {
                    data.errorTitle = '게시판 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
                const rAnswer = yield boardService.getFreeComments(v._id);
                if (rAnswer.error) {
                    data.errorTitle = '게시판 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
                res.json({
                    free: r.data.value,
                    answer: rAnswer.data
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '게시판 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.free = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                        required: '내용은 500자 이내로 입력하세요.',
                        max: '내용은 500자 이내로 입력하세요.'
                    }
                },
                id: {
                    value: req.body.id,
                    rule: {
                        required: req.body.id ? true : false,
                        alphaNumber: req.body.id ? true : false,
                        min: req.body.id ? 24 : 0,
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
                    v.errorTitle = '등록 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '등록 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '등록 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                const getKeys = ['recommendTree', 'memoShort'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
                const r = yield boardService.free(v.title, v.content, v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, v.decoded.isAgent, rUserInfo.data.memoShort, v.reqIpaddress, v.id);
                if (r.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
                if (r.data.insertedCount === 0) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
                const rBoardInfo = yield boardService.getBoardInfo(v.decoded.grade);
                if (rBoardInfo.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
                let bonus = 0;
                let betCount = 0;
                let needPrize = true;
                if (v.id) {
                    bonus = rBoardInfo.data[`lv${v.decoded.grade}`].bettingPrize;
                }
                else {
                    bonus = rBoardInfo.data[`lv${v.decoded.grade}`].normalPrize;
                }
                if (bonus === 0) {
                    needPrize = false;
                }
                // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
                const rBoardBonus = yield boardService.getPrizeLogCount(v.decoded._id, v.id ? true : false);
                if (rBoardBonus.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
                if (v.id) {
                    betCount = rBoardInfo.data[`lv${v.decoded.grade}`].bettingCount;
                }
                else {
                    betCount = rBoardInfo.data[`lv${v.decoded.grade}`].normalCount;
                }
                if (betCount <= rBoardBonus.data) {
                    needPrize = false;
                }
                if (needPrize === true) {
                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                    const rAddPoint = yield boardService.addPointForBoard(v.decoded._id, bonus);
                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                    yield boardService.addMoneyForBoardLog(v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, bonus, rAddPoint.data.value.point, rUserInfo.data.isTest, rUserInfo.data.isAgent, v.id ? true : false);
                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                }
                if (v.id) {
                    // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
                    yield boardService.betUpdate(v.decoded._id, v.id);
                    // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
                }
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '등록 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.freeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                _id: {
                    value: req.body._id,
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
                },
                commentContent: {
                    value: req.body.commentContent,
                    rule: {
                        required: true,
                        max: 100
                    },
                    message: {
                        required: '댓글은 100자 이내로 입력하세요.',
                        max: '댓글은 100자 이내로 입력하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '등록 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '등록 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '등록 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                const getKeys = ['recommendTree', 'memoShort'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-댓글 등록 ■■■■■■■■■■
                const r = yield boardService.freeComment(v._id, v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.commentContent, v.reqIpaddress);
                if (r.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-댓글 등록 ■■■■■■■■■■
                if (r.data.insertedCount === 0) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
                const rBoardInfo = yield boardService.getBoardInfo(v.decoded.grade);
                if (rBoardInfo.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
                let bonus = 0;
                let count = 0;
                let needPrize = true;
                bonus = rBoardInfo.data[`lv${v.decoded.grade}`].replyPrize;
                if (bonus === 0) {
                    needPrize = false;
                }
                // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
                const rBoardBonus = yield boardService.getCommentPrizeLogCount(v.decoded._id);
                if (rBoardBonus.error) {
                    data.errorTitle = '등록 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
                count = rBoardInfo.data[`lv${v.decoded.grade}`].replyCount;
                if (count <= rBoardBonus.data) {
                    needPrize = false;
                }
                if (needPrize === true) {
                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                    const rAddPoint = yield boardService.addPointForBoard(v.decoded._id, bonus);
                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                    yield boardService.addMoneyForBoardCommentLog(v.decoded._id, v.decoded.id, v.decoded.nick, v.decoded.grade, v.decoded.bankOwner, rUserInfo.data.recommendTree, bonus, rAddPoint.data.value.point, rUserInfo.data.isTest, rUserInfo.data.isAgent, v.id ? true : false);
                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                }
                // ■■■■■■■■■■ DB-댓글 카운터 업데이트 해주기. ■■■■■■■■■■
                yield boardService.freeCommentCountUpdate(v._id);
                // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '등록 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = MoneyController;
