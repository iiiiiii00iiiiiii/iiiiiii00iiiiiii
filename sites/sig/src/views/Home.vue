<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="home">
                        <div class="main-banner">
                            <video class="movie" autoplay loop muted playsinline>
                                <source src="/videos/bg-video-crop.mp4" type="video/mp4">
                            </video>
                            <div class="video-filter"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PC 버전 START -->
            <div class="row pt-2 d-none d-xl-flex">
                <div class="col-6">
                    <div class="board" data-aos="zoom-in" data-aos-duration="1500">
                        <div class="board-title">
                            <span :class="selectBoard === 'notice' ? 'active' : ''" @click="selectBoard = 'notice'">공지사항</span>
                            <span class="ml-3" :class="selectBoard === 'faq' ? 'active' : ''" @click="selectBoard = 'faq'">FAQ</span>
                            <span class="float-right text-light-brown" @click="$tools.pushRouter(`/${selectBoard}`, true)">+more</span>
                        </div>
                        <div class="board-content" v-show="selectBoard === 'notice'">
                            <ul>
                                <li v-for="(item, index) in notice" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/notice/detail/${item._id}/1`, true)"
                                    >
                                        {{ item.title }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="board-content" v-show="selectBoard === 'faq'">
                            <ul>
                                <li v-for="(item, index) in faq" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/faq/detail/${item._id}/1`, true)"
                                    >
                                        {{ item.title }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="board" data-aos="zoom-in" data-aos-duration="1500">
                        <div class="board-title">
                            <span class="active">이벤트</span>
                            <span class="float-right text-light-brown" @click="$tools.pushRouter('/event', true)">+more</span>
                        </div>
                        <div class="board-content">
                            <ul>
                                <li v-for="(item, index) in event" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/event/detail/${item._id}/1`, true)"
                                    >
                                        {{ item.title }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row pt-2 d-none d-xl-flex"> -->
            <div class="row pt-2">
                <!-- 미니게임 - PC, MOBILE -->
                <div class="col-6 col-xl">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 0" @mouseout="bannerIndex = null" @click="$tools.pushRouter('/sports', false)">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> SPORTS
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 0 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    SPORTS
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    유럽형 스포츠 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-1.jpg" alt="SPORTS" title="SPORTS">
                    </div>
                </div>
                <!-- 미니게임 - PC -->
                <div class="col-6 col-xl d-none d-xl-block">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 1" @mouseout="bannerIndex = null" @click="$tools.pushRouter('/sportscross', false)">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> CROSS
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 1 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    CROSS
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    크로스 스포츠 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-2.jpg" alt="CROSS" title="CROSS">
                    </div>
                </div>
                <!-- 미니게임 - PC, MOBILE -->
                <div class="col-6 col-xl">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 2" @mouseout="bannerIndex = null" @click="$tools.pushRouter('/sportslive', false)">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> LIVE
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 2 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    LIVE
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    라이브 스포츠 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-3.jpg" alt="LIVE" title="LIVE">
                    </div>
                </div>
                <!-- 라이브 카지노 - PC, MOBILE -->
                <div class="col col-xl mt-2 mt-xl-0">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 3" @mouseout="bannerIndex = null" @click="$tools.pushRouter('/casino', true)">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> LIVE CASINO
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 3 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    LIVE CASINO
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    라이브 카지노 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-4.jpg" alt="LIVE CASINO" title="LIVE CASINO">
                    </div>
                </div>
                <!-- 슬롯 - PC -->
                <div class="col col-xl d-none d-xl-block">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 4" @mouseout="bannerIndex = null" @click="openKplay(0, true)">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> SLOT GAMES
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 4 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    SLOT GAMES
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    슬롯게임 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-5.jpg" alt="SLOT GAMES" title="SLOT GAMES">
                    </div>
                </div>
                <!-- 미니게임 - MOBILE -->
                <div class="col col-xl d-xl-none mt-2 mt-xl-0">
                    <div class="game-banner" data-aos="zoom-in" data-aos-duration="1500" @mouseover="bannerIndex = 5" @mouseout="bannerIndex = null" @click="$tools.pushRouter('/powerball')">
                        <div class="game-banner-site-name">
                            SIGNIEL BET
                        </div>
                        <div class="game-banner-title">
                            <font-awesome-icon :icon="['fa', 'cubes']"/> MINIGAMES
                        </div>
                        <div class="game-banner-cover" :class="bannerIndex === 5 ? 'active' : ''">
                            <div class="game-banner-cover-content">
                                <div class="game-banner-cover-icon">
                                    <font-awesome-icon  :icon="['fa', 'plus']"/>
                                </div>
                                <div class="game-banner-cover-title">
                                    MINIGAMES
                                </div>
                                <div class="game-banner-cover-sub-title">
                                    각종 미니게임 배팅
                                </div>
                            </div>
                        </div>
                        <img src="/images/banner-6.jpg" alt="SLOT GAMES" title="SLOT GAMES">
                    </div>
                </div>
            </div>
            <!-- PC 버전 END -->

            <!-- MOBILE 버전 START -->
            <div class="row d-xl-none">
                <div class="col-12 mt-2">
                    <div class="board" data-aos="zoom-in" data-aos-duration="1500">
                        <div class="board-title">
                            <span :class="selectBoard === 'notice' ? 'active' : ''" @click="selectBoard = 'notice'">공지사항</span>
                            <span class="ml-3" :class="selectBoard === 'faq' ? 'active' : ''" @click="selectBoard = 'faq'">FAQ</span>
                            <span class="float-right text-light-brown" @click="$tools.pushRouter(`/${selectBoard}`, true)">+more</span>
                        </div>
                        <div class="board-content" v-show="selectBoard === 'notice'">
                            <ul>
                                <li v-for="(item, index) in notice" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/notice/detail/${item._id}/1`, true)"
                                    >
                                        {{ `${$tools.cut(item.title, 35, '...')}` }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="board-content" v-show="selectBoard === 'faq'">
                            <ul>
                                <li v-for="(item, index) in faq" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/faq/detail/${item._id}/1`, true)"
                                    >
                                        {{ `${$tools.cut(item.title, 35, '...')}` }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <div class="board" data-aos="zoom-in" data-aos-duration="1500">
                        <div class="board-title">
                            <span class="active">이벤트</span>
                            <span class="float-right text-light-brown" @click="$tools.pushRouter('/event', true)">+more</span>
                        </div>
                        <div class="board-content">
                            <ul>
                                <li v-for="(item, index) in event" :key="index">
                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                    <span
                                        class="cursor-pointer"
                                        :class="item.header ? 'ml-2' : ''"
                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                        @click="$tools.pushRouter(`/event/detail/${item._id}/1`, true)"
                                    >
                                        {{ `${$tools.cut(item.title, 35, '...')}` }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 mt-2">
                    <div class="community-banner" data-aos="zoom-in" data-aos-duration="1500">
                        <div>
                            <img src="/images/banner-main-help.jpg" class="img-fluid cursor-pointer" alt="고객센터" titme="고객센터" @click="$tools.pushRouter('/help', true)">
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <div class="community-banner" data-aos="zoom-in" data-aos-duration="1500">
                        <div>
                            <img src="/images/banner-main-attendance.jpg" class="img-fluid cursor-pointer" alt="출석체크" titme="출석체크" @click="$tools.pushRouter('/attendance', true)">
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- MOBILE 버전 END -->
            <div class="row">
                <div class="col">
                    <div class="payment-banner">
                        <img src="/images/banner-payment.png" class="img-fluid" alt="PAYMENT METHOD" title="PAYMENT METHOD">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="sports-banner">
                        <img src="/images/banner-sports.png" class="img-fluid" alt="SPORTS" title="SPORTS">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="copyright">
                        Copyright © 믿을 수 있는 SIGNIEL BET SLUMBERS ALL RIGHTS RESERVE.<br>Solution By SOFT365.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Home',
        components: {
        },
        computed: {
            ...mapGetters(['user', 'isLogin'])
        },
        data() {
            return {
                bannerIndex: null,
                selectBoard: 'notice',
                notice: [],
                event: [],
                faq: []
            }
        },
        created() {
            this.getDashboard()
        },
        methods: {
            async getDashboard() {
                const r = await this.$http.get('/api/get-home', { n: 100 })
                if(r.error) return

                this.notice = r.data.dashboard.notice
                this.event = r.data.dashboard.event
                this.faq = r.data.dashboard.faq
            },
            async openKplay(id, needLogin) {
                let isMobile = true
                if(window.innerWidth >= 1200 ) {
                    isMobile = false
                }

                if(needLogin && !this.isLogin) {
                    if(isMobile) {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '', () => {
                            this.$tools.pushRouter('/login')
                        })
                    }
                    else {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '')
                    }
                    return
                }

                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                if(r.error) {
                    if(r.error.response.status === 500) {
                        kplayWindow.close()
                    }
                }
                else {
                    kplayWindow.location = r.data.launch_url
                }
            }
        }
    }
</script>

<style lang="scss" scope>
    .home {
        width: 100%;
        border: 1px solid #080500;
        border-radius: 3px;
        padding: 2px;

        .main-banner {
            line-height: 0;
            max-height: 366.67px;
            .movie {
                width: 100%;
                height: auto;
            }
            .video-filter {
                position: absolute;
                left: 8px;
                top: 3px;
                width: calc(100% - 16px);
                height: calc(100% - 6px);
                background: url(/images/video-pattern.png) repeat;
            }
        }
    }

    .board {
        border: 1px solid #080500;
        border-radius: 3px;
        background-color: #222;
        padding: 2px;

        .board-title {
            padding: 10px;
            border-top: 3px solid #888888;
            font-weight: 700;
            color: #fff;

            span {
                cursor: pointer;
            }

            .active {
                color: #c1ad8b;
            }
        }
        .board-content {
            height: 141px;
            overflow: auto;
            font-size: 0.75rem;

            ul {
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-left: 10px;

                    &:nth-child(odd) {
                        background-color: #303030;
                    }
                    &:nth-child(even) {
                        background-color: #222;
                    }
                }
            }
            color: #c2c2c2;
        }
    }

    .community-banner {
        @media (max-width: 1199px) {
            border: 1px solid #080500;
            border-radius: 3px;
            background-color: #0e0905;
            padding: 2px;
        }
    }

    .game-banner {
        border: 1px solid #080500;
        border-radius: 3px;
        background-color: #888888;
        padding: 2px;

        img {
            border-radius: 3px;
        }

        .game-banner-site-name {
            position: absolute;
            z-index: 1020;
            padding: 10px;
            color: #deb97d;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Verdana', sans-serif;
        }

        .game-banner-title {
            position: absolute;
            z-index: 1020;
            padding: 10px;
            padding-top: 35px;
            color: #fff;
            font-size: 0.875rem;
            font-weight: 600;
            font-family: 'Verdana', sans-serif;
        }

        .game-banner-cover {
            transition: 0.5s;
            position: absolute;
            z-index: 1020;
            background-color: rgba(0, 0, 0, 0.6);
            width: 100%;
            height: 100%;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            cursor: pointer;

            padding-top: 30%;
            @media (min-width: 1300px) {
                padding-top: 40%;
            }
            opacity: 0;

            &.active {
                opacity: 1;
            }

            .game-banner-cover-content {
                .game-banner-cover-icon {
                    font-size: 3.5rem;
                    color: #deb97d;
                    text-align: center;
                }
                .game-banner-cover-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    font-family: 'Verdana', sans-serif;
                }
                .game-banner-cover-sub-title {
                    padding-top: 5px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    font-family: 'Verdana', sans-serif;
                    color: #c2c2c2;
                }
            }
        }

        img {
            position: relative;
            width: 100%;
            cursor: pointer;
        }
    }

    .payment-banner {
        width: 98%;
        margin: 0 auto;
        margin-top: 30px;
        padding-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        border-top: 2px solid #888888;
        text-align: center;
    }

    .sports-banner {
        width: 98%;
        margin: 0 auto;
        padding: 20px;
        border-radius: 3px;
        text-align: center;

        @media (min-width: 1200px) {
            margin-top: 30px;
            margin-bottom: 30px;
            padding: 30px;
        }
    }

    .copyright {
        margin-bottom: 30px;
        color: #c2c2c2;
        font-size: 0.75rem;
        text-align: center;
    }
</style>