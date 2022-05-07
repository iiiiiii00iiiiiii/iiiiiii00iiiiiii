<template>
    <div class="container-fluid">
        <div class="row" v-if="isLogin">
            <div class="col footer-mobile-menu">
                <div class="footer-mobile-menu-wrap text-center">
                    <ul>
                        <li @click="$tools.pushRouter('/', false)">
                            <div>HOME</div>
                        </li>
                        <li>
                            <img src="/images/vertical-line-01.jpg"  class="border-color">
                        </li>
                        <li @click="$tools.pushRouter('/charge', false)">
                            <div>충전</div>
                        </li>
                        <li>
                            <img src="/images/vertical-line-01.jpg">
                        </li>
                        <li @click="$tools.pushRouter('/exchange', false)">
                            <div>환전</div>
                        </li>
                        <li>
                            <img src="/images/vertical-line-01.jpg">
                        </li>
                        <li @click="$tools.pushRouter('/help', false)">
                            <div>문의</div>
                        </li>
                        <li>
                            <img src="/images/vertical-line-01.jpg">
                        </li>
                        <li :class="selectCommunication === 0 ? 'active' : ''"
                            @click="changeCommunication(0)"
                            v-if=" (this.router === 'Sports' ||
                                    this.router === 'SportsCross' ||
                                    this.router === 'SportsLive' ||
                                    this.router === 'SportsLiveKor' ||
                                    this.router === 'SportsSpecial'
                                )"
                        >
                            <div>
                                배팅
                                <span class="cart-count" v-show="isLogin" @click="openRightSide()">
                                    <div style="margin-top: -2px">
                                        {{ betCart.length }}
                                    </div>
                                </span>
                            </div>
                        </li>
                        <li @click="$tools.pushRouter('/notice', false)"
                            v-if=" (this.router === 'Sports' === false &
                                    this.router === 'SportsCross' === false &
                                    this.router === 'SportsLive' === false &
                                    this.router === 'SportsLiveKor' === false &
                                    this.router === 'SportsSpecial' === false
                            )"
                            >
                            <div>공지</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12"
                v-show="selectCommunication === 0">
                <div class="betslot-box">
                    <div class="row">
                        <div class="col-6 mt-1 betslot-box-title">
                            BET SLIP
                        </div>
                        <div class="col-6 bets-close ">
                            <img src="/images/x.png" class="x" @click="selectCommunication = false">
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
                                            id="betAmountSports"
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
                        <div class="col bet-amount-button-box px-2">
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
                                        베팅취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-3 mb-3">
                    <div class="row mt-2">
                        <div class="col bet-info-box">
                            <table class="w-100">
                                <tr>
                                    <td class="text-left bg-money-info">
                                        <div class="p-3 text-center text-blue-green" v-if="betCart.length === 0">베팅할 게임을 선택하세요.</div>
                                        <div class="bet-cart p-2" :class="index > 0 ? 'mt-1' : ''" v-for="(bet, index) in betCart" :key="index">
                                            <div class="clearfix">
                                                <div class="float-left w-90 text-blue-green">
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
                    <hr class="mb-2">
                    <div class="row">
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
                                                <span>{{ $numeral(betAmountSports).format('0,0') }}</span>
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
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'FooterMobileMenu',
        computed: {
            ...mapGetters(['router', 'loading', 'user', 'betCart', 'betInfo', 'isLogin']),
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
                    rBenefit = parseInt((this.betRate * this.betAmountSports.toString().replace(/,/gi, '')).toFixed(0))
                } catch (error) {
                    rBenefit = 0
                }
                return rBenefit
            }
        },
        data() {
            return {
                betAmount: 0,
                beforeBetAmount: 0,
                betAmountSports: 0,
                selectCommunication: ''
            }
        },
        mounted() {
            new this.$cleave('#betAmountSports', {
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                    numeralDecimalScale: 0
                })
        },
        methods: {
            ...mapActions(['getInformation', 'deleteBetCart', 'deleteBetCartAll', 'getMinigameBetListRecent']),
            addMoney(amount) {
                const sumAmount = parseInt(this.betAmountSports.toString().replace(/,/gi, '')) + amount

                if(sumAmount > this.user.money) {
                    this.betAmountSports = this.user.money
                    // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(this.user.money).format('0,0')
                    return
                }

                if(sumAmount > this.betMax) {
                    this.betAmountSports = this.betMax
                    // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    this.betAmountSports = sumAmount
                    // document.querySelector('#betAmount').value = this.$numeral(sumAmount).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(sumAmount).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(sumAmount).format('0,0')
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
                    this.betAmountSports = e.target.value.toString().replace(/,/gi, '')
                    // document.querySelector('#betAmount').value = this.$numeral(e.target.value).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(e.target.value).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(e.target.value).format('0,0')

                    if(parseInt(this.betAmountSports) > this.user.money) {
                        e.target.value = this.user.money
                        // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                        // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                        document.querySelector('#betAmountSports').value = this.$numeral(this.user.money).format('0,0')

                        this.betAmountSports = this.user.money
                        return
                    }

                    if(parseInt(this.betAmountSports) > this.betMax) {
                        e.target.value = this.betMax
                        // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                        // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                        document.querySelector('#betAmountSports').value = this.$numeral(this.betMax).format('0,0')

                        this.betAmountSports = this.betMax
                    }
                }
            },
            init() {
                // document.querySelector('#betAmount').value = 0
                // document.querySelector('#betAmountMobile').value = 0
                document.querySelector('#betAmountSports').value = 0

                this.betAmountSports = 0
            },
            max() {
                if(this.user.money >= this.betMax) {
                    // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(this.betMax).format('0,0')

                    this.betAmountSports = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    // document.querySelector('#betAmount').value = this.$numeral(this.user.money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.user.money).format('0,0')
                    document.querySelector('#betAmountSports').value = this.$numeral(this.user.money).format('0,0')

                    this.betAmountSports = this.$numeral(this.user.money).format('0,0')
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

                betData.betCart = betCart
                betData.betAmount = parseInt(this.betAmountSports.toString().replace(/,/gi, ''))
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
                        this.getMinigameBetListRecent()
                        this.getInformation()
                    }
                })
            },
            changeCommunication(i) {
                if(this.selectCommunication === i) {
                    this.selectCommunication = null
                    return
                }
                this.selectCommunication = i
            },
        },
        watch: {
            $route() {
                this.selectCommunication = true
            }
        }
    }
</script>

<style lang="scss" scoped>

    .footer-mobile-menu {
        background: linear-gradient(268.08deg, #47BBA6 -9.6%, #0E3B72 66.08%);
        padding-top: 8px;
        padding-bottom: 8px;
    }
    .footer-mobile-menu-wrap {
        text-align: center;

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-around;

            li {
                color: #fff;
                font-size: 0.9375rem;
                line-height: 30px;
            }
        }
    }
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

        height: 122px;
        &::-webkit-scrollbar {
            width: 1px; /*스크롤바의 너비*/
            height: 1px; /*스크롤바의 높이*/
        }
        &::-webkit-scrollbar-track {
            background-color: inherit; /*스크롤바 트랙 색상*/
        }
        .bet-info {
            background: #F1F5F9;
            border-radius: 15px;
            padding: 0 10px;

            .bet-cart {
                border-bottom: 1px solid #bbb9b9;
            }
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
    .cart-count {
        position: absolute;
        top: 3px;
        right: 45px;
        width: 25px;
        height: 25px;
        border: 1px solid #661203;
        border-radius: 50%;
        background-color: #cc0a0a;
        display: inline-block;
        color: #fff;
        font-size: 0.75rem;
        font-weight: 700;
        text-align: center;
        padding-top: 0px;
    }
</style>