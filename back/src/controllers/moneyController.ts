import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import type { TService } from '../models'

import MoneyService from '../services/moneyService'
const moneyService: MoneyService = new MoneyService()

import UserService from '../services/userService'
const userService: UserService = new UserService()

interface IMoneyController {
}

export default class MoneyController implements IMoneyController {
    constructor() {
    }

    public getChargeList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '입금 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '입금 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '입금 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-입금 내역 가져오기 ■■■■■■■■■■
            let r: TService = await moneyService.getChargeList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '입금 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-입금 내역 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '입금 내역 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public setCharge = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            chargeAmount: {
                value: req.body.chargeAmount,
                rule: {
                    required: true,
                    number: true,
                    gte: 10000,
                    lte: 999999999
                },
                message: {
                    required: '입금 신청은 1만원 이상 가능합니다.',
                    number: '입금 신청은 1만원 이상 가능합니다.',
                    gte: '입금 신청은 1만원 이상 가능합니다.',
                    lte: '입금 신청은 1만원 이상 가능합니다.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '입금 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '입금 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 입금 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 55 || hour === 0 && minute <= 5) {
                data.errorTitle = '입금 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 55분 부터 00시 05분 사이에는 입금신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-확인 중인 입금요청 확인 ■■■■■■■■■■
            const rCheckIngCharge: TService = await moneyService.checkIngCharge(v.decoded._id)
            if(rCheckIngCharge.error) {
                data.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-확인 중인 입금요청 확인 ■■■■■■■■■■

            if(rCheckIngCharge.data > 0) {
                data.errorTitle = '입금 신청 실패 - 400'
                data = tools.denyValidate(data, 'exist', '이전에 신청하신 입금을 처리 중입니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys)
            if(rUserInfo.error) {
                data.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-입금 요청 ■■■■■■■■■■
            const rSetCharge: TService = await moneyService.setCharge(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.back,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                v.chargeAmount,
                v.reqIpaddress
            )
            if(rSetCharge.error) {
                data.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-입금 요청 ■■■■■■■■■■

            if(rSetCharge.data.insertedCount === 0) {
                data.errorTitle = '입금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-입금 알림 ■■■■■■■■■■
            await moneyService.chargeAlarm()
            // ■■■■■■■■■■ DB-입금 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '입금 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteCharge = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '입금 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '입금 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '입금 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-입금 내역 삭제 ■■■■■■■■■■
            let rDeleteCharge = await moneyService.deleteCharge(v._id, v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '입금 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-입금 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '입금 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteChargeAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-입금 내역 삭제 ■■■■■■■■■■
            let rDeleteCharge = await moneyService.deleteChargeAll(v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '입금 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-입금 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '입금 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getExchangeList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '출금 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '출금 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '출금 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-출금 내역 가져오기 ■■■■■■■■■■
            let r: TService = await moneyService.getExchangeList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '출금 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-출금 내역 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '출금 내역 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public setExchange = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            exchangeAmount: {
                value: req.body.exchangeAmount,
                rule: {
                    required: true,
                    number: true,
                    gte: 10000,
                    lte: 999999999
                },
                message: {
                    required: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    number: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    gte: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    lte: '출금 신청은 1만원 이상 1만원 단위로 가능합니다.'
                }
            },
            passwordExchange: {
                value: req.body.passwordExchange,
                rule: {
                    required: true,
                    min: 4,
                    max: 50
                },
                message: {
                    required: '출금 비밀번호는 4~50자리로 입력하세요.',
                    min: '출금 비밀번호는 4~50자리로 입력하세요.',
                    max: '출금 비밀번호는 4~50자리로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '출금 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '출금 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 입금 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 30 || hour === 0 && minute <= 30) {
                data.errorTitle = '출금 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 40분 부터 00시 30분 사이에는 출금 신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // 1만원 단위로 출금
            if(Math.trunc(v.exchangeAmount) % 10000 !== 0) {
                data.errorTitle = '출금 신청 실패 - 400'
                data = tools.denyValidate(data, 'unit', '출금 신청은 1만원 이상 1만원 단위로 가능합니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'passwordExchange']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys)
            if(rUserInfo.error) {
                data.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            if(crypto.createHash('sha512').update(v.passwordExchange).digest('base64') !== rUserInfo.data.passwordExchange) {
                data.errorTitle = '출금 신청 실패 - 400'
                data = tools.denyValidate(data, 'exchange password', '출금 비밀번호를 확인하세요.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
            const rSubtractUserMoney: TService = await userService.subtractUserMoney(v.decoded._id, v.exchangeAmount)
            if(rSubtractUserMoney.error) {
                data.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■

            if(rSubtractUserMoney.data.lastErrorObject.n === 0) {
                data.errorTitle = '출금 신청 실패 - 400'
                data = tools.denyValidate(data, 'not enough money', '보유 금액이 부족 합니다.')
                res.status(400).json(data)
                return
            }

            //■■■■■■■■■■ DB-출금 요청 ■■■■■■■■■■
            const rSetExchange: TService = await moneyService.setExchange(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.back,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                v.exchangeAmount,
                v.reqIpaddress
            )
            if(rSetExchange.error) {
                data.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-출금 요청 ■■■■■■■■■■

            if(rSetExchange.data.insertedCount === 0) {
                data.errorTitle = '출금 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-출금 요청 로그 ■■■■■■■■■■
            const rExchangeLog: TService = await moneyService.setExchangeLog(
                rSetExchange.data.insertedId,
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bankOwner,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                rSubtractUserMoney.data.value.money,
                v.exchangeAmount
            )
            //■■■■■■■■■■ DB-출금 요청 로그 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-출금 알림 ■■■■■■■■■■
            await moneyService.exchangeAlarm()
            // ■■■■■■■■■■ DB-출금 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '출금 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteExchange = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '출금 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '출금 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '출금 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
            let rDeleteCharge = await moneyService.deleteExchange(v._id, v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '출금 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '출금 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deleteExchangeAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■
            let rDeleteCharge = await moneyService.deleteExchangeAll(v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '출금 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-출금 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '출금 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}