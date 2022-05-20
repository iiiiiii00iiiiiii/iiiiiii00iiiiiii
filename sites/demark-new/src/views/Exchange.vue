<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col-12 page-content">
            <div class="row">
                <div class="col-12">
                    <NavUserMenu/>
                </div>
            </div>
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'minus-square']"/>
                출금 <span>EXCHANGE</span>
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
                        <div class="title">환전계좌번호</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.bankOwner }} / {{ user.bank }} / {{ user.bankAccount }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">환전비밀번호</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>
                                <input
                                    type="password"
                                    v-model="passwordExchange"
                                    maxlength="50"
                                    placeholder="환전비밀번호를 입력해주세요."
                                    autocomplete="new new-password"
                                >
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">환전금액</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>
                                <input
                                    type="text"
                                    id="exchangeAmount"
                                    v-model.lazy="exchangeAmount"
                                    maxlength="11"
                                    placeholder="환전비밀번호를 입력해주세요."
                                    @click="initExchangeAmount($event)"
                                    @blur="checkExchangeAmount($event)"
                                    @input="setExchangeAmount($event)"
                                >
                            </span>
                            <button
                                type="button"
                                class="btn-init-money ml-2"
                                :disabled="loading"
                                @click="initExchange()"
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
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(10000)">+10,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(30000)">+30,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(50000)">+50,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(100000)">+100,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(300000)">+300,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(500000)">+500,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(1000000)">+1,000,000</button>
                                        </div>
                                        <div class="col col-xl-1">
                                            <button type="button" class="btn-money" @click="addMoney(3000000)">+3,000,000</button>
                                        </div>
                                        <div class="col col-xl-1">
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
                                <div class="content-second ">
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
                <div class="set-money">
                    <button
                        type="submit"
                        class="btn-set-money"
                        :disabled="loading"
                        @click="exchange()"
                    >
                        <font-awesome-icon :icon="['fa', 'minus-square']"/> 환전신청
                    </button>
                </div>
            </div>
            <div class="list-content">
                <div class="row mt-2">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-money text-nowrap">
                                <thead>
                                    <tr>
                                        <th>일시</th>
                                        <th>예금주</th>
                                        <th>환전금액</th>
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
                    <div class="col text-right pr-2">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deleteExchangeAll()">
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
    import { mapGetters, mapActions } from 'vuex'
    import NavUserMenu from '../components/NavUserMenu'

    export default {
        name: 'Exchange',
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