import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4, cache } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import UserService from '../services/userService'
const userService: UserService = new UserService()

import MessageService from '../services/messageService'
const messageService: MessageService = new MessageService()

import BoardService from '../services/boardService'
const boardService: BoardService = new BoardService()

import MoneyService from '../services/moneyService'
const moneyService: MoneyService = new MoneyService()

import EtcService from '../services/etcService'
const etcService: EtcService = new EtcService()

interface IEtcController {
}

export default class EtcController implements IEtcController {
    constructor() {
    }

    public getPopups = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-팝업 가져오기 ■■■■■■■■■■
            const r: TService = await etcService.getPopups()
            if(r.error) {
                data.errorTitle = '팝업 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-팝업 가져오기 ■■■■■■■■■■

            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '팝업 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public checkDuplicateAndEvent = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-토큰 검증 ■■■■■■■■■■
            const rCheckDtoken: TService = await userService.checkDToken(v.decoded._id, v.dToken)
            if(rCheckDtoken.error) {
                data.errorTitle = '실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-토큰 검증 ■■■■■■■■■■
            if(rCheckDtoken.data === 0) {
                res.status(401).end()
                return
            }

            // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■
            const rMaintenance: TService = await etcService.getMaintenance()
            if(rMaintenance.error) {
                data.errorTitle = '실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■

            const dt: Date = new Date()
            if(dt >= rMaintenance.data.startDateTime && dt <= rMaintenance.data.endDateTime) {
                data.errorTitle = null
                res.status(503).json(data)
                return
            }

            // ■■■■■■■■■■ DB-쪽지 갯수 가져오기 ■■■■■■■■■■
            const rMessageCount: TService = await messageService.messageCount(v.decoded._id)
            if(rMessageCount.error) {
                data.errorTitle = '실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 갯수 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-고객센터 미확인 답변 갯수 가져오기 ■■■■■■■■■■
            const rHelpCount: TService = await boardService.helpCount(v.decoded._id)
            if(rHelpCount.error) {
                data.errorTitle = '실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-고객센터 미확인 답변 갯수 가져오기 ■■■■■■■■■■

            res.json({
                messageCount: rMessageCount.data,
                helpCount: rHelpCount.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getMaintenance = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■
            const r: TService = await etcService.getMaintenance()
            if(r.error) {
                data.errorTitle = '점검 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■

            const dt: Date = new Date()
            let isMaintenance: boolean = dt >= r.data.startDateTime && dt <= r.data.endDateTime

            res.json({
                isMaintenance,
                maintenance: r.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '점검 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getHome = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            n: {
                value: req.query.n,
                rule: {
                    required: true,
                    number: true,
                    gte: 1
                },
                message: {
                    required: '파라메터 오류, 관리자에게 문의하세요.',
                    number: '파라메터 오류, 관리자에게 문의하세요.',
                    gte: '파라메터 오류, 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = 'Dash board 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = 'Dash board 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = 'Dash board validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            let dashboard: any = cache.get('dashboard')
            if(!cache.get('dashboard')) {
                // ■■■■■■■■■■ DB-Dash board 가져오기 ■■■■■■■■■■
                const r: TService = await boardService.getDashboard(v.n)
                if(r.error) {
                    data.errorTitle = 'Dash board 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-Dash board 가져오기 ■■■■■■■■■■

                cache.put('dashboard', {
                    notice: r.data.notice,
                    event: r.data.event,
                    faq: r.data.faq
                }, 300000)
            }
            dashboard = cache.get('dashboard')

            let topExchange: any = cache.get('topExchange')
            if(!cache.get('topExchange')) {
                // ■■■■■■■■■■ DB-Top Exchange 가져오기 ■■■■■■■■■■
                const rTopExchange: TService = await moneyService.getTopExchange()
                if(rTopExchange.error) {
                    data.errorTitle = 'Dash board 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-Top Exchange 가져오기 ■■■■■■■■■■

                topExchange = cache.put('topExchange', rTopExchange.data, 300000)
            }

            let fake: any = cache.get('fake')
            if(!cache.get('fake')) {
                // ■■■■■■■■■■ DB-Top Exchange 가져오기 ■■■■■■■■■■
                const rFake: TService = await moneyService.getFake()
                if(rFake.error) {
                    data.errorTitle = 'Dash board 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-Top Exchange 가져오기 ■■■■■■■■■■

                fake = cache.put('fake', rFake.data, 300000)
            }

            res.json({
                dashboard,
                topExchange,
                realTimeChargeExchange: fake
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = 'Dash board 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getShortNotice = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-한줄공지 가져오기 ■■■■■■■■■■
            const rShortNotice: TService = await etcService.getShortNotice()
            if(rShortNotice.error) {
                data.errorTitle = '한줄 공지 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-한줄공지 가져오기 ■■■■■■■■■■

            res.json({
                shortNotice: rShortNotice.data.content
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '한줄 공지 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getFriendsList = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true,
                    gte: 1
                },
                message: {
                    required: '파라메터 오류, 관리자에게 문의하세요.',
                    number: '파라메터 오류, 관리자에게 문의하세요.',
                    gte: '파라메터 오류, 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '추천인 현황 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '추천인 현황 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '추천인 현황 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-추천인 현황 가져오기 ■■■■■■■■■■
            const r: TService = await etcService.getFriendsList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '추천인 현황 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-추천인 현황 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '추천인 현황 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}