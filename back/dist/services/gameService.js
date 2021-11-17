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
class GameService {
    constructor() {
        this.getCategory = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true
                    };
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueKor: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getCategory');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPrematchList = (page, sport, league) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        resultStatus: false
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (league)
                        findQuery.leagueKor = league;
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameDateTime: 1,
                            homeTeam: 1,
                            awayTeam: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1,
                            showConfig: 1,
                            games: 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    // r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPrematchCrossList = (page, sport, league) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        resultStatus: false
                    };
                    if (sport)
                        findQuery.sport = sport;
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameDateTime: 1,
                            homeTeam: 1,
                            awayTeam: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1,
                            showConfig: 1,
                            'games.x': 1,
                            'games.handicap': 1,
                            'games.handicapTotalSet': 1,
                            'games.underOverTotalSet': 1,
                            'games.underOver': 1,
                            'games.first7Points': 1,
                            'games.run1stInning': 1,
                            'games.firstHomer': 1,
                            'games.first5Points': 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    // r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchCrossList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = GameService;
