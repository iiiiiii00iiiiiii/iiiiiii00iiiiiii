import { Request as req, Response as res } from 'express'
import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IBoardService {
}

export default class BoardService implements IBoardService {
    constructor() {
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

    public noticeDetail = (_id: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(_id),
                    deleteStatus: false
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
                r.data = await pool.collection('boardNotice').findOne(findQuery, whatQuery)
                resolve(r)
            } catch (err) {
                logger.error('BoardService > noticeDetail')
                logger.error(err)
                r.error = err
                resolve(r)
            }
        })
    }
}