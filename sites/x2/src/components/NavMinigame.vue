<template>
    <div>
        <div class="row d-xl-none">
            <div class="col-12 text-center money-bg fixed-top">
                <div class="row">
                    <div class="col-4">
                        <img src="/images/icon-logged-money.png" class="mr-1" alt="보유머니">
                        <span class="text-primary">
                            {{ $numeral(money).format('0,0') }}
                            <span>원</span>
                        </span>
                    </div>
                    <div class="col-4">
                        <img src="/images/icon-logged-point.png" class="mr-1" alt="포인트">
                        <span class="text-warning">
                        {{ $numeral(point).format('0,0') }}
                        <span>P</span>
                    </span>
                    </div>
                    <div class="col-4">
                        <img src="/images/icon-logged-casino.png" class="mr-1" alt="카지노머니">
                        <span class="text-danger">
                        {{ $numeral(casinoMoney).format('0,0') }}
                        <span>원</span>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavTop',
    data() {
        return {
            routeName: '',
            canAccess: false
        }
    },
    created() {
        //this.routeName = this.$route.name

        //let partnerRouter = this.$store.state.partnerRouter
        //this.canAccess = partnerRouter.canAccess
    },
    methods: {
        currentMenu(routeName) {
            return routeName === this.routeName ? 'font-weight-bold text-danger' : ''
        },
        goRouter(path) {
            this.$router.push(path).catch(() => {})
        },
        goPopup(url) {
            window.open(url)
        }
    },
    computed: {
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
        },
        casinoMoney() {
            return this.$store.state.user.casinoMoney
        },
    }
}
</script>

<style lang="scss">
    .money-bg {
        background: linear-gradient(180deg, #0149A1 0%, #18389D 50%, rgba(0, 30, 89, 0.92) 100%);
        border-top: 1px solid #37383b;
        border-bottom: 1px solid #37383b;
        line-height: 40px;
        
        margin-top: 70px;
        z-index: 1;
    }
    .nav-minigame {
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        //background: linear-gradient(180deg, #1E2737, #0B1423);
        //background: linear-gradient(180deg, #2D353C, #222);
        //background: linear-gradient(180deg, #015892, #00395e);
        //background: linear-gradient(180deg, #014877, #01243b);
        background: linear-gradient(180deg, #151e2d, #0a1014);
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;

        .item-nav-minigame {
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
            text-align: center;
            cursor: pointer;
        }

        .line-nav-minigame {
            width: 1px;
            background-color: #000000;
        }
    }
    .nav-icon {
        width: 50px;

        @media (min-width: 992px) {
            width: 70px;
        }
    }
    .title-minigame {
        font-size: 1rem;
    }

    .button-top {
        background-color: #2E3D59 !important;
        border-radius: 0 !important;
        color: #ffffff !important;
    }
    .button-top-user {
        background-color: #a80a18 !important;
    }
    .bars-top, .bars-cart {
        cursor: pointer;
        font-size: 28px;
        @media (min-width: 992px) {
            display: none;
        }
    }
</style>