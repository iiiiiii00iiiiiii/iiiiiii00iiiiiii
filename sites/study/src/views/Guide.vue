<template>
    <div>
        <div class="row">
            <div class="col-12 help-bg">
                <div class="row">
                    <div class="col-12">
                        <div class="col-12 p-xl-2 mune-box">
                            <div class="row">
                                <div class="col-12 col-xl-8 d-none d-xl-block">
                                    <!-- <img src="/images/ns-bottom-logo.png" class="img-fluid w-30"> -->
                                </div>
                                <div class="col-12 col-xl-4 help-menu">
                                    <div class="row">
                                        <div class="col help-icon"
                                        @click="$tools.routerPush('notice')">
                                            <img src="/images/ns-service-icon-1.png">
                                            <div>공지사항</div>
                                        </div>
                                        <div class="col help-icon"
                                        @click="$tools.routerPush('help')">
                                            <img src="/images/ns-service-icon.png">
                                            <div>고객센터</div>
                                        </div>
                                        <div class="col-3 help-icon"
                                        @click="$tools.routerPush('faq')">
                                            <img src="/images/ns-service-icon-3.png">
                                            <div>자주묻는질문</div>
                                        </div>
                                        <div class="col help-icon"
                                        @click="$tools.routerPush('event')">
                                            <img src="/images/ns-service-icon-2.png">
                                            <div>이벤트</div>
                                        </div>
                                        <div class="col help-icon active"
                                        @click="$tools.ready()">
                                            <img src="/images/ns-service-icon-4.png">
                                            <div>이용규정</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-5 help-title text-center">
                        이용규정
                        <div>GUIDE</div>
                    </div>
                </div>
                <hr class="mt-4">
                <div class="row p-xl-3">
                    <div class="col-12 col-xl guide-left">
                        <div class="row">
                            <div class="col-12 guide-sub-title guide-border-bottom" @click="selectMenu === 'sports' ? selectMenu = '' : selectMenu = 'sports'">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-guide-sports.png" class="icon-guide">
                                    </div>
                                    <div class="col-8">
                                        스포츠 규칙
                                    </div>
                                    <div class="col-2">
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-left']" v-if="selectMenu !== 'sports'"/>
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-down']" v-if="selectMenu === 'sports'"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="selectMenu === 'sports'">
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('football')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-football.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        축구
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('basketball')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-basketball.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        농구
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('baseball')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-baseball.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        야구
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('volleyball')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-volleyball.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        배구
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('icehockey')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-icehockey.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        아이스하키
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('tennis')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-tennis.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        테니스
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('tabletennis')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-tabletennis.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        탁구
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('darts')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-darts.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        다트
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('boxing')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-boxing.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        권투
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('mma')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-mma.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        이종격투기
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('rugby')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-rugby.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        럭비
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('rugbyunion')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-rugbyunion.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        럭비유니온
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('rugbyusa')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-rugbyusa.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        미식축구
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-12 guide-menu guide-border-bottom" @click="selectSubMenu = 'golf'">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-golf.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        골프
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('handball')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-handball.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        핸드볼
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 guide-sub-title guide-border-bottom" @click="selectMenu === 'casino' ? selectMenu = '' : selectMenu = 'casino'">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-guide-casino.png" class="icon-guide">
                                    </div>
                                    <div class="col-8">
                                        카지노 규칙
                                    </div>
                                    <div class="col-2">
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-left']" v-if="selectMenu !== 'casino'"/>
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-down']" v-if="selectMenu === 'casino'"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="selectMenu === 'casino'">
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('baccarat')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-baccarat.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        바카라
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('blackjack')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-blackjack.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        블랙잭
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('roulette')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-roulette.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        룰렛
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('dragon-tiger')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-dragon-tiger.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        드래곤 타이거
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('bullbull')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-bullbull.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        불불
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('bull-fight')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-bull-fight.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        불 파이트
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('sikbo')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-sikbo.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        식보
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('123')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-123.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        원 쓰리 카드
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 guide-sub-title guide-border-bottom" @click="selectMenu === 'esports' ? selectMenu = '' : selectMenu = 'esports'">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-guide-esports.png" class="icon-guide">
                                    </div>
                                    <div class="col-8">
                                        E스포츠 규칙
                                    </div>
                                    <div class="col-2">
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-left']" v-if="selectMenu !== 'esports'"/>
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'angle-down']" v-if="selectMenu === 'esports'"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="selectMenu === 'esports'">
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('csgo')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-csgo.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        CS:GO
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('dota2')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-dota2.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        Dota 2
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 guide-menu guide-border-bottom" @click="setSubMenu('lol')">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-lol.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        LOL
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-12 guide-menu guide-border-bottom" @click="selectSubMenu = 'fifa'">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="/images/icon-fifa.png" class="icon-guide">
                                    </div>
                                    <div class="col-10 pl-2">
                                        FIFA
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="col-12 col-xl mb-5">
                        <img :src="`/images/guide-${selectSubMenu}.png`" class="img-fluid" id="section">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalGuide',
    data() {
        return {
            selectMenu: '',
            selectSubMenu: 'football'
        }
    },
    created() {
    },
    methods: {
        hideModal() {
            this.showModalGuide = false
            this.initDropDown()
        },
        initDropDown() {
            this.selectMenu = ''
            this.selectSubMenu = 'football'
        },
        setSubMenu(menu) {
            this.selectSubMenu = menu
        }
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
        id() {
            return this.$store.state.user.id
        },
        nick() {
            return this.$store.state.user.id
        },
        showModalGuide: {
            get() {
                return this.$store.state.showModalGuide
            },
            set(isShow) {
                if(this.showModalGuide) {
                    this.$store.commit('setShowModalGuide', isShow)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.help-bg {
    background-color: #151e2d;
    color: #fff;
}
.help-menu {
    background-color: #0f1520;
    border-radius: 20px;
    text-align: center;
    align-self: center;
    cursor: pointer;
    
    .help-icon {
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 15px;

        @media(min-width: 1200px) {
            padding-top: 15px;
            padding-bottom: 15px;
            border-radius: 20px;
        }


        &:active {
            background-color: #02996a;
        }
        &.active {
            background-image: linear-gradient(180deg,#05c9a3,#02996a);
        }
    }
}
hr {
    border: 1px solid #37383B;
    width: 98%;
}
.help-title {
    font-size: 1.875rem;

    div {
        color: #7286A6;
        font-size: 0.9375rem;
    }
}
.guide-title {
    background-color: #0A0F14;
    color: #fff;
    padding: 0.6rem 0;
    padding-left: 0.5rem;
    font-weight: 900;
}
.guide-sub-title {
    background-color: #0A0F14  ;
    color: #7286A6;
    padding: 0.6rem 0;
    padding-left: 0.5rem;
    cursor: pointer;
}
.guide-menu {
    background-color: #1a1d20;
    color: #7286A6;
    padding: 0.6rem 0;
    padding-left: 0.5rem;
    cursor: pointer;
}
.guide-border-top {
    border-top: 1px solid #191919;
}
.guide-border-bottom {
    border-bottom: 1px solid #191919;
}
.icon-guide {
    margin-top: -3px;
    width: 24px;
}
.guide-left {
    background-color: #0A0F14;
    @media (min-width: 1200px) {
        max-width: 200px;
    }
}
</style>