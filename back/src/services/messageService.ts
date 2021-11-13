import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IMessageService {
}

export default class MessageService implements IMessageService {
    constructor() {
    }

    public getMessageList = (userOID: string, page: number): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const whatQuery: any = {
                    projection: {
                        title: 1,
                        content: 1,
                        checkStatus: 1,
                        regDateTime: 1
                    }
                }

                const skip: number = (page - 1) * config.pageSize

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('messages').find(findQuery, whatQuery).sort({ _id: -1 }).skip(skip).limit(config.pageSize).toArray()
                r.count = await pool.collection('messages').countDocuments(findQuery)
                resolve(r)
            } catch (err) {
                logger.error('MessageService > getMessageList')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public getMessageDetail = (_id: string, userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        checkStatus: true,
                        checkDateTime: new Date()
                    }
                }

                const whatQuery: any = {
                    projection: {
                        title: 1,
                        content: 1,
                        regDateTime: 1
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('messages').findOneAndUpdate(findQuery, setQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('MessageService > getMessageDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public checkMessageAll = (userOID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    checkStatus: false
                }

                const setQuery: any = {
                    $set: {
                        checkStatus: true,
                        checkDateTime: new Date()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('messages').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MessageService > deleteMessage')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteMessage = (_id: string, userOID: string, userID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    userOID: new ObjectID(userOID),
                    checkStatus: true
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true,
                        deleteBy: 'User',
                        deleteWhoOID: new ObjectID(userOID),
                        deleteWhoID: userID,
                        deleteDateTime: new Date()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('messages').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MessageService > deleteMessage')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }

    public deleteMessageAll = (userOID: string, userID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    userOID: new ObjectID(userOID),
                    checkStatus: true,
                    deleteStatus: false
                }

                const setQuery: any = {
                    $set: {
                        deleteStatus: true,
                        deleteBy: 'User',
                        deleteWhoOID: new ObjectID(userOID),
                        deleteWhoID: userID,
                        deleteDateTime: new Date()
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('messages').updateMany(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('MessageService > deleteMessage')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}