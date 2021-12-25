import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4, cache, request, mobileDetect } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

import KplayService from '../services/kplayService'
const kplayService: KplayService = new KplayService()

import UserService from '../services/userService'
const userService: UserService  = new UserService()

import Validate from '../lib/validate'
const validate: Validate = new Validate()

interface IGameController {
}

export default class GameController implements IGameController {
    constructor() {
    }

    public kplayURL = async (req: req, res: res): Promise<void> => {
        let domain_url: string = `${req.protocol}://${req.get('host')}/api`

        const validateData: any = {
            id: {
                value: req.query.id,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    number: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '카지노 불러오기 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '카지노 불러오기 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '카지노 불러오기 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            const getKeys: Array<string> = ['id', 'seq', 'kplayUserSeq', 'money', 'isTest']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '카지노 불러오기 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(rUserInfo.data.isTest) {
                data.errorTitle = '카지노 불러오기 실패 - 400'
                data = tools.denyValidate(data, 'deny', '테스트 아이디는 이용하실 수 없습니다.')
                res.status(400).json(data)
                return
            }

            const userAgent: string = req.headers['user-agent'] ? req.headers['user-agent'] : ''
            const md: mobileDetect = new mobileDetect(userAgent)
            let isMobile: boolean = md.mobile() !== null ? true : false

            const options: any = {
                method: 'POST',
                url: `${config.kplay.endpoint}/auth`,
                headers: {
                    'ag-code': config.kplay.code,
                    'ag-token': config.kplay.token,
                    'content-type': 'application/json'
                },
                json: {
                    user: {
                        id: rUserInfo.data.seq,
                        name: rUserInfo.data.seq,
                        balance: rUserInfo.data.money,
                        language: 'ko',
                        domain_url
                    },
                    prd: {
                        id: v.id,
                        type: 0,
                        is_mobile: isMobile
                    }
                }
            }

            request(options, async (err: any, response: any, body: any) => {
                if(err) {
                    console.log(err)
                    data.errorTitle = '카지노 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                else {
                    if(parseInt(body.status) !== 1) {
                        console.log(body)
                        data.errorTitle = '카지노 실패 - 500'
                        res.status(500).json(data)
                        return
                    }

                    if(rUserInfo.data.kplayUserSeq === null) {
                        // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                        const rUserUpdate: TService = await kplayService.userUpdate(v.decoded._id, body.user_id, body.username)
                        if(rUserUpdate.error) {
                            data.errorTitle = '카지노 불러오기 실패 - 500'
                            res.status(500).json(data)
                            return
                        }
                        // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                    }
                    res.json(body)
                }
            })

        } catch (e) {
            logger.error(e)
            data.errorTitle = '카지노 불러오기 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public kplayOpenGames = async (req: req, res: res): Promise<void> => {
        let domain_url: string = `${req.protocol}://${req.get('host')}/api`

        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            const getKeys: Array<string> = ['id', 'seq', 'kplayUserSeq', 'money', 'isTest']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '카지노 불러오기 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(rUserInfo.data.isTest) {
                data.errorTitle = '카지노 불러오기 실패 - 400'
                data = tools.denyValidate(data, 'deny', '테스트 아이디는 이용하실 수 없습니다.')
                res.status(400).json(data)
                return
            }

            const userAgent: string = req.headers['user-agent'] ? req.headers['user-agent'] : ''
            const md: mobileDetect = new mobileDetect(userAgent)
            let isMobile: boolean = md.mobile() !== null ? true : false

            const options: any = {
                method: 'POST',
                url: `${config.kplay.endpoint}/auth`,
                headers: {
                    'ag-code': config.kplay.code,
                    'ag-token': config.kplay.token,
                    'content-type': 'application/json'
                },
                json: {
                    user: {
                        id: rUserInfo.data.seq,
                        name: rUserInfo.data.seq.toString(),
                        balance: rUserInfo.data.money,
                        language: 'ko',
                        domain_url
                    },
                    prd: {
                        id: parseInt(req.params.productID),
                        type: parseInt(req.params.gameID),
                        is_mobile: isMobile
                    }
                }
            }

            request(options, async (err: any, response: any, body: any) => {
                if(err) {
                    console.log(err)
                    res.end('ERROR Please contact the administrator. [1]')
                    return
                }
                else {
                    // console.log(body)
                    if(parseInt(body.status) !== 1) {
                        logger.error(JSON.stringify(req.headers))
                        logger.error(JSON.stringify(body))
                        res.end('ERROR Please contact the administrator. [2]')
                        return
                    }

                    if(rUserInfo.data.kplayUserSeq === null) {
                        // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                        const rUserUpdate: TService = await kplayService.userUpdate(v.decoded._id, body.user_id, body.username)
                        if(rUserUpdate.error) {
                            logger.error(JSON.stringify(req.headers))
                            logger.error(JSON.stringify(body))
                            res.end('ERROR Please contact the administrator. [3]')
                            return
                        }
                        // ■■■■■■■■■■ DB-KPLAY SEQ, ID 업데이트 ■■■■■■■■■■
                    }
                    res.redirect(body.launch_url)
                }
            })

        } catch (e) {
            logger.error(e)
            logger.error(JSON.stringify(req.headers))
            res.end('ERROR Please contact the administrator. [4]')
            return
        }
    }
}