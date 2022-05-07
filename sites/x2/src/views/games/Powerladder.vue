<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 pb-3 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            파워 사다리 <span>POWER LADDER</span>
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
                                    <div @click="$tools.pushRouter('/kenoladder', false)">키노사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball3', false)">EOS 3분</div>
                                </li>
                                <li>
                                    <div class="active" @click="$tools.pushRouter('/powerladder', false)">파워사다리</div>
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
                                    <li @click="$tools.pushRouter('/powerladder', false)">
                                        파워사다리
                                        <div class="active"></div>
                                    </li>
                                    <li @click="$tools.pushRouter('/kenoladder', false)">키노사다리</li>
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
                                                    <iframe class="iframe-game-ntry" src="https://ntry.com/scores/power_ladder/live.php" scrolling="no"></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-xl-none mt-3">
                                <div class="col">
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
                                        <div class="col pl-0">
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
                                    파워 사다리
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PLDLR' && betSelect === 'Left' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDLR', 'Left', games.PLDLR.rateOfLeft)"
                                    >
                                        <div>좌</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDLR.rateOfLeft ? $numeral(games.PLDLR.rateOfLeft).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PLDLR' && betSelect === 'Right' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDLR', 'Right', games.PLDLR.rateOfRight)"
                                    >
                                        <div>우</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDLR.rateOfRight ? $numeral(games.PLDLR.rateOfRight).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PLDTF' && betSelect === 'Three' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDTF', 'Three', games.PLDTF.rateOfThree)"
                                    >
                                        <div>3줄</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDTF.rateOfThree ? $numeral(games.PLDTF.rateOfThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PLDTF' && betSelect === 'Four' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDTF', 'Four', games.PLDTF.rateOfFour)"
                                    >
                                        <div>4줄</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDTF.rateOfFour ? $numeral(games.PLDTF.rateOfFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PLDOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDOE', 'Odd', games.PLDOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDOE.rateOfOdd ? $numeral(games.PLDOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PLDOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDOE', 'Even', games.PLDOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDOE.rateOfEven ? $numeral(games.PLDOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3" id="section2">
                                <div class="col-12">
                                    파워 사다리 조합
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PLDCOMBO' && betSelect === 'LeftThree' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDCOMBO', 'LeftThree', games.PLDCOMBO.rateOfLeftThree)"
                                    >
                                        <div>좌3</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDCOMBO.rateOfLeftThree ? $numeral(games.PLDCOMBO.rateOfLeftThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PLDCOMBO' && betSelect === 'LeftFour' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDCOMBO', 'LeftFour', games.PLDCOMBO.rateOfLeftFour)"
                                    >
                                        <div>좌4</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDCOMBO.rateOfLeftFour ? $numeral(games.PLDCOMBO.rateOfLeftFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PLDCOMBO' && betSelect === 'RightThree' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDCOMBO', 'RightThree', games.PLDCOMBO.rateOfRightThree)"
                                    >
                                        <div>우3</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDCOMBO.rateOfRightThree ? $numeral(games.PLDCOMBO.rateOfRightThree).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PLDCOMBO' && betSelect === 'RightFour' ? 'game-active' : ''"
                                        @click="setBet(id, 'PLDCOMBO', 'RightFour', games.PLDCOMBO.rateOfRightFour)"
                                    >
                                        <div>우4</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PLDCOMBO.rateOfRightFour ? $numeral(games.PLDCOMBO.rateOfRightFour).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2 mt-xl-5">
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
        name: 'Powerladder',
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
                    }, 20000)
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