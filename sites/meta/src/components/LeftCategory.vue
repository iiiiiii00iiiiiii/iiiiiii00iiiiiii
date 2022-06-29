<template>
    <div class="left-category">
        <div class="category-wrap">
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Football&league=${league}`)"
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Basketball&league=${league}`, false)"
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Baseball&league=${league}`)"
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Ice Hockey&league=${league}`)"
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
            <!-- <div class="category line" :class="{'active': showSport === 'Tennis'}" @click="expandCountry('Tennis')">
                <span class="category-icon">
                    <img src="/images/icon-tennis-gray.png" alt="테니스" title="테니스">
                </span>
                <span class="category-name">
                    테니스
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Tennis ? $numeral(countOfCategory.Tennis.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry.Tennis.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Tennis"
                :key="`Tennis-${country}-${index}`"
                v-show="showSport === 'Tennis'"
            >
                <span class="category-contry-icon" @click="expandLeague('Tennis', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Tennis', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Tennis', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Tennis.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Tennis' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Tennis.country[country].league"
                    :key="`Tennis-${country}-${league}-${j}`"
                    v-show="showCountry.Tennis.findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Tennis&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory.Tennis.country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div> -->
            <div class="category line" :class="{'active': showSport === 'Handball'}" @click="expandCountry('Handball')">
                <span class="category-icon">
                    <img src="/images/icon-handball-gray.png" alt="핸드볼" title="핸드볼">
                </span>
                <span class="category-name">
                    핸드볼
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Handball ? $numeral(countOfCategory.Handball.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry.Handball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Handball"
                :key="`Handball-${country}-${index}`"
                v-show="showSport === 'Handball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Handball', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Handball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Handball', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Handball.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Handball' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Handball.country[country].league"
                    :key="`Handball-${country}-${league}-${j}`"
                    v-show="showCountry.Handball.findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Handball&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory.Handball.country[country].league[league]).format('0,0') }}
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Volleyball&league=${league}`)"
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Rugby League&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Rugby Union'}" @click="expandCountry('Rugby Union')">
                <span class="category-icon">
                    <img src="/images/icon-rugbyunion-gray.png" alt="럭비유니언" title="럭비유니언">
                </span>
                <span class="category-name">
                    럭비유니언
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory['Rugby Union'] ? $numeral(countOfCategory['Rugby Union'].countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry['Rugby Union'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category['Rugby Union']"
                :key="`Rugby Union-${country}-${index}`"
                v-show="showSport === 'Rugby Union'"
            >
                <span class="category-contry-icon" @click="expandLeague('Rugby Union', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Rugby Union', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Rugby Union', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['Rugby Union'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Rugby Union' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['Rugby Union'].country[country].league"
                    :key="`Rugby Union-${country}-${league}-${j}`"
                    v-show="showCountry['Rugby Union'].findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Rugby Union&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory['Rugby Union'].country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>
            <div class="category line" :class="{'active': showSport === 'Boxing'}" @click="expandCountry('Boxing')">
                <span class="category-icon">
                    <img src="/images/icon-boxing-gray.png" alt="권투" title="권투">
                </span>
                <span class="category-name">
                    권투
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Boxing ? $numeral(countOfCategory.Boxing.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry.Boxing.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Boxing"
                :key="`Boxing-${country}-${index}`"
                v-show="showSport === 'Boxing'"
            >
                <span class="category-contry-icon" @click="expandLeague('Boxing', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Boxing', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Boxing', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Boxing.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Boxing' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Boxing.country[country].league"
                    :key="`Boxing-${country}-${league}-${j}`"
                    v-show="showCountry.Boxing.findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Boxing&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory.Boxing.country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>
            <!-- <div class="category line" :class="{'active': showSport === 'Table Tennis'}" @click="expandCountry('Table Tennis')">
                <span class="category-icon">
                    <img src="/images/icon-tabletennis-gray.png" alt="탁구" title="탁구">
                </span>
                <span class="category-name">
                    탁구
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory['Table Tennis'] ? $numeral(countOfCategory['Table Tennis'].countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div> -->
            <div
                class="category-country line-country"
                :class="showCountry['Table Tennis'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category['Table Tennis']"
                :key="`Table Tennis-${country}-${index}`"
                v-show="showSport === 'Table Tennis'"
            >
                <span class="category-contry-icon" @click="expandLeague('Table Tennis', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Table Tennis', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Table Tennis', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['Table Tennis'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Table Tennis' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['Table Tennis'].country[country].league"
                    :key="`Table Tennis-${country}-${league}-${j}`"
                    v-show="showCountry['Table Tennis'].findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Table Tennis&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory['Table Tennis'].country[country].league[league]).format('0,0') }}
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=MMA&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Golf'}" @click="expandCountry('Golf')">
                <span class="category-icon">
                    <img src="/images/icon-golf-gray.png" alt="골프" title="골프">
                </span>
                <span class="category-name">
                    골프
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Golf ? $numeral(countOfCategory.Golf.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry.Golf.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Golf"
                :key="`Golf-${country}-${index}`"
                v-show="showSport === 'Golf'"
            >
                <span class="category-contry-icon" @click="expandLeague('Golf', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Golf', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Golf', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Golf.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Golf' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Golf.country[country].league"
                    :key="`Golf-${country}-${league}-${j}`"
                    v-show="showCountry.Golf.findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Golf&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory.Golf.country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>
            <div class="category line" :class="{'active': showSport === 'Darts'}" @click="expandCountry('Darts')">
                <span class="category-icon">
                    <img src="/images/icon-darts-gray.png" alt="다트" title="다트">
                </span>
                <span class="category-name">
                    다트
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Darts ? $numeral(countOfCategory.Darts.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry.Darts.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Darts"
                :key="`Darts-${country}-${index}`"
                v-show="showSport === 'Darts'"
            >
                <span class="category-contry-icon" @click="expandLeague('Darts', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Darts', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Darts', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Darts.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Darts' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Darts.country[country].league"
                    :key="`Darts-${country}-${league}-${j}`"
                    v-show="showCountry.Darts.findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Darts&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory.Darts.country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>
            <!-- <div class="category line" :class="{'active': showSport === 'LoL'}" @click="expandCountry('LoL')">
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
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=LoL&league=${league}`)"
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
            </div> -->
            <div class="category line" :class="{'active': showSport === 'CS:GO'}" @click="expandCountry('CS:GO')">
                <span class="category-icon">
                    <img src="/images/icon-csgo-gray.png" alt="CS:GO" title="CS:GO">
                </span>
                <span class="category-name">
                    CS:GO
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory['CS:GO'] ? $numeral(countOfCategory['CS:GO'].countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry['CS:GO'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category['CS:GO']"
                :key="`CS:GO-${country}-${index}`"
                v-show="showSport === 'CS:GO'"
            >
                <span class="category-contry-icon" @click="expandLeague('CS:GO', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('CS:GO', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('CS:GO', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['CS:GO'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'CS:GO' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['CS:GO'].country[country].league"
                    :key="`CS:GO-${country}-${league}-${j}`"
                    v-show="showCountry['CS:GO'].findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=CS:GO&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory['CS:GO'].country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
                </div>
            </div>
            <div class="category line" :class="{'active': showSport === 'Dota 2'}" @click="expandCountry('Dota 2')">
                <span class="category-icon">
                    <img src="/images/icon-dota2-gray.png" alt="Dota 2" title="Dota 2">
                </span>
                <span class="category-name">
                    Dota 2
                </span>
                <span class="category-count">
                    <span class="count">
                        {{ countOfCategory['Dota 2'] ? $numeral(countOfCategory['Dota 2'].countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country line-country"
                :class="showCountry['Dota 2'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category['Dota 2']"
                :key="`Dota 2-${country}-${index}`"
                v-show="showSport === 'Dota 2'"
            >
                <span class="category-contry-icon" @click="expandLeague('Dota 2', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Dota 2', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Dota 2', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['Dota 2'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Dota 2' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['Dota 2'].country[country].league"
                    :key="`Dota 2-${country}-${league}-${j}`"
                    v-show="showCountry['Dota 2'].findIndex((x) => x === country) > -1"
                    @click="$tools.pushRouter(`/sportscross?page=1&sport=Dota 2&league=${league}`)"
                >
                    <span class="category-league-blank"></span>
                    <span class="category-league-content">
                        {{ $tools.cut(league, 13, '...') }}
                    </span>
                    <span class="category-league-count">
                        <span class="count">
                            {{ $numeral(countOfCategory['Dota 2'].country[country].league[league]).format('0,0') }}
                        </span>
                    </span>
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
                }
            }
        },
        methods: {
            ...mapActions([]),
            async getCategory() {
                const r = await this.$http.get('/api/get-category')
                if(r.error) return

                this.category = r.data.category
                this.countOfCategory = r.data.countOfCategory
                this.countryOID = r.data.countryOID
            },
            expandCountry(v) {
                if(this.showSport === v) {
                    this.showSport = ''
                    return
                }
                this.showSport = v
            },
            expandLeague(sport, v) {
                let index = this.showCountry[sport].findIndex((x) => x === v)
                if(index > -1) {
                    this.showCountry[sport].splice(index, 1)
                }
                else {
                    this.showCountry[sport].push(v)
                }
            }
        }
    }
</script>