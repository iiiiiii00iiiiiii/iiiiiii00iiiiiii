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
                        실시간 <span>LIVE</span>
                    </div>
                    <div class="sports-header-list">
                        <div class="search">
                            <input type="text" name="skeyword" id="search-sports" placeholder="리그, 팀명을 입력해주세요" value="">
                            <button type="submit" class="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="sports-event-header">
                        <span class="event-title">Prematch <b>Event</b></span>
                        <span class="sorting-method">
                            <span class="type-time active">
                                <font-awesome-icon :icon="['fa', 'clock']"/> 시간순정렬
                            </span>
                            <span class="type-league">
                                <font-awesome-icon :icon="['fa', 'flag']"/> 리그순정렬
                            </span>
                        </span>
                    </div>
                    <div class="sports-icon">
                        <div class="sports-icon-wrap">
                            <ul>
                                <li @click="selectCategory('')">
                                    <img src="/images/icon-all-gray.png" class="sports-category-icon" alt="전체" title="전체">
                                    <div class="mt-1">전체</div>
                                </li>
                                <li @click="selectCategory('Basketball')">
                                    <img src="/images/icon-basketball-gray.png" class="sports-category-icon" id="Basketball" alt="농구" title="농구">
                                    <div class="mt-1">농구</div>
                                </li>
                                <li @click="selectCategory('Volleyball')">
                                    <img src="/images/icon-volleyball-gray.png" class="sports-category-icon" id="Volleyball" alt="배구" title="배구">
                                    <div class="mt-1">배구</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1 px-1">
                <div class="col-12 game-info-box d-none d-xl-block">
                    <div class="row">
                        <div class="col ">
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
                                    <div class="sports-px">
                                        <!-- 2쿼터 국내형 실시간 핸디캡 -->
                                        <div class="row g"
                                            v-if="
                                                v.games.handicap2ndQuarterSpecial &&
                                                v.showConfig.handicap2ndQuarterSpecial &&
                                                v.games.handicap2ndQuarterSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'handicap3rdQuarterSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">2쿼터 핸디캡</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                2쿼터 핸디캡
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.handicap2ndQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap2ndQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap2ndQuarterSpecial' &&
                                                        x.standard === v.games.handicap2ndQuarterSpecial[0].homeStandard &&
                                                        x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap2ndQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap2ndQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap2ndQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap2ndQuarterSpecial[0].homeRate,
                                                    standard: v.games.handicap2ndQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap2ndQuarterSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.handicap2ndQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.handicap2ndQuarterSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.handicap2ndQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap2ndQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap2ndQuarterSpecial' &&
                                                        x.standard === v.games.handicap2ndQuarterSpecial[0].homeStandard &&
                                                        x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap2ndQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap2ndQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap2ndQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap2ndQuarterSpecial[0].awayRate,
                                                    standard: v.games.handicap2ndQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap2ndQuarterSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 2쿼터 국내형 실시간 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="
                                                v.games.underOver2ndQuarterSpecial &&
                                                v.showConfig.underOver2ndQuarterSpecial &&
                                                v.games.underOver2ndQuarterSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'underOver3rdQuarterSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">2쿼터 오버언더</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                2쿼터 오버언더
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.underOver2ndQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver2ndQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver2ndQuarterSpecial' &&
                                                        x.standard === v.games.underOver2ndQuarterSpecial[0].standard &&
                                                        x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver2ndQuarterSpecial[0].status"
                                                @click="v.games.underOver2ndQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver2ndQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver2ndQuarterSpecial[0].overRate,
                                                    standard: v.games.underOver2ndQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver2ndQuarterSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.underOver2ndQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.underOver2ndQuarterSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.underOver2ndQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver2ndQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver2ndQuarterSpecial' &&
                                                        x.standard === v.games.underOver2ndQuarterSpecial[0].standard &&
                                                        x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver2ndQuarterSpecial[0].status"
                                                @click="v.games.underOver2ndQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver2ndQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver2ndQuarterSpecial[0].underRate,
                                                    standard: v.games.underOver2ndQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver2ndQuarterSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 3쿼터 국내형 실시간 핸디캡 -->
                                        <div class="row g"
                                            v-if="
                                                v.games.handicap3rdQuarterSpecial &&
                                                v.showConfig.handicap3rdQuarterSpecial &&
                                                v.games.handicap3rdQuarterSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'handicap4thQuarterSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">3쿼터 핸디캡</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                3쿼터 핸디캡
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.handicap3rdQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap3rdQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap3rdQuarterSpecial' &&
                                                        x.standard === v.games.handicap3rdQuarterSpecial[0].homeStandard &&
                                                        x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap3rdQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap3rdQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap3rdQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap3rdQuarterSpecial[0].homeRate,
                                                    standard: v.games.handicap3rdQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap3rdQuarterSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.handicap3rdQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.handicap3rdQuarterSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.handicap3rdQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap3rdQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap3rdQuarterSpecial' &&
                                                        x.standard === v.games.handicap3rdQuarterSpecial[0].homeStandard &&
                                                        x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap3rdQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap3rdQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap3rdQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap3rdQuarterSpecial[0].awayRate,
                                                    standard: v.games.handicap3rdQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap3rdQuarterSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 3쿼터 국내형 실시간 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="
                                                v.games.underOver3rdQuarterSpecial &&
                                                v.showConfig.underOver3rdQuarterSpecial &&
                                                v.games.underOver3rdQuarterSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'underOver4thQuarterSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">3쿼터 오버언더</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                3쿼터 오버언더
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.underOver3rdQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver3rdQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver3rdQuarterSpecial' &&
                                                        x.standard === v.games.underOver3rdQuarterSpecial[0].standard &&
                                                        x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver3rdQuarterSpecial[0].status"
                                                @click="v.games.underOver3rdQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver3rdQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver3rdQuarterSpecial[0].overRate,
                                                    standard: v.games.underOver3rdQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver3rdQuarterSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.underOver3rdQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.underOver3rdQuarterSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.underOver3rdQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver3rdQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver3rdQuarterSpecial' &&
                                                        x.standard === v.games.underOver3rdQuarterSpecial[0].standard &&
                                                        x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver3rdQuarterSpecial[0].status"
                                                @click="v.games.underOver3rdQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver3rdQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver3rdQuarterSpecial[0].underRate,
                                                    standard: v.games.underOver3rdQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver3rdQuarterSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 4쿼터 국내형 실시간 핸디캡 -->
                                        <div class="row g"
                                            v-if="
                                                v.games.handicap4thQuarterSpecial &&
                                                v.showConfig.handicap4thQuarterSpecial &&
                                                v.games.handicap4thQuarterSpecial.findIndex(x => x.showStatus) > -1
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">4쿼터 핸디캡</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                4쿼터 핸디캡
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.handicap4thQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap4thQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap4thQuarterSpecial' &&
                                                        x.standard === v.games.handicap4thQuarterSpecial[0].homeStandard &&
                                                        x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap4thQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap4thQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap4thQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap4thQuarterSpecial[0].homeRate,
                                                    standard: v.games.handicap4thQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap4thQuarterSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.handicap4thQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.handicap4thQuarterSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.handicap4thQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap4thQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap4thQuarterSpecial' &&
                                                        x.standard === v.games.handicap4thQuarterSpecial[0].homeStandard &&
                                                        x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap4thQuarterSpecial[0].showStatus"
                                                @click="v.games.handicap4thQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap4thQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap4thQuarterSpecial[0].awayRate,
                                                    standard: v.games.handicap4thQuarterSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap4thQuarterSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 4쿼터 국내형 실시간 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="
                                                v.games.underOver4thQuarterSpecial &&
                                                v.showConfig.underOver4thQuarterSpecial &&
                                                v.games.underOver4thQuarterSpecial.findIndex(x => x.showStatus) > -1
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">4쿼터 오버언더</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                4쿼터 오버언더
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.underOver4thQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver4thQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver4thQuarterSpecial' &&
                                                        x.standard === v.games.underOver4thQuarterSpecial[0].standard &&
                                                        x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver4thQuarterSpecial[0].status"
                                                @click="v.games.underOver4thQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver4thQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver4thQuarterSpecial[0].overRate,
                                                    standard: v.games.underOver4thQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver4thQuarterSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.underOver4thQuarterSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.underOver4thQuarterSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.underOver4thQuarterSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver4thQuarterSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver4thQuarterSpecial' &&
                                                        x.standard === v.games.underOver4thQuarterSpecial[0].standard &&
                                                        x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver4thQuarterSpecial[0].status"
                                                @click="v.games.underOver4thQuarterSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver4thQuarterSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver4thQuarterSpecial[0].underRate,
                                                    standard: v.games.underOver4thQuarterSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver4thQuarterSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 2세트 국내형 실시간 핸디캡 -->
                                        <div class="row g"
                                            v-if="
                                                v.games.handicap2ndSetSpecial &&
                                                v.showConfig.handicap2ndSetSpecial &&
                                                v.games.handicap2ndSetSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'handicap3rdSetSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">2세트 핸디캡</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                2세트 핸디캡
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.handicap2ndSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap2ndSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap2ndSetSpecial' &&
                                                        x.standard === v.games.handicap2ndSetSpecial[0].homeStandard &&
                                                        x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap2ndSetSpecial[0].showStatus"
                                                @click="v.games.handicap2ndSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap2ndSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap2ndSetSpecial[0].homeRate,
                                                    standard: v.games.handicap2ndSetSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap2ndSetSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.handicap2ndSetSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.handicap2ndSetSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.handicap2ndSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap2ndSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap2ndSetSpecial' &&
                                                        x.standard === v.games.handicap2ndSetSpecial[0].homeStandard &&
                                                        x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap2ndSetSpecial[0].showStatus"
                                                @click="v.games.handicap2ndSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap2ndSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap2ndSetSpecial[0].awayRate,
                                                    standard: v.games.handicap2ndSetSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap2ndSetSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 2세트 국내형 실시간 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="
                                                v.games.underOver2ndSetSpecial &&
                                                v.showConfig.underOver2ndSetSpecial &&
                                                v.games.underOver2ndSetSpecial.findIndex(x => x.showStatus) > -1 &&
                                                !checkNext(v._id, 'underOver3rdSetSpecial')
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">2세트 오버언더</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                2세트 오버언더
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.underOver2ndSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver2ndSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver2ndSetSpecial' &&
                                                        x.standard === v.games.underOver2ndSetSpecial[0].standard &&
                                                        x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver2ndSetSpecial[0].status"
                                                @click="v.games.underOver2ndSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver2ndSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver2ndSetSpecial[0].overRate,
                                                    standard: v.games.underOver2ndSetSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver2ndSetSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.underOver2ndSetSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.underOver2ndSetSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.underOver2ndSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver2ndSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver2ndSetSpecial' &&
                                                        x.standard === v.games.underOver2ndSetSpecial[0].standard &&
                                                        x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver2ndSetSpecial[0].status"
                                                @click="v.games.underOver2ndSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver2ndSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver2ndSetSpecial[0].underRate,
                                                    standard: v.games.underOver2ndSetSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver2ndSetSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 3세트 국내형 실시간 핸디캡 -->
                                        <div class="row g"
                                            v-if="
                                                v.games.handicap3rdSetSpecial &&
                                                v.showConfig.handicap3rdSetSpecial &&
                                                v.games.handicap3rdSetSpecial.findIndex(x => x.showStatus) > -1
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">3세트 핸디캡</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                3세트 핸디캡
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.handicap3rdSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap3rdSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap3rdSetSpecial' &&
                                                        x.standard === v.games.handicap3rdSetSpecial[0].homeStandard &&
                                                        x.select === 'home') > -1
                                                }"
                                                v-if="v.games.handicap3rdSetSpecial[0].showStatus"
                                                @click="v.games.handicap3rdSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap3rdSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'home',
                                                    selectRate: v.games.handicap3rdSetSpecial[0].homeRate,
                                                    standard: v.games.handicap3rdSetSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross ">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="h">H</small>
                                                    {{ $numeral(v.games.handicap3rdSetSpecial[0].homeRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.handicap3rdSetSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.handicap3rdSetSpecial[0].homeStandard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.handicap3rdSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.handicap3rdSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'handicap3rdSetSpecial' &&
                                                        x.standard === v.games.handicap3rdSetSpecial[0].homeStandard &&
                                                        x.select === 'away') > -1
                                                }"
                                                v-if="v.games.handicap3rdSetSpecial[0].showStatus"
                                                @click="v.games.handicap3rdSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'handicap3rdSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'away',
                                                    selectRate: v.games.handicap3rdSetSpecial[0].awayRate,
                                                    standard: v.games.handicap3rdSetSpecial[0].homeStandard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.handicap3rdSetSpecial[0].awayRate).format('0.00') }}
                                                    <small class="h">H</small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 3세트 국내형 실시간 오버언더 -->
                                        <div
                                            class="row g"
                                            v-if="
                                                v.games.underOver3rdSetSpecial &&
                                                v.showConfig.underOver3rdSetSpecial &&
                                                v.games.underOver3rdSetSpecial.findIndex(x => x.showStatus) > -1
                                            "
                                        >
                                            <div class="col-12 d-xl-none bg-sky-blue py-2">3세트 오버언더</div>
                                            <div class="col g-date d-none d-xl-block">
                                                {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                            </div>
                                            <div class="col g-count d-none d-xl-block o">
                                                3세트 오버언더
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-home"
                                                :class="{
                                                    'n': v.games.underOver3rdSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver3rdSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver3rdSetSpecial' &&
                                                        x.standard === v.games.underOver3rdSetSpecial[0].standard &&
                                                        x.select === 'over') > -1
                                                }"
                                                v-if="v.games.underOver3rdSetSpecial[0].status"
                                                @click="v.games.underOver3rdSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver3rdSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'over',
                                                    selectRate: v.games.underOver3rdSetSpecial[0].overRate,
                                                    standard: v.games.underOver3rdSetSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2 g-home-team-mobile-cross">
                                                    {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                </div>
                                                <div class="float-right pr-2">
                                                    <small class="o">
                                                        <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                    </small>
                                                    {{ $numeral(v.games.underOver3rdSetSpecial[0].overRate).format('0.00') }}
                                                </div>
                                            </div>
                                            <div
                                                class="col g-x"
                                                :class="{
                                                    'n': v.games.underOver3rdSetSpecial[0].status !== 'ACTIVE'
                                                }"
                                            >
                                                {{ v.games.underOver3rdSetSpecial[0].standard }}
                                            </div>
                                            <div
                                                class="col-5 col-xl-4 g-away"
                                                :class="{
                                                    'n': v.games.underOver3rdSetSpecial[0].status !== 'ACTIVE',
                                                    'can-bet': v.games.underOver3rdSetSpecial[0].status === 'ACTIVE',
                                                    'selectBet':
                                                        betCart.findIndex((x) => x._id === v._id &&
                                                        x.type === 'underOver3rdSetSpecial' &&
                                                        x.standard === v.games.underOver3rdSetSpecial[0].standard &&
                                                        x.select === 'under') > -1
                                                }"
                                                v-if="v.games.underOver3rdSetSpecial[0].status"
                                                @click="v.games.underOver3rdSetSpecial[0].status === 'ACTIVE' ? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'underOver3rdSetSpecial',
                                                    homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                    awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                    select: 'under',
                                                    selectRate: v.games.underOver3rdSetSpecial[0].underRate,
                                                    standard: v.games.underOver3rdSetSpecial[0].standard
                                                }) : null"
                                            >
                                                <div class="float-left pl-2">
                                                    {{ $numeral(v.games.underOver3rdSetSpecial[0].underRate).format('0.00') }}
                                                    <small class="u">
                                                        <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                    </small>
                                                </div>
                                                <div class="float-right pr-2 g-away-team-mobile-cross">
                                                    {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        name: 'SportsLiveKor',
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
                    sport: ''
                },
                expand: {},
                data: [],
                dataCount: 0
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
                this.socket = this.$io.connect('https://live-up.thvmxm.com')
                this.socket.on('connect', () => {
                //console.log('연결됨.')
                this.setFromRouter()
            })
            this.socket.on('broadcast', (v) => {
                this.ioBroadcast(v)
            })
            this.socket.on('delete', () => {
                this.socket.disconnect()
                //console.log('종료경기 있어서 연결 끊김.')
                this.socketInit()
            })
            },
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                this.getList()
                // this.infiniteHandler()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}`
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-live-kor-list', this.search)
                this.overlay = false
                if(r.error) return

                this.data = r.data.recordSet
                this.dataCount = r.data.recordCount
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
            selectCategory(sport) {
                this.search.sport = sport
                let path = encodeURI(`${this.$route.path}${this.linkGen(1)}`)
                if(path === this.$route.fullPath) {
                    this.getList()
                    return
                }
                this.$router.push(path)
            },
            checkNext(_id, next) {
                let v = this.data.find(x => x._id === _id && x.games[next]).games[next][0]

                let key = 'standard'
                // 핸디캡
                if(next === 'handicap3rdQuarterSpecial' || next === 'handicap4thQuarterSpecial' || next === 'handicap3rdSetSpecial') key = 'homeStandard'

                if(v[key] !== null) return true

                return false
            },
            setBet(v) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                v.gameType = 'sportsLiveKor'
                // 일치하는 배팅 삭제
                // _id, type, select 일치
                let existSameCartIndex = this.betCart.findIndex((x) => {
                    return v._id === x._id && v.type === x.type && v.standard === x.standard && v.select === x.select
                })
                if(existSameCartIndex > -1) {
                    this.$store.commit('deleteBetCart', existSameCartIndex)
                    return
                }

                if(v.sport === 'Volleyball') {
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

