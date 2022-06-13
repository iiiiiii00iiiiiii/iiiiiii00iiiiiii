<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col-12 page-content">
            <div class="row">
                <div class="col-12">
                    <NavUserMenu/>
                </div>
            </div>
            <div class="page-content-header">
                <div class="row">
                    <div class="col-12">
                        <font-awesome-icon :icon="['fa', 'plus-square']"/>
                        충전신청 <span>Deposit</span>
                    </div>
                </div>
            </div>
            <div class="page-content-middle">
                <div class="row">
                    <div class="col-3">
                        <div class="title">현재보유머니</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>
                                {{ $numeral(user.money).format('0,0') }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">입금자명</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.bankOwner }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">입금금액</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>
                                <input
                                    type="text"
                                    placeholder="입금금액을 입력해주세요."
                                    require
                                    id="chargeAmount"
                                    v-model.lazy="chargeAmount"
                                    maxlength="11"
                                    @click="initChargeAmount($event)"
                                    @blur="checkChargeAmount($event)"
                                    @input="setChargeAmount($event)"
                                >
                            </span>
                            <button
                                type="button"
                                class="btn-init-money ml-2"
                                :disabled="loading"
                                @click="initCharge()"
                            >
                                <font-awesome-icon :icon="['fa', 'trash-alt']"/> 지우기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-none d-xl-block">
                        <div class="row">
                            <div class="col-3">
                                <div class="title">빠른입력</div>
                            </div>
                            <div class="col-9">
                                <div class="content">
                                    <div class="row pl-3">
                                        <div class="col-12">
                                            <button type="button" class="btn-money" @click="addMoney(10000)">+10,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(30000)">+30,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(50000)">+50,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(100000)">+100,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(300000)">+300,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(500000)">+500,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(1000000)">+1,000,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(3000000)">+3,000,000</button>
                                            <button type="button" class="btn-money" @click="addMoney(5000000)">+5,000,000</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-xl-none">
                        <div class="row">
                            <div class="col-3">
                                <div class="title-second">빠른입력</div>
                            </div>
                            <div class="col-9">
                                <div class="content-second">
                                    <div class="row pl-2">
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(10000)">+10,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(30000)">+30,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(50000)">+50,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(100000)">+100,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(300000)">+300,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(500000)">+500,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(1000000)">+1,000,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(3000000)">+3,000,000</button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn-money" @click="addMoney(5000000)">+5,000,000</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">입금계좌번호</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>
                                <button type="button" class="btn-request-charge" :disabled="loading" @click="requestChargeInformation()">
                                    <font-awesome-icon :icon="['fa', 'check-square']"/> 입금계좌확인
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="set-money">
                    <button
                        type="submit"
                        class="btn-set-money"
                        :disabled="loading"
                        @click="charge()"
                    >
                        <font-awesome-icon :icon="['fa', 'plus-square']"/> 충전신청
                    </button>
                </div>
            </div>
            <div class="list-content">
                <div class="row mt-2">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table table-borderless table-money text-nowrap">
                                <thead>
                                    <tr>
                                        <th>일시</th>
                                        <th>입금자명</th>
                                        <th>충전금액</th>
                                        <th>처리현황</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>
                                            {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
                                        </td>
                                        <td>
                                            {{ user.bankOwner }}
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
                    <div class="col text-right pr-2">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deleteChargeAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체삭제
                        </button>
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
                        ></b-pagination-nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import NavUserMenu from '../components/NavUserMenu'


    export default {
        name: 'Charge',
        components: {
            NavUserMenu
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