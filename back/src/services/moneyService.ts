import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IMoneyService {
}

export default class MoneyService implements IMoneyService {
    constructor() {
    }

    // 입금
    public getChargeList = (page: number, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    deleteStatus: false,
                    type: 'C'
                }

                const whatQuery: any = {
                    projection: {
                        status: 1,
                        money: 1,
                        moneyMethod: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('money').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > getChargeList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public checkIngCharge = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    status: 0,
                    type: 'C'
                }

                const whatQuery: any = {
                    projection: {
                        status: 1,
                        money: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > checkIngCharge')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setCharge = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBank: string,
        userBankOwner: string,
        userBankAccount: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        chargeAmount: number,
        ipaddress: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    status: 0,
                    type: 'C',
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    bank: userBank,
                    bankOwner: userBankOwner,
                    bankAccount: userBankAccount,
                    isAgent,
                    isTest,
                    recommendTree: userRecommendTree,
                    money: mongoSanitize(chargeAmount),
                    deleteStatus: false,
                    ipaddress: ipaddress,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setCharge')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public chargeAlarm = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'alarm'
                }

                const setQuery: any = {
                    $set: {
                        newCharge: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > chargeAlarm')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteCharge = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    status: {
                        $ne: 0
                    },
                    type: 'C',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteCharge')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteChargeAll = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    status: {
                        $ne: 0
                    },
                    type: 'C',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteChargeAll')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public chargeInformation = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    status: {
                        $ne: 0
                    },
                    type: 'C',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > chargeInformation')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setChargePent = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBank: string,
        userBankOwner: string,
        userBankAccount: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        chargeAmount: number,
        moneyMethod: string,
        ipaddress: string,
        method: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    status: 0,
                    type: 'C',
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    bank: userBank,
                    bankOwner: userBankOwner,
                    bankAccount: userBankAccount,
                    isAgent,
                    isTest,
                    recommendTree: userRecommendTree,
                    money: mongoSanitize(chargeAmount),
                    moneyMethod,
                    deleteStatus: false,
                    ipaddress: ipaddress,
                    regDateTime: new Date(),
                    method
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setChargePent')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    // 출금
    public getExchangeList = (page: number, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    deleteStatus: false,
                    type: 'E'
                }

                const whatQuery: any = {
                    projection: {
                        status: 1,
                        money: 1,
                        regDateTime: 1,
                        moneyMethod: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('money').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > getExchangeList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setExchange = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBank: string,
        userBankOwner: string,
        userBankAccount: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        exchangeAmount: number,
        ipaddress: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    status: 0,
                    type: 'E',
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    bank: userBank,
                    bankOwner: userBankOwner,
                    bankAccount: userBankAccount,
                    isAgent,
                    isTest,
                    recommendTree: userRecommendTree,
                    money: mongoSanitize(exchangeAmount),
                    deleteStatus: false,
                    ipaddress: ipaddress,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setExchange')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setExchangeLog = (
        _id: string,
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        money: number,
        exchangeAmount: number
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    userID: userID,
                    userNick: userNick,
                    userGrade: userGrade,
                    bankOwner: userBankOwner,
                    isTest,
                    isAgent,
                    recommendTree: userRecommendTree,
                    before: Math.trunc(money),
                    process: Math.trunc(-exchangeAmount),
                    after: Math.trunc(money) - Math.trunc(exchangeAmount),
                    sortation: 'exchange',
                    reason: '환전',
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    deleteStatus: false,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setExchangeLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setExchangeLogPent = (
        _id: string,
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        money: number,
        minigameMoney: number,
        exchangeAmount: number,
        moneyMethod: string,
        method: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    userID: userID,
                    userNick: userNick,
                    userGrade: userGrade,
                    bankOwner: userBankOwner,
                    isTest,
                    isAgent,
                    recommendTree: userRecommendTree,
                    before: moneyMethod === 'money' ? Math.trunc(money) : Math.trunc(minigameMoney),
                    process: Math.trunc(-exchangeAmount),
                    after: moneyMethod === 'money' ? Math.trunc(money) - Math.trunc(exchangeAmount) : Math.trunc(minigameMoney) - Math.trunc(exchangeAmount),
                    sortation: 'exchange',
                    reason: moneyMethod === 'money' ? '환전-스포츠 머니' : '환전-파워볼 머니',
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    deleteStatus: false,
                    regDateTime: new Date(),
                    method
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setExchangeLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public exchangeAlarm = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'alarm'
                }

                const setQuery: any = {
                    $set: {
                        newExchange: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > exchangeAlarm')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteExchange = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    status: {
                        $ne: 0
                    },
                    type: 'E',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteExchange')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteExchangeAll = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    status: {
                        $ne: 0
                    },
                    type: 'E',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteExchangeAll')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setExchangePent = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBank: string,
        userBankOwner: string,
        userBankAccount: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        exchangeAmount: number,
        moneyMethod: string,
        ipaddress: string,
        method: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    status: 0,
                    type: 'E',
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    bank: userBank,
                    bankOwner: userBankOwner,
                    bankAccount: userBankAccount,
                    isAgent,
                    isTest,
                    recommendTree: userRecommendTree,
                    money: mongoSanitize(exchangeAmount),
                    moneyMethod,
                    deleteStatus: false,
                    ipaddress: ipaddress,
                    regDateTime: new Date(),
                    method
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > setExchangePent')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    // 포인트
    public getPointList = (page: number, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    deleteStatus: false,
                    sortation: 'PointChange'
                }

                const whatQuery: any = {
                    projection: {
                        before: 1,
                        process: 1,
                        after: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('moneyLog').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > getPointList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public exchangePoint = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID),
                    point: {
                        $gt: 0
                    }
                }

                const setQuery: Array<any> = [
                    {
                        $set: {
                            money: {
                                $sum: ['$money', '$point']
                            },
                            point: 0
                        }
                    }
                ]

                const optionsQuery: any = {
                    projection: {
                        id: 1,
                        nick: 1,
                        grade: 1,
                        bankOwner: 1,
                        recommendTree: 1,
                        isAgent: 1,
                        isTest: 1,
                        money: 1,
                        point: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > exchangePoint')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public exchangePointLog = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        isAgent: boolean,
        isTest: boolean,
        userRecommendTree: Array<any>,
        money: number,
        point: number
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: null,
                    userOID: new ObjectID(userOID),
                    userID: userID,
                    userNick: userNick,
                    userGrade: userGrade,
                    bankOwner: userBankOwner,
                    recommendTree: userRecommendTree,
                    before: money,
                    process: point,
                    after: money + point,
                    sortation: 'PointChange',
                    reason: '포인트 전환',
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    regDateTime: new Date(),
                    deleteStatus: false,
                    isAgent,
                    isTest
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > exchangePointLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deletePoint = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    sortation: 'PointChange',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deletePoint')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deletePointAll = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    sortation: 'PointChange',
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deletePointAll')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    // 출석
    public addPointForAttendance = (userOID: string, point: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID)
                }

                const setQuery: any = {
                    $inc: {
                        point
                    }
                }

                const optionsQuery: any = {
                    projection: {
                        point: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > addPointForAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public addMoneyForAttendanceLog = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        userRecommendTree: Array<any>,
        process: number,
        point: number,
        isTest: boolean,
        isAgent: boolean,
        daily: number
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: null,
                    userOID: new ObjectID(userOID),
                    userID,
                    userNick,
                    userGrade,
                    userBankOwner,
                    userRecommendTree,
                    before: point,
                    process,
                    after: point + process,
                    sortation: 'daily',
                    reason: `출석 포인트-${daily}일`,
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    deleteStatus: false,
                    regDateTime: new Date(),
                    isTest,
                    isAgent
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > addMoneyForAttendanceLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    // home
    public getTopExchange = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    regDateTime: {
                        $gte: moment().subtract(30, 'day').toDate()
                    },
                    type: 'E'
                }

                const whatQuery: any = {
                    projection: {
                        type: 1,
                        id: 1,
                        amount: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('fake').find(findQuery, whatQuery).sort({amount: -1}).limit(30).toArray()
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > getTopExchange')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getFake = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    regDateTime: {
                        $gte: moment().subtract(30, 'day').toDate()
                    }
                }

                const whatQuery: any = {
                    projection: {
                        type: 1,
                        id: 1,
                        amount: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('fake').find(findQuery, whatQuery).sort({_id: -1}).limit(30).toArray()
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > getFake')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}