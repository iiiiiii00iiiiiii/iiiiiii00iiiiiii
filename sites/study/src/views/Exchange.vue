<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col-12">
                                <div class="title">
                                    보유머니 출금 <span>MONEY EXCHANGE</span>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-xl-5 d-none d-xl-block">
                        <div class="row">
                            <div class="col px-0 px-xl-3">
                                <div class="notice-box mt-4 mt-xl-0">
                                    <div class="notice-box-title">
                                        주의사항
                                    </div>
                                    <div class="notice-box-content">
                                        <ul>
                                            <li><span>최소 10,000원</span> 부터 <span>만원단위</span>로 출금신청이 가능합니다.</li>
                                            <li>출금은 <span class="red">최대 5분~15분정도 소요되며,</span>은행 및 현지 인터넷 사정으로 지연될 수 있습니다.</li>
                                            <li>출금은 가입시 등록 하셨던 <span class="red">본인 출금계좌로만 출금이 가능</span> 하며, 출금계좌 변경시 고객센터로 문의주시기 바랍니다.</li>
                                            <li><span class="red">23:30분~00:30분 까지 은행점검 시간</span>으로 출금이 불가 합니다.</li>
                                            <li>이외 <span class="red">출금규정은 공지사항 참고</span> 부탁 드립니다.</li>
                                            <li>보안상 출금내역은 <span class="red">최근 7일이내 100건 출금내역만 제공됩니다.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col px-0 px-xl-3">
                                <div class="notice-box mt-2 mt-xl-3">
                                    <div class="notice-box-title-second">
                                        출금신청 안내
                                    </div>
                                    <div class="money-p">
                                        <span>
                                            <span class="pl-2 pl-xl-1">1일</span> 최대 출금한도 : <span class="text-imp">무제한</span>
                                        </span>
                                        <span class="ml-4">
                                            <span class="pl-5">1회</span> 최대 출금한도 : <span class="text-imp">1,000만원</span>
                                        </span>
                                    </div>
                                    <div class="horizon-line"></div>
                                    <div class="money-p pl-3">
                                        <div class="mt-xl-3">
                                            <span class="fs-0875rem">현재 보유머니</span>
                                            <input
                                                type="text"
                                                class="money-input ml-3 ml-xl-2"
                                                :value="$numeral(user.money).format('0,0')"
                                                maxlength="11"
                                                readonly
                                            >
                                        </div>
                                        <div class="mt-2">
                                            <span class="fs-0875rem">출금 신청금액</span>
                                            <input
                                                type="text"
                                                class="money-input ml-3 ml-xl-2"
                                                id="exchangeAmount"
                                                v-model.lazy="exchangeAmount"
                                                maxlength="11"
                                                @click="initExchangeAmount($event)"
                                                @blur="checkExchangeAmount($event)"
                                                @input="setExchangeAmount($event)"
                                            >
                                            <button type="button" class="btn-normal ml-2 px-3" @click="initExchange()">정정</button>
                                        </div>
                                        <div class="mt-2">
                                            <span class="fs-0875rem">출금 비밀번호</span>
                                            <input
                                                type="password"
                                                class="money-input ml-3 ml-xl-2"
                                                v-model="passwordExchange"
                                                maxlength="50"
                                                placeholder="출금 비밀번호"
                                                autocomplete="new new-password"
                                            >
                                        </div>
                                    </div>
                                    <div class="horizon-line d-xl-none"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3 mb-xl-3 px-2 px-xl-4">
                            <div class="col-4 col-xl-1 px-2">
                                <button type="button" class="btn-add-money" @click="addMoney(10000)">1만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2">
                                <button type="button" class="btn-add-money" @click="addMoney(30000)">3만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2">
                                <button type="button" class="btn-add-money" @click="addMoney(50000)">5만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money middle" @click="addMoney(100000)">10만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money middle" @click="addMoney(300000)">30만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money middle" @click="addMoney(500000)">50만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money high" @click="addMoney(1000000)">100만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money high" @click="addMoney(3000000)">300만원</button>
                            </div>
                            <div class="col-4 col-xl-1 px-2 mt-2 mt-xl-0">
                                <button type="button" class="btn-add-money high" @click="addMoney(5000000)">500만원</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col px-0 px-xl-3">
                        <div class="horizon-line mt-3"></div>
                        <div class="money-p">
                            <div class="py-xl-4 text-center d-none d-xl-block">
                                <button type="button" class="btn-function" :disabled="loading" @click="exchange()">출금 신청</button>
                            </div>
                            <div class="text-center d-xl-none px-2 mr-2">
                                <button type="button" class="btn-function btn-block" :disabled="loading" @click="exchange()">출금 신청</button>
                            </div>
                        </div>
                        <div class="horizon-line"></div>
                    </div>
                </div>
                <div class="row mt-xl-2">
                    <div class="col">
                        <div class="money-list">
                            <div class="row px-xl-3 mb-2 mb-xl-2">
                                <div class="col title">
                                    최근 출금내역 ( <span>최근 7일이내 / 최대50개</span> )
                                </div>
                                <div class="col text-right px-xl-0 d-none d-xl-block pt-xl-2">
                                    <button type="button" class="btn-board red" :disabled="loading" @click="deleteExchangeAll()">
                                        전체삭제
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col px-0 px-xl-3">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-money text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th class="w-20 text-center">일시</th>
                                                    <th class="w-25 text-center">종류</th>
                                                    <th class="w-25 text-center">금액</th>
                                                    <th class="w-20 text-center">결과</th>
                                                    <th class="text-center">삭제</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in data" :key="index">
                                                    <td class="text-center">
                                                        {{ $moment(item.regDateTime).format('YYYY-MM-DD HH:mm') }}
                                                    </td>
                                                    <td class="text-red text-center">
                                                        출금
                                                    </td>
                                                    <td class="text-center">
                                                        {{ $numeral(item.money).format('0,0') }}
                                                    </td>
                                                    <td class="text-center" :class="$config.statusExchangeClass[item.status]">
                                                        {{ $config.statusExchange[item.status] }}
                                                    </td>
                                                    <td class="text-center">
                                                        <button type="button" class="btn-board red" v-if="item.status !== 0" :disabled="loading" @click="deleteExchange(item._id)">삭제</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-12 mb-3">
                                    <div class="card bg-pagination">
                                        <div class="card-body pagination-body">
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
                                            ></b-pagination-nav>
                                        </div>
                                    </div>
                                </div>
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

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Exchange',
        components: {
            UrgentNotice
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

<style lang="scss" scoped>
    .money-list {
        .title {
            color: #333;
            font-size: 0.9375rem;

            span{
                color: #3B7CCC;
            }
        }
    }
</style>