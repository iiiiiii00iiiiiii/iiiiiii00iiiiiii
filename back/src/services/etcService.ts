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
                const findQuery: any = {
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
                    setDate: new Date(setDate),
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

    public getBeforeAttendanceCount = (startDate: Date, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    regDateTime: {
                        $gte: moment(startDate).startOf('day').toDate()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('EtcService > getBeforeAttendanceCount')
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
}