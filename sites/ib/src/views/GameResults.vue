<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col sports-page">
            <div class="row">
                <div class="col">
                    <div class="sports-page-header">
                        <font-awesome-icon :icon="['fa', 'history']"/>
                        결기결과 <span>BET HISTORY</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="sports-icon">
                        <div class="sports-icon-wrap">
                            <ul>
                                <li @click="selectCategory('')">
                                    <img src="/images/icon-all-gray.png" class="sports-category-icon" alt="전체" title="전체">
                                    <div class="mt-1">전체</div>
                                </li>
                                <li @click="selectCategory('Football')">
                                    <img src="/images/icon-football-gray.png" class="sports-category-icon" id="Football" alt="축구" title="축구">
                                    <div class="mt-1">축구</div>
                                </li>
                                <li @click="selectCategory('Basketball')">
                                    <img src="/images/icon-basketball-gray.png" class="sports-category-icon" id="Basketball" alt="농구" title="농구">
                                    <div class="mt-1">농구</div>
                                </li>
                                <li @click="selectCategory('Baseball')">
                                    <img src="/images/icon-baseball-gray.png" class="sports-category-icon" id="Baseball" alt="야구" title="야구">
                                    <div class="mt-1">야구</div>
                                </li>
                                <li  @click="selectCategory('Ice Hockey')">
                                    <img src="/images/icon-icehockey-gray.png" class="sports-category-icon" id="Ice Hockey" alt="아이스하키" title="아이스하키">
                                    <div class="mt-1">아이스하키</div>
                                </li>
                                <li @click="selectCategory('Tennis')">
                                    <img src="/images/icon-tennis-gray.png" class="sports-category-icon" id="Tennis" alt="테니스" title="테니스">
                                    <div class="mt-1">테니스</div>
                                </li>
                                <li @click="selectCategory('Handball')">
                                    <img src="/images/icon-handball-gray.png" class="sports-category-icon" id="Handball" alt="핸드볼" title="핸드볼">
                                    <div class="mt-1">핸드볼</div>
                                </li>
                                <li @click="selectCategory('Volleyball')">
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구">
                                    <div class="mt-1">배구</div>
                                </li>
                                <li  @click="selectCategory('Rugby League')">
                                    <img src="/images/icon-rugby-gray.png" class="sports-category-icon" id="Rugby League" alt="럭비" title="럭비">
                                    <div class="mt-1">럭비</div>
                                </li>
                                <li @click="selectCategory('Rugby Union')">
                                    <img src="/images/icon-rugbyunion-gray.png" class="sports-category-icon" id="Rugby Union" alt="럭비유니언" title="럭비유니언">
                                    <div class="mt-1">럭비유니언</div>
                                </li>
                                <li @click="selectCategory('Boxing')">
                                    <img src="/images/icon-boxing-gray.png" class="sports-category-icon" id="Boxing" alt="권투" title="권투">
                                    <div class="mt-1">권투</div>
                                </li>
                                <li @click="selectCategory('Table Tennis')">
                                    <img src="/images/icon-tabletennis-gray.png" class="sports-category-icon" id="Table Tennis" alt="탁구" title="탁구">
                                    <div class="mt-1">탁구</div>
                                </li>
                                <li @click="selectCategory('MMA')">
                                    <img src="/images/icon-mma-gray.png" class="sports-category-icon" id="MMA" alt="이종격투기" title="이종격투기">
                                    <div class="mt-1">이종격투기</div>
                                </li>
                                <li @click="selectCategory('Golf')">
                                    <img src="/images/icon-golf-gray.png" class="sports-category-icon" id="Golf" alt="골프" title="골프">
                                    <div class="mt-1">골프</div>
                                </li>
                                <li @click="selectCategory('Darts')">
                                    <img src="/images/icon-darts-gray.png" class="sports-category-icon" id="Darts" alt="다트" title="다트">
                                    <div class="mt-1">다트</div>
                                </li>
                                <!-- <li @click="selectCategory('LoL')">
                                    <img src="/images/icon-lol-gray.png" class="sports-category-icon" id="LOL" alt="LOL" title="LOL">
                                    <div class="mt-1">LOL</div>
                                </li> -->
                                <li @click="selectCategory('CS:GO')">
                                    <img src="/images/icon-csgo-gray.png" class="sports-category-icon" id="CS:GO" alt="CS:GO" title="CS:GO">
                                    <div class="mt-1">CS:GO</div>
                                </li>
                                <li @click="selectCategory('Dota 2')">
                                    <img src="/images/icon-dota2-gray.png" class="sports-category-icon" id="Dota 2" alt="Dota 2" title="Dota 2">
                                    <div class="mt-1">Dota 2</div>
                                </li>
                                <li @click="selectCategory('FIFA')">
                                    <img src="/images/icon-fifa-gray.png" class="sports-category-icon" id="FIFA" alt="FIFA" title="FIFA">
                                    <div class="mt-1">FIFA</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1 px-1">
                <div class="col-12 game-info-box d-none d-xl-block">
                    <div class="row">
                        <div class="col-2">
                            리그/경기일시
                        </div>
                        <div class="col">
                            승(홈)언더
                        </div>
                        <div class="col">
                            무/핸/합
                        </div>
                        <div class="col">
                            패(원정)언더
                        </div>
                        <div class="col-2">
                            스코어
                        </div>
                    </div>
                </div>
            </div>
            <b-overlay :show="overlay" variant="white" opacity="0.2" rounded="sm">
                <div class="row mt-2">
                    <div class="col">
                        <div class="sports">
                            <div class="row" v-for="(v, index) in data" :key="index">
                                <div class="col-9 col-xl-12 g-league-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                    <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img">
                                    <span class="g-league">
                                        <font-awesome-icon :icon="['fa', 'angle-double-right']" class="ml-1 icon-league"/>
                                        {{ v.leagueKor }}
                                    </span>
                                </div>
                                <div class="col-3 d-xl-none text-right g-date-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                    {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                </div>
                                <div class="col-12" :class="{'mb-3': index + 1 === data.length}">
                                    <div class="sports-px">
                                        <div class="row g">
                                            <div class="col col-xl-2 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col-4 col-xl g-home">
                                                <div class="float-left g-home-team-mobile">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 col-xl g-x">
                                                VS
                                            </div>
                                            <div class="col-4 col-xl g-away">
                                                <div class="float-right g-away-team-mobile">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col col-xl-2 g-count o">
                                                <div class="pt-2 pt-xl-0">
                                                    {{ v.resultDraw ? '적특' : `${v.resultData.homeScoreTotal}:${v.resultData.awayScoreTotal}` }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <infinite-loading @infinite="infiniteHandler" ref="InfiniteLoading" spinner="waveDots">
                                <div slot="no-more" class="text-light-brown">마지막 페이지 입니다</div>
                                <div slot="no-results" class="text-light-brown">마지막 페이지 입니다</div>
                            </infinite-loading>
                        </div>
                    </div>
                </div>
            </b-overlay>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import InfiniteLoading from "vue-infinite-loading"

    export default {
        name: 'Sports',
        components: {
            InfiniteLoading
        },
        computed: {
            ...mapGetters(['loading', 'isLogin', 'user', 'betCart']),
            // numberOfPages() {
            //     return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            // }
        },
        watch: {
            '$route' () {
                this.getInitList()
            }
        },
        data() {
            return {
                overlay: false,
                search: {
                    page: 1,
                    sport: '',
                    league: ''
                },
                expand: {},
                data: []
                //dataCount: 0
            }
        },
        created() {
            this.setFromRouter()
            // this.getList()
        },
        methods: {
            ...mapActions(['setBetCart', 'changeBetCart', 'deleteBetCart', 'deleteBetCartAll', 'setBetInfo']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''
                this.search.league = this.$route.query.league ? this.$route.query.league : ''

                // this.getList()
                // this.infiniteHandler()
            },
            getInitList() {
                this.data = []
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''
                this.search.league = this.$route.query.league ? this.$route.query.league : ''

                this.getList()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}&league=${this.search.league}`
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-game-results', this.search)
                this.overlay = false
                if(r.error) return

                this.data = r.data.recordSet
            },
            async infiniteHandler($state) {
                try {
                    const r = await this.$http.get('/api/get-game-results', this.search)
                    this.search.page++

                    if(r.data.recordSet.length > 0) {
                        setTimeout(() => {
                            for(const games of r.data.recordSet) {
                                this.data.push(games)
                            }

                            $state.loaded()
                            if(r.data.recordSet.length < this.$config.pageSize) {
                                $state.complete()
                            }
                        }, 1000)
                    } else {
                        $state.complete()
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            selectCategory(sport) {
                this.search.sport = sport
                this.search.league = ''
                let path = encodeURI(`${this.$route.path}${this.linkGen(1)}`)
                if(path === this.$route.fullPath) {
                    this.getList()
                    return
                }
                this.$router.push(path)
            }
        },
        beforeRouteLeave (to, from, next) {
            this.deleteBetCartAll()
            next()
        }
    }
</script>