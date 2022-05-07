<template>
    <div>
        <div class="container-fluid pt-3">
            <div class="row text-white">
                <div class="col-2 text-center">
                    <font-awesome-icon
                        class="bars-join"
                        :icon="['fa', 'user-plus']"
                        v-if="!isLogin"
                        @click="$tools.routerPush('/join')"
                    />
                    <font-awesome-icon
                        class="bars-top"
                        :icon="['fa', 'bars']"
                        v-if="isLogin"
                        @click="openAside()"
                    />
                </div>
                <div class="col-8">
                    <div class="row">
                        <div class="col-12 logo-top">
                            <img
                                src="/images/logo.png"
                                class="cursor-pointer"
                                @click="$tools.routerPush('/')"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-2 text-center">
                    <font-awesome-icon
                        class="bars-login"
                        :icon="['fa', 'sign-in-alt']"
                        v-if="!isLogin"
                        @click="$tools.routerPush('/login')"
                    />
                    <div @click="openBside()">
                        <span
                            class="cart-count d-xl-none"
                            v-if="isLogin"
                        >
                            {{ betCart.length }}
                        </span>
                        <font-awesome-icon
                            class="bars-cart"
                            :icon="['fa', 'shopping-cart']"
                            v-if="isLogin"
                        />
                    </div>
                </div>
            </div>
            <div class="row mt-3 bg-topmenu">
                <div class="col-1 col-xl-2 d-none d-xl-block"></div>
                <div class="col-10 col-xl-8 d-none d-xl-block">
                    <div class="row text-center">
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'Sports' ? 'active' : ''"
                            @click="$tools.routerPush('/sports')"
                        >스포츠</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'SportsLive' ? 'active' : ''"
                            @click="$tools.routerPush('/sportslive')"
                        >라이브</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'SportsCross' ? 'active' : ''"
                            @click="$tools.routerPush('/sportscross')"
                        >크로스</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'SportsSpecial' ? 'active' : ''"
                            @click="$tools.routerPush('/sportsspecial')"
                        >스페셜</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'SportsLiveKor' ? 'active' : ''"
                            @click="$tools.routerPush('/sportslivekor')"
                        >실시간</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'Powerball' || thisRouter === 'Powerladder' || thisRouter === 'Kenoladder' ? 'active' : ''"
                            @click="/*$tools.ready()*/$tools.routerPush('/powerball')"
                        >미니게임</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'Casino' || thisRouter === 'Slot' ? 'active' : ''"
                            @click="$tools.routerPush('/casino')"
                        >카지노</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'Charge' ? 'active' : ''"
                            @click="$tools.routerPush('/charge')"
                        >입금</div>
                        <div class="line-topmenu"></div>
                        <div
                            class="col item-topmenu"
                            :class="thisRouter === 'Exchange' ? 'active' : ''"
                            @click="$tools.routerPush('/exchange')"
                        >출금</div>
                        <div class="line-topmenu"></div>
                    </div>
                </div>
                <div class="col-1 col-xl-2 d-none d-xl-block"></div>
            </div>
        </div>

        <b-sidebar
            id="aside"
            backdrop
            shadow
            no-header
            v-model="showAside"
            @hidden="closedAside"
        >
            <div class="container-fluid aside">
                <div class="row">
                    <div class="col-12 p-0">
                        <LoginBox/>
                    </div>
                    <div class="col-12 p-0">
                        <Aside from="a"/>
                    </div>
                    <div class="col-12 p-0 pb-2 bg-dark">
                        <Category/>
                    </div>
                </div>
            </div>
        </b-sidebar>

        <b-sidebar
            id="bside"
            bg-variant="dark"
            backdrop
            shadow
            no-header
            right
            v-model="showBside"
            @hidden="closedBside"
        >
            <div class="container-fluid bside">
                <div class="row">
                    <div class="col-12 p-0">
                        <BetSlip from="mobile"/>
                    </div>
                </div>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
import LoginBox from "@/components/LoginBox.vue"
import Aside from "@/components/Aside.vue"
import Category from "@/components/Category.vue"
import BetSlip from "@/components/BetSlip.vue"

export default {
    name: 'NavTop',
    components: {
        LoginBox,
        Aside,
        Category,
        BetSlip
    },
    data() {
        return {
            routeName: '',
            canAccess: false,
            showAside: false,
            showBside: false,
            tmpBetCart: []
        }
    },
    created() {
        //this.routeName = this.$route.name
        //let partnerRouter = this.$store.state.partnerRouter
        //this.canAccess = partnerRouter.canAccess
    },
    methods: {
        currentMenu(routeName) {
            return routeName === this.routeName
                ? 'font-weight-bold text-danger'
                : ''
        },
        goPopup(url) {
            window.open(url)
        },
        openAside() {
            if(this.thisRouter === 'Powerball' || this.thisRouter === 'Powerladder' || this.thisRouter === 'Kenoladder') {
                this.setTmpBetCart()
            }
            this.showAside = true
            document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
        },
        closedAside() {
            if(this.thisRouter === 'Powerball' || this.thisRouter === 'Powerladder' || this.thisRouter === 'Kenoladder') {
                this.restoreBetCart()
            }
            document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
        },
        openBside() {
            if(this.thisRouter === 'Powerball' || this.thisRouter === 'Powerladder' || this.thisRouter === 'Kenoladder') {
                this.setTmpBetCart()
            }
            this.showBside = true
            document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
        },
        closedBside() {
            if(this.thisRouter === 'Powerball' || this.thisRouter === 'Powerladder' || this.thisRouter === 'Kenoladder') {
                this.restoreBetCart()
            }
            document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
        },
        setTmpBetCart() {
            this.tmpBetCart = this.betCart
            this.$store.commit('deleteBetCartAll')
        },
        restoreBetCart() {
            if(this.tmpBetCart.length > 0) {
                if(this.tmpBetCart[0].gameKind === this.thisRouter.toLowerCase()) {
                    this.$store.commit('setBetCartMinigames', this.tmpBetCart[0])
                    return
                }
                this.tmpBetCart = []
            }
        }
    },
    computed: {
        betCart() {
            return this.$store.state.betCart
        },
        thisRouter() {
            return this.$store.state.router
        },
        isLogin() {
            return this.$store.state.isLogin
        },
        nick() {
            return this.$store.state.user.nick
        },
        grade() {
            return this.$store.state.user.grade
        },
        money() {
            return this.$numeral(this.$store.state.user.money).format('0,0')
        },
        point() {
            return this.$numeral(this.$store.state.user.point).format('0,0')
        },
        messageCount() {
            return this.$numeral(this.$store.state.user.messageCount).format('0,0')
        },
        betMoney() {
            return this.$numeral(this.$store.state.user.betMoney).format('0,0')
        }
    }
}
</script>

<style lang="scss">
    .logo-top {
        text-align: center;

        @media (min-width: 1200px) {
            text-align: left;
        }

        img {
            width: 200px;

            @media (min-width: 1200px) {
                width: 250px;
            }
        }
    }
    .bg-topmenu {
        border-top: 2px solid #000000;
        border-bottom: 2px solid #000000;
        background: linear-gradient(180deg, #2d353c, #222);
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;

        .item-topmenu {
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
            border-bottom: 3px solid #222;
            cursor: pointer;

            &:hover {
                background: #232a2f;
                border-bottom: 3px solid #ff0033;
            }
        }

        .active {
            background: #232a2f;
            border-bottom: 3px solid #ff0033;
        }

        .line-topmenu {
            width: 1px;
            background-color: #000000;
        }
    }
    .button-top {
        background-color: #2e3d59 !important;
        border-radius: 0 !important;
        color: #ffffff !important;
    }
    .button-top-user {
        background-color: #a80a18 !important;
    }
    .bars-join,
    .bars-login,
    .bars-top,
    .bars-cart {
        cursor: pointer;
        font-size: 30px;
        @media (min-width: 1200px) {
            display: none;
        }
    }
    .aside {
        height: 100% !important;
        background-color: #2d343b;
    }
    .cart-count {
        position: absolute;
        top: 5px;
        right: 35px;
        padding-top: 2px;
        width: 25px;
        height: 25px;
        border: 1px solid #990033;
        border-radius: 50%;
        background-color: #b00400;
        display: inline-block;
        font-weight: 600;
    }
</style>