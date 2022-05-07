<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'plus-square']"/>
                            <span class="ml-2">충전 CHARGE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="money-notice-wrap">
                        <div class="money-notice-title">
                            충전시 유의사항
                        </div>
                        <ul class="money-notice-content">
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                최소 10,000원 부터 충전 가능하며 충전금액과 충전신청 금액이 동일해야 합니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                입금자와 신청자의 이름이 동일해야 하며, 충전하신 금액이 다르면 고객센터에 문의 해주시기 바랍니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                상습적인 허위충전시 차단 되실 수 있습니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                수표로 충전시에는 충전처리가 불가능합니다.
                            </li>
                            <li>
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                빠른충전 처리를 위하여 반드시 선충전 후 충전신청을 해주십시오.
                            </li>
                            <li class="imp">
                                <font-awesome-icon class="icon-caret" :icon="['fa', 'caret-right']"/>
                                23시 55분 ~ 00시 05분 사이에는 충전신청이 불가능 합니다.
                            </li>
                            <li class="pt-2">
                                <button type="button" class="btn-request-charge" :disabled="loading" @click="requestChargeInformation()">충전계좌 문의</button>
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
                                <input type="text" readonly="readonly" class="form-control money-input" :value="`입금자명 : ${user.bankOwner}`">
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <select
                                    class="form-control money-input text-left"
                                    v-model="moneyMethod"
                                >
                                    <option value="">충전 머니 선택</option>
                                    <option value="money">스포츠 머니</option>
                                    <option value="minigameMoney">파워볼 머니</option>
                                </select>
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <input
                                    type="text"
                                    class="form-control money-input"
                                    id="chargeAmount"
                                    v-model.lazy="chargeAmount"
                                    maxlength="11"
                                    @click="initChargeAmount($event)"
                                    @blur="checkChargeAmount($event)"
                                    @input="setChargeAmount($event)"
                                >
                            </div>
                            <div class="col-12 col-xl-3 pt-1 pt-xl-0">
                                <button
                                    type="submit"
                                    class="btn-set-money"
                                    :disabled="loading"
                                    @click="charge()"
                                >
                                    <font-awesome-icon :icon="['fa', 'plus-square']"/> 충전신청
                                </button>
                                <button
                                    type="button"
                                    class="btn-init-money ml-1"
                                    :disabled="loading"
                                    @click="initCharge()"
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
                                <button type="button" class="btn-board" :disabled="loading" @click="deleteChargeAll()">
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
                                                <th>구분</th>
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
                                                    {{ item.moneyMethod === 'money' ? '스포츠 머니' : '파워볼 머니' }}
                                                </td>
                                                <td>
                                                    {{ $numeral(item.money).format('0,0') }}
                                                </td>
                                                <td :class="$config.statusChargeClass[item.status]">
                                                    {{ $config.statusCharge[item.status] }}
                                                </td>
                                                <td>
                                                    <button type="button" class="btn-delete" v-if="item.status !== 0" :disabled="loading" @click="deleteCharge(item._id)">삭제</button>
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'Charge',
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
                chargeAmount: 0,
                moneyMethod: '',
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
                this.getList()
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
            // [충전 신청]
            async charge() {
                const r = await this.$http.post('/api/set-charge-pent', {
                    chargeAmount: this.chargeAmount.toString().replace(/,/gi, ''),
                    moneyMethod: this.moneyMethod
                })
                if(r.error) return

                this.chargeAmount = 0
                this.$tools.sw('success', '충전 신청 성공', '충전 신청이 완료되었습니다.', null, this.getList)
            },
            // [충전 내역 삭제]
            async deleteCharge(_id) {
                this.$sw.fire({
                    title: '충전 내역 삭제',
                    text: '충전 내역을 삭제 하시겠습니까?',
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

                        this.$tools.sw('success', '충전 내역 삭제 성공', '충전 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteChargeAll(_id) {
                this.$sw.fire({
                    title: '충전 내역 전체 삭제',
                    text: '충전 내역을 전체 삭제 하시겠습니까?',
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

                        this.$tools.sw('success', '충전 내역 전체 삭제 성공', '충전 내역이 전체 삭제 되었습니다.', null, this.getList)
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