import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

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
}