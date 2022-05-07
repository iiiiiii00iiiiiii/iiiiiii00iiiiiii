<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'list']"/>
                            <span class="ml-2">배팅 내역 BET HISTORY</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="bet-list">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="deleteBetAll()">
                                    <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체 삭제
                                </button>
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="getList()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="card bet-card mb-3" v-for="(v, index) in data" :key="index">
                                    <div class="card-header">
                                        <span>
                                            {{ $config.convertSportsGameType[v.gameType] }} - {{ $moment(v.regDateTime).format('YY.MM.DD HH:mm') }}
                                        </span>
                                        <span class="float-right">
                                            <span class="mr-2" :class="$config.sportsResultBadgeColor[v.betResult]">[ {{ $config.result[v.betResult] }} ]</span>
                                            <button
                                                type="button"
                                                class="btn-board"
                                                :disabled="loading"
                                                v-if="v.betResult === 'I' && v.gameType != 'sportsLive' && canCancel(v.regDateTime, v.detail)"
                                                @click="cancelBet(v._id)"
                                            >
                                                <font-awesome-icon :icon="['fa', 'window-close']"/> 배팅 취소
                                            </button>
                                            <button
                                                type="button"
                                                class="btn-board"
                                                :disabled="loading"
                                                v-if="v.betResult !== 'I'"
                                                @click="deletelBet(v._id)"
                                            >배팅 삭제</button>
                                        </span>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-borderless table-board text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" width="7%">경기시간</th>
                                                        <th scope="col" width="20%">리그</th>
                                                        <th scope="col" width="24%">홈팀 vs 원정팀</th>
                                                        <th scope="col" width="14%">경기타입</th>
                                                        <th scope="col" width="20%">배팅</th>
                                                        <th scope="col" width="5%">배당</th>
                                                        <th scope="col" width="5%">상태</th>
                                                        <th scope="col" width="5%">결과</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        class="bg-content text-light-gray"
                                                        v-for="(vv, ii) in v.detail"
                                                        :key="ii"
                                                    >
                                                        <td>{{ $moment(vv.gameDateTime).format('MM/DD HH:mm') }}</td>
                                                        <td>
                                                            <img :src="`/images/${$config.iconSport[vv.sport]}`" class="sports-img">
                                                            {{ vv.leagueKor }}
                                                        </td>
                                                        <td>{{ vv.homeTeam }} vs {{ vv.awayTeam }}</td>
                                                        <td>{{ $config.convertBetTypeSports[vv.type] }}</td>
                                                        <td>
                                                            <span>{{ $config.convertBetTypeSports[vv.type] }}</span>
                                                            <span v-if="vv.standard || vv.standard === 0">
                                                                [{{
                                                                    vv.type === 'bothTeamsGoalWin' || vv.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[vv.standard] :
                                                                    vv.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(vv.standard) : vv.standard
                                                                }}]
                                                            </span>
                                                            <span v-if="vv.type !== 'correctScoreFullTime'"> ({{ $config.convertBetSelectSports[vv.select] }})</span>
                                                        </td>
                                                        <td>{{ $numeral(vv.finalRate).format('0.00') }}</td>
                                                        <td :class="$config.sportsResultTextColor[vv.betResult]">{{ $config.result[vv.betResult] }}</td>
                                                        <td>
                                                            <span v-if="vv.betResult !== 'I'">
                                                                <span v-if="$config.specialGameType.indexOf(vv.type) > -1">
                                                                    {{ displaySpecialScore(vv.type, vv.select, vv.betResult) }}
                                                                </span>
                                                                <span v-else>
                                                                    <span v-if="vv.gameType === 'sportsLiveKor'">
                                                                        {{ vv.score ? `${vv.score.homeScoreQuarter || vv.score.homeScoreQuarter === 0 ? vv.score.homeScoreQuarter : '-' }:${vv.score.awayScoreQuarter || vv.score.awayScoreQuarter === 0 ? vv.score.awayScoreQuarter : '-' }` : '-:-' }}
                                                                    </span>
                                                                    <span v-else>
                                                                        {{ vv.score ? `${vv.score.homeScore || vv.score.homeScore === 0 ? vv.score.homeScore : '-' }:${vv.score.awayScore || vv.score.awayScore === 0 ? vv.score.awayScore : '-' }` : '-:-' }}
                                                                    </span>
                                                                </span>
                                                            </span>
                                                            <span v-else>-</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6 col-xl-3 text-light-brown">
                                                배팅금액 : <span>{{ $numeral(v.betAmount).format('0,0') }}</span>
                                            </div>
                                            <div class="col-6 col-xl-3 text-light-brown">
                                                예상 당첨금액 : <span>{{ $numeral(parseInt(v.betAmount * v.betRate)).format('0,0') }}</span>
                                            </div>
                                            <div class="col-6 mt-2 mt-xl-0 col-xl-3 text-light-brown">
                                                배당 : {{ $numeral(v.betRate).format('0,0.00') }} <span class="text-pink" v-if="v.bonusRate">(<font-awesome-icon :icon="['fab', 'bitcoin']"/> {{ v.bonusRate }})</span>
                                            </div>
                                            <div class="col-6 mt-2 mt-xl-0 col-xl-3 text-green">
                                                당첨금액 : <span>{{ calcResult(v.betResult, v.betAmount, v.betRate) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <b-pagination-nav
                                    first-class="first-class"
                                    last-class="last-class"
                                    prev-class="prev-class"
                                    next-class="next-class"
                                    ellipsis-class="ellipsis-class"
                                    page-class="page-class"
                                    :link-gen="linkGen"
                                    :number-of-pages="numberOfPages"
                                    align="center"
                                    :limit="$config.pageLimit"
                                    use-router
                                    v-model="search.page"
                                    pills
                                    size="sm"
                                ></b-pagination-nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'BetList',
        components: {
        },
        computed: {
            ...mapGetters(['loading']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
            }
        },
        data() {
            return {
                search: {
                    page: 1
                },
                data: [],
                totalCount: 0
            }
        },
        created() {
            this.setFromRouter()
        },
        methods: {
            ...mapActions(['getInformation']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-sports-bet-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            canCancel(regDateTime, detail) {
                let now = this.$moment().unix()
                regDateTime = this.$moment(regDateTime).unix()

                if(regDateTime + 600 <= now) {
                    return false
                }

                let result = true
                for(let i = 0; i < detail.length; i++) {
                    let gameDateTime = this.$moment(detail[i].gameDateTime).unix()
                    if(now >= gameDateTime) {
                        result = false
                        break
                    }
                }
                return result
            },
            async cancelBet(_id) {
                let r = await this.$http.put('/api/cancel-sports-bet', { _id })
                if(r.error) return

                this.getList()
                this.getInformation()
            },
            async deletelBet(_id) {
                let r = await this.$http.delete('/api/delete-sports-bet', { _id })
                if(r.error) return

                this.getList()
            },
            async deleteBetAll() {
                let r = await this.$http.delete('/api/delete-sports-bet-all')
                if(r.error) return

                this.getList()
            },
            calcResult(betResult, betAmount, betRate) {
                if(betResult === 'I' || betResult === 'L' || betResult === 'C') {
                    return 0
                }

                if(betResult === 'N') {
                    return this.$numeral(betAmount).format('0,0')
                }

                if(betResult === 'W') {
                    return this.$numeral(parseInt(betAmount * betRate)).format('0,0')
                }
            },
            displaySpecialScore(type, select, betResult) {
                let score = ''
                if((select === 'home' && betResult === 'W') || (select === 'away' && betResult === 'L')) {
                    score = '홈'
                }
                else if((select === 'home' && betResult === 'L') || (select === 'away' && betResult === 'W')) {
                    score = '원정'
                }

                if(type === 'run1stInning') {
                    score = score.replace(/홈/gi, '득점').replace(/원정/gi, '무득점')
                }

                return score
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bet-card {
        border: 0;

        .card-header {
            background-color: #312215 !important;
            color: #e2e2e2;
        }
        .card-body {
            background-color: #0f0c08 !important;
        }
    }
</style>