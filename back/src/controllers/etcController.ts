import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4 } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

interface IEtcController {
}

export default class EtcController implements IEtcController {
    constructor() {
    }
}