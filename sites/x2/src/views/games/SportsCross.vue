<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice />
            <div class="content-box">
                <hr class="mb-4 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">국내형 스포츠 <span>SPORTS CROSS</span></div>
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
                                    <div @click="$tools.pushRouter('/sportscross', false)">국내형</div>
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
                    <div class="col">
                        <div class="sports-icon">
                            <div class="sports-icon-wrap">
                                <ul>
                                    <li @click="selectCategory('')">
                                        <img
                                            src="/images/icon-null-gray.png"
                                            class="sports-category-icon"
                                            alt="전체"
                                            title="전체"
                                        />
                                        <div class="mt-1">전체</div>
                                    </li>
                                    <li @click="selectCategory('Football')">
                                        <img
                                            src="/images/icon-football-gray.png"
                                            class="sports-category-icon"
                                            alt="축구"
                                            title="축구"
                                        />
                                        <div class="mt-1">축구</div>
                                    </li>
                                    <li @click="selectCategory('Basketball')">
                                        <img
                                            src="/images/icon-basketball-gray.png"
                                            class="sports-category-icon"
                                            alt="농구"
                                            title="농구"
                                        />
                                        <div class="mt-1">농구</div>
                                    </li>
                                    <li @click="selectCategory('Baseball')">
                                        <img
                                            src="/images/icon-baseball-gray.png"
                                            class="sports-category-icon"
                                            alt="야구"
                                            title="야구"
                                        />
                                        <div class="mt-1">야구</div>
                                    </li>
                                    <li @click="selectCategory('Ice Hockey')">
                                        <img
                                            src="/images/icon-icehockey-gray.png"
                                            class="sports-category-icon"
                                            alt="아이스하키"
                                            title="아이스하키"
                                        />
                                        <div class="mt-1">하키</div>
                                    </li>
                                    <li @click="selectCategory('Handball')">
                                        <img
                                            src="/images/icon-handball-gray.png"
                                            class="sports-category-icon"
                                            alt="핸드볼"
                                            title="핸드볼"
                                        />
                                        <div class="mt-1">핸드볼</div>
                                    </li>
                                    <li @click="selectCategory('Volleyball')">
                                        <img
                                            src="/images/icon-volleyball-gray.png"
                                            class="sports-category-icon"
                                            alt="배구"
                                            title="배구"
                                        />
                                        <div class="mt-1">배구</div>
                                    </li>
                                    <li @click="selectCategory('Rugby League')">
                                        <img
                                            src="/images/icon-rugby-gray.png"
                                            class="sports-category-icon"
                                            alt="럭비"
                                            title="럭비"
                                        />
                                        <div class="mt-1">럭비</div>
                                    </li>
                                    <li @click="selectCategory('Rugby Union')">
                                        <img
                                            src="/images/icon-rugbyunion-gray.png"
                                            class="sports-category-icon"
                                            alt="럭비유니언"
                                            title="럭비유니언"
                                        />
                                        <div class="mt-1">유니언</div>
                                    </li>
                                    <li @click="selectCategory('Boxing')">
                                        <img
                                            src="/images/icon-boxing-gray.png"
                                            class="sports-category-icon"
                                            alt="권투"
                                            title="권투"
                                        />
                                        <div class="mt-1">권투</div>
                                    </li>
                                    <li @click="selectCategory('MMA')">
                                        <img
                                            src="/images/icon-mma-gray.png"
                                            class="sports-category-icon"
                                            title="이종격투기"
                                        />
                                        <div class="mt-1">격투기</div>
                                    </li>
                                    <li @click="selectCategory('Golf')">
                                        <img
                                            src="/images/icon-golf-gray.png"
                                            class="sports-category-icon"
                                            alt="골프"
                                            title="골프"
                                        />
                                        <div class="mt-1">골프</div>
                                    </li>
                                    <li @click="selectCategory('Darts')">
                                        <img
                                            src="/images/icon-darts-gray.png"
                                            class="sports-category-icon"
                                            alt="다트"
                                            title="다트"
                                        />
                                        <div class="mt-1">다트</div>
                                    </li>
                                    <li @click="selectCategory('LoL')">
                                        <img
                                            src="/images/icon-lol-gray.png"
                                            class="sports-category-icon"
                                            alt="LOL"
                                            title="LOL"
                                        />
                                        <div class="mt-1">LOL</div>
                                    </li>
                                    <li @click="selectCategory('CS:GO')">
                                        <img
                                            src="/images/icon-csgo-gray.png"
                                            class="sports-category-icon"
                                            alt="CS:GO"
                                            title="CS:GO"
                                        />
                                        <div class="mt-1">CS:GO</div>
                                    </li>
                                    <li @click="selectCategory('Dota 2')">
                                        <img
                                            src="/images/icon-dota2-gray.png"
                                            class="sports-category-icon"
                                            alt="Dota 2"
                                            title="Dota 2"
                                        />
                                        <div class="mt-1">Dota 2</div>
                                    </li>
                                    <li @click="selectCategory('FIFA')">
                                        <img
                                            src="/images/icon-fifa-gray.png"
                                            class="sports-category-icon"
                                            alt="FIFA"
                                            title="FIFA"
                                        />
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
                    <div class="row px-xl-3">
                        <div class="col-12">
                            <div class="sports">
                                <div class="row mb-xl-2" v-for="(v, index) in data" :key="index">
                                    <div class="col-8 col-xl-12 mt-2 mt-xl-3 g-league-mobile" v-if=" data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                        <img :src="`/images/${$config.iconSport[v.sport]}`" class="sports-img"/>
                                        <span class="g-league"><font-awesome-icon :icon="['fa', 'angle-double-right']" class="ml-1 icon-league"/>
                                            {{ v.leagueKor }}
                                        </span>
                                    </div>
                                    <div class="col-4 d-xl-none mt-2 pt-2 text-right g-date-mobile" v-if=" data[index].leagueKor !== (index > 0 ? data[index - 1].leagueKor : null)">
                                        {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                    </div>
                                    <div class="col-12 mt-2" :class="{ 'mb-3': index + 1 === data.length }">
                                        <div class="sports-px">
                                        <!-- 승무패 -->
                                        <div class="row g"
                                            v-if="v.games.xKor && v.showConfig.xKor && v.games.xKor[0].status === 'ACTIVE' && v.games.xKor[0].showStatus"
                                        >
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-date clearfix">
                                                    {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                                </div>
                                            </div>
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-count o clearfix">
                                                    승무패
                                                </div>
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-home can-bet clearfix"
                                                    :class="{
                                                        n: !v.showConfig.xKor || v.games.xKor[0].status !== 'ACTIVE' || !v.games.xKor[0].showStatus,
                                                        selectBet: betCart.findIndex((x) => x._id === v._id && x.type === 'xKor' && x.standard === null && x.select === 'home') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'xKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'home',
                                                        selectRate: v.games.xKor[0].homeRate,
                                                        standard: null,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile-cross">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3">
                                                        <!-- <small class="x d-sm-none">X</small> -->
                                                        <!-- <small class="x d-none d-sm-inline">1x2</small> -->
                                                        {{ $numeral(v.games.xKor[0].homeRate).format("0.00") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col px-1 g-x"
                                                :class="{
                                                    n:!v.showConfig.xKor ||v.games.xKor[0].status !== 'ACTIVE' ||!v.games.xKor[0].showStatus,
                                                    'can-bet':v.showConfig.xKor &&v.games.xKor[0].status === 'ACTIVE' &&v.games.xKor[0].showStatus &&v.games.xKor[0].drawRate,
                                                    selectBet:betCart.findIndex((x) =>x._id === v._id && x.type === 'xKor' &&x.standard === null &&x.select === 'draw') > -1,
                                                }"
                                                @click="v.showConfig.xKor &&v.games.xKor[0].status === 'ACTIVE' &&v.games.xKor[0].showStatus &&v.games.xKor[0].drawRate? setBet({
                                                    _id: v._id,
                                                    sport: v.sport,
                                                    type: 'xKor',
                                                    homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                    awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                    select: 'draw',
                                                    selectRate: v.games.xKor[0].drawRate,
                                                    standard: null,
                                                }): null"
                                            >
                                                {{ v.games.xKor[0].drawRate? $numeral(v.games.xKor[0].drawRate).format("0.00"): "vs" }}
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-away can-bet clearfix"
                                                    :class="{
                                                        n: !v.showConfig.xKor || v.games.xKor[0].status !== 'ACTIVE' || !v.games.xKor[0].showStatus,
                                                        selectBet: betCart.findIndex((x) =>x._id === v._id && x.type === 'xKor' &&x.standard === null &&x.select === 'away') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'xKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'away',
                                                        selectRate: v.games.xKor[0].awayRate,
                                                        standard: null,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3">
                                                        {{ $numeral(v.games.xKor[0].awayRate).format("0.00") }}
                                                        <!-- <small class="x d-sm-none">X</small>
                                                            <small class="x d-none d-sm-inline">1x2</small> -->
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile-cross">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 핸디캡 -->
                                        <div class="row mt-1 g" v-for="(itemHandi, indexHandi) in v.games.handicapKor" :key="`${v._id}-handi-${indexHandi}`" v-show="itemHandi.status === 'ACTIVE' && itemHandi.showStatus">
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-date clearfix">
                                                    {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                                </div>
                                            </div>
                                            <div class="col px-1 d-none d-xl-block o">
                                                <div class="g-count clearfix">
                                                    핸디캡
                                                </div>
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-home can-bet clearfix"
                                                    :class="{
                                                        selectBet:betCart.findIndex((x) =>x._id === v._id && x.type === 'handicapKor' &&x.standard === itemHandi.homeStandard &&x.select === 'home') > -1,
                                                    }"
                                                    v-if="itemHandi.showStatus"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'handicapKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'home',
                                                        selectRate: itemHandi.homeRate,
                                                        standard: itemHandi.homeStandard,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile-cross">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3">
                                                        <small class="h">H</small>
                                                        {{ $numeral(itemHandi.homeRate).format("0.00") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col px-1 g-x-s">
                                                {{ itemHandi.homeStandard }}
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-away can-bet clearfix"
                                                    :class="{ selectBet: betCart.findIndex((x) =>x._id === v._id && x.type === 'handicapKor' &&x.standard === itemHandi.homeStandard && x.select === 'away') > -1,}"
                                                    v-if="itemHandi.showStatus"
                                                    @click=" setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'handicapKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'away',
                                                        selectRate: itemHandi.awayRate,
                                                        standard: itemHandi.homeStandard,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3">
                                                        {{ $numeral(itemHandi.awayRate).format("0.00") }}
                                                        <small class="h">H</small>
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile-cross">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 오버언더 -->
                                        <div class="row mt-1 g" v-for="(itemUnderOver, indexUnderOver) in v.games.underOverKor" :key="`${v._id}-overunder-${indexUnderOver}`" v-show="itemUnderOver.status === 'ACTIVE' && itemUnderOver.showStatus">
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-date clearfix">
                                                    {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                                </div>
                                            </div>
                                            <div class="col px-1 d-none d-xl-block o">
                                                <div class="g-count clearfix">
                                                    오버언더
                                                </div>
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-home can-bet clearfix"
                                                    :class="{selectBet: betCart.findIndex((x) =>x._id === v._id && x.type === 'underOverKor' &&x.standard === itemUnderOver.standard &&x.select === 'over') > -1,}"
                                                    v-if="itemUnderOver.status"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'underOverKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'over',
                                                        selectRate: itemUnderOver.overRate,
                                                        standard: itemUnderOver.standard,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile-cross">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3">
                                                        <small class="o">
                                                            <font-awesome-icon :icon="['fa', 'arrow-up']" />
                                                        </small>
                                                        {{ $numeral(itemUnderOver.overRate).format("0.00") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col g-x-s px-1">
                                                {{ itemUnderOver.standard }}
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-away can-bet clearfix"
                                                    :class="{selectBet:betCart.findIndex((x) =>x._id === v._id && x.type === 'underOverKor' &&x.standard === itemUnderOver.standard &&x.select === 'under') > -1,}"
                                                    v-if="itemUnderOver.status"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'underOverKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'under',
                                                        selectRate: itemUnderOver.underRate,
                                                        standard: itemUnderOver.standard,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3">
                                                        {{ $numeral(itemUnderOver.underRate).format("0.00") }}
                                                        <small class="u">
                                                            <font-awesome-icon :icon="['fa', 'arrow-down']" />
                                                        </small>
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile-cross">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 선 7득점 [농구] -->
                                        <!-- <div class="row mt-1 g" v-if="v.games.first7PointsKor &&v.showConfig.first7PointsKor &&v.games.first7PointsKor[0].status === 'ACTIVE' &&v.games.first7PointsKor[0].showStatus">
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-date clearfix">
                                                    {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                                </div>
                                            </div>
                                            <div class="col px-1 d-none d-xl-block o">
                                                <div class="g-count clearfix">
                                                    선 7득점
                                                </div>
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-home can-bet clearfix"
                                                    :class="{
                                                        n:!v.showConfig.first7PointsKor ||v.games.first7PointsKor[0].status !== 'ACTIVE' ||!v.games.first7PointsKor[0].showStatus,
                                                        selectBet:betCart.findIndex((x) =>x._id === v._id &&x.type === 'first7PointsKor' &&x.standard === null &&x.select === 'home') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'first7PointsKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'home',
                                                        selectRate: v.games.first7PointsKor[0].homeRate,
                                                        standard: null,
                                                })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile-cross">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3">
                                                        <small class="first7Points d-sm-none">선7</small>
                                                        <small class="first7Points d-none d-sm-inline">선7득점</small>
                                                        {{ $numeral(v.games.first7PointsKor[0].homeRate).format("0.00") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col px-1 g-x">
                                                vs
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-away can-bet clearfix"
                                                    :class="{
                                                        n:!v.showConfig.first7PointsKor ||v.games.first7PointsKor[0].status !== 'ACTIVE' ||!v.games.first7PointsKor[0].showStatus,
                                                        selectBet:betCart.findIndex((x) =>x._id === v._id &&x.type === 'first7PointsKor' &&x.standard === null &&x.select === 'away') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'first7PointsKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'away',
                                                        selectRate: v.games.first7PointsKor[0].awayRate,
                                                        standard: null,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3">
                                                        {{ $numeral(v.games.first7PointsKor[0].awayRate).format("0.00") }}
                                                        <small class="first7Points d-sm-none">선7</small>
                                                        <small class="first7Points d-none d-sm-inline">선7득점</small>
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile-cross">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <!-- 선 5득점 [배구] -->
                                        <!-- <div class="row mt-1 g" v-if="v.games.first5PointsKor &&v.showConfig.first5PointsKor &&v.games.first5PointsKor[0].status === 'ACTIVE' &&v.games.first5PointsKor[0].showStatus">
                                            <div class="col px-1 d-none d-xl-block">
                                                <div class="g-date clearfix">
                                                    {{ $moment(v.gameDateTime).format("MM/DD HH:mm") }}
                                                </div>
                                            </div>
                                            <div class="col px-1 d-none d-xl-block o">
                                                <div class="g-count clearfix">
                                                    선 5득점
                                                </div>
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-home can-bet clearfix"
                                                    :class="{
                                                        n:!v.showConfig.first5PointsKor ||v.games.first5PointsKor[0].status !== 'ACTIVE' ||!v.games.first5PointsKor[0].showStatus,
                                                        selectBet: betCart.findIndex((x) =>x._id === v._id &&x.type === 'first5PointsKor' &&x.standard === null &&x.select === 'home') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'first5PointsKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'home',
                                                        selectRate: v.games.first5PointsKor[0].homeRate,
                                                        standard: null,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3 g-home-team-mobile-cross">
                                                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3">
                                                        <small class="first5Points d-sm-none">선5</small>
                                                        <small class="first5Points d-none d-sm-inline">선5득점</small>
                                                        {{ $numeral(v.games.first5PointsKor[0].homeRate).format("0.00") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col px-1 g-x">
                                                vs
                                            </div>
                                            <div class="col-5 col-xl-4 px-1">
                                                <div
                                                    class="g-away can-bet clearfix"
                                                    :class="{
                                                        n:!v.showConfig.first5PointsKor ||v.games.first5PointsKor[0].status !== 'ACTIVE' ||!v.games.first5PointsKor[0].showStatus,
                                                        selectBet:betCart.findIndex((x) =>x._id === v._id &&x.type === 'first5PointsKor' &&x.standard === null &&x.select === 'away') > -1,
                                                    }"
                                                    @click="setBet({
                                                        _id: v._id,
                                                        sport: v.sport,
                                                        type: 'first5PointsKor',
                                                        homeTeam: v.homeTeamKor? v.homeTeamKor: v.homeTeam,
                                                        awayTeam: v.awayTeamKor? v.awayTeamKor: v.awayTeam,
                                                        select: 'away',
                                                        selectRate: v.games.first5PointsKor[0].awayRate,
                                                        standard: null,
                                                    })"
                                                >
                                                    <div class="float-left pl-2 pl-xl-3">
                                                        {{ $numeral(v.games.first5PointsKor[0].awayRate).format("0.00") }}
                                                        <small class="first5Points d-sm-none">선5</small>
                                                        <small class="first5Points d-none d-sm-inline">선5득점</small>
                                                    </div>
                                                    <div class="float-right pr-2 pr-xl-3 g-away-team-mobile-cross">
                                                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
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
                                >
                                </b-pagination-nav>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import InfiniteLoading from "vue-infinite-loading"
    import UrgentNotice from "@/components/UrgentNotice.vue";

    export default {
        name: "SportsCross",
        components: {
            InfiniteLoading,
            UrgentNotice,
        },
        computed: {
            ...mapGetters(["loading", "isLogin", "user", "betCart"]),
            numberOfPages() {
                return Math.ceil(this.dataCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.dataCount / this.$config.pageSize)
            },
        },
        watch: {
            $route() {
                this.getInitList()
            },
        },
        data() {
            return {
                overlay: false,
                search: {
                    page: 1,
                    sport: "",
                },
                expand: {},
                data: [],
                dataCount: 0,
            };
        },
        created() {
            this.setFromRouter();
        },
        methods: {
            ...mapActions([
                "setBetCart",
                "changeBetCart",
                "deleteBetCart",
                "deleteBetCartAll",
                "setBetInfo",
            ]),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                // this.getList()
            },
            getInitList() {
                this.data = []
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.search.sport = this.$route.query.sport ? this.$route.query.sport : ''

                this.getList()
            },
            linkGen(page) {
                return `?page=${page}&sport=${this.search.sport}`;
            },
            async getList() {
                this.overlay = true
                let r = await this.$http.get("/api/get-prematch-cross-list", this.search)
                this.overlay = false
                if (r.error) return

                this.data = r.data.recordSet
                this.dataCount = r.data.recordCount
                this.betInfo = r.data.betInfo

                if (this.isLogin) {
                    this.setBetInfo({
                        min: r.data.betInfo[`lv${this.user.grade}`].min,
                        max: r.data.betInfo[`lv${this.user.grade}`].max,
                        benefit: r.data.betInfo[`lv${this.user.grade}`].benefit,
                    })
                }
            },
            async infiniteHandler($state) {
                try {
                    const r = await this.$http.get('/api/get-prematch-cross-list', this.search)
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
                    // console.log(error)
                }
           },
           selectCategory(sport) {
                this.search.sport = sport;
                let path = encodeURI(`${this.$route.path}${this.linkGen(1)}`);
                if (path === this.$route.fullPath) {
                    this.getList();
                    return;
                }
                this.$router.push(path);
            },
            calcCount(showConfig, games) {
                let cnt = 0;
                for (let item in games) {
                    if (
                    item === "xKor" ||
                    item === "handicapKor" ||
                    item === "underOverKor"
                    ) {
                    continue;
                    }

                    for (let i = 0; i < games[item].length; i++) {
                        if (
                            games[item][i].showStatus &&
                            (games[item][i].status === "ACTIVE" ||
                            games[item][i].status === "HIDE") &&
                            showConfig[item]
                        ) {
                            cnt++;
                            continue;
                        }
                    }
                }
                return cnt;
            },
            setBet(v) {
                if (!this.isLogin) {
                    this.$tools.sw("info", "로그인", "로그인 후 이용 가능 합니다.");
                    return;
                }

                v.gameType = "sportsCross";
                // 일치하는 배팅 삭제
                // _id, type, select 일치
                let existSameCartIndex = this.betCart.findIndex((x) => {
                    return (
                    v._id === x._id &&
                    v.type === x.type &&
                    v.standard === x.standard &&
                    v.select === x.select
                    );
                });
                if (existSameCartIndex > -1) {
                    this.$store.commit("deleteBetCart", existSameCartIndex);
                    return;
                }

                // 일치하는 _id 건에 대한 승무패, 핸디캡 검사
                if (
                    v.type === "xKor" ||
                    v.type === "handicapKor" ||
                    v.type === "handicapTotalSetKor"
                ) {
                let existSameGameIndex = this.betCart.findIndex((x) => {
                return (
                    v._id === x._id &&
                    v.type !== x.type &&
                    (x.type === "xKor" ||
                    x.type === "handicapKor" ||
                    x.type === "handicapTotalSetKor")
                );
                });

                if (existSameGameIndex > -1) {
                this.$tools.sw(
                    "warning",
                    "조합불가",
                    "동일경기 승무패, 핸디캡은 조합이 불가능 합니다."
                );
                return;
                }
            }

            if (v.sport === "Football" || v.sport === "Ice Hockey" || v.sport === "Volleyball") {
                //  일치하는 _id 건에 대한 조합 검사
                let existSameGameIndex = this.betCart.findIndex((x) => {
                return v._id === x._id && v.type !== x.type;
                });

                if (existSameGameIndex > -1) {
                    this.$tools.sw(
                        "warning",
                        "조합불가",
                        "동일경기 조합은 불가능 합니다."
                    )
                    return
                }
            }

            //  일치하는 _id 건에 대한 변경
            let existSameGameIndex = this.betCart.findIndex((x) => {
                return v._id === x._id && v.type === x.type;
            });
            if (existSameGameIndex > -1) {
                    this.$store.commit("changeBetCart", {
                    index: existSameGameIndex,
                    bet: v,
                })
                return
            }

            this.setBetCart(v);
            },
        },
        beforeRouteLeave(to, from, next) {
            this.deleteBetCartAll()
            next()
        },
    }
</script>

<style lang="scss" scoped>
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
        color: #fff;
        font-size: 0.8125rem;
        padding: 10px 0;
        text-align: center;
    }
</style>