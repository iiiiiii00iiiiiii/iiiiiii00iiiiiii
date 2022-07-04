<template>
    <div class="row">
        <div class="col-12 main-content-wrap">
            <div class="main-view d-none d-md-block">
                <div>
                    <b-carousel
                        id="carousel-1"
                        :interval="3000"
                        indicators
                        background="#ababab"
                        style="text-shadow: 1px 1px 2px #333;"
                    >
                        <b-carousel-slide img-src="images/bg-main01.jpg"></b-carousel-slide>

                        <b-carousel-slide img-src="images/bg-main02.jpg"></b-carousel-slide>

                        <b-carousel-slide img-src="images/bg-main03.jpg"></b-carousel-slide>

                    </b-carousel>
                </div>
            </div>
            <div class="main-view d-md-none">
                <div>
                    <b-carousel
                        id="carousel-1"
                        :interval="3000"
                        indicators
                        background="#ababab"
                        style="text-shadow: 1px 1px 2px #333;"
                    >
                        <b-carousel-slide img-src="images/bg-mobile-main01.jpg"></b-carousel-slide>

                        <b-carousel-slide img-src="images/bg-mobile-main02.jpg"></b-carousel-slide>

                        <b-carousel-slide img-src="images/bg-mobile-main03.jpg"></b-carousel-slide>

                    </b-carousel>
                </div>
            </div>
            <div class="middle-contents">
                <div class="contents-data">
                    <div class="content-header">
                        <span>
                            <font-awesome-icon :icon="['fa', 'bell']"/> 스포츠매치
                        </span>
                        <span class="entire-btn" @click="$tools.pushRouter('/sports', false)">전체보기</span>
                    </div>
                    <div class="content-game" v-for="(v, index) in prematch" :key="index">
                        <div class="game-header">
                            <span class="competition-event">
                                <span>
                                    <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img"> {{ $config.sport[v.sport] }}
                                </span>
                                <font-awesome-icon class="double-right-icon" :icon="['fa', 'angle-double-right']"/>
                                <b class="competition-league">
                                    <img :src="`http://img.thvmxm.com/${$config.iconCountry[v.countryKor]}.png`" alt="아이스하키" title="아이스하키"> {{ v.countryKor }}
                                </b>
                            </span>
                        </div>
                        <div class="team-name">
                            <ul>
                                <li>
                                    <span>{{ $moment(v.gameDateTime).format('MM-DD HH:mm') }}</span>
                                </li>
                                <li>
                                    <span class="content-game-home">{{ v.homeTeamKor }}</span>
                                    <span class="content-game-vs">vs</span>
                                    <span class="content-game-away">{{ v.awayTeamKor }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="contents-data d-none d-md-block">
                    <div class="content-header">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-alarm-fill" viewBox="0 0 16 16">
                                <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"/>
                            </svg> 라이브매치
                        </span>
                        <span class="entire-btn" @click="$tools.pushRouter('/sportslive', false)">전체보기</span>
                    </div>
                    <div class="content-game" v-for="(v, index) in live" :key="index">
                        <div class="game-header">
                            <span class="competition-event">
                                <span>
                                    <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img"> {{ $config.sport[v.sport] }}
                                </span>
                                <font-awesome-icon class="double-right-icon" :icon="['fa', 'angle-double-right']"/>
                                <b class="competition-league">
                                    <img :src="`http://img.thvmxm.com/${$config.iconCountry[v.countryKor]}.png`" alt="아이스하키" title="아이스하키"> {{ v.countryKor }}
                                </b>
                            </span>
                        </div>
                        <div class="team-name">
                            <ul>
                                <li>
                                    <span>{{ $moment(v.gameDateTime).format('MM-DD HH:mm') }}</span>
                                </li>
                                <li>
                                    <span class="content-game-home">{{ v.homeTeamKor }}</span>
                                    <span class="content-game-vs">vs</span>
                                    <span class="content-game-away">{{ v.awayTeamKor }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-contents">
                <div class="row">
                    <div class="col-4 col-xl-2 cursor-pointer" @click="$tools.pushRouter('/sports', true)">
                        <img src="/images/banner-1.png" class="img-fluid" alt="SPORTS" title="SPORTS">
                    </div>
                    <div class="col-4 col-xl-2 cursor-pointer" @click="$tools.pushRouter('/sportscross', true)">
                        <img src="/images/banner-2.png" class="img-fluid" alt="SPORTS CROSS" title="SPORTS CROSS">
                    </div>
                    <div class="col-4 col-xl-2 cursor-pointer" @click="$tools.pushRouter('/sportsspecial', true)">
                        <img src="/images/banner-3.png" class="img-fluid" alt="SPORTS SPECIAL" title="SPORTS SPECIAL">
                    </div>
                    <div class="col-4 col-xl-2 cursor-pointer mt-2 mt-xl-0" @click="$tools.pushRouter('/MiniGameMenu', true)">
                        <img src="/images/banner-4.png" class="img-fluid" alt="MNIGAME" title="MNIGAME">
                    </div>
                    <div class="col-4 col-xl-2 cursor-pointer mt-2 mt-xl-0" @click="$tools.pushRouter('/casino', true)">
                        <img src="/images/banner-5.png" class="img-fluid" alt="CASINO" title="CASINO">
                    </div>
                    <div class="col-4 col-xl-2 cursor-pointer mt-2 mt-xl-0"  @click="openKplay(0)">
                        <img src="/images/banner-6.png" class="img-fluid" alt="SLOT" title="SLOT">
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
            ...mapGetters(['user'])
        },
        data() {
            return {
                bannerIndex: null,
                selectBoard: 'notice',
                notice: [],
                event: [],
                faq: [],
                prematch: [],
                live: []
            }
        },
        created() {
            this.getDashboard()
            this.getMatch()
        },
        methods: {
            async getDashboard() {
                const r = await this.$http.get('/api/get-home', { n: 100 })
                if(r.error) return

                this.notice = r.data.dashboard.notice
                this.event = r.data.dashboard.event
                this.faq = r.data.dashboard.faq
            },
            async getMatch() {
                const r = await this.$http.get('/api/get-home-match')

                this.prematch = r.data.prematch
                this.live = r.data.live
                if(r.error) return
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

.board {
        border: 1px solid #000;
        border-radius: 3px;
        background-color: #1d2024;
        padding: 2px;

        .board-title {
            padding: 10px;
            border-top: 3px solid #bdbdbd62;
            font-weight: 700;
            color: #c2c2c2;

            span {
                cursor: pointer;
            }

            .active {
                color: #fff;
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
                        background-color: #272c31;
                    }
                    &:nth-child(even) {
                        background-color: #2c3033;
                    }
                }
            }
            color: #c2c2c2;
        }
    }
</style>