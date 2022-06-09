<template>
    <div class="left-category">
        <div class="category-wrap">
            <div class="category-title" @click="showPopularTitle = !showPopularTitle">
                <div class="row">
                    <div class="col-8 pl-3">
                        <font-awesome-icon :icon="['fa', 'futbol']"/> 주요경기
                    </div>
                    <div class="col-4 text-right pr-3">
                        <small class="mr-1" v-show="!showPopularTitle">카트열기</small>
                        <font-awesome-icon :icon="['fa', 'angle-down']" v-show="!showPopularTitle"/>
                        <small class="mr-1" v-show="showPopularTitle">카트닫기</small>
                        <font-awesome-icon :icon="['fa', 'angle-up']" v-show="showPopularTitle"/>
                    </div>
                </div>
            </div>
            <div v-show="showPopularTitle">
                <div class="category" :class="{'active': showPopular === 'Football'}" @click="expandPopular('Football')">
                    <span class="category-icon">
                        <img src="/images/icon-football-gray.png" alt="축구" title="축구">
                    </span>
                    <span class="category-name">
                        축구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ popularFootball.kLeague ? $numeral(
                                popularFootball.kLeague.count
                                + popularFootball.jLeague.count
                                + popularFootball.pLeague.count
                                + popularFootball.bLeague.count
                                + popularFootball.sLeague.count
                                + popularFootball.pmLeague.count
                                + popularFootball.lLeague.count
                                + popularFootball.wLeague.count
                            ).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <!-- K리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.kLeague && popularFootball.kLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.kLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.kLeague.leagueKor}`)">
                        {{ popularFootball.kLeague ? $tools.cut(popularFootball.kLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.kLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.kLeague ? popularFootball.kLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- J리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.jLeague && popularFootball.jLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.jLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.jLeague.leagueKor}`)">
                        {{ popularFootball.jLeague ? $tools.cut(popularFootball.jLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.jLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.jLeague ? popularFootball.jLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 프리미어 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.pLeague && popularFootball.pLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pLeague.leagueKor}`)">
                        {{ popularFootball.pLeague ? $tools.cut(popularFootball.pLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.pLeague ? popularFootball.pLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 분데스리가 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.bLeague && popularFootball.bLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.bLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.bLeague.leagueKor}`)">
                        {{ popularFootball.bLeague ? $tools.cut(popularFootball.bLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.bLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.bLeague ? popularFootball.bLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 세리에A 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.sLeague && popularFootball.sLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.sLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.sLeague.leagueKor}`)">
                        {{ popularFootball.sLeague ? $tools.cut(popularFootball.sLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.sLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.sLeague ? popularFootball.sLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 프리메라리가 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.pmLeague && popularFootball.pmLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pmLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pmLeague.leagueKor}`)">
                        {{ popularFootball.pmLeague ? $tools.cut(popularFootball.pmLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.pmLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.pmLeague ? popularFootball.pmLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 리그앙 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.lLeague && popularFootball.lLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.lLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.lLeague.leagueKor}`)">
                        {{ popularFootball.lLeague ? $tools.cut(popularFootball.lLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${popularFootball.lLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularFootball.lLeague ? popularFootball.lLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- 월드 리그 -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Football' && popularFootball.wLeague.league.length > 0 && popularFootball.wLeague.count > 0"
                    v-for="(v, index) in popularFootball.wLeague.league" :key="index"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${v.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${v.leagueKor}`)">
                        {{ v ? $tools.cut(v.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${v.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(v ? v.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>

                <div class="category" :class="{'active': showPopular === 'Basketball'}" @click="expandPopular('Basketball')">
                    <span class="category-icon">
                        <img src="/images/icon-basketball-gray.png" alt="농구" title="농구">
                    </span>
                    <span class="category-name">
                        농구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ popularBasketball.NBA ? $numeral(
                                popularBasketball.NBA.count
                                +popularBasketball.KBL.count
                                +popularBasketball.WKBL.count
                            ).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <!-- NBA -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Basketball' && popularBasketball.NBA && popularBasketball.NBA.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.NBA.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.NBA.leagueKor}`)">
                        {{ popularBasketball.NBA ? $tools.cut(popularBasketball.NBA.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.NBA.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBasketball.NBA ? popularBasketball.NBA.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- KBL -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Basketball' && popularBasketball.KBL && popularBasketball.KBL.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.KBL.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.KBL.leagueKor}`)">
                        {{ popularBasketball.KBL ? $tools.cut(popularBasketball.KBL.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.KBL.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBasketball.KBL ? popularBasketball.KBL.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- WKBL -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Basketball' && popularBasketball.WKBL && popularBasketball.WKBL.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.WKBL.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.WKBL.leagueKor}`)">
                        {{ popularBasketball.WKBL ? $tools.cut(popularBasketball.WKBL.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${popularBasketball.WKBL.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBasketball.WKBL ? popularBasketball.WKBL.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>

                <div class="category" :class="{'active': showPopular === 'Baseball'}" @click="expandPopular('Baseball')">
                    <span class="category-icon">
                        <img src="/images/icon-baseball-gray.png" alt="야구" title="야구">
                    </span>
                    <span class="category-name">
                        야구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ popularBaseball.MLB ? $numeral(
                                popularBaseball.MLB.count
                                +popularBaseball.NPB.count
                                +popularBaseball.KBO.count
                            ).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <!-- MLB -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Baseball' && popularBaseball.MLB && popularBaseball.MLB.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.MLB.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.MLB.leagueKor}`)">
                        {{ popularBaseball.MLB ? $tools.cut(popularBaseball.MLB.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.MLB.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBaseball.MLB ? popularBaseball.MLB.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- NPB -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Baseball' && popularBaseball.NPB && popularBaseball.NPB.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.NPB.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.NPB.leagueKor}`)">
                        {{ popularBaseball.NPB ? $tools.cut(popularBaseball.NPB.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.NPB.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBaseball.NPB ? popularBaseball.NPB.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- KBO -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Baseball' && popularBaseball.KBO && popularBaseball.KBO.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.KBO.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.KBO.leagueKor}`)">
                        {{ popularBaseball.KBO ? $tools.cut(popularBaseball.KBO.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${popularBaseball.KBO.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularBaseball.KBO ? popularBaseball.KBO.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>

                <div class="category" :class="{'active': showPopular === 'Hockey'}" @click="expandPopular('Hockey')">
                    <span class="category-icon">
                        <img src="/images/icon-icehockey-gray.png" alt="아이스하키" title="아이스하키">
                    </span>
                    <span class="category-name">
                        아이스하키
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ popularHockey.NHL ? $numeral(
                                popularHockey.NHL.count
                            ).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <!-- NHL -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Hockey' && popularHockey.NHL && popularHockey.NHL.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Ice Hockey&league=${popularHockey.NHL.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Ice Hockey&league=${popularHockey.NHL.leagueKor}`)">
                        {{ popularHockey.NHL ? $tools.cut(popularHockey.NHL.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Ice Hockey&league=${popularHockey.NHL.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularHockey.NHL ? popularHockey.NHL.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>

                <div class="category" :class="{'active': showPopular === 'Volleyball'}" @click="expandPopular('Volleyball')">
                    <span class="category-icon">
                        <img src="/images/icon-volleyball-gray.png" alt="배구" title="배구">
                    </span>
                    <span class="category-name">
                        배구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ popularVolleyball.vLeague ? $numeral(
                                popularVolleyball.vLeague.count
                                +popularVolleyball.wvLeague.count
                            ).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <!-- vLeague -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Volleyball' && popularVolleyball.vLeague && popularVolleyball.vLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.vLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.vLeague.leagueKor}`)">
                        {{ popularVolleyball.vLeague ? $tools.cut(popularVolleyball.vLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.vLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularVolleyball.vLeague ? popularVolleyball.vLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
                <!-- wvLeague -->
                <div
                    class="category-country line-country"
                    v-show="showPopular === 'Volleyball' && popularVolleyball.wvLeague && popularVolleyball.wvLeague.count > 0"
                >
                    <span class="category-contry-icon" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.wvLeague.leagueKor}`)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.wvLeague.leagueKor}`)">
                        {{ popularVolleyball.wvLeague ? $tools.cut(popularVolleyball.wvLeague.leagueKor, 13, '...') : '' }}
                    </span>
                    <span class="category-country-count" @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${popularVolleyball.wvLeague.leagueKor}`)">
                        <span class="count">
                            {{ $numeral(popularVolleyball.wvLeague ? popularVolleyball.wvLeague.count : 0).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>








            <div class="category-title" @click="showSportsTitle = !showSportsTitle">
                <div class="row">
                    <div class="col-8 pl-3">
                        <font-awesome-icon :icon="['fa', 'futbol']"/> 해외형
                    </div>
                    <div class="col-4 text-right pr-3">
                        <small class="mr-1" v-show="!showSportsTitle">카트열기</small>
                        <font-awesome-icon :icon="['fa', 'angle-down']" v-show="!showSportsTitle"/>
                        <small class="mr-1" v-show="showSportsTitle">카트닫기</small>
                        <font-awesome-icon :icon="['fa', 'angle-up']" v-show="showSportsTitle"/>
                    </div>
                </div>
            </div>
            <div v-show="showSportsTitle">
                <div class="category" :class="{'active': showSport === 'Football'}" @click="expandCountry('Football')">
                    <span class="category-icon">
                        <img src="/images/icon-football-gray.png" alt="축구" title="축구">
                    </span>
                    <span class="category-name">
                        축구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.Football.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Football"
                    :key="`Football-${country}-${index}`"
                    v-show="showSport === 'Football'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Football', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Football', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Football', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.Football.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Football' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.Football.country[country].league"
                        :key="`Football-${country}-${league}-${j}`"
                        v-show="showCountry.Football.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Football&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.Football.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'Basketball'}" @click="expandCountry('Basketball')">
                    <span class="category-icon">
                        <img src="/images/icon-basketball-gray.png" alt="농구" title="농구">
                    </span>
                    <span class="category-name">
                        농구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.Basketball ? $numeral(countOfCategory.Basketball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.Basketball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Basketball"
                    :key="`Basketball-${country}-${index}`"
                    v-show="showSport === 'Basketball'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Basketball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Basketball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Basketball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.Basketball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Basketball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.Basketball.country[country].league"
                        :key="`Basketball-${country}-${league}-${j}`"
                        v-show="showCountry.Basketball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&league=${league}`, false)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.Basketball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'Baseball'}" @click="expandCountry('Baseball')">
                    <span class="category-icon">
                        <img src="/images/icon-baseball-gray.png" alt="야구" title="야구">
                    </span>
                    <span class="category-name">
                        야구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.Baseball ? $numeral(countOfCategory.Baseball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.Baseball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Baseball"
                    :key="`Baseball-${country}-${index}`"
                    v-show="showSport === 'Baseball'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Baseball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Baseball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Baseball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.Baseball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Baseball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.Baseball.country[country].league"
                        :key="`Baseball-${country}-${league}-${j}`"
                        v-show="showCountry.Baseball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.Baseball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'Volleyball'}" @click="expandCountry('Volleyball')">
                    <span class="category-icon">
                        <img src="/images/icon-volleyball-gray.png" alt="배구" title="배구">
                    </span>
                    <span class="category-name">
                        배구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.Volleyball ? $numeral(countOfCategory.Volleyball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.Volleyball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Volleyball"
                    :key="`Volleyball-${country}-${index}`"
                    v-show="showSport === 'Volleyball'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Volleyball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Volleyball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Volleyball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.Volleyball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Volleyball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.Volleyball.country[country].league"
                        :key="`Volleyball-${country}-${league}-${j}`"
                        v-show="showCountry.Volleyball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.Volleyball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'Ice Hockey'}" @click="expandCountry('Ice Hockey')">
                    <span class="category-icon">
                        <img src="/images/icon-icehockey-gray.png" alt="아이스하키" title="아이스하키">
                    </span>
                    <span class="category-name">
                        아이스하키
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory['Ice Hockey'] ? $numeral(countOfCategory['Ice Hockey'].countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry['Ice Hockey'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category['Ice Hockey']"
                    :key="`Ice Hockey-${country}-${index}`"
                    v-show="showSport === 'Ice Hockey'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Ice Hockey', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Ice Hockey', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Ice Hockey', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory['Ice Hockey'].country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Ice Hockey' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory['Ice Hockey'].country[country].league"
                        :key="`Ice Hockey-${country}-${league}-${j}`"
                        v-show="showCountry['Ice Hockey'].findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Ice Hockey&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory['Ice Hockey'].country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'Rugby League'}" @click="expandCountry('Rugby League')">
                    <span class="category-icon">
                        <img src="/images/icon-rugby-gray.png" alt="럭비" title="럭비">
                    </span>
                    <span class="category-name">
                        럭비
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory['Rugby League'] ? $numeral(countOfCategory['Rugby League'].countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry['Rugby League'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category['Rugby League']"
                    :key="`Rugby League-${country}-${index}`"
                    v-show="showSport === 'Rugby League'"
                >
                    <span class="category-contry-icon" @click="expandLeague('Rugby League', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('Rugby League', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('Rugby League', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory['Rugby League'].country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Rugby League' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory['Rugby League'].country[country].league"
                        :key="`Rugby League-${country}-${league}-${j}`"
                        v-show="showCountry['Rugby League'].findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=Rugby League&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory['Rugby League'].country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'LoL'}" @click="expandCountry('LoL')">
                    <span class="category-icon">
                        <img src="/images/icon-lol-gray.png" alt="LoL" title="LoL">
                    </span>
                    <span class="category-name">
                        LoL
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.LoL ? $numeral(countOfCategory.LoL.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.LoL.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.LoL"
                    :key="`LoL-${country}-${index}`"
                    v-show="showSport === 'LoL'"
                >
                    <span class="category-contry-icon" @click="expandLeague('LoL', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('LoL', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('LoL', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.LoL.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'LoL' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.LoL.country[country].league"
                        :key="`LoL-${country}-${league}-${j}`"
                        v-show="showCountry.LoL.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=LoL&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.LoL.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSport === 'MMA'}" @click="expandCountry('MMA')">
                    <span class="category-icon">
                        <img src="/images/icon-mma-gray.png" alt="이종격투기" title="이종격투기">
                    </span>
                    <span class="category-name">
                        이종격투기
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategory.MMA ? $numeral(countOfCategory.MMA.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountry.MMA.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.MMA"
                    :key="`MMA-${country}-${index}`"
                    v-show="showSport === 'MMA'"
                >
                    <span class="category-contry-icon" @click="expandLeague('MMA', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeague('MMA', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeague('MMA', country)">
                        <span class="count">
                            {{ $numeral(countOfCategory.MMA.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'MMA' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategory.MMA.country[country].league"
                        :key="`MMA-${country}-${league}-${j}`"
                        v-show="showCountry.MMA.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sports?page=1&sport=MMA&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategory.MMA.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="category-title bt" @click="showSportsCrossTitle = !showSportsCrossTitle">
                <div class="row">
                    <div class="col-8 pl-3">
                        <font-awesome-icon :icon="['fa', 'futbol']"/> 국내형
                    </div>
                    <div class="col-4 text-right pr-3">
                        <small class="mr-1" v-show="!showSportsCrossTitle">카트열기</small>
                        <font-awesome-icon :icon="['fa', 'angle-down']" v-show="!showSportsCrossTitle"/>
                        <small class="mr-1" v-show="showSportsCrossTitle">카트닫기</small>
                        <font-awesome-icon :icon="['fa', 'angle-up']" v-show="showSportsCrossTitle"/>
                    </div>
                </div>
            </div>
            <div v-show="showSportsCrossTitle">
                <div class="category" :class="{'active': showSportCross === 'Football'}" @click="expandCountryCross('Football')">
                    <span class="category-icon">
                        <img src="/images/icon-football-gray.png" alt="축구" title="축구">
                    </span>
                    <span class="category-name">
                        축구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.Football ? $numeral(countOfCategoryCross.Football.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.Football.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Football"
                    :key="`Football-${country}-${index}`"
                    v-show="showSportCross === 'Football'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Football', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Football', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Football', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.Football.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Football' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.Football.country[country].league"
                        :key="`Football-${country}-${league}-${j}`"
                        v-show="showCountryCross.Football.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Football&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.Football.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'Basketball'}" @click="expandCountryCross('Basketball')">
                    <span class="category-icon">
                        <img src="/images/icon-basketball-gray.png" alt="농구" title="농구">
                    </span>
                    <span class="category-name">
                        농구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.Basketball ? $numeral(countOfCategoryCross.Basketball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.Basketball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Basketball"
                    :key="`Basketball-${country}-${index}`"
                    v-show="showSportCross === 'Basketball'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Basketball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Basketball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Basketball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.Basketball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Basketball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.Basketball.country[country].league"
                        :key="`Basketball-${country}-${league}-${j}`"
                        v-show="showCountryCross.Basketball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Basketball&league=${league}`, false)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.Basketball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'Baseball'}" @click="expandCountryCross('Baseball')">
                    <span class="category-icon">
                        <img src="/images/icon-baseball-gray.png" alt="야구" title="야구">
                    </span>
                    <span class="category-name">
                        야구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.Baseball ? $numeral(countOfCategoryCross.Baseball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.Baseball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Baseball"
                    :key="`Baseball-${country}-${index}`"
                    v-show="showSportCross === 'Baseball'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Baseball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Baseball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Baseball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.Baseball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Baseball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.Baseball.country[country].league"
                        :key="`Baseball-${country}-${league}-${j}`"
                        v-show="showCountryCross.Baseball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Baseball&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.Baseball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'Volleyball'}" @click="expandCountryCross('Volleyball')">
                    <span class="category-icon">
                        <img src="/images/icon-volleyball-gray.png" alt="배구" title="배구">
                    </span>
                    <span class="category-name">
                        배구
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.Volleyball ? $numeral(countOfCategoryCross.Volleyball.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.Volleyball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.Volleyball"
                    :key="`Volleyball-${country}-${index}`"
                    v-show="showSportCross === 'Volleyball'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Volleyball', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Volleyball', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Volleyball', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.Volleyball.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Volleyball' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.Volleyball.country[country].league"
                        :key="`Volleyball-${country}-${league}-${j}`"
                        v-show="showCountryCross.Volleyball.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Volleyball&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.Volleyball.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'Ice Hockey'}" @click="expandCountryCross('Ice Hockey')">
                    <span class="category-icon">
                        <img src="/images/icon-icehockey-gray.png" alt="아이스하키" title="아이스하키">
                    </span>
                    <span class="category-name">
                        아이스하키
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross['Ice Hockey'] ? $numeral(countOfCategoryCross['Ice Hockey'].countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross['Ice Hockey'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category['Ice Hockey']"
                    :key="`Ice Hockey-${country}-${index}`"
                    v-show="showSportCross === 'Ice Hockey'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Ice Hockey', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Ice Hockey', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Ice Hockey', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross['Ice Hockey'].country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Ice Hockey' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross['Ice Hockey'].country[country].league"
                        :key="`Ice Hockey-${country}-${league}-${j}`"
                        v-show="showCountryCross['Ice Hockey'].findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Ice Hockey&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross['Ice Hockey'].country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'Rugby League'}" @click="expandCountryCross('Rugby League')">
                    <span class="category-icon">
                        <img src="/images/icon-rugby-gray.png" alt="럭비" title="럭비">
                    </span>
                    <span class="category-name">
                        럭비
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross['Rugby League'] ? $numeral(countOfCategoryCross['Rugby League'].countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross['Rugby League'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category['Rugby League']"
                    :key="`Rugby League-${country}-${index}`"
                    v-show="showSportCross === 'Rugby League'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('Rugby League', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('Rugby League', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('Rugby League', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross['Rugby League'].country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Rugby League' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross['Rugby League'].country[country].league"
                        :key="`Rugby League-${country}-${league}-${j}`"
                        v-show="showCountryCross['Rugby League'].findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=Rugby League&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross['Rugby League'].country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'LoL'}" @click="expandCountryCross('LoL')">
                    <span class="category-icon">
                        <img src="/images/icon-lol-gray.png" alt="LoL" title="LoL">
                    </span>
                    <span class="category-name">
                        LoL
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.LoL ? $numeral(countOfCategoryCross.LoL.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.LoL.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.LoL"
                    :key="`LoL-${country}-${index}`"
                    v-show="showSportCross === 'LoL'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('LoL', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('LoL', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('LoL', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.LoL.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'LoL' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.LoL.country[country].league"
                        :key="`LoL-${country}-${league}-${j}`"
                        v-show="showCountryCross.LoL.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=LoL&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.LoL.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
                <div class="category line" :class="{'active': showSportCross === 'MMA'}" @click="expandCountryCross('MMA')">
                    <span class="category-icon">
                        <img src="/images/icon-mma-gray.png" alt="이종격투기" title="이종격투기">
                    </span>
                    <span class="category-name">
                        이종격투기
                    </span>
                    <span class="category-count">
                        <span class="count">
                            {{ countOfCategoryCross.MMA ? $numeral(countOfCategoryCross.MMA.countOfGame).format('0,0') : 0 }}
                        </span>
                    </span>
                </div>
                <div
                    class="category-country line-country"
                    :class="showCountryCross.MMA.findIndex((x) => x === country) > -1 ? 'active' : ''"
                    v-for="(v, country, index) in category.MMA"
                    :key="`MMA-${country}-${index}`"
                    v-show="showSportCross === 'MMA'"
                >
                    <span class="category-contry-icon" @click="expandLeagueCross('MMA', country)">
                        ◎
                    </span>
                    <span class="category-country-content" @click="expandLeagueCross('MMA', country)">
                        <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                        {{ country }}
                    </span>
                    <span class="category-country-count" @click="expandLeagueCross('MMA', country)">
                        <span class="count">
                            {{ $numeral(countOfCategoryCross.MMA.country[country].countOfGame).format('0,0') }}
                        </span>
                    </span>
                    <div
                        class="category-league line-league"
                        :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'MMA' && $route.query.league === league}"
                        v-for="(vv, league, j) in countOfCategoryCross.MMA.country[country].league"
                        :key="`MMA-${country}-${league}-${j}`"
                        v-show="showCountryCross.MMA.findIndex((x) => x === country) > -1"
                        @click="$tools.pushRouter(`/sportsCross?page=1&sport=MMA&league=${league}`)"
                    >
                        <span class="category-league-blank"></span>
                        <span class="category-league-content">
                            {{ $tools.cut(league, 13, '...') }}
                        </span>
                        <span class="category-league-count">
                            <span class="count">
                                {{ $numeral(countOfCategoryCross.MMA.country[country].league[league]).format('0,0') }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'LeftCategory',
        components: {
        },
        computed: {
            ...mapGetters(['router', 'isLogin'])
        },
        watch: {
            '$route' () {
                this.getCategory()
            }
        },
        created() {
            this.getCategory()
        },
        data() {
            return {
                category: {},
                countOfCategory: {},
                countryOID: {},
                showSport: '',
                showCountry: {
                    Football: [],
                    Basketball: [],
                    Baseball: [],
                    'Ice Hockey': [],
                    Tennis: [],
                    Handball: [],
                    Volleyball: [],
                    'Rugby League': [],
                    'Rugby Union': [],
                    Boxing: [],
                    'Table Tennis': [],
                    MMA: [],
                    Golf: [],
                    Darts: [],
                    LoL: [],
                    'CS:GO': [],
                    'Dota 2': []
                },
                categoryCross: {},
                countOfCategoryCross: {},
                countryOIDCross: {},
                showSportCross: '',
                showCountryCross: {
                    Football: [],
                    Basketball: [],
                    Baseball: [],
                    'Ice Hockey': [],
                    Tennis: [],
                    Handball: [],
                    Volleyball: [],
                    'Rugby League': [],
                    'Rugby Union': [],
                    Boxing: [],
                    'Table Tennis': [],
                    MMA: [],
                    Golf: [],
                    Darts: [],
                    LoL: [],
                    'CS:GO': [],
                    'Dota 2': []
                },
                showSportsTitle: true,
                showSportsCrossTitle: true,
                showPopularTitle: true,
                popularFootball: {
                    wLeague: {
                        count: 0,
                        league: []
                    }
                },
                popularBaseball: {},
                popularBasketball: {},
                popularHockey: {},
                popularVolleyball: {},
                showPopular: ''
            }
        },
        methods: {
            ...mapActions([]),
            async getCategory() {
                this.categoryWorking = true
                const r = await this.$http.get('/api/get-category')
                if(r.error) return

                this.category = r.data.category
                this.countOfCategory = r.data.countOfCategory
                this.countryOID = r.data.countryOID

                this.categoryCross = r.data.category
                this.countOfCategoryCross = r.data.countOfCategory
                this.countryOIDCross = r.data.countryOID

                this.popularFootball = r.data.popularFootball
                this.popularBaseball = r.data.popularBaseball
                this.popularBasketball = r.data.popularBasketball
                this.popularHockey = r.data.popularHockey
                this.popularVolleyball = r.data.popularVolleyball

                // console.log(this.category)
                // console.log(this.countOfCategory)

                this.$set(this.popularFootball, 'wLeague', {})
                this.$set(this.popularFootball.wLeague, 'count', 0)
                this.$set(this.popularFootball.wLeague, 'league', [])

                // 축구 월드 리그.
                if(this.countOfCategory.Football.country['월드']) {
                    this.$set(this.popularFootball.wLeague, 'count', this.countOfCategory.Football.country['월드'].countOfGame)
                    Object.keys(this.countOfCategory.Football.country['월드'].league).forEach(key => {
                        this.popularFootball.wLeague.league.push({
                            leagueKor: key,
                            count: this.countOfCategory.Football.country['월드'].league[key]
                        })
                    })
                }
            },
            expandCountry(v) {
                if(this.showSport === v) {
                    this.showSport = ''
                    return
                }
                this.showSport = v
            },
            expandCountryCross(v) {
                if(this.showSportCross === v) {
                    this.showSportCross = ''
                    return
                }
                this.showSportCross = v
            },
            expandLeague(sport, v) {
                let index = this.showCountry[sport].findIndex((x) => x === v)
                if(index > -1) {
                    this.showCountry[sport].splice(index, 1)
                }
                else {
                    this.showCountry[sport].push(v)
                }
            },
            expandLeagueCross(sport, v) {
                let index = this.showCountryCross[sport].findIndex((x) => x === v)
                if(index > -1) {
                    this.showCountryCross[sport].splice(index, 1)
                }
                else {
                    this.showCountryCross[sport].push(v)
                }
            },
            expandPopular(sport) {
                if(this.showPopular === sport) {
                    this.showPopular = ''
                    return
                }
                this.showPopular = sport
            }
        }
    }
</script>