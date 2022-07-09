<template>
    <div class="betslip">
        <div class="betslip-title">
            <font-awesome-icon :icon="['fa', 'shopping-cart']" style="color: #fff"/> Betting Cart
        </div>
        <div class="betslip-info">
            <ul>
                <li>
                    보유머니
                    <span>
                        {{ $numeral(user.money).format('0,0') }}
                    </span>
                </li>
                <li>
                    배팅금액
                    <span class="w-40">
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
                    </span>
                </li>
                <li>
                    총 배당률
                    <span>
                        {{ $numeral(betRate).format('0,0.00') }} 배
                    </span>
                </li>
                <li>
                    예상당첨금액
                    <span>
                        {{ $numeral(benefit).format('0,0') }} 원
                    </span>
                </li>
            </ul>
        </div>
        <div class="cart-money-button">
            <ul>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(10000)">10,000</button>
                </li>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(50000)">50,000</button>
                </li>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(100000)">100,000</button>
                </li>
            </ul>
            <ul>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(300000)">300,000</button>
                </li>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(500000)">500,000</button>
                </li>
                <li>
                    <button type="button" class="btn-bet-amount" @click="addMoney(1000000)">1,000,000</button>
                </li>
            </ul>
        </div>
        <div class="correction-button">
            <button type="button" class="correction-bet btn-block" @click="init()">정정하기</button>
        </div>
        <div class="cart-max-button">
            <button type="button" class="maxbet-btn btn-block" @click="max()">MAX Betting</button>
        </div>
        <div class="cart-submit">
            <button type="button" class="betting-btn" :disabled="loading" @click="bet()">
                배팅하기
            </button>
            <button type="button" class="cart-clear-btn" :disabled="loading" @click="deleteBetAll()">
                전체취소
            </button>
        </div>
        <div class="cart-data">
            <div class="bet-cart-box">
                <div class="text-center" v-if="betCart.length === 0">배팅할 게임을 선택하세요.</div>
                <div class="bet-cart-wrap" :class="index > 0 ? 'mt-2' : ''" v-for="(bet, index) in betCart" :key="index">
                    <div class="clearfix">
                        <div class="bet-cart-team-name">
                            <span v-if="bet.gameType === 'sports' || bet.gameType === 'sportsCross' || bet.gameType === 'sportsLive' || bet.gameType === 'sportsSpecial' || bet.gameType === 'sportsLiveKor'">
                                {{ bet.homeTeam }} vs {{ bet.awayTeam }}
                            </span>
                            <span v-else>
                                {{ bet.gameInfo }}
                            </span>
                        </div>
                        <div class="bet-cart-x">
                            <font-awesome-icon class="x" :icon="['fa', 'times']" @click="deleteBet(index)"/>
                        </div>
                    </div>
                    <div class="clearfix mt-1">
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
        </div>
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
            ...mapGetters(['router', 'loading', 'user', 'betCart', 'betInfo', 'bonusInfo']),
            betRate() {
                let rate = 0

                if(this.betCart.length > 0) {
                    let arrayBetBonus = []
                    if(this.router === 'Sports') {
                        arrayBetBonus = this.bonusInfo.filter(x => x.type === 'prematchEurope')
                    }
                    else if(this.router === 'SportsCross') {
                        arrayBetBonus = this.bonusInfo.filter(x => x.type === 'prematchKor')
                    }
                    else if(this.router === 'SportsSpecial') {
                        arrayBetBonus = this.bonusInfo.filter(x => x.type === 'special')
                    }
                    else if(this.router === 'SportsLive') {
                        arrayBetBonus = this.bonusInfo.filter(x => x.type === 'live')
                    }
                    else if(this.router === 'SportsLiveKor') {
                        arrayBetBonus = this.bonusInfo.filter(x => x.type === 'realtime')
                    }

                    let bonusRate = 1
                    let needRate = 1
                    if(arrayBetBonus.length > 0) {
                        arrayBetBonus = this.$_.sortBy(arrayBetBonus, 'folder').reverse()
                        for(let i = 0; i < arrayBetBonus.length; i++) {
                            if(arrayBetBonus[i].folder <= this.betCart.length) {
                                bonusRate = arrayBetBonus[i].bonusRate
                                needRate = arrayBetBonus[i].allowRate
                                break
                            }
                        }

                        for(let i = 0; i < this.betCart.length; i++) {
                            if(this.betCart[i].selectRate <= needRate) {
                                bonusRate = 1
                                break
                            }
                        }
                    }

                    rate = bonusRate
                    for(let i = 0; i < this.betCart.length; i++) {
                        rate *= this.betCart[i].selectRate
                    }

                    // console.log(rate)
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

                if(sumAmount > this.user.money) {
                    this.betAmount = this.user.money
                    document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')
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
                if(!isNaN(e.data)) {
                    this.betAmount = e.target.value.toString().replace(/,/gi, '')
                    document.querySelector('#betAmount').value = this.$numeral(e.target.value).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(e.target.value).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(e.target.value).format('0,0')

                    if(parseInt(this.betAmount) > this.user.money) {
                        e.target.value = this.user.money
                        document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                        document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                        // document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')

                        this.betAmount = this.user.money
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
                if(this.user.money >= this.betMax) {
                    document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                    this.betAmount = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMinigame').value = this.$numeral(this.user.money).format('0,0')

                    this.betAmount = this.$numeral(this.user.money).format('0,0')
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
                else if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'Kenoladder' || this.router === 'BoglePowerball' || this.router === 'Bogleladder' || this.router === 'GooglePowerball1' || this.router === 'GooglePowerball3') {
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

                        if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'Kenoladder' || this.router === 'BoglePowerball' || this.router === 'Bogleladder' || this.router === 'GooglePowerball1' || this.router === 'GooglePowerball3') {
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