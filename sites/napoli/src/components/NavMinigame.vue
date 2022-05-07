<template>
    <div>
        <div class="row nav-minigame">
            <div class="col-12">
                <div class="row">
                    <div class="col-4 col-xl-2 border-right-black">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'Powerball' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/powerball', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_powerball.png" class="nav-icon">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
                    </div>
                    <div class="col-4 col-xl-2 border-right-black">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'Powerladder' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/powerladder', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_power_ladder.png" class="nav-icon">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
                    </div>
                    <div class="col-4 col-xl-2 border-right-black">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'Kenoladder' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/kenoladder', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_keno_ladder.png" class="nav-icon">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
                    </div>
                    <div class="col-4 col-xl-2 border-right-black minigame-border-top">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'eosPowerball' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/eospowerball', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_eos_powerball.png" class="nav-icon2">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
                    </div>
                    <div class="col-4 col-xl-2 border-right-black minigame-border-top">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'eosPowerball3' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/eospowerball3', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_eos_powerball3.png" class="nav-icon2">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
                    </div>
                    <div class="col-4 col-xl-2 border-right-black minigame-border-top">
                        <div
                            class="col item-nav-minigame"
                            :class="thisRouter === 'eosPowerball1' ? 'text-yellow' : ''"
                            @click="$tools.pushRouter('/eospowerball1', false)"
                        >
                            <div>
                                <img src="/images/nav_icon_eos_powerball1.png" class="nav-icon2">
                            </div>
                            <!-- <div class="mt-2 text-1rem">
                                <font-awesome-icon :icon="['far', 'clock']"/> 01:00
                            </div> -->
                        </div>
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
        }
    }
}
</script>

<style lang="scss">
    .nav-minigame {
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        //background: linear-gradient(180deg, #1E2737, #0B1423);
        background: linear-gradient(180deg, #2D353C, #222);
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

        .minigame-border-top {
            border-top: 1px solid #000;

            @media (min-width: 1200px) {
                border-top: 0;
            }
        }

        .border-right-black {
            border-right: 1px solid #000;
        }
    }
    .nav-icon {
        width: 60px;
    }
    .nav-icon2 {
        width: 100px;
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