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
                    let findQuery = {
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true,
                        sport: {
                            $nin: ['Table Tennis', 'Tennis']
                        }
                    };
                    if (config_1.default.db.id === 'demark') {
                        findQuery.sport.$nin.push('LoL');
                    }
                    if (config_1.default.db.id === 'napoli') {
                        findQuery.sport.$nin.push('Handball');
                        findQuery.sport.$nin.push('Rugby League');
                        findQuery.sport.$nin.push('Rugby Union');
                        findQuery.sport.$nin.push('Boxing');
                        findQuery.sport.$nin.push('MMA');
                        findQuery.sport.$nin.push('Golf');
                        findQuery.sport.$nin.push('Darts');
                        findQuery.sport.$nin.push('LoL');
                        findQuery.sport.$nin.push('CS:GO');
                        findQuery.sport.$nin.push('Dota 2');
                        findQuery.sport.$nin.push('FIFA');
                    }
                    const whatQuery = {
                        projection: {
                            sport: 1,
                            countryOID: 1,
                            countryKor: 1,
                            leagueOID: 1,
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
                            $nin: ['Table Tennis', 'Tennis']
                        }
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (league)
                        findQuery.leagueKor = league;
                    if (!sport && config_1.default.db.id === 'demark') {
                        findQuery.sport.$nin.push('LoL');
                    }
                    if (!sport && config_1.default.db.id === 'napoli') {
                        findQuery.sport.$nin.push('Handball');
                        findQuery.sport.$nin.push('Rugby League');
                        findQuery.sport.$nin.push('Rugby Union');
                        findQuery.sport.$nin.push('Boxing');
                        findQuery.sport.$nin.push('MMA');
                        findQuery.sport.$nin.push('Golf');
                        findQuery.sport.$nin.push('Darts');
                        findQuery.sport.$nin.push('LoL');
                        findQuery.sport.$nin.push('CS:GO');
                        findQuery.sport.$nin.push('Dota 2');
                        findQuery.sport.$nin.push('FIFA');
                    }
                    if (config_1.default.displaySportCross.length > 0) {
                        findQuery.leagueOID = {
                            $in: config_1.default.displaySportCross
                        };
                    }
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
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
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
        this.getPrematchListPent = (page, sport, league) => {
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
                            $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
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
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchListPent');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getPrematchListModern = (page, sport, countryKor, league) => {
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
                            $in: ['Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Volleyball', 'Rugby League', 'LoL', 'Handball', 'MMA']
                        }
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (countryKor)
                        findQuery.countryKor = countryKor;
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
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchListPent');
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
                            $nin: ['Table Tennis', 'Tennis']
                        }
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (!sport && config_1.default.db.id === 'demark') {
                        findQuery.sport.$nin.push('LoL');
                    }
                    if (config_1.default.displaySportCross.length > 0) {
                        findQuery.leagueOID = {
                            $in: config_1.default.displaySportCross
                        };
                    }
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
                            'games.xKor': 1,
                            'games.handicapKor': 1,
                            'games.handicapTotalSetKor': 1,
                            'games.underOverTotalSetKor': 1,
                            'games.underOverKor': 1,
                            'games.first7PointsKor': 1,
                            'games.run1stInningKor': 1,
                            'games.firstHomerKor': 1,
                            'games.first5PointsKor': 1
                        }
                    };
                    if (config_1.default.db.name === 'study') {
                        whatQuery.projection['games.handicap'] = 1;
                        whatQuery.projection['games.underOver'] = 1;
                    }
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
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
        this.getPrematchCrossListPent = (page, sport, league) => {
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
                            $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
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
                            'games.xKor': 1,
                            'games.handicapKor': 1,
                            'games.handicapTotalSetKor': 1,
                            'games.underOverTotalSetKor': 1,
                            'games.underOverKor': 1,
                            'games.first7PointsKor': 1,
                            'games.run1stInningKor': 1,
                            'games.firstHomerKor': 1,
                            'games.first5PointsKor': 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchCrossListPent');
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
                            $nin: ['Table Tennis', 'Tennis']
                        }
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (!sport && config_1.default.db.id === 'demark') {
                        findQuery.sport.$nin.push('LoL');
                    }
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
                    r.count = yield pool.collection('sportsLive').countDocuments(findQuery);
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
        this.getLiveListPent = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        resultStatus: false,
                        showStatus: true,
                        onAir: 'onAir',
                        sport: {
                            $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
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
                    r.count = yield pool.collection('sportsLive').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getLiveListPent');
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
        this.getPrematchSpecialList = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        resultStatus: false,
                        gameDateTime: {
                            $gt: new Date()
                        },
                        showStatus: true
                    };
                    if (sport)
                        findQuery.sport = sport;
                    else {
                        findQuery.sport = {
                            $in: ['Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'LoL']
                        };
                    }
                    if (!sport && config_1.default.db.id === 'demark') {
                        findQuery.sport.$in.pop();
                    }
                    findQuery.$or = [
                        { 'showConfig.first2Points': true, 'specialActiveObject.first2Points': true },
                        { 'showConfig.first3Points': true, 'specialActiveObject.first3Points': true },
                        { 'showConfig.firstFreeThrow': true, 'specialActiveObject.firstFreeThrow': true },
                        { 'showConfig.handicap1stQuarterSpecial': true, 'specialActiveObject.games1stQuarterSpecial': true },
                        { 'showConfig.underOver1stQuarterSpecial': true, 'specialActiveObject.games1stQuarterSpecial': true },
                        { 'showConfig.firstWalk': true, 'specialActiveObject.firstWalk': true },
                        { 'showConfig.handicapFirst5InningsSpecial': true, 'specialActiveObject.gamesFirst5InningsSpecial': true },
                        { 'showConfig.underOverFirst5InningsSpecial': true, 'specialActiveObject.gamesFirst5InningsSpecial': true },
                        { 'showConfig.firstPoint': true, 'specialActiveObject.firstPoint': true },
                        { 'showConfig.handicap1stPeriodSpecial': true, 'specialActiveObject.games1stPeriodSpecial': true },
                        { 'showConfig.underOver1stPeriodSpecial': true, 'specialActiveObject.games1stPeriodSpecial': true },
                        { 'showConfig.handicap1stSetSpecial': true, 'specialActiveObject.games1stSetSpecial': true },
                        { 'showConfig.underOver1stSetSpecial': true, 'specialActiveObject.games1stSetSpecial': true },
                        { 'showConfig.x1stSetSpecial': true, 'specialActiveObject.x1stSetSpecial': true },
                        { 'showConfig.handicap1stSetKill': true, 'specialActiveObject.games1stSetKill': true },
                        { 'showConfig.underOver1stSetKill': true, 'specialActiveObject.games1stSetKill': true },
                        { 'showConfig.firstTower1stSet': true, 'specialActiveObject.firstTower1stSet': true },
                        { 'showConfig.firstDragon1stSet': true, 'specialActiveObject.firstDragon1stSet': true },
                        { 'showConfig.firstBlood1stSet': true, 'specialActiveObject.firstBlood1stSet': true }
                    ];
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
                            'games.first2Points': 1,
                            'games.first3Points': 1,
                            'games.firstFreeThrow': 1,
                            'games.handicap1stQuarterSpecial': 1,
                            'games.underOver1stQuarterSpecial': 1,
                            'games.firstWalk': 1,
                            'games.handicapFirst5InningsSpecial': 1,
                            'games.underOverFirst5InningsSpecial': 1,
                            'games.firstPoint': 1,
                            'games.handicap1stPeriodSpecial': 1,
                            'games.underOver1stPeriodSpecial': 1,
                            'games.handicap1stSetSpecial': 1,
                            'games.underOver1stSetSpecial': 1,
                            'games.x1stSetSpecial': 1,
                            'games.handicap1stSetKill': 1,
                            'games.underOver1stSetKill': 1,
                            'games.firstTower1stSet': 1,
                            'games.firstDragon1stSet': 1,
                            'games.firstBlood1stSet': 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getPrematchSpecialList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getLiveKorList = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        showStatus: true,
                        onAir: 'onAir',
                        resultStatus: false,
                        $or: [
                            { 'specialActiveObject.handicap2ndQuarterSpecial': true },
                            { 'specialActiveObject.underOver2ndQuarterSpecial': true },
                            { 'specialActiveObject.handicap3rdQuarterSpecial': true },
                            { 'specialActiveObject.underOver3rdQuarterSpecial': true },
                            { 'specialActiveObject.handicap4thQuarterSpecial': true },
                            { 'specialActiveObject.underOver4thQuarterSpecial': true },
                            { 'specialActiveObject.handicap2ndSetSpecial': true },
                            { 'specialActiveObject.underOver2ndSetSpecial': true },
                            { 'specialActiveObject.handicap3rdSetSpecial': true },
                            { 'specialActiveObject.underOver3rdSetSpecial': true }
                        ]
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (config_1.default.db.name === 'mclaren') {
                        delete findQuery.onAir;
                        // findQuery.country = {
                        //     $in: ['USA', 'Korea']
                        // }
                        findQuery.custom = true;
                    }
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
                            resultData: 1,
                            custom: 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: 1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsLive').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('sportsLive').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getLiveKorList');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getGameResults = (page, sport) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    let findQuery = {
                        resultStatus: true,
                    };
                    if (sport)
                        findQuery.sport = sport;
                    if (!sport && config_1.default.db.id === 'napoli') {
                        findQuery.sport = {
                            $in: [
                                'Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Volleyball'
                            ]
                        };
                    }
                    if (config_1.default.displaySportCross.length > 0) {
                        findQuery.leagueOID = {
                            $in: config_1.default.displaySportCross
                        };
                    }
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
                            resultDraw: 1,
                            resultData: 1
                        }
                    };
                    const sortQuery = {
                        gameDateTime: -1,
                        leagueKor: 1
                    };
                    const skip = (page - 1) * config_1.default.sportPageSize;
                    const pool = yield db_1.mongoDB.connect();
                    r.data = yield pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config_1.default.sportPageSize).toArray();
                    r.count = yield pool.collection('sportsPrematch').countDocuments(findQuery);
                    resolve(r);
                }
                catch (err) {
                    modules_1.logger.error('GameService > getGameResults');
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
        this.getEosPowerball1 = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'eosPowerball1',
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
                    modules_1.logger.error('GameService > getEosPowerball1');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getEosPowerball3 = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'eosPowerball3',
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
                    modules_1.logger.error('GameService > getEosPowerball3');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getEosPowerball = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'eosPowerball',
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
                    modules_1.logger.error('GameService > getEosPowerball');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getCoinPowerball3 = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'coinPowerball3',
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
                    modules_1.logger.error('GameService > getCoinPowerball3');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getCoinPowerball = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'coinPowerball',
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
                    modules_1.logger.error('GameService > getCoinPowerball');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
        this.getSpeedladder = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let r = { error: null, data: null, count: null };
                try {
                    const findQuery = {
                        gameType: 'speedladder',
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
                    modules_1.logger.error('GameService > getSpeedladder');
                    modules_1.logger.error(err);
                    r.error = err;
                    resolve(r);
                }
            }));
        };
    }
}
exports.default = GameService;
