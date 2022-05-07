<template>
    <div class="navm-top">
        <div class="row">
            <div class="col-12 mobile-nav-top">
                <div class="row">
                    <div class="col-2 text-center">
                        <img src="/images/ns-mobile-icon-1.png" class="img-fluid user-plus" v-if="!isLogin" @click="$tools.routerPush('/join')"/>
                        <img src="/images/ns-mobile-icon-3.png" class="img-fluid bars" v-if="isLogin" @click="openAside()"/>
                    </div>
                    <div class="col-8 text-center cursor-pointer">
                        <img
                            src="/images/study-logo.png"
                            class="logo-m"
                            @click="$tools.routerPush('/')"
                        >
                    </div>
                    <div class="col-2 text-center">
                        <span
                            class="cart-count d-xl-none"
                            @click="openBside()"
                            v-if="isLogin"
                        >
                            {{ betCart.length }}
                        </span>
                        <img src="/images/ns-mobile-icon-2.png" class="img-fluid sign-in" v-if="!isLogin"  @click="$tools.routerPush('/login')"/>
                        <img src="/images/ns-mobile-icon-4.png" class="img-fluid cart" v-if="isLogin" @click="openBside()"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 bottom-menu-box fixed-bottom">
                <div class="row">
                    <div class="col"  @click="link('charging')">
                        <img src="/images/mobile-menu-icon.png" class="img-fluid">
                        <div>입금</div>
                    </div>
                    <div class="col"  @click="link('exchange')">
                        <img src="/images/mobile-menu-icon.png" class="img-fluid">
                        <div>출금</div>
                    </div>
                    <div class="col-3 home" @click="$tools.routerPush('/')">
                        <img src="/images/mobile-menu-icon-1.png" class="img-fluid home-icon">
                    </div>
                    <div class="col" @click="link('Point')">
                        <img src="/images/mobile-menu-icon-2.png" class="img-fluid">
                        <div>포인트</div>
                    </div>
                    <div class="col" @click="link('exchangeCasino')">
                        <img src="/images/mobile-menu-icon-3.png" class="img-fluid">
                        <div>카지노</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 로그인 후 왼쪽 클릭했을때 나오는 화면 -->
        <b-sidebar
            id="aside"
            backdrop
            shadow
            no-header
            width="266px"
            body-class="aside"
            v-model="showAside"
            @hidden="closedAside"
        >
            <div class="container-fluid aside">
                <div class="row">
                    <div class="col-12">
                        <LeftMenuXl class="mt-1"/>
                    </div>
                </div>
            </div>
        </b-sidebar>

        <!-- 배팅카트 클릭했을때 나오는 화면 -->
        <b-sidebar
            id="bside"
            bg-variant="dark"
            backdrop
            shadow
            no-header
            width="266px"
            right
            v-model="showBside"
            @hidden="closedBside"
        >
            <div class="container-fluid bside">
                <div class="row">
                    <div class="col-12">
                        <BetSlip from="mobile"/>
                        <Banner/>
                    </div>
                </div>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
import LeftMenuXl from '@/components/LeftMenuXl'
import BetSlip from '@/components/BetSlip'
import Banner from '@/components/Banner'

export default {
    name: 'NavTop',
    components: {
        LeftMenuXl,
        BetSlip,
        Banner
    },
    data() {
        return {
            showAside: false,
            showBside: false
        }
    },
    created() {
    },
    methods: {
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
        },
        link(link) {
            if(link === 'ready') {
                this.$tools.ready()
                return
            }

            if(!this.isLogin) {
                this.$tools.routerPush('/login')
                return
            }

            this.$tools.routerPush(`/${link}`)
        },
        async openGame(id) {
            let res = await this.$http.get('/api/casino-url', { id: id, kind: 'casino' })
            if(res.error) return

            id = window.open(res.data.url, 'casino', '_blank')
        },
    },
    computed: {
        disabledButton: {
            get() {
                return this.$store.state.disabledButton
            },
            set(status) {
                this.$store.commit('setDisabledButton', status)
            }
        },
       isLogin() {
            return this.$store.state.isLogin
        },
        money() {
            return this.$store.state.user.money
        },
        point() {
            return this.$store.state.user.point
        },
        casinoMoney() {
            return this.$store.state.user.casinoMoney
        },
        betCart() {
            return this.$store.state.betCart
        }
    }
}
</script>

<style lang="scss" scoped>
.bside, .aside {
    background-color: #fff;
}
.navm-top {
    background-color: #fff;
    color: #fff;

    .mobile-nav-top {
        border-bottom: 3px solid #aaa;
    }
    .logo-m {
        width: 200px;
        margin-top: 10px;
    }

    .bars, .sign-in, .user-plus, .cart {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 1.75rem;
        cursor: pointer;
    }

    .cart-count {
        position: absolute;
        top: 5px;
        right: 32px;
        padding-top: 2px;
        width: 25px;
        height: 25px;
        border: 1px solid #990033;
        border-radius: 50%;
        background-color: #b00400;
        display: inline-block;
        font-weight: 600;
        text-align: center;
    }
}
.bottom-menu-box {
    padding-top: 5px;

    background-color: #fafbfc;
    border: 1px solid #e1e4e8;
    box-sizing: border-box;
    cursor: pointer;

    font-size: 0.8125rem;
    font-weight: 700;
    color: #222222;
    text-align: center;
}
.home-icon {
    position: relative;
    top: -20px;
}
.home {
    position: relative;
    top: -5px;
    height: 47px;
    background-color: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 0px 0px 100px 100px;
}
</style>