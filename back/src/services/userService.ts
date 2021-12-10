import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IUserService {
}

export default class UserService implements IUserService {
    constructor() {
    }

    public login = (id: string, password: string, ipaddress: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    id: mongoSanitize(id),
                    password: crypto.createHash('sha512').update(password).digest('base64')
                }

                const setQuery: any = {
                    $set: {
                        lastLoginIpaddress: ipaddress,
                        lastLoginDateTime: new Date()
                    },
                    $inc: {
                        loginCount: 1
                    }
                }

                const whatQuery: any = {
                    projection: {
                        id: 1,
                        nick: 1,
                        type: 1,
                        status: 1
                    }
                }

                const options = {
                    projection: {
                        id: 1,
                        nick: 1,
                        name: 1,
                        bankOwner: 1,
                        grade: 1,
                        status: 1,
                        recommendCount: 1,
                        recommendLevel: 1,
                        money: 1,
                        point: 1,
                        isAgent: 1,
                        seq: 1
                    },
                    returnDocument: 'before'
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, options)
                resolve(r)
            } catch (err) {
                logger.error('UserService > login')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getSeq = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'userCounter'
                }

                const setQuery: any = {
                    $inc: {
                        counter: 1
                    }
                }

                const options: any = {
                    projection: {
                        counter: 1
                    },
                    returnDocument: 'after'
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').findOneAndUpdate(findQuery, setQuery, options)
                resolve(r)
            } catch (err) {
                logger.error('UserService > getSeq')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public updateSeq = (userID: string, counter: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    id: mongoSanitize(userID)
                }

                const setQuery: any = {
                    $set: {
                        kplayUserID: null,
                        kplayUserSeq: null,
                        seq: counter
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > updateSeq')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public loginLog = (id: string, nick: string | null, status: boolean, reason: string, reqIpaddress: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    id: mongoSanitize(id),
                    nick,
                    status,
                    reason,
                    ipaddress: reqIpaddress,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('userLoginLogs').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > loginLog')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public updateToken = (id: string, token: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery = {
                    id: mongoSanitize(id)
                }

                const setQuery = {
                    $set: {
                        token: token
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > updateToken')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public checkDuplicate = (id: string, nick: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    $or: [
                        { id: mongoSanitize(id) },
                        { nick: mongoSanitize(nick) }
                    ]
                }

                const whatQuery: any = {
                    projection: {
                        id: 1,
                        nick: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > checkDuplicate')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public recommendCode = (recommendCode: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery = {
                    status: 1,
                    recommendStatus: true,
                    availableRecommendCode: mongoSanitize(recommendCode)
                }

                const setQuery = {
                    $inc: {
                        recommendCount: 1
                    }
                }

                const options = {
                    projection: {
                        id: 1,
                        nick: 1,
                        grade: 1,
                        recommendTree: 1,
                        recommendLevel: 1,
                        isAgent: 1,
                        salary: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, options)
                resolve(r)
            } catch (err) {
                logger.error('UserService > recommendCode')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public join = (
        id: string, password: string, passwordExchange: string, nick: string, cell: string,
        bank: string, bankAccount: string, bankOwner: string, recommendTree: string, recommendLevel: number,
        ipaddress: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery = {
                    id: mongoSanitize(id),
                    password: crypto.createHash('sha512').update(password).digest('base64'),
                    passwordExchange: crypto.createHash('sha512').update(passwordExchange).digest('base64'),
                    apiKey: null,
                    nick: mongoSanitize(nick),
                    cell: mongoSanitize(cell),
                    bank: mongoSanitize(bank),
                    bankAccount: mongoSanitize(bankAccount),
                    bankOwner: mongoSanitize(bankOwner),
                    grade: 1,
                    status: 0,
                    betStatus: true,
                    isTest: false,
                    recommendStatus: true,
                    recommendCount: 0,
                    recommendTree : recommendTree,
                    recommendLevel: recommendLevel,
                    availableRecommendCode: mongoSanitize(id),
                    money: 0,
                    casinoMoney: 0,
                    point: 0,
                    totalCharge: 0,
                    totalExchange: 0,
                    memo: null,
                    memoShort: null,
                    walletID : null,
                    sportsConfig : {
                        bet1FolderStatus : true,
                        bet2FolderStatus : true
                    },
                    isAgent: false,
                    topConfig : {
                        powerball : {
                            POEStatus : true,
                            POERate : 100,
                            PUOStatus : true,
                            PUORate : 100,
                            NOEStatus : true,
                            NOERate : 100,
                            NUOStatus : true,
                            NUORate : 100,
                            PCOMBOStatus : true,
                            PCOMBORate : 100,
                            NCOMBOStatus : true,
                            NCOMBORate : 100,
                            BMSStatus : true,
                            BMSRate : 100,
                            BMSCOMBOStatus : true,
                            BMSCOMBORate : 100,
                            RNAPOEStatus: true,
                            RNAPOERate: 100,
                            RNCOMBOStatus: true,
                            RNCOMBORate: 100
                        },
                        powerladder : {
                            LRStatus : true,
                            LRRate : 100,
                            TFStatus : true,
                            TFRate : 100,
                            OEStatus : true,
                            OERate : 100,
                            COMBOStatus: true,
                            COMBORate: 100
                        },
                        kenoladder : {
                            LRStatus : true,
                            LRRate : 100,
                            TFStatus : true,
                            TFRate : 100,
                            OEStatus : true,
                            OERate : 100,
                            COMBOStatus: true,
                            COMBORate: 100
                        },
                        boglePowerball : {
                            POEStatus : true,
                            POERate : 100,
                            PUOStatus : true,
                            PUORate : 100,
                            NOEStatus : true,
                            NOERate : 100,
                            NUOStatus : true,
                            NUORate : 100,
                            PCOMBOStatus : true,
                            PCOMBORate : 100,
                            NCOMBOStatus : true,
                            NCOMBORate : 100,
                            BMSStatus : true,
                            BMSRate : 100,
                            BMSCOMBOStatus : true,
                            BMSCOMBORate : 100,
                            RNAPOEStatus : true,
                            RNAPOERate : 100,
                            RNCOMBOStatus : true,
                            RNCOMBORate : 100
                        },
                        bogleladder : {
                            LRStatus : true,
                            LRRate : 100,
                            TFStatus : true,
                            TFRate : 100,
                            OEStatus : true,
                            OERate : 100,
                            COMBOStatus : true,
                            COMBORate : 100
                        },
                        googlePowerball1 : {
                            POEStatus : true,
                            POERate : 100,
                            PUOStatus : true,
                            PUORate : 100,
                            NOEStatus : true,
                            NOERate : 100,
                            NUOStatus : true,
                            NUORate : 100,
                            PCOMBOStatus : true,
                            PCOMBORate : 100,
                            NCOMBOStatus : true,
                            NCOMBORate : 100,
                            BMSStatus : true,
                            BMSRate : 100,
                            BMSCOMBOStatus : true,
                            BMSCOMBORate : 100,
                            RNAPOEStatus : true,
                            RNAPOERate : 100,
                            RNCOMBOStatus : true,
                            RNCOMBORate : 100
                        },
                        googlePowerball3 : {
                            POEStatus : true,
                            POERate : 100,
                            PUOStatus : true,
                            PUORate : 100,
                            NOEStatus : true,
                            NOERate : 100,
                            NUOStatus : true,
                            NUORate : 100,
                            PCOMBOStatus : true,
                            PCOMBORate : 100,
                            NCOMBOStatus : true,
                            NCOMBORate : 100,
                            BMSStatus : true,
                            BMSRate : 100,
                            BMSCOMBOStatus : true,
                            BMSCOMBORate : 100,
                            RNAPOEStatus : true,
                            RNAPOERate : 100,
                            RNCOMBOStatus : true,
                            RNCOMBORate : 100
                        }
                    },
                    betHistory: {
                        betCount: 0,
                        betAmount: 0,
                        betWinCount: 0,
                        betWinAmount: 0,
                        betLoseCount: 0,
                        betLoseAmount: 0
                    },
                    sportsBetHistory : {
                        folder1 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder2 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder3 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0,
                            winRate : 0
                        },
                        folder4 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder5 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder6 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder7 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder8 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder9 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        },
                        folder10 : {
                            count : 0,
                            amount : 0,
                            winCount : 0,
                            winAmount : 0
                        }
                    },
                    minigamesBetHistory: {
                        powerball: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        powerladder: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        kenoladder: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        boglePowerball: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        bogleladder: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        googlePowerball1: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        },
                        googlePowerball3: {
                            count: 0,
                            amount: 0,
                            winCount: 0,
                            winAmount: 0
                        }
                    },
                    avg: {
                        totalChargeAmount: 0,
                        totalChargeCount: 0,
                        avgChargeAmount: 0,
                        totalExchangeAmount: 0,
                        totalExchangeCount: 0,
                        avgExchangeAmount: 0
                    },

                    isJoinCoin: false,
                    coinId: '',
                    coinPassword: '',

                    firstBonusStatus: false,
                    firstBonusPersonal: false,
                    firstBonusRate: 0,
                    firstBonusMin: 0,
                    firstBonusMax: 0,

                    everyTimeBonusStatus: false,
                    everyTimeBonusPersonal: false,
                    everyTimeBonusRate: 0,
                    everyTimeBonusMin: 0,
                    everyTimeBonusMax: 0,

                    regIpaddress: ipaddress,
                    regDateTime: new Date(),
                    loginCount: 0,
                    lastLoginDateTime: null,
                    lastLoginIpaddress: null,
                    lastLoginDevice: null,
                    location: null,
                    lastAccessIpaddress: null,
                    lastAccessDateTime: null,
                    token: null
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > join')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public editUser = (userOID: string, passwordNow: string, password: string, passwordExchange: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery = {
                    _id: new ObjectID(userOID),
                    password: crypto.createHash('sha512').update(passwordNow).digest('base64')
                }

                let setQuery: any = {
                    $set: {
                        password: crypto.createHash('sha512').update(password).digest('base64')
                    }
                }

                if(passwordExchange) {
                    setQuery.$set.passwordExchange = crypto.createHash('sha512').update(passwordExchange).digest('base64')
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > editUser')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public joinAlarm = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery = {
                    category: 'alarm'
                }

                const setQuery = {
                    $set: {
                        newUsers: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > joinAlarm')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getUserInfo = (userOID: string, getKeys: Array<string>): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID)
                }

                let whatQuery: any = {
                    projection: {}
                }

                for(let i: number = 0; i < getKeys.length; i++) {
                    whatQuery.projection[getKeys[i]] = 1
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > getUserInfo')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public subtractUserMoney = (userOID: string, exchangeAmount: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID),
                    money: {
                        $gte: Math.trunc(mongoSanitize(exchangeAmount))
                    }
                }

                const setQuery: any = {
                    $inc: {
                        money: -Math.trunc(mongoSanitize(exchangeAmount))
                    }
                }

                const optionsQuery: any = {
                    projection: {
                        money: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > subtractUserMoney')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public pointLog = (userOID: string, exchangeAmount: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID),
                    money: {
                        $gte: Math.trunc(mongoSanitize(exchangeAmount))
                    }
                }

                const setQuery: any = {
                    $inc: {
                        money: -Math.trunc(mongoSanitize(exchangeAmount))
                    }
                }

                const optionsQuery: any = {
                    projection: {
                        money: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').findOneAndUpdate(findQuery, setQuery, optionsQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > subtractUserMoney')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getAttendance = (userOID: string, month: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    setDate: {
                        $gte: moment(month).startOf('month').toDate(),
                        $lte: moment(month).endOf('month').toDate()
                    }
                }

                const whatQuery: any = {
                    projection: {
                        setDate: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').find(findQuery, whatQuery).toArray()
                resolve(r)
            } catch (err) {
                logger.error('UserService > getAttendance')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getAttendanceTodayCount = (userOID: string, setDate: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    setDate: new Date(setDate)
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('attendance').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > getAttendanceTodayCount')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public chargeToday = (userOID: string, setDate: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    type: 'C',
                    status: 1,
                    regDateTime: {
                        $gte: moment(setDate).startOf('day').toDate(),
                        $lte: moment(setDate).endOf('day').toDate()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('money').aggregate([
                    { $match: findQuery },
                    { $group: {
                        _id: null,
                        totalMoney: { $sum: '$money' }
                    }}
                ]).toArray()

                resolve(r)
            } catch (err) {
                logger.error('UserService > chargeToday')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public checkDToken = (userOID: string, dToken: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID),
                    token: dToken,
                    status: 1
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('UserService > checkDToken')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}