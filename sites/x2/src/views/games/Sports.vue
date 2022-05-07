<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mb-4 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            <font-awesome-icon :icon="['fa', 'futbol']"/>
                            유럽형 스포츠 <span>UR SPORTS</span>
                        </div>
                    </div>
                    <div class="col text-right d-none d-xl-block">
                        <div class="sports-menu">
                            <ul>
                                <li>
                                    <div @click="$tools.pushRouter('/sportslivekor', false)">실시간</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/sportsspecial', false)">스페셜</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/sportslive', false)">라이브</div>
                                </li>
                                <li>
                                    <div  @click="$tools.pushRouter('/sportscross', false)">국내형</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/sports', false)">유럽형</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="mt-xl-4">
                <div class="row mt-1">
                    <div class="col-12">
                        <div class="sports-icon">
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
                </div>
                <hr>
                <div class="row px-xl-3">
                    <div class="col-12 game-info-box d-none d-xl-block">
                        <div class="row px-3">
                            <div class="col ">
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
                                기준점
                            </div>
                        </div>
                    </div>
                </div>
                <b-overlay :show="overlay" variant="white" opacity="0.2" rounded="sm">
                    <div class="row mt-1 px-xl-3">
                        <div class="col-12">
                            <div class="sports">
                                <div class="row" v-for="(v, index) in data" :key="index">
                                    <div class="col-8 col-xl-12 mt-2 mt-xl-3 g-league-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                        <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img">
                                        <span class="g-league">
                                            <font-awesome-icon :icon="['fa', 'angle-double-right']" class="ml-1 icon-league"/>
                                            {{ v.leagueKor }}
                                        </span>
                                    </div>
                                    <div class="col-4 d-xl-none mt-2 pt-2 mt-xl-3 text-right g-date-mobile" v-if="data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                        {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                    </div>
                                    <div class="col-12 mt-2" :class="{'mb-3': index + 1 === data.length}">
                                        <div class="sports-px">
                                            <div class="row g">
                                                <div class="col px-1 d-none d-xl-block">
                                                    <div class="g-date clearfix">
                                                        {{ $moment(v.gameDateTime).format('MM/DD HH:mm') }}
                                                    </div>
                                                </div>
                                                <div class="col-4-5 px-1">
                                                    <div
                                                        class="g-home clearfix"
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
                                                        <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                            {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                        </div>
                                                        <div class="float-right pr-2 pr-xl-3">
                                                            <!-- <small class="x d-none d-xl-inline">1x2</small> -->
                                                            {{ $numeral(v.games.x[0].homeRate).format('0.00') }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col px-1 g-x"
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
                                                <div class="col-4-5 px-1">
                                                    <div
                                                        class="g-away clearfix"
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
                                                        <div class="float-left pl-2 pl-xl-3">
                                                            {{ $numeral(v.games.x[0].awayRate).format('0.00') }}
                                                            <!-- <small class="x d-none d-xl-inline">1x2</small> -->
                                                        </div>
                                                        <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                            {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col g-count cursor-pointer"
                                                    :class="[{ 'o': Object.keys(v.games).length === 1 }, { 'n': Object.keys(v.games).length > 1 }]"
                                                    @click="v._id === expand._id ? expand = {} : expandGame(v)"
                                                >
                                                    +{{ calcCount(v.showConfig, v.games) }}
                                                </div>
                                            </div>
                                            <div class="row" :id="`section-${v._id}`" v-if="expand._id === v._id">
                                                <div class="col-12 my-2 p-3 game-detail">
                                                    <div class="row bg-team text-center py-3">
                                                        <div class="col-5 title-team">
                                                            {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                        </div>
                                                        <div class="col-2">
                                                            <img src="/images/vs.png" class="img-vs">
                                                        </div>
                                                        <div class="col-5 title-team">
                                                            {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2 p-3 expand-game">
                                                        <!-- ##승무패 x -->
                                                        <div
                                                            class="col-12"
                                                            v-if="v.games.x && v.showConfig.x && v.games.x[0].status === 'ACTIVE' && v.games.x[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- 더블찬스 xDouble -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.xDouble && v.showConfig.xDouble && v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 더블찬스
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-4 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeDraw') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xDouble',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'homeDraw',
                                                                        selectRate: v.games.xDouble[0].homeDrawRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        <span class="d-sm-none">
                                                                            홈 / 무
                                                                        </span>
                                                                        <span class="d-none d-sm-inline">
                                                                            홈승 또는 무승부
                                                                        </span>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.xDouble[0].homeDrawRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-4 g-center can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeAway') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xDouble',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'homeAway',
                                                                        selectRate: v.games.xDouble[0].homeAwayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        <span class="d-sm-none">
                                                                            홈 / 원
                                                                        </span>
                                                                        <span class="d-none d-sm-inline">
                                                                            홈승 또는 원정승
                                                                        </span>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.xDouble[0].homeAwayRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-4 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'awayDraw') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xDouble',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'awayDraw',
                                                                        selectRate: v.games.xDouble[0].awayDrawRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        <span class="d-sm-none">
                                                                            원 / 무
                                                                        </span>
                                                                        <span class="d-none d-sm-inline">
                                                                            원정승 또는 무승부
                                                                        </span>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.xDouble[0].awayDrawRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##승무패 핸디캡 threeWayHandicap -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.threeWayHandicap && v.showConfig.threeWayHandicap"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.threeWayHandicap" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'threeWayHandicap',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'draw') > -1
                                                                    }"
                                                                    v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'threeWayHandicap',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'draw',
                                                                        selectRate: vv.drawRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    {{ $numeral(vv.drawRate).format('0.00') }}
                                                                    <span class="circle-down ml-sm-1 d-block d-sm-inline">
                                                                        ({{ vv.homeStandard }})
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'threeWayHandicap' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.threeWayHandicap[index].showStatus && v.games.threeWayHandicap[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'threeWayHandicap',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##핸디캡 handicap -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap && v.showConfig.handicap"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap[index].showStatus && v.games.handicap[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##탁구 핸디캡 handicapTotalSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicapTotalSet && v.showConfig.handicapTotalSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicapTotalSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicapTotalSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicapTotalSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##오버언더 underOver -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver && v.showConfig.underOver"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver[index].showStatus && v.games.underOver[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##탁구 오버언더 underOverTotalSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOverTotalSet && v.showConfig.underOverTotalSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOverTotalSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOverTotalSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverTotalSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOverTotalSet[index].showStatus && v.games.underOverTotalSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOverTotalSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##풀타임 홀짝 oddEvenFullTime -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEvenFullTime && v.showConfig.oddEvenFullTime && v.games.oddEvenFullTime[0].status === 'ACTIVE' && v.games.oddEvenFullTime[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 풀타임 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEvenFullTime' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEvenFullTime',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEvenFullTime[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEvenFullTime[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEvenFullTime' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEvenFullTime',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEvenFullTime[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEvenFullTime[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1이닝 승무패 x1stInning -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x1stInning && v.showConfig.x1stInning && v.games.x1stInning[0].status === 'ACTIVE' && v.games.x1stInning[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x1stInning[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x1stInning[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x1stInning[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x1stInning[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stInning' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x1stInning[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x1stInning[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1이닝 핸디캡 handicap1stInning -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap1stInning && v.showConfig.handicap1stInning"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap1stInning" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stInning[index].showStatus && v.games.handicap1stInning[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1이닝 오버언더 underOver1stInning -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver1stInning && v.showConfig.underOver1stInning"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1이닝 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver1stInning" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stInning',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1세트 승패 x1stSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x1stSet && v.showConfig.x1stSet && v.games.x1stSet[0].status === 'ACTIVE' && v.games.x1stSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 승패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSet' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x1stSet[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x1stSet[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stSet' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x1stSet[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x1stSet[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1세트 핸디캡 handicap1stSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap1stSet && v.showConfig.handicap1stSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap1stSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stSet[index].showStatus && v.games.handicap1stSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1세트 오버언더 underOver1stSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver1stSet && v.showConfig.underOver1stSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver1stSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stSet[index].showStatus && v.games.underOver1stSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"

                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1세트 홀짝 oddEven1stSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven1stSet && v.showConfig.oddEven1stSet && v.games.oddEven1stSet[0].status === 'ACTIVE' && v.games.oddEven1stSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1세트 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stSet' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven1stSet[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stSet[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stSet' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven1stSet[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stSet[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2세트 승패 x2ndSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x2ndSet && v.showConfig.x2ndSet && v.games.x2ndSet[0].status === 'ACTIVE' && v.games.x2ndSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 승패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndSet' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x2ndSet[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x2ndSet[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndSet' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x2ndSet[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x2ndSet[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2세트 핸디캡 handicap2ndSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap2ndSet && v.showConfig.handicap2ndSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap2ndSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2세트 오버언더 underOver2ndSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver2ndSet && v.showConfig.underOver2ndSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver2ndSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndSet[index].showStatus && v.games.underOver2ndSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2세트 홀짝 oddEven2ndSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven2ndSet && v.showConfig.oddEven2ndSet && v.games.oddEven2ndSet[0].status === 'ACTIVE' && v.games.oddEven2ndSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2세트 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven2ndSet[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndSet[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven2ndSet[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndSet[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3세트 승패 x3rdSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x3rdSet && v.showConfig.x3rdSet && v.games.x3rdSet[0].status === 'ACTIVE' && v.games.x3rdSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 승패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdSet' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x3rdSet[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x3rdSet[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdSet' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x3rdSet[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x3rdSet[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3세트 핸디캡 handicap3rdSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap3rdSet && v.showConfig.handicap3rdSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap3rdSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdSet[index].showStatus && v.games.handicap3rdSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3세트 오버언더 underOver3rdSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver3rdSet && v.showConfig.underOver3rdSet"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver3rdSet" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdSet' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdSet' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdSet[index].showStatus && v.games.underOver3rdSet[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-rightpr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3세트 홀짝 oddEven3rdSet -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven3rdSet && v.showConfig.oddEven3rdSet && v.games.oddEven3rdSet[0].status === 'ACTIVE' && v.games.oddEven3rdSet[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3세트 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdSet' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven3rdSet[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven3rdSet[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdSet' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven3rdSet',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven3rdSet[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven3rdSet[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1피리어드 승무패 x1stPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x1stPeriod && v.showConfig.x1stPeriod && v.games.x1stPeriod[0].status === 'ACTIVE' && v.games.x1stPeriod[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x1stPeriod[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x1stPeriod[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x1stPeriod[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x1stPeriod[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stPeriod' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x1stPeriod[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x1stPeriod[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1피리어드 핸디캡 handicap1stPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap1stPeriod && v.showConfig.handicap1stPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap1stPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stPeriod[index].showStatus && v.games.handicap1stPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1피리어드 오버언더 underOver1stPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver1stPeriod && v.showConfig.underOver1stPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1피리어드 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver1stPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stPeriod[index].showStatus && v.games.underOver1stPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2피리어드 승무패 x2ndPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x2ndPeriod && v.showConfig.x2ndPeriod && v.games.x2ndPeriod[0].status === 'ACTIVE' && v.games.x2ndPeriod[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x2ndPeriod[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x2ndPeriod[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x2ndPeriod[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x2ndPeriod[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndPeriod' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x2ndPeriod[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x2ndPeriod[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2피리어드 핸디캡 handicap2ndPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap2ndPeriod && v.showConfig.handicap2ndPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap2ndPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndPeriod[index].showStatus && v.games.handicap2ndPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2피리어드 오버언더 underOver2ndPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver2ndPeriod && v.showConfig.underOver2ndPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2피리어드 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver2ndPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndPeriod[index].showStatus && v.games.underOver2ndPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3피리어드 승무패 x3rdPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x3rdPeriod && v.showConfig.x3rdPeriod && v.games.x3rdPeriod[0].status === 'ACTIVE' && v.games.x3rdPeriod[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x3rdPeriod[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x3rdPeriod[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x3rdPeriod[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x3rdPeriod[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdPeriod' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x3rdPeriod[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x3rdPeriod[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3피리어드 핸디캡 handicap3rdPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap3rdPeriod && v.showConfig.handicap3rdPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap3rdPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdPeriod' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdPeriod' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdPeriod[index].showStatus && v.games.handicap3rdPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3피리어드 오버언더 underOver3rdPeriod -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver3rdPeriod && v.showConfig.underOver3rdPeriod"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3피리어드 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver3rdPeriod" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdPeriod',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1쿼터 승무패 x1stQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x1stQuarter && v.showConfig.x1stQuarter && v.games.x1stQuarter[0].status === 'ACTIVE' && v.games.x1stQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x1stQuarter[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x1stQuarter[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x1stQuarter[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x1stQuarter[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x1stQuarter[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x1stQuarter[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1쿼터 핸디캡 handicap1stQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap1stQuarter && v.showConfig.handicap1stQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap1stQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stQuarter[index].showStatus && v.games.handicap1stQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1쿼터 오버언더 underOver1stQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver1stQuarter && v.showConfig.underOver1stQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver1stQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stQuarter[index].showStatus && v.games.underOver1stQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##1쿼터 홀짝 oddEven1stQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven1stQuarter && v.showConfig.oddEven1stQuarter && v.games.oddEven1stQuarter[0].status === 'ACTIVE' && v.games.oddEven1stQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 1쿼터 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven1stQuarter[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stQuarter[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stQuarter' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven1stQuarter[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stQuarter[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2쿼터 승무패 x2ndQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x2ndQuarter && v.showConfig.x2ndQuarter && v.games.x2ndQuarter[0].status === 'ACTIVE' && v.games.x2ndQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x2ndQuarter[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x2ndQuarter[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x2ndQuarter[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x2ndQuarter[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndQuarter' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x2ndQuarter[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x2ndQuarter[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2쿼터 핸디캡 handicap2ndQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap2ndQuarter && v.showConfig.handicap2ndQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap2ndQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndQuarter[index].showStatus && v.games.handicap2ndQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2쿼터 오버언더 underOver2ndQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver2ndQuarter && v.showConfig.underOver2ndQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver2ndQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndQuarter[index].showStatus && v.games.underOver2ndQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##2쿼터 홀짝 oddEven2ndQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven2ndQuarter && v.showConfig.oddEven2ndQuarter && v.games.oddEven2ndQuarter[0].status === 'ACTIVE' && v.games.oddEven2ndQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 2쿼터 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven2ndQuarter[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndQuarter[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndQuarter' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven2ndQuarter[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndQuarter[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3쿼터 승무패 x3rdQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x3rdQuarter && v.showConfig.x3rdQuarter && v.games.x3rdQuarter[0].status === 'ACTIVE' && v.games.x3rdQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x3rdQuarter[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x3rdQuarter[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x3rdQuarter[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x3rdQuarter[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x3rdQuarter' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x3rdQuarter[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x3rdQuarter[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3쿼터 핸디캡 handicap3rdQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap3rdQuarter && v.showConfig.handicap3rdQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap3rdQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap3rdQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap3rdQuarter[index].showStatus && v.games.handicap3rdQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3쿼터 오버언더 underOver3rdQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver3rdQuarter && v.showConfig.underOver3rdQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver3rdQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver3rdQuarter[index].showStatus && v.games.underOver3rdQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##3쿼터 홀짝 oddEven3rdQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven3rdQuarter && v.showConfig.oddEven3rdQuarter && v.games.oddEven3rdQuarter[0].status === 'ACTIVE' && v.games.oddEven3rdQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 3쿼터 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven3rdQuarter[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven3rdQuarter[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven3rdQuarter' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven3rdQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven3rdQuarter[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven3rdQuarter[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##4쿼터 승무패 x4thQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x4thQuarter && v.showConfig.x4thQuarter && v.games.x4thQuarter[0].status === 'ACTIVE' && v.games.x4thQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x4thQuarter[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x4thQuarter[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x4thQuarter[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x4thQuarter[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x4thQuarter' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x4thQuarter[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x4thQuarter[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##4쿼터 핸디캡 handicap4thQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap4thQuarter && v.showConfig.handicap4thQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap4thQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thQuarter' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap4thQuarter' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap4thQuarter[index].showStatus && v.games.handicap4thQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##4쿼터 오버언더 underOver4thQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver4thQuarter && v.showConfig.underOver4thQuarter"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver4thQuarter" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thQuarter' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver4thQuarter' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver4thQuarter[index].showStatus && v.games.underOver4thQuarter[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##4쿼터 홀짝 oddEven4thQuarter -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven4thQuarter && v.showConfig.oddEven4thQuarter && v.games.oddEven4thQuarter[0].status === 'ACTIVE' && v.games.oddEven4thQuarter[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 4쿼터 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven4thQuarter' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven4thQuarter[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven4thQuarter[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven4thQuarter' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven4thQuarter',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven4thQuarter[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven4thQuarter[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##전반전 승무패 x1stHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x1stHalf && v.showConfig.x1stHalf && v.games.x1stHalf[0].status === 'ACTIVE' && v.games.x1stHalf[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x1stHalf[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x1stHalf[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x1stHalf[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x1stHalf[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stHalf' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x1stHalf[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x1stHalf[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##전반전 핸디캡 handicap1stHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap1stHalf && v.showConfig.handicap1stHalf"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap1stHalf" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stHalf' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap1stHalf' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap1stHalf[index].showStatus && v.games.handicap1stHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##전반전 오버언더 underOver1stHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver1stHalf && v.showConfig.underOver1stHalf"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver1stHalf" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stHalf' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stHalf' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver1stHalf[index].showStatus && v.games.underOver1stHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##전반전 홀짝 oddEven1stHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven1stHalf && v.showConfig.oddEven1stHalf && v.games.oddEven1stHalf[0].status === 'ACTIVE' && v.games.oddEven1stHalf[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 전반전 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stHalf' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven1stHalf[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stHalf[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven1stHalf' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven1stHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven1stHalf[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven1stHalf[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##첫 5이닝 승무패 xFirst5Innings -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.xFirst5Innings && v.showConfig.xFirst5Innings && v.games.xFirst5Innings[0].status === 'ACTIVE' && v.games.xFirst5Innings[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫 5이닝 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xFirst5Innings',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.xFirst5Innings[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.xFirst5Innings[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.xFirst5Innings[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.xFirst5Innings[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xFirst5Innings' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xFirst5Innings',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.xFirst5Innings[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.xFirst5Innings[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##첫 5이닝 오버언더 underOverFirst5Innings -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOverFirst5Innings && v.showConfig.underOverFirst5Innings"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫 5이닝 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOverFirst5Innings" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOverFirst5Innings',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOverFirst5Innings',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##후반전 승무패 x2ndHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.x2ndHalf && v.showConfig.x2ndHalf && v.games.x2ndHalf[0].status === 'ACTIVE' && v.games.x2ndHalf[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 승무패
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.x2ndHalf[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.x2ndHalf[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.x2ndHalf[0].drawRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'draw') > -1
                                                                    }"
                                                                    @click="v.games.x2ndHalf[0].drawRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x2ndHalf' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'x2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.x2ndHalf[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.x2ndHalf[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##후반전 핸디캡 handicap2ndHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.handicap2ndHalf && v.showConfig.handicap2ndHalf"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 핸디캡
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.handicap2ndHalf" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndHalf' && x.standard === vv.homeStandard && x.select === 'home') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: vv.homeRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.homeStandard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndHalf' && x.standard === vv.homeStandard && x.select === 'away') > -1
                                                                    }"
                                                                    v-if="v.games.handicap2ndHalf[index].showStatus && v.games.handicap2ndHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'handicap2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: vv.awayRate,
                                                                        standard: vv.homeStandard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##후반전 오버언더 underOver2ndHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.underOver2ndHalf && v.showConfig.underOver2ndHalf"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.underOver2ndHalf" :key="index">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndHalf' && x.standard === vv.standard && x.select === 'over') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'over',
                                                                        selectRate: vv.overRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        오버
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        <small class="o">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
                                                                        </small>
                                                                        {{ $numeral(vv.overRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                                >
                                                                    {{ vv.standard }}
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver2ndHalf' && x.standard === vv.standard && x.select === 'under') > -1
                                                                    }"
                                                                    v-if="v.games.underOver2ndHalf[index].showStatus && v.games.underOver2ndHalf[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'underOver2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'under',
                                                                        selectRate: vv.underRate,
                                                                        standard: vv.standard
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(vv.underRate).format('0.00') }}
                                                                        <small class="u">
                                                                            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
                                                                        </small>
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        언더
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##후반전 홀짝 oddEven2ndHalf -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.oddEven2ndHalf && v.showConfig.oddEven2ndHalf && v.games.oddEven2ndHalf[0].status === 'ACTIVE' && v.games.oddEven2ndHalf[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 후반전 홀짝
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'odd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'odd',
                                                                        selectRate: v.games.oddEven2ndHalf[0].oddRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        홀
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndHalf[0].oddRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'even') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'oddEven2ndHalf',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'even',
                                                                        selectRate: v.games.oddEven2ndHalf[0].evenRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.oddEven2ndHalf[0].evenRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        짝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##풀타임 양팀 득점 bothTeamScore -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.bothTeamScore && v.showConfig.bothTeamScore && v.games.bothTeamScore[0].status === 'ACTIVE' && v.games.bothTeamScore[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamScore',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamScore[0].yesRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        득점
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamScore[0].yesRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamScore',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamScore[0].noRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.bothTeamScore[0].noRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        무득점
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##양팀 득점 + 승무패 bothTeamsGoalWin -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.bothTeamsGoalWin && v.showConfig.bothTeamsGoalWin"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점 + 승무패
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWin[1] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[1].status === 'ACTIVE' && v.games.bothTeamsGoalWin[1].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+홈승
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWin[1].yesRate,
                                                                        standard: 'firstTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[1].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamsGoalWin[1].noRate,
                                                                        standard: 'firstTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[1].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWin[0] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[0].status === 'ACTIVE' && v.games.bothTeamsGoalWin[0].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+무승부
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWin[0].yesRate,
                                                                        standard: 'draw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[0].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamScore[0].noRate,
                                                                        standard: 'draw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[0].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWin[2] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[2].status === 'ACTIVE' && v.games.bothTeamsGoalWin[2].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+원정승
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWin[2].yesRate,
                                                                        standard: 'secondTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[2].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWin',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamsGoalWin[2].noRate,
                                                                        standard: 'secondTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWin[2].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##양팀 득점 + 더블찬스 bothTeamsGoalWinOrDraw -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.bothTeamsGoalWinOrDraw && v.showConfig.bothTeamsGoalWinOrDraw"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 양팀 득점 + 더블찬스
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWinOrDraw[0] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[0].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+홈승 또는 무승부
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[0].yesRate,
                                                                        standard: 'firstTeamWinOrDraw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[0].noRate,
                                                                        standard: 'firstTeamWinOrDraw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWinOrDraw[1] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[1].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+홈승 또는 원정승
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[1].yesRate,
                                                                        standard: 'firstTeamWinOrSecondTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[1].noRate,
                                                                        standard: 'firstTeamWinOrSecondTeamWin'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="row"
                                                                v-if="v.games.bothTeamsGoalWinOrDraw[2] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[2].showStatus"
                                                            >
                                                                <div class="col-6 pl-2 pl-xl-3 g-explain">
                                                                    양팀 득점+원정승 또는 무승부
                                                                </div>
                                                                <div
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'yes') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[2].yesRate,
                                                                        standard: 'secondTeamWinOrDraw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'no') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'bothTeamsGoalWinOrDraw',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: v.games.bothTeamsGoalWinOrDraw[2].noRate,
                                                                        standard: 'secondTeamWinOrDraw'
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].noRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##첫골 팀 firstScoreTeam -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.firstScoreTeam && v.showConfig.firstScoreTeam && v.games.firstScoreTeam[0].status === 'ACTIVE' && v.games.firstScoreTeam[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫골 팀 (무: 0-0 노골)
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'firstScoreTeam',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.firstScoreTeam[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.firstScoreTeam[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.firstScoreTeam[0].neitherRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'neither') > -1
                                                                    }"
                                                                    @click="v.games.firstScoreTeam[0].neitherRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstScoreTeam' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'firstScoreTeam',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.firstScoreTeam[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.firstScoreTeam[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##야구 첫득점 팀 firstRun -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.firstRun && v.showConfig.firstRun && v.games.firstRun[0].status === 'ACTIVE' && v.games.firstRun[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 첫득점 팀
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstRun' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'firstRun',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.firstRun[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.firstRun[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'firstRun' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'firstRun',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.firstRun[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.firstRun[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##마지막골 팀 lastScoreTeam -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.lastScoreTeam && v.showConfig.lastScoreTeam && v.games.lastScoreTeam[0].status === 'ACTIVE' && v.games.lastScoreTeam[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 마지막골 팀 (무: 0-0 노골)
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'lastScoreTeam',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.lastScoreTeam[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.lastScoreTeam[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.lastScoreTeam[0].neitherRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'neither') > -1
                                                                    }"
                                                                    @click="v.games.lastScoreTeam[0].neitherRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'lastScoreTeam',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.lastScoreTeam[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.lastScoreTeam[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##야구 마지막 득점 팀 lastRun -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.lastRun && v.showConfig.lastRun && v.games.lastRun[0].status === 'ACTIVE' && v.games.lastRun[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 마지막 득점 팀
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'home') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'lastRun',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'home',
                                                                        selectRate: v.games.lastRun[0].homeRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.lastRun[0].homeRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div class="col-2 g-x">
                                                                    vs
                                                                </div>
                                                                <div
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'away') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'lastRun',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'away',
                                                                        selectRate: v.games.lastRun[0].awayRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.lastRun[0].awayRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##최다골 시점 halfWithMostScore -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.halfWithMostScore && v.showConfig.halfWithMostScore && v.games.halfWithMostScore[0].status === 'ACTIVE' && v.games.halfWithMostScore[0].showStatus"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 최다골 시점
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-5 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half1st') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'halfWithMostScore',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'half1st',
                                                                        selectRate: v.games.halfWithMostScore[0].half1stRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile">
                                                                        전반전
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(v.games.halfWithMostScore[0].half1stRate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-2 g-x"
                                                                    :class="{
                                                                        'can-bet': v.games.halfWithMostScore[0].drawEqualNumberRate,
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'drawEqualNumber') > -1
                                                                    }"
                                                                    @click="v.games.halfWithMostScore[0].drawEqualNumberRate ? setBet({
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
                                                                    class="col-5 g-away can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half2nd') > -1
                                                                    }"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'halfWithMostScore',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'half2nd',
                                                                        selectRate: v.games.halfWithMostScore[0].half2ndRate,
                                                                        standard: null
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ $numeral(v.games.halfWithMostScore[0].half2ndRate).format('0.00') }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile">
                                                                        후반전
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##정확한 점수 correctScoreFullTime -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.correctScoreFullTime && v.showConfig.correctScoreFullTime"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 정확한 점수
                                                            </div>
                                                            <div class="row">
                                                                <div
                                                                    class="col-4 g-home can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'correctScoreFullTime' && x.standard === `${vv.homeScore}:${vv.awayScore}` && x.select === `${vv.homeScore}:${vv.awayScore}`) > -1
                                                                    }"
                                                                    v-for="(vv, index) in v.games.correctScoreFullTime" :key="index"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'correctScoreFullTime',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: `${vv.homeScore}:${vv.awayScore}`,
                                                                        selectRate: vv.rate,
                                                                        standard: `${vv.homeScore}:${vv.awayScore}`
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        {{ vv.homeScore }}
                                                                        :
                                                                        {{ vv.awayScore }}
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.rate).format('0.00') }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- ##승무패/오버언더 xWithUnderOver -->
                                                        <div
                                                            class="col-12 mt-3"
                                                            v-if="v.games.xWithUnderOver && v.showConfig.xWithUnderOver"
                                                        >
                                                            <div class="mb-1">
                                                                <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="circle-down"/> 승무패/오버언더
                                                            </div>
                                                            <div class="row" v-for="(vv, index) in v.games.xWithUnderOver" :key="index">
                                                                <div
                                                                    class="col-6 pl-2 pl-xl-3 g-explain"
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
                                                                    class="col-3 g-yes can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'yes') > -1
                                                                    }"
                                                                    v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xWithUnderOver',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'yes',
                                                                        selectRate: vv.yesRate,
                                                                        standard: `${vv.team}${vv.type}-${vv.standard}`
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        예
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
                                                                        {{ $numeral(vv.yesRate).format('0,0.00') }}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-3 g-no can-bet"
                                                                    :class="{
                                                                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'no') > -1
                                                                    }"
                                                                    v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'"
                                                                    @click="setBet({
                                                                        _id: v._id,
                                                                        sport: v.sport,
                                                                        type: 'xWithUnderOver',
                                                                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                                                                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                                                                        select: 'no',
                                                                        selectRate: vv.noRate,
                                                                        standard: `${vv.team}${vv.type}-${vv.standard}`
                                                                    })"
                                                                >
                                                                    <div class="float-left pl-2 pl-xl-3">
                                                                        아니오
                                                                    </div>
                                                                    <div class="float-right pr-2 pr-xl-3">
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
                                    <div slot="no-more" class="text-light-brown">마지막 페이지 입니다</div>
                                    <div slot="no-results" class="text-light-brown">마지막 페이지 입니다</div>
                                </infinite-loading>
                            </div>
                        </div>
                    </div>
                </b-overlay>
                <!-- <div class="row mb-5">
                    <div class="col-12 mb-3">
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
                                ></b-pagination-nav>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import InfiniteLoading from "vue-infinite-loading"
    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Sports',
        components: {
            InfiniteLoading,
            UrgentNotice
        },
        computed: {
            ...mapGetters(['loading', 'isLogin', 'user', 'betCart']),
            numberOfPages() {
                return Math.ceil(this.dataCount / this.$config.gamePageSize) === 0 ? 1 : Math.ceil(this.dataCount / this.$config.gamePageSize)
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
        },
        methods: {
            ...mapActions(['setBetCart', 'changeBetCart', 'deleteBetCart', 'deleteBetCartAll', 'setBetInfo']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                // this.getList()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}`
            },
            getInitList() {
                this.data = []
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                this.getList()
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get('/api/get-prematch-list', this.search)
                this.overlay = false
                if(r.error) return

                this.expand = {}

                //구현부분
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
                    const r = await this.$http.get('/api/get-prematch-list', this.search)
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
                //  1셋트 핸디캡 정렬
                if(v.games.handicap1stSet && v.games.handicap1stSet.length > 1) {
                    v.games.handicap1stSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  1셋트 오버언더 정렬
                if(v.games.underOver1stSet && v.games.underOver1stSet.length > 1) {
                    v.games.underOver1stSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  2세트 핸디캡 정렬
                if(v.games.handicap2ndSet && v.games.handicap2ndSet.length > 1) {
                    v.games.handicap2ndSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  2세트 오버언더 정렬
                if(v.games.underOver2ndSet && v.games.underOver2ndSet.length > 1) {
                    v.games.underOver2ndSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
                }
                //  3세트 핸디캡 정렬
                if(v.games.handicap3rdSet && v.games.handicap3rdSet.length > 1) {
                    v.games.handicap3rdSet.sort((a, b) => {
                        return (a.homeStandard < b.homeStandard) ? -1 : (a.homeStandard > b.homeStandard) ? 1: 0
                    })
                }
                //  3세트 오버언더 정렬
                if(v.games.underOver3rdSet && v.games.underOver3rdSet.length > 1) {
                    v.games.underOver3rdSet.sort((a, b) => {
                        return (a.standard < b.standard) ? -1 : (a.standard > b.standard) ? 1: 0
                    })
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

                v.gameType = 'sports'
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
            }
        },
        beforeRouteLeave (to, from, next) {
            this.deleteBetCartAll()
            next()
        }
    }
</script>

<style lang="scss" scoped>
    .sports-menu {

        ul {

            li {
                float: right;
                padding-right: 10px;

                div {
                    background: #F1F1F1;
                    color: #333;
                    font-size: 0.8125rem;
                    border-radius: 2px;
                    width: 78px;
                    height: 31px;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;

                    &:hover {
                    background-color: #0e3b72;
                    color: #fff;
                }
                }
            }
        }
    }
        .category-info {

        tr {
            background: #052C53;
            border-radius: 3px 3px 0px 0px;
            color: #fff;
            font-size: 0.8125rem;
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
</style>