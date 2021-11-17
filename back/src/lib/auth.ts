import jwt from 'jsonwebtoken'
import { mongoDB, ObjectID } from './db'
import config from '../config'
import tools from './tools'
import { logger } from '../lib/modules'

import type { TReq, res, next, TService } from '../models'
import type { TUserToken } from '../models/userModel'

interface IAuth {
    createToken(tokenObject: any): string
}

export default class Auth implements IAuth {
    constructor() {
    }

    public checkLogin(): any {
        return async (req: TReq, res: res, next: next) => {
            try {
                let token: string | null = req.headers['access-token']?.toString() || null
                let dToken: string = req.headers['duplicate']?.toString() || ''

                if(token) {
                    const decoded: any = await this.tokenVerify(token)

                    if(decoded) {
                        token = this.createToken({
                            _id: new ObjectID(decoded._id),
                            id: decoded.id,
                            nick: decoded.nick,
                            bankOwner: decoded.bankOwner,
                            grade: decoded.grade,
                            isAgent: decoded.isAgent
                        })

                        res.set('access-token', token)
                        res.set('duplicate', dToken)

                        req.token = token
                        req.dToken = dToken

                        req.decoded = {
                            _id: decoded._id,
                            id: decoded.id,
                            nick: decoded.nick,
                            bankOwner: decoded.bankOwner,
                            grade: decoded.grade,
                            isAgent: decoded.isAgent
                        }
                        next()
                    }
                    else {
                        res.set('access-token', '')
                        res.status(401).end()
                    }
                }
                else {
                    res.set('access-token', '')
                    res.status(401).end()
                }
            } catch (e) {
                logger.error(e)
                res.set('access-token', '')
                res.status(500).end()
            }
        }
    }

    private tokenVerify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if(err) {
                    resolve(false)
                    return
                }
                resolve(decoded)
            })
        })
    }

    public createToken(tokenObject: TUserToken): string {
        return jwt.sign(tokenObject, config.jwtSecret, { expiresIn: config.expiresIn })
    }
}