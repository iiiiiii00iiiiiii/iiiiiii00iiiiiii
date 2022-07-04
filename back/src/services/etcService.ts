import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IEtcService {
}

export default class EtcService implements IEtcService {
    constructor() {
    }

    public getConfigInfo = (category: string, getKeys: Array<string>): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            if(getKeys.length === 0) {
                r.error = 'Empty getKeys'
                resolve(r)
                return
            }

            try {
                let findQuery: any = {
                    category
                }

                let whatQuery: any = {
                    projection: {}
                }

                for(let i: number = 0; i < getKeys.length; i++) {
                    whatQuery.projection[getKeys[i]] = 1
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getConfigInfo')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getConfigInfo1Folder = (getKeys: Array<string>): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            if(getKeys.length === 0) {
                r.error = 'Empty getKeys'
                resolve(r)
                return
            }

            try {
                let findQuery: any = {
                    category: 'sportsBet1Folder'
                }

                let whatQuery: any = {
                    projection: {}
                }

                for(let i: number = 0; i < getKeys.length; i++) {
                    whatQuery.projection[getKeys[i]] = 1
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getConfigInfo1Folder')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getConfigAttendance = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {}

                let whatQuery: any = {
                    projection: {}
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('daily').find(findQuery).sort({ category: -1 }).toArray()
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getConfigAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setAttendance = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        userRecommendTree: Array<any>,
        setDate: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    userBankOwner,
                    userRecommendTree,
                    setDate: moment(setDate).startOf('day').toDate(),
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > setAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getBeforeAttendance = (startDate: Date, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    setDate: {
                        $gte: moment(startDate).startOf('day').toDate()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').find(findQuery).sort({setDate: -1}).toArray()
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getBeforeAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getYesterdayAttendance = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    setDate: moment().subtract(1, 'day').startOf('day').toDate()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').findOne(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getYesterdayAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setUpdateAttendance = (_id: string, isLast: boolean): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id)
                }

                const setQuery: any = {
                    $set: {
                        isLast
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > setUpdateAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getBeforeAttendanceOne = (startDate: Date, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    // setDate: moment(startDate).startOf('day').toDate()
                    setDate: {
                        $gt: moment(startDate).startOf('day').toDate(),
                        $lt: moment(startDate).endOf('day').toDate()
                    }
                }

                // console.log(findQuery)

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').findOne(findQuery)
                // console.log(r.data)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getBeforeAttendanceOne')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getPopups = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    status: true,
                    startDateTime: {
                        $lte: new Date()
                    },
                    endDateTime: {
                        $gte: new Date()
                    }
                }

                const whatQuery: any = {
                    projection: {
                        images: 1,
                        location: 1,
                        popupSize: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('popup').find(findQuery, whatQuery).toArray()
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getPopups')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getMaintenance = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'maintenance'
                }

                const whatQuery: any = {
                    projection: {
                        startDateTime: 1,
                        endDateTime: 1,
                        content: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getMaintenance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getShortNotice = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'notice'
                }

                const whatQuery: any = {
                    projection: {
                        content: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getShortNotice')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getFriendsList = (page: number, _id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    'recommendTree._id': new ObjectID(_id),
                    status: 1
                }

                const whatQuery: any = {
                    projection: {
                        id: 1,
                        nick: 1,
                        totalCharge: 1,
                        totalExchange: 1,
                        lastLoginDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('users').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getFriendsList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getHomeMatch = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true
                }

                const whatQuery: any = {
                    projection: {
                        sport: 1,
                        countryKor: 1,
                        leagueKor: 1,
                        gameDateTime: 1,
                        homeTeamKor: 1,
                        awayTeamKor: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').find(findQuery, whatQuery).limit(4).toArray()
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getHomeMatch')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getHomeLive = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    resultStatus: false,
                    gameDateTime: {
                        $gt: new Date()
                    },
                    showStatus: true,
                    onAir: {
                        $in: ['ready', 'onAir']
                    },
                    sport: {
                        $in: ['Basketball', 'Baseball']
                    }
                }

                const whatQuery: any = {
                    projection: {
                        sport: 1,
                        countryKor: 1,
                        leagueKor: 1,
                        gameDateTime: 1,
                        homeTeamKor: 1,
                        awayTeamKor: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsLive').find(findQuery, whatQuery).limit(4).toArray()
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getHomeLive')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}