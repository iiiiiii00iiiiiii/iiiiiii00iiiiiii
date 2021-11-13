import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import type { TService } from '../models'

import MessageService from '../services/messageService'
const messageService: MessageService = new MessageService()

interface IMoneyController {
}

export default class MoneyController implements IMoneyController {
    constructor() {
    }

    public getMessageList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '쪽지 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '쪽지 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '쪽지 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-쪽지 가져오기 ■■■■■■■■■■
            const r: TService = await messageService.getMessageList(v.decoded._id, v.page)
            if(r.error) {
                data.errorTitle = '쪽지 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '쪽지 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getMessageDetail = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '쪽지 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '쪽지 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '쪽지 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-쪽지 가져오기 ■■■■■■■■■■
            const r: TService = await messageService.getMessageDetail(v._id, v.decoded._id)
            if(r.error) {
                data.errorTitle = '쪽지 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 가져오기 ■■■■■■■■■■

            res.json(r.data.value)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '쪽지 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public checkMessageAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-쪽지 읽기 ■■■■■■■■■■
            const rDeleteMessage = await messageService.checkMessageAll(v.decoded._id)
            if(rDeleteMessage.error) {
                v.errorTitle = '쪽지 읽기 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 읽기 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '쪽지 읽기 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteMessage = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '쪽지 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '쪽지 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '쪽지 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-쪽지 삭제 ■■■■■■■■■■
            const rDeleteMessage = await messageService.deleteMessage(v._id, v.decoded._id, v.decoded.id)
            if(rDeleteMessage.error) {
                v.errorTitle = '쪽지 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '쪽지 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteMessageAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-쪽지 삭제 ■■■■■■■■■■
            const rDeleteMessage = await messageService.deleteMessageAll(v.decoded._id, v.decoded.id)
            if(rDeleteMessage.error) {
                v.errorTitle = '쪽지 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '쪽지 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}