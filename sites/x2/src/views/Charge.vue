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
                                보유머니 입금 <span>MONEY CHARGE</span>
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
                                            <li><span>최소 10,000원</span> 부터 입금신청이 가능합니다.</li>
                                            <li>본인명의 이외에 입금은 <span class="red">입금처리 </span>불가합니다.</li>
                                            <li>상습적 및 악의적으로 허위충전시 <span class="red">정지 또는 탈퇴처리</span> 될 수 있습니다.</li>
                                            <li>수표 입금시 충전처리 절대 불가하며,<span class="red">정지 또는 탈퇴처리</span> 될 수 있습니다.</li>
                                            <li>23시 55분 ~ 00시 05분 사이에는<span class="red">입금신청이</span> 불가합니다.</li>
                                            <li>입금신청전 <span class="red">선입금 후 입금신청</span> 해주시기 바랍니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col px-0 px-xl-3">
                                <div class="notice-box mt-2 mt-xl-3">
                                    <div class="notice-box-title-second">
                                        입금신청 안내
                                    </div>
                                    <div class="money-p">
                                        <div class="pl-2">입금 계좌는 보안상 수시로 변경됩니다 <span class="text-imp">(입금 전 입금 계좌문의 부탁드립니다.)</span></div>
                                    </div>
                                    <div class="horizon-line"></div>
                                    <div class="money-p d-none d-xl-block">
                                        <button type="button" class="btn-normal px-xl-4" :disabled="loading" @click="requestChargeInformation()">입금계좌 문의</button>
                                        <span class="ml-3 text-inf">클릭시 고객센터로 계좌문의가 자동 발송됩니다.</span>
                                    </div>
                                    <div class="money-p px-3 d-xl-none">
                                        <button type="button" class="btn-normal btn-block py-2" :disabled="loading" @click="requestChargeInformation()">입금계좌 문의</button>
                                    </div>
                                    <div class="horizon-line"></div>
                                    <div class="money-p">
                                        <div class="mt-xl-3">
                                            <span class="fs-0875rem px-2">입금 신청금액</span>
                                            <input
                                                type="text"
                                                class="money-input ml-2"
                                                id="chargeAmount"
                                                v-model.lazy="chargeAmount"
                                                maxlength="11"
                                                @click="initChargeAmount($event)"
                                                @blur="checkChargeAmount($event)"
                                                @input="setChargeAmount($event)"
                                            >
                                            <button type="button" class="btn-normal ml-2 px-3" @click="initCharge()">정정</button>
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
                                <button type="button" class="btn-function" :disabled="loading" @click="charge()">입금 신청</button>
                            </div>
                            <div class="text-center d-xl-none px-2 mr-2">
                                <button type="button" class="btn-function btn-block" :disabled="loading" @click="charge()">입금 신청</button>
                            </div>
                        </div>
                        <div class="horizon-line"></div>
                    </div>
                </div>
                <div class="row mt-xl-2">
                    <div class="col">
                        <div class="money-list">
                            <div class="row px-xl-3 mb-2 mb-xl-1">
                                <div class="col title">
                                    최근 입금내역 ( <span>최근 7일이내 / 최대50개</span> )
                                </div>
                                <div class="col text-right px-xl-0 d-none d-xl-block pt-xl-3">
                                    <button type="button" class="btn-board red" :disabled="loading" @click="deleteChargeAll()">
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
                                                    <td class="text-center text-skyblue">입금</td>
                                                    <td class="text-center">
                                                        {{ $numeral(item.money).format('0,0') }}
                                                    </td>
                                                    <td class="text-center" :class="$config.statusChargeClass[item.status]">
                                                        {{ $config.statusCharge[item.status] }}
                                                    </td>
                                                    <td class="text-center">
                                                        <button type="button" class="btn-board red" v-if="item.status !== 0" :disabled="loading" @click="deleteCharge(item._id)">삭제</button>
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
import { mapGetters } from 'vuex'

import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Charge',
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
                chargeAmount: 0,
                beforeAmount: 0
            }
        },
        created() {
            this.setFromRouter()
        },
        mounted() {
            this.initCleave()
        },
        methods: {
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                // this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-charge-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            async requestChargeInformation() {
                const rRequestChargeInformation = await this.$tools.requestChargeInformation()
                if(rRequestChargeInformation) {
                    this.$tools.pushRouter('/help')
                }
            },
            // [입금 신청]
            async charge() {
                const r = await this.$http.post('/api/set-charge', {
                    chargeAmount: this.chargeAmount.toString().replace(/,/gi, '')
                })
                if(r.error) return

                this.chargeAmount = 0
                this.$tools.sw('success', '입금 신청 성공', '입금 신청이 완료되었습니다.', null, this.getList)
            },
            // [입금 내역 삭제]
            async deleteCharge(_id) {
                this.$sw.fire({
                    title: '입금 내역 삭제',
                    text: '입금 내역을 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-charge', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '입금 내역 삭제 성공', '입금 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteChargeAll(_id) {
                this.$sw.fire({
                    title: '입금 내역 전체 삭제',
                    text: '입금 내역을 전체 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-charge-all', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '입금 내역 전체 삭제 성공', '입금 내역이 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            addMoney(amount) {
                const sumAmount = parseInt(this.chargeAmount.toString().replace(/,/gi, '')) + amount
                if(sumAmount <= 999999999) {
                    this.chargeAmount = this.$numeral(sumAmount).format('0,0')
                }

                document.querySelector('#chargeAmount').value = this.$numeral(sumAmount).format('0,0')
            },
            initCharge() {
                this.chargeAmount = 0
                document.querySelector('#chargeAmount').value = 0
            },
            initCleave() {
                new this.$cleave('#chargeAmount', {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralDecimalScale: 0
                })

                document.querySelector('#chargeAmount').value = 0
            },
            initChargeAmount(e) {
                this.beforeAmount = e.target.value
                e.target.value = ''
            },
            checkChargeAmount(e) {
                if(e.target.value === '') {
                    e.target.value = this.beforeAmount
                }
            },
            setChargeAmount(e) {
                if(!isNaN(e.data)) {
                    this.chargeAmount = e.target.value.toString().replace(/,/gi, '')
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
            line-height: 35px;

            span{
                color: #3B7CCC;
            }
        }
    }
</style>