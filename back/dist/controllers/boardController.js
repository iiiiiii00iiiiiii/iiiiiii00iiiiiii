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
                let r = yield boardService.getNoticeList(v.page);
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
                let r = yield boardService.noticeDetail(v._id);
                if (r.error) {
                    data.errorTitle = '공지사항 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '공지사항 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = MoneyController;
