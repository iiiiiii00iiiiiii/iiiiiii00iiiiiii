<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col py-1">
                <div class="row">
                    <div class="col-2 header-mobile-left-wrap">
                        <img src="/images/icon-mobile-bars.png" class="icon-mobile-bars" @click="openLeftSide()">
                    </div>
                    <div class="col-3 header-mobile-logo-wrap" v-if="!isLogin">
                        <button type="button" class="btn-mobile-login" @click="$tools.pushRouter('/Login', false)">로그인</button>
                        <!-- <img src="/images/meta.png" class="mobile-logo" alt="로고" title="로고" data-aos="flip-up" data-aos-duration="1500" @click="$tools.pushRouter('/', false)"> -->
                    </div>
                    <div class="col-3 header-mobile-logo-wrap" v-if="!isLogin">
                        <button type="button" class="btn-mobile-join" @click="$tools.pushRouter('/join', false)">회원가입</button>
                    </div>
                    <div class="col header-mobile-right-wrap text-right">
                        <img src="/images/meta-mlogo.png"  @click="$tools.pushRouter('/', false)">
                        <!-- <font-awesome-icon :icon="['fa', 'sign-in-alt']" class="icon-mobile-sign-in-alt" v-show="!isLogin" @click="$tools.pushRouter('/login', false)"/>
                        <span class="cart-count" v-show="isLogin" @click="openRightSide()"> {{ betCart.length }} </span>
                        <font-awesome-icon :icon="['fa', 'shopping-cart']" class="icon-mobile-sign-in-alt" v-show="isLogin" @click="openRightSide()"/> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col px-0 mt-1" v-if="isLogin">
                <div class="header-mobile-menu">
                    <div class="header-mobile-menu-wrap">
                        <ul>
                            <li @click="$tools.pushRouter('/sports', false)">유럽형</li>
                            <li @click="$tools.pushRouter('/sportscross', false)">국내형</li>
                            <li @click="$tools.pushRouter('/sportslive', false)">라이브</li>
                            <li @click="$tools.pushRouter('/sportsspecial', false)">스페셜</li>
                            <li @click="$tools.pushRouter('/sportslivekor', false)">실시간</li>
                            <li @click="$tools.pushRouter('/casino', true)">카지노</li>
                            <li @click="openKplay(0)">슬롯게임</li>
                            <li @click="$tools.pushRouter('/minigamemenu', false)">미니게임</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <b-sidebar
            id="leftSide"
            backdrop
            shadow
            no-header
            width="266px"
            body-class="left-side"
            v-model="showLeftSide"
            @hidden="closedLeftSide()"
        >
            <div class="logo-wrap" v-show="!isLogin">
                <img src="/images/meta.png" class="logo" alt="LOGO" title="LOGO" @click="$tools.pushRouter('/')">
            </div>
            <LoginBox v-show="!isLogin"/>
            <UserBox v-show="isLogin"/>
            <GameCategory/>
            <CommunityCategory/>
        </b-sidebar>

        <b-sidebar
            id="rightSide"
            backdrop
            shadow
            no-header
            right
            width="266px"
            body-class="right-side"
            v-model="showRightSide"
            @hidden="closedRightSide()"
        >
            <div class="partner-box my-2">
                <div class="partner" @click="$tools.openNewTab('https://p.mt-11.com')">
                    META <span>PARTNERSHIP</span>
                </div>
            </div>
            <BetSlip from="mobile" v-if="router !== 'Home'"/>
        </b-sidebar>
    </div>
</template>

<script>
    import LoginBox from '@/components/LoginBox.vue'
    import UserBox from '@/components/UserBox.vue'
    import GameCategory from '@/components/GameCategory.vue'
    import CommunityCategory from '@/components/CommunityCategory.vue'
    import BetSlip from '../components/BetSlip.vue'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Header',
        components: {
            LoginBox,
            UserBox,
            GameCategory,
            CommunityCategory,
            BetSlip,
        },
        computed: {
            ...mapGetters(['router', 'isLogin', 'betCart', 'router', 'user'])
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
        padding-top: 10px;
        padding-left: 15px;

        .icon-mobile-bars {
            width: 68%;
            color: #333;
        }
    }
    .header-mobile-logo-wrap {
        padding-top: 10px;
        text-align: center;

        .mobile-logo {
            height: 44px;
            cursor: pointer;
        }
    }
    .header-mobile-right-wrap {
        padding-top: 5px;
        padding-right: 15px;
        text-align: right;

    }
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

        padding-top: 10px;
        padding-bottom: 7px;
        background: linear-gradient(268.08deg, #47BBA6 -9.6%, #0E3B72 66.08%);

        .header-mobile-menu-wrap {
            width: 530px;

            ul {

                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding-left: 15px;
                    padding-right: 5px;
                    line-height: 30px;
                    float: left;
                    color: #fff;
                    font-size: 0.9375rem;
                }
            }
        }
    }
    .btn-mobile-login {
        width: 100%;
        height: 30px;
        border: 0;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        background: linear-gradient(180deg, #0089d6, #005ab8);
        color: #fff;

        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }
    .btn-mobile-join {
        width: 100%;
        height: 30px;
        border: 0;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        background-color: #2e3139;
        color: #fff;

        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }
</style>