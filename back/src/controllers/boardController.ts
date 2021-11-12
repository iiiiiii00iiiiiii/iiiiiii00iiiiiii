import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import type { TService } from '../models'

import BoardService from '../services/boardService'
const boardService: BoardService = new BoardService()

interface IMoneyController {
}

export default class MoneyController implements IMoneyController {
    constructor() {
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
            let r: TService = await boardService.getNoticeList(v.page)
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
            let r: TService = await boardService.noticeDetail(v._id)
            if(r.error) {
                data.errorTitle = '공지사항 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-공지사항 가져오기 ■■■■■■■■■■

            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '공지사항 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}