import sanitize from 'sanitize-html'
import tools from './tools'

interface IValidate {
    validate(validateData: any): any
}

export default class Validate implements IValidate {
    private _data: any // 데이터
    private _first: any // 처음  에러 객체

    // props
    get data() { return this._data }
    set data(v) { this._data = v }
    get first() { return this._first }
    set first(v) { this._first = v }


    constructor() {
    }

    public validate(validateData: any): any {
        this.data = {
            firstError: null,
            validates: {}
        }
        this.first = null

        this.data.validates = tools.deepClone(validateData)
        if(typeof validateData !== 'object') {
            return {
                error: 'validate data 는 객체여야 합니다.'
            }
        }

        let error: boolean = false
        let item: any
        for(item in this.data.validates) {
            if(typeof this.data.validates[item] !== 'object') {
                return {
                    error: `validate data > ${item}는 객체여야 합니다.`
                }
            }

            if(typeof this.data.validates[item].rule != 'object') {
                return {
                    error: `validate data > ${item} > rule은 객체여야 합니다.`
                }
            }

            let pass: boolean = true
            this.data.validates[item].validate = {}
            this.data.validates[item].validate.passValidates = {}

            //check undefined
            if(this.data.validates[item].value === undefined) {
                this.data.validates[item].value = ''
            }

            //to string
            if(!Array.isArray(this.data.validates[item].value)) {
                if(this.data.validates[item].trim || this.data.validates[item].trim === undefined) {
                    this.data.validates[item].value = this.data.validates[item].value.toString().trim()
                }
                else {
                    this.data.validates[item].value = this.data.validates[item].value.toString()
                }
            }

            let rule: any
            for(rule in this.data.validates[item].rule) {
                if(rule === 'required') {
                    if(this.data.validates[item].rule.required) {
                        if(!this.required(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.required = false
                            this.first == null ? this.first = { field: item, rule: 'required' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.required = true
                        }
                    }
                }

                if(rule === 'min') {
                    if(this.data.validates[item].rule.min !== false) {
                        this.data.validates[item].rule.min = Number(this.data.validates[item].rule.min)
                        if(!this.number(this.data.validates[item].rule.min)) {
                            return {
                                error: `validate data > ${item} > rule > min Type 오류.`
                            }
                        }
                        else {
                            if(!this.min(this.data.validates[item].value, this.data.validates[item].rule.min)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.min = false
                                this.first === null ? this.first = { field: item, rule: 'min' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.min = true
                            }
                        }
                    }
                }

                if(rule === 'max') {
                    if(this.data.validates[item].rule.max !== false) {
                        this.data.validates[item].rule.max = Number(this.data.validates[item].rule.max)
                        if(!this.number(this.data.validates[item].rule.max)) {
                            return {
                                error: `validate data > ${item} > rule > max Type 오류.`
                            }
                        }
                        else {
                            if(!this.max(this.data.validates[item].value, this.data.validates[item].rule.max)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.max = false
                                this.first === null ? this.first = { field: item, rule: 'max' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.max = true
                            }
                        }
                    }
                }

                if(rule === 'gte') {
                    if(this.data.validates[item].rule.gte !== false) {
                        if(!this.number(this.data.validates[item].rule.gte)) {
                            return {
                                error: `validate data > ${item} > rule > gte Type 오류.`
                            }
                        }
                        else {
                            this.data.validates[item].rule.gte = Number(this.data.validates[item].rule.gte)
                            if(!this.gte(this.data.validates[item].value, this.data.validates[item].rule.gte)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.gte = false
                                this.first == null ? this.first = { field: item, rule: 'gte' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.gte = true
                            }
                        }
                    }
                }

                if(rule === 'lte') {
                    if(this.data.validates[item].rule.lte !== false) {
                        if(!this.number(this.data.validates[item].rule.lte)) {
                            return {
                                error: `validate data > ${item} > rule > lte Type 오류.`
                            }
                        }
                        else {
                            this.data.validates[item].rule.lte = Number(this.data.validates[item].rule.lte)
                            if(!this.lte(this.data.validates[item].value, this.data.validates[item].rule.lte)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.lte = false
                                this.first == null ? this.first = { field: item, rule: 'lte' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.lte = true
                            }
                        }
                    }
                }

                if(rule === 'gt') {
                    if(this.data.validates[item].rule.gt !== false) {
                        if(!this.number(this.data.validates[item].rule.gt)) {
                            return {
                                error: `validate data > ${item} > rule > gt Type 오류.`
                            }
                        }
                        else {
                            this.data.validates[item].rule.gt = Number(this.data.validates[item].rule.gt)
                            if(!this.gt(this.data.validates[item].value, this.data.validates[item].rule.gt)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.gt = false
                                this.first == null ? this.first = { field: item, rule: 'gt' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.gt = true
                            }
                        }
                    }
                }

                if(rule === 'lt') {
                    if(this.data.validates[item].rule.lt !== false) {
                        if(!this.number(this.data.validates[item].rule.lt)) {
                            return {
                                error: `validate data > ${item} > rule > lt Type 오류.`
                            }
                        }
                        else {
                            this.data.validates[item].rule.lt = Number(this.data.validates[item].rule.lt)
                            if(!this.lt(this.data.validates[item].value, this.data.validates[item].rule.lt)) {
                                pass = false
                                this.data.validates[item].validate.passValidates.lt = false
                                this.first == null ? this.first = { field: item, rule: 'lt' } : null
                            }
                            else {
                                this.data.validates[item].validate.passValidates.lt = true
                            }
                        }
                    }
                }

                if(rule === 'email') {
                    if(this.data.validates[item].rule.email) {
                        if(!this.email(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.email = false
                            this.first == null ? this.first = { field: item, rule: 'email' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.email = true
                        }
                    }
                }

                if(rule === 'alphaDash') {
                    if(this.data.validates[item].rule.alphaDash) {
                        if(!this.alphaDash(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.alphaDash = false
                            this.first == null ? this.first = { field: item, rule: 'alphaDash' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.alphaDash = true
                        }
                    }
                }

                if(rule === 'alphaNumber') {
                    if(this.data.validates[item].rule.alphaNumber) {
                        if(!this.alphaNumber(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.alphaNumber = false
                            this.first == null ? this.first = { field: item, rule: 'alphaNumber' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.alphaNumber = true
                        }
                    }
                }

                if(rule === 'confirmed') {
                    if(this.data.validates[item].rule.confirmed) {
                        if(!this.confirmed(this.data.validates[item].value, this.data.validates[item].rule.confirmed)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.confirmed = false
                            this.first == null ? this.first = { field: item, rule: 'confirmed' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.confirmed = true
                        }
                    }
                }

                if(rule === 'number') {
                    if(this.data.validates[item].rule.number) {
                        if(!this.number(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.number = false
                            this.first == null ? this.first = { field: item, rule: 'number' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.number = true
                        }
                    }
                }

                if(rule === 'boolean') {
                    if(this.data.validates[item].rule.boolean) {
                        if(!this.boolean(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.boolean = false
                            this.first == null ? this.first = { field: item, rule: 'boolean' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.boolean = true
                        }
                    }
                }

                if(rule === 'date') {
                    if(this.data.validates[item].rule.date) {
                        if(!this.date(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.date = false
                            this.first == null ? this.first = { field: item, rule: 'date' }: null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.date = true
                        }
                    }
                }

                if(rule === 'or') {
                    if(this.data.validates[item].rule.or) {
                        if(!this.or(this.data.validates[item].value, this.data.validates[item].rule.or)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.or = false
                            this.first == null ? this.first = { field: item, rule: 'or' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.or = true
                        }
                    }
                }

                if(rule === 'array') {
                    if(this.data.validates[item].rule.array) {
                        if(!this.array(this.data.validates[item].value)) {
                            pass = false
                            this.data.validates[item].validate.passValidates.array = false
                            this.first == null ? this.first = { field: item, rule: 'array' } : null
                        }
                        else {
                            this.data.validates[item].validate.passValidates.array = true
                        }
                    }
                }
            }

            if(this.data.validates[item].sanitize !== false) {
                if(!this.data.validates[item].rule.array) {
                    this.data.validates[item].value = this.sanitize(this.data.validates[item].value)
                }
            }

            this.data.validates[item].validate.validateAllPass = pass
        }



        if(!error) {
            this.data.firstError = this.first
            if(!this.data.firstError) {
                this.data.allPass = true
            }
            else {
                this.data.allPass = false
            }

            this.data.error = null

            return this.data
        }
    }

    private required(v: any): boolean {
        if(v === '' || v === undefined || v === null) return false
        return true
    }

    private number(v: any) {
        if(v === '' || v === null || v === undefined) return false
        return !isNaN(v)
    }

    private min(v: any, l: number): boolean {
        if(v.toString().length < l) return false
        return true
    }

    private max(v: any, l: number): boolean {
        if(v.toString().length > l) return false
        return true
    }

    private gte(v: any, l: number): boolean {
        if(v < l) return false
        return true
    }

    private lte(v: any, l: number): boolean {
        if(v > l) return false
        return true
    }

    private gt(v: any, l: number): boolean {
        if(v <= l) return false
        return true
    }

    private lt(v: any, l: number): boolean {
        if(v >= l) return false
        return true
    }

    private email(v: string): any {
        let regExp: RegExp = /[a-zA-Z0-9\-\_][\w\.-]*[a-zA-Z0-9\-\_]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/

        if(v.length == 0) return false
        return v.match(regExp)
    }

    private alphaDash(v: string): any {
        let regExp: RegExp = /^[0-9a-zA-Z_-]*$/

        if(v.length == 0) return false
        return v.match(regExp)
    }

    private alphaNumber(v: string) {
        let regExp: RegExp = /^[0-9a-zA-Z]*$/

        if(v.length == 0) return false
        return v.match(regExp)
    }

    private confirmed(v: string, vv: string) {
        if(v != vv) return false
        return true
    }

    private boolean(v: string) {
        if(v == 'true' || v == 'false') return true
        return false
    }

    private date(v: string): boolean {
        if(new Date(v).toString() === 'Invalid Date') return false
        return true
    }

    private or(v: string, vv: Array<any>): boolean {
        for(let i = 0; i < vv.length; i++) {
            if(v === vv[i]) return true
        }
        return false
    }

    private array(v: Array<any>): boolean {
        return Array.isArray(v)
    }

    private sanitize(v: string): string {
        return sanitize(v, {
            allowedTags: []
        })
    }
}