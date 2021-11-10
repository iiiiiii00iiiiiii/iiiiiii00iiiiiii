import { Request as req, Response as res, NextFunction as next } from 'express'
import { ObjectId } from 'mongodb'

type TService = {
    error: any | null,
    data: any | null,
    count?: number | null
}

type TReq = req & {
    decoded: any,
    token: string
}

type TObjectId = ObjectId

export type { TService, TReq, req, res, next, TObjectId }