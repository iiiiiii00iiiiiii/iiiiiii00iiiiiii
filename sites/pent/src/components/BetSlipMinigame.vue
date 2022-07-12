<template>
    <div>
        <div class="betslot-box">
            <div class="row px-2">
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
            </div>
            <div class="row mt-2 px-2">
                <div class="col-12 input-box">
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
            <div class="row bet-amount-button-box mt-2">
                <div class="col">
                    <div class="btn-addmoney" @click="addMoney(10000)">1만</div>
                </div>
                <div class="col">
                    <div class="btn-addmoney" @click="addMoney(50000)">5만</div>
                </div>
                <div class="col">
                    <div class="btn-addmoney" @click="addMoney(100000)">10만</div>
                </div>
                <div class="col">
                    <div class="btn-addmoney" @click="addMoney(300000)">30만</div>
                </div>
            </div>
            <div class="row bet-amount-button-box mt-1">
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
            <div class="row mt-2">
                <div class="col-6">
                    <button type="button" class="btn-cancel" @click="init()" :disabled="loading">
                        <font-awesome-icon :icon="['fa', 'redo']"/>
                        금액취소
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn-cancel" @click="deleteBetAll()" :disabled="loading">
                        <font-awesome-icon :icon="['fa', 'trash-alt']"/>
                        취소 & 닫기
                    </button>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <button type="button" class="btn-bet" @click="bet()" :disabled="loading">
                        <font-awesome-icon :icon="['fa', 'cogs']"/>
                        베팅하기
                    </button>
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

                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }

                if(sumAmount > money) {
                    this.betAmountMinigame = money
                    // document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')
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
                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }

                if(!isNaN(e.data)) {
                    this.betAmountMinigame = e.target.value.toString().replace(/,/gi, '')
                    // document.querySelector('#betAmount').value = this.$numeral(e.target.value).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(e.target.value).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(e.target.value).format('0,0')

                    if(parseInt(this.betAmountMinigame) > money) {
                        e.target.value = money
                        // document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                        // document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                        document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')

                        this.betAmountMinigame = money
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
                if(this.router !== 'Powerball' && this.router !== 'Powerladder' && this.router !== 'CoinPowerball3' && this.router !== 'CoinPowerball' && this.router !== 'EosPowerball3' && this.router !== 'EosPowerball' && this.router !== 'BoglePowerball' && this.router !== 'Bogleladder') return
                if(this.$store.state.end) return

                let money = 0
                if(this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'BoglePowerball' || this.router === 'Bogleladder') {
                    money = this.user.minigameMoney
                }
                else {
                    money = this.user.money
                }

                if(money >= this.betMax) {
                    // document.querySelector('#betAmount').value = this.$numeral(this.betMax).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(this.betMax).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(this.betMax).format('0,0')

                    this.betAmountMinigame = this.$numeral(this.betMax).format('0,0')
                }
                else {
                    // document.querySelector('#betAmount').value = this.$numeral(money).format('0,0')
                    // document.querySelector('#betAmountMobile').value = this.$numeral(money).format('0,0')
                    document.querySelector('#betAmountMinigame').value = this.$numeral(money).format('0,0')

                    this.betAmountMinigame = this.$numeral(money).format('0,0')
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
        border: 1px solid #deb97d;
        border-radius: 3px;
        background-color: #30251c;
        padding: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        position: relative;
        overflow: hidden;

        .input-box {
            background-color: #080500;
            border-radius: 3px;
            color: #fff;
            line-height: 40px;
        }
        .bet-amount-button-box {
            text-align: center;

            .btn-addmoney {
                background-color: #30251c;
                border: 1px solid #080500;
                border-radius: 3px;
                line-height: 30px;
                color: #c2c2c2;
                box-shadow: 1px 1px 1px#080500;
            }
        }
    }
    .input-bet-amount {
        width: 100%;
        background-color: #080500;
        color: #deb97d;
        border: 0;
        text-align: right;

        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }
    .btn-bet {
        border-radius: 3px;
        width: 100%;
        height: 36px;
        border: 0;

        transition: 0.2s;
        background-color: #d2d2d2;
        color: #111;

        &:hover {
            transition: 0.2s;
            background-color: #bbb9b9;
        }
    }
    .btn-cancel {
        border-radius: 3px;
        width: 100%;
        height: 36px;
        border: 0;

        transition: 0.2s;
        background-color: #cb9f42;
        color: #fff;
        text-shadow: 1px 1px 1px #111;

        &:hover {
            transition: 0.2s;
            background-color: #bb943f;
        }
    }
</style>