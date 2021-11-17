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
const betService_1 = __importDefault(require("../services/betService"));
const betService = new betService_1.default();
// import EtcService from '../services/etcService'
// const etcService: EtcService = new EtcService()
const validate_1 = __importDefault(require("../lib/validate"));
const validate = new validate_1.default();
class BetController {
    constructor() {
        this.bet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validateData = {
                betGameType: {
                    value: req.body.betGameType,
                    rule: {
                        required: true,
                        or: ['sports', 'sportsCross', 'sportsLive', 'sportsSpecial', 'sportsLiveKor', 'minigames']
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        or: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                },
                betCart: {
                    value: req.body.betCart,
                    rule: {
                        array: true
                    },
                    message: {
                        array: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                },
                betAmount: {
                    value: req.body.betAmount,
                    rule: {
                        required: true,
                        number: true
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        number: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                },
                betRate: {
                    value: req.body.betRate,
                    rule: {
                        required: true,
                        number: true,
                        gt: 0,
                        outputString: true
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        number: '파라메터 오류. 관리자에게 문의하세요.',
                        gt: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                },
                betCount: {
                    value: req.body.betCount,
                    rule: {
                        required: true,
                        number: true,
                        gt: 0
                    },
                    message: {
                        required: '파라메터 오류. 관리자에게 문의하세요.',
                        number: '파라메터 오류. 관리자에게 문의하세요.',
                        gt: '파라메터 오류. 관리자에게 문의하세요.'
                    }
                }
            };
            // validate start
            let v = {};
            let data = {};
            try {
                v = validate.validate(validateData);
                if (v.error) {
                    v.errorTitle = '배팅 실패 - 500';
                    res.status(500).json(v);
                    return;
                }
                data = v;
                if (v.firstError) {
                    data.errorTitle = '배팅 실패 - 400';
                    res.status(400).json(data);
                    return;
                }
                v = tools_1.default.generateReqValue(data.validates, req);
            }
            catch (error) {
                v.errorTitle = '배팅 validate 실패 - 500';
                res.status(500).json(v);
                return;
            }
            // validate end
            v.betRate = parseFloat(v.betRate);
            let gameKind = v.betGameType;
            let category = '';
            if (gameKind === 'sports' || gameKind === 'sportsCross' || gameKind === 'sportsLive' || gameKind === 'sportsSpecial' || gameKind === 'sportsLiveKor') {
                category = 'sportsBet';
            }
            else if (gameKind === 'minigames') {
                let gameKind = v.betCart[0].gameKind;
                if (gameKind === 'powerball')
                    category = 'powerballBet';
                else if (gameKind === 'powerladder')
                    category = 'powerladderBet';
                else if (gameKind === 'kenoladder')
                    category = 'kenoladderBet';
            }
            v.category = category;
            v.gameKind = gameKind;
            try {
                // ■■■■■■■■■■ DB-최소, 최대 배팅, 최대 당첨금 가져오기 ■■■■■■■■■■
                const resultBetMinMax = yield betService.betMinMax(v.category, v.betGameType, v.betCart, v.decoded.grade);
                if (resultBetMinMax.error) {
                    data.errorTitle = '배팅 실패 - 500';
                    res.status(500).json(data);
                    return;
                }
                // ■■■■■■■■■■ DB-최소, 최대 배팅, 최대 당첨금 가져오기 ■■■■■■■■■■
                if (v.betGameType === 'minigames') {
                    v.resultBetMinMax = resultBetMinMax.data[v.betCart[0].type];
                }
                else {
                    v.resultBetMinMax = resultBetMinMax.data[`lv${v.decoded.grade}`];
                }
                if (parseInt(v.betAmount) < v.resultBetMinMax.min) {
                    data.errorTitle = '배팅 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'min', '최소 배팅금액 이상으로 배팅하세요.');
                    res.status(400).json(data);
                    return;
                }
                if (parseInt(v.betAmount) > v.resultBetMinMax.max) {
                    data.errorTitle = '배팅 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'max', '최대 배팅금액 이하로 배팅하세요.');
                    res.status(400).json(data);
                    return;
                }
                //gameType에 따른 분리
                if (v.gameKind === 'sports' || v.gameKind === 'sportsCross' || v.gameKind === 'sportsLive' || v.gameKind === 'sportsSpecial' || v.gameKind === 'sportsLiveKor') {
                    this.betSports(v, res, data);
                }
                // else if(v.gameKind === 'minigames') {
                //     controllerBet.betMiniGame(v, res, data)
                // }
            }
            catch (e) {
                modules_1.logger.error(e);
                data.errorTitle = '배팅 실패 - 500';
                res.status(500).json(data);
                return;
            }
        });
        this.betSports = (v, res, data) => __awaiter(this, void 0, void 0, function* () {
            // 단폴, 두폴 배팅가능 여부 검사
            if (v.betCount <= 2) {
                // ■■■■■■■■■■ DB-회원 단폴, 두폴 설정 가져오기 ■■■■■■■■■■
                let resultFolderInfo = yield betService.folderInfo(v.decoded._id);
                if (resultFolderInfo.error) {
                    data.errorTitle = '배팅 실패 - 500';
                    res.status(500).end();
                    return;
                }
                // ■■■■■■■■■■ DB-회원 단폴, 두폴 설정 가져오기 ■■■■■■■■■■
                v.resultFolderInfo = resultFolderInfo.data;
                if (v.betCount === 1 && !v.resultFolderInfo.sportsConfig.bet1FolderStatus) {
                    data.errorTitle = '배팅 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'betCount', '단폴더 배팅이 불가능 합니다.');
                    res.status(400).json(data);
                    return;
                }
                if (v.betCount === 2 && !v.resultFolderInfo.sportsConfig.bet2FolderStatus) {
                    data.errorTitle = '배팅 실패 - 400';
                    data = tools_1.default.denyValidate(data, 'betCount', '두폴더 배팅이 불가능 합니다.');
                    res.status(400).json(data);
                    return;
                }
            }
            // 해당게임 배팅가능 여부 검사
            // ■■■■■■■■■■ DB-스포츠 게임정보 가져오기 ■■■■■■■■■■
            let resultSportsInfo = yield betService.sportsInfo(v.betGameType, v.betCart);
            if (resultSportsInfo.error) {
                data.errorTitle = '배팅 실패 - 500';
                res.status(500).end();
                return;
            }
            //■■■■■■■■■■ DB-스포츠 게임정보 가져오기 ■■■■■■■■■■
            v.resultSportsInfo = resultSportsInfo.data;
            if (v.resultSportsInfo.length !== v.betCount && v.gameKind !== 'sportsCross' && v.gameKind !== 'sportsSpecial' && v.gameKind !== 'sportsLiveKor') {
                data.errorTitle = '배팅 실패 - 400';
                data = tools_1.default.denyValidate(data, 'betCart', '배팅 불가능 경기가 포함되어 있습니다.');
                res.status(400).json(data);
                return;
            }
            let passResultStatus = true;
            let passRollbackStatus = true;
            let passDeleteStatus = true;
            let passShowStatus = true;
            let passAll = true;
            let arrayRate = [];
            for (let i = 0; i < v.betCart.length; i++) {
                let gameIndex = v.resultSportsInfo.findIndex((x) => x._id.toString() === v.betCart[i]._id);
                if (v.resultSportsInfo[gameIndex].resultStatus) {
                    passResultStatus = false;
                    passAll = false;
                    console.log(1);
                    break;
                }
                if (v.resultSportsInfo[gameIndex].rollbackStatus) {
                    passRollbackStatus = false;
                    passAll = false;
                    console.log(2);
                    break;
                }
                if (v.resultSportsInfo[gameIndex].deleteStatus) {
                    passDeleteStatus = false;
                    passAll = false;
                    console.log(3);
                    break;
                }
                if (!v.resultSportsInfo[gameIndex].showStatus) {
                    passShowStatus = false;
                    passAll = false;
                    console.log(4);
                    break;
                }
                if (!v.resultSportsInfo[gameIndex].showConfig[v.betCart[i].type]) {
                    passShowStatus = false;
                    passAll = false;
                    console.log(5);
                    break;
                }
                let resultCheckGameStatusAndReturnRate = this.checkGameStatusAndReturnRate(v.betCart[i], v.resultSportsInfo[gameIndex]);
                if (!resultCheckGameStatusAndReturnRate.status) {
                    passShowStatus = false;
                    passAll = false;
                    console.log(6);
                    break;
                }
                v.betCart[i].finalRate = resultCheckGameStatusAndReturnRate.rate;
                v.betCart[i].betResult = 'I';
                v.betCart[i].score = {
                    homeScore: v.resultSportsInfo[gameIndex].resultData.homeScoreTotal ? v.resultSportsInfo[gameIndex].resultData.homeScoreTotal : null,
                    awayScore: v.resultSportsInfo[gameIndex].resultData.awayScoreTotal ? v.resultSportsInfo[gameIndex].resultData.awayScoreTotal : null,
                };
                v.betCart[i].leagueKor = v.resultSportsInfo[gameIndex].leagueKor;
                v.betCart[i].gameDateTime = v.resultSportsInfo[gameIndex].gameDateTime;
                arrayRate.push(resultCheckGameStatusAndReturnRate.rate);
            }
            if (!passAll) {
                data.errorTitle = '배팅 실패 - 400';
                data = tools_1.default.denyValidate(data, 'betCart', '배팅 불가능 경기가 포함되어 있습니다.');
                res.status(400).json(data);
                return;
            }
            let sumRate = 1;
            for (let i = 0; i < arrayRate.length; i++) {
                sumRate *= arrayRate[i];
            }
            sumRate = Math.trunc((sumRate * 100)) / 100;
            if (sumRate > config_1.default.sportsMaxRate) {
                data.errorTitle = '배팅 실패 - 400';
                data = tools_1.default.denyValidate(data, 'betRate', `최대 ${(0, modules_1.numeral)(config_1.default.sportsMaxRate).format('0,0')}배 까지 배팅 가능 합니다.`);
                res.status(400).json(data);
                return;
            }
            v.betRate = sumRate;
            v.betBenefit = Math.trunc(v.betRate * v.betAmount);
            if (v.betBenefit > v.resultBetMinMax.benefit) {
                data.errorTitle = '배팅 실패 - 400';
                data = tools_1.default.denyValidate(data, 'betAmount', '최대 당첨금을 초과하였습니다.');
                res.status(400).json(data);
                return;
            }
            // ■■■■■■■■■■ DB-스포츠 배팅머니 차감, 회원정보 업데이트, 회원정보 가져오기 ■■■■■■■■■■
            let resultBetSubtractSports = yield betService.betSubtractSports(v);
            if (resultBetSubtractSports.error) {
                data.errorTitle = '배팅 실패 - 500';
                res.status(500).end();
                return;
            }
            // ■■■■■■■■■■ DB-스포츠 배팅머니 차감, 회원정보 업데이트, 회원정보 가져오기 ■■■■■■■■■■
            v.resultBetSubtractSports = resultBetSubtractSports.data.value;
            if (!v.resultBetSubtractSports) {
                data.errorTitle = '배팅 실패 - 400';
                data = tools_1.default.denyValidate(data, 'betAmount', '현재 배팅이 불가능 합니다.');
                res.status(400).json(data);
                return;
            }
            for (let i = 0; i < v.betCart.length; i++) {
                v.betCart[i]._id = new db_1.ObjectID(v.betCart[i]._id);
            }
            // ■■■■■■■■■■ DB-스포츠 배팅 ■■■■■■■■■■
            let resultBetSports = yield betService.betSports(v);
            if (resultBetSports.error) {
                data.errorTitle = '배팅 실패 - 500';
                res.status(500).end();
                return;
            }
            // ■■■■■■■■■■ DB-스포츠 배팅 ■■■■■■■■■■
            v.cartOID = resultBetSports.data.insertedId;
            // ■■■■■■■■■■ DB-스포츠 경기에 배팅금액 업데이트 ■■■■■■■■■■
            let resultSetBetSports = yield betService.setBetSports(v);
            // if(resultSetBetSports.error) {
            //     data.errorTitle = '배팅 실패 - 500'
            //     res.status(500).end()
            //     return
            // }
            // ■■■■■■■■■■ DB-스포츠 경기에 배팅금액 업데이트 ■■■■■■■■■■
            if (resultSetBetSports.data.modifiedCount !== parseInt(v.betCount) && v.gameKind !== 'sportsCross' && v.gameKind !== 'sportsSpecial' && v.gameKind !== 'sportsLiveKor') {
                modules_1.logger.info('배팅경기, DB 스포츠 경기 업데이트 갯수 틀림.');
                modules_1.logger.info(v.betCart);
            }
            // ■■■■■■■■■■ DB-스포츠 배팅 로그 남기기 ■■■■■■■■■■
            let resultSetBetMoneyLogSports = yield betService.setBetMoneyLogSports(v);
            // if(resultSetBetMoneyLogSports.error) {
            //     data.errorTitle = '배팅 실패 - 500'
            //     res.status(500).end()
            //     return
            // }
            // ■■■■■■■■■■ DB-스포츠 배팅 로그 남기기 ■■■■■■■■■■
            res.end();
        });
        this.checkGameStatusAndReturnRate = (game, games) => {
            let r = {
                status: true,
                rate: 1,
                rateKey: ''
            };
            //  승무패
            if (game.type === 'x') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  더블찬스
            if (game.type === 'xDouble') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'homeDraw')
                    r.rate = games.games[game.type][0].homeDrawRate;
                if (game.select === 'homeAway')
                    r.rate = games.games[game.type][0].homeAwayRate;
                if (game.select === 'awayDraw')
                    r.rate = games.games[game.type][0].awayDrawRate;
                return r;
            }
            //  승무패 핸디캡
            if (game.type === 'threeWayHandicap') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][index].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  핸디캡
            if (game.type === 'handicap') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  탁구 핸디캡
            if (game.type === 'handicapTotalSet') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  언더오버
            if (game.type === 'underOver') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  탁구 언더오버
            if (game.type === 'underOverTotalSet') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  풀타임 홀짝
            if (game.type === 'oddEvenFullTime') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  1이닝 승무패
            if (game.type === 'x1stInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1이닝 핸디캡
            if (game.type === 'handicap1stInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1이닝 언더오버
            if (game.type === 'underOver1stInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  2이닝 승무패
            if (game.type === 'x2ndInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  2이닝 핸디캡
            if (game.type === 'handicap2ndInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2이닝 언더오버
            if (game.type === 'underOver2ndInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3이닝 승무패
            if (game.type === 'x3rdInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  3이닝 핸디캡
            if (game.type === 'handicap3rdInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3이닝 언더오버
            if (game.type === 'underOver3rdInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  4이닝 승무패
            if (game.type === 'x4thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  4이닝 핸디캡
            if (game.type === 'handicap4thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  4이닝 언더오버
            if (game.type === 'underOver4thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  5이닝 승무패
            if (game.type === 'x5thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  5이닝 핸디캡
            if (game.type === 'handicap5thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  5이닝 언더오버
            if (game.type === 'underOver5thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  6이닝 승무패
            if (game.type === 'x6thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  6이닝 핸디캡
            if (game.type === 'handicap6thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  6이닝 언더오버
            if (game.type === 'underOver6thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  7이닝 승무패
            if (game.type === 'x7thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  7이닝 핸디캡
            if (game.type === 'handicap7thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  7이닝 언더오버
            if (game.type === 'underOver7thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  8이닝 승무패
            if (game.type === 'x8thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  8이닝 핸디캡
            if (game.type === 'handicap8thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  8이닝 언더오버
            if (game.type === 'underOver8thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  9이닝 승무패
            if (game.type === 'x9thInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  9이닝 핸디캡
            if (game.type === 'handicap9thInning') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  9이닝 언더오버
            if (game.type === 'underOver9thInning') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1세트 승패
            if (game.type === 'x1stSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1세트 핸디캡
            if (game.type === 'handicap1stSet') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1세트 언더오버
            if (game.type === 'underOver1stSet') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1세트 홀짝
            if (game.type === 'oddEven1stSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  2세트 승패
            if (game.type === 'x2ndSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  2세트 핸디캡
            if (game.type === 'handicap2ndSet') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2세트 언더오버
            if (game.type === 'underOver2ndSet') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  2세트 홀짝
            if (game.type === 'oddEven2ndSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  3세트 승패
            if (game.type === 'x3rdSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  3세트 핸디캡
            if (game.type === 'handicap3rdSet') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3세트 언더오버
            if (game.type === 'underOver3rdSet') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3세트 홀짝
            if (game.type === 'oddEven3rdSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  1피리어드 승무패
            if (game.type === 'x1stPeriod') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1피리어드 핸디캡
            if (game.type === 'handicap1stPeriod') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1피리어드 언더오버
            if (game.type === 'underOver1stPeriod') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  2피리어드 승무패
            if (game.type === 'x2ndPeriod') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  2피리어드 핸디캡
            if (game.type === 'handicap2ndPeriod') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2피리어드 언더오버
            if (game.type === 'underOver2ndPeriod') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3피리어드 승무패
            if (game.type === 'x3rdPeriod') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  3피리어드 핸디캡
            if (game.type === 'handicap3rdPeriod') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3피리어드 언더오버
            if (game.type === 'underOver3rdPeriod') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1쿼터 승무패
            if (game.type === 'x1stQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1쿼터 핸디캡
            if (game.type === 'handicap1stQuarter') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1쿼터 언더오버
            if (game.type === 'underOver1stQuarter') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1쿼터 홀짝
            if (game.type === 'oddEven1stQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  2쿼터 승무패
            if (game.type === 'x2ndQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  2쿼터 핸디캡
            if (game.type === 'handicap2ndQuarter') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2쿼터 언더오버
            if (game.type === 'underOver2ndQuarter') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  2쿼터 홀짝
            if (game.type === 'oddEven2ndQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  3쿼터 승무패
            if (game.type === 'x3rdQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  3쿼터 핸디캡
            if (game.type === 'handicap3rdQuarter') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3쿼터 언더오버
            if (game.type === 'underOver3rdQuarter') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3쿼터 홀짝
            if (game.type === 'oddEven3rdQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  4쿼터 승무패
            if (game.type === 'x4thQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  4쿼터 핸디캡
            if (game.type === 'handicap4thQuarter') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  4쿼터 언더오버
            if (game.type === 'underOver4thQuarter') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  4쿼터 홀짝
            if (game.type === 'oddEven4thQuarter') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  전반전 승무패
            if (game.type === 'x1stHalf') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  전반전 핸디캡
            if (game.type === 'handicap1stHalf') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  전반전 언더오버
            if (game.type === 'underOver1stHalf') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  전반전 홀짝
            if (game.type === 'oddEven1stHalf') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  5이닝 까지 승무패
            if (game.type === 'xFirst5Innings') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  5이닝 까지 언더오버
            if (game.type === 'underOverFirst5Innings') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  후반전 승무패
            if (game.type === 'x2ndHalf') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'draw')
                    r.rate = games.games[game.type][0].drawRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  후반전 핸디캡
            if (game.type === 'handicap2ndHalf') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  후반전 언더오버
            if (game.type === 'underOver2ndHalf') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  후반전 홀짝
            if (game.type === 'oddEven2ndHalf') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'odd')
                    r.rate = games.games[game.type][0].oddRate;
                if (game.select === 'even')
                    r.rate = games.games[game.type][0].evenRate;
                return r;
            }
            //  풀타임 양팀 득점
            if (game.type === 'bothTeamScore') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'yes')
                    r.rate = games.games[game.type][0].yesRate;
                if (game.select === 'no')
                    r.rate = games.games[game.type][0].noRate;
                return r;
            }
            //  양팀 득점 + 승무패
            if (game.type === 'bothTeamsGoalWin') {
                let index = games.games[game.type].findIndex((x) => x.type === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'yes')
                    r.rate = games.games[game.type][index].yesRate;
                if (game.select === 'no')
                    r.rate = games.games[game.type][index].noRate;
                return r;
            }
            //  양팀 득점 + 더블찬스
            if (game.type === 'bothTeamsGoalWinOrDraw') {
                let index = games.games[game.type].findIndex((x) => x.type === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'yes')
                    r.rate = games.games[game.type][index].yesRate;
                if (game.select === 'no')
                    r.rate = games.games[game.type][index].noRate;
                return r;
            }
            //  첫골 팀
            if (game.type === 'firstScoreTeam') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'neither')
                    r.rate = games.games[game.type][0].neitherRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  야구 첫득점 팀
            if (game.type === 'firstRun') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  마지막골 팀
            if (game.type === 'lastScoreTeam') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'neither')
                    r.rate = games.games[game.type][0].neitherRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  야구 마지막 득점 팀
            if (game.type === 'lastRun') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  최다골 시점
            if (game.type === 'halfWithMostScore') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'half1st')
                    r.rate = games.games[game.type][0].half1stRate;
                if (game.select === 'drawEqualNumber')
                    r.rate = games.games[game.type][0].drawEqualNumberRate;
                if (game.select === 'half2nd')
                    r.rate = games.games[game.type][0].half2ndRate;
                return r;
            }
            //  정확한 점수
            if (game.type === 'correctScoreFullTime') {
                let index = games.games[game.type].findIndex((x) => `${x.homeScore}:${x.awayScore}` === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                r.rate = games.games[game.type][index].rate;
                return r;
            }
            //  승무패 언더오버
            if (game.type === 'xWithUnderOver') {
                let index = games.games[game.type].findIndex((x) => `${x.team}${x.type}-${x.standard}` === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'yes')
                    r.rate = games.games[game.type][index].yesRate;
                if (game.select === 'no')
                    r.rate = games.games[game.type][index].noRate;
                return r;
            }
            //  첫7득점
            if (game.type === 'first7Points') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  첫5득점
            if (game.type === 'first5Points') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1이닝 득점/무득점
            if (game.type === 'run1stInning') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'yes')
                    r.rate = games.games[game.type][0].yesRate;
                if (game.select === 'no')
                    r.rate = games.games[game.type][0].noRate;
                return r;
            }
            //  첫홈런
            if (game.type === 'firstHomer') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  첫 2점슛
            if (game.type === 'first2Points') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  첫 3점슛
            if (game.type === 'first3Points') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  첫 자유투
            if (game.type === 'firstFreeThrow') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1쿼터 핸디캡
            if (game.type === 'handicap1stQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1쿼터 언더오버
            if (game.type === 'underOver1stQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  첫 볼넷
            if (game.type === 'firstWalk') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  5이닝 핸디캡
            if (game.type === 'handicapFirst5InningsSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  5이닝 언더오버
            if (game.type === 'underOverFirst5InningsSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1세트 핸디캡
            if (game.type === 'handicap1stSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1세트 언더오버
            if (game.type === 'underOver1stSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1피리어드 핸디캡
            if (game.type === 'handicap1stPeriodSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1피리어드 언더오버
            if (game.type === 'underOver1stPeriodSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  첫 득점
            if (game.type === 'firstPoint') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1세트 승패
            if (game.type === 'x1stSetSpecial') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1세트 핸디캡(킬)
            if (game.type === 'handicap1stSetKill') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  1세트 언더오버(킬)
            if (game.type === 'underOver1stSetKill') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  1세트 첫타워
            if (game.type === 'firstTower1stSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1세트 첫용
            if (game.type === 'firstDragon1stSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  1세트 첫킬
            if (game.type === 'firstBlood1stSet') {
                if (games.games[game.type][0].status !== 'ACTIVE' || !games.games[game.type][0].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][0].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][0].awayRate;
                return r;
            }
            //  2쿼터 핸디캡
            if (game.type === 'handicap2ndQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2쿼터 언더오버
            if (game.type === 'underOver2ndQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3쿼터 핸디캡
            if (game.type === 'handicap3rdQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3쿼터 언더오버
            if (game.type === 'underOver3rdQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  4쿼터 핸디캡
            if (game.type === 'handicap4thQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  4쿼터 언더오버
            if (game.type === 'underOver4thQuarterSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  2세트 핸디캡
            if (game.type === 'handicap2ndSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  2세트 언더오버
            if (game.type === 'underOver2ndSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            //  3세트 핸디캡
            if (game.type === 'handicap3rdSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.homeStandard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'home')
                    r.rate = games.games[game.type][index].homeRate;
                if (game.select === 'away')
                    r.rate = games.games[game.type][index].awayRate;
                return r;
            }
            //  3세트 언더오버
            if (game.type === 'underOver3rdSetSpecial') {
                let index = games.games[game.type].findIndex((x) => x.standard === game.standard);
                if (index === -1) {
                    r.status = false;
                    return r;
                }
                if (games.games[game.type][index].status !== 'ACTIVE' || !games.games[game.type][index].showStatus) {
                    r.status = false;
                    return r;
                }
                if (game.select === 'under')
                    r.rate = games.games[game.type][index].underRate;
                if (game.select === 'over')
                    r.rate = games.games[game.type][index].overRate;
                return r;
            }
            return true;
        };
    }
}
exports.default = BetController;
