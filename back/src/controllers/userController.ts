import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import Auth from '../lib/auth'
const auth: Auth = new Auth()

import Validate from '../lib/validate'
const validate: Validate = new Validate()

import type { TService } from '../models'

import UserService from '../services/userService'
const userService: UserService = new UserService()

import MoneyService from '../services/moneyService'
const moneyService: MoneyService = new MoneyService()

import EtcService from '../services/etcService'
const etcService: EtcService = new EtcService()

interface IUserController {
}

export default class UserController implements IUserController {
    constructor() {
    }

    public login = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            id: {
                value: req.query.id ? req.query.id.toString().toLowerCase() : req.query.id,
                rule: {
                    required: true,
                    alphaNumber: true,
                    min: 3,
                    max: 20
                },
                message: {
                    required: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                    alphaNumber: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                    min: '아이디는 3~20자(영문, 숫자)로 입력하세요.',
                    max: '아이디는 3~20자(영문, 숫자)로 입력하세요.'
                }
            },
            password: {
                value: req.query.password,
                rule: {
                    required: true,
                    min: 4,
                    max: 50
                },
                message: {
                    required: '비밀번호는 4~50자로 입력하세요.',
                    min: '비밀번호는 4~50자로 입력하세요.',
                    max: '비밀번호는 4~50자로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '로그인 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '로그인 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '로그인 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-유저 로그인 ■■■■■■■■■■
            const rLogin: TService = await userService.login(v.id, v.password, v.reqIpaddress)
            if(rLogin.error) {
                logger.error(`[UserController > login()] 로그인 실패 - ${rLogin.error}`)
                data.errorTitle = '로그인 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-유저 로그인 ■■■■■■■■■■

            // 로그인 실패 [아이디 비밀번호 불일치]
            if(!rLogin.data.value) {
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                const rLoginLog: TService = await userService.loginLog(v.id, null, false, '아이디 비밀번호 불일치', v.reqIpaddress)
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                if(rLoginLog.error) {
                    logger.error(`[UserController > login()] 로그인 실패 로그[아이디 비밀번호 불일치] insert 실패 - ${rLoginLog.error}`)
                }
                else {
                    if(!rLoginLog.data.insertedId) {
                        logger.error(`[UserController > login()] 로그인 실패 로그[아이디 비밀번호 불일치] insert 실패 - ${rLoginLog.data.insertedId}`)
                    }
                }

                data = tools.denyValidate(data, 'auth', '아이디 또는 비밀번호를 확인하세요.')
                data.errorTitle = '로그인 실패 - 400'
                res.status(400).json(data)
                return
            }

            // 로그인 실패 [상태 정지 중]
            if(rLogin.data.value.status !== 1) {
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                const rLoginLog: TService = await userService.loginLog(v.id, rLogin.data.name, false, '상태 정지 중', v.reqIpaddress)
                // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
                if(rLoginLog.error) {
                    logger.error(`[UserController > login()] 로그인 실패 로그[상태 정지 중] insert 실패 - ${rLoginLog.error}`)
                }
                else {
                    if(!rLoginLog.data.insertedId) {
                        logger.error(`[UserController > login()] 로그인 실패 로그[상태 정지 중] insert 실패 - ${rLoginLog.data.insertedId}`)
                    }
                }

                data = tools.denyValidate(data, 'auth', '정상 회원이 아닙니다.<br>방금 가입하셨다면, 승인되기까지 기다려 주십시오.')
                data.errorTitle = '로그인 실패 - 400'
                res.status(400).json(data)
                return
            }

            if(rLogin.data.seq === undefined) {
                // ■■■■■■■■■■ DB-SEQ 번호 획득 ■■■■■■■■■■
                const rSeq: TService = await userService.getSeq()
                if(rSeq.error) {
                    logger.error('DB 오류')
                    data.errorTitle = '로그인 오류 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-SEQ 번호 획득 ■■■■■■■■■■
                if(rSeq.data.lastErrorObject.n === 0) {
                    data.errorTitle = '로그인 오류 - 500'
                    res.status(500).json(data)
                    return
                }
                v.counter = rSeq.data.value.counter

                // ■■■■■■■■■■ DB-SEQ 번호 업데이트 ■■■■■■■■■■
                let rUpdateSeq = await userService.updateSeq(v.id, rSeq.data.value.counter)
                if(rUpdateSeq.error) {
                    console.log('DB 오류')
                    data.errorTitle = '로그인 오류 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-SEQ 번호 업데이트 ■■■■■■■■■■
                if(rUpdateSeq.data.modifiedCount === 0) {
                    data.errorTitle = '로그인 오류 - 500'
                    res.status(500).json(data)
                    return
                }
            }

            // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
            const rLoginLog: TService = await userService.loginLog(v.id, rLogin.data.value.nick, true, '로그인 성공', v.reqIpaddress)
            // ■■■■■■■■■■ DB-유저 로그인 로그 ■■■■■■■■■■
            if(rLoginLog.error) {
                logger.error(`[UserController > login()] 로그인 성공 로그 insert 실패 - ${rLoginLog.error}`)
            }
            else {
                if(!rLoginLog.data.insertedId) {
                    logger.error(`[UserController > login()] 로그인 성공 로그 insert 실패 - ${rLoginLog.data.insertedId}`)
                }
            }

            // 토큰 생성
            const token: string = auth.createToken({
                _id: rLogin.data.value._id,
                id: rLogin.data.value.id,
                nick: rLogin.data.value.nick,
                bankOwner: rLogin.data.value.nick,
                grade: rLogin.data.value.grade,
                isAgent: rLogin.data.value.isAgent
            })
            // 중복접속 방지용 토큰 생성
            const duplicateToken = crypto.createHmac('sha512', config.jwtSecret).update(token).digest('base64')

            // 헤더 설정
            res.set('access-token', token)
            res.set('duplicate', duplicateToken)

            // ■■■■■■■■■■ DB-중복접속 방지용 token 업데이트 ■■■■■■■■■■
            const rUpdateToken: TService = await userService.updateToken(v.id, duplicateToken)
            if(rUpdateToken.error) {
                res.set('access-token', '')
                res.set('duplicate', '')

                logger.error('[UserController > login()] update token')
                res.status(500).end()
                return
            }
            // ■■■■■■■■■■ DB-중복접속 방지용 token 업데이트 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■
            const getKeys: Array<string> = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'lv8', 'lv9']
            const rConfig: TService = await etcService.getConfigInfo('sportsBet', getKeys)
            if(rConfig.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■

            res.json({
                _id: rLogin.data.value._id,
                id: rLogin.data.value.id,
                nick: rLogin.data.value.nick,
                bankOwner: rLogin.data.value.nick,
                grade: rLogin.data.value.grade,
                status: rLogin.data.value.status,
                recommendCount: rLogin.data.value.recommendCount,
                recommendLevel: rLogin.data.value.recommendLevel,
                money: rLogin.data.value.money,
                point: rLogin.data.value.point,
                isAgent: rLogin.data.value.isAgent,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '로그인 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public join = async (req: req, res: res): Promise<void> => {
        const validateData = {
            id: {
                value: req.body.id ? req.body.id.toLowerCase() : req.body.id,
                rule: {
                    required: true,
                    min: 3,
                    max: 20
                },
                message: {
                    required: '아이디는 3~20로 입력하세요.',
                    min: '아이디는 3~20자리로 입력하세요.',
                    max: '아이디는 3~20자리로 입력하세요.'
                }
            },
            password: {
                value: req.body.password,
                rule: {
                    required: true,
                    min: 4,
                    max: 50
                },
                message: {
                    required: '비밀번호는 4~50자리로 입력하세요.',
                    min: '비밀번호는 4~50자리로 입력하세요.',
                    max: '비밀번호는 4~50자리로 입력하세요.'
                }
            },
            passwordRe: {
                value: req.body.passwordRe,
                rule: {
                    required: true,
                    min: 4,
                    max: 50,
                    confirmed: req.body.password
                },
                message: {
                    required: '비밀번호 확인은 4~50자리로 입력하세요.',
                    min: '비밀번호 확인은 4~50자리로 입력하세요.',
                    max: '비밀번호 확인은 4~50자리로 입력하세요.',
                    confirmed: '비밀번호가 일치하지 않습니다.'
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
            },
            nick: {
                value: req.body.nick,
                rule: {
                    required: true,
                    max: 20
                },
                message: {
                    required: '닉네임은 20자 이내로 입력하세요.',
                    max: '닉네임은 20자 이내로 입력하세요.'
                }
            },
            cell: {
                value: req.body.cell,
                rule: {
                    required: true,
                    number: true,
                    max: 20,
                    outputString: true
                },
                message: {
                    required: '휴대폰 번호는 20자 이내 숫자로 입력하세요.',
                    number: '휴대폰 번호는 20자 이내 숫자로 입력하세요.',
                    max: '휴대폰 번호는 20자 이내 숫자로 입력하세요.'
                }
            },
            bank: {
                value: req.body.bank,
                rule: {
                    required: true,
                    max: 20
                },
                message: {
                    required: '은행명은 20자 이내로 입력하세요.',
                    max: '은행명은 20자 이내로 입력하세요.'
                }
            },
            bankAccount: {
                value: req.body.bankAccount.replace(/-/gi, '').replace(/ /gi, ''),
                rule: {
                    required: true,
                    number: true,
                    max: 20,
                    outputString: true
                },
                message: {
                    required: '계좌번호는 20자 이내 숫자로 입력하세요.',
                    number: '계좌번호는 20자 이내 숫자로 입력하세요.',
                    max: '계좌번호는 20자 이내 숫자로 입력하세요.'
                }
            },
            bankOwner: {
                value: req.body.bankOwner,
                rule: {
                    required: true,
                    max: 20
                },
                message: {
                    required: '예금주는 20자 이내로 입력하세요.',
                    max: '예금주는 20자 이내로 입력하세요.'
                }
            },
            recommendCode: {
                value: req.body.recommendCode ? req.body.recommendCode.toLowerCase() : req.body.recommendCode,
                rule: {
                    required: true,
                    min: 3,
                    max: 20
                },
                message: {
                    required: '가입코드는 3~20로 입력하세요.',
                    min: '가입코드는 3~20자리로 입력하세요.',
                    max: '가입코드는 3~20자리로 입력하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '회원가입 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '회원가입 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '회원가입 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-회원가입 아이디, 닉네임 체크 ■■■■■■■■■■
            const rInfo: TService = await userService.checkDuplicate(v.id, v.nick)
            // ■■■■■■■■■■ DB-회원가입 아이디, 닉네임 체크 ■■■■■■■■■■
            if(rInfo.error) {
                logger.error(`회원가입 실패 - ${rInfo.error}`)
                data.errorTitle = '회원가입 실패 - 500'
                res.status(500).json(data)
                return
            }

            if(rInfo.data) {
                let message: string = ''
                if(rInfo.data.id === v.id) message = '아이디'
                else if(rInfo.data.nick === v.nick) message = '닉네임'

                data = tools.denyValidate(data, 'exist', `이미 사용 중인 ${message}입니다.`)
                data.errorTitle = '회원가입 실패 - 400'
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-추천코드 조회 ■■■■■■■■■■
            const rRecommend: TService = await userService.recommendCode(v.recommendCode)
            if(rRecommend.error) {
                res.status(500).end()
                return
            }
            // ■■■■■■■■■■ DB-추천코드 조회 ■■■■■■■■■■
            if(!rRecommend.data.value) {
                data = tools.denyValidate(data, 'exist', '가입코드를 확인하세요.')
                data.errorTitle = '회원가입 실패 - 400'
                res.status(400).json(data)
                return
            }

            let recommendTree: any = rRecommend.data.value.recommendTree
            let recommendLevel: number = rRecommend.data.value.recommendLevel + 1

            if(!rRecommend.data.value.isAgent) {
                recommendTree.length = 1
                recommendLevel = 2
            }

            recommendTree.push({
                _id: new ObjectID(rRecommend.data.value._id),
                id: rRecommend.data.value.id,
                nick: rRecommend.data.value.nick
            })

            // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■
            const rJoin: TService = await userService.join(
                v.id, v.password, v.passwordExchange, v.nick, v.cell,
                v.bank, v.bankAccount, v.bankOwner, recommendTree, recommendLevel,
                v.reqIpaddress
            )
            if(rJoin.error) {
                data.errorTitle = '회원가입 실패 - 500'
                res.status(500).end()
                return
            }
            // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■

            if(!rJoin.data.insertedId) {
                logger.error('회원가입 실패')
                data.errorTitle = '회원가입 실패 - 500'
                res.status(500).json(data)
                return
            }

            // ■■■■■■■■■■ DB-회원가입 알립 ■■■■■■■■■■
            await userService.joinAlarm()
            // ■■■■■■■■■■ DB-회원가입 ■■■■■■■■■■

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '회원가입 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public editUser = async (req: req, res: res): Promise<void> => {
        const validateData = {
            passwordNow: {
                value: req.body.passwordNow,
                rule: {
                    required: true,
                    min: 4,
                    max: 50
                },
                message: {
                    required: '현재 비밀번호는 4~50자리로 입력하세요.',
                    min: '현재 비밀번호는 4~50자리로 입력하세요.',
                    max: '현재 비밀번호는 4~50자리로 입력하세요.'
                }
            },
            password: {
                value: req.body.password,
                rule: {
                    required: true,
                    min: 4,
                    max: 50
                },
                message: {
                    required: '비밀번호는 4~50자리로 입력하세요.',
                    min: '비밀번호는 4~50자리로 입력하세요.',
                    max: '비밀번호는 4~50자리로 입력하세요.'
                }
            },
            passwordRe: {
                value: req.body.passwordRe,
                rule: {
                    required: true,
                    min: 4,
                    max: 50,
                    confirmed: req.body.password
                },
                message: {
                    required: '비밀번호 확인은 4~50자리로 입력하세요.',
                    min: '비밀번호 확인은 4~50자리로 입력하세요.',
                    max: '비밀번호 확인은 4~50자리로 입력하세요.',
                    confirmed: '비밀번호가 일치하지 않습니다.'
                }
            },
            passwordExchange: {
                value: req.body.passwordExchange,
                rule: {
                },
                message: {
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '회원 정보 수정 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '회원 정보 수정 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '회원 정보 수정 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            if(v.passwordExchange) {
                if(v.passwordExchange.length < 4 || v.passwordExchange.length > 50) {
                    data = tools.denyValidate(data, 'validate', '환전 비밀번호는 4~50자리로 입력하세요.')
                    res.status(400).json(data)
                    return
                }
            }

            // ■■■■■■■■■■ DB-회원 정보 수정 ■■■■■■■■■■
            const rEditUser: TService = await userService.editUser(v.decoded._id, v.passwordNow, v.password, v.passwordExchange)
            if(rEditUser.error) {
                data.errorTitle = '회원 정보 수정 실패 - 500'
                res.status(500).end()
                return
            }
            // ■■■■■■■■■■ DB-회원 정보 수정 ■■■■■■■■■■

            if(rEditUser.data.matchedCount === 0) {
                data.errorTitle = '회원 정보 수정 실패 - 400'
                data = tools.denyValidate(data, 'not same', '현재 비밀번호가 일치하지 않습니다.')
                res.status(400).json(data)
                return
            }

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = '회원 정보 수정 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getUserInfo = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            const getKeys: Array<string> = ['id', 'nick', 'name', 'bankOwner', 'grade', 'status', 'recommendCount', 'recommendLevel', 'money', 'point']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const r: TService = await userService.getUserInfo(v.decoded._id, getKeys)
            if(r.error) {
                data.errorTitle = null
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = null
            res.status(500).json(data)
            return
        }
    }

    public getAttendance = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            month: {
                value: req.query.month,
                rule: {
                    min: 7,
                    max: 7
                },
                message: {
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.',
                    confirmed: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '출석 내역 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '출석 내역 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '출석 내역 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        const firstDayMonth: string = moment(v.month).startOf('month').format('YYYY-MM-DD')

        let calendar: Array<Array<string>> = []
        let week: Array<string> = []

        for(let w: number = 0; w < 6; w++) {
            week = []
            for(let d: number = 0; d < 7; d++) {
                let firstDay = moment(firstDayMonth).add(w, 'week').day(d).format('YYYY-MM-DD')
                week.push(firstDay)
            }
            calendar.push(week)
        }

        try {
            // ■■■■■■■■■■ DB-출석 내역 가져오기 ■■■■■■■■■■
            const r: TService = await userService.getAttendance(v.decoded._id, v.month)
            if(r.error) {
                data.errorTitle = '출석 내역 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-출석 내역 가져오기 ■■■■■■■■■■

            let attendance: any = []
            let monthlyCount: number = 0

            for(let i: number = 0; i < r.data.length; i++) {
                attendance.push(moment(r.data[i].setDate).format('YYYY-MM-DD'))
                if(moment(r.data[i].setDate).format('YYYY-MM') === moment().format('YYYY-MM')) {
                    monthlyCount++
                }
            }

            res.json({
                calendar,
                attendance,
                monthlyCount,
                today: moment().format('YYYY-MM-DD')
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = null
            res.status(500).json(data)
            return
        }
    }

    public setAttendance = async (req: req, res: res): Promise<void> => {
        const validateData: any = {
            setDate: {
                value: req.body.setDate,
                rule: {
                    date: true,
                    min: 10,
                    max: 10,
                    confirmed: moment().format('YYYY-MM-DD')
                },
                message: {
                    date: '파라메터 오류. 관리자에게 문의하세요.',
                    min: '파라메터 오류. 관리자에게 문의하세요.',
                    max: '파라메터 오류. 관리자에게 문의하세요.',
                    confirmed: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '출석 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '출석 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '출석 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        try {
            // ■■■■■■■■■■ DB-오늘날짜 있는지 가져오기 ■■■■■■■■■■
            const rAttendanceTodayCount: TService = await userService.getAttendanceTodayCount(v.decoded._id, v.setDate)
            if(rAttendanceTodayCount.error) {
                data.errorTitle = '출석 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-오늘날짜 있는지 가져오기 ■■■■■■■■■■

            if(rAttendanceTodayCount.data > 0) {
                data = tools.denyValidate(data, 'setDate', '이미 출석 하셨습니다.')
                res.status(400).json(data)
                return
            }

            // ■■■■■■■■■■ DB-금일 입금 금액 가져오기 ■■■■■■■■■■
            const rChargeToday = await userService.chargeToday(v.decoded._id, v.setDate)
            if(rChargeToday.error) {
                data.errorTitle = '출석 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-금일 입금 금액 가져오기 ■■■■■■■■■■

            let chargeToday: number = 0
            if(rChargeToday.data.length === 0) {
                chargeToday = 0
            }
            else {
                chargeToday = rChargeToday.data[0].totalMoney
            }

            // ■■■■■■■■■■ DB-출석 환경 설정 가져오기 ■■■■■■■■■■
            const rConfigAttendance = await etcService.getConfigAttendance()
            if(rConfigAttendance.error) {
                data.errorTitle = '출석 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-출석 환경 설정 가져오기 ■■■■■■■■■■

            const needCharge = rConfigAttendance.data[0].amount
            rConfigAttendance.data.shift()

            if(chargeToday < needCharge) {
                data.errorTitle = '출석 실패 - 400'
                data = tools.denyValidate(data, 'chargeMoney', `금일 ${numeral(needCharge).format('0,0')}이상 충전시 출석 가능 합니다.`)
                res.status(400).json(data)
                return
            }

            const getKeys: Array<string> = ['recommendTree', 'isTest', 'isAgent']
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■
            const rUserInfo: TService = await userService.getUserInfo(v.decoded._id, getKeys)
            if(rUserInfo.error) {
                data.errorTitle = '출석 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-회원정보 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-출석 ■■■■■■■■■■
            const rSetAttendance: TService = await etcService.setAttendance(
                v.decoded._id,
                v.decoded.id,
                v.decoded.nick,
                v.decoded.grade,
                v.decoded.bankOwner,
                rUserInfo.data.recommendTree,
                v.setDate
            )
            if(rSetAttendance.error) {
                data.errorTitle = '출석 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-출석 ■■■■■■■■■■

            if(rConfigAttendance.data.length === 0) {
                res.end()
                return
            }

            for(let i: number = 0; i < rConfigAttendance.data.length; i++) {
                const startDate: Date = moment().subtract(rConfigAttendance.data[i].date - 1, 'day').toDate()

                // ■■■■■■■■■■ DB-설정에 대한 날짜 이후의 갯수 가져오기 ■■■■■■■■■■
                const rBeforeCount: TService = await etcService.getBeforeAttendanceCount(startDate, v.decoded._id)
                if(rBeforeCount.error) {
                    console.log(rBeforeCount.error)
                    res.status(500).end()
                    return
                }
                // ■■■■■■■■■■ DB-설정에 대한 날짜 이후의 갯수 가져오기 ■■■■■■■■■■

                if(rBeforeCount.data === rConfigAttendance.data[i].date) {
                    if(rConfigAttendance.data[i].amount === 0) {
                        continue
                    }

                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■
                    const rAddPoint: TService = await moneyService.addPointForAttendance(v.decoded._id, rConfigAttendance.data[i].amount)
                    // ■■■■■■■■■■ DB-USER 에 돈 넣어 주기. ■■■■■■■■■■

                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                    await moneyService.addMoneyForAttendanceLog(
                        v.decoded._id,
                        v.decoded.id,
                        v.decoded.nick,
                        v.decoded.grade,
                        v.decoded.bankOwner,
                        rUserInfo.data.recommendTree,
                        rConfigAttendance.data[i].amount,
                        rAddPoint.data.value.point,
                        rUserInfo.data.isTest,
                        rUserInfo.data.isAgent,
                        rConfigAttendance.data[i].date
                    )
                    // ■■■■■■■■■■ DB-로그 ■■■■■■■■■■
                }
            }

            res.end()
        } catch (e) {
            logger.error(e)
            data.errorTitle = null
            res.status(500).json(data)
            return
        }
    }
}