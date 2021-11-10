import { Request as req, Response as res } from 'express'
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
                        isAgent: 1
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
}