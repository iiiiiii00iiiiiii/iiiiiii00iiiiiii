<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'futbol']"/>
                            <span class="ml-2">국내형 크로스 SPORTS CROSS</span>
                            <span class="float-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="selectCategory('')">
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
                                    <img src="/images/icon-all-gray.png" class="sports-category-icon" id="All" alt="전체" title="전체" @click="selectCategory('')">
                                    <b-tooltip target="All" title="전체"></b-tooltip>
                                </li>
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
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구" @click="selectCategory('Volleyball')">
                                    <b-tooltip target="Volleyball" title="배구"></b-tooltip>
                                </li>
                                <li>
                                    <img src="/images/icon-icehockey-gray.png" class="sports-category-icon" id="Ice Hockey" alt="아이스하키" title="아이스하키" @click="selectCategory('Ice Hockey')">
                                    <b-tooltip target="Ice Hockey" title="아이스하키"></b-tooltip>
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
                                        <!-- 승무패 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.xKor && v.showConfig.xKor && v.games.xKor[0].status === 'ACTIVE' && v.games.xKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.xKor || v.games.xKor[0].status !== 'ACTIVE' || !v.games.xKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xKor' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'xKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.xKor[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <!-- <small class="x d-sm-none">X</small> -->
                                                    <!-- <small class="x d-none d-sm-inline">1x2</small> -->
                                                    {{ $numeral(v.games.xKor[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col-2 g-x"
                                                :class="{
                                                    'n': !v.showConfig.xKor || v.games.xKor[0].status !== 'ACTIVE' || !v.games.xKor[0].showStatus,
                                                    'can-bet': v.showConfig.xKor && v.games.xKor[0].status === 'ACTIVE' && v.games.xKor[0].showStatus && v.games.xKor[0].drawRate,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xKor' && x.standard === null && x.select === 'draw') > -1
                                                }"
                                                @click="v.showConfig.xKor && v.games.xKor[0].status === 'ACTIVE' && v.games.xKor[0].showStatus && v.games.xKor[0].drawRate ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'xKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'draw',
                                                    selectRate: v.games.xKor[0].drawRate,
                                                    standard: null
                                                }) : null"
                                            >
                                                {{ v.games.xKor[0].drawRate ? $numeral(v.games.xKor[0].drawRate).format('0.00') : 'vs' }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'n': !v.showConfig.xKor || v.games.xKor[0].status !== 'ACTIVE' || !v.games.xKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xKor' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'xKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.xKor[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.xKor[0].awayRate).format('0.00') }}
                                                    <!-- <small class="x d-sm-none">X</small>
                                                    <small class="x d-none d-sm-inline">1x2</small> -->
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                승무패
                                            </div>
                                        </div>
                                        <!-- 핸디캡 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicapKor && v.showConfig.handicapKor && v.games.handicapKor[0].status === 'ACTIVE' && v.games.handicapKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapKor' && x.standard === v.games.handicapKor[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicapKor[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicapKor[0].homeRate,
                                                    standard: v.games.handicapKor[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicapKor[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicapKor[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapKor' && x.standard === v.games.handicapKor[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicapKor[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicapKor[0].awayRate,
                                                    standard: v.games.handicapKor[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicapKor[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                핸디캡
                                            </div>
                                        </div>
                                        <!-- 탁구 핸디캡 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicapTotalSetKor && v.showConfig.handicapTotalSetKor && v.games.handicapTotalSetKor[0].status === 'ACTIVE' && v.games.handicapTotalSetKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSetKor' && x.standard === v.games.handicapTotalSetKor[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicapTotalSetKor[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapTotalSetKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicapTotalSetKor[0].homeRate,
                                                    standard: v.games.handicapTotalSetKor[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicapTotalSetKor[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicapTotalSetKor[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSetKor' && x.standard === v.games.handicapTotalSetKor[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicapTotalSetKor[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapTotalSetKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicapTotalSetKor[0].awayRate,
                                                    standard: v.games.handicapTotalSetKor[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicapTotalSetKor[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                핸디캡
                                            </div>
                                        </div>
                                        <!-- 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOverKor && v.showConfig.underOverKor && v.games.underOverKor[0].status === 'ACTIVE' && v.games.underOverKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverKor' && x.standard === v.games.underOverKor[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOverKor[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOverKor[0].overRate,
                                                    standard: v.games.underOverKor[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOverKor[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOverKor[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverKor' && x.standard === v.games.underOverKor[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOverKor[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOverKor[0].underRate,
                                                    standard: v.games.underOverKor[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOverKor[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                오버언더
                                            </div>
                                        </div>
                                        <!-- 탁구 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOverTotalSetKor && v.showConfig.underOverTotalSetKor && v.games.underOverTotalSetKor[0].status === 'ACTIVE' && v.games.underOverTotalSetKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSetKor' && x.standard === v.games.underOverTotalSetKor[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOverTotalSetKor[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverTotalSetKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOverTotalSetKor[0].overRate,
                                                    standard: v.games.underOverTotalSetKor[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOverTotalSetKor[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOverTotalSetKor[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSetKor' && x.standard === v.games.underOverTotalSetKor[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOverTotalSetKor[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverTotalSetKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOverTotalSetKor[0].underRate,
                                                    standard: v.games.underOverTotalSetKor[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOverTotalSetKor[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                오버언더
                                            </div>
                                        </div>
                                        <!-- 1이닝 득점/무득점 -->
                                        <div
                                            class="row g"
                                            v-if="v.games.run1stInning && v.showConfig.run1stInning && v.games.run1stInning[0].status === 'ACTIVE' && v.games.run1stInning[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.run1stInning || v.games.run1stInning[0].status !== 'ACTIVE' || !v.games.run1stInning[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'run1stInning' && x.standard === null && x.select === 'yes') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'run1stInning',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'yes',
                                                    selectRate: v.games.run1stInning[0].yesRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-1 pl-xl-2 g-home-team-mobile-cross">
                                                    1이닝 득점
                                                </div>
                                                <div class="float-right pr-1 pr-xl-2">
                                                    <!-- <small class="x d-sm-none">X</small> -->
                                                    <!-- <small class="x d-none d-sm-inline">1x2</small> -->
                                                    {{ $numeral(v.games.run1stInning[0].yesRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col-2 g-x"
                                                :class="{
                                                    'n': !v.showConfig.x || v.games.run1stInning[0].status !== 'ACTIVE' || !v.games.run1stInning[0].showStatus,
                                                    'can-bet': v.showConfig.x && v.games.run1stInning[0].status === 'ACTIVE' && v.games.run1stInning[0].showStatus && v.games.run1stInning[0].drawRate,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'run1stInning' && x.standard === null && x.select === 'draw') > -1
                                                }"
                                                @click="v.showConfig.x && v.games.run1stInning[0].status === 'ACTIVE' && v.games.run1stInning[0].showStatus && v.games.run1stInning[0].drawRate ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'run1stInning',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'draw',
                                                    selectRate: v.games.run1stInning[0].drawRate,
                                                    standard: null
                                                }) : null"
                                            >
                                                {{ v.games.run1stInning[0].drawRate ? $numeral(v.games.run1stInning[0].drawRate).format('0.00') : 'vs' }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'n': !v.showConfig.x || v.games.run1stInning[0].status !== 'ACTIVE' || !v.games.run1stInning[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'run1stInning' && x.standard === null && x.select === 'no') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'run1stInning',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'no',
                                                    selectRate: v.games.run1stInning[0].noRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-1 pl-xl-2">
                                                    {{ $numeral(v.games.run1stInning[0].noRate).format('0.00') }}
                                                    <!-- <small class="x d-sm-none">X</small>
                                                    <small class="x d-none d-sm-inline">1x2</small> -->
                                                </div>
                                                <div class="float-right pr-1 pr-xl-2 g-away-team-mobile-cross">
                                                    1이닝 무득점
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1이닝 득/무득
                                            </div>
                                        </div>
                                        <!-- 선 7득점 [농구] -->
                                        <!-- <div
                                            class="row g"
                                            v-if="v.games.first7PointsKor && v.showConfig.first7PointsKor && v.games.first7PointsKor[0].status === 'ACTIVE' && v.games.first7PointsKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first7PointsKor || v.games.first7PointsKor[0].status !== 'ACTIVE' || !v.games.first7PointsKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first7Points' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first7PointsKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.first7PointsKor[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="first7Points d-sm-none">선7</small>
                                                    <small class="first7Points d-none d-sm-inline">선7득점</small>
                                                    {{ $numeral(v.games.first7PointsKor[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col-2 g-x"
                                            >
                                                vs
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first7PointsKor || v.games.first7PointsKor[0].status !== 'ACTIVE' || !v.games.first7PointsKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first7Points' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first7PointsKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.first7PointsKor[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.first7PointsKor[0].awayRate).format('0.00') }}
                                                    <small class="first7Points d-sm-none">선7</small>
                                                    <small class="first7Points d-none d-sm-inline">선7득점</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                선 7득점
                                            </div>
                                        </div> -->
                                        <!-- 선 5득점 [배구] -->
                                        <!-- <div
                                            class="row g"
                                            v-if="v.games.first5PointsKor && v.showConfig.first5PointsKor && v.games.first5PointsKor[0].status === 'ACTIVE' && v.games.first5PointsKor[0].showStatus"
                                        >
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first5PointsKor || v.games.first5PointsKor[0].status !== 'ACTIVE' || !v.games.first5PointsKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first5Points' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first5PointsKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.first5PointsKor[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="first5Points d-sm-none">선5</small>
                                                    <small class="first5Points d-none d-sm-inline">선5득점</small>
                                                    {{ $numeral(v.games.first5PointsKor[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col-2 g-x"
                                            >
                                                vs
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first5PointsKor || v.games.first5PointsKor[0].status !== 'ACTIVE' || !v.games.first5PointsKor[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first5Points' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first5PointsKor',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.first5PointsKor[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.first5PointsKor[0].awayRate).format('0.00') }}
                                                    <small class="first5Points d-sm-none">선5</small>
                                                    <small class="first5Points d-none d-sm-inline">선5득점</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                선 5득점
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-overlay>
            <div class="row my-3">
                <div class="col-12">
                    <div class="card bg-pagination">
                        <div class="card-body pagination-body">
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
                            ></b-pagination-nav>
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
        name: 'SportsCross',
        components: {
        },
        computed: {
            ...mapGetters(['loading', 'isLogin', 'user', 'betCart']),
            numberOfPages() {
                return Math.ceil(this.dataCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.dataCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
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
                data: [],
                dataCount: 0
            }
        },
        created() {
            this.setFromRouter()
        },
        methods: {
            ...mapActions(['setBetCart', 'changeBetCart', 'deleteBetCart', 'deleteBetCartAll', 'setBetInfo']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''
                this.search.league = this.$route.query.league ? this.$route.query.league : ''

                this.getList()
                // this.infiniteHandler()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}&league=${this.search.league}`
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-prematch-cross-list-pent', this.search)
                this.overlay = false
                if(r.error) return

                this.data = r.data.recordSet
                this.dataCount = r.data.recordCount
                this.betInfo = r.data.betInfo

                if(this.isLogin) {
                    this.setBetInfo({
                        min: r.data.betInfo[`lv${this.user.grade}`].min,
                        max: r.data.betInfo[`lv${this.user.grade}`].max,
                        benefit: r.data.betInfo[`lv${this.user.grade}`].benefit
                    })
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
            },
            calcCount(showConfig, games) {
                let cnt = 0
                for(let item in games) {
                    if(item === 'xKor' || item === 'handicapKor' || item === 'underOverKor') {
                        continue
                    }

                    for(let i = 0; i < games[item].length; i++) {
                        if(
                            games[item][i].showStatus && (games[item][i].status === 'ACTIVE' || games[item][i].status === 'HIDE') && showConfig[item]
                        ) {
                            cnt++
                            continue;
                        }
                    }
                }
                return cnt
            },
            setBet(v) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                v.gameType = 'sportsCross'
                // 일치하는 배팅 삭제
                // _id, type, select 일치
                let existSameCartIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id && v.type === x.type && v.standard === x.standard && v.select === x.select
                })
                if(existSameCartIndex > -1) {
                    this.$store.commit('deleteBetCart', existSameCartIndex)
                    return
                }

                //  일치하는 _id 건에 대한 승무패, 핸디캡 검사
                if(v.type === 'xKor' || (v.type === 'handicapKor' || v.type === 'handicapTotalSetKor')) {
                    let existSameGameIndex = this.betCart.findIndex((x) => {
                        return v._id === x._id && v.type !== x.type && (x.type === 'xKor' || (x.type === 'handicapKor' || x.type === 'handicapTotalSetKor'))
                    })

                    if(existSameGameIndex > -1) {
                        this.$tools.sw('warning', '조합불가', '동일경기 승무패, 핸디캡은 조합이 불가능 합니다.')
                        return
                    }
                }

                if(v.sport === 'Football' || v.sport === 'FIFA' || v.sport === 'Volleyball') {
                    //  일치하는 _id 건에 대한 조합 검사
                    let existSameGameIndex = this.betCart.findIndex((x) => {
                        return v._id === x._id && v.type !== x.type
                    })

                    if(existSameGameIndex > -1) {
                        this.$tools.sw('warning', '조합불가', '동일경기 조합은 불가능 합니다.')
                        return
                    }
                }

                if(v.sport === 'Baseball') {
                    //  일치하는 _id 건에 대한 승무패, 핸디캡 검사
                    if(v.type === 'run1stInning' || v.type === 'handicapKor' || v.type === 'underOverKor') {
                        let existSameGameIndex = this.betCart.findIndex((x) => {
                            return v._id === x._id && v.type !== x.type && (x.type === 'run1stInning' || x.type === 'handicapKor' || x.type === 'underOverKor')
                        })

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 1이닝 득/무득은 핸디캡 또는 언더오버와 조합이 불가능 합니다.')
                            return
                        }
                    }
                }

                //  일치하는 _id 건에 대한 변경
                let existSameGameIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id && v.type === x.type
                })
                if(existSameGameIndex > -1) {
                    this.$store.commit('changeBetCart', {
                        index: existSameGameIndex,
                        bet: v
                    })
                    return
                }

                this.setBetCart(v)
            }
        },
        beforeRouteLeave (to, from, next) {
            this.deleteBetCartAll()
            next()
        }
    }
</script>

