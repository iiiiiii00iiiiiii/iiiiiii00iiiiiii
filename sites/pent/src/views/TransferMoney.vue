<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'exchange-alt']"/>
                            <span class="ml-2">머니 전환 EXCHANGE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="money-notice-wrap">
                        <div class="money-notice-title">
                            전환시 유의사항
                        </div>
                        <ul class="money-notice-content">
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                최소 10,000원 부터 전환 가능 합니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="money-button-wrap">
                        <div class="row">
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(10000)">1만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(30000)">3만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(50000)">5만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(100000)">10만</button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(500000)">50만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(1000000)">100만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(5000000)">500만</button>
                            </div>
                            <div class="col-3 px-xl-3">
                                <button type="button" class="btn btn-block btn-money" @click="addMoney(10000000)">1,000만</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="money-wrap">
                        <div class="row">
                            <div class="col-12 col-xl">
                                <input type="text" readonly="readonly" class="form-control money-input" :value="`${$numeral(user.money).format('0,0')} / ${$numeral(user.minigameMoney).format('0,0')}`">
                            </div>
                            <div class="col-12 col-xl pt-1 pt-xl-0">
                                <select
                                    class="form-control money-input text-left"
                                    v-model="moneyMethod"
                                >
                                    <option value="">전환 머니 선택</option>
                                    <option value="minigameMoney">스포츠 -> 파워볼</option>
                                    <option value="money">파워볼 -> 스포츠</option>
                                </select>
                            </div>
                            <div class="col-12 col-xl pt-1 pt-xl-0">
                                <input
                                    type="text"
                                    class="form-control money-input"
                                    id="transferAmount"
                                    v-model.lazy="transferAmount"
                                    maxlength="11"
                                    @click="initExchangeAmount($event)"
                                    @blur="checkExchangeAmount($event)"
                                    @input="setExchangeAmount($event)"
                                >
                            </div>
                            <div class="col-12 col-xl pt-1 pt-xl-0">
                                <button
                                    type="submit"
                                    class="btn-set-money"
                                    :disabled="loading"
                                    @click="exchange()"
                                >
                                    <font-awesome-icon :icon="['fa', 'minus-square']"/> 전환신청
                                </button>
                                <button
                                    type="button"
                                    class="btn-init-money ml-1"
                                    :disabled="loading"
                                    @click="initExchange()"
                                >
                                    <font-awesome-icon :icon="['fa', 'undo']"/> 정정
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'TransferMoney',
        components: {
        },
        computed: {
            ...mapGetters(['loading', 'user']),
            // numberOfPages() {
            //     return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            // }
        },
        // watch: {
        //     '$route' () {
        //         this.setFromRouter()
        //     }
        // },
        data() {
            return {
                search: {
                    page: 1
                },
                data: [],
                totalCount: 0,
                moneyMethod: '',
                transferAmount: 0,
                beforeAmount: 0,
                passwordExchange: ''
            }
        },
        // created() {
        //     this.setFromRouter()
        // },
        mounted() {
            this.initCleave()
        },
        methods: {
            ...mapActions(['getInformation']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-exchange-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            // [변환 신청]
            async exchange() {
                const r = await this.$http.post('/api/set-transfer', {
                    transferAmount: this.transferAmount.toString().replace(/,/gi, ''),
                    moneyMethod: this.moneyMethod
                })
                if(r.error) return

                this.transferAmount = 0
                this.passwordExchange = ''
                this.$tools.sw('success', '전환 신청 성공', '전환 신청이 완료되었습니다.', null, this.getList)
                this.getInformation()
            },
            // [전환 내역 삭제]
            async deleteExchange(_id) {
                this.$sw.fire({
                    title: '전환 내역 삭제',
                    text: '전환 내역을 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-exchange', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '전환 내역 삭제 성공', '전환 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteExchangeAll(_id) {
                this.$sw.fire({
                    title: '전환 내역 전체 삭제',
                    text: '전환 내역을 전체 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-exchange-all', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '전환 내역 전체 삭제 성공', '전환 내역이 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            addMoney(amount) {
                const sumAmount = parseInt(this.transferAmount.toString().replace(/,/gi, '')) + amount
                if(sumAmount <= 999999999) {
                    this.transferAmount = this.$numeral(sumAmount).format('0,0')
                }

                document.querySelector('#transferAmount').value = this.$numeral(sumAmount).format('0,0')
            },
            initExchange() {
                this.transferAmount = 0
                document.querySelector('#transferAmount').value = 0
            },
            initCleave() {
                new this.$cleave('#transferAmount', {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralDecimalScale: 0
                })

                document.querySelector('#transferAmount').value = 0
            },
            initExchangeAmount(e) {
                this.beforeAmount = e.target.value
                e.target.value = ''
            },
            checkExchangeAmount(e) {
                if(e.target.value === '') {
                    e.target.value = this.beforeAmount
                }
            },
            setExchangeAmount(e) {
                if(!isNaN(e.data)) {
                    this.transferAmount = e.target.value.toString().replace(/,/gi, '')
                }
            }
        }
    }
</script>