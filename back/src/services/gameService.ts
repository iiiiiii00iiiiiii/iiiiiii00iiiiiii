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
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    resultStatus: false
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
                // r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchList')
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
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    resultStatus: false
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
                }

                const sortQuery: any = {
                    gameDateTime: 1,
                    leagueKor: 1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                // r.count = await pool.collection('sportsPrematch').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getPrematchCrossList')
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
                    showStatus: true,
                    onAir: 'onAir',
                    resultStatus: false
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
                // r.count = await pool.collection('sportsLive').countDocuments(findQuery)

                resolve(r)
            } catch (err) {
                logger.error('GameService > getLiveList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}