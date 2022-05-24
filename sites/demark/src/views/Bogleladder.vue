<template>
    <div class="row mb-3" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="row">
                <div class="col-12">
                    <NavMinigame/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="page-content-header">
                        <font-awesome-icon :icon="['fa', 'gamepad']"/>
                        보글 사다리 <span>BOGLE LADDER</span>
                        <span class="float-right">
                            <button class="btn-request-charge" @click="isHide = !isHide">
                                <font-awesome-icon :icon="['fa', isHide ? 'chevron-down' : 'chevron-up']"/>
                                {{ isHide ? '중계화면 열기' : '중계화면 닫기' }}
                            </button>
                        </span>
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
                                            <div id="frame-wrap-bepick">
                                                <iframe class="iframe-game-bepick" src="https://bepick.net/live/bubbleladder" scrolling="no"></iframe>
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
                                        <font-awesome-icon :icon="['fa', 'star']"/> 보글 사다리-<span>{{ round }}</span> (<span>{{ rotation }}</span>) 회차
                                    </div>
                                    <div class="float-right">
                                        <div class="game-time-box">
                                            <span>마감 : </span><span>{{ minute ? minute : '--' }}:{{ second ? second : '--' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 보글 사다리 -->
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section1">
                                    보글 사다리 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDLR' && betSelect === 'Left' ? 'active' : ''"
                                    @click="setBet(id, 'BLDLR', 'Left', games.BLDLR.rateOfLeft)"
                                >
                                    <div :class="end || !games.BLDLR.rateOfLeft ? '' : ''">
                                        <span>좌</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDLR.rateOfLeft ? $numeral(games.BLDLR.rateOfLeft).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-red "
                                    :class="betType === 'BLDLR' && betSelect === 'Right' ? 'active' : ''"
                                    @click="setBet(id, 'BLDLR', 'Right', games.BLDLR.rateOfRight)"
                                >
                                    <div :class="end || !games.BLDLR.rateOfRight ? '' : ''">
                                        <span>우</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDLR.rateOfRight ? $numeral(games.BLDLR.rateOfRight).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDTF' && betSelect === 'Three' ? 'active' : ''"
                                    @click="setBet(id, 'BLDTF', 'Three', games.BLDTF.rateOfThree)"
                                >
                                    <div :class="end || !games.BLDTF.rateOfThree ? '' : ''">
                                        <span>3줄</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDTF.rateOfThree ? $numeral(games.BLDTF.rateOfThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-red "
                                    :class="betType === 'BLDTF' && betSelect === 'Four' ? 'active' : ''"
                                    @click="setBet(id, 'BLDTF', 'Four', games.BLDTF.rateOfFour)"
                                >
                                    <div :class="end || !games.BLDTF.rateOfFour ? '' : ''">
                                        <span>4줄</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDTF.rateOfFour ? $numeral(games.BLDTF.rateOfFour).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDOE' && betSelect === 'Odd' ? 'active' : ''"
                                    @click="setBet(id, 'BLDOE', 'Odd', games.BLDOE.rateOfOdd)"
                                >
                                    <div :class="end || !games.BLDOE.rateOfOdd ? '' : ''">
                                        <span>홀</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDOE.rateOfOdd ? $numeral(games.BLDOE.rateOfOdd).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDOE' && betSelect === 'Even' ? 'active' : ''"
                                    @click="setBet(id, 'BLDOE', 'Even', games.BLDOE.rateOfEven)"
                                >
                                    <div :class="end || !games.BLDOE.rateOfEven ? '' : ''">
                                        <span>짝</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDOE.rateOfEven ? $numeral(games.BLDOE.rateOfEven).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 보글 사다리 조합 -->
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section2">
                                    보글 사다리 조합 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row my-1">
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDCOMBO' && betSelect === 'LeftThree' ? 'active' : ''"
                                    @click="setBet(id, 'BLDCOMBO', 'LeftThree', games.BLDCOMBO.rateOfLeftThree)"
                                >
                                    <div :class="end || !games.BLDCOMBO.rateOfLeftThree ? '' : ''">
                                        <span>좌3</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDCOMBO.rateOfLeftThree ? $numeral(games.BLDCOMBO.rateOfLeftThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-blue"
                                    :class="betType === 'BLDCOMBO' && betSelect === 'LeftFour' ? 'active' : ''"
                                    @click="setBet(id, 'BLDCOMBO', 'LeftFour', games.BLDCOMBO.rateOfLeftFour)"
                                >
                                    <div :class="end || !games.BLDCOMBO.rateOfLeftFour ? '' : ''">
                                        <span>좌4</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDCOMBO.rateOfLeftFour ? $numeral(games.BLDCOMBO.rateOfLeftFour).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-red"
                                    :class="betType === 'BLDCOMBO' && betSelect === 'RightThree' ? 'active' : ''"
                                    @click="setBet(id, 'BLDCOMBO', 'RightThree', games.BLDCOMBO.rateOfRightThree)"
                                >
                                    <div :class="end || !games.BLDCOMBO.rateOfRightThree ? '' : ''">
                                        <span>우3</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDCOMBO.rateOfRightThree ? $numeral(games.BLDCOMBO.rateOfRightThree).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame btn-bet-red"
                                    :class="betType === 'BLDCOMBO' && betSelect === 'RightFour' ? 'active' : ''"
                                    @click="setBet(id, 'BLDCOMBO', 'RightFour', games.BLDCOMBO.rateOfRightFour)"
                                >
                                    <div :class="end || !games.BLDCOMBO.rateOfRightFour ? '' : ''">
                                        <span>우4</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.BLDCOMBO.rateOfRightFour ? $numeral(games.BLDCOMBO.rateOfRightFour).format('0.00') : '--' }}
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

    import NavMinigame from '../components/NavMinigame'
    import MinigameBetListRecent from '../components/MinigameBetListRecent.vue'

    export default {
        name: 'Bogleladder',
        components: {
            MinigameBetListRecent,
            NavMinigame
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
                    BLDOE: { rateOfOdd: null, rateOfEven: null },
                    BLDLR: { rateOfLeft: null, rateOfRight: null },
                    BLDTF: { rateOfThree: null, rateOfFour: null },
                    BLDCOMBO: { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
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
                    document.querySelector('#frame-wrap-bepick').style.width = '100%'
                    document.querySelector('#frame-wrap-bepick').style.height = '660px'
                    document.querySelector('.iframe-game-bepick').style.width = '100%'
                    document.querySelector('.iframe-game-bepick').style.transform = 'scale(1.0)'
                }
                else {
                    document.querySelector('#frame-wrap-bepick').style.width = '830px'
                    document.querySelector('.iframe-game-bepick').style.width = '830px'

                    let sizeOfWidth = 830
                    let sizeOfHeight = 660

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

                    document.querySelector('#frame-wrap-bepick').style.width = sizeOfEleWidth + 'px'
                    document.querySelector('#frame-wrap-bepick').style.height = sizeOfEleHeight + 'px'
                    document.querySelector('.iframe-game-bepick').style.transform = 'scale(' + resizePercentOfWidth + ')'
                }
            },
            timeSet() {
                let term = this.$config.bogleladderTerm

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
                let r = await this.$http.get('/api/get-bogleladder')

                if(!r.data) {
                    this.end = true
                    if(this.router === 'Bogleladder') {
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
                    if(!r.data.games.BLDOE) {
                        this.games.BLDOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.BLDLR) {
                        this.games.BLDLR = { rateOfLeft: null, rateOfRight: null }
                    }
                    if(!r.data.games.BLDTF) {
                        this.games.BLDTF = { rateOfThree: null, rateOfFour: null }
                    }
                    if(!r.data.games.BLDCOMBO) {
                        this.games.BLDCOMBO = { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
                    }
                }

                if(this.router === 'Bogleladder') {
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
                    if(betType === 'BLDOE' || betType === 'BLDLR' || betType === 'BLDTF') {
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
                        gameKind: 'bogleladder',
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