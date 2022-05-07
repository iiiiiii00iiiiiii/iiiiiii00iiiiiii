<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'futbol']"/>
                            <span class="ml-2">스페셜 SPECIAL</span>
                            <span class="float-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="$tools.pushRouter('/sportsspecial')">
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
                                    <img src="/images/icon-lol-gray.png" class="sports-category-icon" id="LOL" alt="LOL" title="LOL" @click="selectCategory('LoL')">
                                    <b-tooltip target="LOL" title="LOL"></b-tooltip>
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
                                        <!-- 1쿼터 핸디캡 [농구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicap1stQuarterSpecial && v.showConfig.handicap1stQuarterSpecial && v.games.handicap1stQuarterSpecial[0].status === 'ACTIVE' && v.games.handicap1stQuarterSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1쿼터 핸디캡</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarterSpecial' && x.standard === v.games.handicap1stQuarterSpecial[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap1stQuarterSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap1stQuarterSpecial[0].homeRate,
                                                    standard: v.games.handicap1stQuarterSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap1stQuarterSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicap1stQuarterSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarterSpecial' && x.standard === v.games.handicap1stQuarterSpecial[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap1stQuarterSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap1stQuarterSpecial[0].awayRate,
                                                    standard: v.games.handicap1stQuarterSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap1stQuarterSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1쿼터 핸디캡
                                            </div>
                                        </div>
                                        <!-- 1쿼터 오버언더 [농구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOver1stQuarterSpecial && v.showConfig.underOver1stQuarterSpecial && v.games.underOver1stQuarterSpecial[0].status === 'ACTIVE' && v.games.underOver1stQuarterSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1쿼터 오버언더</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarterSpecial' && x.standard === v.games.underOver1stQuarterSpecial[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver1stQuarterSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver1stQuarterSpecial[0].overRate,
                                                    standard: v.games.underOver1stQuarterSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver1stQuarterSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOver1stQuarterSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarterSpecial' && x.standard === v.games.underOver1stQuarterSpecial[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver1stQuarterSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver1stQuarterSpecial[0].underRate,
                                                    standard: v.games.underOver1stQuarterSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver1stQuarterSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1쿼터 오버언더
                                            </div>
                                        </div>
                                        <!-- 첫 2점슛 [농구] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.first2Points && v.showConfig.first2Points && v.games.first2Points[0].status === 'ACTIVE' && v.games.first2Points[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">첫 2점슛</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first2Points || v.games.first2Points[0].status !== 'ACTIVE' || !v.games.first2Points[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first2Points' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first2Points',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.first2Points[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <!-- <small class="first2Points d-sm-none">첫2</small>
                                                    <small class="first2Points d-none d-sm-inline">첫2점슛</small> -->
                                                    {{ $numeral(v.games.first2Points[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.first2Points || v.games.first2Points[0].status !== 'ACTIVE' || !v.games.first2Points[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first2Points' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first2Points',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.first2Points[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.first2Points[0].awayRate).format('0.00') }}
                                                    <!-- <small class="first2Points d-sm-none">첫2</small>
                                                    <small class="first2Points d-none d-sm-inline">첫2점슛</small> -->
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                첫 2점슛
                                            </div>
                                        </div>
                                        <!-- 첫 3점슛 [농구] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.first3Points && v.showConfig.first3Points && v.games.first3Points[0].status === 'ACTIVE' && v.games.first3Points[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">첫 3점슛</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.first3Points || v.games.first3Points[0].status !== 'ACTIVE' || !v.games.first3Points[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first3Points' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first3Points',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.first3Points[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <!-- <small class="first3Points d-sm-none">첫3</small>
                                                    <small class="first3Points d-none d-sm-inline">첫3점슛</small> -->
                                                    {{ $numeral(v.games.first3Points[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.first3Points || v.games.first3Points[0].status !== 'ACTIVE' || !v.games.first3Points[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'first3Points' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'first3Points',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.first3Points[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.first3Points[0].awayRate).format('0.00') }}
                                                    <!-- <small class="first3Points d-sm-none">첫3</small>
                                                    <small class="first3Points d-none d-sm-inline">첫3점슛</small> -->
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                첫 3점슛
                                            </div>
                                        </div>
                                        <!-- 첫 자유투 [농구] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstFreeThrow && v.showConfig.firstFreeThrow && v.games.firstFreeThrow[0].status === 'ACTIVE' && v.games.firstFreeThrow[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">첫 자유투</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstFreeThrow || v.games.firstFreeThrow[0].status !== 'ACTIVE' || !v.games.firstFreeThrow[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstFreeThrow' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstFreeThrow',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstFreeThrow[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <!-- <small class="firstFreeThrow d-sm-none">첫자</small>
                                                    <small class="firstFreeThrow d-none d-sm-inline">첫자유투</small> -->
                                                    {{ $numeral(v.games.firstFreeThrow[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstFreeThrow || v.games.firstFreeThrow[0].status !== 'ACTIVE' || !v.games.firstFreeThrow[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstFreeThrow' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstFreeThrow',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstFreeThrow[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstFreeThrow[0].awayRate).format('0.00') }}
                                                    <!-- <small class="firstFreeThrow d-sm-none">첫자</small>
                                                    <small class="firstFreeThrow d-none d-sm-inline">첫자유투</small> -->
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                첫 자유투
                                            </div>
                                        </div>
                                        <!-- 5이닝 핸디캡 [야구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicapFirst5InningsSpecial && v.showConfig.handicapFirst5InningsSpecial && v.games.handicapFirst5InningsSpecial[0].status === 'ACTIVE' && v.games.handicapFirst5InningsSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">5이닝 핸디캡</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapFirst5InningsSpecial' && x.standard === v.games.handicapFirst5InningsSpecial[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicapFirst5InningsSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapFirst5InningsSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicapFirst5InningsSpecial[0].homeRate,
                                                    standard: v.games.handicapFirst5InningsSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicapFirst5InningsSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicapFirst5InningsSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapFirst5InningsSpecial' && x.standard === v.games.handicapFirst5InningsSpecial[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicapFirst5InningsSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicapFirst5InningsSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicapFirst5InningsSpecial[0].awayRate,
                                                    standard: v.games.handicapFirst5InningsSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicapFirst5InningsSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                5이닝 핸디캡
                                            </div>
                                        </div>
                                        <!-- 5이닝 오버언더 [야구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOverFirst5InningsSpecial && v.showConfig.underOverFirst5InningsSpecial && v.games.underOverFirst5InningsSpecial[0].status === 'ACTIVE' && v.games.underOverFirst5InningsSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">5이닝 오버언더</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5InningsSpecial' && x.standard === v.games.underOverFirst5InningsSpecial[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOverFirst5InningsSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverFirst5InningsSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOverFirst5InningsSpecial[0].overRate,
                                                    standard: v.games.underOverFirst5InningsSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOverFirst5InningsSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOverFirst5InningsSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5InningsSpecial' && x.standard === v.games.underOverFirst5InningsSpecial[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOverFirst5InningsSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOverFirst5InningsSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOverFirst5InningsSpecial[0].underRate,
                                                    standard: v.games.underOverFirst5InningsSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOverFirst5InningsSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                5이닝 오버언더
                                            </div>
                                        </div>
                                        <!-- 첫 볼넷 [야구] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstWalk && v.showConfig.firstWalk && v.games.firstWalk[0].status === 'ACTIVE' && v.games.firstWalk[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">첫 볼넷</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstWalk || v.games.firstWalk[0].status !== 'ACTIVE' || !v.games.firstWalk[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstWalk' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstWalk',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstWalk[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.firstWalk[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstWalk || v.games.firstWalk[0].status !== 'ACTIVE' || !v.games.firstWalk[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstWalk' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstWalk',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstWalk[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstWalk[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                첫 볼넷
                                            </div>
                                        </div>
                                        <!-- 1세트 핸디캡 [배구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicap1stSetSpecial && v.showConfig.handicap1stSetSpecial && v.games.handicap1stSetSpecial[0].status === 'ACTIVE' && v.games.handicap1stSetSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 핸디캡</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSetSpecial' && x.standard === v.games.handicap1stSetSpecial[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap1stSetSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap1stSetSpecial[0].homeRate,
                                                    standard: v.games.handicap1stSetSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap1stSetSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicap1stSetSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSetSpecial' && x.standard === v.games.handicap1stSetSpecial[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap1stSetSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap1stSetSpecial[0].awayRate,
                                                    standard: v.games.handicap1stSetSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap1stSetSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 핸디캡
                                            </div>
                                        </div>
                                        <!-- 1세트 오버언더 [배구]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOver1stSetSpecial && v.showConfig.underOver1stSetSpecial && v.games.underOver1stSetSpecial[0].status === 'ACTIVE' && v.games.underOver1stSetSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 오버언더</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSetSpecial' && x.standard === v.games.underOver1stSetSpecial[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver1stSetSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver1stSetSpecial[0].overRate,
                                                    standard: v.games.underOver1stSetSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver1stSetSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOver1stSetSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSetSpecial' && x.standard === v.games.underOver1stSetSpecial[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver1stSetSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver1stSetSpecial[0].underRate,
                                                    standard: v.games.underOver1stSetSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver1stSetSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 오버언더
                                            </div>
                                        </div>
                                        <!-- 1P 핸디캡 [아이스하키]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicap1stPeriodSpecial && v.showConfig.handicap1stPeriodSpecial && v.games.handicap1stPeriodSpecial[0].status === 'ACTIVE' && v.games.handicap1stPeriodSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1P 핸디캡</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriodSpecial' && x.standard === v.games.handicap1stPeriodSpecial[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap1stPeriodSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stPeriodSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap1stPeriodSpecial[0].homeRate,
                                                    standard: v.games.handicap1stPeriodSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap1stPeriodSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicap1stPeriodSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriodSpecial' && x.standard === v.games.handicap1stPeriodSpecial[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap1stPeriodSpecial[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stPeriodSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap1stPeriodSpecial[0].awayRate,
                                                    standard: v.games.handicap1stPeriodSpecial[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap1stPeriodSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1P 핸디캡
                                            </div>
                                        </div>
                                        <!-- 1P 오버언더 [아이스하키]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOver1stPeriodSpecial && v.showConfig.underOver1stPeriodSpecial && v.games.underOver1stPeriodSpecial[0].status === 'ACTIVE' && v.games.underOver1stPeriodSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1P 오버언더</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriodSpecial' && x.standard === v.games.underOver1stPeriodSpecial[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver1stPeriodSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stPeriodSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver1stPeriodSpecial[0].overRate,
                                                    standard: v.games.underOver1stPeriodSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver1stPeriodSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOver1stPeriodSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriodSpecial' && x.standard === v.games.underOver1stPeriodSpecial[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver1stPeriodSpecial[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stPeriodSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver1stPeriodSpecial[0].underRate,
                                                    standard: v.games.underOver1stPeriodSpecial[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver1stPeriodSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1P 오버언더
                                            </div>
                                        </div>
                                        <!-- 첫 득점 [아이스 하키] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstPoint && v.showConfig.firstPoint && v.games.firstPoint[0].status === 'ACTIVE' && v.games.firstPoint[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">첫 득점</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstPoint || v.games.firstPoint[0].status !== 'ACTIVE' || !v.games.firstPoint[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstPoint' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstPoint',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstPoint[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.firstPoint[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstPoint || v.games.firstPoint[0].status !== 'ACTIVE' || !v.games.firstPoint[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstPoint' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstPoint',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstPoint[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstPoint[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                첫 득점
                                            </div>
                                        </div>
                                        <!-- 1세트 승패 [LoL] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.x1stSetSpecial && v.showConfig.x1stSetSpecial && v.games.x1stSetSpecial[0].status === 'ACTIVE' && v.games.x1stSetSpecial[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 승패</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.x1stSetSpecial || v.games.x1stSetSpecial[0].status !== 'ACTIVE' || !v.games.x1stSetSpecial[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSetSpecial' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'x1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.x1stSetSpecial[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.x1stSetSpecial[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.x1stSetSpecial || v.games.x1stSetSpecial[0].status !== 'ACTIVE' || !v.games.x1stSetSpecial[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSetSpecial' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'x1stSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.x1stSetSpecial[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.x1stSetSpecial[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 승패
                                            </div>
                                        </div>
                                        <!-- 1세트 핸디캡 [LoL]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.handicap1stSetKill && v.showConfig.handicap1stSetKill && v.games.handicap1stSetKill[0].status === 'ACTIVE' && v.games.handicap1stSetKill[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 핸디캡</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSetKill' && x.standard === v.games.handicap1stSetKill[0].homeStandard && x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap1stSetKill[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stSetKill',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap1stSetKill[0].homeRate,
                                                    standard: v.games.handicap1stSetKill[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap1stSetKill[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.handicap1stSetKill[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSetKill' && x.standard === v.games.handicap1stSetKill[0].homeStandard && x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap1stSetKill[0].showStatus"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap1stSetKill',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap1stSetKill[0].awayRate,
                                                    standard: v.games.handicap1stSetKill[0].homeStandard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap1stSetKill[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 핸디캡
                                            </div>
                                        </div>
                                        <!-- 1세트 오버언더 [LoL]-->
                                        <div
                                            class="row g"
                                            v-if="v.games.underOver1stSetKill && v.showConfig.underOver1stSetKill && v.games.underOver1stSetKill[0].status === 'ACTIVE' && v.games.underOver1stSetKill[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 오버언더</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSetKill' && x.standard === v.games.underOver1stSetKill[0].standard && x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver1stSetKill[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stSetKill',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver1stSetKill[0].overRate,
                                                    standard: v.games.underOver1stSetKill[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver1stSetKill[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div class="col-2 g-x">
                                                {{ v.games.underOver1stSetKill[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away can-bet"
                                                :class="{
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSetKill' && x.standard === v.games.underOver1stSetKill[0].standard && x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver1stSetKill[0].status"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver1stSetKill',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver1stSetKill[0].underRate,
                                                    standard: v.games.underOver1stSetKill[0].standard
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver1stSetKill[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 오버언더
                                            </div>
                                        </div>
                                        <!-- 1세트 첫 타워 [LoL] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstTower1stSet && v.showConfig.firstTower1stSet && v.games.firstTower1stSet[0].status === 'ACTIVE' && v.games.firstTower1stSet[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 첫 타워</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstTower1stSet || v.games.firstTower1stSet[0].status !== 'ACTIVE' || !v.games.firstTower1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstTower1stSet' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstTower1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstTower1stSet[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.firstTower1stSet[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstTower1stSet || v.games.firstTower1stSet[0].status !== 'ACTIVE' || !v.games.firstTower1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstTower1stSet' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstTower1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstTower1stSet[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstTower1stSet[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 첫 타워
                                            </div>
                                        </div>
                                        <!-- 1세트 첫 용 [LoL] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstDragon1stSet && v.showConfig.firstDragon1stSet && v.games.firstDragon1stSet[0].status === 'ACTIVE' && v.games.firstDragon1stSet[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 첫 용</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstDragon1stSet || v.games.firstDragon1stSet[0].status !== 'ACTIVE' || !v.games.firstDragon1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstDragon1stSet' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstDragon1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstDragon1stSet[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.firstDragon1stSet[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstDragon1stSet || v.games.firstDragon1stSet[0].status !== 'ACTIVE' || !v.games.firstDragon1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstDragon1stSet' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstDragon1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstDragon1stSet[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstDragon1stSet[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 첫 용
                                            </div>
                                        </div>
                                        <!-- 1세트 첫 킬 [LoL] -->
                                        <div
                                            class="row g"
                                            v-if="v.games.firstBlood1stSet && v.showConfig.firstBlood1stSet && v.games.firstBlood1stSet[0].status === 'ACTIVE' && v.games.firstBlood1stSet[0].showStatus"
                                        >
                                            <div class="col-12 d-xl-none bg-black text-success">1세트 첫 킬</div>
                                            <div class="col-1 g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home can-bet"
                                                :class="{
                                                    'n': !v.showConfig.firstBlood1stSet || v.games.firstBlood1stSet[0].status !== 'ACTIVE' || !v.games.firstBlood1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstBlood1stSet' && x.standard === null && x.select === 'home') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstBlood1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.firstBlood1stSet[0].homeRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    {{ $numeral(v.games.firstBlood1stSet[0].homeRate).format('0.00') }}
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
                                                    'n': !v.showConfig.firstBlood1stSet || v.games.firstBlood1stSet[0].status !== 'ACTIVE' || !v.games.firstBlood1stSet[0].showStatus,
                                                    'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstBlood1stSet' && x.standard === null && x.select === 'away') > -1
                                                }"
                                                @click="setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'firstBlood1stSet',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.firstBlood1stSet[0].awayRate,
                                                    standard: null
                                                })"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.firstBlood1stSet[0].awayRate).format('0.00') }}
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                            <div class="col-1 g-count d-none d-xl-block o">
                                                1세트 첫 킬
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
        name: 'SportsSpecial',
        components: {
            InfiniteLoading
        },
        computed: {
            ...mapGetters(['loading', 'isLogin', 'user', 'betCart']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
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
                dataCount: 0
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
                let r = await this.$http.get('/api/get-prematch-special-list', this.search)
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
            async infiniteHandler($state) {
                try {
                    const r = await this.$http.get('/api/get-prematch-special-list', this.search)
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
            setBet(v) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                v.gameType = 'sportsSpecial'
                // 일치하는 배팅 삭제
                // _id, type, select 일치
                let existSameCartIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id && v.type === x.type && v.standard === x.standard && v.select === x.select
                })
                if(existSameCartIndex > -1) {
                    this.$store.commit('deleteBetCart', existSameCartIndex)
                    return
                }

                //  농구 1쿼터 핸디 + 첫2점, 첫3점, 첫자유투 조합배팅 안됨.
                if(v.sport === 'Basketball') {
                    if(v.type === 'handicap1stQuarterSpecial' || v.type === 'first2Points' || v.type === 'first3Points' || v.type === 'firstFreeThrow') {
                        let existSameGameIndex = -1

                        if(v.type === 'handicap1stQuarterSpecial') {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && (x.type === 'first2Points' || x.type === 'first3Points' || x.type === 'firstFreeThrow')
                            })
                        }
                        else {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && x.type === 'handicap1stQuarterSpecial'
                            })
                        }

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 핸디캡과 첫2점, 첫3점, 첫자 조합이 불가능 합니다.')
                            return
                        }
                    }
                }

                //  야구 5이닝 핸디 + 첫볼넷 조합배팅 안됨.
                if(v.sport === 'Baseball') {
                    if(v.type === 'handicapFirst5InningsSpecial' || v.type === 'firstWalk') {
                        let existSameGameIndex = this.betCart.findIndex((x) => {
                            return v._id === x._id && v.type !== x.type && (x.type === 'handicapFirst5InningsSpecial' || x.type === 'firstWalk')
                        })

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 핸디캡과 첫볼넷은 조합이 불가능 합니다.')
                            return
                        }
                    }
                }

                //  LoL 1세트 핸디 + 첫타워, 첫용, 첫킬 조합배팅 안됨.
                if(v.sport === 'LoL') {
                    if(v.type === 'x1stSetSpecial' || v.type === 'handicap1stSetKill') {
                        let existSameGameIndex = this.betCart.findIndex((x) => {
                            return v._id === x._id && v.type !== x.type && (x.type === 'x1stSetSpecial' || x.type === 'handicap1stSetKill')
                        })

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 승패와 핸디캡은 조합이 불가능 합니다.')
                            return
                        }
                    }

                    if(v.type === 'handicap1stSetKill' || v.type === 'firstTower1stSet' || v.type === 'firstDragon1stSet' || v.type === 'firstBlood1stSet') {
                        let existSameGameIndex = -1

                        if(v.type === 'handicap1stSetKill') {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && (x.type === 'firstTower1stSet' || x.type === 'firstDragon1stSet' || x.type === 'firstBlood1stSet')
                            })
                        }
                        else {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && x.type === 'handicap1stSetKill'
                            })
                        }

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 핸디캡과 첫타워, 첫용, 첫킬 조합이 불가능 합니다.')
                            return
                        }
                    }

                    if(v.type === 'x1stSetSpecial' || v.type === 'firstTower1stSet' || v.type === 'firstDragon1stSet' || v.type === 'firstBlood1stSet') {
                        let existSameGameIndex = -1

                        if(v.type === 'x1stSetSpecial') {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && (x.type === 'firstTower1stSet' || x.type === 'firstDragon1stSet' || x.type === 'firstBlood1stSet')
                            })
                        }
                        else {
                            //  일치하는 _id 건에 대한 조합 검사
                            existSameGameIndex = this.betCart.findIndex((x) => {
                                return v._id === x._id && v.type !== x.type && x.type === 'x1stSetSpecial'
                            })
                        }

                        if(existSameGameIndex > -1) {
                            this.$tools.sw('warning', '조합불가', '동일경기 승패와 첫타워, 첫용, 첫킬 조합이 불가능 합니다.')
                            return
                        }
                    }
                }

                if(v.sport !== 'Basketball' && v.sport !== 'Baseball' && v.sport !== 'LoL') {
                    //  일치하는 _id 건에 대한 조합 검사
                    let existSameGameIndex = this.betCart.findIndex((x) => {
                        return v._id === x._id && v.type !== x.type
                    })

                    if(existSameGameIndex > -1) {
                        this.$tools.sw('warning', '조합불가', '동일경기 조합은 불가능 합니다.')
                        return
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

