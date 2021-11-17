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
const userService_1 = __importDefault(require("../services/userService"));
const userService = new userService_1.default();
const messageService_1 = __importDefault(require("../services/messageService"));
const messageService = new messageService_1.default();
const boardService_1 = __importDefault(require("../services/boardService"));
const boardService = new boardService_1.default();
const etcService_1 = __importDefault(require("../services/etcService"));
const etcService = new etcService_1.default();
class EtcController {
    constructor() {
        this.getPopups = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-팝업 가져오기 ■■■■■■■■■■
                const r = yield etcService.getPopups();
                if (r.error) {
                    data.errorTitle = '팝업 상세 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-팝업 가져오기 ■■■■■■■■■■
                res.json(r.data);
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '팝업 상세 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.checkDuplicateAndEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate start
            let v = tools_1.default.generateReqValue({}, req);
            let data = v;
            // validate end
            try {
                // ■■■■■■■■■■ DB-토큰 검증 ■■■■■■■■■■
                const rCheckDtoken = yield userService.checkDToken(v.decoded._id, v.dToken);
                if (rCheckDtoken.error) {
                    data.errorTitle = 'EVENT 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-토큰 검증 ■■■■■■■■■■
                if (rCheckDtoken.data === 0) {
                    res.status(401).end();
                    return;
                }
                // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■
                const rMaintenance = yield etcService.maintenance();
                if (rMaintenance.error) {
                    data.errorTitle = 'EVENT 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■
                const dt = new Date();
                if (dt >= rMaintenance.data.startDateTime && dt <= rMaintenance.data.endDateTime) {
                    data.errorTitle = null;
                    res.status(503).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-쪽지 갯수 가져오기 ■■■■■■■■■■
                const rMessageCount = yield messageService.messageCount(v.decoded._id);
                if (rMessageCount.error) {
                    data.errorTitle = 'EVENT 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-쪽지 갯수 가져오기 ■■■■■■■■■■
                // ■■■■■■■■■■ DB-고객센터 미확인 답변 갯수 가져오기 ■■■■■■■■■■
                const rHelpCount = yield boardService.helpCount(v.decoded._id);
                if (rHelpCount.error) {
                    data.errorTitle = 'EVENT 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-고객센터 미확인 답변 갯수 가져오기 ■■■■■■■■■■
                res.json({
                    messageCount: rMessageCount.data,
                    helpCount: rHelpCount.data
                });
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = 'EVENT 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
    }
}
exports.default = EtcController;
