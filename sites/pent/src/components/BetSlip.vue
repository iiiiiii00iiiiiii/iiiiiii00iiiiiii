<template>
    <div class="betslip">
        <table class="w-100">
            <tr height="40">
                <td class="betslip-title" colspan="5">
                    BETSLIP
                </td>
            </tr>
            <tr height="35">
                <td class="bet-amount-title" colspan="2">
                    배팅금액
                </td>
                <td colspan="3">
                    <input
                        type="text"
                        class="w-100 input-amount text-right"
                        :id="from === 'mobile' ? 'betAmountMobile' : 'betAmount'"
                        maxlength="11"
                        value="0"
                        autocomplete="off"
                        @click="initbetAmount($event)"
                        @blur="checkbetAmount($event)"
                        @input="setBetAmount($event)"
                    >
                </td>
            </tr>
            <tr height="35">
                <td class="btn-bet-amount" @click="addMoney(10000)">
                    1만
                </td>
                <td class="btn-bet-amount" @click="addMoney(50000)">
                    5만
                </td>
                <td class="btn-bet-amount" @click="addMoney(100000)">
                    10만
                </td>
                <td class="btn-bet-amount" @click="addMoney(300000)">
                    30만
                </td>
                <td class="btn-bet-amount" @click="addMoney(500000)">
                    50만
                </td>
            </tr>
            <tr height="35">
                <td class="btn-bet-amount" @click="addMoney(1000000)">
                    100만
                </td>
                <td class="btn-bet-amount" @click="addMoney(3000000)">
                    300만
                </td>
                <td class="btn-bet-amount" @click="addMoney(5000000)">
                    500만
                </td>
                <td class="btn-bet-amount" @click="init()">
                    <font-awesome-icon class="undo" :icon="['fa', 'undo']"/>
                </td>
                <td class="btn-bet-amount max" @click="max()">
                    MAX
                </td>
            </tr>
            <tr height="25">
                <td class="bet-rate-title" colspan="2">
                    총 배당
                </td>
                <td class="bet-rate-value" colspan="3">
                    {{ $numeral(betRate).format('0,0.00') }} 배
                </td>
            </tr>
            <tr height="25">
                <td class="bet-rate-title" colspan="2">
                    총 배당금액
                </td>
                <td class="bet-rate-value" colspan="3">
                    {{ $numeral(benefit).format('0,0') }} 원
                </td>
            </tr>
            <tr>
                <td class="btn-bet-function" colspan="5">
                    <div class="btn-bet-left">
                        <button type="button" class="btn btn-danger btn-sm" :disabled="loading" @click="deleteBetAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/>
                            전체취소
                        </button>
                    </div>
                    <div class="btn-bet-right">
                        <button type="button" class="btn btn-primary btn-sm" :disabled="loading" @click="bet()">
                            <font-awesome-icon :icon="['fa', 'cogs']"/>
                            배팅하기
                        </button>
                    </div>
                </td>
            </tr>
            <tr height="40">
                <td class="bet-cart" colspan="5">
                    <div class="bet-cart-box">
                        <div class="text-center" v-if="betCart.length === 0">배팅할 게임을 선택하세요.</div>
                        <div class="bet-cart-wrap" :class="index > 0 ? 'mt-2' : ''" v-for="(bet, index) in betCart" :key="index">
                            <div class="clearfix">
                                <div class="bet-cart-left">
                                    <span v-if="bet.gameType === 'sports' || bet.gameType === 'sportsCross' || bet.gameType === 'sportsLive' || bet.gameType === 'sportsSpecial' || bet.gameType === 'sportsLiveKor'">
                                        {{ bet.homeTeam }} vs {{ bet.awayTeam }}
                                    </span>
                                    <span v-else>
                                        {{ bet.gameInfo }}
                                    </span>
                                </div>
                                <div class="bet-cart-right">
                                    <font-awesome-icon class="x" :icon="['fa', 'times']" @click="deleteBet(index)"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="bet-cart-select-left" v-if="bet.gameType === 'sports' || bet.gameType === 'sportsCross' || bet.gameType === 'sportsLive' || bet.gameType === 'sportsSpecial' || bet.gameType === 'sportsLiveKor'">
                                    <div>
                                        <span>{{ $config.convertBetTypeSports[bet.type] }}</span>
                                        <span v-if="bet.standard || bet.standard === 0">
                                            [{{
                                                bet.type === 'bothTeamsGoalWin' || bet.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[bet.standard] :
                                                bet.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(bet.standard) : bet.standard
                                            }}]
                                        </span>
                                        <span v-if="bet.type !== 'correctScoreFullTime'"> ({{ $config.convertBetSelectSports[bet.select] }})</span>
                                    </div>
                                </div>
                                <div class="bet-cart-select-left" v-else>
                                    {{ $config.convertBetSelectMinigames[bet.betType][bet.betSelect] }}
                                </div>
                                <div class="bet-cart-select-right">
                                    {{ $numeral(bet.selectRate).format('0.00') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr height="25">
                <td class="bet-info-title" colspan="2">
                    최소 배팅금액
                </td>
                <td class="bet-info-value" colspan="3">
                    {{ $numeral(betInfo.min).format('0,0') }} 원
                </td>
            </tr>
            <tr height="25">
                <td class="bet-info-title" colspan="2">
                    최대 배팅금액
                </td>
                <td class="bet-info-value" colspan="3">
                    {{ $numeral(betInfo.max).format('0,0') }} 원
                </td>
            </tr>
            <tr height="25">
                <td class="bet-info-title" colspan="2">
                    최대 당첨금액
                </td>
                <td class="bet-info-value" colspan="3">
                    {{ $numeral(betInfo.benefit).format('0,0') }} 원
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'BetSlip',
        props: {
            from: {
                type: String
            }
        },
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
                    rBenefit = parseInt(this.betRate * this.betAmount.toString().replace(/,/gi, ''))
                } catch (error) {
                    rBenefit = 0
                }
                return rBenefit
            }
        },
        data() {
            return {
                betAmount: 0,
                beforeBetAmount: 0
            }
        },
        mounted() {
            new this.$cleave('#betAmount', {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalScale: 0
            })
            new this.$cleave('#betAmountMobile', {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalScale: 0
            })
        },
        methods: {
            ...mapActions(['getInformation', 'deleteBetCart', 'deleteBetCartAll', 'getMinigameBetListRecent']),
            addMoney(amount) {
                const sumAmount = parseInt(this.betAmount.toString().replace(/,/gi, '')) + amount

                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }


                if(sumAmount > money) {
                    this.betAmount = money
                    document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')
                    return
                }

                if(sumAmount > this.betMax) {
                    this.betAmount = this.betMax
                    document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    this.betAmount = sumAmount
                    document.querySelector('#betAmount').value = this.$numeral(sumAmount).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(sumAmount).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(sumAmount).format('0,0')
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
                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }

                if(!isNaN(e.data)) {
                    this.betAmount = e.target.value.toString().replace(/,/gi, '')
                    document.querySelector('#betAmount').value = this.$numeral(e.target.value).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(e.target.value).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(e.target.value).format('0,0')

                    if(parseInt(this.betAmount) > money) {
                        e.target.value = money
                        document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                        document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                        // document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')

                        this.betAmount = money
                        return
                    }

                    if(parseInt(this.betAmount) > this.betMax) {
                        e.target.value = this.betMax
                        document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                        document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                        // document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                        this.betAmount = this.betMax
                    }
                }
            },
            init() {
                document.querySelector('#betAmount').value = 0
                document.querySelector('#betAmountMobile').value = 0

                this.betAmount = 0
            },
            max() {
                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }

                if(money >= this.betMax) {
                    document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                    this.betAmount = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')

                    this.betAmount = this.$numeral(money).format('0,0')
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
                let betMaxRate = 0
                let betURL = ''

                let betData = {}
                if(this.router === 'Sports') {
                    betCart = this.betCart
                    betMaxRate = this.$config.sportsMaxRate
                    betURL = '/api/bet'
                    betData.betGameType = 'sports'
                }
                else if(this.router === 'SportsCross') {
                    betCart = this.betCart
                    betMaxRate = this.$config.sportsMaxRate
                    betURL = '/api/bet'

                    betData.betGameType = 'sportsCross'
                }
                else if(this.router === 'SportsLive') {
                    betCart = this.betCart
                    betMaxRate = this.$config.sportsMaxRate
                    betURL = '/api/bet'

                    betData.betGameType = 'sportsLive'
                }
                else if(this.router === 'SportsSpecial') {
                    betCart = this.betCart
                    betMaxRate = this.$config.sportsMaxRate
                    betURL = '/api/bet'

                    betData.betGameType = 'sportsSpecial'
                }
                else if(this.router === 'SportsLiveKor') {
                    betCart = this.betCart
                    betMaxRate = this.$config.sportsMaxRate
                    betURL = '/api/bet'

                    betData.betGameType = 'sportsLiveKor'
                }
                else if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                    betCart = this.betCart
                    betURL = '/api/bet'

                    betData.betGameType = 'minigames'
                }

                betData.betCart = betCart
                betData.betAmount = parseInt(this.betAmount.toString().replace(/,/gi, ''))
                betData.betRate = this.betRate
                betData.betCount = betCart.length

                if(betData.betCount === 0) {
                    this.$tools.sw('warning', '최소 배팅폴더', '배팅하실 폴더를 선택하세요.')
                    return
                }

                if(betData.betGameType !== 'minigames') {
                    // if(betData.betGameType === 'sportsLive' || betData.betGameType === 'sportsLiveKor' || betData.betGameType === 'sportsSpecial') {
                    //     if(betData.betAmount < 5000) {
                    //         this.$tools.sw('warning', '최소 배팅금액', `최소 5,000원 이상 배팅 가능 합니다.`)
                    //         return
                    //     }

                    //     if(betData.betAmount > 2000000) {
                    //         this.$tools.sw('warning', '최대 배팅금액', `최대 2,000,000원 이하 배팅 가능 합니다.`)
                    //         return
                    //     }

                    //     if(this.benefit > 5000000) {
                    //         this.$tools.sw('warning', '최대 당첨금', `최대 당첨금은 5,000,000원 이하 입니다.`)
                    //         return
                    //     }
                    // }
                    // else {
                    //     if(betData.betAmount < this.betInfo.min) {
                    //         this.$tools.sw('warning', '최소 배팅금액', `최소 ${this.$numeral(this.betInfo.min).format('0,0')}원 이상 배팅 가능 합니다.`)
                    //         return
                    //     }

                    //     if(betData.betAmount > this.betInfo.max) {
                    //         this.$tools.sw('warning', '최대 배팅금액', `최대 ${this.$numeral(this.betInfo.max).format('0,0')}원 이하 배팅 가능 합니다.`)
                    //         return
                    //     }

                    //     if(this.benefit > this.betInfo.benefit) {
                    //         this.$tools.sw('warning', '최대 당첨금', `최대 당첨금은 ${this.$numeral(this.betInfo.benefit).format('0,0')}원 이하 입니다.`)
                    //         return
                    //     }

                    //     // ######################### 최대 당첨금 넣기 #########################
                    // }

                    if(betData.betAmount < this.betInfo.min) {
                        this.$tools.sw('warning', '최소 배팅금액', `최소 ${this.$numeral(this.betInfo.min).format('0,0')}원 이상 배팅 가능 합니다.`)
                        return
                    }

                    if(betData.betAmount > this.betInfo.max) {
                        this.$tools.sw('warning', '최대 배팅금액', `최대 ${this.$numeral(this.betInfo.max).format('0,0')}원 이하 배팅 가능 합니다.`)
                        return
                    }

                    if(this.benefit > this.betInfo.benefit) {
                        this.$tools.sw('warning', '최대 당첨금', `최대 당첨금은 ${this.$numeral(this.betInfo.benefit).format('0,0')}원 이하 입니다.`)
                        return
                    }

                    if(betData.betRate > parseInt(betMaxRate)) {
                        this.$tools.sw('warning', '최대 배팅배당', `최대 ${this.$numeral(betMaxRate).format('0,0')}배 까지 배팅 가능 합니다.`)
                        return
                    }
                }
                else {
                    if(betData.betAmount === 0) {
                        // betData.betAmount = parseInt(document.querySelector('#betAmountMinigame').value.toString().replace(/,/gi, ''))
                        // console.log(betData.betAmount)
                    }
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
                        let resultBet = await this.$http.post(betURL, betData)
                        if(resultBet.error) return

                        this.$tools.sw('success', '배팅성공', '배팅이 성공하였습니다.')
                        this.deleteBetAll()
                        this.init()

                        if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                            this.getMinigameBetListRecent()
                            this.getInformation()
                        }
                        else {
                            this.getInformation()
                        }
                    }
                })
            }
        }
    }
</script>