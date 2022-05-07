<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 pb-3 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            키노 사다리 <span>KENO LADDER</span>
                        </div>
                    </div>
                    <div class="col-7 text-right d-none d-xl-block">
                        <div class="minigame-menu">
                            <ul>
                                <li>
                                    <div @click="$tools.pushRouter('/googlepowerball1', false)">구글 1분</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/googlepowerball3', false)">구글 3분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/speedladder', false)">스피드사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/coinpowerball', false)">코인 5분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/bogleladder', false)">보글사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/coinpowerball3', false)">코인 3분</div>
                                </li>
                                <li>
                                    <div  @click="$tools.pushRouter('/boglepowerball', false)">보글파워볼</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball', false)">EOS 5분</div>
                                </li>
                                <li>
                                    <div class="active" @click="$tools.pushRouter('/kenoladder', false)">키노사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball3', false)">EOS 3분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/powerladder', false)">파워사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball1', false)">EOS 1분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/powerball', false)">파워볼</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col px-0 d-xl-none">
                        <div class="header-mobile-menu">
                            <div class="header-mobile-menu-wrap">
                                <ul>
                                    <li @click="$tools.pushRouter('/powerball', false)">파워볼</li>
                                    <li @click="$tools.pushRouter('/powerladder', false)">파워사다리</li>
                                    <li @click="$tools.pushRouter('/kenoladder', false)">
                                        키노사다리
                                        <div class="active"></div>
                                    </li>
                                    <li @click="$tools.pushRouter('/boglepowerball', false)">보글파워볼</li>
                                    <li @click="$tools.pushRouter('/bogleladder', false)">보글사다리</li>
                                    <li @click="$tools.pushRouter('/speedladder', true)">스피드사다리</li>
                                    <li @click="$tools.pushRouter('/googlepowerball1', false)">구글 1분</li>
                                    <li @click="$tools.pushRouter('/googlepowerball3', false)">구글 3분</li>
                                    <li @click="$tools.pushRouter('/eospowerball1', false)">EOS 1분</li>
                                    <li @click="$tools.pushRouter('/eospowerball3', false)">EOS 3분</li>
                                    <li @click="$tools.pushRouter('/eospowerball', false)">EOS 5분</li>
                                    <li @click="$tools.pushRouter('/coinpowerball3', false)">코인 3분</li>
                                    <li @click="$tools.pushRouter('/coinpowerball', false)">코인 5분</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="d-none d-xl-block">
                <div class="row mt-3">
                    <div class="col">
                        <div class="minigames px-xl-3">
                            <div class="row mt-1" v-show="!isHide">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="broadcast">
                                                <div id="frame-wrap-ntry">
                                                    <iframe class="iframe-game-ntry" src="https://ntry.com/scores/keno_ladder/live.php" scrolling="no"></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col d-xl-none">
                                    <div class="row">
                                        <div class="col pl-5">
                                            <div class="game-title-time-second">
                                                중계 접기
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="game-title-time">
                                                마감 : {{ minute ? minute : '--' }}:{{ second ? second : '--' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 game-title-round">
                                            <span class="text-blue">{{ round }}</span> (<span class="text-blue">{{ rotation }}</span>) 회차
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-xl-4">
                                <div class="col d-none d-xl-block">
                                    <div class="row">
                                        <div class="col-7 game-title-round">
                                            <span class="text-blue">{{ round }}</span> (<span class="text-blue">{{ rotation }}</span>) 회차
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                중계 접기
                                            </div>
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                게임방법
                                            </div>
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                공식홈페이지
                                            </div>
                                        </div>
                                        <div class="col pl-xl-0">
                                            <div class="game-title-time">
                                                마감 : {{ minute ? minute : '--' }}:{{ second ? second : '--' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-0 mt-xl-3">
                            <div class="row mt-3" id="section1">
                                <div class="col-12">
                                    키노 사다리
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'KLDLR' && betSelect === 'Left' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDLR', 'Left', games.KLDLR.rateOfLeft)"
                                    >
                                        <div>좌</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDLR.rateOfLeft ? $numeral(games.KLDLR.rateOfLeft).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'KLDLR' && betSelect === 'Right' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDLR', 'Right', games.KLDLR.rateOfRight)"
                                    >
                                        <div>우</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDLR.rateOfRight ? $numeral(games.KLDLR.rateOfRight).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'KLDTF' && betSelect === 'Three' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDTF', 'Three', games.KLDTF.rateOfThree)"
                                    >
                                        <div>3줄</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDTF.rateOfThree ? $numeral(games.KLDTF.rateOfThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'KLDTF' && betSelect === 'Four' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDTF', 'Four', games.KLDTF.rateOfFour)"
                                    >
                                        <div>4줄</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDTF.rateOfFour ? $numeral(games.KLDTF.rateOfFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'KLDOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDOE', 'Odd', games.KLDOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDOE.rateOfOdd ? $numeral(games.KLDOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'KLDOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDOE', 'Even', games.KLDOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDOE.rateOfEven ? $numeral(games.KLDOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3" id="section2">
                                <div class="col-12">
                                    키노 사다리 조합
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'KLDCOMBO' && betSelect === 'LeftThree' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDCOMBO', 'LeftThree', games.KLDCOMBO.rateOfLeftThree)"
                                    >
                                        <div>좌3</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDCOMBO.rateOfLeftThree ? $numeral(games.KLDCOMBO.rateOfLeftThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'KLDCOMBO' && betSelect === 'LeftFour' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDCOMBO', 'LeftFour', games.KLDCOMBO.rateOfLeftFour)"
                                    >
                                        <div>좌4</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDCOMBO.rateOfLeftFour ? $numeral(games.KLDCOMBO.rateOfLeftFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'KLDCOMBO' && betSelect === 'RightThree' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDCOMBO', 'RightThree', games.KLDCOMBO.rateOfRightThree)"
                                    >
                                        <div>우3</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDCOMBO.rateOfRightThree ? $numeral(games.KLDCOMBO.rateOfRightThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'KLDCOMBO' && betSelect === 'RightFour' ? 'game-active' : ''"
                                        @click="setBet(id, 'KLDCOMBO', 'RightFour', games.KLDCOMBO.rateOfRightFour)"
                                    >
                                        <div>우4</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.KLDCOMBO.rateOfRightFour ? $numeral(games.KLDCOMBO.rateOfRightFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <MinigameBetListRecent/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import MinigameBetListRecent from '@/components/MinigameBetListRecent.vue'
    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Kenoladder',
        components: {
            MinigameBetListRecent,
            UrgentNotice
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
                    KLDOE: { rateOfOdd: null, rateOfEven: null },
                    KLDLR: { rateOfLeft: null, rateOfRight: null },
                    KLDTF: { rateOfThree: null, rateOfFour: null },
                    KLDCOMBO: { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
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
                    document.querySelector('#frame-wrap-ntry').style.width = '830px'
                    document.querySelector('#frame-wrap-ntry').style.height = '641px'
                    document.querySelector('.iframe-game-ntry').style.width = '830px'
                    document.querySelector('.iframe-game-ntry').style.transform = 'scale(1.0)'
                }
                else {
                    document.querySelector('#frame-wrap-ntry').style.width = '830px'
                    document.querySelector('.iframe-game-ntry').style.width = '830px'

                    let sizeOfWidth = 830
                    let sizeOfHeight = 641

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

                    document.querySelector('#frame-wrap-ntry').style.width = sizeOfEleWidth + 'px'
                    document.querySelector('#frame-wrap-ntry').style.height = sizeOfEleHeight + 'px'
                    document.querySelector('.iframe-game-ntry').style.transform = 'scale(' + resizePercentOfWidth + ')'
                }
            },
            timeSet() {
                let term = this.$config.kenoladderTerm

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
                    }, 20000)
                }
            },
            async getGame() {
                let r = await this.$http.get('/api/get-kenoladder')

                if(!r.data) {
                    this.end = true
                    if(this.router === 'Kenoladder') {
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
                    if(!r.data.games.KLDOE) {
                        this.games.KLDOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.KLDLR) {
                        this.games.KLDLR = { rateOfLeft: null, rateOfRight: null }
                    }
                    if(!r.data.games.KLDTF) {
                        this.games.KLDTF = { rateOfThree: null, rateOfFour: null }
                    }
                    if(!r.data.games.KLDCOMBO) {
                        this.games.KLDCOMBO = { rateOfLeftThree: null, rateOfLeftFour: null, rateOfRightThree: null, rateOfRightFour: null }
                    }
                }

                if(this.router === 'Kenoladder') {
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
                    if(betType === 'KLDOE' || betType === 'KLDLR' || betType === 'KLDTF') {
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
                        gameKind: 'kenoladder',
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

<style lang="scss" scoped>
    .header-mobile-menu {
        overflow-x: auto;
        &::-webkit-scrollbar {
            width: 1px; /*스크롤바의 너비*/
            height: 1px; /*스크롤바의 높이*/
        }
        &::-webkit-scrollbar-thumb {
            background-color: inherit; /*스크롤바의 색상*/
        }
        &::-webkit-scrollbar-track {
            background-color: inherit; /*스크롤바 트랙 색상*/
        }
        padding-top: 20px;
        padding-bottom: 0;

        .header-mobile-menu-wrap {
            width: 1060px;

            ul {
                
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding-left: 15px;
                    padding-right: 5px;
                    float: left;
                    color: #333;
                    font-size: 0.9375rem;
                    font-weight: 500;
                    
                    .active {
                        padding: 1px;
                        border-bottom: 1px solid #0E3B72;
                    }
                }
            }
        }
    }
</style>