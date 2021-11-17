import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IBetService {
}

export default class BetService implements IBetService {
    constructor() {
    }

    public betMinMax = (category: string, betGameType: string, betCart: Array<any>, userGrade: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: category,
                }

                let whatQuery: any = {
                    projection: {  }
                }

                if(betGameType === 'minigames') {
                    whatQuery.projection[betCart[0].type] = 1
                }
                else {
                    whatQuery.projection[`lv${userGrade}`] = 1
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > betMinMax')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public folderInfo = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID)
                }

                const whatQuery: any = {
                    projection: {
                        sportsConfig: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > folderInfo')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsInfo = (betGameType: string, betCart: Array<any>): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            let ids: Array<any> = []
            for(let i = 0; i < betCart.length; i++) {
                ids.push(new ObjectID(betCart[i]._id))
            }

            try {
                const findQuery: any = {
                    _id: {
                        $in: ids
                    },
                    resultStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        sport: 1,
                        leagueKor: 1,
                        gameDateTime: 1,
                        showStatus: 1,
                        showConfig: 1,
                        games: 1,
                        resultData: 1,
                        resultStatus: 1,
                        rollbackStatus: 1,
                        deleteStatus: 1
                    }
                }

                let collection: string = 'sportsPrematch'
                if(betGameType === 'sportsLive' || betGameType === 'sportsLiveKor') {
                    collection = 'sportsLive'
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection(collection).find(findQuery, whatQuery).toArray()
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsInfo')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public betSubtractSports = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(v.decoded._id),
                    money: {
                        $gte: v.betAmount
                    },
                    status: 1,
                    betStatus: true,
                    isAgent: false
                }

                let betLimitCount: number = v.betCount
                if(betLimitCount > 10) betLimitCount = 10

                let setQuery: any = {
                    $inc: {
                        money: -v.betAmount,
                        'betHistory.betCount': 1,
                        'betHistory.betAmount': parseInt(v.betAmount)
                    }
                }

                setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.count`] = 1
                setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.amount`] = parseInt(v.betAmount)

                const optionsQuery: any = {
                    projection: {
                        isTest: 1,
                        recommendTree: 1,
                        money: 1,
                        topConfig: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > betSubtractSports')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public betSports = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    userOID: new ObjectID(v.decoded._id),
                    userID: v.decoded.id,
                    userNick: v.decoded.nick,
                    userGrade: v.decoded.grade,
                    bankOwner: v.decoded.bankOwner,
                    recommendTree: v.resultBetSubtractSports.recommendTree,
                    gameType: v.gameKind,
                    isAuto: false,
                    isTest: v.resultBetSubtractSports.isTest,
                    betAmount: v.betAmount,
                    betRate: v.betRate,
                    betBenefit: v.betBenefit,
                    afterBetMoney: v.resultBetSubtractSports.money - v.betAmount,
                    betResult: 'I',
                    betCount: parseInt(v.betCount),
                    detail: v.betCart,
                    calcStatus: false,
                    regDateTime: new Date(),
                    resultDateTime: null,
                    calcDateTime: null,
                    deleteStatus: false
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > betSports')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setBetSports = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            let ids: any = []
            for(let i: number = 0; i < v.betCart.length; i++) {
                ids.push(v.betCart[i]._id)
            }

            try {
                const findQuery: any = {
                    _id: {
                        $in: ids
                    }
                }

                const setQuery: any = {
                    $inc: {
                        betAmount: parseInt(v.betAmount),
                        betCount: 1,
                        betTotalCount: 1
                    }
                }

                let collection: string = 'sportsPrematch'
                if(v.betGameType === 'sportsLive' || v.betGameType === 'sportsLiveKor') {
                    collection = 'sportsLive'
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection(collection).updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > setBetSports')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public setBetMoneyLogSports = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: null,
                    userOID: new ObjectID(v.decoded._id),
                    userID: v.decoded.id,
                    userNick: v.decoded.nick,
                    userGrade: v.decoded.grade,
                    bankOwner: v.decoded.bankOwner,
                    recommendTree: v.resultBetSubtractSports.recommendTree,
                    before: v.resultBetSubtractSports.money,
                    process: -v.betAmount,
                    after: v.resultBetSubtractSports.money - v.betAmount,
                    sortation: 'bet',
                    reason: `배팅-${v.gameKind}`,
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    regDateTime: new Date(),
                    deleteStatus: false,
                    cartOID: new ObjectID(v.cartOID),
                    isTest: v.resultBetSubtractSports.isTest
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > setBetMoneyLogSports')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getSportsBetList = (page: number, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        gameType: 1,
                        betAmount: 1,
                        betRate: 1,
                        betBenefit: 1,
                        betResult: 1,
                        betCount: 1,
                        detail: 1,
                        regDateTime: 1,
                        bonusRate: 1
                    }
                }

                const sortQuery: any = {
                    _id: -1
                }

                const skip: number = (page - 1) * config.sportPageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').find(findQuery, whatQuery).sort(sortQuery).skip(skip).limit(config.sportPageSize).toArray()
                r.count = await pool.collection('betSports').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > getSportsBetList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsCart = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(v._id),
                    gameType: {
                        $ne: 'sportsLive'
                    },
                    betResult: 'I',
                    regDateTime: {
                        $gt: moment().subtract(10, 'minute').toDate()
                    }
                }

                const whatQuery: any = {
                    projection: {
                        gameType: 1,
                        betAmount: 1,
                        detail: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsCart')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsCartCancel = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(v._id),
                    gameType: {
                        $ne: 'sportsLive'
                    },
                    betResult: 'I',
                    regDateTime: {
                        $gt: moment().subtract(10, 'minute').toDate()
                    }
                }

                const setQuery: any = {
                    $set: {
                        betResult: 'C',
                        'detail.$[elem].betResult': 'C',
                        calcStatus: true,
                        calcDateTime: new Date()
                    }
                }

                const options: any = {
                    arrayFilters: [{ 'elem.betResult': { $ne: 'C' } }]
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').updateOne(findQuery, setQuery, options)
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsCartCancel')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public subtractBetSports = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            let ids = []
            for(let i = 0; i < v.resultSportsCart.detail.length; i++) {
                ids.push(v.resultSportsCart.detail[i]._id)
            }

            try {
                const findQuery: any = {
                    _id: {
                        $in: ids
                    }
                }

                const setQuery: any = {
                    $inc: {
                        betAmount: -parseInt(v.resultSportsCart.betAmount),
                        betCount: -1,
                        totalBetCount: -1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('sportsPrematch').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > subtractBetSports')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsCartCancelUpdateUser = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(v.decoded._id)
                }

                let betLimitCount = v.resultSportsCart.detail.length
                if(betLimitCount > 10) betLimitCount = 10

                let setQuery: any = {
                    $inc: {
                        money: v.resultSportsCart.betAmount,
                        'betHistory.betCount': -1,
                        'betHistory.betAmount': -v.resultSportsCart.betAmount
                    }
                }
                setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.count`] = -1
                setQuery.$inc[`sportsBetHistory.folder${betLimitCount}.amount`] = -v.resultSportsCart.betAmount

                const optionsQuery: any = {
                    projection: {
                        recommendTree: 1,
                        money: 1,
                        topConfig: 1,
                        isTest: 1,
                        isAgent: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsCartCancelUpdateUser')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsCartCancelMoneyLog = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    moneyOID: null,
                    userOID: new ObjectID(v.decoded._id),
                    userID: v.decoded.id,
                    userNick: v.decoded.nick,
                    userGrade: v.decoded.grade,
                    bankOwner: v.decoded.bankOwner,
                    recommendTree: v.resultSportsCartCancelUpdateUser.recommendTree,
                    before: v.resultSportsCartCancelUpdateUser.money,
                    process: v.resultSportsCart.betAmount,
                    after: v.resultSportsCartCancelUpdateUser.money + v.resultSportsCart.betAmount,
                    sortation: 'betCancel',
                    reason: `배팅취소-${v.resultSportsCart.gameType}`,
                    adminOID: null,
                    adminID: null,
                    adminNick: null,
                    adminGrade: null,
                    regDateTime: new Date(),
                    deleteStatus: false,
                    cartOID: new ObjectID(v.resultSportsCart._id),
                    isTest: v.resultSportsCartCancelUpdateUser.isTest,
                    isAgent: v.resultSportsCartCancelUpdateUser.isAgent
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('moneyLog').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsCartCancelMoneyLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public sportsBetDelete = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(v._id),
                    userOID: new ObjectID(v.decoded._id)
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > sportsBetDelete')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteSportsBetAll = (v: any): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(v.decoded._id),
                    betResult: {
                        $ne: 'I'
                    }
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('betSports').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BetService > deleteSportsBetAll')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}