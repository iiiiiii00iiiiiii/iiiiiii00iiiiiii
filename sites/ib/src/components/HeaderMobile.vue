<template>
    <div class="header-mobile-layout">
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 header-mobile-left-wrap">
                    <img src="/images/icon-mobile-bars-1.png" class="icon-mobile-bars" @click="openLeftSide()">
                </div>
                <div class="col-8 header-mobile-logo-wrap">
                    <img src="/images/logo.png" class="mobile-logo" alt="로고" title="로고" data-aos="flip-up" data-aos-duration="1500" @click="$tools.pushRouter('/', false)">
                </div>
                <div class="col-2 header-mobile-right-wrap">
                    <img src="/images/icon-mobile-bars.png" class="icon-mobile-sign-in-alt" v-show="!isLogin" @click="$tools.pushRouter('/login', false)">
                    <span class="cart-count-box">
                        <span class="cart-count" v-show="isLogin" @click="openRightSide()"> {{ betCart.length }} </span>
                    </span>
                    <img src="/images/icon-mobile-bars-2.png" class="icon-mobile-sign-in-alt" v-show="isLogin" @click="openRightSide()">
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 px-0">
                    <div class="header-mobile-menu">
                        <div class="header-mobile-menu-wrap">
                            <ul>
                                <li @click="$tools.pushRouter('/sports', false)">
                                    <img src="/images/icon-sports-menu.png" alt="유럽형" class="menu-img">
                                    <span>유럽형</span>
                                </li>
                                <li @click="$tools.pushRouter('/sportscross', false)">
                                    <img src="/images/icon-sports-menu-1.png" alt="국내형" class="menu-img">
                                    <span>국내형</span>
                                </li>
                                <li @click="$tools.pushRouter('/sportslive', false)">
                                    <img src="/images/icon-sports-menu-2.png" alt="라이브" class="menu-img">
                                    <span>라이브</span>
                                </li>
                                <li @click="$tools.pushRouter('/sportsspecial', false)">
                                    <img src="/images/icon-sports-menu-3.png" alt="스페셜" class="menu-img">
                                    <span>스페셜</span>
                                </li>
                                <li @click="$tools.pushRouter('/sportslivekor', false)">
                                    <img src="/images/icon-sports-menu-4.png" alt="실시간" class="menu-img">
                                    <span>실시간</span>
                                </li>
                                <li class="mr-2" @click="$tools.pushRouter('/minigamemenu', false)">
                                    <img src="/images/icon-sports-menu-5.png" alt="실시간" class="menu-img">
                                    <span>미니게임</span>
                                </li>
                                <li @click="$tools.pushRouter('/casino', false)">
                                    <img src="/images/icon-sports-menu-6.png" alt="실시간" class="menu-img">
                                    카지노
                                </li>
                                <li @click="openKplay(0)">
                                    <img src="/images/icon-sports-menu-7.png" alt="실시간" class="menu-img">
                                    <span>슬롯</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <b-sidebar
                id="leftSide"
                class="right-category"
                backdrop
                shadow
                no-header
                width="280px"
                body-class="left-side"
                v-model="showLeftSide"
                @hidden="closedLeftSide()"
            >
                <LoginBox v-show="!isLogin"/>
                <UserBox v-show="isLogin"/>
                <LeftLiveInplay/>
                <!-- <LeftMinigameCategory
                    v-if="router === 'Powerball' ||
                    router === 'Powerladder' ||
                    router === 'Kenoladder' ||
                    router === 'BoglePowerball' ||
                    router === 'Bogleladder' ||
                    router === 'GooglePowerball1' ||
                    router === 'GooglePowerball3'"
                /> -->
                <LeftCategory/>
            </b-sidebar>

            <b-sidebar
                id="rightSide"
                backdrop
                shadow
                no-header
                right
                width="280px"
                body-class="right-side"
                v-model="showRightSide"
                @hidden="closedRightSide()"
            >
                <BetSlip from="mobile"/>
                <RightEvent/>
            </b-sidebar>
        </div>
    </div>
</template>

<script>
    import LeftLiveInplay from '../components/LeftLiveInplay.vue'
    import LeftCategory from '../components/LeftCategory.vue'
    // import LeftMinigameCategory from '../components/LeftMinigameCategory.vue'
    import LoginBox from '../components/LoginBox.vue'
    import UserBox from '../components/UserBox.vue'
    import BetSlip from '../components/BetSlip.vue'
    import RightEvent from '../components/RightEvent.vue'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'HeaderMobile',
        components: {
            LeftLiveInplay,
            LeftCategory,
            // LeftMinigameCategory,
            LoginBox,
            UserBox,
            BetSlip,
            RightEvent
        },
        computed: {
            ...mapGetters(['isLogin', 'betCart', 'router', 'user'])
        },
        data() {
            return {
                showLeftSide: false,
                showRightSide: false,
                tmpBetCart: []
            }
        },
        methods: {
            ...mapActions(['deleteBetCartAll', 'setCartMinigames', 'setShowSideBars']),
            openLeftSide() {
                this.setShowSideBars(true)
                this.showLeftSide = true
                document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
            },
            closedLeftSide() {
                this.setShowSideBars(false)
                document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
            },
            openRightSide() {
                this.setShowSideBars(true)
                this.showRightSide = true
                document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
            },
            closedRightSide() {
                this.setShowSideBars(false)
                document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
            },
            setTmpBetCart() {
                this.tmpBetCart = this.betCart
                this.deleteBetCartAll()
            },
            restoreBetCart() {
                if(this.tmpBetCart.length > 0) {
                    if(this.tmpBetCart[0].gameKind.toLowerCase() === this.router.toLowerCase()) {
                        this.setCartMinigames(this.tmpBetCart[0])
                        return
                    }
                    this.tmpBetCart = []
                }
            },
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            }
        }
    }
</script>
