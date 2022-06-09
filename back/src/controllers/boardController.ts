import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4, cache } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import type { TService } from '../models'

import BoardService from '../services/boardService'
const boardService: BoardService = new BoardService()

import UserService from '../services/userService'
const userService: UserService = new UserService()

import EtcService from '../services/etcService'
const etcService: EtcService = new EtcService()

interface IMoneyController {
}

export default class MoneyController implements IMoneyController {
    constructor() {
    }

    public getDashboard = async (req: req, res: res): Promise<void> => {
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
            res.json(dashboard)
        } catch (e) {
            logger.error(e)
            data.errorTitle = 'Dash board 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getNoticeList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '공지사항 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '공지사항 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '공지사항 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getNoticeList(v.page)
            if(r.error) {
                data.errorTitle = '공지사항 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '공지사항 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getNoticeDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '공지사항 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '공지사항 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '공지사항 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getNoticeDetail(v._id)
            if(r.error) {
                data.errorTitle = '공지사항 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■

            res.json(r.data.value)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '공지사항 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getRulesList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '경기규정 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '경기규정 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '경기규정 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getRulesList(v.page)
            if(r.error) {
                data.errorTitle = '경기규정 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '경기규정 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getRulesDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '경기규정 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '경기규정 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '경기규정 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getRulesDetail(v._id)
            if(r.error) {
                data.errorTitle = '경기규정 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-경기규정 가져오기 ■■■■■■■■■■

            res.json(r.data.value)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '경기규정 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getFaqList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = 'FAQ 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = 'FAQ 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = 'FAQ validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getFaqList(v.page)
            if(r.error) {
                data.errorTitle = 'FAQ 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = 'FAQ 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getFaqDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = 'FAQ 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = 'FAQ 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = 'FAQ 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getFaqDetail(v._id)
            if(r.error) {
                data.errorTitle = 'FAQ 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-FAQ 가져오기 ■■■■■■■■■■

            res.json(r.data.value)
        } catch (e) {
            logger.error(e)
            data.errorTitle = 'FAQ 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getEventList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '이벤트 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '이벤트 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '이벤트 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-이벤트 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getEventList(v.page)
            if(r.error) {
                data.errorTitle = '이벤트 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이벤트 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '이벤트 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getEventDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '공지사항 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '공지사항 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '공지사항 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getEventDetail(v._id)
            if(r.error) {
                data.errorTitle = '공지사항 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■

            res.json(r.data.value)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '공지사항 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getHelpList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '고객센터 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '고객센터 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '고객센터 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-고객센터 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getHelpList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '고객센터 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-고객센터 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '고객센터 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getHelpDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '문의 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '문의 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '문의 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-문의 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getHelpDetail(v._id, v.decoded._id)
            if(r.error) {
                data.errorTitle = '문의 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-문의 가져오기 ■■■■■■■■■■

            let answer: any = null
            if(r.data.value.answerStatus) {
                // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
                const rAnswer: TService = await boardService.getHelpAnswer(v._id)
                if(rAnswer.error) {
                    data.errorTitle = '문의 상세 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■

                if(!rAnswer.data) {
                    data.errorTitle = '문의 상세 실패 - 500'
                    res.status(500).json(data)
                    return
                }

                answer = rAnswer.data
            }

            res.json({
                help: r.data.value,
                answer
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '문의 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public help = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            title: {
                value: req.body.title,
                rule: {
                    required: true,
                    max: 100
                },
                message: {
                    required: '제목은 100자 이내로 입력하세요.',
                    max: '제목은 100자 이내로 입력하세요.'
                }
            },
            content: {
                value: req.body.content,
                rule: {
                    required: true,
                    max: 500
                },
                message: {
                    required: '문의내용은 500자 이내로 입력하세요.',
                    max: '문의내용은 500자 이내로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '문의하기 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '문의하기 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '문의하기 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            const getKeys: Array<string> = ['recommendTree', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '문의하기 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
            const r: TService = await boardService.help(
                v.title,
                v.content,
                v.decoded._id,
                v.decoded.id,
                v.decoded.nick,
                v.decoded.grade,
                v.decoded.bankOwner,
                rUserInfo.data.recommendTree,
                v.decoded.isAgent,
                rUserInfo.data.memoShort,
                v.reqIpaddress
            )
            if(r.error) {
                data.errorTitle = '문의하기 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■

            if(r.data.insertedCount === 0) {
                data.errorTitle = '문의하기 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-문의 알립 ■■■■■■■■■■
            await boardService.helpAlarm()
            // ■■■■■■■■■■ DB-문의 알림 ■■■■■■■■■■

            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '문의하기 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public chargeInformation = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            let getKeys: Array<string> = [`lv${v.decoded.grade}`]
            // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
            const rConfigInfo: TService = await etcService.getConfigInfo('bank', getKeys)
            if(rConfigInfo.error) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■

            if(!rConfigInfo.data) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }

            getKeys = ['recommendTree', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-계좌 문의 가져오기 ■■■■■■■■■■
            const rChargeInformation: TService = await boardService.chargeInformation(
                v.decoded._id,
                v.decoded.id,
                v.decoded.nick,
                v.decoded.grade,
                v.decoded.bankOwner,
                rUserInfo.data.recommendTree,
                v.decoded.isAgent,
                rUserInfo.data.memoShort,
                v.reqIpaddress
            )
            if(rChargeInformation.error) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-계좌 문의 가져오기 ■■■■■■■■■■

            if(rChargeInformation.data.insertedId === 0) {
                data.errorTitle = '입금계좌 문의 실패 - 500'
                res.status(500).json(data)
                return
            }

            // 자동 답변 기능 On
            if(rConfigInfo.data[`lv${v.decoded.grade}`].autoAnswer) {
                getKeys = ['content']

                // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■
                const rConfigTemplate: TService = await etcService.getConfigInfo('bankTemplate', getKeys)
                if(rConfigTemplate.error) {
                    data.errorTitle = '입금계좌 문의 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-환경 설정 가져오기 ■■■■■■■■■■

                if(!rConfigTemplate.data) {
                    data.errorTitle = '입금계좌 문의 실패 - 500'
                    res.status(500).json(data)
                    return
                }

                const comment = rConfigTemplate.data.content.replace(/{{bank}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bank).replace(/{{bankOwner}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bankOwner).replace(/{{bankAccount}}/gi, rConfigInfo.data[`lv${v.decoded.grade}`].bankAccount)

                // ■■■■■■■■■■ DB-자동답변 ■■■■■■■■■■
                await boardService.autoAnswer(rChargeInformation.data.insertedId, comment)
                // ■■■■■■■■■■ DB-자동답변 ■■■■■■■■■■

                // ■■■■■■■■■■ DB-자동답글에 대한 원글 업데이트 ■■■■■■■■■■
                await boardService.updateHelpForAnswer(rChargeInformation.data.insertedId)
                // ■■■■■■■■■■ DB-자동답글에 대한 원글 업데이트 ■■■■■■■■■■
            }
            else {
                // ■■■■■■■■■■ DB-문의 알립 ■■■■■■■■■■
                await boardService.helpAlarm()
                // ■■■■■■■■■■ DB-문의 알림 ■■■■■■■■■■
            }

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '출금 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteHelp = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '문의 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '문의 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '문의 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
            const rDeleteHelp = await boardService.deleteHelp(v._id, v.decoded._id)
            if(rDeleteHelp.error) {
                v.errorTitle = '문의 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '문의 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteHelpAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■
            const rDeleteHelp = await boardService.deleteHelpAll(v.decoded._id)
            if(rDeleteHelp.error) {
                v.errorTitle = '문의 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-문의 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '문의 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getFreeList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '게시판 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '게시판 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '게시판 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getFreeList(v.page)
            if(r.error) {
                data.errorTitle = '게시판 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '게시판 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getFreeDetail = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.query._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '게시판 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '게시판 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '게시판 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■
            const r: TService = await boardService.getFreeDetail(v._id)
            if(r.error) {
                data.errorTitle = '게시판 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-게시판 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■
            const rAnswer: TService = await boardService.getFreeComments(v._id)
            if(rAnswer.error) {
                data.errorTitle = '게시판 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-답변 가져오기 ■■■■■■■■■■

            res.json({
                free: r.data.value,
                answer: rAnswer.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '게시판 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public free = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            title: {
                value: req.body.title,
                rule: {
                    required: true,
                    max: 100
                },
                message: {
                    required: '제목은 100자 이내로 입력하세요.',
                    max: '제목은 100자 이내로 입력하세요.'
                }
            },
            content: {
                value: req.body.content,
                rule: {
                    required: true,
                    max: 500
                },
                message: {
                    required: '내용은 500자 이내로 입력하세요.',
                    max: '내용은 500자 이내로 입력하세요.'
                }
            },
            id: {
                value: req.body.id,
                rule: {
                    required: req.body.id ? true : false,
                    alphaNumber: req.body.id ? true : false,
                    min: req.body.id ? 24 : 0,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '등록 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '등록 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '등록 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            const getKeys: Array<string> = ['recommendTree', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
            const r: TService = await boardService.free(
                v.title,
                v.content,
                v.decoded._id,
                v.decoded.id,
                v.decoded.nick,
                v.decoded.grade,
                v.decoded.bankOwner,
                rUserInfo.data.recommendTree,
                v.decoded.isAgent,
                rUserInfo.data.memoShort,
                v.reqIpaddress,
                v.id
            )
            if(r.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■

            if(r.data.insertedCount === 0) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
            const rBoardInfo: TService = await boardService.getBoardInfo(v.decoded.grade)
            if(rBoardInfo.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■

            let bonus: number = 0
            let betCount: number = 0
            let needPrize: boolean = true

            if(v.id) {
                bonus = rBoardInfo.data[`lv${v.decoded.grade}`].bettingPrize
            }
            else {
                bonus = rBoardInfo.data[`lv${v.decoded.grade}`].normalPrize
            }

            if(bonus === 0) {
                needPrize = false
            }

            // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
            const rBoardBonus: TService = await boardService.getPrizeLogCount(v.decoded._id,  v.id ? true : false)
            if(rBoardBonus.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■

            if(v.id) {
                betCount = rBoardInfo.data[`lv${v.decoded.grade}`].bettingCount
            }
            else {
                betCount = rBoardInfo.data[`lv${v.decoded.grade}`].normalCount
            }

            if(betCount <= rBoardBonus.data) {
                needPrize = false
            }

            if(needPrize === true) {
                // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                const rAddPoint: TService = await boardService.addPointForBoard(v.decoded._id, bonus)
                // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■

                // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                await boardService.addMoneyForBoardLog(
                    v.decoded._id,
                    v.decoded.id,
                    v.decoded.nick,
                    v.decoded.grade,
                    v.decoded.bankOwner,
                    rUserInfo.data.recommendTree,
                    bonus,
                    rAddPoint.data.value.point,
                    rUserInfo.data.isTest,
                    rUserInfo.data.isAgent,
                    v.id ? true : false
                )
                // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
            }

            if(v.id) {
                // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
                await boardService.betUpdate(v.decoded._id, v.id)
                // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
            }





            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '등록 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public freeComment = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            _id: {
                value: req.body._id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 24,
                    max: 24
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    alphaNumber: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            commentContent: {
                value: req.body.commentContent,
                rule: {
                    required: true,
                    max: 100
                },
                message: {
                    required: '댓글은 100자 이내로 입력하세요.',
                    max: '댓글은 100자 이내로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '등록 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '등록 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '등록 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            const getKeys: Array<string> = ['recommendTree', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■
            const r: TService = await boardService.free(
                v.title,
                v.content,
                v.decoded._id,
                v.decoded.id,
                v.decoded.nick,
                v.decoded.grade,
                v.decoded.bankOwner,
                rUserInfo.data.recommendTree,
                v.decoded.isAgent,
                rUserInfo.data.memoShort,
                v.reqIpaddress,
                v.id
            )
            if(r.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-문의 등록 ■■■■■■■■■■

            if(r.data.insertedCount === 0) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■
            const rBoardInfo: TService = await boardService.getBoardInfo(v.decoded.grade)
            if(rBoardInfo.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-레벨에 따른 게시판 설정 가져오기 ■■■■■■■■■■

            let bonus: number = 0
            let betCount: number = 0
            let needPrize: boolean = true

            if(v.id) {
                bonus = rBoardInfo.data[`lv${v.decoded.grade}`].bettingPrize
            }
            else {
                bonus = rBoardInfo.data[`lv${v.decoded.grade}`].normalPrize
            }

            if(bonus === 0) {
                needPrize = false
            }

            // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■
            const rBoardBonus: TService = await boardService.getPrizeLogCount(v.decoded._id,  v.id ? true : false)
            if(rBoardBonus.error) {
                data.errorTitle = '등록 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이미 받은 내역 있는지 가져오기 ■■■■■■■■■■

            if(v.id) {
                betCount = rBoardInfo.data[`lv${v.decoded.grade}`].bettingCount
            }
            else {
                betCount = rBoardInfo.data[`lv${v.decoded.grade}`].normalCount
            }

            if(betCount <= rBoardBonus.data) {
                needPrize = false
            }

            if(needPrize === true) {
                // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                const rAddPoint: TService = await boardService.addPointForBoard(v.decoded._id, bonus)
                // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■

                // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                await boardService.addMoneyForBoardLog(
                    v.decoded._id,
                    v.decoded.id,
                    v.decoded.nick,
                    v.decoded.grade,
                    v.decoded.bankOwner,
                    rUserInfo.data.recommendTree,
                    bonus,
                    rAddPoint.data.value.point,
                    rUserInfo.data.isTest,
                    rUserInfo.data.isAgent,
                    v.id ? true : false
                )
                // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
            }

            if(v.id) {
                // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
                await boardService.betUpdate(v.decoded._id, v.id)
                // ■■■■■■■■■■ DB-USER 경기 업데이트 해주기. ■■■■■■■■■■
            }





            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '등록 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}