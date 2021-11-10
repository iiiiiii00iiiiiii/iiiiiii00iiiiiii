import { ObjectId } from 'mongodb'

type TUser = {
    _id: ObjectId,
    id: string,
    nick: string,
    bankOwner: string,
    grade: number,
    isAgent: boolean
}

type TUserToken = {
    _id: ObjectId,
    id: string,
    nick: string,
    bankOwner: string,
    grade: number,
    isAgent: boolean
}

export type { TUser, TUserToken }