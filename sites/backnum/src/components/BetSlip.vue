<template>
    <div class="bet-slip">
        <div class="betslot-box">
            <div class="betslip-title">
                BETSLIP
            </div>
            <div class="betslip-money-amount px-1">
                <table class="w-100">
                    <tr>
                        <td class="py-3 text-right font-weight-bold" colspan="1">
                            베팅금액
                        </td>
                        <td class="" colspan="3">
                            <input
                                type="text"
                                :id="from === 'mobile' ? 'betAmountMobile' : 'betAmount'"
                                class="w-85 input-amount text-right"
                                maxlength="11"
                                value="0"
                                autocomplete="off"
                                @click="initbetAmount($event)"
                                @blur="checkbetAmount($event)"
                                @input="setBetAmount($event)"
                            >
                        </td>
                    </tr>
                    <tr class="cursor-pointer">
                        <td class="py-2 w-20" @click="addMoney(5000)">
                            5천
                        </td>
                        <td class="py-2 w-20" @click="addMoney(10000)">
                            1만
                        </td>
                        <td class="py-2 w-20" @click="addMoney(50000)">
                            5만
                        </td>
                        <td class="py-2 w-20" @click="addMoney(100000)">
                            10만
                        </td>
                    </tr>
                    <tr class="cursor-pointer">
                        <td class="py-2 w-20" @click="addMoney(500000)">
                            50만
                        </td>
                        <td class="py-2 w-20" @click="addMoney(1000000)">
                            100만
                        </td>
                        <td class="py-2 w-20" @click="addMoney(3000000)">
                            300만
                        </td>
                        <td class="py-2 w-20 text-inf" @click="max()">
                            MAX
                        </td>
                    </tr>
                    <tr class="cursor-pointer">
                        <td class="p-2" colspan="5">
                            <div class="row">
                                <div class="col-6 pr-2">
                                    <button type="button" class="btn btn-cancel-bet btn-block" @click="init()">
                                        금액리셋
                                    </button>
                                </div>
                                <div class="col-6 pl-2">
                                    <button type="button" class="btn btn-cancel-bet btn-block" @click="deleteBetAll()">
                                        전체취소
                                    </button>
                                </div>
                                <div class="col-12 mt-2">
                                    <button type="button" class="btn btn-bet btn-block" @click="bet()">
                                        배팅하기
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="betslot-money-info">
                <table class="w-100">
                    <tr>
                        <td class="py-2 pl-3 text-left w-40">
                            보유금액
                        </td>
                        <td class="py-2 pr-3 text-right w-60">
                            <div class="info">
                                {{ $numeral(user.money).format('0,0') }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-2 pl-3 text-left w-40">
                            보유포인트
                        </td>
                        <td class="py-1 pr-3 text-right w-60">
                            <div class="info">
                                {{ $numeral(user.point).format('0,0') }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-2 pl-3 text-left w-40">
                            총 배당
                        </td>
                        <td class="py-1 pr-3 text-right w-60">
                            <div class="info">
                                {{ $numeral(betRate).format('0.00') }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-2 pl-3 text-left w-40">
                            총 배당금
                        </td>
                        <td class="py-1 pr-3 text-right w-60">
                            <div class="info">
                                {{ $numeral(benefit).format('0,0') }}
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="w-100">
                    <tr>
                        <td class="text-left bg-money-info">
                            <div class="p-3 text-center text-blue-green" v-if="betCart.length === 0">베팅할 게임을 선택하세요.</div>
                            <div class="bet-cart p-2" :class="index > 0 ? 'mt-1' : ''" v-for="(bet, index) in betCart" :key="index">
                                <div class="clearfix">
                                    <div class="float-left w-90">
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
        <div class="service-center-box">
            <div class="col-12 service-center-title">
                고객센터 <span>24시간 언제든지 문의가능</span>
            </div>
            <div class="col-12 mt-2">
                <img src="/images/kakao-talk-img.png" class="img-fluid">
            </div>
            <div class="col-12 mt-2">
                <img src="/images/telegram-img.png" class="img-fluid">
            </div>
            <div class="col-12 my-2">
                <img src="/images/call-img.png" class="img-fluid">
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
                    rBenefit = parseInt((this.betRate * this.betAmount.toString().replace(/,/gi, '')).toFixed(0))
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
            if(this.router !== 'Home') {
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
            }
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
                else if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'Kenoladder' || this.router === 'BoglePowerball' || this.router === 'Bogleladder' || this.router === 'GooglePowerball1' || this.router === 'GooglePowerball3' || this.router === 'EosPowerball1' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'Speedladder') {
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

                    // ######################### 최대 당첨금 넣기 #########################

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

                        if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'Kenoladder' || this.router === 'BoglePowerball' || this.router === 'Bogleladder' || this.router === 'GooglePowerball1' || this.router === 'GooglePowerball3' || this.router === 'EosPowerball1' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'Speedladder') {
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

<style lang="scss" scoped>
    .bet-slip {
        
        .betslot-box {
            margin-top: 20px;
            border-radius: 3px;

            .betslip-title {
                background-color: #0d3a71;
                color: #fff;
                font-size: 0.9375rem;
                border-radius: 3px 3px 0 0;
                padding: 9px;
            }
            .betslip-money-amount {

                table {
                    border-collapse: collapse;

                    tr {

                        &.bg-bet-amount {
                            background-color: #f1f5f9;
                        }
                        background-color: #f9f9f9;

                        td {
                            color: #333;
                            font-size: 0.75rem;
                            text-align: center;

                            .input-amount {
                                padding-right: 0.5rem;
                                height: 28px !important;
                                background-color: #1f1f1f;
                                font-weight: 600;
                                color: #ffffff;
                                border: 0;
                                border-radius: 5px;
                                height:40px;

                                &:focus {
                                    outline: none;
                                }
                            }

                            .btn-cancel-bet {
                                border-radius: 3px;
                                background: linear-gradient(0deg, #AA1B1B, #AA1B1B);
                                color: #fff;
                                font-size: 0.75rem;
                                padding: 7px 0;

                                &:hover {
                                    background: linear-gradient(0deg, #AA1B1B, #AA1B1B);
                                }
                            }

                            .btn-bet {
                                border-radius: 3px;
                                background: linear-gradient(180deg, #124F99 0%, #0B2D57 100%);
                                color: #fff;
                                font-size: 0.9375rem;
                                padding: 11px 0;

                                &:hover {
                                    background: linear-gradient(180deg, #124F99 0%, #0B2D57 100%);
                                }
                            }
                        }
                    }
                }
            }
            .betslot-money-info {

                table {
                    tr {
                        
                        td {
                            color: #2C2C2C;
                            font-size: 0.75rem;
                            text-align: center;

                            .info {
                                background-color: #f1f5f9;
                                color: #605D5C;
                                border-radius: 3px;
                                padding: 0.25rem 0;
                            }

                            div.bet-cart {
                                background: #F1F5F9;
                                border: 1px solid #F1F1F1;
                                box-sizing: border-box;
                                border-radius: 0px;
                                color: #08439F;
                            }
                        }
                    }
                }
            }
        }
    }
    .service-center-box {
        margin-top: 20px;
        text-align: center;
        .service-center-title {
            color: #202020;
            font-size: 1.25rem;

            span {
                color: #605D5C;
                font-size: 0.8125rem;
            }
        }
    }
</style>