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
const moneyService_1 = __importDefault(require("../services/moneyService"));
const moneyService = new moneyService_1.default();
const userService_1 = __importDefault(require("../services/userService"));
const userService = new userService_1.default();
const boardService_1 = __importDefault(require("../services/boardService"));
const boardService = new boardService_1.default();
class MoneyController {
    constructor() {
        // 충전
        this.getChargeList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '충전 내역 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '충전 내역 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '충전 내역 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-충전 내역 가져오기 ■■■■■■■■■■
                const r = yield moneyService.getChargeList(v.page, v.decoded._id);
                if (r.error) {
                    data.errorTitle = '충전 내역 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-충전 내역 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 내역 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.setCharge = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                chargeAmount: {
                    value: req.body.chargeAmount,
                    rule: {
                        required: true,
                        number: true,
                        gte: 10000,
                        lte: 999999999
                    },
                    message: {
                        required: '충전 신청은 1만원 이상 가능합니다.',
                        number: '충전 신청은 1만원 이상 가능합니다.',
                        gte: '충전 신청은 1만원 이상 가능합니다.',
                        lte: '충전 신청은 1만원 이상 가능합니다.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '충전 신청 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // 충전 시간 제한
                const hour = (0, modules_1.moment)().hours();
                const minute = (0, modules_1.moment)().minute();
                if (hour === 23 && minute >= 55 || hour === 0 && minute <= 5) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'time', '23시 55분 부터 00시 05분 사이에는 충전신청이 불가능 합니다.');
                    res.status(400).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
                const rCheckIngCharge = yield moneyService.checkIngCharge(v.decoded._id);
                if (rCheckIngCharge.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
                if (rCheckIngCharge.data > 0) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'exist', '이전에 신청하신 충전을 처리 중입니다.');
                    res.status(400).json(data);
                    return;
                }
                const getKeys = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (!rUserInfo.data) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
                const rSetCharge = yield moneyService.setCharge(v.decoded._id, rUserInfo.data.id, rUserInfo.data.nick, rUserInfo.data.grade, rUserInfo.data.bank, rUserInfo.data.bankOwner, rUserInfo.data.bankAccount, rUserInfo.data.isAgent, rUserInfo.data.isTest, rUserInfo.data.recommendTree, v.chargeAmount, v.reqIpaddress);
                if (rSetCharge.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
                if (rSetCharge.data.insertedCount === 0) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
                yield moneyService.chargeAlarm();
                // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 신청 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteCharge = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '충전 내역 삭제 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '충전 내역 삭제 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '충전 내역 삭제 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
                const rDeleteCharge = yield moneyService.deleteCharge(v._id, v.decoded._id);
                if (rDeleteCharge.error) {
                    v.errorTitle = '충전 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteChargeAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
                const rDeleteCharge = yield moneyService.deleteChargeAll(v.decoded._id);
                if (rDeleteCharge.error) {
                    v.errorTitle = '충전 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.setChargePent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                chargeMethod: {
                    value: req.body.chargeMethod,
                    rule: {
                        required: true,
                        or: ['money', 'minigameMoney']
                    },
                    message: {
                        required: '충전 머니를 선택 하세요.',
                        or: '충전 머니를 선택 하세요.'
                    }
                },
                chargeAmount: {
                    value: req.body.chargeAmount,
                    rule: {
                        required: true,
                        number: true,
                        gte: 10000,
                        lte: 999999999
                    },
                    message: {
                        required: '충전 신청은 1만원 이상 가능합니다.',
                        number: '충전 신청은 1만원 이상 가능합니다.',
                        gte: '충전 신청은 1만원 이상 가능합니다.',
                        lte: '충전 신청은 1만원 이상 가능합니다.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '충전 신청 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // 충전 시간 제한
                const hour = (0, modules_1.moment)().hours();
                const minute = (0, modules_1.moment)().minute();
                if (hour === 23 && minute >= 55 || hour === 0 && minute <= 5) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'time', '23시 55분 부터 00시 05분 사이에는 충전신청이 불가능 합니다.');
                    res.status(400).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
                const rCheckIngCharge = yield moneyService.checkIngCharge(v.decoded._id);
                if (rCheckIngCharge.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
                if (rCheckIngCharge.data > 0) {
                    data.errorTitle = '충전 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'exist', '이전에 신청하신 충전을 처리 중입니다.');
                    res.status(400).json(data);
                    return;
                }
                const getKeys = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (!rUserInfo.data) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
                const rSetCharge = yield moneyService.setChargePent(v.decoded._id, rUserInfo.data.id, rUserInfo.data.nick, rUserInfo.data.grade, rUserInfo.data.bank, rUserInfo.data.bankOwner, rUserInfo.data.bankAccount, rUserInfo.data.isAgent, rUserInfo.data.isTest, rUserInfo.data.recommendTree, v.chargeAmount, v.chargeMethod, v.reqIpaddress);
                if (rSetCharge.error) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
                if (rSetCharge.data.insertedCount === 0) {
                    data.errorTitle = '충전 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
                yield moneyService.chargeAlarm();
                // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 신청 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        // 출금
        this.getExchangeList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '출금 내역 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '출금 내역 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '출금 내역 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-출금 내역 가져오기 ■■■■■■■■■■
                const r = yield moneyService.getExchangeList(v.page, v.decoded._id);
                if (r.error) {
                    data.errorTitle = '출금 내역 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-출금 내역 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '출금 내역 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.setExchange = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                exchangeAmount: {
                    value: req.body.exchangeAmount,
                    rule: {
                        required: true,
                        number: true,
                        gte: 10000,
                        lte: 999999999
                    },
                    message: {
                        required: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                        number: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                        gte: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                        lte: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.'
                    }
                },
                passwordExchange: {
                    value: req.body.passwordExchange,
                    rule: {
                        required: true,
                        min: 4,
                        max: 50
                    },
                    message: {
                        required: '출금 비밀번호는 4~50자리로 입력하세요.',
                        min: '출금 비밀번호는 4~50자리로 입력하세요.',
                        max: '출금 비밀번호는 4~50자리로 입력하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '출금 신청 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '출금 신청 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // 충전 시간 제한
                const hour = (0, modules_1.moment)().hours();
                const minute = (0, modules_1.moment)().minute();
                if (hour === 23 && minute >= 30 || hour === 0 && minute <= 30) {
                    data.errorTitle = '출금 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'time', '23시 40분 부터 00시 30분 사이에는 출금 신청이 불가능 합니다.');
                    res.status(400).json(data);
                    return;
                }
                // 1만원 단위로 출금
                if (Math.trunc(v.exchangeAmount) % 10000 !== 0) {
                    data.errorTitle = '출금 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'unit', '출금 신청은 1만원 이상 1만원 단위로 가능합니다.');
                    res.status(400).json(data);
                    return;
                }
                const getKeys = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'passwordExchange'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress);
                if (rUserInfo.error) {
                    data.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (!rUserInfo.data) {
                    data.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                if (modules_1.crypto.createHash('sha512').update(v.passwordExchange).digest('base64') !== rUserInfo.data.passwordExchange) {
                    data.errorTitle = '출금 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'exchange password', '출금 비밀번호를 확인하세요.');
                    res.status(400).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
                const rSubtractUserMoney = yield userService.subtractUserMoney(v.decoded._id, v.exchangeAmount);
                if (rSubtractUserMoney.error) {
                    data.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
                if (rSubtractUserMoney.data.lastErrorObject.n === 0) {
                    data.errorTitle = '출금 신청 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'not enough money', '보유 금액이 부족 합니다.');
                    res.status(400).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-출금 요청 ■■■■■■■■■■
                const rSetExchange = yield moneyService.setExchange(v.decoded._id, rUserInfo.data.id, rUserInfo.data.nick, rUserInfo.data.grade, rUserInfo.data.bank, rUserInfo.data.bankOwner, rUserInfo.data.bankAccount, rUserInfo.data.isAgent, rUserInfo.data.isTest, rUserInfo.data.recommendTree, v.exchangeAmount, v.reqIpaddress);
                if (rSetExchange.error) {
                    data.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-출금 요청 ■■■■■■■■■■
                if (rSetExchange.data.insertedCount === 0) {
                    data.errorTitle = '출금 신청 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                //■■■■■■■■■■ DB-출금 요청 로그 ■■■■■■■■■■
                yield moneyService.setExchangeLog(rSetExchange.data.insertedId, v.decoded._id, rUserInfo.data.id, rUserInfo.data.nick, rUserInfo.data.grade, rUserInfo.data.bankOwner, rUserInfo.data.isAgent, rUserInfo.data.isTest, rUserInfo.data.recommendTree, rSubtractUserMoney.data.value.money, v.exchangeAmount);
                //■■■■■■■■■■ DB-출금 요청 로그 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-출금 알림 ■■■■■■■■■■
                yield moneyService.exchangeAlarm();
                // ■■■■■■■■■■ DB-출금 알림 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '출금 신청 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteExchange = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '출금 내역 삭제 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '출금 내역 삭제 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '출금 내역 삭제 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
                const rDeleteExchange = yield moneyService.deleteExchange(v._id, v.decoded._id);
                if (rDeleteExchange.error) {
                    v.errorTitle = '출금 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '출금 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deleteExchangeAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
                const rDeleteExchange = yield moneyService.deleteExchangeAll(v.decoded._id);
                if (rDeleteExchange.error) {
                    v.errorTitle = '출금 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '출금 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        // 포인트
        this.getPointList = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '포인트 내역 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '포인트 내역 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '포인트 내역 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-포인트 내역 가져오기 ■■■■■■■■■■
                const r = yield moneyService.getPointList(v.page, v.decoded._id);
                if (r.error) {
                    data.errorTitle = '포인트 내역 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-포인트 내역 가져오기 ■■■■■■■■■■
                res.json({
                    recordSet: r.data,
                    recordCount: r.count
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '포인트 내역 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.exchangePoint = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-포인트 전환 ■■■■■■■■■■
                const rPoint = yield moneyService.exchangePoint(v.decoded._id);
                if (rPoint.error) {
                    data.errorTitle = '포인트 전환 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-포인트 전환 ■■■■■■■■■■
                if (rPoint.data.value) {
                    // ■■■■■■■■■■ DB-포인트 전환 로그 ■■■■■■■■■■
                    const rPointLog = yield moneyService.exchangePointLog(v.decoded._id, rPoint.data.value.id, rPoint.data.value.nick, rPoint.data.value.grade, rPoint.data.value.bankOwner, rPoint.data.value.isAgent, rPoint.data.value.isTest, rPoint.data.value.recommendTree, rPoint.data.value.money, rPoint.data.value.point);
                    if (rPointLog.error) {
                        data.errorTitle = '포인트 전환 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    // ■■■■■■■■■■ DB-포인트 전환 로그 ■■■■■■■■■■
                }
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '충전 신청 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deletePoint = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    v.errorTitle = '포인트 내역 삭제 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '포인트 내역 삭제 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '포인트 내역 삭제 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
                const rDeletePoint = yield moneyService.deletePoint(v._id, v.decoded._id);
                if (rDeletePoint.error) {
                    v.errorTitle = '포인트 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '포인트 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.deletePointAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
                const rDeletePoint = yield moneyService.deletePointAll(v.decoded._id);
                if (rDeletePoint.error) {
                    v.errorTitle = '포인트 내역 삭제 validate 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '포인트 내역 삭제 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = MoneyController;
