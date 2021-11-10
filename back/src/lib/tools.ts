import rfdc from 'rfdc'
import type { TReq } from '../models'

const tools: any = {
    deepClone: (v: any): any => {
        return rfdc()(v)
    },
    ipaddress: (req: TReq): string => {
        let ip = req.ip
        if(ip.substr(0, 7) === '::ffff:') {
            ip = ip.substr(7)
        }

        return ip
    },
    left: (v: string, length: number): string => {
        if(!v || !length) return ''

        if(v.length <= length) {
            return v
        }
        else {
            return v.substring(0, length)
        }
    },
    right: (v: string, length: number): string => {
        if(!v || !length) return ''

        if(v.length <= length) {
            return v
        }
        else {
            return v.substring(v.length - length, v.length)
        }
    },
    generateReqValue: (v: any, req: TReq): any => {
        const arrayNeedNumber = ['number', 'gte', 'lte', 'gt', 'lt']
        const arrayNeedBoolean = ['boolean']
        const arrayOutputString = ['outputString']

        let vv: any
        for(vv in v) {
            const rules = Object.keys(v[vv].rule)

            let needNumber: boolean = false
            for(let i: number = 0; i < arrayNeedNumber.length; i++) {
                if(rules.indexOf(arrayNeedNumber[i]) > -1) {
                    needNumber = true
                    break
                }
            }

            let needBoolean: boolean = false
            for(let i: number = 0; i < arrayNeedBoolean.length; i++) {
                if(rules.indexOf(arrayNeedBoolean[i]) > -1) {
                    needBoolean = true
                    break
                }
            }

            let outputString: boolean = false
            for(let i: number = 0; i < arrayOutputString.length; i++) {
                if(rules.indexOf(arrayOutputString[i]) > -1) {
                    outputString = true
                    break
                }
            }

            if(outputString) {
                v[vv] = v[vv].value
            }
            else {
                v[vv] = needNumber ? Number(v[vv].value) : needBoolean ? JSON.parse(v[vv].value) : v[vv].value
            }
        }

        v.reqIpaddress = tools.ipaddress(req)
        v.decoded = req.decoded || null
        v.token = req.token || null

        return v
    },
    denyValidate: (data: any, rule: string, message: string): any => {
        data.firstError = {
            field: 'custom',
            rule: rule
        }

        data.validates.custom = {
            value: '',
            rule: {
                [rule]: true
            },
            message: {
                [rule]: message
            },
            validate: {
                passValidates: {
                    [rule]: false
                },
                validateAllPass: false
            }
        }
        data.allPass = false

        return data
    }
}

export default tools