<template>
    <div class="row mb-3" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'gamepad']"/>
                            <span class="ml-2">파워 사다리 POWER LADDER</span>
                            <span class="float-right">
                                <button class="btn-minigames" @click="isHide = !isHide">
                                    <font-awesome-icon :icon="['fa', isHide ? 'chevron-down' : 'chevron-up']"/>
                                    {{ isHide ? '중계화면 열기' : '중계화면 닫기' }}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="minigames">
                        <div class="row mt-1" v-show="!isHide">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <div class="broadcast">
                                            <div id="frame-wrap-named">
                                                <iframe class="iframe-game-named" src="https://named.com/games/powerladder/view.php" scrolling="no"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="minigame-info clearfix">
                                    <div class="float-left">
                                        <font-awesome-icon :icon="['fa', 'star']" class="text-light-brown"/> 파워 사다리-<span class="text-light-brown">{{ round }}</span> (<span class="text-light-brown">{{ rotation }}</span>) 회차
                                    </div>
                                    <div class="float-right">
                                        <div class="game-time-box">
                                            <span>마감 : </span><span>{{ minute ? minute : '--' }}:{{ second ? second : '--' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section1">
                                    파워 사다리 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDLR' && betSelect === 'Left' ? 'active' : ''"
                                    @click="setBet(id, 'PLDLR', 'Left', games.PLDLR.rateOfLeft)"
                                >
                                    <div class="bet" :class="end || !games.PLDLR.rateOfLeft ? '' : 'blue'">
                                        <span>좌</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDLR.rateOfLeft ? $numeral(games.PLDLR.rateOfLeft).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDLR' && betSelect === 'Right' ? 'active' : ''"
                                    @click="setBet(id, 'PLDLR', 'Right', games.PLDLR.rateOfRight)"
                                >
                                    <div class="bet" :class="end || !games.PLDLR.rateOfRight ? '' : 'red'">
                                        <span>우</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDLR.rateOfRight ? $numeral(games.PLDLR.rateOfRight).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDTF' && betSelect === 'Three' ? 'active' : ''"
                                    @click="setBet(id, 'PLDTF', 'Three', games.PLDTF.rateOfThree)"
                                >
                                    <div class="bet" :class="end || !games.PLDTF.rateOfThree ? '' : 'blue'">
                                        <span>3줄</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDTF.rateOfThree ? $numeral(games.PLDTF.rateOfThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDTF' && betSelect === 'Four' ? 'active' : ''"
                                    @click="setBet(id, 'PLDTF', 'Four', games.PLDTF.rateOfFour)"
                                >
                                    <div class="bet" :class="end || !games.PLDTF.rateOfFour ? '' : 'red'">
                                        <span>4줄</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDTF.rateOfFour ? $numeral(games.PLDTF.rateOfFour).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDOE' && betSelect === 'Odd' ? 'active' : ''"
                                    @click="setBet(id, 'PLDOE', 'Odd', games.PLDOE.rateOfOdd)"
                                >
                                    <div class="bet" :class="end || !games.PLDOE.rateOfOdd ? '' : 'blue'">
                                        <span>홀</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDOE.rateOfOdd ? $numeral(games.PLDOE.rateOfOdd).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDOE' && betSelect === 'Even' ? 'active' : ''"
                                    @click="setBet(id, 'PLDOE', 'Even', games.PLDOE.rateOfEven)"
                                >
                                    <div class="bet" :class="end || !games.PLDOE.rateOfEven ? '' : 'blue'">
                                        <span>짝</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDOE.rateOfEven ? $numeral(games.PLDOE.rateOfEven).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section2">
                                    파워 사다리 조합 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDCOMBO' && betSelect === 'LeftThree' ? 'active' : ''"
                                    @click="setBet(id, 'PLDCOMBO', 'LeftThree', games.PLDCOMBO.rateOfLeftThree)"
                                >
                                    <div class="bet" :class="end || !games.PLDCOMBO.rateOfLeftThree ? '' : 'blue'">
                                        <span>좌3</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDCOMBO.rateOfLeftThree ? $numeral(games.PLDCOMBO.rateOfLeftThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDCOMBO' && betSelect === 'LeftFour' ? 'active' : ''"
                                    @click="setBet(id, 'PLDCOMBO', 'LeftFour', games.PLDCOMBO.rateOfLeftFour)"
                                >
                                    <div class="bet" :class="end || !games.PLDCOMBO.rateOfLeftFour ? '' : 'blue'">
                                        <span>좌4</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDCOMBO.rateOfLeftFour ? $numeral(games.PLDCOMBO.rateOfLeftFour).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDCOMBO' && betSelect === 'RightThree' ? 'active' : ''"
                                    @click="setBet(id, 'PLDCOMBO', 'RightThree', games.PLDCOMBO.rateOfRightThree)"
                                >
                                    <div class="bet" :class="end || !games.PLDCOMBO.rateOfRightThree ? '' : 'red'">
                                        <span>우3</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDCOMBO.rateOfRightThree ? $numeral(games.PLDCOMBO.rateOfRightThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PLDCOMBO' && betSelect === 'RightFour' ? 'active' : ''"
                                    @click="setBet(id, 'PLDCOMBO', 'RightFour', games.PLDCOMBO.rateOfRightFour)"
                                >
                                    <div class="bet" :class="end || !games.PLDCOMBO.rateOfRightFour ? '' : 'red'">
                                        <span>우4</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PLDCOMBO.rateOfRightFour ? $numeral(games.PLDCOMBO.rateOfRightFour).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <MinigameBetListRecent/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import MinigameBetListRecent from '../components/MinigameBetListRecent.vue'

    export default {
        name: 'Powerladder',
        components: {
            MinigameBetListRecent
        },
        computed: {
            ...mapGetters(['loading', 'betCart', 'router', 'isLogin']),
            betType() {
                return this.betCart.length > 0 ? this.betCart[0].betType : null
            },
            betSelect() {
                return this.betCart.length > 0 ? this.betCart[0].betSelect : null
            }
        },
        data() {
            return {
                isHide: false,
                end: false,
                id: null,
                rotation: 0,
                round: 0,
                gameTime: null,
                localTime: null,
                serverTime: null,
                minute: null,
                second: null,
                games: {
                    PLDOE: { rateOfOdd: null, rateOfEven: null },
                    PLDLR: { rateOfLeft: null, rateOfRight: null },
                    PLDTF: { rateOfThree: null, rateOfFour: null },
                    PLDCOMBO: { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
                },
                gameInterval: null,
                betlistInterval: null
            }
        },
        created() {
            //this.setFromRouter()
            this.getGame()
        },
        mounted() {
            window.addEventListener('resize', this.frameHandleResize)
            this.frameHandleResize()
        },
        methods: {
            ...mapActions(['deleteBetCartAll', 'getInformation', 'getMinigameBetListRecent', 'setCartMinigames']),
            frameHandleResize() {
                let sizeOfEleWidth = document.querySelector('.broadcast').offsetWidth
                if(sizeOfEleWidth > 830) {
                    document.querySelector('#frame-wrap-named').style.width = '100%'
                    document.querySelector('#frame-wrap-named').style.height = '565px'
                    document.querySelector('.iframe-game-named').style.width = '100%'
                    document.querySelector('.iframe-game-named').style.transform = 'scale(1.0)'
                }
                else {
                    document.querySelector('#frame-wrap-named').style.width = '830px'
                    document.querySelector('.iframe-game-named').style.width = '830px'

                    let sizeOfWidth = 830
                    let sizeOfHeight = 565

                    let windowWidth = window.innerWidth
                    let leftWidth = 280
                    let rightWidth = 280
                    let gameWidth = 0

                    if(windowWidth >= 1200) {
                        gameWidth = windowWidth - leftWidth - rightWidth - 112
                        if(gameWidth <= sizeOfWidth) {
                            sizeOfEleWidth = gameWidth
                        }
                    }

                    let resizePercentOfWidth = 0
                    resizePercentOfWidth = Math.floor(((sizeOfEleWidth / sizeOfWidth) * 1000) / 10) / 100

                    if(resizePercentOfWidth > 1) {
                        resizePercentOfWidth = 1.0
                    }

                    if(sizeOfEleWidth > sizeOfWidth) {
                        sizeOfEleWidth = sizeOfWidth;
                    }

                    let sizeOfEleHeight = Math.ceil(sizeOfHeight * resizePercentOfWidth)

                    if(sizeOfEleHeight > sizeOfHeight) {
                        sizeOfEleHeight = sizeOfHeight
                    }

                    if(sizeOfEleWidth > sizeOfWidth * resizePercentOfWidth) {
                        sizeOfEleWidth = Math.ceil(sizeOfWidth * resizePercentOfWidth)
                    }

                    document.querySelector('#frame-wrap-named').style.width = sizeOfEleWidth + 'px'
                    document.querySelector('#frame-wrap-named').style.height = sizeOfEleHeight + 'px'
                    document.querySelector('.iframe-game-named').style.transform = 'scale(' + resizePercentOfWidth + ')'
                }
            },
            timeSet() {
                let term = this.$config.powerladderTerm

                let now = (Date.now() + (this.serverTime - this.localTime))
                let distanceTime = ((this.gameTime - now) / 1000) - term

                let minute = '0' + Math.floor((distanceTime % (60 * 60)) / 60)
                let second = '0' + Math.floor((distanceTime % (60)))

                if(distanceTime <= 0) {
                    minute = '00'
                    second = '00'
                }

                if(minute.length > 2) { minute = minute.substring(1, 3) }
                if(second.length > 2) { second = second.substring(1, 3) }

                this.minute = minute
                this.second = second

                if(distanceTime <= 0) {
                    this.end = true
                    this.deleteBetCartAll()
                }
                else {
                    this.end = false
                }

                if(distanceTime <= (term + 3) * -1) {
                    clearInterval(this.gameInterval)
                    this.getGame()

                    clearTimeout(this.betlistInterval)
                    this.betlistInterval = setTimeout(() => {
                        this.getMinigameBetListRecent()
                        this.getInformation()
                    }, 15000)
                }
            },
            async getGame() {
                let r = await this.$http.get('/api/get-powerladder')

                if(!r.data) {
                    this.end = true
                    if(this.router === 'Powerladder') {
                        this.gameInterval = setInterval(() => {
                            this.timeSet()
                        }, 1000)
                    }
                    else {
                        clearInterval(this.gameInterval)
                        clearTimeout(this.betlistInterval)
                    }
                    return
                }

                //console.log(r.data.rotation, this.rotation)
                //if(r.data.rotation > 0 && r.data.rotation > this.rotation && this.rotation === 0) {
                this.getMinigameBetListRecent()
                //}

                this.id = r.data._id
                if(r.data.rotation > 0 && r.data.rotation > this.rotation) {
                    this.gameTime = new Date(this.$moment(r.data.gameDateTime).format('YYYY/MM/DD HH:mm:ss')).getTime()

                    this.localTime = Date.now()
                    this.serverTime = r.data.serverTime

                    this.rotation = r.data.rotation
                    this.round = r.data.round
                    this.games = r.data.games
                    if(!r.data.games.PLDOE) {
                        this.games.PLDOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.PLDLR) {
                        this.games.PLDLR = { rateOfLeft: null, rateOfRight: null }
                    }
                    if(!r.data.games.PLDTF) {
                        this.games.PLDTF = { rateOfThree: null, rateOfFour: null }
                    }
                    if(!r.data.games.PLDCOMBO) {
                        this.games.PLDCOMBO = { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
                    }
                }

                if(this.router === 'Powerladder') {
                    this.gameInterval = setInterval(() => {
                        this.timeSet()
                    }, 1000)
                }
                else {
                    clearInterval(this.gameInterval)
                    clearTimeout(this.betlistInterval)
                }
            },
            setBet(_id, betType, betSelect, selectRate) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                if(this.end || !selectRate) return

                if(betType === this.betType && betSelect === this.betSelect) {
                    this.deleteBetCartAll()
                }
                else {
                    let section = ''
                    if(betType === 'PLDOE' || betType === 'PLDLR' || betType === 'PLDTF') {
                        section = '#section1'
                    }
                    else {
                        section = '#section2'
                    }

                    if(window.innerWidth < 1200) {
                        this.$scrollTo(section, 300, { offset: -70 })
                    }

                    this.setCartMinigames({
                        _id,
                        gameInfo: `${this.round} (${this.rotation}) 회차`,
                        gameType: 'minigame',
                        gameKind: 'powerladder',
                        betType,
                        betSelect,
                        selectRate
                    })
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            window.removeEventListener('resize', this.frameHandleResize)
            clearInterval(this.gameInterval)
            clearTimeout(this.betlistInterval)
            this.deleteBetCartAll()
            // document.querySelector('#betAmount').value = 0
            // this.$store.commit('setBetAmount', 0)
            next()
        }
    }
</script>