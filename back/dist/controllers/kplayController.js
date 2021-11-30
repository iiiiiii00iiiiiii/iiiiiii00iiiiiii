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
const kplayService_1 = __importDefault(require("../services/kplayService"));
const kplayService = new kplayService_1.default();
const userService_1 = __importDefault(require("../services/userService"));
const userService = new userService_1.default();
const validate_1 = __importDefault(require("../lib/validate"));
const validate = new validate_1.default();
class GameController {
    constructor() {
        this.kplayURL = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let domain_url = `${req.protocol}://${req.get('host')}/api`;
            const validateData = {
                id: {
                    value: req.query.id,
                    rule: {
                        required: true,
                        number: true
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        number: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '카지노 불러오기 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '카지노 불러오기 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '카지노 불러오기 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            try {
                const getKeys = ['id', 'seq', 'kplayUserSeq', 'money', 'isTest'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys);
                if (rUserInfo.error) {
                    data.errorTitle = '카지노 불러오기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (rUserInfo.data.isTest) {
                    data.errorTitle = '카지노 불러오기 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'deny', '테스트 아이디는 이용하실 수 없습니다.');
                    res.status(400).json(data);
                    return;
                }
                const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : '';
                const md = new modules_1.mobileDetect(userAgent);
                let isMobile = md.mobile() !== null ? true : false;
                const options = {
                    method: 'POST',
                    url: `${config_1.default.kplay.endpoint}/auth`,
                    headers: {
                        'ag-code': config_1.default.kplay.code,
                        'ag-token': config_1.default.kplay.token,
                        'content-type': 'application/json'
                    },
                    json: {
                        user: {
                            id: rUserInfo.data.seq,
                            name: rUserInfo.data.seq,
                            balance: rUserInfo.data.money,
                            language: 'ko',
                            domain_url
                        },
                        prd: {
                            id: v.id,
                            type: 0,
                            is_mobile: isMobile
                        }
                    }
                };
                (0, modules_1.request)(options, (err, response, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        data.errorTitle = '카지노 실패 - 500';
                        res.status(500).json(data);
                        return;
                    }
                    else {
                        if (parseInt(body.status) !== 1) {
                            console.log(body);
                            data.errorTitle = '카지노 실패 - 500';
                            res.status(500).json(data);
                            return;
                        }
                        if (rUserInfo.data.kplayUserSeq === null) {
                            // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                            const rUserUpdate = yield kplayService.userUpdate(v.decoded._id, body.user_id, body.username);
                            if (rUserUpdate.error) {
                                data.errorTitle = '카지노 불러오기 실패 - 500';
                                res.status(500).json(data);
                                return;
                            }
                            // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                        }
                        res.json(body);
                    }
                }));
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '카지노 불러오기 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.kplayOpenGames = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let domain_url = `${req.protocol}://${req.get('host')}/api`;
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                const getKeys = ['id', 'seq', 'kplayUserSeq', 'money', 'isTest'];
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                const rUserInfo = yield userService.getUserInfo(v.decoded._id, getKeys);
                if (rUserInfo.error) {
                    data.errorTitle = '카지노 불러오기 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
                if (rUserInfo.data.isTest) {
                    data.errorTitle = '카지노 불러오기 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'deny', '테스트 아이디는 이용하실 수 없습니다.');
                    res.status(400).json(data);
                    return;
                }
                const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : '';
                const md = new modules_1.mobileDetect(userAgent);
                let isMobile = md.mobile() !== null ? true : false;
                const options = {
                    method: 'POST',
                    url: `${config_1.default.kplay.endpoint}/auth`,
                    headers: {
                        'ag-code': config_1.default.kplay.code,
                        'ag-token': config_1.default.kplay.token,
                        'content-type': 'application/json'
                    },
                    json: {
                        user: {
                            id: rUserInfo.data.seq,
                            name: rUserInfo.data.seq.toString(),
                            balance: rUserInfo.data.money,
                            language: 'ko',
                            domain_url
                        },
                        prd: {
                            id: parseInt(req.params.productID),
                            type: parseInt(req.params.gameID),
                            is_mobile: isMobile
                        }
                    }
                };
                (0, modules_1.request)(options, (err, response, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        res.end('ERROR Please contact the administrator. [1]');
                        return;
                    }
                    else {
                        // console.log(body)
                        if (parseInt(body.status) !== 1) {
                            modules_1.logger.error(JSON.stringify(req.headers));
                            modules_1.logger.error(JSON.stringify(body));
                            res.end('ERROR Please contact the administrator. [2]');
                            return;
                        }
                        if (rUserInfo.data.kplayUserSeq === null) {
                            // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                            const rUserUpdate = yield kplayService.userUpdate(v.decoded._id, body.user_id, body.username);
                            if (rUserUpdate.error) {
                                modules_1.logger.error(JSON.stringify(req.headers));
                                modules_1.logger.error(JSON.stringify(body));
                                res.end('ERROR Please contact the administrator. [3]');
                                return;
                            }
                            // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                        }
                        res.redirect(body.launch_url);
                    }
                }));
            }
            catch (e) {
                modules_1.logger.error(e);
                modules_1.logger.error(JSON.stringify(req.headers));
                res.end('ERROR Please contact the administrator. [4]');
                return;
            }
        });
    }
}
exports.default = GameController;
