import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

import UserService from '../services/userService'
const userService: UserService = new UserService()

import MessageService from '../services/messageService'
const messageService: MessageService = new MessageService()

import BoardService from '../services/boardService'
const boardService: BoardService = new BoardService()

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
                data.errorTitle = 'EVENT 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-토큰 검증 ■■■■■■■■■■
            if(rCheckDtoken.data === 0) {
                res.status(401).end()
                return
            }

            // ■■■■■■■■■■ DB-사이트 점검설정 가지고 오기 ■■■■■■■■■■
            const rMaintenance: TService = await etcService.maintenance()
            if(rMaintenance.error) {
                data.errorTitle = 'EVENT 실패 - 500'
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
                data.errorTitle = 'EVENT 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-쪽지 갯수 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-고객센터 미확인 답변 갯수 가져오기 ■■■■■■■■■■
            const rHelpCount: TService = await boardService.helpCount(v.decoded._id)
            if(rHelpCount.error) {
                data.errorTitle = 'EVENT 실패 - 500'
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
            data.errorTitle = 'EVENT 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
}