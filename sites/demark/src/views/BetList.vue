<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'list']"/>
                배팅 내역 <span>BET HISTORY</span>
            </div>
            <div class="bet-history-menu">
                <ul>
                    <li>
                        <span class="bet-history-menu-btn" @click="$tools.pushRouter('/betlist', true)" :class="{'active': search.category === ''}">
                            <font-awesome-icon :icon="['fa', 'book-open']"/> 스포츠
                        </span>
                    </li>
                    <li>
                        <span class="bet-history-menu-btn" @click="$tools.pushRouter('/betlist?category=minigames', true)" :class="{'active': search.category === 'minigames'}">
                            <font-awesome-icon :icon="['fa', 'bell']"/> 미니게임
                        </span>
                    </li>
                    <li>
                        <span class="bet-history-menu-btn"  @click="$tools.ready('/betlist?category=casino', true)" :class="{'active': search.category === 'casino'}">
                            <font-awesome-icon :icon="['fa', 'rocket']"/> 카지노
                        </span>
                    </li>
                </ul>
            </div>
            <div class="list-content" v-if="search.category === ''">
                <div class="row mt-1">
                    <div class="col px-0 px-xl-3">
                        <div class="card bet-card" v-for="(v, index) in data" :key="index">
                            <div class="card-header py-2">
                                <span>
                                    {{ $config.convertSportsGameType[v.gameType] }} - {{ $moment(v.regDateTime).format('YY.MM.DD HH:mm') }}
                                </span>
                                <span class="float-right">
                                    <span class="mr-2" :class="$config.sportsResultBadgeColor[v.betResult]">[ {{ $config.result[v.betResult] }} ]</span>
                                    <button
                                        type="button"
                                        class="btn-board yellow delete"
                                        :disabled="loading"
                                        v-if="v.betResult === 'I' && v.gameType != 'sportsLive' && canCancel(v.regDateTime, v.detail)"
                                        @click="cancelBet(v._id)"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        class="btn-board red delete"
                                        :disabled="loading"
                                        v-if="v.betResult !== 'I'"
                                        @click="deletelBet(v._id)"
                                    >삭제</button>
                                </span>
                            </div>
                            <div class="card-body p-0 mb-3 d-none d-md-block">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th scope="col" width="7%">경기일시</th>
                                                <th scope="col" width="20%">리그</th>
                                                <th scope="col" width="24%">홈팀 vs 원정팀</th>
                                                <th scope="col" width="14%">경기타입</th>
                                                <th scope="col" width="17%">베팅</th>
                                                <th scope="col" width="6%">배당</th>
                                                <th scope="col" width="6%">상태</th>
                                                <th scope="col" width="6%">결과</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(vv, ii) in v.detail" :key="ii"
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
                                                            {{ vv.score ? `${vv.score.homeScore || vv.score.homeScore === 0 ? vv.score.homeScore : '-' }:${vv.score.awayScore || vv.score.awayScore === 0 ? vv.score.awayScore : '-' }` : '-:-' }}
                                                        </span>
                                                    </span>
                                                    <span v-else>-</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col betting-details px-5">
                                    <div class="row">
                                        <div class="col-6 col-xl-3">
                                            베팅금액 : <span>{{ $numeral(v.betAmount).format('0,0') }}</span>
                                        </div>
                                        <div class="col-6 col-xl-3">
                                            예상 당첨금액 : <span>{{ $numeral(parseInt(v.betAmount * v.betRate)).format('0,0') }}</span>
                                        </div>
                                        <div class="col-6 col-xl-3">
                                            배당 : <span>{{ $numeral(v.betRate).format('0,0.00') }}</span>
                                        </div>
                                        <div class="col-6 col-xl-3">
                                            당첨금액 : <span>{{ calcResult(v.betResult, v.betAmount, v.betRate) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-0 mb-3 d-md-none">
                                <div class="mobile-betting-history">
                                    <div class="col betting-history-header">
                                        <div class="row">
                                            <div class="col-3">
                                                일시/리그
                                            </div>
                                            <div class="col-3">
                                                홈팀 vs 원정팀
                                            </div>
                                            <div class="col">
                                                베팅
                                            </div>
                                            <div class="col">
                                                상태/배당
                                            </div>
                                            <div class="col">
                                                결과
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col betting-history-list" v-for="(vv, ii) in v.detail" :key="ii">
                                        <div class="row">
                                            <div class="col-3 mt-2">
                                                <div>
                                                    {{ $moment(vv.gameDateTime).format('MM/DD HH:mm') }}
                                                </div>
                                                <div class="league-name">
                                                    <img :src="`/images/${$config.iconSport[vv.sport]}`" class="sports-img">
                                                    {{ vv.leagueKor }}
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="team-name">{{ vv.homeTeam }}</div>
                                                <div class="team-name">VS</div>
                                                <div class="team-name">{{ vv.awayTeam }}</div>
                                            </div>
                                            <div class="col-2 mt-1">
                                                <div class="event-name">{{ $config.convertBetTypeSports[vv.type] }}</div>
                                                <div v-if="vv.standard || vv.standard === 0">
                                                    [{{
                                                        vv.type === 'bothTeamsGoalWin' || vv.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[vv.standard] :
                                                        vv.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(vv.standard) : vv.standard
                                                    }}]
                                                </div>
                                                <span v-if="vv.type !== 'correctScoreFullTime'">
                                                    ({{ $config.convertBetSelectSports[vv.select] }})
                                                </span>
                                            </div>
                                            <div class="col mt-1" :class="$config.sportsResultTextColor[vv.betResult]">
                                                {{ $config.result[vv.betResult] }}
                                                <div class="text-white">
                                                    {{ $numeral(vv.finalRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col mt-1">
                                                <span v-if="vv.betResult !== 'I'">
                                                    <span v-if="$config.specialGameType.indexOf(vv.type) > -1">
                                                        {{ displaySpecialScore(vv.type, vv.select, vv.betResult) }}
                                                    </span>
                                                    <span v-else>
                                                        {{ vv.score ? `${vv.score.homeScore || vv.score.homeScore === 0 ? vv.score.homeScore : '-' }:${vv.score.awayScore || vv.score.awayScore === 0 ? vv.score.awayScore : '-' }` : '-:-' }}
                                                    </span>
                                                </span>
                                                <span v-else>-</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col betting-details px-5">
                                        <div class="row">
                                            <div class="col-6 col-xl-3">
                                                베팅금액 : <span>{{ $numeral(v.betAmount).format('0,0') }}</span>
                                            </div>
                                            <div class="col-6 col-xl-3">
                                                예상 당첨금액 : <span>{{ $numeral(parseInt(v.betAmount * v.betRate)).format('0,0') }}</span>
                                            </div>
                                            <div class="col-6 col-xl-3">
                                                배당 : <span>{{ $numeral(v.betRate).format('0,0.00') }}</span>
                                            </div>
                                            <div class="col-6 col-xl-3">
                                                당첨금액 : <span>{{ calcResult(v.betResult, v.betAmount, v.betRate) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-right px-2 px-xl-3">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deleteBetAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체 삭제
                        </button>
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
                        ></b-pagination-nav>
                    </div>
                </div>
            </div>
            <div class="list-content" v-if="search.category === 'minigames'">
                <div class="row mt-2">
                    <div class="col text-center">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board text-nowrap">
                                <thead>
                                    <tr>
                                        <th>일시</th>
                                        <th>종류</th>
                                        <th>회차/배팅</th>
                                        <th>배팅머니</th>
                                        <th>당첨금</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>
                                            {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                        </td>
                                        <td>
                                            {{ $config.convertMiniGameType[item.gameKind] }}
                                        </td>
                                        <td>
                                            {{ item.round }} ({{ item.rotation }}) {{ betSelectConvert(item.betType, item.betSelect) }} <span v-if="item.isFollow" class="badge badge-info">F</span>
                                        </td>
                                        <td>{{ $numeral(item.betAmount).format('0,0') }}</td>
                                        <td :class="item.betResult === 'W' ? 'text-blue-green' : item.betResult === 'L' ? 'text-pink' : ''">{{ item.betResult === 'W' ? $numeral(item.betBenefit).format(0,0) : item.betResult === 'L' ? 0 : '진행중' }}</td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn-delete"
                                                :disabled="loading"
                                                v-if="item.betResult !== 'I'"
                                                @click="deletelMinigamesBet(item._id)"
                                            >삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col text-right">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deleteBetAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체 삭제
                        </button>
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
                        ></b-pagination-nav>
                    </div>
                </div>
            </div>
            <div class="list-content" v-if="search.category === 'casino'">
                <div class="row mt-2">
                    <div class="col text-center">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board text-nowrap">
                                <thead>
                                    <tr>
                                        <th>일시</th>
                                        <th>종류</th>
                                        <th>배팅금액</th>
                                        <th>배팅당첨</th>
                                        <th>상태</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>
                                            {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                        </td>
                                        <td>
                                            {{ $config.convertCasinoGame[item.productID] ? $config.convertCasinoGame[item.productID] : '기타' }}
                                        </td>
                                        <td>
                                            {{ $numeral(item.betAmount).format('0,0') }}
                                        </td>
                                        <td>
                                            {{ item.betResult === 'W' ? $numeral(item.betBenefit).format('0,0') : item.betResult === 'L' ? '0' : '-' }}
                                        </td>
                                        <td :class="item.betResult === 'W' ? 'text-blue-green' : item.betResult === 'L' ? 'text-pink' : ''">{{ item.betResult === 'W' ? $numeral(item.betBenefit).format(0,0) : item.betResult === 'L' ? 0 : '진행중' }}</td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn-delete"
                                                :disabled="loading"
                                                v-if="item.betResult !== 'I'"
                                                @click="deletelCasinoBet(item._id)"
                                            >삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-right mt-2">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deleteBetAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체 삭제
                        </button>
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
                        ></b-pagination-nav>
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
                    page: 1,
                    category: ''
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
                this.search.category = this.$route.query.category ? this.$route.query.category : ''
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}&category=${this.search.category}`
            },
            async getList() {
                let endPoint = ''
                if(this.search.category === '') {
                    endPoint = '/api/get-sports-bet-list'
                }
                else if(this.search.category === 'minigames') {
                    endPoint = '/api/get-minigmaes-bet-list'
                }
                else if(this.search.category === 'casino') {
                    endPoint = '/api/get-casino-bet-list'
                }

                const r = await this.$http.get(endPoint, this.search)
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
            async deletelMinigamesBet(_id) {
                let r = await this.$http.delete('/api/delete-minigames-bet', { _id })
                if(r.error) return

                this.getList()
            },
            async deletelCasinoBet(_id) {
                let r = await this.$http.delete('/api/delete-casino-bet', { _id })
                if(r.error) return

                this.getList()
            },
            async deleteBetAll() {
                let r = await this.$http.delete('/api/delete-sports-bet-all')
                if(r.error) return

                this.getList()
            },
            async deleteMinigamesBetAll() {
                let r = await this.$http.delete('/api/delete-minigames-bet-all')
                if(r.error) return

                this.getList()
            },
            async deleteCasinoBetAll() {
                let r = await this.$http.delete('/api/delete-casino-bet-all')
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
            },
            betSelectConvert(type, select) {
                let resultType = ''
                if(type === 'PWBPOE' || type === 'PWBPUO' || type === 'PWBPCOMBO') { resultType = '파워' }
                if(type === 'PWBNOE' || type === 'PWBNUO' || type === 'PWBNCOMBO' || type === 'PWBBMS' || type === 'PWBBMSCOMBO') { resultType = '일반' }
                if(type === 'PWBRNAPOE' || type === 'PWBRNCOMBO') { resultType = '역' }

                let resultSelect = ''
                if(select === 'Odd') resultSelect = '홀'
                if(select === 'Even') resultSelect = '짝'
                if(select === 'Under') resultSelect = '언더'
                if(select === 'Over') resultSelect = '오버'
                if(select === 'OddUnder') resultSelect = '홀+언더'
                if(select === 'EvenUnder') resultSelect = '짝+언더'
                if(select === 'OddOver') resultSelect = '홀+오버'
                if(select === 'EvenOver') resultSelect = '짝+오버'
                if(select === 'Big') resultSelect = '대'
                if(select === 'Middle') resultSelect = '중'
                if(select === 'Small') resultSelect = '소'
                if(select === 'OddBig') resultSelect = '홀+대'
                if(select === 'OddMiddle') resultSelect = '홀+중'
                if(select === 'OddSmall') resultSelect = '홀+소'
                if(select === 'EvenBig') resultSelect = '짝+대'
                if(select === 'EvenMiddle') resultSelect = '짝+중'
                if(select === 'EvenSmall') resultSelect = '짝+소'
                if(select === 'OddUnderOdd') resultSelect = '홀+언더/홀'
                if(select === 'OddUnderEven') resultSelect = '홀+언더/짝'
                if(select === 'OddOverOdd') resultSelect = '홀+오버/홀'
                if(select === 'OddOverEven') resultSelect = '홀+오버/짝'
                if(select === 'EvenUnderOdd') resultSelect = '짝+언더/홀'
                if(select === 'EvenUnderEven') resultSelect = '짝+언더/짝'
                if(select === 'EvenOverOdd') resultSelect = '짝+오버/홀'
                if(select === 'EvenOverEven') resultSelect = '짝+오버/짝'
                if(select === 'Left') resultSelect = '좌출'
                if(select === 'Right') resultSelect = '우출'
                if(select === 'Three') resultSelect = '3줄'
                if(select === 'Four') resultSelect = '4줄'
                if(select === 'LeftThree') resultSelect = '좌3'
                if(select === 'LeftFour') resultSelect = '좌4'
                if(select === 'RightThree') resultSelect = '우3'
                if(select === 'RightFour') resultSelect = '우4'

                return `${resultType} [${resultSelect}]`
            }
        }
    }
</script>
