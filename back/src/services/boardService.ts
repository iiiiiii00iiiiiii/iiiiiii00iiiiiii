import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IBoardService {
}

export default class BoardService implements IBoardService {
    constructor() {
    }

    public getDashboard = (n: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: {  }, count: null }

            try {
                const findQuery: any = {
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data.notice = await pool.collection('boardNotice').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray()
                r.data.event = await pool.collection('boardEvents').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray()
                r.data.faq = await pool.collection('boardFAQ').find(findQuery, whatQuery).sort({ _id: -1 }).limit(n).toArray()
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getDashboard')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getNoticeList = (page: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardNotice').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('boardNotice').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getNoticeList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getNoticeDetail = (_id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $inc: {
                        hit: 1
                    }
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        content: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardNotice').findOneAndUpdate(findQuery, setQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getNoticeDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getFaqList = (page: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardFAQ').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('boardFAQ').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getFaqList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getFaqDetail = (_id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $inc: {
                        hit: 1
                    }
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        content: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardFAQ').findOneAndUpdate(findQuery, setQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getFaqDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getEventList = (page: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardEvents').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('boardEvents').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getEventList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getEventDetail = (_id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $inc: {
                        hit: 1
                    }
                }

                const whatQuery: any = {
                    projection: {
                        header: 1,
                        headerColor: 1,
                        title: 1,
                        titleColor: 1,
                        content: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardEvents').findOneAndUpdate(findQuery, setQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getEventDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getHelpList = (userOID: string, page: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    writerOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        title: 1,
                        content: 1,
                        answerStatus: 1,
                        readAnswerStatus: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('boardHelp').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getHelpList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getHelpDetail = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    writerOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        readAnswerStatus: true
                    },
                    $inc: {
                        hit: 1
                    }
                }

                const whatQuery: any = {
                    projection: {
                        title: 1,
                        content: 1,
                        answerStatus: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').findOneAndUpdate(findQuery, setQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getHelpDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getHelpAnswer = (_id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    boardOID: new ObjectID(_id),
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        comment: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardComments').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > getHelpAnswer')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public help = (
        title: string,
        content: string,
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        userRecommendTree: Array<any>,
        isAgent: boolean,
        ipaddress: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    title: mongoSanitize(title),
                    content: mongoSanitize(content),
                    commentsCount: 0,
                    writerOID: new ObjectID(userOID),
                    userRecommendTree,
                    writerID: userID,
                    writerNick: userNick,
                    writerGrade: userGrade,
                    bankOwner: userBankOwner,
                    hit: 0,
                    answerStatus: false,
                    check: false,
                    readAnswerStatus: false,
                    deleteStatus: false,
                    isAgent,
                    ipaddress,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > help')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public helpAlarm = (): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    category: 'alarm'
                }

                const setQuery: any = {
                    $set: {
                        newHelp: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('config').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > helpAlarm')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public chargeInformation = (
        userOID: string,
        userID: string,
        userNick: string,
        userGrade: number,
        userBankOwner: string,
        userRecommendTree: Array<any>,
        isAgent: boolean,
        ipaddress: string
    ): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    title: `[${userNick}] 계좌문의`,
                    content: `${userNick}님 계좌문의 입니다.`,
                    commentsCount: 0,
                    writerOID: new ObjectID(userOID),
                    userRecommendTree,
                    writerID: userID,
                    writerNick: userNick,
                    writerGrade: userGrade,
                    bankOwner: userBankOwner,
                    hit: 0,
                    answerStatus: false,
                    check: false,
                    readAnswerStatus: false,
                    deleteStatus: false,
                    isAgent,
                    ipaddress,
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > chargeInformation')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public autoAnswer = (boardOID: string, comment: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const insertQuery: any = {
                    boardOID: new ObjectID(boardOID),
                    which: 'help',
                    isMember: false,
                    writerOID: new ObjectID('5f09fa5500badbc8621d57dc'),
                    writerID: 'master',
                    writerNick: '마스터',
                    writerGrade: 0,
                    comment,
                    deleteStatus: false,
                    ipaddress: '127.0.0.1',
                    regDateTime: new Date()
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardComments').insertOne(insertQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > autoAnswer')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public updateHelpForAnswer = (boardOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(boardOID)
                }

                const setQuery: any = {
                    $set: {
                        commentsCount: 1,
                        answerStatus: true,
                        check: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > updateHelpForAnswer')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteHelp = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    writerOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteHelp')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteHelpAll = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    writerOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MoneyService > deleteHelpAll')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public helpCount = (userOID: string,): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    writerOID: new ObjectID(userOID),
                    answerStatus: true,
                    readAnswerStatus: false,
                    deleteStatus: false
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('boardHelp').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > helpCount')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}