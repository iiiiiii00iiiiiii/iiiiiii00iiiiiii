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

import BoardService from '../services/boardService'
const boardService: BoardService = new BoardService()

interface IMoneyController {
}

export default class MoneyController implements IMoneyController {
    constructor() {
    }

    // 충전
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
                v.errorTitle = '충전 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '충전 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '충전 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-충전 내역 가져오기 ■■■■■■■■■■
            const r: TService = await moneyService.getChargeList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '충전 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-충전 내역 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 내역 실패 - 500'
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
                    required: '충전 신청은 1만원 이상 가능합니다.',
                    number: '충전 신청은 1만원 이상 가능합니다.',
                    gte: '충전 신청은 1만원 이상 가능합니다.',
                    lte: '충전 신청은 1만원 이상 가능합니다.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '충전 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '충전 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 충전 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 55 || hour === 0 && minute <= 5) {
                data.errorTitle = '충전 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 55분 부터 00시 05분 사이에는 충전신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
            const rCheckIngCharge: TService = await moneyService.checkIngCharge(v.decoded._id)
            if(rCheckIngCharge.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■

            if(rCheckIngCharge.data > 0) {
                data.errorTitle = '충전 신청 실패 - 400'
                data = tools.denyValidate(data, 'exist', '이전에 신청하신 충전을 처리 중입니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
            const rSetCharge: TService = await moneyService.setCharge(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                v.chargeAmount,
                v.reqIpaddress
            )
            if(rSetCharge.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■

            if(rSetCharge.data.insertedCount === 0) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
            await moneyService.chargeAlarm()
            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 신청 실패 - 500'
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
                v.errorTitle = '충전 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '충전 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '충전 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
            const rDeleteCharge = await moneyService.deleteCharge(v._id, v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '충전 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 내역 삭제 실패 - 500'
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
            // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■
            const rDeleteCharge = await moneyService.deleteChargeAll(v.decoded._id)
            if(rDeleteCharge.error) {
                v.errorTitle = '충전 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-충전 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public setChargePent = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            moneyMethod: {
                value: req.body.moneyMethod,
                rule: {
                    required: true,
                    or: ['money', 'minigameMoney']
                },
                message: {
                    required: '충전 머니를 선택 하세요.',
                    or: '충전 머니를 선택 하세요.'
                }
            },
            chargeAmount: {
                value: req.body.chargeAmount,
                rule: {
                    required: true,
                    number: true,
                    gte: 10000,
                    lte: 999999999
                },
                message: {
                    required: '충전 신청은 1만원 이상 가능합니다.',
                    number: '충전 신청은 1만원 이상 가능합니다.',
                    gte: '충전 신청은 1만원 이상 가능합니다.',
                    lte: '충전 신청은 1만원 이상 가능합니다.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '충전 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '충전 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 충전 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 55 || hour === 0 && minute <= 5) {
                data.errorTitle = '충전 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 55분 부터 00시 05분 사이에는 충전신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
            const rCheckIngCharge: TService = await moneyService.checkIngCharge(v.decoded._id)
            if(rCheckIngCharge.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■

            if(rCheckIngCharge.data > 0) {
                data.errorTitle = '충전 신청 실패 - 400'
                data = tools.denyValidate(data, 'exist', '이전에 신청하신 충전을 처리 중입니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
            const rSetCharge: TService = await moneyService.setChargePent(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                rUserInfo.data.memoShort,
                v.chargeAmount,
                v.moneyMethod,
                v.reqIpaddress,
                'charge'
            )
            if(rSetCharge.error) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■

            if(rSetCharge.data.insertedCount === 0) {
                data.errorTitle = '충전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
            await moneyService.chargeAlarm()
            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    // 환전
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
                v.errorTitle = '환전 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '환전 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '환전 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-환전 내역 가져오기 ■■■■■■■■■■
            const r: TService = await moneyService.getExchangeList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '환전 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-환전 내역 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 내역 실패 - 500'
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
                    required: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    number: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    gte: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    lte: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.'
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
                    required: '환전 비밀번호는 4~50자리로 입력하세요.',
                    min: '환전 비밀번호는 4~50자리로 입력하세요.',
                    max: '환전 비밀번호는 4~50자리로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '환전 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '환전 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 충전 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 30 || hour === 0 && minute <= 30) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 40분 부터 00시 30분 사이에는 환전 신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // 1만원 단위로 환전
            if(Math.trunc(v.exchangeAmount) % 10000 !== 0) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'unit', '환전 신청은 1만원 이상 1만원 단위로 가능합니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'passwordExchange']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            if(crypto.createHash('sha512').update(v.passwordExchange).digest('base64') !== rUserInfo.data.passwordExchange) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'exchange password', '환전 비밀번호를 확인하세요.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
            const rSubtractUserMoney: TService = await userService.subtractUserMoney(v.decoded._id, v.exchangeAmount)
            if(rSubtractUserMoney.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■

            if(rSubtractUserMoney.data.lastErrorObject.n === 0) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'not enough money', '보유 금액이 부족 합니다.')
                res.status(400).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■
            const rSetExchange: TService = await moneyService.setExchange(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                v.exchangeAmount,
                v.reqIpaddress
            )
            if(rSetExchange.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■

            if(rSetExchange.data.insertedCount === 0) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■
            await moneyService.setExchangeLog(
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
            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■
            await moneyService.exchangeAlarm()
            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 신청 실패 - 500'
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
                v.errorTitle = '환전 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '환전 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '환전 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-환전 내역 삭제 ■■■■■■■■■■
            const rDeleteExchange = await moneyService.deleteExchange(v._id, v.decoded._id)
            if(rDeleteExchange.error) {
                v.errorTitle = '환전 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-환전 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 내역 삭제 실패 - 500'
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
            // ■■■■■■■■■■ DB-환전 내역 삭제 ■■■■■■■■■■
            const rDeleteExchange = await moneyService.deleteExchangeAll(v.decoded._id)
            if(rDeleteExchange.error) {
                v.errorTitle = '환전 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-환전 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public setExchangePent = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            moneyMethod: {
                value: req.body.moneyMethod,
                rule: {
                    required: true,
                    or: ['money', 'minigameMoney']
                },
                message: {
                    required: '환전 머니를 선택 하세요.',
                    or: '환전 머니를 선택 하세요.'
                }
            },
            exchangeAmount: {
                value: req.body.exchangeAmount,
                rule: {
                    required: true,
                    number: true,
                    gte: 10000,
                    lte: 999999999
                },
                message: {
                    required: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    number: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    gte: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    lte: '환전 신청은 1만원 이상 1만원 단위로 가능합니다.'
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
                    required: '환전 비밀번호는 4~50자리로 입력하세요.',
                    min: '환전 비밀번호는 4~50자리로 입력하세요.',
                    max: '환전 비밀번호는 4~50자리로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '환전 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '환전 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 충전 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 30 || hour === 0 && minute <= 30) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 40분 부터 00시 30분 사이에는 환전 신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // 1만원 단위로 환전
            if(Math.trunc(v.exchangeAmount) % 10000 !== 0) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'unit', '환전 신청은 1만원 이상 1만원 단위로 가능합니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'passwordExchange', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            if(crypto.createHash('sha512').update(v.passwordExchange).digest('base64') !== rUserInfo.data.passwordExchange) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'exchange password', '환전 비밀번호를 확인하세요.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
            const rSubtractUserMoney: TService = await userService.subtractUserMoneyPent(v.decoded._id, v.exchangeAmount, v.moneyMethod)
            if(rSubtractUserMoney.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■

            if(rSubtractUserMoney.data.lastErrorObject.n === 0) {
                data.errorTitle = '환전 신청 실패 - 400'
                data = tools.denyValidate(data, 'not enough money', '보유 금액이 부족 합니다.')
                res.status(400).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■
            const rSetExchange: TService = await moneyService.setExchangePent(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                rUserInfo.data.memoShort,
                v.exchangeAmount,
                v.moneyMethod,
                v.reqIpaddress,
                'exchange'
            )
            if(rSetExchange.error) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■

            if(rSetExchange.data.insertedCount === 0) {
                data.errorTitle = '환전 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■
            await moneyService.setExchangeLogPent(
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
                rSubtractUserMoney.data.value.minigameMoney,
                v.exchangeAmount,
                v.moneyMethod,
                'exchange'
            )
            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■
            await moneyService.exchangeAlarm()
            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public setTransfer = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            moneyMethod: {
                value: req.body.moneyMethod,
                rule: {
                    required: true,
                    or: ['money', 'minigameMoney']
                },
                message: {
                    required: '전환 머니를 선택 하세요.',
                    or: '전환 머니를 선택 하세요.'
                }
            },
            transferAmount: {
                value: req.body.transferAmount,
                rule: {
                    required: true,
                    number: true,
                    gte: 10000,
                    lte: 999999999
                },
                message: {
                    required: '전환 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    number: '전환 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    gte: '전환 신청은 1만원 이상 1만원 단위로 가능합니다.',
                    lte: '전환 신청은 1만원 이상 1만원 단위로 가능합니다.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '전환 신청 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '전환 신청 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // 전환 시간 제한
            const hour: number = moment().hours()
            const minute: number = moment().minute()
            if(hour === 23 && minute >= 30 || hour === 0 && minute <= 30) {
                data.errorTitle = '전환 신청 실패 - 400'
                data = tools.denyValidate(data, 'time', '23시 30분 부터 00시 30분 사이에는 전환 신청이 불가능 합니다.')
                res.status(400).json(data)
                return
            }

            // 1만원 단위로 전환
            if(Math.trunc(v.transferAmount) % 10000 !== 0) {
                data.errorTitle = '전환 신청 실패 - 400'
                data = tools.denyValidate(data, 'unit', '전환 신청은 1만원 이상 1만원 단위로 가능합니다.')
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['id', 'nick', 'grade', 'bank', 'bankOwner', 'bankAccount', 'isAgent', 'isTest', 'recommendTree', 'money', 'minigameMoney', 'memoShort']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys, v.reqIpaddress)
            if(rUserInfo.error) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            if(!rUserInfo.data) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            // 파워볼 머니 전환 -> 스포츠 머니 충전
            if(v.moneyMethod === 'money') {
                if(rUserInfo.data.minigameMoney < v.transferAmount) {
                    data.errorTitle = '전환 신청 실패 - 400'
                    data = tools.denyValidate(data, 'not enough money', '파워볼 머니가 부족 합니다.')
                    res.status(400).json(data)
                    return
                }
            }
            else {
                if(rUserInfo.data.money < v.transferAmount) {
                    data.errorTitle = '전환 신청 실패 - 400'
                    data = tools.denyValidate(data, 'not enough money', '스포츠 머니가 부족 합니다.')
                    res.status(400).json(data)
                    return
                }
            }

            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■
            const rCheckIngCharge: TService = await moneyService.checkIngCharge(v.decoded._id)
            if(rCheckIngCharge.error) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-확인 중인 충전요청 확인 ■■■■■■■■■■

            if(rCheckIngCharge.data > 0) {
                data.errorTitle = '전환 신청 실패 - 400'
                data = tools.denyValidate(data, 'exist', '이전에 신청하신 충전을 처리 중입니다.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■
            let moneyMethod = ''
            if(v.moneyMethod === 'money') {
                moneyMethod = 'minigameMoney'
            }
            else {
                moneyMethod = 'money'
            }
            const rSubtractUserMoney: TService = await userService.subtractUserMoneyPent(v.decoded._id, v.transferAmount, moneyMethod)
            if(rSubtractUserMoney.error) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원머니 차감 ■■■■■■■■■■

            if(rSubtractUserMoney.data.lastErrorObject.n === 0) {
                data.errorTitle = '전환 신청 실패 - 400'
                data = tools.denyValidate(data, 'not enough money', moneyMethod === 'money' ? '스포츠 머니가 부족 합니다.' : '파워볼 머니가 부족 합니다.')
                res.status(400).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■
            const rSetExchange: TService = await moneyService.setExchangePent(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                rUserInfo.data.memoShort,
                v.transferAmount,
                moneyMethod,
                v.reqIpaddress,
                v.moneyMethod === 'money' ? 'transferMinigameMoneyToMoney' : 'transferMoneyToMinigameMoney'
            )
            if(rSetExchange.error) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-환전 요청 ■■■■■■■■■■

            if(rSetExchange.data.insertedCount === 0) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■
            await moneyService.setExchangeLogPent(
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
                rSubtractUserMoney.data.value.minigameMoney,
                v.transferAmount,
                moneyMethod,
                v.moneyMethod === 'money' ? 'transferMinigameMoneyToMoney' : 'transferMoneyToMinigameMoney'
            )
            //■■■■■■■■■■ DB-환전 요청 로그 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■
            await moneyService.exchangeAlarm()
            // ■■■■■■■■■■ DB-환전 알림 ■■■■■■■■■■


            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■
            const rSetCharge: TService = await moneyService.setChargePent(
                v.decoded._id,
                rUserInfo.data.id,
                rUserInfo.data.nick,
                rUserInfo.data.grade,
                rUserInfo.data.bank,
                rUserInfo.data.bankOwner,
                rUserInfo.data.bankAccount,
                rUserInfo.data.isAgent,
                rUserInfo.data.isTest,
                rUserInfo.data.recommendTree,
                rUserInfo.data.memoShort,
                v.transferAmount,
                v.moneyMethod,
                v.reqIpaddress,
                v.moneyMethod === 'money' ? 'transferMinigameMoneyToMoney' : 'transferMoneyToMinigameMoney'
            )
            if(rSetCharge.error) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }
            //■■■■■■■■■■ DB-충전 요청 ■■■■■■■■■■

            if(rSetCharge.data.insertedCount === 0) {
                data.errorTitle = '전환 신청 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■
            await moneyService.chargeAlarm()
            // ■■■■■■■■■■ DB-충전 알림 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '환전 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    // 포인트
    public getPointList = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '포인트 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '포인트 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '포인트 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-포인트 내역 가져오기 ■■■■■■■■■■
            const r: TService = await moneyService.getPointList(v.page, v.decoded._id)
            if(r.error) {
                data.errorTitle = '포인트 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-포인트 내역 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '포인트 내역 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public exchangePoint = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-포인트 전환 ■■■■■■■■■■
            const rPoint = await moneyService.exchangePoint(v.decoded._id)
            if(rPoint.error) {
                data.errorTitle = '포인트 전환 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-포인트 전환 ■■■■■■■■■■

            if(rPoint.data.value) {
                // ■■■■■■■■■■ DB-포인트 전환 로그 ■■■■■■■■■■
                const rPointLog = await moneyService.exchangePointLog(
                    v.decoded._id,
                    rPoint.data.value.id,
                    rPoint.data.value.nick,
                    rPoint.data.value.grade,
                    rPoint.data.value.bankOwner,
                    rPoint.data.value.isAgent,
                    rPoint.data.value.isTest,
                    rPoint.data.value.recommendTree,
                    rPoint.data.value.money,
                    rPoint.data.value.point
                )

                if(rPointLog.error) {
                    data.errorTitle = '포인트 전환 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-포인트 전환 로그 ■■■■■■■■■■
            }

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '충전 신청 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deletePoint = async (req: req, res: res): Promise<void> => {
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
                v.errorTitle = '포인트 내역 삭제 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '포인트 내역 삭제 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '포인트 내역 삭제 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
            const rDeletePoint = await moneyService.deletePoint(v._id, v.decoded._id)
            if(rDeletePoint.error) {
                v.errorTitle = '포인트 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '포인트 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public deletePointAll = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■
            const rDeletePoint = await moneyService.deletePointAll(v.decoded._id)
            if(rDeletePoint.error) {
                v.errorTitle = '포인트 내역 삭제 validate 실패 - 500'
                res.status(500).json(v)
                return
            }
            // ■■■■■■■■■■ DB-포인트 내역 삭제 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '포인트 내역 삭제 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}