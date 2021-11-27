import { logger, crypto, mongoSanitize, moment } from "../lib/modules"
import { mongoDB, ObjectID } from '../lib/db'
import config from '../config'

import type { TService } from '../models'

interface IKplayService {
}

export default class KplayService implements IKplayService {
    constructor() {
    }

    public userUpdate = (userOID: string, kplayUserSeq: number, kplayUserID: string): Promise<TService> => {
        return new Promise<TService>(async (resolve, reject) => {
            let r: TService = { error: null, data: null, count: null }

            try {
                const findQuery: any = {
                    _id: new ObjectID(userOID)
                }

                const setQuery: any = {
                    $set: {
                        kplayUserSeq,
                        kplayUserID
                    }
                }

                const pool: any = await mongoDB.connect()
                r.data = await pool.collection('users').updateOne(findQuery, setQuery)
                resolve(r)
            } catch (err) {
                logger.error('KplayService > userUpdate')
                r.error = err
                resolve(r)
            }
        })
    }
}