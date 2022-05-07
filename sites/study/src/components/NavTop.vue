<template>
    <div class="sticky-top">
        <div class="row">
            <div class="col-12 header-logo-box">
                <div class="row">
                    <div class="col-12 header-logo-bg">
                        <div class="row">
                            <div class="col-1 text-center">
                                <img src="images/megaPhone.png" class="megaPhone">
                            </div>
                            <div class="col-12 pt-4">
                                <marquee
                                    scrolldelay="160"
                                    behavior=left
                                    scrollamount=left
                                >
                                    {{ shortNotice }}
                                </marquee>
                            </div>
                            <div class="col login-btn-box text-right" v-if="!isLogin">
                                <button type="button" class="btn btn-login" @click="showLogin()">
                                    <font-awesome-icon :icon="['fa', 'user-lock']"/> 로그인
                                </button>
                            </div>
                            <div class="col join-btn-box" v-if="!isLogin">
                                <button type="button" class="btn btn-join" @click="showJoin()">
                                    <font-awesome-icon :icon="['fa', 'clipboard-list']"/> 회원가입
                                </button>
                            </div>
                            <div class="col pl-4" @click="$tools.routerPush('/logout')" v-if="isLogin">
                                <button type="button" class="btn btn-login" @click="showLogin()">
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'NavTop',
        components: {
        },
        data() {
            return {
                mainMenu: [
                    { title: '스포츠', icon: 'icon-top-sports.png', link: null },
                    { title: '라이브스포츠', icon: 'icon-top-sportslive.png', link: null },
                    { title: '미니게임', icon: 'icon-top-minigames.png', link: null },
                    { title: 'BET365', icon: 'icon-top-bet365.png', link: null },
                    { title: '라이브카지노', icon: 'icon-top-casino.png', link: 'casino' },
                    { title: '배팅내역',  icon: 'icon-top-bethistory.png', link: null },
                    { title: '커뮤니티',  icon: 'icon-top-community.png', link: null },
                //     { title: '마이페이지',  icon: 'icon-top-mypage.png', link: null }
                ],
                subMenu: [
                    [
                        { title: '유럽형스포츠', link: 'sports' },
                        { title: '국내형스포츠', link: 'sportscross' },
                        { title: '국내형스포츠', link: 'ready' },
                        { title: '라이브스포츠', link: 'sportslive' },
                        { title: '스페셜스포츠', link: 'sportsspecial' },
                        { title: '실시간스포츠', link: 'sportslivekor' }
                    ],
                    [
                        { title: '파워볼', link: 'powerball' },
                        { title: '파워사다리', link: 'powerladder' },
                        { title: '키노사다리', link: 'kenoladder' }
                    ],
                    [],
                    [],
                    [
                        { title: '스포츠 배팅내역', link: 'sportsBetList' },
                        { title: '미니게임 배팅내역', link: 'minigamesBetList' }
                    ],
                    // [
                    //     { title: '공지사항', link: 'notice' },
                    //     { title: '이벤트', link: 'event' },
                    //     { title: '자유게시판', link: 'ready' },
                    //     { title: '고객센터', link: 'help' },
                    //     { title: '이용가이드', link: 'guide' }
                    // ],
                    // [
                    //     { title: '회원정보수정', link: 'mypage' },
                    //     { title: '포인트전환', link: 'pointExchange' },
                    //     { title: '포인트전환내역', link: 'point' },
                    //     { title: '쪽지관리', link: 'message' }
                    // ]
                ],
                selectMainMenu: null ,

            }
        },
        created() {
        },
        methods: {
            link(link) {
                if(link === 'ready') {
                    this.$tools.ready()
                    return
                }

                if(!this.isLogin) {
                    this.showModalLogin = true
                    this.$tools.routerPush('/')
                    return
                }
                // if(link === 'mypage') {
                //     this.showModalMyPage = true
                //     return
                // }
                // if(link === 'pointExchange') {
                //     this.showModalPoint = true
                //     return
                // }
                // if(link === 'notice') {
                //     this.showModalNotice = true
                //     return
                // }
                // if(link === 'event') {
                //     this.showModalEvent = true
                //     return
                // }
                // if(link === 'message') {
                //     this.showModalMessage = true
                //     return
                // }
                // if(link === 'point') {
                //     this.showModalPointHistory = true
                //     return
                // }
                // if(link === 'charge') {
                //     this.showModalCharge = true
                //     return
                // }
                // if(link === 'exchange') {
                //     this.showModalExchange = true
                //     return
                // }
                // if(link === 'help') {
                //     this.showModalHelp = true
                //     return
                // }
                // if(link === 'free') {
                //     this.showModalFree = true
                //     return
                // }
                // if(link === 'casino') {
                //     this.casinoMode = link
                //     this.showModalCasino = true
                //     return
                // }
                // if(link === 'slot') {
                //     this.casinoMode = link
                //     this.showModalCasino = true
                //     return
                // }
                // if(link === 'sportsBetList') {
                //     this.showModalSportsBetList = true
                //     return
                // }
                // if(link === 'minigamesBetList') {
                //     this.showModalMinigamesBetList = true
                //     return
                // }
                // if(link === 'sportsResult') {
                //     this.showModalSportsResult = true
                //     return
                // }
                // if(link === 'recommend') {
                //     this.showModalRecommend = true
                //     return
                // }
                // if(link === 'exchangeCasino') {
                //     this.showModalExchangeCasino = true
                //     return
                // }
                // if(link === 'attendance') {
                //     this.showModalAttendance = true
                //     return
                // }
                // if(link === 'guide') {
                //     this.showModalGuide = true
                //     return
                // }

                this.$tools.routerPush(`/${link}`)
            },
            showLogin() {
                this.showModalLogin = false
                this.showModalLogin = true
            },
            showJoin() {
                this.showModalLogin = false
                this.showModalJoin = true
            },
            async openGame(id) {
                let res = await this.$http.get('/api/casino-url', { id: id, kind: 'casino' })
                if(res.error) return

                id = window.open(res.data.url, 'casino', '_blank')
            },
        },
        computed: {
            ...mapGetters(['shortNotice']),
            isLogin() {
                return this.$store.state.isLogin
            },
            showModalLogin: {
                get() {
                    return this.$store.state.showModalLogin
                },
                set(isShow) {
                    this.$store.commit('setShowModalLogin', isShow)
                }
            },
            showModalJoin: {
                get() {
                    return this.$store.state.showModalJoin
                },
                set(isShow) {
                    this.$store.commit('setShowModalJoin', isShow)
                }
            },
            // showModalMyPage: {
            //     get() {
            //         return this.$store.state.showModalMyPage
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalMyPage', isShow)
            //     }
            // },
            // showModalPoint: {
            //     get() {
            //         return this.$store.state.showModalPoint
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalPoint', isShow)
            //     }
            // },
            // showModalNotice: {
            //     get() {
            //         return this.$store.state.showModalNotice
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalNotice', isShow)
            //     }
            // },
            // showModalEvent: {
            //     get() {
            //         return this.$store.state.showModalEvent
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalEvent', isShow)
            //     }
            // },
            // showModalMessage: {
            //     get() {
            //         return this.$store.state.showModalMessage
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalMessage', isShow)
            //     }
            // },
            // showModalPointHistory: {
            //     get() {
            //         return this.$store.state.showModalPointHistory
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalPointHistory', isShow)
            //     }
            // },
            // showModalCharge: {
            //     get() {
            //         return this.$store.state.showModalCharge
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalCharge', isShow)
            //     }
            // },
            // showModalExchange: {
            //     get() {
            //         return this.$store.state.showModalExchange
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalExchange', isShow)
            //     }
            // },
            // showModalHelp: {
            //     get() {
            //         return this.$store.state.showModalHelp
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalHelp', isShow)
            //     }
            // },
            // showModalFree: {
            //     get() {
            //         return this.$store.state.showModalFree
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalFree', isShow)
            //     }
            // },
            // showModalCasino: {
            //     get() {
            //         return this.$store.state.showModalCasino
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalCasino', isShow)
            //     }
            // },
            // showModalSportsBetList: {
            //     get() {
            //         return this.$store.state.showModalSportsBetList
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalSportsBetList', isShow)
            //     }
            // },
            // showModalMinigamesBetList: {
            //     get() {
            //         return this.$store.state.showModalMinigamesBetList
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalMinigamesBetList', isShow)
            //     }
            // },
            // showModalSportsResult: {
            //     get() {
            //         return this.$store.state.showModalSportsResult
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalSportsResult', isShow)
            //     }
            // },
            // showModalRecommend: {
            //     get() {
            //         return this.$store.state.showModalRecommend
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalRecommend', isShow)
            //     }
            // },
            // casinoMode: {
            //     get() {
            //         return this.$store.state.casinoMode
            //     },
            //     set(mode) {
            //         this.$store.commit('setCasinoMode', mode)
            //     }
            // },
            // showModalExchangeCasino: {
            //     get() {
            //         return this.$store.state.showModalExchangeCasino
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalExchangeCasino', isShow)
            //     }
            // },
            // showModalAttendance: {
            //     get() {
            //         return this.$store.state.showModalAttendance
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalAttendance', isShow)
            //     }
            // },
            // showModalGuide: {
            //     get() {
            //         return this.$store.state.showModalGuide
            //     },
            //     set(isShow) {
            //         this.$store.commit('setShowModalGuide', isShow)
            //     }
            // },
            money() {
                return this.$numeral(this.$store.state.user.money).format('0,0')
            },
            point() {
                return this.$store.state.user.point
            },
            nick() {
                return this.$store.state.user.nick
            },
            messageCount() {
                return this.$numeral(this.$store.state.user.messageCount).format('0,0')
            },
        }
    }
</script>

<style lang="scss" scoped>
.header-logo-box {
    background: rgba(230, 230, 245, 0.466);
    color: #000;
    height: 70px;
    font-size: 1rem;

    .megaPhone {
        cursor: pointer;
        padding-top: 20px;
        width: 30px;
    }
}
.btn-login {
    border: 0;
    background: linear-gradient(270deg, rgba(245, 215, 155, 1) 0%, rgba(226, 178, 113, 1) 100%) !important;
    border-radius: 18px;
    color: #5c3301;
    padding: 8px 40px;
    margin-top: 15px;
    transition: 1s ease-out;

    &:hover {
        color: #5c3301;
        background: rgb(214, 169, 105) !important;
        background: linear-gradient(270deg, rgb(228, 191, 117) 0%, rgb(219, 172, 106) 100%) !important;
    }
}
.btn-join {
    border: 0;
    border: 2px solid #ebba73 !important;
    border-radius: 18px;
    color: #ebba73;
    padding: 7px 30px;
    margin-top: 15px;
    transition: 1s ease-out;

    &:hover {
        background: rgb(214, 169, 105);
        background: linear-gradient(0deg, rgb(241, 197, 138) 0%, rgb(224, 194, 132) 100%);
        color: #5c3301;
    }
}
</style>