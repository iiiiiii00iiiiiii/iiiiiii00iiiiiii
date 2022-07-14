<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'history']"/>
                            <span class="ml-2">경기결과 BET HISTORY</span>
                            <span class="float-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="$tools.pushRouter('/gameresults')">
                                    <font-awesome-icon :icon="['fa', 'globe']"/> 전체보기
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="sports-icon">
                        <div class="sports-icon-wrap">
                            <ul>
                                <li>
                                    <img src="/images/icon-football-gray.png" class="sports-category-icon" id="Football" alt="축구" title="축구" @click="selectCategory('Football')">
                                    <b-tooltip target="Football" title="축구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-basketball-gray.png" class="sports-category-icon" id="Basketball" alt="농구" title="농구" @click="selectCategory('Basketball')">
                                    <b-tooltip target="Basketball" title="농구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-baseball-gray.png" class="sports-category-icon" id="Baseball" alt="야구" title="야구" @click="selectCategory('Baseball')">
                                    <b-tooltip target="Baseball" title="야구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-icehockey-gray.png" class="sports-category-icon" id="Ice Hockey" alt="아이스하키" title="아이스하키" @click="selectCategory('Ice Hockey')">
                                    <b-tooltip target="Ice Hockey" title="아이스하키"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-handball-gray.png" class="sports-category-icon" id="Handball" alt="핸드볼" title="핸드볼" @click="selectCategory('Handball')">
                                    <b-tooltip target="Handball" title="핸드볼"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구" @click="selectCategory('Volleyball')">
                                    <b-tooltip target="Volleyball" title="배구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-rugby-gray.png" class="sports-category-icon" id="Rugby League" alt="럭비" title="럭비" @click="selectCategory('Rugby League')">
                                    <b-tooltip target="Rugby League" title="럭비"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-rugbyunion-gray.png" class="sports-category-icon" id="Rugby Union" alt="럭비유니언" title="럭비유니언" @click="selectCategory('Rugby Union')">
                                    <b-tooltip target="Rugby Union" title="럭비유니언"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-boxing-gray.png" class="sports-category-icon" id="Boxing" alt="권투" title="권투" @click="selectCategory('Boxing')">
                                    <b-tooltip target="Boxing" title="권투"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-mma-gray.png" class="sports-category-icon" id="MMA" alt="이종격투기" title="이종격투기" @click="selectCategory('MMA')">
                                    <b-tooltip target="MMA" title="이종격투기"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-golf-gray.png" class="sports-category-icon" id="Golf" alt="골프" title="골프" @click="selectCategory('Golf')">
                                    <b-tooltip target="Golf" title="골프"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-darts-gray.png" class="sports-category-icon" id="Darts" alt="다트" title="다트" @click="selectCategory('Darts')">
                                    <b-tooltip target="Darts" title="다트"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-lol-gray.png" class="sports-category-icon" id="LOL" alt="LOL" title="LOL" @click="selectCategory('LoL')">
                                    <b-tooltip target="LOL" title="LOL"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-csgo-gray.png" class="sports-category-icon" id="CS:GO" alt="CS:GO" title="CS:GO" @click="selectCategory('CS:GO')">
                                    <b-tooltip target="CS:GO" title="CS:GO"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-dota2-gray.png" class="sports-category-icon" id="Dota 2" alt="Dota 2" title="Dota 2" @click="selectCategory('Dota 2')">
                                    <b-tooltip target="Dota 2" title="Dota 2"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-fifa-gray.png" class="sports-category-icon" id="FIFA" alt="FIFA" title="FIFA" @click="selectCategory('FIFA')">
                                    <b-tooltip target="FIFA" title="FIFA"></b-tooltip>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <b-overlay :show="overlay" variant="white" opacity="0.2" rounded="sm">
                <div class="row mt-1">
                    <div class="col">
                        <div class="sports">
                            <div class="row mb-2" v-for="(v, index) in data" :key="index">
                                <div class="col-9 col-xl-12 mt-3 g-league-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                    <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img">
                                    <span class="g-league">
                                        <font-awesome-icon :icon="['fa', 'angle-double-right']" class="ml-1 icon-league"/>
                                        {{ v.leagueKor }}
                                    </span>
                                </div>
                                <div class="col-3 d-xl-none mt-3 text-right g-date-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                    {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                </div>
                                <div class="col-12 mt-1" :class="{'mb-3': index + 1 === data.length}">
                                    <div class="sports-px">
                                        <div class="row g">
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col-5 g-home">
                                                <div class="float-left pl-2 g-home-team-mobile">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                            </div>
                                            <div class="col-5 g-away">
                                                <div class="float-right pr-2 g-away-team-mobile">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col g-count o">
                                                {{ v.resultDraw ? '적특' : `${v.resultData.homeScoreTotal}:${v.resultData.awayScoreTotal}` }}
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
        name: 'GameResults',
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