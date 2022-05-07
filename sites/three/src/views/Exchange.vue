<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'minus-square']"/>
                            <span class="ml-2">출금 EXCHANGE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="money-notice-wrap">
                        <div class="money-notice-title">
                            출금시 유의사항
                        </div>
                        <ul class="money-notice-content">
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                24시간 출금이 가능하며 5~15분 소요됩니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                15분이상 출금 지연시 고객센터로 문의 바랍니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                10,000원 이상 환전 가능합니다.
                            </li>
                            <li class="imp">
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                23:30~00:30 은행 점검시간에는 출금 불가능합니다.
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
                            <div class="col-12 col-xl-3">
                                <input type="text" readonly="readonly" class="form-control money-input" :value="`보유머니 : ${$numeral(user.money).format('0,0')}`">
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <input
                                    type="text"
                                    class="form-control money-input"
                                    id="exchangeAmount"
                                    v-model.lazy="exchangeAmount"
                                    maxlength="11"
                                    @click="initExchangeAmount($event)"
                                    @blur="checkExchangeAmount($event)"
                                    @input="setExchangeAmount($event)"
                                >
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <input
                                    type="password"
                                    class="form-control money-input"
                                    v-model="passwordExchange"
                                    maxlength="50"
                                    placeholder="출금 비밀번호"
                                    autocomplete="new new-password"
                                >
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <button
                                    type="submit"
                                    class="btn-set-money"
                                    :disabled="loading"
                                    @click="exchange()"
                                >
                                    <font-awesome-icon :icon="['fa', 'minus-square']"/> 출금신청
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
            <div class="row mt-1">
                <div class="col">
                    <div class="money-list">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="deleteExchangeAll()">
                                    <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체삭제
                                </button>
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="getList()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-money text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>일시</th>
                                                <th>금액</th>
                                                <th>상태</th>
                                                <th>삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td>
                                                    {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
                                                </td>
                                                <td>
                                                    {{ $numeral(item.money).format('0,0') }}
                                                </td>
                                                <td :class="$config.statusExchangeClass[item.status]">
                                                    {{ $config.statusExchange[item.status] }}
                                                </td>
                                                <td>
                                                    <button type="button" class="btn-delete" v-if="item.status !== 0" :disabled="loading" @click="deleteExchange(item._id)">삭제</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <b-pagination-nav
                                    first-class="first-class"
                                    last-class="last-class"
                                    prev-class="prev-class"
                                    next-class="next-class"
                                    ellipsis-class="ellipsis-class"
                                    page-class="page-class"
                                    :link-gen="linkGen"
                                    :number-of-pages="numberOfPages"
                                    align="center"
                                    :limit="$config.pageLimit"
                                    use-router
                                    v-model="search.page"
                                    pills
                                    size="sm"
                                ></b-pagination-nav>
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
        name: 'Exchange',
        components: {
        },
        computed: {
            ...mapGetters(['loading', 'user']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
            }
        },
        data() {
            return {
                search: {
                    page: 1
                },
                data: [],
                totalCount: 0,
                exchangeAmount: 0,
                beforeAmount: 0,
                passwordExchange: ''
            }
        },
        created() {
            this.setFromRouter()
        },
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
            // [출금 신청]
            async exchange() {
                const r = await this.$http.post('/api/set-exchange', {
                    exchangeAmount: this.exchangeAmount.toString().replace(/,/gi, ''),
                    passwordExchange: this.passwordExchange
                })
                if(r.error) return

                this.exchangeAmount = 0
                this.passwordExchange = ''
                this.$tools.sw('success', '출금 신청 성공', '출금 신청이 완료되었습니다.', null, this.getList)
                this.getInformation()
            },
            // [출금 내역 삭제]
            async deleteExchange(_id) {
                this.$sw.fire({
                    title: '출금 내역 삭제',
                    text: '출금 내역을 삭제 하시겠습니까?',
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

                        this.$tools.sw('success', '출금 내역 삭제 성공', '출금 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteExchangeAll(_id) {
                this.$sw.fire({
                    title: '출금 내역 전체 삭제',
                    text: '출금 내역을 전체 삭제 하시겠습니까?',
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

                        this.$tools.sw('success', '출금 내역 전체 삭제 성공', '출금 내역이 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            addMoney(amount) {
                const sumAmount = parseInt(this.exchangeAmount.toString().replace(/,/gi, '')) + amount
                if(sumAmount <= 999999999) {
                    this.exchangeAmount = this.$numeral(sumAmount).format('0,0')
                }

                document.querySelector('#exchangeAmount').value = this.$numeral(sumAmount).format('0,0')
            },
            initExchange() {
                this.exchangeAmount = 0
                document.querySelector('#exchangeAmount').value = 0
            },
            initCleave() {
                new this.$cleave('#exchangeAmount', {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralDecimalScale: 0
                })

                document.querySelector('#exchangeAmount').value = 0
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
                    this.exchangeAmount = e.target.value.toString().replace(/,/gi, '')
                }
            }
        }
    }
</script>