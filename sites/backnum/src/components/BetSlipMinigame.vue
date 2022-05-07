<template>
    <div class="row">
        <div class="col ">
            <div class="betslot-box">
                <div class="row">
                    <div class="col mt-1 betslot-box-title">
                        BET SLIP
                    </div>
                </div>
                <hr class="mt-2 mb-3">
                <div class="row mt-2">
                    <div class="col-12">
                        <div class="input-box">
                            <div class="row">
                                <div class="col-3 pl-2">
                                    베팅금액
                                </div>
                                <div class="col-9">
                                    <input
                                        type="text"
                                        id="betAmountMinigame"
                                        class="input-bet-amount"
                                        maxlength="20"
                                        value="0"
                                        autocomplete="off"
                                        @click="initbetAmount($event)"
                                        @blur="checkbetAmount($event)"
                                        @input="setBetAmount($event)"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="row mt-2">
                    <div class="col-12 input-box">
                        <div class="row">
                            <div class="col-3 pl-2">
                                당첨금액
                            </div>
                            <div class="col-9">
                                <input class="input-bet-amount" type="text" :value="$numeral(benefit).format('0,0')" readonly>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="row mt-3">
                    <div class="col bet-amount-button-box px-2">
                        <div class="row">
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(5000)">5천</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(10000)">1만</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(50000)">5만</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(100000)">10만</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col  bet-amount-button-box px-2">
                        <div class="row">
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(500000)">50만</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(1000000)">100만</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="addMoney(3000000)">300만</div>
                            </div>
                            <div class="col">
                                <div class="btn-addmoney" @click="max()">MAX</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col px-2">
                        <div class="row">
                            <div class="col-6">
                                <button type="button" class="btn-cancel" @click="init()" :disabled="loading">
                                    금액리셋
                                </button>
                            </div>
                            <div class="col-6">
                                <button type="button" class="btn-cancel" @click="deleteBetAll()" :disabled="loading">
                                    취소 & 닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="mt-2 mb-2">
                <div class="row mt-2">
                    <div class="col bet-info-box">
                        <table class="w-100">
                            <tr>
                                <td class="bet-info">
                                    <div class="bet-cart p-2" :class="index > 0 ? ' ' : ''" v-for="(bet, index) in betCart" :key="index">
                                        <div class="clearfix">
                                            <div class="float-left text-blue-green w-90">
                                                <span v-if="bet.gameType === 'sports' || bet.gameType === 'sportsCross' || bet.gameType === 'sportsLive' || bet.gameType === 'sportsSpecial' || bet.gameType === 'sportsLiveKor'">
                                                    {{ bet.homeTeam }} vs {{ bet.awayTeam }}
                                                </span>
                                                <span v-else>
                                                    {{ bet.gameInfo }}
                                                </span>
                                            </div>
                                            <div class="float-right w-10 text-right">
                                                <font-awesome-icon class="text-dark-black cursor-pointer" :icon="['fa', 'times']" @click="deleteBet(bet.gameType, index)"/>
                                            </div>
                                        </div>
                                        <div class="clearfix py-1">
                                            <div class="float-left w-85 text-dark-black">
                                                <div v-if="bet.gameType === 'sports' || bet.gameType === 'sportsCross' || bet.gameType === 'sportsLive' || bet.gameType === 'sportsSpecial' || bet.gameType === 'sportsLiveKor'">
                                                    <span>{{ $config.convertBetTypeSports[bet.type] }}</span>
                                                    <span v-if="bet.standard || bet.standard === 0">
                                                        [{{
                                                            bet.type === 'bothTeamsGoalWin' || bet.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[bet.standard] :
                                                            bet.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(bet.standard) : bet.standard
                                                        }}]
                                                    </span>
                                                    <span v-if="bet.type !== 'correctScoreFullTime'"> ({{ $config.convertBetSelectSports[bet.select] }})</span>
                                                </div>
                                                <div v-else>
                                                    {{ $config.convertBetSelectMinigames[bet.betType][bet.betSelect] }}
                                                </div>
                                            </div>
                                            <div class="float-right w-15 text-dark-black text-right">{{ $numeral(bet.selectRate).format('0.00') }}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr class="mt-2 mb-2">
                <div class="row mt-2">
                    <div class="col bet-list px-2">
                        <div class="row">
                            <div class="col-7">
                                <div class="row">
                                    <div class="col">
                                        <div>
                                            베팅금액 :
                                        </div>
                                        <div>
                                            총 배당 :
                                        </div>
                                        <div>
                                            예상 당첨금액 :
                                        </div>
                                    </div>
                                    <div class="col text-right">
                                            <div>
                                                <span>{{ $numeral(betAmountMinigame).format('0,0') }}</span>
                                            </div>
                                            <div>
                                                <span>{{ $numeral(betRate).format('0,0.00') }}</span>
                                            </div>
                                            <div>
                                                <span>{{ $numeral(benefit).format('0,0') }}</span>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="col text-right">
                                <button type="button" class="btn-betting-mobile" @click="bet()" :disabled="loading">
                                    베팅하기
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
        name: 'BetSlipMinigame',
        computed: {
            ...mapGetters(['router', 'loading', 'user', 'betCart', 'betInfo']),
            betRate() {
                let rate = 0

                if(this.betCart.length > 0) {
                    rate = 1
                    for(let i = 0; i < this.betCart.length; i++) {
                        rate *= this.betCart[i].selectRate
                    }
                }
                return parseInt((rate * 100)) / 100
            },
            benefit() {
                let rBenefit = 0

                try {
                    rBenefit = parseInt(this.betRate * this.betAmountMinigame.toString().replace(/,/gi, ''))
                } catch (error) {
                    rBenefit = 0
                }
                return rBenefit
            }
        },
        data() {
            return {
                betAmountMinigame: 0,
                beforeBetAmount: 0,
            }
        },
        mounted() {
            new this.$cleave('#betAmountMinigame', {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralDecimalScale: 0
                })
        },
        methods: {
            ...mapActions(['getInformation', 'deleteBetCart', 'deleteBetCartAll', 'getMinigameBetListRecent']),
            addMoney(amount) {
                const sumAmount = parseInt(this.betAmountMinigame.toString().replace(/,/gi, '')) + amount

                if(sumAmount > this.user.money) {
                    this.betAmountMinigame = this.user.money
                    // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')
                    return
                }

                if(sumAmount > this.betMax) {
                    this.betAmountMinigame = this.betMax
                    // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    this.betAmountMinigame = sumAmount
                    // document.querySelector('#betAmount').value = this.$numeral(sumAmount).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(sumAmount).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(sumAmount).format('0,0')
                }
            },
            initbetAmount(e) {
                this.beforeBetAmount = e.target.value
                e.target.value = ''
            },
            checkbetAmount(e) {
                if(e.target.value === '') {
                    e.target.value = this.beforeBetAmount
                }
            },
            setBetAmount(e) {
                if(!isNaN(e.data)) {
                    this.betAmountMinigame = e.target.value.toString().replace(/,/gi, '')
                    // document.querySelector('#betAmount').value = this.$numeral(e.target.value).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(e.target.value).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(e.target.value).format('0,0')

                    if(parseInt(this.betAmountMinigame) > this.user.money) {
                        e.target.value = this.user.money
                        // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                        // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                        document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')

                        this.betAmountMinigame = this.user.money
                        return
                    }

                    if(parseInt(this.betAmountMinigame) > this.betMax) {
                        e.target.value = this.betMax
                        // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                        // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                        document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                        this.betAmountMinigame = this.betMax
                    }
                }
            },
            init() {
                // document.querySelector('#betAmount').value = 0
                // document.querySelector('#betAmountMobile').value = 0
                document.querySelector('#betAmountMinigame').value = 0

                this.betAmountMinigame = 0
            },
            max() {
                if(this.user.money >= this.betMax) {
                    // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                    this.betAmountMinigame = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')

                    this.betAmountMinigame = this.$numeral(this.user.money).format('0,0')
                }
            },
            deleteBetAll() {
                this.deleteBetCartAll()
            },
            deleteBet(index) {
                this.deleteBetCart(index)
            },
            bet() {
                let betCart = []
                let betData = {}

                betCart = this.betCart
                betData.betGameType = 'minigames'

                betData.betCart = betCart
                betData.betAmount = parseInt(this.betAmountMinigame.toString().replace(/,/gi, ''))
                betData.betRate = this.betRate
                betData.betCount = betCart.length

                if(betData.betCount === 0) {
                    this.$tools.sw('warning', '최소 배팅폴더', '배팅하실 폴더를 선택하세요.')
                    return
                }

                this.$sw.fire({
                    title: '배팅',
                    text: '배팅 하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '예',
                    cancelButtonText: '아니오'
                }).then(async (result) => {
                    if(result.value) {
                        let resultBet = await this.$http.post('/api/bet', betData)
                        if(resultBet.error) return

                        this.$tools.sw('success', '배팅성공', '배팅이 성공하였습니다.')
                        this.deleteBetAll()
                        this.init()
                        this.getMinigameBetListRecent()
                        this.getInformation()
                    }
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    .betslot-box {
        position: fixed;
        bottom: 45px;
        left: 0;
        width: 100%;
        padding: 10px 30px ;

        background: #FBFBFB;
        border-top: 2px solid #182535;
        border-bottom: 2px solid #182535;
        box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.25);
        font-size: 0.75rem;
        font-weight: bold;
        overflow: hidden;

        .bets-close {
            text-align: right;
            margin-top: 5px;
            img {
                width: 12%;
            }
        }

        .betslot-box-title {
            color: #191919;
            font-size: 1.125rem;
        }

        .input-box {
            background-color: #333;
            border-radius: 3px;
            color: #fff;
            font-size: 0.8125rem;
            line-height: 35px;
            padding: 0 10px;

            height: 34px;
        }
        .input-bet-amount {
            width: 100%;
            height: 25px;
            background-color: #333;
            color: #fff;
            border: 0;
            text-align: right;

            &:focus {
                outline: 0;
                box-shadow: none;
            }
        }
        .bet-amount-button-box {
            text-align: center;

            .btn-addmoney {
                background: #F9F9F9;
                border: 0.5px solid #EAEAEA;
                box-shadow: 0px 15px 30px rgba(25, 31, 61, 0.1);
                border-radius: 3px;
                line-height: 30px;
                color: #333;
                font-size: 0.75rem;
            }
        }
    }
    .bet-info-box {
        overflow-y: auto;
        white-space: nowrap;
        text-overflow: ellipsis;
        
        &::-webkit-scrollbar {
            width: 1px; /*스크롤바의 너비*/
            height: 1px; /*스크롤바의 높이*/
        }
        &::-webkit-scrollbar-track {
            background-color: inherit; /*스크롤바 트랙 색상*/
        }
        .bet-info {
            background: #F1F5F9;
            padding: 0 10px;
        }
    }
    .bet-list {
        color: #333;
        font-size: 0.75rem;
    }
    .btn-betting-mobile {
        border-radius: 3px;
        width: 100%;
        height: 52px;
        border: 0;

        background-color: #0D3B75;
        border-radius: 3px;
        color: #fff;
        font-size: 1.0625rem;
        line-height: 35px;
    }
    .btn-cancel {
        width: 100%;
        height: 36px;
        border: 0;
        line-height: 37px;

        background-color: #AA1B1B;
        color: #fff;
        font-size: 0.9375rem;
    }
</style>