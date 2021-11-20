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
                        resultStatus: false,
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        sport: {
                            $ne: 'Table Tennis'
                        }
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
        this.getPrematchCrossList = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        resultStatus: false,
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        sport: {
                            $ne: 'Table Tennis'
                        }
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
        this.getLiveList = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        resultStatus: false,
                        showStatus: true,
                        onAir: 'onAir',
                        sport: {
                            $ne: 'Table Tennis'
                        }
                    };
                    if (sport)
                        findQuery.sport = sport;
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameOID: 1,
                            gameID: 1,
                            gameDateTime: 1,
                            homeTeam: 1,
                            awayTeam: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1,
                            showConfig: 1,
                            games: 1,
                            resultData: 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsLive').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    // r.count = await pool.collection('sportsLive').countDocuments(findQuery)
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getLiveList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getLiveDetail = (gameOID) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        _id: new db_1.ObjectID(gameOID)
                    };
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueKor: 1,
                            gameOID: 1,
                            gameID: 1,
                            gameDateTime: 1,
                            homeTeam: 1,
                            awayTeam: 1,
                            homeTeamKor: 1,
                            awayTeamKor: 1,
                            showConfig: 1,
                            games: 1,
                            resultData: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsLive').findOne(findQuery, whatQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getLiveDetail');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPowerball = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'powerball',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPowerball');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPowerladder = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'powerladder',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPowerladder');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getKenoladder = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'kenoladder',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getKenoladder');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getBogleladder = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'bogleladder',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getBogleladder');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getBoglePowerball = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'boglePowerball',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getBoglePowerball');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getGooglePowerball1 = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'googlePowerball1',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getGooglePowerball1');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getGooglePowerball3 = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'googlePowerball3',
                        gameDateTime: {
                            $gte: new Date()
                        },
                        resultStatus: false,
                        rollbackStatus: false,
                        deleteStatus: false
                    };
                    const whatQuery = {
                        projection: {
                            rotation: 1,
                            round: 1,
                            gameDateTime: 1,
                            games: 1
                        }
                    };
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray();
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getGooglePowerball3');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = GameService;
