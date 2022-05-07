<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'futbol']"/>
                            <span class="ml-2">라이브 스포츠 LIVE SPORTS</span>
                            <span class="float-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="$tools.pushRouter('/sportslive')">
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
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구" @click="selectCategory('Volleyball')">
                                    <b-tooltip target="Volleyball" title="배구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-rugby-gray.png" class="sports-category-icon" id="Rugby League" alt="럭비" title="럭비" @click="selectCategory('Rugby League')">
                                    <b-tooltip target="Rugby League" title="럭비"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-lol-gray.png" class="sports-category-icon" id="LOL" alt="LOL" title="LOL" @click="selectCategory('LoL')">
                                    <b-tooltip target="LOL" title="LOL"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-handball-gray.png" class="sports-category-icon" id="Handball" alt="핸드볼" title="핸드볼" @click="selectCategory('Handball')">
                                    <b-tooltip target="Handball" title="핸드볼"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-mma-gray.png" class="sports-category-icon" id="MMA" alt="이종격투기" title="이종격투기" @click="selectCategory('MMA')">
                                    <b-tooltip target="MMA" title="이종격투기"></b-tooltip>
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
                                            <div
                                                class="col-4 g-home"
                                                :class="{
                                                    'n': !v.showConfig.x || v.games.x[0].status !== 'ACTIVE' || !v.games.x[0].showStatus,
                                                    'can-bet': v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'x',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.x[0].homeRate,
                                                    standard: null
                                                }) : null"
                                            >
                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-1 pr-xl-2">
                                                    <!-- <small class="x d-none d-xl-inline">1x2</small> -->
                                                    {{ $numeral(v.games.x[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col-2 g-x"
                                                :class="{
                                                    'n': !v.showConfig.x || v.games.x[0].status !== 'ACTIVE' || !v.games.x[0].showStatus,
                                                    'can-bet': v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus && v.games.x[0].drawRate,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'draw') > -1
                                                }"
                                                @click="v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus && v.games.x[0].drawRate ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'x',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'draw',
                                                    selectRate: v.games.x[0].drawRate,
                                                    standard: null
                                                }) : null"
                                            >
                                                {{ v.games.x[0].drawRate ? $numeral(v.games.x[0].drawRate).format('0.00') : 'vs' }}
                                            </div>
                                            <div
                                                class="col-4 g-away"
                                                :class="{
                                                    'n': !v.showConfig.x || v.games.x[0].status !== 'ACTIVE' || !v.games.x[0].showStatus,
                                                    'can-bet': v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'x',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.x[0].awayRate,
                                                    standard: null
                                                }) : null"
                                            >
                                                <div class="float-left pl-1 pl-xl-2">
                                                    {{ $numeral(v.games.x[0].awayRate).format('0.00') }}
                                                    <!-- <small class="x d-none d-xl-inline">1x2</small> -->
                                                </div>
                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-count cursor-pointer"
                                                :class="[{ 'o': Object.keys(v.games).length === 1 }, { 'n': Object.keys(v.games).length > 1 }]"
                                                @click="v._id === expand._id ? expand = {} : expandGame(v)"
                                            >+{{ calcCount(v.showConfig, v.games) }}</div>
                                        </div>
                                        <div class="row" :id="`section-${v._id}`" v-if="expand._id === v._id">
                                            <div class="col-12 my-2 p-3 game-detail">
                                                <div class="row bg-team text-center py-3">
                                                    <div class="col-5 title-team">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                        <br><span>[ {{ v.resultData.homeScoreTotal }} ]</span>
                                                    </div>
                                                    <div class="col-2">
                                                        <img src="/images/vs.png" class="img-vs">
                                                    </div>
                                                    <div class="col-5 title-team">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                        <br><span>[ {{ v.resultData.awayScoreTotal }} ]</span>
                                                    </div>
                                                </div>
                                                <div class="row mt-2 p-3 expand-game">
                                                    <!-- ##승무패 x -->
                                                    <div
                                                        class="col-12"
                                                        v-if="v.games.x && v.showConfig.x && v.games.x[0].status !== 'HIDE' && v.games.x[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x[0].drawRate && v.games.x[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x[0].drawRate && v.games.x[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x[0].drawRate ? $numeral(v.games.x[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- 더블찬스 xDouble -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.xDouble && v.showConfig.xDouble && v.games.xDouble[0].status !== 'HIDE' && v.games.xDouble[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 더블찬스
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-4 g-home"
                                                                :class="{
                                                                    'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].homeDrawRate,
                                                                    'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeDrawRate,
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeDraw') > -1
                                                                }"
                                                                @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeDrawRate ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xDouble',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'homeDraw',
                                                                    selectRate: v.games.xDouble[0].homeDrawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    <span class="d-sm-none">
                                                                        홈 / 무
                                                                    </span>
                                                                    <span class="d-none d-sm-inline">
                                                                        홈승 또는 무승부
                                                                    </span>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.xDouble[0].homeDrawRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-4 g-center"
                                                                :class="{
                                                                    'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].homeAwayRate,
                                                                    'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeAwayRate,
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeAway') > -1
                                                                }"
                                                                @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeAwayRate ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xDouble',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'homeAway',
                                                                    selectRate: v.games.xDouble[0].homeAwayRate,
                                                                    standard: null
                                                                }): null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    <span class="d-sm-none">
                                                                        홈 / 원
                                                                    </span>
                                                                    <span class="d-none d-sm-inline">
                                                                        홈승 또는 원정승
                                                                    </span>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.xDouble[0].homeAwayRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-4 g-away"
                                                                :class="{
                                                                    'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].awayDrawRate,
                                                                    'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].awayDrawRate,
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'awayDraw') > -1
                                                                }"
                                                                @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].awayDrawRate ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xDouble',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'awayDraw',
                                                                    selectRate: v.games.xDouble[0].awayDrawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    <span class="d-sm-none">
                                                                        원 / 무
                                                                    </span>
                                                                    <span class="d-none d-sm-inline">
                                                                        원정승 또는 무승부
                                                                    </span>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.xDouble[0].awayDrawRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##승무패 핸디캡 threeWayHandicap -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.threeWayHandicap && v.showConfig.threeWayHandicap &&
                                                            v.games.threeWayHandicap.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.threeWayHandicap.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.threeWayHandicap" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.threeWayHandicap[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.threeWayHandicap[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                @click="v.games.threeWayHandicap[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'threeWayHandicap',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.threeWayHandicap[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.threeWayHandicap[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'draw') > -1
                                                                }"
                                                                v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                @click="v.games.threeWayHandicap[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'threeWayHandicap',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: vv.drawRate,
                                                                    standard: vv.homeStandard
                                                                }): null"
                                                            >
                                                                {{ $numeral(vv.drawRate).format('0.00') }}
                                                                <span class="circle-down ml-sm-1 d-block d-sm-inline">
                                                                    ({{ vv.homeStandard }})
                                                                </span>
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.threeWayHandicap[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.threeWayHandicap[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                @click="v.games.threeWayHandicap[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'threeWayHandicap',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##핸디캡 handicap -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap && v.showConfig.handicap &&
                                                            v.games.handicap.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                                @click="v.games.handicap[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap[index].status !== 'ACTIVE'
                                                                }"
                                                                v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                                @click="v.games.handicap[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##탁구 핸디캡 handicapTotalSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicapTotalSet && v.showConfig.handicapTotalSet &&
                                                            v.games.handicapTotalSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicapTotalSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicapTotalSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                                                                    'can-bet': v.games.handicapTotalSet[index] === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicapTotalSet[index] === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicapTotalSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                                                                    'can-bet': v.games.handicapTotalSet[index] === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicapTotalSet[index] === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicapTotalSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##오버언더 underOver -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver && v.showConfig.underOver &&
                                                            v.games.underOver.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                                @click="v.games.underOver[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                                @click="v.games.underOver[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##탁구 오버언더 underOverTotalSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOverTotalSet && v.showConfig.underOverTotalSet &&
                                                            v.games.underOverTotalSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOverTotalSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOverTotalSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOverTotalSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOverTotalSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOverTotalSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOverTotalSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOverTotalSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOverTotalSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOverTotalSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOverTotalSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOverTotalSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##풀타임 홀짝 oddEvenFullTime -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEvenFullTime && v.showConfig.oddEvenFullTime && v.games.oddEvenFullTime[0].status !== 'HIDE' && v.games.oddEvenFullTime[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 풀타임 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEvenFullTime[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEvenFullTime[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEvenFullTime' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEvenFullTime[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEvenFullTime',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEvenFullTime[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEvenFullTime[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEvenFullTime[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEvenFullTime[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEvenFullTime[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEvenFullTime' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEvenFullTime[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEvenFullTime',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEvenFullTime[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEvenFullTime[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1이닝 승무패 x1stInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x1stInning && v.showConfig.x1stInning && v.games.x1stInning[0].status !== 'HIDE' && v.games.x1stInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x1stInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x1stInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x1stInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x1stInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x1stInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stInning[0].drawRate && v.games.x1stInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x1stInning[0].drawRate && v.games.x1stInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x1stInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x1stInning[0].drawRate ? $numeral(v.games.x1stInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x1stInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x1stInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x1stInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x1stInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1이닝 핸디캡 handicap1stInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap1stInning && v.showConfig.handicap1stInning &&
                                                            v.games.handicap1stInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap1stInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap1stInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap1stInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap1stInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap1stInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1이닝 오버언더 underOver1stInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver1stInning && v.showConfig.underOver1stInning &&
                                                            v.games.underOver1stInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver1stInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver1stInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2이닝 승무패 x2ndInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x2ndInning && v.showConfig.x2ndInning && v.games.x2ndInning[0].status !== 'HIDE' && v.games.x2ndInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x2ndInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x2ndInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x2ndInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x2ndInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x2ndInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndInning[0].drawRate && v.games.x2ndInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x2ndInning[0].drawRate && v.games.x2ndInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x2ndInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x2ndInning[0].drawRate ? $numeral(v.games.x2ndInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x2ndInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x2ndInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x2ndInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x2ndInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2이닝 핸디캡 handicap2ndInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap2ndInning && v.showConfig.handicap2ndInning &&
                                                            v.games.handicap2ndInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap2ndInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap2ndInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap2ndInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndInning[index].showStatus && v.games.handicap2ndInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap2ndInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap2ndInning[index].showStatus && v.games.handicap2ndInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap2ndInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndInning[index].showStatus && v.games.handicap2ndInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2이닝 오버언더 underOver2ndInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver2ndInning && v.showConfig.underOver2ndInning &&
                                                            v.games.underOver2ndInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver2ndInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver2ndInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver2ndInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndInning[index].showStatus && v.games.underOver2ndInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver2ndInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver2ndInning[index].showStatus && v.games.underOver2ndInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver2ndInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndInning[index].showStatus && v.games.underOver2ndInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3이닝 승무패 x3rdInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x3rdInning && v.showConfig.x3rdInning && v.games.x3rdInning[0].status !== 'HIDE' && v.games.x3rdInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x3rdInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x3rdInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x3rdInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x3rdInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x3rdInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdInning[0].drawRate && v.games.x3rdInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x3rdInning[0].drawRate && v.games.x3rdInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x3rdInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x3rdInning[0].drawRate ? $numeral(v.games.x3rdInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x3rdInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x3rdInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x3rdInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x3rdInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3이닝 핸디캡 handicap3rdInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap3rdInning && v.showConfig.handicap3rdInning &&
                                                            v.games.handicap3rdInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap3rdInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap3rdInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap3rdInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdInning[index].showStatus && v.games.handicap3rdInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap3rdInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap3rdInning[index].showStatus && v.games.handicap3rdInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap3rdInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdInning[index].showStatus && v.games.handicap3rdInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3이닝 오버언더 underOver3rdInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver3rdInning && v.showConfig.underOver3rdInning &&
                                                            v.games.underOver3rdInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver3rdInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver3rdInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver3rdInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdInning[index].showStatus && v.games.underOver3rdInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver3rdInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver3rdInning[index].showStatus && v.games.underOver3rdInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver3rdInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdInning[index].showStatus && v.games.underOver3rdInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4이닝 승무패 x4thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x4thInning && v.showConfig.x4thInning && v.games.x4thInning[0].status !== 'HIDE' && v.games.x4thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x4thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x4thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x4thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x4thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x4thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thInning[0].drawRate && v.games.x4thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x4thInning[0].drawRate && v.games.x4thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x4thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x4thInning[0].drawRate ? $numeral(v.games.x4thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x4thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x4thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x4thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x4thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4이닝 핸디캡 handicap4thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap4thInning && v.showConfig.handicap4thInning &&
                                                            v.games.handicap4thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap4thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap4thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap4thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap4thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap4thInning[index].showStatus && v.games.handicap4thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap4thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap4thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap4thInning[index].showStatus && v.games.handicap4thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap4thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap4thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap4thInning[index].showStatus && v.games.handicap4thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap4thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4이닝 오버언더 underOver4thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver4thInning && v.showConfig.underOver4thInning &&
                                                            v.games.underOver4thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver4thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver4thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver4thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver4thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver4thInning[index].showStatus && v.games.underOver4thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver4thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver4thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver4thInning[index].showStatus && v.games.underOver4thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver4thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver4thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver4thInning[index].showStatus && v.games.underOver4thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver4thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver4thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##5이닝 승무패 x5thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x5thInning && v.showConfig.x5thInning && v.games.x5thInning[0].status !== 'HIDE' && v.games.x5thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 5이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x5thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x5thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x5thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x5thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x5thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x5thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x5thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x5thInning[0].drawRate && v.games.x5thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x5thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x5thInning[0].drawRate && v.games.x5thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x5thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x5thInning[0].drawRate ? $numeral(v.games.x5thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x5thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x5thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x5thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x5thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x5thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x5thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##5이닝 핸디캡 handicap5thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap5thInning && v.showConfig.handicap5thInning &&
                                                            v.games.handicap5thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap5thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 5이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap5thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap5thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap5thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap5thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap5thInning[index].showStatus && v.games.handicap5thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap5thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap5thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap5thInning[index].showStatus && v.games.handicap5thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap5thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap5thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap5thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap5thInning[index].showStatus && v.games.handicap5thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap5thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##5이닝 오버언더 underOver5thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver5thInning && v.showConfig.underOver5thInning &&
                                                            v.games.underOver5thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver5thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 5이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver5thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver5thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver5thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver5thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver5thInning[index].showStatus && v.games.underOver5thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver5thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver5thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver5thInning[index].showStatus && v.games.underOver5thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver5thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver5thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver5thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver5thInning[index].showStatus && v.games.underOver5thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver5thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver5thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##6이닝 승무패 x6thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x6thInning && v.showConfig.x6thInning && v.games.x6thInning[0].status !== 'HIDE' && v.games.x6thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 6이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x6thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x6thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x6thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x6thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x6thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x6thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x6thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x6thInning[0].drawRate && v.games.x6thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x6thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x6thInning[0].drawRate && v.games.x6thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x6thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x6thInning[0].drawRate ? $numeral(v.games.x6thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x6thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x6thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x6thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x6thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x6thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x6thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##6이닝 핸디캡 handicap6thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap6thInning && v.showConfig.handicap6thInning &&
                                                            v.games.handicap6thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap6thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 6이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap6thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap6thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap6thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap6thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap6thInning[index].showStatus && v.games.handicap6thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap6thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap6thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap6thInning[index].showStatus && v.games.handicap6thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap6thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap6thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap6thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap6thInning[index].showStatus && v.games.handicap6thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap6thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##6이닝 오버언더 underOver6thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver6thInning && v.showConfig.underOver6thInning &&
                                                            v.games.underOver6thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver6thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 6이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver6thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver6thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver6thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver6thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver6thInning[index].showStatus && v.games.underOver6thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver6thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver6thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver6thInning[index].showStatus && v.games.underOver6thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver6thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver6thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver6thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver6thInning[index].showStatus && v.games.underOver6thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver6thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver6thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##7이닝 승무패 x7thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x7thInning && v.showConfig.x7thInning && v.games.x7thInning[0].status !== 'HIDE' && v.games.x7thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 7이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x7thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x7thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x7thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x7thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x7thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x7thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x7thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x7thInning[0].drawRate && v.games.x7thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x7thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x7thInning[0].drawRate && v.games.x7thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x7thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x7thInning[0].drawRate ? $numeral(v.games.x7thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x7thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x7thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x7thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x7thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x7thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x7thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##7이닝 핸디캡 handicap7thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap7thInning && v.showConfig.handicap7thInning &&
                                                            v.games.handicap7thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap7thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 7이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap7thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap7thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap7thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap7thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap7thInning[index].showStatus && v.games.handicap7thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap7thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap7thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap7thInning[index].showStatus && v.games.handicap7thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap7thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap7thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap7thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap7thInning[index].showStatus && v.games.handicap7thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap7thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##7이닝 오버언더 underOver7thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver7thInning && v.showConfig.underOver7thInning &&
                                                            v.games.underOver7thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver7thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 7이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver7thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver7thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver7thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver7thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver7thInning[index].showStatus && v.games.underOver7thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver7thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver7thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver7thInning[index].showStatus && v.games.underOver7thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver7thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver7thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver7thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver7thInning[index].showStatus && v.games.underOver7thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver7thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver7thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##8이닝 승무패 x8thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x8thInning && v.showConfig.x8thInning && v.games.x8thInning[0].status !== 'HIDE' && v.games.x8thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 8이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x8thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x8thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x8thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x8thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x8thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x8thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x8thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x8thInning[0].drawRate && v.games.x8thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x8thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x8thInning[0].drawRate && v.games.x8thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x8thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x8thInning[0].drawRate ? $numeral(v.games.x8thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x8thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x8thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x8thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x8thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x8thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x8thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##8이닝 핸디캡 handicap8thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap8thInning && v.showConfig.handicap8thInning &&
                                                            v.games.handicap8thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap8thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 8이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap8thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap8thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap8thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap8thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap8thInning[index].showStatus && v.games.handicap8thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap8thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap8thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap8thInning[index].showStatus && v.games.handicap8thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap8thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap8thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap8thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap8thInning[index].showStatus && v.games.handicap8thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap8thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##8이닝 오버언더 underOver8thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver8thInning && v.showConfig.underOver8thInning &&
                                                            v.games.underOver8thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver8thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 8이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver8thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver8thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver8thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver8thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver8thInning[index].showStatus && v.games.underOver8thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver8thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver8thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver8thInning[index].showStatus && v.games.underOver8thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver8thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver8thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver8thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver8thInning[index].showStatus && v.games.underOver8thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver8thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver8thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##9이닝 승무패 x9thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x9thInning && v.showConfig.x9thInning && v.games.x9thInning[0].status !== 'HIDE' && v.games.x9thInning[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 9이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x9thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x9thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x9thInning' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x9thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x9thInning[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x9thInning[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x9thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x9thInning[0].drawRate && v.games.x9thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x9thInning' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x9thInning[0].drawRate && v.games.x9thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x9thInning[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x9thInning[0].drawRate ? $numeral(v.games.x9thInning[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x9thInning[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x9thInning[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x9thInning' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x9thInning[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x9thInning[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x9thInning[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##9이닝 핸디캡 handicap9thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap9thInning && v.showConfig.handicap9thInning &&
                                                            v.games.handicap9thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap9thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 9이닝 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap9thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap9thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap9thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap9thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap9thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap9thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap9thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap9thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap9thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'"
                                                                @click="v.games.handicap9thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##9이닝 오버언더 underOver9thInning -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver9thInning && v.showConfig.underOver9thInning &&
                                                            v.games.underOver9thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver9thInning.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 9이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver9thInning" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver9thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver9thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver9thInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver9thInning[index].showStatus && v.games.underOver9thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver9thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver9thInning[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver9thInning[index].showStatus && v.games.underOver9thInning[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver9thInning[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver9thInning[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver9thInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver9thInning[index].showStatus && v.games.underOver9thInning[index].status !== 'HIDE'"
                                                                @click="v.games.underOver9thInning[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver9thInning',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1세트 승패 x1stSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x1stSet && v.showConfig.x1stSet && v.games.x1stSet[0].status !== 'HIDE' && v.games.x1stSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 승패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x1stSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSet' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x1stSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x1stSet[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x1stSet[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x1stSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x1stSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSet' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x1stSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x1stSet[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x1stSet[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1세트 핸디캡 handicap1stSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap1stSet && v.showConfig.handicap1stSet &&
                                                            v.games.handicap1stSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap1stSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap1stSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap1stSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap1stSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap1stSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1세트 오버언더 underOver1stSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver1stSet && v.showConfig.underOver1stSet &&
                                                            v.games.underOver1stSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver1stSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver1stSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver1stSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver1stSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver1stSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1세트 홀짝 oddEven1stSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven1stSet && v.showConfig.oddEven1stSet && v.games.oddEven1stSet[0].status !== 'HIDE' && v.games.oddEven1stSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven1stSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stSet' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven1stSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven1stSet[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stSet[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven1stSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven1stSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stSet' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven1stSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven1stSet[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stSet[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2세트 승패 x2ndSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x2ndSet && v.showConfig.x2ndSet && v.games.x2ndSet[0].status !== 'HIDE' && v.games.x2ndSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 승패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x2ndSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndSet' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x2ndSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x2ndSet[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x2ndSet[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x2ndSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x2ndSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndSet' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x2ndSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x2ndSet[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x2ndSet[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2세트 핸디캡 handicap2ndSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap2ndSet && v.showConfig.handicap2ndSet &&
                                                            v.games.handicap2ndSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap2ndSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap2ndSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap2ndSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap2ndSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap2ndSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2세트 오버언더 underOver2ndSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver2ndSet && v.showConfig.underOver2ndSet &&
                                                            v.games.underOver2ndSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver2ndSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver2ndSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver2ndSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver2ndSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver2ndSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2세트 홀짝 oddEven2ndSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven2ndSet && v.showConfig.oddEven2ndSet && v.games.oddEven2ndSet[0].status !== 'HIDE' && v.games.oddEven2ndSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven2ndSet[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndSet[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven2ndSet[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndSet[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3세트 승패 x3rdSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x3rdSet && v.showConfig.x3rdSet && v.games.x3rdSet[0].status !== 'HIDE' && v.games.x3rdSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 승패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x3rdSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdSet' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x3rdSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x3rdSet[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x3rdSet[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x3rdSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x3rdSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdSet' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x3rdSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x3rdSet[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x3rdSet[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3세트 핸디캡 handicap3rdSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap3rdSet && v.showConfig.handicap3rdSet &&
                                                            v.games.handicap3rdSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap3rdSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap3rdSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap3rdSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap3rdSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap3rdSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3세트 오버언더 underOver3rdSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver3rdSet && v.showConfig.underOver3rdSet &&
                                                            v.games.underOver3rdSet.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver3rdSet.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver3rdSet" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver3rdSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver3rdSet[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver3rdSet[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdSet[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdSet[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3세트 홀짝 oddEven3rdSet -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven3rdSet && v.showConfig.oddEven3rdSet && v.games.oddEven3rdSet[0].status !== 'HIDE' && v.games.oddEven3rdSet[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven3rdSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdSet' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven3rdSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven3rdSet[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven3rdSet[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdSet[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdSet[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven3rdSet[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdSet' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven3rdSet[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven3rdSet',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven3rdSet[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven3rdSet[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1피리어드 승무패 x1stPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x1stPeriod && v.showConfig.x1stPeriod && v.games.x1stPeriod[0].status !== 'HIDE' && v.games.x1stPeriod[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x1stPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x1stPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x1stPeriod[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x1stPeriod[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x1stPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stPeriod[0].drawRate && v.games.x1stPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x1stPeriod[0].drawRate && v.games.x1stPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x1stPeriod[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x1stPeriod[0].drawRate ? $numeral(v.games.x1stPeriod[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x1stPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x1stPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x1stPeriod[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x1stPeriod[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1피리어드 핸디캡 handicap1stPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap1stPeriod && v.showConfig.handicap1stPeriod &&
                                                            v.games.handicap1stPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap1stPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap1stPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap1stPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap1stPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap1stPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1피리어드 오버언더 underOver1stPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver1stPeriod && v.showConfig.underOver1stPeriod &&
                                                            v.games.underOver1stPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver1stPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver1stPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver1stPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver1stPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver1stPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2피리어드 승무패 x2ndPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x2ndPeriod && v.showConfig.x2ndPeriod && v.games.x2ndPeriod[0].status !== 'HIDE' && v.games.x2ndPeriod[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x2ndPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x2ndPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x2ndPeriod[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x2ndPeriod[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x2ndPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndPeriod[0].drawRate && v.games.x2ndPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x2ndPeriod[0].drawRate && v.games.x2ndPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x2ndPeriod[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x2ndPeriod[0].drawRate ? $numeral(v.games.x2ndPeriod[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x2ndPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x2ndPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x2ndPeriod[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x2ndPeriod[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2피리어드 핸디캡 handicap2ndPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap2ndPeriod && v.showConfig.handicap2ndPeriod &&
                                                            v.games.handicap2ndPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap2ndPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap2ndPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap2ndPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap2ndPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap2ndPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2피리어드 오버언더 underOver2ndPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver2ndPeriod && v.showConfig.underOver2ndPeriod &&
                                                            v.games.underOver2ndPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver2ndPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver2ndPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver2ndPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver2ndPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver2ndPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3피리어드 승무패 x3rdPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x3rdPeriod && v.showConfig.x3rdPeriod && v.games.x3rdPeriod[0].status !== 'HIDE' && v.games.x3rdPeriod[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x3rdPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x3rdPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x3rdPeriod[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x3rdPeriod[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x3rdPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdPeriod[0].drawRate && v.games.x3rdPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x3rdPeriod[0].drawRate && v.games.x3rdPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x3rdPeriod[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x3rdPeriod[0].drawRate ? $numeral(v.games.x3rdPeriod[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x3rdPeriod[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdPeriod[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x3rdPeriod[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x3rdPeriod[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x3rdPeriod[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3피리어드 핸디캡 handicap3rdPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap3rdPeriod && v.showConfig.handicap3rdPeriod &&
                                                            v.games.handicap3rdPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap3rdPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap3rdPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap3rdPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap3rdPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap3rdPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3피리어드 오버언더 underOver3rdPeriod -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver3rdPeriod && v.showConfig.underOver3rdPeriod &&
                                                            v.games.underOver3rdPeriod.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver3rdPeriod.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver3rdPeriod" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver3rdPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver3rdPeriod[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver3rdPeriod[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdPeriod[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdPeriod[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdPeriod',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1쿼터 승무패 x1stQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x1stQuarter && v.showConfig.x1stQuarter && v.games.x1stQuarter[0].status !== 'HIDE' && v.games.x1stQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x1stQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x1stQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x1stQuarter[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x1stQuarter[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x1stQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stQuarter[0].drawRate && v.games.x1stQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x1stQuarter[0].drawRate && v.games.x1stQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x1stQuarter[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x1stQuarter[0].drawRate ? $numeral(v.games.x1stQuarter[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x1stQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x1stQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x1stQuarter[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x1stQuarter[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1쿼터 핸디캡 handicap1stQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap1stQuarter && v.showConfig.handicap1stQuarter &&
                                                            v.games.handicap1stQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap1stQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap1stQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap1stQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap1stQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap1stQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1쿼터 오버언더 underOver1stQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver1stQuarter && v.showConfig.underOver1stQuarter &&
                                                            v.games.underOver1stQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver1stQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver1stQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver1stQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver1stQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver1stQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##1쿼터 홀짝 oddEven1stQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven1stQuarter && v.showConfig.oddEven1stQuarter && v.games.oddEven1stQuarter[0].status !== 'HIDE' && v.games.oddEven1stQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven1stQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven1stQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven1stQuarter[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stQuarter[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven1stQuarter[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven1stQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stQuarter' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven1stQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven1stQuarter[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stQuarter[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2쿼터 승무패 x2ndQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x2ndQuarter && v.showConfig.x2ndQuarter && v.games.x2ndQuarter[0].status !== 'HIDE' && v.games.x2ndQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x2ndQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x2ndQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x2ndQuarter[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x2ndQuarter[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x2ndQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndQuarter[0].drawRate && v.games.x2ndQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x2ndQuarter[0].drawRate && v.games.x2ndQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x2ndQuarter[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x2ndQuarter[0].drawRate ? $numeral(v.games.x2ndQuarter[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x2ndQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x2ndQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x2ndQuarter[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x2ndQuarter[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2쿼터 핸디캡 handicap2ndQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap2ndQuarter && v.showConfig.handicap2ndQuarter &&
                                                            v.games.handicap2ndQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap2ndQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap2ndQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap2ndQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap2ndQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap2ndQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2쿼터 오버언더 underOver2ndQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver2ndQuarter && v.showConfig.underOver2ndQuarter &&
                                                            v.games.underOver2ndQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver2ndQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver2ndQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver2ndQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver2ndQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver2ndQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##2쿼터 홀짝 oddEven2ndQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven2ndQuarter && v.showConfig.oddEven2ndQuarter && v.games.oddEven2ndQuarter[0].status !== 'HIDE' && v.games.oddEven2ndQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven2ndQuarter[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndQuarter[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndQuarter[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndQuarter' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven2ndQuarter[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndQuarter[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3쿼터 승무패 x3rdQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x3rdQuarter && v.showConfig.x3rdQuarter && v.games.x3rdQuarter[0].status !== 'HIDE' && v.games.x3rdQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x3rdQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x3rdQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x3rdQuarter[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x3rdQuarter[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x3rdQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdQuarter[0].drawRate && v.games.x3rdQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x3rdQuarter[0].drawRate && v.games.x3rdQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x3rdQuarter[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x3rdQuarter[0].drawRate ? $numeral(v.games.x3rdQuarter[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x3rdQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x3rdQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x3rdQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x3rdQuarter[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x3rdQuarter[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3쿼터 핸디캡 handicap3rdQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap3rdQuarter && v.showConfig.handicap3rdQuarter &&
                                                            v.games.handicap3rdQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap3rdQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap3rdQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap3rdQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap3rdQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap3rdQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap3rdQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap3rdQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3쿼터 오버언더 underOver3rdQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver3rdQuarter && v.showConfig.underOver3rdQuarter &&
                                                            v.games.underOver3rdQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver3rdQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver3rdQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver3rdQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver3rdQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver3rdQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver3rdQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver3rdQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##3쿼터 홀짝 oddEven3rdQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven3rdQuarter && v.showConfig.oddEven3rdQuarter && v.games.oddEven3rdQuarter[0].status !== 'HIDE' && v.games.oddEven3rdQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven3rdQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven3rdQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven3rdQuarter[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven3rdQuarter[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdQuarter[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven3rdQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven3rdQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdQuarter' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven3rdQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven3rdQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven3rdQuarter[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven3rdQuarter[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4쿼터 승무패 x4thQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x4thQuarter && v.showConfig.x4thQuarter && v.games.x4thQuarter[0].status !== 'HIDE' && v.games.x4thQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x4thQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x4thQuarter[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x4thQuarter[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thQuarter[0].drawRate && v.games.x4thQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x4thQuarter[0].drawRate && v.games.x4thQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x4thQuarter[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x4thQuarter[0].drawRate ? $numeral(v.games.x4thQuarter[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x4thQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x4thQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x4thQuarter[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x4thQuarter[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4쿼터 핸디캡 handicap4thQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap4thQuarter && v.showConfig.handicap4thQuarter &&
                                                            v.games.handicap4thQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap4thQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap4thQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap4thQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap4thQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap4thQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap4thQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap4thQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap4thQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.handicap4thQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4쿼터 오버언더 underOver4thQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver4thQuarter && v.showConfig.underOver4thQuarter &&
                                                            v.games.underOver4thQuarter.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver4thQuarter.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver4thQuarter" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver4thQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver4thQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver4thQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver4thQuarter[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver4thQuarter[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver4thQuarter[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                                @click="v.games.underOver4thQuarter[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##4쿼터 홀짝 oddEven4thQuarter -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven4thQuarter && v.showConfig.oddEven4thQuarter && v.games.oddEven4thQuarter[0].status !== 'HIDE' && v.games.oddEven4thQuarter[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven4thQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven4thQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven4thQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven4thQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven4thQuarter[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven4thQuarter[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven4thQuarter[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven4thQuarter[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven4thQuarter[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven4thQuarter' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven4thQuarter[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven4thQuarter',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven4thQuarter[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven4thQuarter[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##전반전 승무패 x1stHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x1stHalf && v.showConfig.x1stHalf && v.games.x1stHalf[0].status !== 'HIDE' && v.games.x1stHalf[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x1stHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x1stHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x1stHalf[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x1stHalf[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x1stHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stHalf[0].drawRate && v.games.x1stHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x1stHalf[0].drawRate && v.games.x1stHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x1stHalf[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x1stHalf[0].drawRate ? $numeral(v.games.x1stHalf[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x1stHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x1stHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x1stHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x1stHalf[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x1stHalf[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##전반전 핸디캡 handicap1stHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap1stHalf && v.showConfig.handicap1stHalf &&
                                                            v.games.handicap1stHalf.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap1stHalf.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap1stHalf" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap1stHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stHalf' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap1stHalf[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap1stHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap1stHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stHalf' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                                @click="v.games.handicap1stHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##전반전 오버언더 underOver1stHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver1stHalf && v.showConfig.underOver1stHalf &&
                                                            v.games.underOver1stHalf.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver1stHalf.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver1stHalf" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver1stHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stHalf' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver1stHalf[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver1stHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver1stHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stHalf' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                                @click="v.games.underOver1stHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##전반전 홀짝 oddEven1stHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven1stHalf && v.showConfig.oddEven1stHalf && v.games.oddEven1stHalf[0].status !== 'HIDE' && v.games.oddEven1stHalf[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven1stHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stHalf' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven1stHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven1stHalf[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stHalf[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven1stHalf[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven1stHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven1stHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stHalf' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven1stHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven1stHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven1stHalf[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven1stHalf[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##첫 5이닝 승무패 xFirst5Innings -->
                                                    <!-- <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.xFirst5Innings && v.showConfig.xFirst5Innings && v.games.xFirst5Innings[0].status !== 'HIDE' && v.games.xFirst5Innings[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫 5이닝 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.xFirst5Innings[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.xFirst5Innings[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.xFirst5Innings[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xFirst5Innings',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.xFirst5Innings[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.xFirst5Innings[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.xFirst5Innings[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.xFirst5Innings[0].drawRate && v.games.xFirst5Innings[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.xFirst5Innings[0].drawRate && v.games.xFirst5Innings[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xFirst5Innings',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.xFirst5Innings[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.xFirst5Innings[0].drawRate ? $numeral(v.games.xFirst5Innings[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.xFirst5Innings[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.xFirst5Innings[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.xFirst5Innings[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xFirst5Innings',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.xFirst5Innings[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.xFirst5Innings[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> -->

                                                    <!-- ##첫 5이닝 오버언더 underOverFirst5Innings -->
                                                    <!-- <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOverFirst5Innings && v.showConfig.underOverFirst5Innings &&
                                                            v.games.underOverFirst5Innings.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOverFirst5Innings.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫 5이닝 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOverFirst5Innings" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOverFirst5Innings[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                                @click="v.games.underOverFirst5Innings[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOverFirst5Innings',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOverFirst5Innings[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                                @click="v.games.underOverFirst5Innings[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOverFirst5Innings',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> -->

                                                    <!-- ##후반전 승무패 x2ndHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.x2ndHalf && v.showConfig.x2ndHalf && v.games.x2ndHalf[0].status !== 'HIDE' && v.games.x2ndHalf[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 승무패
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.x2ndHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.x2ndHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.x2ndHalf[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.x2ndHalf[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.x2ndHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndHalf[0].drawRate && v.games.x2ndHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'draw') > -1
                                                                }"
                                                                @click="v.games.x2ndHalf[0].drawRate && v.games.x2ndHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'draw',
                                                                    selectRate: v.games.x2ndHalf[0].drawRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.x2ndHalf[0].drawRate ? $numeral(v.games.x2ndHalf[0].drawRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.x2ndHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.x2ndHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.x2ndHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'x2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.x2ndHalf[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.x2ndHalf[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##후반전 핸디캡 handicap2ndHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.handicap2ndHalf && v.showConfig.handicap2ndHalf &&
                                                            v.games.handicap2ndHalf.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.handicap2ndHalf.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 핸디캡
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.handicap2ndHalf" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.handicap2ndHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndHalf' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: vv.homeRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.handicap2ndHalf[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.homeStandard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.handicap2ndHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.handicap2ndHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndHalf' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                }"
                                                                v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                                @click="v.games.handicap2ndHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'handicap2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: vv.awayRate,
                                                                    standard: vv.homeStandard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##후반전 오버언더 underOver2ndHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.underOver2ndHalf && v.showConfig.underOver2ndHalf &&
                                                            v.games.underOver2ndHalf.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.underOver2ndHalf.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.underOver2ndHalf" :key="index">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.underOver2ndHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndHalf' && x.standard === vv.standard && x.select === 'over') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'over',
                                                                    selectRate: vv.overRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    오버
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    <small class="o">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                    </small>
                                                                    {{ $numeral(vv.overRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.underOver2ndHalf[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                            >
                                                                {{ vv.standard }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.underOver2ndHalf[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.underOver2ndHalf[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndHalf' && x.standard === vv.standard && x.select === 'under') > -1
                                                                }"
                                                                v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                                @click="v.games.underOver2ndHalf[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'underOver2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'under',
                                                                    selectRate: vv.underRate,
                                                                    standard: vv.standard
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(vv.underRate).format('0.00') }}
                                                                    <small class="u">
                                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                    </small>
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    언더
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##후반전 홀짝 oddEven2ndHalf -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.oddEven2ndHalf && v.showConfig.oddEven2ndHalf && v.games.oddEven2ndHalf[0].status !== 'HIDE' && v.games.oddEven2ndHalf[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 홀짝
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'odd') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'odd',
                                                                    selectRate: v.games.oddEven2ndHalf[0].oddRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    홀
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndHalf[0].oddRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.oddEven2ndHalf[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'even') > -1
                                                                }"
                                                                @click="v.games.oddEven2ndHalf[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'oddEven2ndHalf',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'even',
                                                                    selectRate: v.games.oddEven2ndHalf[0].evenRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.oddEven2ndHalf[0].evenRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    짝
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##풀타임 양팀 득점 bothTeamScore -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.bothTeamScore && v.showConfig.bothTeamScore && v.games.bothTeamScore[0].status !== 'HIDE' && v.games.bothTeamScore[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.bothTeamScore[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamScore[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamScore[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamScore',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamScore[0].yesRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    득점
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamScore[0].yesRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.bothTeamScore[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.bothTeamScore[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamScore[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamScore[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamScore',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamScore[0].noRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.bothTeamScore[0].noRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    무득점
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##양팀 득점 + 승무패 bothTeamsGoalWin -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.bothTeamsGoalWin && v.showConfig.bothTeamsGoalWin &&
                                                            v.games.bothTeamsGoalWin.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.bothTeamsGoalWin.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점 + 승무패
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWin[1] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[1].status !== 'HIDE' && v.games.bothTeamsGoalWin[1].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[1].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+홈승
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[1].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[1].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[1].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWin[1].yesRate,
                                                                    standard: 'firstTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[1].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[1].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[1].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[1].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamsGoalWin[1].noRate,
                                                                    standard: 'firstTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[1].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWin[0] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[0].status !== 'HIDE' && v.games.bothTeamsGoalWin[0].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+무승부
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWin[0].yesRate,
                                                                    standard: 'draw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[0].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamScore[0].noRate,
                                                                    standard: 'draw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[0].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWin[2] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[2].status !== 'HIDE' && v.games.bothTeamsGoalWin[2].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[2].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+원정승
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[2].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[2].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[2].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWin[2].yesRate,
                                                                    standard: 'secondTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[2].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWin[2].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWin[2].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWin[2].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWin',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamsGoalWin[2].noRate,
                                                                    standard: 'secondTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWin[2].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##양팀 득점 + 더블찬스 bothTeamsGoalWinOrDraw -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.bothTeamsGoalWinOrDraw && v.showConfig.bothTeamsGoalWinOrDraw &&
                                                            v.games.bothTeamsGoalWinOrDraw.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.bothTeamsGoalWinOrDraw.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점 + 더블찬스
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWinOrDraw[0] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[0].status !== 'HIDE' && v.games.bothTeamsGoalWinOrDraw[0].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+홈승 또는 무승부
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[0].yesRate,
                                                                    standard: 'firstTeamWinOrDraw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[0].noRate,
                                                                    standard: 'firstTeamWinOrDraw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWinOrDraw[1] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[1].status !== 'HIDE' && v.games.bothTeamsGoalWinOrDraw[1].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[1].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+홈승 또는 원정승
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[1].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[1].yesRate,
                                                                    standard: 'firstTeamWinOrSecondTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[1].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[1].noRate,
                                                                    standard: 'firstTeamWinOrSecondTeamWin'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="row"
                                                            v-if="v.games.bothTeamsGoalWinOrDraw[2] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[2].status !== 'HIDE' && v.games.bothTeamsGoalWinOrDraw[2].showStatus"
                                                        >
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[2].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                양팀 득점+원정승 또는 무승부
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[2].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'yes') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[2].yesRate,
                                                                    standard: 'secondTeamWinOrDraw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.bothTeamsGoalWinOrDraw[2].status !== 'ACTIVE',
                                                                    'can-bet': v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'no') > -1
                                                                }"
                                                                @click="v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'bothTeamsGoalWinOrDraw',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: v.games.bothTeamsGoalWinOrDraw[2].noRate,
                                                                    standard: 'secondTeamWinOrDraw'
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##첫골 팀 firstScoreTeam -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.firstScoreTeam && v.showConfig.firstScoreTeam && v.games.firstScoreTeam[0].status !== 'HIDE' && v.games.firstScoreTeam[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫골 팀 (무: 0-0 노골)
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.firstScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.firstScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.firstScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'firstScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.firstScoreTeam[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.firstScoreTeam[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.firstScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.firstScoreTeam[0].drawRate && v.games.firstScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'neither') > -1
                                                                }"
                                                                @click="v.games.firstScoreTeam[0].neitherRate && v.games.firstScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'firstScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'neither',
                                                                    selectRate: v.games.firstScoreTeam[0].neitherRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.firstScoreTeam[0].neitherRate ? $numeral(v.games.firstScoreTeam[0].neitherRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.firstScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.firstScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.firstScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'firstScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.firstScoreTeam[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.firstScoreTeam[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##야구 첫득점 팀 firstRun -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.firstRun && v.showConfig.firstRun && v.games.firstRun[0].status !== 'HIDE' && v.games.firstRun[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫득점 팀
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.firstRun[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.firstRun[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstRun' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.firstRun[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'firstRun',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.firstRun[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.firstRun[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.firstRun[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.firstRun[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.firstRun[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstRun' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.firstRun[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'firstRun',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.firstRun[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.firstRun[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##마지막골 팀 lastScoreTeam -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.lastScoreTeam && v.showConfig.lastScoreTeam && v.games.lastScoreTeam[0].status !== 'HIDE' && v.games.lastScoreTeam[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 마지막골 팀 (무: 0-0 노골)
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.lastScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.lastScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.lastScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'lastScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.lastScoreTeam[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.lastScoreTeam[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.lastScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.lastScoreTeam[0].drawRate && v.games.lastScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'neither') > -1
                                                                }"
                                                                @click="v.games.lastScoreTeam[0].neitherRate && v.games.lastScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'lastScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'neither',
                                                                    selectRate: v.games.lastScoreTeam[0].neitherRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.lastScoreTeam[0].neitherRate ? $numeral(v.games.lastScoreTeam[0].neitherRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.lastScoreTeam[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.lastScoreTeam[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.lastScoreTeam[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'lastScoreTeam',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.lastScoreTeam[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.lastScoreTeam[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##야구 마지막 득점 팀 lastRun -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.lastRun && v.showConfig.lastRun && v.games.lastRun[0].status !== 'HIDE' && v.games.lastRun[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 마지막 팀
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.lastRun[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.lastRun[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'home') > -1
                                                                }"
                                                                @click="v.games.lastRun[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'lastRun',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'home',
                                                                    selectRate: v.games.lastRun[0].homeRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.lastRun[0].homeRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.lastRun[0].status !== 'ACTIVE'
                                                                }"
                                                            >
                                                                vs
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.lastRun[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.lastRun[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'away') > -1
                                                                }"
                                                                @click="v.games.lastRun[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'lastRun',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'away',
                                                                    selectRate: v.games.lastRun[0].awayRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.lastRun[0].awayRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##최다골 시점 halfWithMostScore -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="v.games.halfWithMostScore && v.showConfig.halfWithMostScore && v.games.halfWithMostScore[0].status !== 'HIDE' && v.games.halfWithMostScore[0].showStatus"
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 최다골 시점
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-5 g-home"
                                                                :class="{
                                                                    'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.halfWithMostScore[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half1st') > -1
                                                                }"
                                                                @click="v.games.halfWithMostScore[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'halfWithMostScore',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'half1st',
                                                                    selectRate: v.games.halfWithMostScore[0].half1stRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile">
                                                                    전반전
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(v.games.halfWithMostScore[0].half1stRate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-2 g-x"
                                                                :class="{
                                                                    'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.halfWithMostScore[0].drawEqualNumberRate && v.games.halfWithMostScore[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'drawEqualNumber') > -1
                                                                }"
                                                                @click="v.games.halfWithMostScore[0].drawEqualNumberRate && v.games.halfWithMostScore[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'halfWithMostScore',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'drawEqualNumber',
                                                                    selectRate: v.games.halfWithMostScore[0].drawEqualNumberRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                {{ v.games.halfWithMostScore[0].drawEqualNumberRate ? $numeral(v.games.halfWithMostScore[0].drawEqualNumberRate).format('0.00') : 'vs' }}
                                                            </div>
                                                            <div
                                                                class="col-5 g-away"
                                                                :class="{
                                                                    'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                                                                    'can-bet': v.games.halfWithMostScore[0].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half2nd') > -1
                                                                }"
                                                                @click="v.games.halfWithMostScore[0].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'halfWithMostScore',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'half2nd',
                                                                    selectRate: v.games.halfWithMostScore[0].half2ndRate,
                                                                    standard: null
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ $numeral(v.games.halfWithMostScore[0].half2ndRate).format('0.00') }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile">
                                                                    후반전
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##정확한 점수 correctScoreFullTime -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.correctScoreFullTime && v.showConfig.correctScoreFullTime &&
                                                            v.games.correctScoreFullTime.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.correctScoreFullTime.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 정확한 점수
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                class="col-4 g-home-correct"
                                                                :class="{
                                                                    'n': vv.status !== 'ACTIVE',
                                                                    'can-bet': vv.status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'correctScoreFullTime' && x.standard === `${vv.homeScore}:${vv.awayScore}` && x.select === `${vv.homeScore}:${vv.awayScore}`) > -1
                                                                }"
                                                                v-for="(vv, index) in v.games.correctScoreFullTime" :key="index"
                                                                @click="vv.status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'correctScoreFullTime',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: `${vv.homeScore}:${vv.awayScore}`,
                                                                    selectRate: vv.rate,
                                                                    standard: `${vv.homeScore}:${vv.awayScore}`
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    {{ vv.homeScore }}
                                                                    :
                                                                    {{ vv.awayScore }}
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.rate).format('0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ##승무패/오버언더 xWithUnderOver -->
                                                    <div
                                                        class="col-12 mt-3"
                                                        v-if="
                                                            v.games.xWithUnderOver && v.showConfig.xWithUnderOver &&
                                                            v.games.xWithUnderOver.findIndex(x => x.status !== 'HIDE') > -1 &&
                                                            v.games.xWithUnderOver.findIndex(x => x.showStatus) > -1
                                                        "
                                                    >
                                                        <div class="mb-1">
                                                            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패/오버언더
                                                        </div>
                                                        <div class="row" v-for="(vv, index) in v.games.xWithUnderOver" :key="index">
                                                            <div
                                                                class="col-6 pl-1 pl-xl-2 g-explain"
                                                                :class="{
                                                                    'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                                                                }"
                                                                v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'"
                                                            >
                                                                <span v-if="vv.team === 'home'">홈승</span>
                                                                <span v-else-if="vv.team === 'draw'">무승부</span>
                                                                <span v-else-if="vv.team === 'away'">원정승</span>
                                                                /
                                                                <span v-if="vv.type === 'Under'">언더</span>
                                                                <span v-else-if="vv.type === 'Over'">오버</span>
                                                                <span class="circle-down ml-1">({{ vv.standard }})</span>
                                                            </div>
                                                            <div
                                                                class="col-3 g-yes"
                                                                :class="{
                                                                    'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.xWithUnderOver[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'yes') > -1
                                                                }"
                                                                v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'"
                                                                @click="v.games.xWithUnderOver[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xWithUnderOver',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'yes',
                                                                    selectRate: vv.yesRate,
                                                                    standard: `${vv.team}${vv.type}-${vv.standard}`
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    예
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.yesRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-3 g-no"
                                                                :class="{
                                                                    'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                                                                    'can-bet': v.games.xWithUnderOver[index].status === 'ACTIVE',
                                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'no') > -1
                                                                }"
                                                                v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'"
                                                                @click="v.games.xWithUnderOver[index].status === 'ACTIVE' ? setBet({
                                                                    _id: v._id,
                                                                    sport: v.sport,
                                                                    type: 'xWithUnderOver',
                                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                    select: 'no',
                                                                    selectRate: vv.noRate,
                                                                    standard: `${vv.team}${vv.type}-${vv.standard}`
                                                                }) : null"
                                                            >
                                                                <div class="float-left pl-1 pl-xl-2">
                                                                    아니오
                                                                </div>
                                                                <div class="float-right pr-1 pr-xl-2">
                                                                    {{ $numeral(vv.noRate).format('0,0.00') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <infinite-loading @infinite="infiniteHandler" ref="InfiniteLoading" spinner="waveDots">
                                <div slot="no-more" class="text-white">마지막 페이지 입니다</div>
                                <div slot="no-results" class="text-white">마지막 페이지 입니다</div>
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
        name: 'SportsLive',
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
                    sport: ''
                },
                expand: {},
                data: [],
                socket: null
                //dataCount: 0
            }
        },
        created() {
            // this.setFromRouter()
            // this.getList()
            this.socketInit()
        },
        methods: {
            ...mapActions(['setBetCart', 'changeBetCart', 'deleteBetCart', 'deleteBetCartAll', 'setBetInfo']),
            socketInit() {
                this.socket = this.$io.connect('https://live-modern.thvmxm.com')
                this.socket.on('connect', () => {
                    // console.log('연결됨.')
                    this.setFromRouter()
                })
                this.socket.on('broadcast', (v) => {
                    this.ioBroadcast(v)
                })
                this.socket.on('delete', () => {
                    this.socket.disconnect()
                    // console.log('종료경기 있어서 연결 끊김.')
                    // this.socketInit()



                    this.$tools.reloadRouter()
                })
            },
            setFromRouter() {
                this.data = []
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                // this.getList()
                // this.infiniteHandler()
            },
            getInitList() {
                this.data = []
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                this.getList()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}`
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-live-list', this.search)
                this.overlay = false
                if(r.error) return

                this.data = r.data.recordSet
                // this.dataCount = r.data.recordCount
                this.betInfo = r.data.betInfo

                // 배팅 금액 설정
                if(this.isLogin) {
                    this.setBetInfo({
                        min: r.data.betInfo[`lv${this.user.grade}`].min,
                        max: r.data.betInfo[`lv${this.user.grade}`].max,
                        benefit: r.data.betInfo[`lv${this.user.grade}`].benefit
                    })
                }

                for(let i = 0; i < this.data.length; i++) {
                    this.socket.emit('message', {
                        type: 'subscribe',
                        id: this.data[i].gameOID
                    })
                }
            },
            async infiniteHandler($state) {
                try {
                    const r = await this.$http.get('/api/get-live-list', this.search)
                    this.search.page++

                    // 배팅 금액 설정
                    if(this.isLogin) {
                        this.setBetInfo({
                            min: r.data.betInfo[`lv${this.user.grade}`].min,
                            max: r.data.betInfo[`lv${this.user.grade}`].max,
                            benefit: r.data.betInfo[`lv${this.user.grade}`].benefit
                        })
                    }

                    if(r.data.recordSet.length > 0) {
                        setTimeout(() => {
                            for(const games of r.data.recordSet) {
                                this.data.push(games)
                            }

                            for(let i = 0; i < this.data.length; i++) {
                                this.socket.emit('message', {
                                    type: 'subscribe',
                                    id: this.data[i].gameOID
                                })
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
                let path = encodeURI(`${this.$route.path}${this.linkGen(1)}`)
                if(path === this.$route.fullPath) {
                    this.getList()
                    return
                }
                this.$router.push(path)
            },
            calcCount(showConfig, games) {
                let cnt = 0
                for(let item in games) {
                    for(let i = 0; i < games[item].length; i++) {
                        if(
                            games[item][i].showStatus && (games[item][i].status === 'ACTIVE') && showConfig[item]
                        ) {
                            cnt++
                            continue;
                        }
                    }
                }
                return cnt
            },
            expandGame(v) {
                //  승무패 핸디캡 정렬
                if(v.games.threeWayHandicap && v.games.threeWayHandicap.length > 1) {
                    v.games.threeWayHandicap.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  핸디캡 정렬
                if(v.games.handicap && v.games.handicap.length > 1) {
                    v.games.handicap.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  오버언더 정렬
                if(v.games.underOver && v.games.underOver.length > 1) {
                    v.games.underOver.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  1이닝 핸디캡 정렬
                if(v.games.handicap1stInning && v.games.handicap1stInning.length > 1) {
                    v.games.handicap1stInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  1이닝 오버언더 정렬
                if(v.games.underOver1stInning && v.games.underOver1stInning.length > 1) {
                    v.games.underOver1stInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  2이닝 핸디캡 정렬
                if(v.games.handicap2ndInning && v.games.handicap2ndInning.length > 1) {
                    v.games.handicap2ndInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  2이닝 오버언더 정렬
                if(v.games.underOver2ndInning && v.games.underOver2ndInning.length > 1) {
                    v.games.underOver2ndInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  3이닝 핸디캡 정렬
                if(v.games.handicap3rdInning && v.games.handicap3rdInning.length > 1) {
                    v.games.handicap3rdInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  3이닝 오버언더 정렬
                if(v.games.underOver3rdInning && v.games.underOver3rdInning.length > 1) {
                    v.games.underOver3rdInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  4이닝 핸디캡 정렬
                if(v.games.handicap4thInning && v.games.handicap4thInning.length > 1) {
                    v.games.handicap4thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  4이닝 오버언더 정렬
                if(v.games.underOver4thInning && v.games.underOver4thInning.length > 1) {
                    v.games.underOver4thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  5이닝 핸디캡 정렬
                if(v.games.handicap5thInning && v.games.handicap5thInning.length > 1) {
                    v.games.handicap5thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  5이닝 오버언더 정렬
                if(v.games.underOver5thInning && v.games.underOver5thInning.length > 1) {
                    v.games.underOver5thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  6이닝 핸디캡 정렬
                if(v.games.handicap6thInning && v.games.handicap6thInning.length > 1) {
                    v.games.handicap6thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  6이닝 오버언더 정렬
                if(v.games.underOver6thInning && v.games.underOver6thInning.length > 1) {
                    v.games.underOver6thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  7이닝 핸디캡 정렬
                if(v.games.handicap7thInning && v.games.handicap7thInning.length > 1) {
                    v.games.handicap7thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  7이닝 오버언더 정렬
                if(v.games.underOver7thInning && v.games.underOver7thInning.length > 1) {
                    v.games.underOver7thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  8이닝 핸디캡 정렬
                if(v.games.handicap8thInning && v.games.handicap8thInning.length > 1) {
                    v.games.handicap8thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  8이닝 오버언더 정렬
                if(v.games.underOver8thInning && v.games.underOver8thInning.length > 1) {
                    v.games.underOver8thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  9이닝 핸디캡 정렬
                if(v.games.handicap9thInning && v.games.handicap9thInning.length > 1) {
                    v.games.handicap9thInning.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  9이닝 오버언더 정렬
                if(v.games.underOver9thInning && v.games.underOver9thInning.length > 1) {
                    v.games.underOver9thInning.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  1셋트 핸디캡 정렬
                if(v.games.handicap1stSet && v.games.handicap1stSet.length > 1) {
                    v.games.handicap1stSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                    if(v.games.handicap1stSet.length > 1) v.games.handicap1stSet.pop()
                }
                //  1셋트 오버언더 정렬
                if(v.games.underOver1stSet && v.games.underOver1stSet.length > 1) {
                    v.games.underOver1stSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                    if(v.games.underOver1stSet.length > 1) v.games.underOver1stSet.pop()
                }
                //  2세트 핸디캡 정렬
                if(v.games.handicap2ndSet && v.games.handicap2ndSet.length > 1) {
                    v.games.handicap2ndSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                    if(v.games.handicap2ndSet.length > 1) v.games.handicap2ndSet.pop()
                }
                //  2세트 오버언더 정렬
                if(v.games.underOver2ndSet && v.games.underOver2ndSet.length > 1) {
                    v.games.underOver2ndSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                    if(v.games.underOver2ndSet.length > 1) v.games.underOver2ndSet.pop()
                }
                //  3세트 핸디캡 정렬
                if(v.games.handicap3rdSet && v.games.handicap3rdSet.length > 1) {
                    v.games.handicap3rdSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                    if(v.games.handicap3rdSet.length > 1) v.games.handicap3rdSet.pop()
                }
                //  3세트 오버언더 정렬
                if(v.games.underOver3rdSet && v.games.underOver3rdSet.length > 1) {
                    v.games.underOver3rdSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                    if(v.games.underOver3rdSet.length > 1) v.games.underOver3rdSet.pop()
                }
                //  1피리어드 핸디캡 정렬
                if(v.games.handicap1stPeriod && v.games.handicap1stPeriod.length > 1) {
                    v.games.handicap1stPeriod.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  1피리어드 오버언더 정렬
                if(v.games.underOver1stPeriod && v.games.underOver1stPeriod.length > 1) {
                    v.games.underOver1stPeriod.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  2피리어드 핸디캡 정렬
                if(v.games.handicap2ndPeriod && v.games.handicap2ndPeriod.length > 1) {
                    v.games.handicap2ndPeriod.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  2피리어드 오버언더 정렬
                if(v.games.underOver2ndPeriod && v.games.underOver2ndPeriod.length > 1) {
                    v.games.underOver2ndPeriod.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  3피리어드 핸디캡 정렬
                if(v.games.handicap3rdPeriod && v.games.handicap3rdPeriod.length > 1) {
                    v.games.handicap3rdPeriod.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  3피리어드 오버언더 정렬
                if(v.games.underOver3rdPeriod && v.games.underOver3rdPeriod.length > 1) {
                    v.games.underOver3rdPeriod.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  전반전 핸디캡 정렬
                if(v.games.handicap1stHalf && v.games.handicap1stHalf.length > 1) {
                    v.games.handicap1stHalf.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  전반전 오버언더 정렬
                if(v.games.underOver1stHalf && v.games.underOver1stHalf.length > 1) {
                    v.games.underOver1stHalf.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  5이닝 오버언더 정렬
                if(v.games.underOverFirst5Innings && v.games.underOverFirst5Innings.length > 1) {
                    v.games.underOverFirst5Innings.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  후반전 핸디캡 정렬
                if(v.games.handicap2ndHalf && v.games.handicap2ndHalf.length > 1) {
                    v.games.handicap2ndHalf.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  후반전 오버언더 정렬
                if(v.games.oddEven2ndHalf && v.games.oddEven2ndHalf.length > 1) {
                    v.games.oddEven2ndHalf.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  정확한 점수 정렬
                if(v.games.correctScoreFullTime && v.games.correctScoreFullTime.length > 1) {
                    v.games.correctScoreFullTime.sort((a, b) => {
                        return (a.homeScore < b.homeScore) ? -1 : (a.homeScore > b.homeScore) ? 1: 0
                    })
                }
                //  승무패/오버언더 정렬
                if(v.games.xWithUnderOver && v.games.xWithUnderOver.length > 1) {
                    v.games.xWithUnderOver.sort((a, b) => {
                        return (a.team > b.team) ? -1 : (a.team < b.team) ? 1: 0
                    })
                }
                //  양팀 득점/승무패 정렬
                if(v.games.bothTeamsGoalWin && v.games.bothTeamsGoalWin.length > 1) {
                    v.games.bothTeamsGoalWin.sort((a, b) => {
                        return (a.type < b.type) ? -1 : (a.type > b.type) ? 1: 0
                    })
                }
                //  양팀 득점/더블찬스 정렬
                if(v.games.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw.length > 1) {
                    v.games.bothTeamsGoalWinOrDraw.sort((a, b) => {
                        return (a.type < b.type) ? -1 : (a.type > b.type) ? 1: 0
                    })
                }

                this.expand = v
                this.$nextTick(() => {
                    this.$scrollTo(`#section-${v._id}`, 300, { offset: -180 })
                })
            },
            setBet(v) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                v.gameType = 'sportsLive'
                // 일치하는 배팅 삭제
                // _id, type, select 일치
                let existSameCartIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id && v.type === x.type && v.standard === x.standard && v.select === x.select
                })
                if(existSameCartIndex > -1) {
                    this.$store.commit('deleteBetCart', existSameCartIndex)
                    return
                }

                // 일치하는 _id 건에 대한 변경
                let existSameGameIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id
                })
                if(existSameGameIndex > -1) {
                    this.changeBetCart({
                        index: existSameGameIndex,
                        bet: v
                    })
                    return
                }

                this.setBetCart(v)
            },
            async ioBroadcast(v) {
                let gameIndex = this.data.findIndex(x => x.gameOID === v)
                if(gameIndex > -1) {
                    let r = await this.$http.get('/api/get-live-detail', {
                        _id: this.data[gameIndex]._id,
                        _: Date.now()
                    }, 'sportsLive')
                    if(r.error) return

                    this.$set(this.data, gameIndex, r.data)
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            this.deleteBetCartAll()
            this.socket.disconnect()
            next()
        }
    }
</script>