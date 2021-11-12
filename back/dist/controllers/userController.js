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
const db_1 = require("../lib/db");
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
                const rLoginLog = yield userService.loginLog(v.id, rLogin.data.value.nick, true, '로그인 성공', v.reqIpaddress);
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
                    status: rLogin.data.value.status,
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
        this.join = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                id: {
                    value: req.body.id ? req.body.id.toLowerCase() : req.body.id,
                    rule: {
                        required: true,
                        min: 3,
                        max: 20
                    },
                    message: {
                        required: '아이디는 3~20로 입력하세요.',
                        min: '아이디는 3~20자리로 입력하세요.',
                        max: '아이디는 3~20자리로 입력하세요.'
                    }
                },
                password: {
                    value: req.body.password,
                    rule: {
                        required: true,
                        min: 4,
                        max: 50
                    },
                    message: {
                        required: '비밀번호는 4~50자리로 입력하세요.',
                        min: '비밀번호는 4~50자리로 입력하세요.',
                        max: '비밀번호는 4~50자리로 입력하세요.'
                    }
                },
                passwordRe: {
                    value: req.body.passwordRe,
                    rule: {
                        required: true,
                        min: 4,
                        max: 50,
                        confirmed: req.body.password
                    },
                    message: {
                        required: '비밀번호 확인은 4~50자리로 입력하세요.',
                        min: '비밀번호 확인은 4~50자리로 입력하세요.',
                        max: '비밀번호 확인은 4~50자리로 입력하세요.',
                        confirmed: '비밀번호가 일치하지 않습니다.'
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
                },
                nick: {
                    value: req.body.nick,
                    rule: {
                        required: true,
                        max: 20
                    },
                    message: {
                        required: '닉네임은 20자 이내로 입력하세요.',
                        max: '닉네임은 20자 이내로 입력하세요.'
                    }
                },
                cell: {
                    value: req.body.cell,
                    rule: {
                        required: true,
                        number: true,
                        max: 20,
                        outputString: true
                    },
                    message: {
                        required: '휴대폰 번호는 20자 이내 숫자로 입력하세요.',
                        number: '휴대폰 번호는 20자 이내 숫자로 입력하세요.',
                        max: '휴대폰 번호는 20자 이내 숫자로 입력하세요.'
                    }
                },
                bank: {
                    value: req.body.bank,
                    rule: {
                        required: true,
                        max: 20
                    },
                    message: {
                        required: '은행명은 20자 이내로 입력하세요.',
                        max: '은행명은 20자 이내로 입력하세요.'
                    }
                },
                bankAccount: {
                    value: req.body.bankAccount.replace(/-/gi, '').replace(/ /gi, ''),
                    rule: {
                        required: true,
                        number: true,
                        max: 20,
                        outputString: true
                    },
                    message: {
                        required: '계좌번호는 20자 이내 숫자로 입력하세요.',
                        number: '계좌번호는 20자 이내 숫자로 입력하세요.',
                        max: '계좌번호는 20자 이내 숫자로 입력하세요.'
                    }
                },
                bankOwner: {
                    value: req.body.bankOwner,
                    rule: {
                        required: true,
                        max: 20
                    },
                    message: {
                        required: '예금주는 20자 이내로 입력하세요.',
                        max: '예금주는 20자 이내로 입력하세요.'
                    }
                },
                recommendCode: {
                    value: req.body.recommendCode ? req.body.recommendCode.toLowerCase() : req.body.recommendCode,
                    rule: {
                        required: true,
                        min: 3,
                        max: 20
                    },
                    message: {
                        required: '가입코드는 3~20로 입력하세요.',
                        min: '가입코드는 3~20자리로 입력하세요.',
                        max: '가입코드는 3~20자리로 입력하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '회원가입 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '회원가입 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '회원가입 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                // ■■■■■■■■■■ DB-회원가입 아이디, 닉네임 체크 ■■■■■■■■■■
                const rInfo = yield userService.checkDuplicate(v.id, v.nick);
                // ■■■■■■■■■■ DB-회원가입 아이디, 닉네임 체크 ■■■■■■■■■■
                if (rInfo.error) {
                    modules_1.logger.error(`회원가입 실패 - ${rInfo.error}`);
                    data.errorTitle = '회원가입 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                if (rInfo.data) {
                    let message = '';
                    if (rInfo.data.id === v.id)
                        message = '아이디';
                    else if (rInfo.data.nick === v.nick)
                        message = '닉네임';
                    data = tools_1.default.denyValidate(data, 'exist', `이미 사용 중인 ${message}입니다.`);
                    data.errorTitle = '회원가입 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-추천코드 조회 ■■■■■■■■■■
                const rRecommend = yield userService.recommendCode(v.recommendCode);
                if (rRecommend.error) {
                    res.status(500).end();
                    return;
                }
                // ■■■■■■■■■■ DB-추천코드 조회 ■■■■■■■■■■
                if (!rRecommend.data.value) {
                    data = tools_1.default.denyValidate(data, 'exist', '가입코드를 확인하세요.');
                    data.errorTitle = '회원가입 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                let recommendTree = rRecommend.data.value.recommendTree;
                let recommendLevel = rRecommend.data.value.recommendLevel + 1;
                if (!rRecommend.data.value.isAgent) {
                    recommendTree.length = 1;
                    recommendLevel = 2;
                }
                recommendTree.push({
                    _id: new db_1.ObjectID(rRecommend.data.value._id),
                    id: rRecommend.data.value.id,
                    nick: rRecommend.data.value.nick
                });
                // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■
                const rJoin = yield userService.join(v.id, v.password, v.passwordExchange, v.nick, v.cell, v.bank, v.bankAccount, v.bankOwner, recommendTree, recommendLevel, v.reqIpaddress);
                if (rJoin.error) {
                    data.errorTitle = '회원가입 실패 - 500';
                    res.status(500).end();
                    return;
                }
                // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■
                if (!rJoin.data.insertedId) {
                    modules_1.logger.error('회원가입 실패');
                    data.errorTitle = '회원가입 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원가입 알립 ■■■■■■■■■■
                yield userService.joinAlarm();
                // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■
                res.end();
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '회원가입 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.getUserInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                const getKeys = ['id', 'nick', 'name', 'bankOwner', 'grade', 'status', 'recommendCount', 'recommendLevel', 'money', 'point'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const r = yield userService.getUserInfo(v.decoded._id, getKeys);
                if (r.error) {
                    data.errorTitle = null;
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = null;
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = UserController;
