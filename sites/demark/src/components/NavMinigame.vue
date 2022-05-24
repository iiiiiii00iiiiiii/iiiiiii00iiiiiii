<template>
    <div class="nav-minigame">
        <div class="col-12">
            <div class="row">
                <div class="col-12 minigame-menu d-none d-xl-block">
                    <div class="row">
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/powerball', false)">
                            <img src="/images/icon-nav-minigame-1.png" alt="파워볼">
                            파워볼
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/powerladder', false)">
                            <img src="/images/icon-nav-minigame-2.png" alt="파워사다리">
                            파워사다리
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/kenoladder', false)">
                            <img src="/images/icon-nav-minigame-3.png" alt="키노사다리">
                            키노사다리
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.ready('/speedladder', false)">
                            <img src="/images/icon-nav-minigame-4.png" alt="스피드사다리">
                            스피드사다리
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/boglepowerball', false)">
                            <img src="/images/icon-nav-minigame-5.png" alt="보글파워볼">
                            보글파워볼
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/bogleladder', false)">
                            <img src="/images/icon-nav-minigame-5.png" alt="보글사다리">
                            보글사다리
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/googlepowerball1', false)">
                            <img src="/images/icon-nav-minigame-6.png" alt="구글 1분">
                            구글 1분
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.pushRouter('/googlepowerball3', false)">
                            <img src="/images/icon-nav-minigame-6.png" alt="구글 3분">
                            구글 3분
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.ready('/coinpowerball3', false)">
                            <img src="/images/icon-nav-minigame-7.png" alt="코인 3분">
                            코인 3분
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.ready('/coinpowerball', false)">
                            <img src="/images/icon-nav-minigame-7.png" alt="코인 5분">
                            코인 5분
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.ready('/eospowerball1', false)">
                            <img src="/images/icon-nav-minigame-8.png" alt="EOS 1분">
                            EOS 1분
                        </div>
                        <div class="col-3 col-xl menu-name" @click="$tools.ready('/eospowerball3', false)">
                            <img src="/images/icon-nav-minigame-8.png" alt="EOS 3분">
                            EOS 3분
                        </div>
                        <div class="col-3 col-xl menu-name-second" @click="$tools.ready('/eospowerball', false)">
                            <img src="/images/icon-nav-minigame-8.png" alt="EOS 5분">
                            EOS 5분
                        </div>
                    </div>
                </div>
                <div class="col px-0 d-xl-none">
                    <div class="minigame-header-mobile-menu">
                        <div class="minigame-header-mobile-menu-wrap">
                            <ul>
                                <li @click="$tools.pushRouter('/powerball', false)">
                                    <img src="/images/icon-nav-minigame-1.png" alt="파워볼">
                                    파워볼
                                </li>
                                <li @click="$tools.pushRouter('/powerladder', false)">
                                    <img src="/images/icon-nav-minigame-2.png" alt="파워사다리">
                                    파워사다리
                                </li>
                                <li @click="$tools.pushRouter('/kenoladder', false)">
                                    <img src="/images/icon-nav-minigame-3.png" alt="키노사다리">
                                    키노사다리
                                </li>
                                <li @click="$tools.ready('/kenoladder', false)">
                                    <img src="/images/icon-nav-minigame-3.png" alt="스피드 사다리">
                                    스피드 사다리
                                </li>
                                <li @click="$tools.pushRouter('/boglepowerball', false)">
                                    <img src="/images/icon-nav-minigame-5.png" alt="보글파워볼">
                                    보글파워볼
                                </li>
                                <li @click="$tools.pushRouter('/bogleladder', false)">
                                    <img src="/images/icon-nav-minigame-5.png" alt="보글사다리">
                                    보글사다리
                                </li>
                                <li @click="$tools.pushRouter('/googlepowerball1', false)">
                                    <img src="/images/icon-nav-minigame-6.png" alt="구글 1분">
                                    구글 1분
                                </li>
                                <li @click="$tools.pushRouter('/googlepowerball3', false)">
                                    <img src="/images/icon-nav-minigame-6.png" alt="구글 3분">
                                    구글 3분
                                </li>
                                <li @click="$tools.ready('/coinpowerball3', false)">
                                    <img src="/images/icon-nav-minigame-7.png" alt="코인 3분">
                                    코인 3분
                                </li>
                                <li @click="$tools.ready('/coinpowerball', false)">
                                    <img src="/images/icon-nav-minigame-7.png" alt="코인 5분">
                                    코인 5분
                                </li>
                                <li @click="$tools.ready('/eospowerball1', false)">
                                    <img src="/images/icon-nav-minigame-7.png" alt="EOS 1분">
                                    EOS 1분
                                </li>
                                <li @click="$tools.ready('/eospowerball3', false)">
                                    <img src="/images/icon-nav-minigame-7.png" alt="EOS 3분">
                                    EOS 3분
                                </li>
                                <li @click="$tools.ready('/eospowerball', false)">
                                    <img src="/images/icon-nav-minigame-7.png" alt="EOS 5분">
                                    EOS 5분
                                </li>
                            </ul>
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