<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 header-mobile-left-wrap">
                <font-awesome-icon :icon="['fa', 'bars']" class="icon-mobile-bars" @click="openLeftSide()"/>
            </div>
            <div class="col-8 header-mobile-logo-wrap">
                <img src="/images/logo.png" class="mobile-logo" alt="로고" title="로고" data-aos="flip-up" data-aos-duration="1500" @click="$tools.pushRouter('/', false)">
            </div>
            <div class="col-2 header-mobile-right-wrap">
                <font-awesome-icon :icon="['fa', 'sign-in-alt']" class="icon-mobile-sign-in-alt" v-show="!isLogin" @click="$tools.pushRouter('/login', false)"/>
                <span class="cart-count" v-show="isLogin" @click="openRightSide()"> {{ betCart.length }} </span>
                <font-awesome-icon :icon="['fa', 'shopping-cart']" class="icon-mobile-sign-in-alt" v-show="isLogin" @click="openRightSide()"/>
            </div>
        </div>
        <!-- <div class="row mt-2">
            <div class="col">
                <div class="header-mobile-menu">
                    <div class="header-mobile-menu-wrap">
                        <ul>
                            <li @click="$tools.pushRouter('/sports')">해외형 스포츠</li>
                            <li @click="$tools.pushRouter('/sportscross')">국내형 스포츠</li>
                            <li @click="$tools.pushRouter('/sportslive')">라이브 스포츠</li>
                            <li @click="$tools.pushRouter('/sportsspecial', false)">스페셜</li>
                            <li @click="$tools.pushRouter('/sportslivekor', false)">실시간</li>
                            <li @click="$tools.pushRouter('/powerball', false)">미니게임</li>
                            <li @click="$tools.pushRouter('/rules', false)">경기규정</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row mt-2 header-mobile-menu" v-if="isLogin">
            <div class="col text-yellow fs-075rem">
                <div class="pl-2 pt-1">
                    <font-awesome-icon :icon="['fa', 'won-sign']"/>
                    {{ $numeral(user.money).format('0,0') }}
                </div>
            </div>
            <div class="col text-yellow fs-075rem">
                <div class="pl-2 pt-1 text-center">
                    <font-awesome-icon :icon="['fab', 'paypal']"/>
                    {{ $numeral(user.minigameMoney).format('0,0') }}
                </div>
            </div>
            <div class="col text-yellow fs-075rem">
                <div class="pr-2 pt-1 text-right" @click="$tools.pushRouter('/point', true)">
                    <font-awesome-icon :icon="['fa', 'coins']"/>
                    {{ $numeral(user.point).format('0,0') }}
                </div>
            </div>
        </div>
        <b-sidebar
            id="leftSide"
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
            <LeftMenu/>
            <LeftMinigameCategory
                v-if="router === 'Powerball' ||
                router === 'Powerladder' ||
                router === 'Kenoladder' ||
                router === 'BoglePowerball' ||
                router === 'Bogleladder' ||
                router === 'GooglePowerball1' ||
                router === 'GooglePowerball3' ||
                router === 'CoinPowerball'"
            />
            <LeftCategory v-else/>
            <BannerLeft/>
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
            <UserBox v-show="isLogin"/>
            <BetSlip from="mobile"/>
            <BannerRight/>
        </b-sidebar>
    </div>
</template>

<script>
    import LeftMenu from '../components/LeftMenu.vue'
    import LeftCategory from '../components/LeftCategory.vue'
    import LeftMinigameCategory from '../components/LeftMinigameCategory.vue'
    import BannerLeft from '../components/BannerLeft.vue'
    import LoginBox from '../components/LoginBox.vue'
    import UserBox from '../components/UserBox.vue'
    import BetSlip from '../components/BetSlip.vue'
    import BannerRight from '../components/BannerRight.vue'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'HeaderMobile',
        components: {
            LeftMenu,
            LeftCategory,
            LeftMinigameCategory,
            BannerLeft,
            LoginBox,
            UserBox,
            BetSlip,
            BannerRight
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

<style lang="scss" scoped>
    .header-mobile-left-wrap {
        padding-top: 14px;
        padding-left: 15px;

        .icon-mobile-bars {
            font-size: 1.75rem;
            color: #c2c2c2;
        }
    }
    .header-mobile-logo-wrap {
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: center;

        .mobile-logo {
            height: 40px;
            cursor: pointer;
        }
    }
    .header-mobile-right-wrap {
        padding-top: 14px;
        padding-right: 15px;
        text-align: right;

        .icon-mobile-sign-in-alt {
            font-size: 1.75rem;
            color: #c2c2c2;
        }

        .cart-count {
            position: absolute;
            top: 19px;
            right: 27px;
            padding-top: 2px;
            width: 25px;
            height: 25px;
            border: 1px solid #8a641d;
            border-radius: 50%;
            background-color: #7a5a1e;
            display: inline-block;
            color: #fff;
            font-size: 0.75rem;
            font-weight: 700;
            text-align: center;
        }
    }
    .header-mobile-menu {
        overflow-x: auto;
        &::-webkit-scrollbar {
            width: 3px; /*스크롤바의 너비*/
            height: 3px; /*스크롤바의 높이*/
        }
        &::-webkit-scrollbar-thumb {
            background-color: inherit; /*스크롤바의 색상*/
        }
        &::-webkit-scrollbar-track {
            background-color: inherit; /*스크롤바 트랙 색상*/
        }

        padding-top: 10px;
        padding-bottom: 7px;
        border-top: 2px solid #7a5a1e;
        border-bottom: 1px solid #271f18;

        .header-mobile-menu-wrap {
            width: 530px;

            ul {
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding-left: 10px;
                    padding-right: 10px;
                    float: left;
                    color: #c2c2c2;
                    font-size: 0.75rem;
                    font-weight: 700;
                }
            }
        }
    }
</style>