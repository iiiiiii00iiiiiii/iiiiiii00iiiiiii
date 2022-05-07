<template>
    <div>
        <div class="link-box">
            <table class="link-table">
                <tr>
                    <td
                        :class="thisRouter === 'Sports' ? 'active' : ''"
                        @click="link('sports')"
                    >
                        유럽형스포츠
                    </td>
                    <td
                        :class="thisRouter === 'SportsCross' ? 'active' : ''"
                        @click="link('sportscross')"
                    >
                    <!-- <td
                        :class="thisRouter === 'SportsCross' ? 'active' : ''"
                        @click="link('ready')"
                    > -->
                        아시아크로스
                    </td>
                    <td
                        :class="thisRouter === 'SportsLive' ? 'active' : ''"
                        @click="link('sportslive')"
                    >
                        IN-PLAY
                    </td>
                    <td
                        :class="thisRouter === 'SportsSpecial' ? 'active' : ''"
                        @click="link('sportsspecial')"
                    >
                        스페셜스포츠
                    </td>
                </tr>
                <tr>
                    <td
                        :class="thisRouter === 'SportsLiveKor' ? 'active' : ''"
                        @click="link('sportslivekor')"
                    >
                        LIVE
                    </td>
                    <td
                        :class="thisRouter === 'Powerball' || thisRouter === 'Powerladder' || thisRouter === 'Kenoladder' ? 'active' : ''"
                        @click="link('powerball')"
                    >
                        미니게임
                    </td>
                    <td
                        @click="link('casino')"
                    >
                        카지노
                    </td>
                    <td
                        @click="link('slot')"
                    >
                        슬롯게임
                    </td>
                </tr>
                <tr>
                    <td
                        @click="link('sportsBetList')"
                    >
                        S배팅내역
                    </td>
                    <td
                        @click="link('minigamesBetList')"
                    >
                        M배팅내역
                    </td>
                    <td
                        @click="link('sportsResult')"
                    >
                        경기결과
                    </td>
                    <td
                        @click="link('attendance')"
                    >
                        출석체크
                    </td>
                </tr>
                <tr>
                    <td
                        @click="link('notice')"
                    >
                        공지사항
                    </td>
                    <td
                        @click="link('event')"
                    >
                        이벤트
                    </td>
                    <td
                        @click="link('ready')"
                    >
                        자유게시판
                    </td>
                    <td
                        @click="link('guide')"
                    >
                        이용가이드
                    </td>
                </tr>
                <tr>
                    <td
                        @click="link('mypage')"
                    >
                        마이페이지
                    </td>
                    <td
                        @click="link(isAgent ? 'partner' : 'recommend')"
                    >
                        {{ isAgent ? '파트너' : '추천인' }}
                    </td>
                    <td
                        @click="link('point')"
                    >
                        포인트내역
                    </td>
                    <td
                        @click="link('exchangeCasino')"
                    >
                        머니전환
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Link',
    data() {
        return {
            id: '',
            password: ''
        }
    },
    methods: {
        link(link) {
            if(link === 'ready') {
                this.$tools.ready()
                return
            }

            if(link === 'casino') {
                this.casinoMode = link
                this.showModalCasino = true
                return
            }
            if(link === 'slot') {
                this.casinoMode = link
                this.showModalCasino = true
                return
            }
            if(link === 'sportsBetList') {
                this.showModalSportsBetList = true
                return
            }
            if(link === 'minigamesBetList') {
                this.showModalMinigamesBetList = true
                return
            }
            if(link === 'sportsResult') {
                this.showModalSportsResult = true
                return
            }
            if(link === 'notice') {
                this.showModalNotice = true
                return
            }
            if(link === 'event') {
                this.showModalEvent = true
                return
            }
            if(link === 'free') {
                this.showModalFree = true
                return
            }
            if(link === 'mypage') {
                this.showModalMyPage = true
                return
            }
            if(link === 'recommend') {
                this.showModalRecommend = true
                return
            }
            if(link === 'point') {
                this.showModalPointHistory = true
                return
            }
            if(link === 'exchangeCasino') {
                this.showModalExchangeCasino = true
                return
            }
            if(link === 'attendance') {
                this.showModalAttendance = true
                return
            }
            if(link === 'partner') {
                if(typeof(window.open) === 'function') {
                    window.open('http://p.back1111.com')
                }
                else {
                    window.location.href = 'http://p.back1111.com'
                }
                return
            }

            if(link === 'guide') {
                this.showModalGuide = true
                return
            }

            this.$tools.routerPush(`/${link}`)
        }
    },
    computed: {
        thisRouter() {
            return this.$store.state.router
        },
        isAgent() {
            return this.$store.state.user.isAgent
        },
        casinoMode: {
            get() {
                return this.$store.state.casinoMode
            },
            set(mode) {
                this.$store.commit('setCasinoMode', mode)
            }
        },
        showModalCasino: {
            get() {
                return this.$store.state.showModalCasino
            },
            set(isShow) {
                this.$store.commit('setShowModalCasino', isShow)
            }
        },
        showModalSportsBetList: {
            get() {
                return this.$store.state.showModalSportsBetList
            },
            set(isShow) {
                this.$store.commit('setShowModalSportsBetList', isShow)
            }
        },
        showModalMinigamesBetList: {
            get() {
                return this.$store.state.showModalMinigamesBetList
            },
            set(isShow) {
                this.$store.commit('setShowModalMinigamesBetList', isShow)
            }
        },
        showModalSportsResult: {
            get() {
                return this.$store.state.showModalSportsResult
            },
            set(isShow) {
                this.$store.commit('setShowModalSportsResult', isShow)
            }
        },
        showModalNotice: {
            get() {
                return this.$store.state.showModalNotice
            },
            set(isShow) {
                this.$store.commit('setShowModalNotice', isShow)
            }
        },
        showModalEvent: {
            get() {
                return this.$store.state.showModalEvent
            },
            set(isShow) {
                this.$store.commit('setShowModalEvent', isShow)
            }
        },
        showModalFree: {
            get() {
                return this.$store.state.showModalFree
            },
            set(isShow) {
                this.$store.commit('setShowModalFree', isShow)
            }
        },
        showModalMyPage: {
            get() {
                return this.$store.state.showModalMyPage
            },
            set(isShow) {
                this.$store.commit('setShowModalMyPage', isShow)
            }
        },
        showModalRecommend: {
            get() {
                return this.$store.state.showModalRecommend
            },
            set(isShow) {
                this.$store.commit('setShowModalRecommend', isShow)
            }
        },
        showModalPointHistory: {
            get() {
                return this.$store.state.showModalPointHistory
            },
            set(isShow) {
                this.$store.commit('setShowModalPointHistory', isShow)
            }
        },
        showModalExchangeCasino: {
            get() {
                return this.$store.state.showModalExchangeCasino
            },
            set(isShow) {
                this.$store.commit('setShowModalExchangeCasino', isShow)
            }
        },
        showModalAttendance: {
            get() {
                return this.$store.state.showModalAttendance
            },
            set(isShow) {
                this.$store.commit('setShowModalAttendance', isShow)
            }
        },
        showModalGuide: {
            get() {
                return this.$store.state.showModalGuide
            },
            set(isShow) {
                this.$store.commit('setShowModalGuide', isShow)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .link-table {
        width: 100%;

        tr {
            td {
                border-collapse: collapse;
                border: 1px solid #952fb4;
                background-color: #2c1f30;
                width: 25%;
                height: 35px;
                text-align: center;
                color: #f5f4f5;
                font-size: 0.75rem;
                font-weight: 600;

                &.active {
                    color: #00fee1
                }
            }
        }
    }
</style>