<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">경기결과 <span>SPORTS RESULT</span></div>
                    </div>
                </div>
                <hr class="mt-5 d-none d-xl-block">
                <div class="row mt-3">
                    <div class="col sports-icon">
                        <div class="sports-icon-wrap">
                            <ul>
                                <li @click="selectCategory('')">
                                    <img src="/images/icon-null-gray.png" class="sports-category-icon" alt="전체" title="전체">
                                    <div class="mt-1">전체</div>
                                </li>
                                <li @click="selectCategory('Football')">
                                    <img src="/images/icon-football-gray.png" class="sports-category-icon" alt="축구" title="축구">
                                    <div class="mt-1">축구</div>
                                </li>
                                <li @click="selectCategory('Basketball')">
                                    <img src="/images/icon-basketball-gray.png" class="sports-category-icon" alt="농구" title="농구">
                                    <div class="mt-1">농구</div>
                                </li>
                                <li @click="selectCategory('Baseball')">
                                    <img src="/images/icon-baseball-gray.png" class="sports-category-icon" alt="야구" title="야구">
                                    <div class="mt-1">야구</div>
                                </li>
                                <li @click="selectCategory('Ice Hockey')">
                                    <img src="/images/icon-icehockey-gray.png" class="sports-category-icon" alt="아이스하키" title="아이스하키">
                                    <div class="mt-1">하키</div>
                                </li>
                                <li @click="selectCategory('Handball')">
                                    <img src="/images/icon-handball-gray.png" class="sports-category-icon" alt="핸드볼" title="핸드볼">
                                    <div class="mt-1">핸드볼</div>
                                </li>
                                <li @click="selectCategory('Volleyball')">
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" alt="배구" title="배구">
                                    <div class="mt-1">배구</div>
                                </li>
                                <li @click="selectCategory('Rugby League')">
                                    <img src="/images/icon-rugby-gray.png" class="sports-category-icon" alt="럭비" title="럭비">
                                    <div class="mt-1">럭비</div>
                                </li>
                                <li @click="selectCategory('Rugby Union')">
                                    <img src="/images/icon-rugbyunion-gray.png" class="sports-category-icon" alt="럭비유니언" title="럭비유니언">
                                    <div class="mt-1">유니언</div>
                                </li>
                                <li @click="selectCategory('Boxing')">
                                    <img src="/images/icon-boxing-gray.png" class="sports-category-icon" alt="권투" title="권투">
                                    <div class="mt-1">권투</div>
                                </li>
                                <li @click="selectCategory('MMA')">
                                    <img src="/images/icon-mma-gray.png" class="sports-category-icon" title="이종격투기">
                                    <div class="mt-1">격투기</div>
                                </li>
                                <li @click="selectCategory('Golf')">
                                    <img src="/images/icon-golf-gray.png" class="sports-category-icon" alt="골프" title="골프">
                                    <div class="mt-1">골프</div>
                                </li>
                                <li @click="selectCategory('Darts')">
                                    <img src="/images/icon-darts-gray.png" class="sports-category-icon" alt="다트" title="다트">
                                    <div class="mt-1">다트</div>
                                </li>
                                <li @click="selectCategory('LoL')">
                                    <img src="/images/icon-lol-gray.png" class="sports-category-icon" alt="LOL" title="LOL">
                                    <div class="mt-1">LOL</div>
                                </li>
                                <li @click="selectCategory('CS:GO')">
                                    <img src="/images/icon-csgo-gray.png" class="sports-category-icon" alt="CS:GO" title="CS:GO">
                                    <div class="mt-1">CS:GO</div>
                                </li>
                                <li @click="selectCategory('Dota 2')">
                                    <img src="/images/icon-dota2-gray.png" class="sports-category-icon" alt="Dota 2" title="Dota 2">
                                    <div class="mt-1">Dota 2</div>
                                </li>
                                <li @click="selectCategory('FIFA')">
                                    <img src="/images/icon-fifa-gray.png" class="sports-category-icon" alt="FIFA" title="FIFA">
                                    <div class="mt-1">FIFA</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row px-xl-3">
                    <div class="col-12 game-info-box d-none d-xl-block">
                        <div class="row">
                            <div class="col pl-4">
                                리그/경기일시
                            </div>
                            <div class="col-4">
                                승(홈)언더
                            </div>
                            <div class="col">
                                무/핸/합
                            </div>
                            <div class="col-4">
                                패(원정)언더
                            </div>
                            <div class="col">
                                결과
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row px-xl-3">
                    <div class="col-12">
                        <div
                            class="row bg-sports"
                            v-for="(v, index) in data"
                            :key="index"
                        >
                            <div class="col-9 col-xl-12 mt-2 mb-xl-1 g-league-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                <img :src="`/images/${$config.iconSport[v.sport]}`" class="country-img">
                                <span class="g-league">
                                    {{ v.leagueKor }}
                                </span>
                            </div>
                            <div class="col-3 d-xl-none text-center" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                <div class="g-date-mobile">
                                    {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                </div>
                            </div>
                            <div class="col-12 mt-1 py-1 bg-sports-wrap d-none d-xl-block" :class="{'mb-3': index + 1 === data.length}">
                                <div class="row g">
                                    <div class="col px-1 d-none d-xl-block">
                                        <div class="g-date clearfix">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                    </div>
                                    <div class="col-4-5 px-1">
                                        <div class="g-home clearfix pl-2" :class="v.resultData.homeScoreTotal > v.resultData.awayScoreTotal ? 'the-winner' : ''">
                                            {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="col-2 px-1">
                                        <div class="g-x clearfix">
                                            vs
                                        </div>
                                    </div>
                                    <div class="col-4-5 px-1">
                                        <div class="g-away text-right pr-2 clearfix" :class="v.resultData.homeScoreTotal < v.resultData.awayScoreTotal ? 'the-winner' : ''">
                                            {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                        </div>
                                    </div>
                                    <div class="col-1 px-1 clearfix">
                                        <div class="g-count">
                                            {{ v.resultDraw ? '적특' : `${v.resultData.homeScoreTotal}:${v.resultData.awayScoreTotal}` }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 모바일 -->
                            <div class="col-12 mt-1 py-1 bg-sports-wrap d-xl-none" :class="{'mb-3': index + 1 === data.length}">
                                <div class="row g">
                                    <div class="col-4 px-1">
                                        <div class="g-home pl-2">
                                            {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="col-2 px-0">
                                        <div class="g-x">
                                            vs
                                        </div>
                                    </div>
                                    <div class="col-4 px-1">
                                        <div class="g-away pl-2">
                                            {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                        </div>
                                    </div>
                                    <div class="col-2 px-1 g-count">
                                        {{ v.resultDraw ? '적특' : `${v.resultData.homeScoreTotal}:${v.resultData.awayScoreTotal}` }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <b-pagination
                                    first-class="first-class"
                                    last-class="last-class"
                                    prev-class="prev-class"
                                    next-class="next-class"
                                    ellipsis-class="ellipsis-class"
                                    page-class="page-class"
                                    :total-rows="totalCount"
                                    :per-page="$config.gamePageSize"
                                    :limit="$config.pageLimit"
                                    align="center"
                                    v-model="search.page"
                                    @change="linkGen"
                                ></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import UrgentNotice from '@/components/UrgentNotice.vue'

export default {
    name: 'SportsResult',
    components: {
        UrgentNotice
    },
    data() {
        return {
            search: {
                page: 1,
                sport: ''
            },
            data: [],
            totalCount: 0
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            let rPoint = await this.$http.get('/api/game-result-list', this.search)
            if(rPoint.error) return

            // 구현부분
            this.data = rPoint.data.recordSet
            this.totalCount = rPoint.data.recordCount
        },
        initList() {
            this.page = 1
            this.getList()
        },
        linkGen(pageNum) {
            this.search.page = pageNum
            this.getList()
        },
        hideModal() {
            this.showModalSportsResult = false
            this.page = 1
            this.search.sport = ''
        },
        selectCategory(sport) {
            this.page = 1
            this.search.sport = sport
            this.getList()
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
        showModalSportsResult: {
            get() {
                return this.$store.state.showModalSportsResult
            },
            set(isShow) {
                if(this.showModalSportsResult) {
                    this.$store.commit('setShowModalSportsResult', isShow)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.sportsresult-title {
    color: #333;
    font-size: 1.375rem;

    @media (min-width: 1200px) {
        font-size: 1.5625rem;
    }
    span {
        color: #909090;
        font-size: 0.75rem;

        @media (min-width: 1200px) {
            font-size: 0.8125rem;
        }
    }
}
.game-info-box {
    background: #052C53;
    border-radius: 3px 3px 0px 0px;
    color: #fff;
    font-size: 0.8125rem;
    padding: 9px 0;
    text-align: center;
}
.g-home  {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding: 10px 0;
}
.g-away  {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding: 10px 0;
}
.the-winner {
    background: linear-gradient(180deg, #015892, #00395e);
    color: #fff;
}
</style>