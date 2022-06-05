import { Request as req, Response as res } from 'express'
import { logger, crypto, moment, mongoSanitize, numeral, uuidv4, cache, _ } from '../lib/modules'
import config from '../config'
import { ObjectID } from '../lib/db'
import tools from '../lib/tools'

import type { TService } from '../models'

import GameService from '../services/gameService'
const gameService: GameService = new GameService()

import EtcService from '../services/etcService'
const etcService: EtcService = new EtcService()

import Validate from '../lib/validate'
const validate: Validate = new Validate()

interface IGameController {
}

export default class GameController implements IGameController {
    constructor() {
    }

    public getCategory = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            let category: any = cache.get('category')

            if(!category) {
                //■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
                const rCategory: TService = await gameService.getCategory()
                if(rCategory.error) {
                    data.errorTitle = '카테고리 상세 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-카테고리 가져오기 ■■■■■■■■■■

                let arrayFootball: Array<any> = []  // 축구
                let arrayBasketball: Array<any> = []  // 농구
                let arrayBaseball: Array<any> = []  // 야구
                let arrayIceHockey: Array<any> = []  // 아이스 하키
                let arrayTennis: Array<any> = []  // 테니스
                let arrayHandball: Array<any> = []  // 핸드볼
                let arrayVolleyball: Array<any> = []  // 배구
                let arrayRugbyLeague: Array<any> = []  // 럭비
                let arrayRugbyUnion: Array<any> = []  // 럭비 유니온
                let arrayBoxing: Array<any> = []  // 권투
                let arrayTableTennis: Array<any> = []  // 탁구
                let arrayMMA: Array<any> = []  // 이종 격투기
                let arrayGolf: Array<any> = []  // 골프
                let arrayDarts: Array<any> = []  // 다트
                let arrayLoL: Array<any> = []  // LoL
                let arrayCSGO: Array<any> = []  // 카운터 스트라이크
                let arrayDota2: Array<any> = []  //Dota 2
                let arrayFIFA: Array<any> = []  //FIFA
                // let arrayRugbyUsa: Array<any> = []  //미식축구

                let popularFootball: any = {  // 인기 - 축구
                    kLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    jLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    pLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    bLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    sLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    pmLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    lLeague: {
                        count: 0,
                        leagueKor: ''
                    }
                }
                let popularBaseball: any = {  // 인기 - 야구
                    MLB: {
                        count: 0,
                        leagueKor: ''
                    },
                    NPB: {
                        count: 0,
                        leagueKor: ''
                    },
                    KBO: {
                        count: 0,
                        leagueKor: ''
                    }
                }
                let popularBasketball: any = {  // 인기 - 농구
                    NBA: {
                        count: 0,
                        leagueKor: ''
                    },
                    KBL: {
                        count: 0,
                        leagueKor: ''
                    },
                    WKBL: {
                        count: 0,
                        leagueKor: ''
                    }
                }
                let popularHockey: any = {  // 인기 - 아이스 하키
                    NHL: {
                        count: 0,
                        leagueKor: ''
                    }
                }
                let popularVolleyball: any = {  // 인기 - 배구
                    vLeague: {
                        count: 0,
                        leagueKor: ''
                    },
                    wvLeague: {
                        count: 0,
                        leagueKor: ''
                    }
                }

                for(let i: number = 0; i < rCategory.data.length; i++) {
                    if(rCategory.data[i].sport === 'Football') arrayFootball.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Basketball') arrayBasketball.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Baseball') arrayBaseball.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Ice Hockey') arrayIceHockey.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Tennis') arrayTennis.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Handball') arrayHandball.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Volleyball') arrayVolleyball.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Rugby League') arrayRugbyLeague.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Rugby Union') arrayRugbyUnion.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Boxing') arrayBoxing.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Table Tennis') arrayTableTennis.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'MMA') arrayMMA.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Golf') arrayGolf.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Darts') arrayDarts.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'LoL') arrayLoL.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'CS:GO') arrayCSGO.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'Dota 2') arrayDota2.push(rCategory.data[i])
                    if(rCategory.data[i].sport === 'FIFA') arrayFIFA.push(rCategory.data[i])
                    // if(rCategory.data[i].sport === 'Rugby Usa') arrayRugbyUsa.push(rCategory.data[i])

                    if(rCategory.data[i].leagueOID) {
                        if(rCategory.data[i].leagueOID.toString() === '5f48c8e3b4e1811a747f6d6b') {  // K리그
                            popularFootball.kLeague.count++
                            popularFootball.kLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f48c8e4b4e1811a747f6d6c') {  // J리그
                            popularFootball.jLeague.count++
                            popularFootball.jLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f5b613b67fb22444c8b4da3') {  // 프리미어
                            popularFootball.pLeague.count++
                            popularFootball.pLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f63ab58d92cfc6ce06ef6e0') {  // 분데스리가
                            popularFootball.bLeague.count++
                            popularFootball.bLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f64c7a77670b52ae55461ab') {  // 세리에A
                            popularFootball.sLeague.count++
                            popularFootball.sLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f5b848367fb22444c8b4ef4') {  // 프리메라리가
                            popularFootball.pmLeague.count++
                            popularFootball.pmLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f4803d5b4e1811a747f6937') {  // 리그앙
                            popularFootball.lLeague.count++
                            popularFootball.lLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f4804edb4e1811a747f693b') {  // MLB
                            popularBaseball.MLB.count++
                            popularBaseball.MLB.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f4776c6d9ee2c1ae048ac26') {  // NPB
                            popularBaseball.NPB.count++
                            popularBaseball.NPB.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f477cfb88b7430de81e0a75') {  // KBO
                            popularBaseball.KBO.count++
                            popularBaseball.KBO.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f4760e92696f30d7872d60e') {  // NBA
                            popularBasketball.NBA.count++
                            popularBasketball.NBA.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f7edbe85dbf920fd5a1a168') {  // KBL
                            popularBasketball.KBL.count++
                            popularBasketball.KBL.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f80579d5dbf920fd5a1a560') {  // WKBL
                            popularBasketball.WKBL.count++
                            popularBasketball.WKBL.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f4760ee2696f30d7872d640') {  // NHL
                            popularHockey.NHL.count++
                            popularHockey.NHL.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f8996cb5dbf920fd5a1bfe4') {  // v-League
                            popularVolleyball.vLeague.count++
                            popularVolleyball.vLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                        else if(rCategory.data[i].leagueOID.toString() === '5f89a7345dbf920fd5a1c0b0') {  // wv-League
                            popularVolleyball.wvLeague.count++
                            popularVolleyball.wvLeague.leagueKor = rCategory.data[i].leagueKor
                        }
                    }
                }

                let r: any = {}
                let rCount: any = {}
                let rCountryOID: any = {}

                // 축구
                if(arrayFootball.length > 0) {
                    r.Football = {}
                    rCount.Football = {
                        countOfGame: arrayFootball.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayFootball.length; i++) {
                    let existCountry = r.Football.hasOwnProperty(arrayFootball[i].countryKor)
                    if(!existCountry) {
                        r.Football[arrayFootball[i].countryKor] = []
                        rCount.Football.country[arrayFootball[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayFootball[i].countryKor] = arrayFootball[i].countryOID
                    }

                    let index = r.Football[arrayFootball[i].countryKor].findIndex((x: any) => x === arrayFootball[i].leagueKor)
                    if(index === -1) {
                        r.Football[arrayFootball[i].countryKor].push(arrayFootball[i].leagueKor)
                        rCount.Football.country[arrayFootball[i].countryKor].league[arrayFootball[i].leagueKor] = 0
                    }
                }

                // 농구
                if(arrayBasketball.length > 0) {
                    r.Basketball = {}
                    rCount.Basketball = {
                        countOfGame: arrayBasketball.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayBasketball.length; i++) {
                    let existCountry = r.Basketball.hasOwnProperty(arrayBasketball[i].countryKor)
                    if(!existCountry) {
                        r.Basketball[arrayBasketball[i].countryKor] = []
                        rCount.Basketball.country[arrayBasketball[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayBasketball[i].countryKor] = arrayBasketball[i].countryOID
                    }

                    let index = r.Basketball[arrayBasketball[i].countryKor].findIndex((x: any) => x === arrayBasketball[i].leagueKor)
                    if(index === -1) {
                        r.Basketball[arrayBasketball[i].countryKor].push(arrayBasketball[i].leagueKor)
                        rCount.Basketball.country[arrayBasketball[i].countryKor].league[arrayBasketball[i].leagueKor] = 0
                    }
                }

                // 야구
                if(arrayBaseball.length > 0) {
                    r.Baseball = {}
                    rCount.Baseball = {
                        countOfGame: arrayBaseball.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayBaseball.length; i++) {
                    let existCountry = r.Baseball.hasOwnProperty(arrayBaseball[i].countryKor)
                    if(!existCountry) {
                        r.Baseball[arrayBaseball[i].countryKor] = []
                        rCount.Baseball.country[arrayBaseball[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayBaseball[i].countryKor] = arrayBaseball[i].countryOID
                    }

                    let index = r.Baseball[arrayBaseball[i].countryKor].findIndex((x: any) => x === arrayBaseball[i].leagueKor)
                    if(index === -1) {
                        r.Baseball[arrayBaseball[i].countryKor].push(arrayBaseball[i].leagueKor)
                        rCount.Baseball.country[arrayBaseball[i].countryKor].league[arrayBaseball[i].leagueKor] = 0
                    }
                }

                // 아이스 하키
                if(arrayIceHockey.length > 0) {
                    r['Ice Hockey'] = {}
                    rCount['Ice Hockey'] = {
                        countOfGame: arrayIceHockey.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayIceHockey.length; i++) {
                    let existCountry = r['Ice Hockey'].hasOwnProperty(arrayIceHockey[i].countryKor)
                    if(!existCountry) {
                        r['Ice Hockey'][arrayIceHockey[i].countryKor] = []
                        rCount['Ice Hockey'].country[arrayIceHockey[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayIceHockey[i].countryKor] = arrayIceHockey[i].countryOID
                    }

                    let index = r['Ice Hockey'][arrayIceHockey[i].countryKor].findIndex((x: any) => x === arrayIceHockey[i].leagueKor)
                    if(index === -1) {
                        r['Ice Hockey'][arrayIceHockey[i].countryKor].push(arrayIceHockey[i].leagueKor)
                        rCount['Ice Hockey'].country[arrayIceHockey[i].countryKor].league[arrayIceHockey[i].leagueKor] = 0
                    }
                }

                // 테니스
                if(arrayTennis.length > 0) {
                    r.Tennis = {}
                    rCount.Tennis = {
                        countOfGame: arrayTennis.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayTennis.length; i++) {
                    let existCountry = r.Tennis.hasOwnProperty(arrayTennis[i].countryKor)
                    if(!existCountry) {
                        r.Tennis[arrayTennis[i].countryKor] = []
                        rCount.Tennis.country[arrayTennis[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayTennis[i].countryKor] = arrayTennis[i].countryOID
                    }

                    let index = r.Tennis[arrayTennis[i].countryKor].findIndex((x: any) => x === arrayTennis[i].leagueKor)
                    if(index === -1) {
                        r.Tennis[arrayTennis[i].countryKor].push(arrayTennis[i].leagueKor)
                        rCount.Tennis.country[arrayTennis[i].countryKor].league[arrayTennis[i].leagueKor] = 0
                    }
                }

                // 핸드볼
                if(arrayHandball.length > 0) {
                    r.Handball = {}
                    rCount.Handball = {
                        countOfGame: arrayHandball.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayHandball.length; i++) {
                    let existCountry = r.Handball.hasOwnProperty(arrayHandball[i].countryKor)
                    if(!existCountry) {
                        r.Handball[arrayHandball[i].countryKor] = []
                        rCount.Handball.country[arrayHandball[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayHandball[i].countryKor] = arrayHandball[i].countryOID
                    }

                    let index = r.Handball[arrayHandball[i].countryKor].findIndex((x: any) => x === arrayHandball[i].leagueKor)
                    if(index === -1) {
                        r.Handball[arrayHandball[i].countryKor].push(arrayHandball[i].leagueKor)
                        rCount.Handball.country[arrayHandball[i].countryKor].league[arrayHandball[i].leagueKor] = 0
                    }
                }

                // 배구
                if(arrayVolleyball.length > 0) {
                    r.Volleyball = {}
                    rCount.Volleyball = {
                        countOfGame: arrayVolleyball.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayVolleyball.length; i++) {
                    let existCountry = r.Volleyball.hasOwnProperty(arrayVolleyball[i].countryKor)
                    if(!existCountry) {
                        r.Volleyball[arrayVolleyball[i].countryKor] = []
                        rCount.Volleyball.country[arrayVolleyball[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayVolleyball[i].countryKor] = arrayVolleyball[i].countryOID
                    }

                    let index = r.Volleyball[arrayVolleyball[i].countryKor].findIndex((x: any) => x === arrayVolleyball[i].leagueKor)
                    if(index === -1) {
                        r.Volleyball[arrayVolleyball[i].countryKor].push(arrayVolleyball[i].leagueKor)
                        rCount.Volleyball.country[arrayVolleyball[i].countryKor].league[arrayVolleyball[i].leagueKor] = 0
                    }
                }

                // 럭비
                if(arrayRugbyLeague.length > 0) {
                    r['Rugby League'] = {}
                    rCount['Rugby League'] = {
                        countOfGame: arrayRugbyLeague.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayRugbyLeague.length; i++) {
                    let existCountry = r['Rugby League'].hasOwnProperty(arrayRugbyLeague[i].countryKor)
                    if(!existCountry) {
                        r['Rugby League'][arrayRugbyLeague[i].countryKor] = []
                        rCount['Rugby League'].country[arrayRugbyLeague[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayRugbyLeague[i].countryKor] = arrayRugbyLeague[i].countryOID
                    }

                    let index = r['Rugby League'][arrayRugbyLeague[i].countryKor].findIndex((x: any) => x === arrayRugbyLeague[i].leagueKor)
                    if(index === -1) {
                        r['Rugby League'][arrayRugbyLeague[i].countryKor].push(arrayRugbyLeague[i].leagueKor)
                        rCount['Rugby League'].country[arrayRugbyLeague[i].countryKor].league[arrayRugbyLeague[i].leagueKor] = 0
                    }
                }

                // 럭비 유니온
                if(arrayRugbyUnion.length > 0) {
                    r['Rugby Union'] = {}
                    rCount['Rugby Union'] = {
                        countOfGame: arrayRugbyUnion.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayRugbyUnion.length; i++) {
                    let existCountry = r['Rugby Union'].hasOwnProperty(arrayRugbyUnion[i].countryKor)
                    if(!existCountry) {
                        r['Rugby Union'][arrayRugbyUnion[i].countryKor] = []
                        rCount['Rugby Union'].country[arrayRugbyUnion[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayRugbyUnion[i].countryKor] = arrayRugbyUnion[i].countryOID
                    }

                    let index = r['Rugby Union'][arrayRugbyUnion[i].countryKor].findIndex((x: any) => x === arrayRugbyUnion[i].leagueKor)
                    if(index === -1) {
                        r['Rugby Union'][arrayRugbyUnion[i].countryKor].push(arrayRugbyUnion[i].leagueKor)
                        rCount['Rugby Union'].country[arrayRugbyUnion[i].countryKor].league[arrayRugbyUnion[i].leagueKor] = 0
                    }
                }

                // 권투
                if(arrayBoxing.length > 0) {
                    r.Boxing = {}
                    rCount.Boxing = {
                        countOfGame: arrayBoxing.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayBoxing.length; i++) {
                    let existCountry = r.Boxing.hasOwnProperty(arrayBoxing[i].countryKor)
                    if(!existCountry) {
                        r.Boxing[arrayBoxing[i].countryKor] = []
                        rCount.Boxing.country[arrayBoxing[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayBoxing[i].countryKor] = arrayBoxing[i].countryOID
                    }

                    let index = r.Boxing[arrayBoxing[i].countryKor].findIndex((x: any) => x === arrayBoxing[i].leagueKor)
                    if(index === -1) {
                        r.Boxing[arrayBoxing[i].countryKor].push(arrayBoxing[i].leagueKor)
                        rCount.Boxing.country[arrayBoxing[i].countryKor].league[arrayBoxing[i].leagueKor] = 0
                    }
                }

                // 탁구
                if(arrayTableTennis.length > 0) {
                    r['Table Tennis'] = {}
                    rCount['Table Tennis'] = {
                        countOfGame: arrayTableTennis.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayTableTennis.length; i++) {
                    let existCountry = r['Table Tennis'].hasOwnProperty(arrayTableTennis[i].countryKor)
                    if(!existCountry) {
                        r['Table Tennis'][arrayTableTennis[i].countryKor] = []
                        rCount['Table Tennis'].country[arrayTableTennis[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayTableTennis[i].countryKor] = arrayTableTennis[i].countryOID
                    }

                    let index = r['Table Tennis'][arrayTableTennis[i].countryKor].findIndex((x: any) => x === arrayTableTennis[i].leagueKor)
                    if(index === -1) {
                        r['Table Tennis'][arrayTableTennis[i].countryKor].push(arrayTableTennis[i].leagueKor)
                        rCount['Table Tennis'].country[arrayTableTennis[i].countryKor].league[arrayTableTennis[i].leagueKor] = 0
                    }
                }

                // 이종 격투기
                if(arrayMMA.length > 0) {
                    r.MMA = {}
                    rCount.MMA = {
                        countOfGame: arrayMMA.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayMMA.length; i++) {
                    let existCountry = r.MMA.hasOwnProperty(arrayMMA[i].countryKor)
                    if(!existCountry) {
                        r.MMA[arrayMMA[i].countryKor] = []
                        rCount.MMA.country[arrayMMA[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayMMA[i].countryKor] = arrayMMA[i].countryOID
                    }

                    let index = r.MMA[arrayMMA[i].countryKor].findIndex((x: any) => x === arrayMMA[i].leagueKor)
                    if(index === -1) {
                        r.MMA[arrayMMA[i].countryKor].push(arrayMMA[i].leagueKor)
                        rCount.MMA.country[arrayMMA[i].countryKor].league[arrayMMA[i].leagueKor] = 0
                    }
                }

                // 골프
                if(arrayGolf.length > 0) {
                    r.Golf = {}
                    rCount.Golf = {
                        countOfGame: arrayGolf.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayGolf.length; i++) {
                    let existCountry = r.Golf.hasOwnProperty(arrayGolf[i].countryKor)
                    if(!existCountry) {
                        r.Golf[arrayGolf[i].countryKor] = []
                        rCount.Golf.country[arrayGolf[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayGolf[i].countryKor] = arrayGolf[i].countryOID
                    }

                    let index = r.Golf[arrayGolf[i].countryKor].findIndex((x: any) => x === arrayGolf[i].leagueKor)
                    if(index === -1) {
                        r.Golf[arrayGolf[i].countryKor].push(arrayGolf[i].leagueKor)
                        rCount.Golf.country[arrayGolf[i].countryKor].league[arrayGolf[i].leagueKor] = 0
                    }
                }

                // 다트
                if(arrayDarts.length > 0) {
                    r.Darts = {}
                    rCount.Darts = {
                        countOfGame: arrayDarts.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayDarts.length; i++) {
                    let existCountry = r.Darts.hasOwnProperty(arrayDarts[i].countryKor)
                    if(!existCountry) {
                        r.Darts[arrayDarts[i].countryKor] = []
                        rCount.Darts.country[arrayDarts[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayDarts[i].countryKor] = arrayDarts[i].countryOID
                    }

                    let index = r.Darts[arrayDarts[i].countryKor].findIndex((x: any) => x === arrayDarts[i].leagueKor)
                    if(index === -1) {
                        r.Darts[arrayDarts[i].countryKor].push(arrayDarts[i].leagueKor)
                        rCount.Darts.country[arrayDarts[i].countryKor].league[arrayDarts[i].leagueKor] = 0
                    }
                }

                // LoL
                if(arrayLoL.length > 0) {
                    r.LoL = {}
                    rCount.LoL = {
                        countOfGame: arrayLoL.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayLoL.length; i++) {
                    let existCountry = r.LoL.hasOwnProperty(arrayLoL[i].countryKor)
                    if(!existCountry) {
                        r.LoL[arrayLoL[i].countryKor] = []
                        rCount.LoL.country[arrayLoL[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayLoL[i].countryKor] = arrayLoL[i].countryOID
                    }

                    let index = r.LoL[arrayLoL[i].countryKor].findIndex((x: any) => x === arrayLoL[i].leagueKor)
                    if(index === -1) {
                        r.LoL[arrayLoL[i].countryKor].push(arrayLoL[i].leagueKor)
                        rCount.LoL.country[arrayLoL[i].countryKor].league[arrayLoL[i].leagueKor] = 0
                    }
                }

                // 카운터 스트라이크
                if(arrayCSGO.length > 0) {
                    r['CS:GO'] = {}
                    rCount['CS:GO'] = {
                        countOfGame: arrayCSGO.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayCSGO.length; i++) {
                    let existCountry = r['CS:GO'].hasOwnProperty(arrayCSGO[i].countryKor)
                    if(!existCountry) {
                        r['CS:GO'][arrayCSGO[i].countryKor] = []
                        rCount['CS:GO'].country[arrayCSGO[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayCSGO[i].countryKor] = arrayCSGO[i].countryOID
                    }

                    let index = r['CS:GO'][arrayCSGO[i].countryKor].findIndex((x: any) => x === arrayCSGO[i].leagueKor)
                    if(index === -1) {
                        r['CS:GO'][arrayCSGO[i].countryKor].push(arrayCSGO[i].leagueKor)
                        rCount['CS:GO'].country[arrayCSGO[i].countryKor].league[arrayCSGO[i].leagueKor] = 0
                    }
                }

                // Dota 2
                if(arrayDota2.length > 0) {
                    r['Dota 2'] = {}
                    rCount['Dota 2'] = {
                        countOfGame: arrayDota2.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayDota2.length; i++) {
                    let existCountry = r['Dota 2'].hasOwnProperty(arrayDota2[i].countryKor)
                    if(!existCountry) {
                        r['Dota 2'][arrayDota2[i].countryKor] = []
                        rCount['Dota 2'].country[arrayDota2[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayDota2[i].countryKor] = arrayDota2[i].countryOID
                    }

                    let index = r['Dota 2'][arrayDota2[i].countryKor].findIndex((x: any) => x === arrayDota2[i].leagueKor)
                    if(index === -1) {
                        r['Dota 2'][arrayDota2[i].countryKor].push(arrayDota2[i].leagueKor)
                        rCount['Dota 2'].country[arrayDota2[i].countryKor].league[arrayDota2[i].leagueKor] = 0
                    }
                }

                // FIFA
                if(arrayFIFA.length > 0) {
                    r.FIFA = {}
                    rCount.FIFA = {
                        countOfGame: arrayFIFA.length,
                        country: {}
                    }
                }
                for(let i: number = 0; i < arrayFIFA.length; i++) {
                    let existCountry = r.FIFA.hasOwnProperty(arrayFIFA[i].countryKor)
                    if(!existCountry) {
                        r.FIFA[arrayFIFA[i].countryKor] = []
                        rCount.FIFA.country[arrayFIFA[i].countryKor] = {
                            countOfGame: 0,
                            league: {}
                        }
                        rCountryOID[arrayFIFA[i].countryKor] = arrayFIFA[i].countryOID
                    }

                    let index = r.FIFA[arrayFIFA[i].countryKor].findIndex((x: any) => x === arrayFIFA[i].leagueKor)
                    if(index === -1) {
                        r.FIFA[arrayFIFA[i].countryKor].push(arrayFIFA[i].leagueKor)
                        rCount.FIFA.country[arrayFIFA[i].countryKor].league[arrayFIFA[i].leagueKor] = 0
                    }
                }

                //국가 및 리그 경기수 넣어주기.
                for(let i: number = 0; i < rCategory.data.length; i++) {
                    rCount[rCategory.data[i].sport].country[rCategory.data[i].countryKor].countOfGame++
                    rCount[rCategory.data[i].sport].country[rCategory.data[i].countryKor].league[rCategory.data[i].leagueKor]++
                }

                cache.put('category', {
                    category: r,
                    countOfCategory: rCount,
                    countryOID: rCountryOID,
                    popularFootball,
                    popularBaseball,
                    popularBasketball,
                    popularHockey,
                    popularVolleyball
                }, 180000)
            }
            category = cache.get('category')
            res.json(category)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '카테고리 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getPrematchList = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Handball', 'Volleyball', 'Rugby League', 'Rugby Union', 'Boxing', 'MMA', 'Golf', 'Darts', 'LoL', 'CS:GO', 'Dota 2', 'FIFA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            league: {
                value: req.query.league,
                rule: {
                    required: false
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchList(v.page, v.sport, v.league)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

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
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
    public getPrematchListPent = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.sport,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            league: {
                value: req.query.league,
                rule: {
                    required: false
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchListPent(v.page, v.sport, v.league)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

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
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
    public getPrematchListModern = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Volleyball', 'Rugby League', 'LoL', 'Handball', 'MMA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            countryKor: {
                value: req.query.countryKor,
                rule: {
                    required: req.query.countryKor
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            league: {
                value: req.query.league,
                rule: {
                    required: false
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchListModern(v.page, v.sport, v.countryKor, v.league)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

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
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getPrematchCrossList = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Handball', 'Volleyball', 'Rugby League', 'Rugby Union', 'Boxing', 'MMA', 'Golf', 'Darts', 'LoL', 'CS:GO', 'Dota 2', 'FIFA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchCrossList(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

            if(config.db.name === 'study') {
                for(let i: number = 0; i < r.data.length; i++) {
                    if(r.data[i].games.handicap) {
                        r.data[i].games.handicap = _.sortBy(r.data[i].games.handicap, 'homeStandard')
                    }

                    if(r.data[i].games.underOver) {
                        r.data[i].games.underOver = _.sortBy(r.data[i].games.underOver, 'standard')
                    }
                }

                // for(let i: number = 0; i < r.data.length; i++) {
                //     if(r.data[i].games.handicap) {
                //         let h = 1000000
                //         let indexH = -1
                //         for(let j = 0; j < r.data[i].games.handicap.length; j++) {
                //             let nh = Math.abs(r.data[i].games.handicap[j].homeRate - r.data[i].games.handicap[j].awayRate)
                //             if(nh <= h) {
                //                 h = nh
                //                 indexH = j
                //             }
                //         }
                //         r.data[i].games.handicap = [r.data[i].games.handicap[indexH]]
                //     }

                //     if(r.data[i].games.handicapTotalSet) {
                //         let h = 1000000
                //         let indexH = -1
                //         for(let j = 0; j < r.data[i].games.handicapTotalSet.length; j++) {
                //             let nh = Math.abs(r.data[i].games.handicapTotalSet[j].homeRate - r.data[i].games.handicapTotalSet[j].awayRate)
                //             if(nh < h) {
                //                 h = nh
                //                 indexH = j
                //             }
                //         }
                //         r.data[i].games.handicapTotalSet = [r.data[i].games.handicapTotalSet[indexH]]
                //     }

                //     if(r.data[i].games.underOver) {
                //         let h = 1000000
                //         let indexH = -1
                //         for(let j = 0; j < r.data[i].games.underOver.length; j++) {
                //             let nh = Math.abs(r.data[i].games.underOver[j].underRate - r.data[i].games.underOver[j].overRate)
                //             if(nh <= h) {
                //                 h = nh
                //                 indexH = j
                //             }
                //         }
                //         r.data[i].games.underOver = [r.data[i].games.underOver[indexH]]
                //     }

                //     if(r.data[i].games.underOverTotalSet) {
                //         let h = 1000000
                //         let indexH = -1
                //         for(let j = 0; j < r.data[i].games.underOverTotalSet.length; j++) {
                //             let nh = Math.abs(r.data[i].games.underOverTotalSet[j].underRate - r.data[i].games.underOverTotalSet[j].overRate)
                //             if(nh < h) {
                //                 h = nh
                //                 indexH = j
                //             }
                //         }
                //         r.data[i].games.underOverTotalSet = [r.data[i].games.underOverTotalSet[indexH]]
                //     }
                // }
            }

            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■
            const getKeys: Array<string> = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'lv8', 'lv9']
            const rConfig: TService = await etcService.getConfigInfo('sportsBetCross', getKeys)
            if(rConfig.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
    public getPrematchCrossListPent = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            league: {
                value: req.query.league,
                rule: {
                    required: false
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchCrossListPent(v.page, v.sport, v.league)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

            // for(let i: number = 0; i < r.data.length; i++) {
            //     if(r.data[i].games.handicap) {
            //         r.data[i].games.handicap = _.sortBy(r.data[i].games.handicap, 'homeStandard')
            //     }

            //     if(r.data[i].games.underOver) {
            //         r.data[i].games.underOver = _.sortBy(r.data[i].games.underOver, 'standard')
            //     }
            // }

            // for(let i: number = 0; i < r.data.length; i++) {
            //     if(r.data[i].games.handicap) {
            //         let h = 1000000
            //         let indexH = -1
            //         for(let j = 0; j < r.data[i].games.handicap.length; j++) {
            //             let nh = Math.abs(r.data[i].games.handicap[j].homeRate - r.data[i].games.handicap[j].awayRate)
            //             if(nh <= h) {
            //                 h = nh
            //                 indexH = j
            //             }
            //         }
            //         r.data[i].games.handicap = [r.data[i].games.handicap[indexH]]
            //     }

            //     if(r.data[i].games.handicapTotalSet) {
            //         let h = 1000000
            //         let indexH = -1
            //         for(let j = 0; j < r.data[i].games.handicapTotalSet.length; j++) {
            //             let nh = Math.abs(r.data[i].games.handicapTotalSet[j].homeRate - r.data[i].games.handicapTotalSet[j].awayRate)
            //             if(nh < h) {
            //                 h = nh
            //                 indexH = j
            //             }
            //         }
            //         r.data[i].games.handicapTotalSet = [r.data[i].games.handicapTotalSet[indexH]]
            //     }

            //     if(r.data[i].games.underOver) {
            //         let h = 1000000
            //         let indexH = -1
            //         for(let j = 0; j < r.data[i].games.underOver.length; j++) {
            //             let nh = Math.abs(r.data[i].games.underOver[j].underRate - r.data[i].games.underOver[j].overRate)
            //             if(nh <= h) {
            //                 h = nh
            //                 indexH = j
            //             }
            //         }
            //         r.data[i].games.underOver = [r.data[i].games.underOver[indexH]]
            //     }

            //     if(r.data[i].games.underOverTotalSet) {
            //         let h = 1000000
            //         let indexH = -1
            //         for(let j = 0; j < r.data[i].games.underOverTotalSet.length; j++) {
            //             let nh = Math.abs(r.data[i].games.underOverTotalSet[j].underRate - r.data[i].games.underOverTotalSet[j].overRate)
            //             if(nh < h) {
            //                 h = nh
            //                 indexH = j
            //             }
            //         }
            //         r.data[i].games.underOverTotalSet = [r.data[i].games.underOverTotalSet[indexH]]
            //     }
            // }

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
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getLiveList = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    number: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Darts', 'Boxing', 'MMA', 'Rugby League', 'Rugby Union', 'Golf', 'Handball', 'CS:GO', 'Dota 2', 'LoL', 'FIFA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getLiveList(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■
            const getKeys: Array<string> = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'lv8', 'lv9']
            const rConfig: TService = await etcService.getConfigInfo('sportsBetLive', getKeys)
            if(rConfig.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }
    public getLiveListPent = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    number: '파라메터 오류. 관리자에게 문의하세요.'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'Rugby League', 'LoL', 'MMA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getLiveListPent(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■

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
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getLiveDetail = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

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
                v.errorTitle = '스포츠 라이브 상세 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 라이브 상세 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 라이브 상세 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 라이브 상세 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getLiveDetail(v._id)
            if(r.error) {
                data.errorTitle = '스포츠 라이브 상세 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 라이브 상세 가져오기 ■■■■■■■■■■

            res.json(r.data)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 라이브 상세 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getPrematchSpecialList = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Basketball', 'Baseball', 'Volleyball', 'Ice Hockey', 'LoL']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPrematchSpecialList(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■


            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■
            const getKeys: Array<string> = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'lv8', 'lv9']
            const rConfig: TService = await etcService.getConfigInfo('sportsBetSpecial', getKeys)
            if(rConfig.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getLiveKorList = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Basketball', 'Volleyball']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '스포츠 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '스포츠 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getLiveKorList(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 경기 리스트 가져오기 ■■■■■■■■■■


            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■
            const getKeys: Array<string> = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'lv8', 'lv9']
            const rConfig: TService = await etcService.getConfigInfo('sportsBetLiveKor', getKeys)
            if(rConfig.error) {
                data.errorTitle = '스포츠 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스포츠 환경 설정 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count,
                betInfo: rConfig.data
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스포츠 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getGameResults = async (req: req, res: res): Promise<void> => {
        if(!req.query.page) req.query.page = '1'

        const validateData: any = {
            page: {
                value: req.query.page,
                rule: {
                    required: true,
                    number: true
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요',
                    number: '파라메터 오류. 관리자에게 문의하세요'
                }
            },
            sport: {
                value: req.query.sport,
                rule: {
                    required: req.query.league,
                    or: ['', 'Football', 'Basketball', 'Baseball', 'Ice Hockey', 'Handball', 'Volleyball', 'Rugby League', 'Rugby Union', 'Boxing', 'MMA', 'Golf', 'Darts', 'LoL', 'CS:GO', 'Dota 2', 'FIFA']
                },
                message: {
                    required: '파라메터 오류. 관리자에게 문의하세요.',
                    or: '파라메터 오류. 관리자에게 문의하세요.'
                }
            }
        }

        // validate start
        let v: any = {}
        let data: any = {}

        try {
            v = validate.validate(validateData)
            if(v.error) {
                v.errorTitle = '경기결과 실패 - 500'
                res.status(500).json(v)
                return
            }
            data = v
            if(v.firstError) {
                data.errorTitle = '경기결과 실패 - 400'
                res.status(400).json(data)
                return
            }
            v = tools.generateReqValue(data.validates, req)
        } catch (error) {
            v.errorTitle = '경기결과 validate 실패 - 500'
            res.status(500).json(v)
            return
        }
        // validate end

        v.page = parseInt(v.page)

        try {
            // ■■■■■■■■■■ DB-경기결과 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getGameResults(v.page, v.sport)
            if(r.error) {
                data.errorTitle = '경기결과 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-경기결과 가져오기 ■■■■■■■■■■

            res.json({
                recordSet: r.data,
                recordCount: r.count
            })
        } catch (e) {
            logger.error(e)
            data.errorTitle = '경기결과 실패 - 500'
            res.status(500).json(data)
            return
        }
    }


    public getPowerball = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-파워볼 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPowerball()
            if(r.error) {
                data.errorTitle = '파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('powerballBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getPowerladder = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-파워 사다리 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getPowerladder()
            if(r.error) {
                data.errorTitle = '파워 사다리 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-파워 사다리 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워 사다리 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PLDOE', 'PLDLR', 'PLDTF', 'PLDCOMBO']
                const rConfig: TService = await etcService.getConfigInfo('powerladderBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '파워 사다리 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워 사다리 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '파워 사다리 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getKenoladder = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-키노 사다리 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getKenoladder()
            if(r.error) {
                data.errorTitle = '키노 사다리 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-키노 사다리 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-키노 사다리 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['KLDOE', 'KLDLR', 'KLDTF', 'KLDCOMBO']
                const rConfig: TService = await etcService.getConfigInfo('kenoladderBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '키노 사다리 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-키노 사다리 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '키노 사다리 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getBoglePowerball = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-보글 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getBoglePowerball()
            if(r.error) {
                data.errorTitle = '보글 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-보글 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('boglePowerballBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '보글 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '보글 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getBogleladder = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-키노 사다리 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getBogleladder()
            if(r.error) {
                data.errorTitle = '보글 사다리 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-보글 사다리 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-보글 사다리 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['BLDOE', 'BLDLR', 'BLDTF', 'BLDCOMBO']
                const rConfig: TService = await etcService.getConfigInfo('bogleladderBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '보글 사다리 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-보글 사다리 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '보글 사다리 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getGooglePowerball1 = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-구글 1분 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getGooglePowerball1()
            if(r.error) {
                data.errorTitle = '구글 1분 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-구글 1분 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('googlePowerball1Bet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '구글 1분 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '구글 1분 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getGooglePowerball3 = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-구글 3분 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getGooglePowerball3()
            if(r.error) {
                data.errorTitle = '구글 3분 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-구글 3분 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('googlePowerball3Bet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '구글 3분 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '구글 3분 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getEosPowerball1 = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-이오스 1분 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getEosPowerball1()
            if(r.error) {
                data.errorTitle = '이오스 1분 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이오스 1분 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('eosPowerball1Bet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '이오스 1분 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '이오스 1분 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getEosPowerball3 = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-이오스 3분 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getEosPowerball3()
            if(r.error) {
                data.errorTitle = '이오스 3분 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이오스 3분 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('eosPowerball3Bet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '이오스 3분 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '이오스 3분 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getEosPowerball = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-이오스 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getEosPowerball()
            if(r.error) {
                data.errorTitle = '이오스 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-이오스 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('eosPowerballBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '이오스 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '이오스 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getCoinPowerball = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-코인 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getCoinPowerball()
            if(r.error) {
                data.errorTitle = '코인 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-코인 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('coinPowerballBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '코인 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '코인 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getCoinPowerball3 = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-코인 3분 파워볼 가져오기 ■■■■■■■■■■
            let r: TService = await gameService.getCoinPowerball3()
            if(r.error) {
                data.errorTitle = '코인 3분 파워볼 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-코인 3분 파워볼 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['PWBPOE', 'PWBPUO', 'PWBNOE', 'PWBNUO', 'PWBPCOMBO', 'PWBNCOMBO', 'PWBBMS', 'PWBBMSCOMBO', 'PWBRNAPOE']
                const rConfig: TService = await etcService.getConfigInfo('coinPowerball3Bet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '코인 3분 파워볼 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-파워볼 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '코인 3분 파워볼 실패 - 500'
            res.status(500).json(data)
            return
        }
    }

    public getSpeedladder = async (req: req, res: res): Promise<void> => {
        // validate start
        let v: any = tools.generateReqValue({}, req)
        let data: any = v
        // validate end

        try {
            // ■■■■■■■■■■ DB-스피드 사다리 가져오기 ■■■■■■■■■■
            const r: TService = await gameService.getSpeedladder()
            if(r.error) {
                data.errorTitle = '스피드 사다리 실패 - 500'
                res.status(500).json(data)
                return
            }
            // ■■■■■■■■■■ DB-스피드 사다리 가져오기 ■■■■■■■■■■
            let resultGame: any = r.data[0]

            if(resultGame) {
                resultGame.serverTime = Date.now()

                // ■■■■■■■■■■ DB-스피드 사다리 환경 설정 가져오기 ■■■■■■■■■■
                const getKeys: Array<string> = ['SLDOE', 'SLDLR', 'SLDTF', 'SLDCOMBO']
                const rConfig: TService = await etcService.getConfigInfo('speedladderBet', getKeys)
                if(rConfig.error) {
                    data.errorTitle = '스피드 사다리 실패 - 500'
                    res.status(500).json(data)
                    return
                }
                // ■■■■■■■■■■ DB-스피드 사다리 환경 설정 가져오기 ■■■■■■■■■■
                resultGame.betInfo = rConfig.data
            }

            res.json(resultGame)
        } catch (e) {
            logger.error(e)
            data.errorTitle = '스피드 사다리 실패 - 500'
            res.status(500).json(data)
            return
        }
    }


}