<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">게시판 상세 BOARD DETAIL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-detail">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="getDetail()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="$tools.pushRouter(`/free/?page=${$route.params.page}`)">
                                    <font-awesome-icon :icon="['fa', 'list']"/> 목록
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div class="float-left">
                                                        {{ title }}
                                                    </div>
                                                    <div class="float-right text-yellow">
                                                        <img class="comment-level" :src="`/images/icon-lv${ writerGrade ? writerGrade : 1 }.png`">
                                                        {{ writerNick }}
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div>
                                                        {{ content }}
                                                    </div>
                                                    <div class="row mt-3" v-if="betInfo">
                                                        <div class="col">
                                                            <div class="card bet-card mb-3">
                                                                <div class="card-header">
                                                                    <span>
                                                                        {{ $config.convertSportsGameType[betInfo.gameType] }} - {{ $moment(betInfo.regDateTime).format('YY.MM.DD HH:mm') }}
                                                                    </span>
                                                                    <span class="float-right">
                                                                        <span class="mr-2" :class="$config.sportsResultBadgeColor[betInfo.betResult]">[ {{ $config.result[betInfo.betResult] }} ]</span>
                                                                    </span>
                                                                </div>
                                                                <!-- pc -->
                                                                <div class="card-body d-none d-md-block">
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
                                                                                    v-for="(vv, ii) in betInfo.detail"
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
                                                                                                {{ vv.score ? `${vv.score.homeScore || vv.score.homeScore === 0 ? vv.score.homeScore : '-' }:${vv.score.awayScore || vv.score.awayScore === 0 ? vv.score.awayScore : '-' }` : '-:-' }}
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
                                                                            배팅금액 : <span>{{ $numeral(betInfo.betAmount).format('0,0') }}</span>
                                                                        </div>
                                                                        <div class="col-6 col-xl-3 text-light-brown">
                                                                            예상 당첨금액 : <span>{{ $numeral(parseInt(betInfo.betAmount * betInfo.betRate)).format('0,0') }}</span>
                                                                        </div>
                                                                        <div class="col-6 mt-2 mt-xl-0 col-xl-3 text-light-brown">
                                                                            배당 : {{ $numeral(betInfo.betRate).format('0,0.00') }} <span class="text-pink" v-if="betInfo.bonusRate">(<font-awesome-icon :icon="['fab', 'bitcoin']"/> {{ betInfo.bonusRate }})</span>
                                                                        </div>
                                                                        <div class="col-6 mt-2 mt-xl-0 col-xl-3 text-green">
                                                                            당첨금액 : <span>{{ calcResult(betInfo.betResult, betInfo.betAmount, betInfo.betRate) }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- mobile -->
                                                                <div class="card-body d-md-none">
                                                                    <div class="mobile-betting-history">
                                                                        <div class="col betting-history-header">
                                                                            <div class="row">
                                                                                <div class="col-3">
                                                                                    일시/리그
                                                                                </div>
                                                                                <div class="col-4">
                                                                                    <div class="team-name">
                                                                                        홈팀 vs 원정팀
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col">
                                                                                    베팅
                                                                                </div>
                                                                                <div class="col">
                                                                                    상태
                                                                                </div>
                                                                                <div class="col">
                                                                                    결과
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col betting-history-list" v-for="(vv, ii) in betInfo.detail" :key="ii">
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
                                                                                <div class="col-4">
                                                                                    <div class="team-name">{{ vv.homeTeam }}</div>
                                                                                    <div class="team-name">VS</div>
                                                                                    <div class="team-name">{{ vv.awayTeam }}</div>
                                                                                </div>
                                                                                <div class="col mt-3">
                                                                                    <span>{{ $config.convertBetTypeSports[vv.type] }}</span>
                                                                                    <span v-if="vv.standard || vv.standard === 0">
                                                                                        [{{
                                                                                            vv.type === 'bothTeamsGoalWin' || vv.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[vv.standard] :
                                                                                            vv.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(vv.standard) : vv.standard
                                                                                        }}]
                                                                                    </span>
                                                                                    <span v-if="vv.type !== 'correctScoreFullTime'"> ({{ $config.convertBetSelectSports[vv.select] }})</span>
                                                                                </div>
                                                                                <div class="col mt-3" :class="$config.sportsResultTextColor[vv.betResult]">
                                                                                    {{ $config.result[vv.betResult] }}
                                                                                </div>
                                                                                <div class="col mt-3">
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
                                                                    </div>
                                                                    <div class="row mt-2 text-center">
                                                                        <div class="col-6 text-light-brown">
                                                                            배팅금액 : <span>{{ $numeral(betInfo.betAmount).format('0,0') }}</span>
                                                                        </div>
                                                                        <div class="col-6 text-light-brown">
                                                                            예상 당첨금액 : <span>{{ $numeral(parseInt(betInfo.betAmount * betInfo.betRate)).format('0,0') }}</span>
                                                                        </div>
                                                                        <div class="col-6 my-2 text-light-brown">
                                                                            배당 : {{ $numeral(betInfo.betRate).format('0,0.00') }} <span class="text-pink" v-if="betInfo.bonusRate">(<font-awesome-icon :icon="['fab', 'bitcoin']"/> {{ betInfo.bonusRate }})</span>
                                                                        </div>
                                                                        <div class="col-6 my-2 text-green">
                                                                            당첨금액 : <span>{{ calcResult(betInfo.betResult, betInfo.betAmount, betInfo.betRate) }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control form-control-sm board-input"
                                    placeholder="댓글"
                                    maxlength="100"
                                    tabindex="1"
                                    v-model="commentContent"
                                >
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn-write" style="height: 28px;" :disabled="loading" @click="submit()">
                                    <font-awesome-icon :icon="['fa', 'pen']"/> 등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="board-comment">
                        <div v-for="(item, index) in comment" :key="index" :class="index > 0 ? 'comment-top': ''">
                            <div class="text-gray">
                                <img class="comment-level" :src="`/images/icon-lv${ item.writerGrade ? item.writerGrade : 1 }.png`">
                                {{ item.writerNick }} {{ $moment(item.regDateTime).format('YYYY-MM-DD') }}
                            </div>
                            <div class="text-white mt-1">{{ $striptags(item.comment) }}</div>
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
        name: 'FreeDetail',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                title: '',
                content: '',
                regDateTime: '',
                writerGrade: 1,
                writerNick: 1,
                gameID: null,
                comment: [],
                commentContent: '',
                betInfo: null
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            ...mapActions(['getInformation']),
            async getDetail() {
                const r = await this.$http.get('/api/get-free-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/free/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data.free) {
                    this.$tools.pushRouter(`/free/?page=${this.$route.params.page}`)
                    return
                }

                //구현부분
                this.title = r.data.free.title
                this.content = r.data.free.content
                this.regDateTime = r.data.free.regDateTime
                this.writerGrade = r.data.free.writerGrade
                this.writerNick = r.data.free.writerNick
                this.gameID = r.data.free.gameID

                this.comment = r.data.answer

                if(this.gameID) {
                    const r = await this.$http.get('/api/get-board-bet-list-view', {
                        _id: this.gameID
                    })

                    if(r.error) return

                    this.betInfo = r.data
                }
            },
            async submit() {
                let rFree = await this.$http.post('/api/free-comment', {
                    _id: this.$route.params._id,
                    commentContent: this.commentContent
                })
                if(rFree.error) return

                this.commentContent = ''

                this.$tools.sw('success', '댓글 성공', '작성하신 댓글이 등록 되었습니다.')
                this.getDetail()
                this.getInformation()
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
            padding: 0;
            @media (min-width: 1200px) {
                padding: 1.25rem;
            }
        }
    }
</style>