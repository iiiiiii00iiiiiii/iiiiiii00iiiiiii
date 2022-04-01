import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IGameService {
}

export default class GameService implements IGameService {
    constructor() {
    }

    public getCategory = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true
                }

                const whatQuery: any = {
                    projection: {
                        sport: 1,
                        countryOID: 1,
                        countryKor: 1,
                        leagueKor: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).toArray()
                resolve(r)
            } catch (err) {
                logger.error('GameService > getCategory')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPrematchList = (page: number, sport: string, league: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    sport: {
                        $nin: ['Table Tennis', 'Tennis']
                    }
                }

                if(sport) findQuery.sport = sport
                if(league) findQuery.leagueKor = league

                if(!sport && config.db.id === 'demark') {
                    findQuery.sport.$nin.push('LoL')
                }

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
    public getPrematchListPent = (page: number, sport: string, league: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    sport: {
                        $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LOL', 'MMA']
                    }
                }

                if(sport) findQuery.sport = sport
                if(league) findQuery.leagueKor = league

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchListPent')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPrematchCrossList = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    sport: {
                        $nin: ['Table Tennis', 'Tennis']
                    }
                }

                if(sport) findQuery.sport = sport

                if(!sport && config.db.id === 'demark') {
                    findQuery.sport.$nin.push('LoL')
                }

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchCrossList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
    public getPrematchCrossListPent = (page: number, sport: string, league: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    sport: {
                        $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LOL', 'MMA']
                    }
                }

                if(sport) findQuery.sport = sport
                if(league) findQuery.leagueKor = league

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchCrossListPent')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getLiveList = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    showStatus: true,
                    onAir: 'onAir',
                    sport: {
                        $nin: ['Table Tennis', 'Tennis']
                    }
                }

                if(sport) findQuery.sport = sport

                if(!sport && config.db.id === 'demark') {
                    findQuery.sport.$nin.push('LoL')
                }

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsLive').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsLive').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getLiveList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
    public getLiveListPent = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    showStatus: true,
                    onAir: 'onAir',
                    sport: {
                        $in: ['Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LOL', 'MMA']
                    }
                }

                if(sport) findQuery.sport = sport

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsLive').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsLive').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getLiveListPent')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getLiveDetail = (gameOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(gameOID)
                }

                const whatQuery: any = {
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
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsLive').findOne(findQuery, whatQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getLiveDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPrematchSpecialList = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true
                }

                if(sport) findQuery.sport = sport
                else {
                    findQuery.sport = {
                        $in: ['Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'LoL']
                    }
                }

                if(!sport && config.db.id === 'demark') {
                    findQuery.sport.$in.pop()
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
                ]

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchSpecialList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getLiveKorList = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
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
                }

                if(sport) findQuery.sport = sport

                if(config.db.name === 'mclaren') {
                    delete findQuery.onAir
                    // findQuery.country = {
                    //     $in: ['USA', 'Korea']
                    // }
                    findQuery.custom = true
                }

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsLive').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsLive').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getLiveKorList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getGameResults = (page: number, sport: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                let findQuery: any = {
                    resultStatus: true
                }

                if(sport) findQuery.sport = sport

                const whatQuery: any = {
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
                }

                const sortQuery: any = {
                    gameDateTime: -1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getGameResults')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPowerball = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'powerball',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPowerball')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPowerladder = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'powerladder',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPowerladder')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getKenoladder = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'kenoladder',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getKenoladder')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getBogleladder = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'bogleladder',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getBogleladder')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getBoglePowerball = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'boglePowerball',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getBoglePowerball')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getGooglePowerball1 = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'googlePowerball1',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getGooglePowerball1')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getGooglePowerball3 = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'googlePowerball3',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getGooglePowerball3')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getEosPowerball1 = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'eosPowerball1',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getEosPowerball1')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getEosPowerball3 = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'eosPowerball3',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getEosPowerball3')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getEosPowerball = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'eosPowerball',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getEosPowerball')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getCoinPowerball3 = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'coinPowerball3',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getCoinPowerball3')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getCoinPowerball = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'coinPowerball',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getCoinPowerball')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getSpeedladder = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    gameType: 'speedladder',
                    gameDateTime: {
                        $gte: new Date()
                    },
                    resultStatus: false,
                    rollbackStatus: false,
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        rotation: 1,
                        round: 1,
                        gameDateTime: 1,
                        games: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('miniGames').find(findQuery, whatQuery).sort({ _id: -1 }).limit(1).toArray()

                resolve(r)
            } catch (err) {
                logger.error('GameService > getSpeedladder')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}