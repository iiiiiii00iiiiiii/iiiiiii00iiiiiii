<template>
    <div>
        <div class="row px-xl-3">
            <div class="col-12 exchangecasino-bg">
                <div class="row p-xl-3">
                    <div class="col-12 mt-4 exchangecasino-title">
                        카지노 머니이동 <span>EXCHANGE CASINO</span>
                    </div>
                </div>
                <hr>
                <div class="row mt-3 mt-xl-0 px-xl-3">
                    <div class="col-12 money-info-box">
                        <div class="money-info-title">
                            <span>주의사항</span>
                        </div>
                        <ul class="money-info-content mt-2">
                            <li>※ <span>보유머니 > 카지노머니 선택 후 전환신청</span>시 보유머니가 카지노머니로 이동됩니다.</li>
                            <li>※ 카지노머니 전환신청 후 <span>카지노머니 갱신버튼을 눌러주세요.</span></li>
                            <li>※ <span>카지노게임 이용 후 보유머니 전환</span>을 하신다음 출금신청 해주시기 바랍니다.</li>
                        </ul>
                        <div class="pl-xl-1 mt-2">
                            <button
                                type="button"
                                class="btn btn-sm btn-renewal"
                                :disabled="disabledButton"
                                @click="loadCasinoMoney()"
                            >
                                카지노머니 갱신
                            </button>
                            <span class="renewal-text">카지노 머니전환 후 필히 카지노머니 갱신 눌러주시기 바랍니다.</span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row px-xl-3">
                    <div class="col-12 money-info-bank">
                        <div class="row">
                            <div class="col-12">
                                <div class="rounded">
                                    <div class="money-info-bank-title">
                                        <span>출금신청 안내</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row px-xl-3 money-apply">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-4 col-xl-1">현재 보유머니</div>
                                    <div class="col-8 col-xl-2 text-light-purple">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm money-input-second"
                                            :value="money"
                                            readonly
                                        >
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 col-xl-1">카지노머니</div>
                                    <div class="col-8 col-xl-2 text-light-purple">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm money-input-second"
                                            :value="casinoMoney"
                                            readonly
                                        >
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 col-xl-1">전환 항목선택</div>
                                    <div class="col-8 col-xl-2 text-light-purple">
                                        <select class="form-control form-control-sm money-input-second" v-model="exchangeMethod">
                                            <option value="">전환선택</option>
                                            <option value="casino">머니 > 카지노</option>
                                            <option value="money">카지노 > 머니</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-4 col-xl-1">전환금액 입력</div>
                                    <div class="col-8 col-xl-2">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm money-input"
                                            id="exchangeAmount"
                                            v-model.lazy="exchangeAmount"
                                            maxlength="11"
                                            @click="initExchangeAmount($event)"
                                            @blur="checkExchangeAmount($event)"
                                            @input="setExchangeAmount($event)"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row px-xl-3">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-3 col-xl-1">
                                        <button class="btn btn-amount btn-sm btn-block" :disabled="disabledButton" @click="addMoney(10000)">1만</button>
                                    </div>
                                    <div class="col-3 col-xl-1">
                                        <button class="btn btn-amount btn-sm btn-block" :disabled="disabledButton" @click="addMoney(50000)">5만</button>
                                    </div>
                                    <div class="col-3 col-xl-1">
                                        <button class="btn btn-amount btn-sm btn-block" :disabled="disabledButton" @click="addMoney(100000)">10만</button>
                                    </div>
                                    <div class="col-3 col-xl-1">
                                        <button class="btn btn-amount-second btn-sm btn-block" :disabled="disabledButton" @click="addMoney(300000)">30만</button>
                                    </div>
                                    <div class="col-3 col-xl-1">
                                        <button class="btn btn-amount-second btn-sm btn-block mt-2 mt-xl-0" :disabled="disabledButton" @click="addMoney(500000)">50만</button>
                                    </div>
                                    <div class="col-3 col-xl-1 mt-2 mt-xl-0">
                                        <button class="btn btn-amount-second btn-sm btn-block" :disabled="disabledButton" @click="addMoney(1000000)">100만</button>
                                    </div>
                                    <div class="col-3 col-xl-1 mt-2 mt-xl-0">
                                        <button class="btn btn-sm btn-block btn-correction" :disabled="disabledButton" @click="initExchange()">정정</button>
                                    </div>
                                    <div class="col-2 d-none d-xl-block"></div>
                                </div>
                                <div class="row mt-3 my-xl-5">
                                    <div class="col-12 text-center">
                                        <button class="btn btn-lg btn-purple" :disabled="disabledButton" @click="submit()">머니이동</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-xl-3 px-xl-3">
                    <div class="col-12">
                        <div class="modal-title">
                            <div class="row">
                                <div class="col">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple px-xl-3 py-xl-2">
                                        최근 전환내역
                                    </button>
                                </div>
                                <div class="col text-right">
                                    <!-- <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple mr-2 px-3"
                                        :disabled="disabledButton"
                                        @click="initList()"
                                    >
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'sync-alt']"/> <span class="d-none d-xl-inline">새로고침</span>
                                    </button> -->
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-danger px-3"
                                        :disabled="disabledButton"
                                        @click="deleteExchangeCasinoAll()"
                                    >
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'trash-alt']"/> <span class="d-none d-xl-inline">전체삭제</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row px-xl-3">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table text-center">
                                <thead class="thead-violet-casino">
                                    <tr>
                                        <th scope="col">일시</th>
                                        <th scope="col">종류</th>
                                        <th scope="col">이전머니</th>
                                        <th scope="col">처리머니</th>
                                        <th scope="col">이후머니</th>
                                        <th scope="col">삭제</th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-violet-casino">
                                    <tr v-for="(v, index) in data" :key="index">
                                        <td>
                                            {{ $moment(v.regDateTime).format('YYYY-MM-DD HH:mm') }}
                                        </td>
                                        <td>
                                            {{ v.reason }}
                                        </td>
                                        <td>
                                            {{ $numeral(v.before).format('0,0') }}
                                        </td>
                                        <td>
                                            {{ $numeral(v.process).format('0,0') }}
                                        </td>
                                        <td>
                                            {{ $numeral(v.after).format('0,0') }}
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-danger btn-xs"
                                                @click="deleteExchangeCasino(v._id)"
                                            >
                                                <font-awesome-icon class="cursor-pointer" :icon="['fa', 'trash-alt']"/> 삭제
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body bg-pagination">
                                <b-pagination
                                    first-class="first-class"
                                    last-class="last-class"
                                    prev-class="prev-class"
                                    next-class="next-class"
                                    ellipsis-class="ellipsis-class"
                                    page-class="page-class"
                                    :total-rows="totalCount"
                                    :per-page="$config.pageSize"
                                    :limit="$config.pageLimit"
                                    align="center"
                                    v-model="search.page"
                                    @change="linkGen"
                                ></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExchangeCasino',
    data() {
        return {
            search: {
                page: 1
            },
            data: [],
            totalCount: 0,
            exchangeMethod: '',
            exchangeAmount: 0,
            beforeAmount: 0
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            let rExchangeCasino = await this.$http.get('/api/exchange-casino-list', this.search)
            if(rExchangeCasino.error) return

            // 구현부분
            this.data = rExchangeCasino.data.recordSet
            this.totalCount = rExchangeCasino.data.recordCount
        },
        initList() {
            this.page = 1
            this.getList()
        },
        linkGen(pageNum) {
            this.search.page = pageNum
            this.getList()
        },
        initCleave() {
            new this.$cleave('#exchangeAmount', {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalScale: 0
            })

            document.querySelector('#exchangeAmount').value = 0

            this.exchangeMethod = ''
        },
        hideModal() {
            this.showModalExchangeCasino = false
            this.page = 1
            this.initExchange()
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
        addMoney(amount) {
            let currentAmount = this.exchangeAmount.toString().replace(/,/gi, '')
            let sumAmount = parseInt(currentAmount) + amount
            if(sumAmount <= 999999999) {
                this.exchangeAmount = this.$numeral(sumAmount).format('0,0')
            }

            document.querySelector('#exchangeAmount').value = this.$numeral(sumAmount).format('0,0')
        },
        initExchange() {
            this.exchangeAmount = 0
            document.querySelector('#exchangeAmount').value = 0
        },
        setExchangeAmount(e) {
            if(!isNaN(e.data)) {
                this.exchangeAmount = e.target.value.toString().replace(/,/gi, '')
            }
        },
        //전환요청
        async submit() {
            if(this.exchangeMethod === '') {
                this.$tools.sw('warning', '전환선택', '전환하실 방법을 선택하세요.')
                return
            }
            let resultExchange = await this.$http.post('/api/exchange-casino', {
                exchangeMethod: this.exchangeMethod,
                exchangeAmount: this.exchangeAmount.toString().replace(/,/gi, '')
            })

            if(resultExchange.error) {
                this.$store.dispatch('getInformation')
                return
            }

            this.$tools.sw('success', '전환성공', '전환이 완료 되었습니다.')
            this.exchangeAmount = 0
            document.querySelector('#exchangeAmount').value = 0

            this.$store.dispatch('getInformation')

            this.getList()
        },
        // 출금내역 삭제
        async deleteExchangeCasino(_id) {
            let rDelete = await this.$http.delete('/api/exchange-casino-delete', {
                _id
            })
            if(rDelete.error) return

            this.$tools.sw('success', '전환내역 삭제 성공', '전환내역이 삭제 되었습니다.')
            this.getList()
        },
        // 출금내역 전체삭제
        async deleteExchangeCasinoAll() {
            let rDelete = await this.$http.delete('/api/exchange-casino-delete-all')
            if(rDelete.error) return

            this.$tools.sw('success', '전환내역 삭제 성공', '전환내역이 삭제 되었습니다.')
            this.getList()
        },
        async loadCasinoMoney() {
            let resultLoad = await this.$http.get('/api/load-casino-money')
            if(resultLoad.error) return
            this.$store.dispatch('getInformation')
        }
    },
    computed: {
        disabledButton: {
            get() {
                return this.$store.state.disabledButton
            },
            set(status) {
                this.$store.commit('setDisabledButton', status)
            }
        },
        showModalExchangeCasino: {
            get() {
                return this.$store.state.showModalExchangeCasino
            },
            set(isShow) {
                if(this.showModalExchangeCasino) {
                    this.$store.commit('setShowModalExchangeCasino', isShow)
                }
            }
        },
        money() {
            return this.$numeral(this.$store.state.user.money).format('0,0')
        },
        casinoMoney() {
            return this.$numeral(this.$store.state.user.casinoMoney).format('0,0')
        }
    }
}
</script>
<style lang="scss" scoped>
.exchangecasino-bg {
    background-color: #fafbfc;
    border: 1px solid #e1e4e8;
    border-radius: 5px 5px 0px 0px;

    @media (min-width: 1200px) {
        margin-top: 30px;
    }
}
.exchangecasino-title {
    color: #27384D;
    font-size: 1.375rem;
    font-weight: 600;

    @media (min-width: 1200px) {
        font-size: 1.875rem;
    }

    span {
        color: #909090;
        font-size: 0.75rem;

        @media (min-width: 1200px) {
            font-size: 0.9375rem;
        }
    }
}
.money-info-box {

    .money-info-title {
        background-color: #163588;
        border-radius: 5px;
        padding: 5px 0;
        span {
            color: #fff;
            margin-left: 10px;
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin-left: 5px;
            font-weight: 500;
            span {
                color: #d32f2f;
            }
        }
    }
}
.btn-renewal {
    background: linear-gradient(180deg, #0149A1 0%, #4A1393 100%);
    box-shadow: inset 0px 0px 2px 1px rgba(144, 144, 144, 0.25);
    border-radius: 5px;
    color: #fff;
    
}
.renewal-text {
    color: #27384D;
    font-size: 0.75rem;
    font-weight: 700;
    margin-left: 5px;

    @media (min-width: 1200px) {
        font-size: 1rem;
        margin-left: 10px;
    }
}
.btn-amount {
    background-color: #27384D;
    border-radius: 5px;
    color: #fff;
}
.btn-amount-second {
    background: #097BFF;
    box-shadow: inset 0px 0px 2px 1px rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    color: #fff;
}
.btn-correction {
    background: linear-gradient(0deg, #3A3A3A, #3A3A3A);
    box-shadow: inset 0px 0px 2px 1px rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    color: #fff;
}
.btn-lg {
    padding: 8px 70px;
    font-size: 1.625rem;
    font-weight: 600;
}
hr {
    background-color: #27384D;
    width: 98%;
}
</style>