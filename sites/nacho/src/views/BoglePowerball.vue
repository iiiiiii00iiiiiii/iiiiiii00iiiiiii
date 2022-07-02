<template>
    <div class="row mb-3" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col-12">
                    <NavMinigame/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'gamepad']"/>
                            <span class="ml-2">보글 파워볼 BOGLE POWERBALL</span>
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
                                            <div id="frame-wrap-bepick">
                                                <iframe class="iframe-game-bepick" src="https://bepick.net/live/bubblepower/scrap" scrolling="no"></iframe>
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
                                        <font-awesome-icon :icon="['fa', 'star']" class="text-light-brown"/> 보글 파워볼-<span class="text-light-brown">{{ round }}</span> (<span class="text-light-brown">{{ rotation }}</span>) 회차
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
                                    파워볼 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPOE' && betSelect === 'Odd' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPOE', 'Odd', games.PWBPOE.rateOfOdd)"
                                >
                                    <div class="bet" :class="end || !games.PWBPOE.rateOfOdd ? '' : 'blue'">
                                        <span>홀</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPOE.rateOfOdd ? $numeral(games.PWBPOE.rateOfOdd).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPOE' && betSelect === 'Even' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPOE', 'Even', games.PWBPOE.rateOfEven)"
                                >
                                    <div class="bet" :class="end || !games.PWBPOE.rateOfEven ? '' : 'red'">
                                        <span>짝</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPOE.rateOfEven ? $numeral(games.PWBPOE.rateOfEven).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPUO' && betSelect === 'Under' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPUO', 'Under', games.PWBPUO.rateOfUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBPUO.rateOfUnder ? '' : 'blue'">
                                        <span>언더</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPUO.rateOfUnder ? $numeral(games.PWBPUO.rateOfUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPUO' && betSelect === 'Over' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPUO', 'Over', games.PWBPUO.rateOfOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBPUO.rateOfOver ? '' : 'red'">
                                        <span>오버</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPUO.rateOfOver ? $numeral(games.PWBPUO.rateOfOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPCOMBO' && betSelect === 'OddUnder' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPCOMBO', 'OddUnder', games.PWBPCOMBO.rateOfOddUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBPCOMBO.rateOfOddUnder ? '' : 'blue'">
                                        <span>홀언</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddUnder ? $numeral(games.PWBPCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPCOMBO' && betSelect === 'EvenUnder' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPCOMBO', 'EvenUnder', games.PWBPCOMBO.rateOfEvenUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBPCOMBO.rateOfEvenUnder ? '' : 'blue'">
                                        <span>짝언</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenUnder ? $numeral(games.PWBPCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPCOMBO' && betSelect === 'OddOver' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPCOMBO', 'OddOver', games.PWBPCOMBO.rateOfOddOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBPCOMBO.rateOfOddOver ? '' : 'red'">
                                        <span>홀오</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddOver ? $numeral(games.PWBPCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBPCOMBO' && betSelect === 'EvenOver' ? 'active' : ''"
                                    @click="setBet(id, 'PWBPCOMBO', 'EvenOver', games.PWBPCOMBO.rateOfEvenOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBPCOMBO.rateOfEvenOver ? '' : 'red'">
                                        <span>짝오</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenOver ? $numeral(games.PWBPCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section2">
                                    일반볼 배팅
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNOE' && betSelect === 'Odd' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNOE', 'Odd', games.PWBNOE.rateOfOdd)"
                                >
                                    <div class="bet" :class="end || !games.PWBNOE.rateOfOdd ? '' : 'blue'">
                                        <span>홀</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNOE.rateOfOdd ? $numeral(games.PWBNOE.rateOfOdd).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNOE' && betSelect === 'Even' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNOE', 'Even', games.PWBNOE.rateOfEven)"
                                >
                                    <div class="bet" :class="end || !games.PWBNOE.rateOfEven ? '' : 'red'">
                                        <span>짝</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNOE.rateOfEven ? $numeral(games.PWBNOE.rateOfEven).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNUO' && betSelect === 'Under' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNUO', 'Under', games.PWBNUO.rateOfUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBNUO.rateOfUnder ? '' : 'blue'">
                                        <span>언더</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNUO.rateOfUnder ? $numeral(games.PWBNUO.rateOfUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNUO' && betSelect === 'Over' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNUO', 'Over', games.PWBNUO.rateOfOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBNUO.rateOfOver ? '' : 'red'">
                                        <span>오버</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNUO.rateOfOver ? $numeral(games.PWBNUO.rateOfOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNCOMBO' && betSelect === 'OddUnder' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNCOMBO', 'OddUnder', games.PWBNCOMBO.rateOfOddUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBNCOMBO.rateOfOddUnder ? '' : 'blue'">
                                        <span>홀언</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddUnder ? $numeral(games.PWBNCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNCOMBO' && betSelect === 'EvenUnder' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNCOMBO', 'EvenUnder', games.PWBNCOMBO.rateOfEvenUnder)"
                                >
                                    <div class="bet" :class="end || !games.PWBNCOMBO.rateOfEvenUnder ? '' : 'blue'">
                                        <span>짝언</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenUnder ? $numeral(games.PWBNCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNCOMBO' && betSelect === 'OddOver' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNCOMBO', 'OddOver', games.PWBNCOMBO.rateOfOddOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBNCOMBO.rateOfOddOver ? '' : 'red'">
                                        <span>홀오</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddOver ? $numeral(games.PWBNCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBNCOMBO' && betSelect === 'EvenOver' ? 'active' : ''"
                                    @click="setBet(id, 'PWBNCOMBO', 'EvenOver', games.PWBNCOMBO.rateOfEvenOver)"
                                >
                                    <div class="bet" :class="end || !games.PWBNCOMBO.rateOfEvenOver ? '' : 'red'">
                                        <span>짝오</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenOver ? $numeral(games.PWBNCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section3">
                                    대중소
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-4">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMS' && betSelect === 'Big' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMS', 'Big', games.PWBBMS.rateOfBig)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMS.rateOfBig ? '' : 'blue'">
                                        <span>대</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMS.rateOfBig ? $numeral(games.PWBBMS.rateOfBig).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMS' && betSelect === 'Middle' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMS', 'Middle', games.PWBBMS.rateOfMiddle)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMS.rateOfMiddle ? '' : 'red'">
                                        <span>중</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMS.rateOfMiddle ? $numeral(games.PWBBMS.rateOfMiddle).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMS' && betSelect === 'Small' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMS', 'Small', games.PWBBMS.rateOfSmall)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMS.rateOfSmall ? '' : 'green'">
                                        <span>소</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMS.rateOfSmall ? $numeral(games.PWBBMS.rateOfSmall).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div class="minigame-title" id="section4">
                                    대중소 조합
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddBig' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'OddBig', games.PWBBMSCOMBO.rateOfOddBig)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfOddBig ? '' : 'blue'">
                                        <span>홀대</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddBig ? $numeral(games.PWBBMSCOMBO.rateOfOddBig).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddMiddle' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'OddMiddle', games.PWBBMSCOMBO.rateOfOddMiddle)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfOddMiddle ? '' : 'blue'">
                                        <span>홀중</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddMiddle ? $numeral(games.PWBBMSCOMBO.rateOfOddMiddle).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddSmall' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'OddSmall', games.PWBBMSCOMBO.rateOfOddSmall)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfOddSmall ? '' : 'blue'">
                                        <span>홀소</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddSmall ? $numeral(games.PWBBMSCOMBO.rateOfOddSmall).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenBig' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'EvenBig', games.PWBBMSCOMBO.rateOfEvenBig)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfEvenBig ? '' : 'red'">
                                        <span>짝대</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenBig ? $numeral(games.PWBBMSCOMBO.rateOfEvenBig).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenMiddle' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'EvenMiddle', games.PWBBMSCOMBO.rateOfEvenMiddle)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfEvenMiddle ? '' : 'red'">
                                        <span>짝중</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenMiddle ? $numeral(games.PWBBMSCOMBO.rateOfEvenMiddle).format('0.00') : '--' }}
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    class="btn-minigame"
                                    :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenSmall' ? 'active' : ''"
                                    @click="setBet(id, 'PWBBMSCOMBO', 'EvenSmall', games.PWBBMSCOMBO.rateOfEvenSmall)"
                                >
                                    <div class="bet" :class="end || !games.PWBBMSCOMBO.rateOfEvenSmall ? '' : 'red'">
                                        <span>짝소</span>
                                    </div>
                                    <div class="rate">
                                        {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenSmall ? $numeral(games.PWBBMSCOMBO.rateOfEvenSmall).format('0.00') : '--' }}
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
    import NavMinigame from '../components/NavMinigame.vue'

    export default {
        name: 'BoglePowerball',
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
                    PWBPOE: { rateOfOdd: null, rateOfEven: null },
                    PWBPUO: { rateOfUnder: null, rateOfOver: null },
                    PWBPCOMBO: { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null },
                    PWBNOE: { rateOfOdd: null, rateOfEven: null },
                    PWBNUO: { rateOfUnder: null, rateOfOver: null },
                    PWBNCOMBO: { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null },
                    PWBBMS: { rateOfBig: null, rateOfMiddle: null, rateOfSmall: null },
                    PWBBMSCOMBO: { rateOfOddBig: null, rateOfOddMiddle: null, rateOfOddSmall: null, rateOfEvenBig: null, rateOfEvenMiddle: null, rateOfEvenSmall: null }
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
                let term = this.$config.boglePowerballTerm

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
                let r = await this.$http.get('/api/get-boglepowerball')

                if(!r.data) {
                    this.end = true
                    if(this.router === 'BoglePowerball') {
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
                    if(!r.data.games.PWBPOE) {
                        this.games.PWBPOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.PWBPUO) {
                        this.games.PWBPUO = { rateOfUnder: null, rateOfOver: null }
                    }
                    if(!r.data.games.PWBPCOMBO) {
                        this.games.PWBPCOMBO = { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null }
                    }
                    if(!r.data.games.PWBNOE) {
                        this.games.PWBNOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.PWBNUO) {
                        this.games.PWBNUO = { rateOfUnder: null, rateOfOver: null }
                    }
                    if(!r.data.games.PWBBMS) {
                        this.games.PWBBMS = { rateOfBig: null, rateOfMiddle: null, rateOfSmall: null }
                    }
                    if(!r.data.games.PWBNCOMBO) {
                        this.games.PWBNCOMBO = { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null }
                    }
                    if(!r.data.games.PWBBMSCOMBO) {
                        this.games.PWBBMSCOMBO = { rateOfOddBig: null, rateOfOddMiddle: null, rateOfOddSmall: null, rateOfEvenBig: null, rateOfEvenMiddle: null, rateOfEvenSmall: null }
                    }
                }

                if(this.router === 'BoglePowerball') {
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
                    if(betType === 'PWBPOE' || betType === 'PWBPUO' || betType === 'PWBPCOMBO') {
                        section = '#section1'
                    }
                    else if(betType === 'PWBNOE' || betType === 'PWBNUO' || betType === 'PWBNCOMBO') {
                        section = '#section2'
                    }
                    else if(betType === 'PWBBMS') {
                        section = '#section3'
                    }
                    else if(betType === 'PWBBMSCOMBO') {
                        section = '#section4'
                    }

                    if(window.innerWidth < 1200) {
                        this.$scrollTo(section, 300, { offset: -70 })
                    }

                    this.setCartMinigames({
                        _id,
                        gameInfo: `${this.round} (${this.rotation}) 회차`,
                        gameType: 'minigame',
                        gameKind: 'boglePowerball',
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