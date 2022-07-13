<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col sports-page">
            <div class="row">
                <div class="col-12">
                    <NavSports/>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="sports-page-header">
                        <font-awesome-icon :icon="['fa', 'futbol']"/>
                        국내형 크로스 <span>SPORTS CROSS</span>
                    </div>
                    <div class="sports-header-list">
                        <div class="search">
                            <form @submit.prevent="submit()">
                                <input type="text" name="skeyword" id="search-sports" placeholder="리그, 팀명을 입력해주세요" v-model="search.query">
                                <button type="submit" class="search-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    <!-- <div class="sports-event-header">
                        <span class="event-title">Prematch <b>Event</b></span>
                        <span class="sorting-method">
                            <span class="type-time active">
                                <font-awesome-icon :icon="['fa', 'clock']"/> 시간순정렬
                            </span>
                            <span class="type-league">
                                <font-awesome-icon :icon="['fa', 'flag']"/> 리그순정렬
                            </span>
                        </span>
                    </div> -->
                    <div class="sports-icon mt-2">
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
                                <li @click="selectCategory('Volleyball')">
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구">
                                    <div class="mt-1">배구</div>
                                </li>
                                <li  @click="selectCategory('Ice Hockey')">
                                    <img src="/images/icon-icehockey-gray.png" class="sports-category-icon" id="Ice Hockey" alt="아이스하키" title="아이스하키">
                                    <div class="mt-1">아이스하키</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1 px-1">
                <div class="col-12 game-info-box d-none d-xl-block">
                    <div class="row">
                        <div class="col">
                            리그/경기일시
                        </div>
                        <div class="col">
                            구분
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
                    </div>
                </div>
            </div>
            <b-overlay :show="overlay" variant="white" opacity="0.2" rounded="sm">
                <div class="row mt-1">
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
                                <div class="col-12" :class="{'': index + 1 === data.length}">
                                    <!-- 승무패 -->
                                    <div
                                        class="row g"
                                        v-if="v.games.xKor && v.showConfig.xKor && v.games.xKor[0].status === 'ACTIVE' && v.games.xKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            승무패
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
                                            class="col g-x"
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
                                    </div>
                                    <!-- 핸디캡 -->
                                    <div
                                        class="row g"
                                        v-if="v.games.handicapKor && v.showConfig.handicapKor && v.games.handicapKor[0].status === 'ACTIVE' && v.games.handicapKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            핸디캡
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
                                        <div class="col g-x">
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
                                    </div>
                                    <!-- 탁구 핸디캡 -->
                                    <div
                                        class="row g"
                                        v-if="v.games.handicapTotalSetKor && v.showConfig.handicapTotalSetKor && v.games.handicapTotalSetKor[0].status === 'ACTIVE' && v.games.handicapTotalSetKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            핸디캡
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
                                        <div class="col g-x">
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
                                    </div>
                                    <!-- 오버언더 -->
                                    <div
                                        class="row g"
                                        v-if="v.games.underOverKor && v.showConfig.underOverKor && v.games.underOverKor[0].status === 'ACTIVE' && v.games.underOverKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            오버언더
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
                                        <div class="col g-x">
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
                                    </div>
                                    <!-- 탁구 오버언더 -->
                                    <div
                                        class="row g"
                                        v-if="v.games.underOverTotalSetKor && v.showConfig.underOverTotalSetKor && v.games.underOverTotalSetKor[0].status === 'ACTIVE' && v.games.underOverTotalSetKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            오버언더
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
                                        <div class="col g-x">
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
                                    </div>
                                    <!-- 선 7득점 [농구] -->
                                    <!-- <div
                                        class="row g"
                                        v-if="v.games.first7PointsKor && v.showConfig.first7PointsKor && v.games.first7PointsKor[0].status === 'ACTIVE' && v.games.first7PointsKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            선 7득점
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
                                            class="col g-x"
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
                                    </div> -->
                                    <!-- 선 5득점 [배구] -->
                                    <!-- <div
                                        class="row g"
                                        v-if="v.games.first5PointsKor && v.showConfig.first5PointsKor && v.games.first5PointsKor[0].status === 'ACTIVE' && v.games.first5PointsKor[0].showStatus"
                                    >
                                        <div class="col g-date d-none d-xl-block">
                                            {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                        </div>
                                        <div class="col g-count d-none d-xl-block">
                                            선 5득점
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
                                            class="col g-x"
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
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-overlay>
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
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import NavSports from '../components/NavSports'

    export default {
        name: 'SportsCross',
        components: {
            NavSports
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
                    league: '',
                    query: ''
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
                this.search.query = this.$route.query.query ? this.$route.query.query : ''

                this.getList()
                // this.infiniteHandler()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}&league=${this.search.league}&query=${this.search.query}`
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-prematch-cross-list', this.search)
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

                if(v.sport === 'Football' || v.sport === 'Ice Hockey' || v.sport === 'FIFA' || v.sport === 'Volleyball') {
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

                if(this.betCart.length === this.$config.sportsMaxFolder) {
                    this.$tools.sw('info', '최대 폴더', `최대 ${this.$config.sportsMaxFolder}폴더 까지 배팅 가능 합니다.`)
                    return
                }

                this.setBetCart(v)
            },
            submit() {
                const path = encodeURI(`${this.$route.path}${this.linkGen(1)}`)

                if(path !== this.$route.fullPath) this.$tools.pushRouter(path)
                else this.getList()
            }
        },
        beforeRouteLeave (to, from, next) {
            this.deleteBetCartAll()
            next()
        }
    }
</script>

