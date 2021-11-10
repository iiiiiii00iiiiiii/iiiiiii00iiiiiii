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
const config_1 = __importDefault(require("../config"));
const tools_1 = __importDefault(require("../lib/tools"));
const auth_1 = __importDefault(require("../lib/auth"));
const auth = new auth_1.default();
const validate_1 = __importDefault(require("../lib/validate"));
const validate = new validate_1.default();
const userService_1 = __importDefault(require("../services/userService"));
const userService = new userService_1.default();
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                id: {
                    value: req.query.id ? req.query.id.toString().toLowerCase() : req.query.id,
                    rule: {
                        required: true,
                        alphaNumber: true,
                        min: 3,
                        max: 20
                    },
                    message: {
                        required: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                        alphaNumber: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                        min: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                        max: '아이디는 3~20자(영문, 숫자)로 입력하세요.'
                    }
                },
                password: {
                    value: req.query.password,
                    rule: {
                        required: true,
                        min: 4,
                        max: 50
                    },
                    message: {
                        required: '비밀번호는 4~50자로 입력하세요.',
                        min: '비밀번호는 4~50자로 입력하세요.',
                        max: '비밀번호는 4~50자로 입력하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '로그인 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '로그인 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '로그인 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-유저 로그인 ■■■■■■■■■■
                const rLogin = yield userService.login(v.id, v.password, v.reqIpaddress);
                if (rLogin.error) {
                    modules_1.logger.error(`[UserController > login()] 로그인 실패 - ${rLogin.error}`);
                    data.errorTitle = '로그인 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-유저 로그인 ■■■■■■■■■■
                // 로그인 실패 [아이디 비밀번호 불일치]
                if (!rLogin.data.value) {
                    // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                    const rLoginLog = yield userService.loginLog(v.id, null, false, '아이디 비밀번호 불일치', v.reqIpaddress);
                    // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                    if (rLoginLog.error) {
                        modules_1.logger.error(`[UserController > login()] 로그인 실패 로그[아이디 비밀번호 불일치] insert 실패 - ${rLoginLog.error}`);
                    }
                    else {
                        if (!rLoginLog.data.insertedId) {
                            modules_1.logger.error(`[UserController > login()] 로그인 실패 로그[아이디 비밀번호 불일치] insert 실패 - ${rLoginLog.data.insertedId}`);
                        }
                    }
                    data = tools_1.default.denyValidate(data, 'auth', '아이디 또는 비밀번호를 확인하세요.');
                    data.errorTitle = '로그인 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                // 로그인 실패 [상태 정지 중]
                if (rLogin.data.value.status !== 1) {
                    // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                    const rLoginLog = yield userService.loginLog(v.id, rLogin.data.name, false, '상태 정지 중', v.reqIpaddress);
                    // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                    if (rLoginLog.error) {
                        modules_1.logger.error(`[UserController > login()] 로그인 실패 로그[상태 정지 중] insert 실패 - ${rLoginLog.error}`);
                    }
                    else {
                        if (!rLoginLog.data.insertedId) {
                            modules_1.logger.error(`[UserController > login()] 로그인 실패 로그[상태 정지 중] insert 실패 - ${rLoginLog.data.insertedId}`);
                        }
                    }
                    data = tools_1.default.denyValidate(data, 'auth', '정상 회원이 아닙니다.<br>방금 가입하셨다면, 승인되기까지 기다려 주십시오.');
                    data.errorTitle = '로그인 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                const rLoginLog = yield userService.loginLog(v.id, rLogin.data.nick, true, '로그인 성공', v.reqIpaddress);
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                if (rLoginLog.error) {
                    modules_1.logger.error(`[UserController > login()] 로그인 성공 로그 insert 실패 - ${rLoginLog.error}`);
                }
                else {
                    if (!rLoginLog.data.insertedId) {
                        modules_1.logger.error(`[UserController > login()] 로그인 성공 로그 insert 실패 - ${rLoginLog.data.insertedId}`);
                    }
                }
                // 토큰 생성
                const token = auth.createToken({
                    _id: rLogin.data.value._id,
                    id: rLogin.data.value.id,
                    nick: rLogin.data.value.nick,
                    bankOwner: rLogin.data.value.nick,
                    grade: rLogin.data.value.grade,
                    isAgent: rLogin.data.value.isAgent
                });
                // 중복접속 방지용 토큰 생성
                const duplicateToken = modules_1.crypto.createHmac('sha512', config_1.default.jwtSecret).update(token).digest('base64');
                // 헤더 설정
                res.set('access-token', token);
                res.set('duplicate', duplicateToken);
                // ■■■■■■■■■■ DB-중복접속 방지용 token 업데이트 ■■■■■■■■■■
                let rUpdateToken = yield userService.updateToken(v.id, duplicateToken);
                if (rUpdateToken.error) {
                    res.set('access-token', '');
                    res.set('duplicate', '');
                    modules_1.logger.error('[UserController > login()] update token');
                    res.status(500).end();
                    return;
                }
                // ■■■■■■■■■■ DB-중복접속 방지용 token 업데이트 ■■■■■■■■■■
                res.json({
                    _id: rLogin.data.value._id,
                    id: rLogin.data.value.id,
                    nick: rLogin.data.value.nick,
                    bankOwner: rLogin.data.value.nick,
                    grade: rLogin.data.value.grade,
                    recommendCount: rLogin.data.value.recommendCount,
                    recommendLevel: rLogin.data.value.recommendLevel,
                    money: rLogin.data.value.money,
                    point: rLogin.data.value.point,
                    isAgent: rLogin.data.value.isAgent
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '로그인 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = UserController;
