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
}