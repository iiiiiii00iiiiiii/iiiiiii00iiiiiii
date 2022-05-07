<template>
    <div class="left-category">
        <div class="category-wrap">
            <div class="category line" :class="{'active': showSport === 'Football'}" @click="expandCountry('Football'); moveSports('Football')">
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

            <!-- 바로 아래꺼 :class="showCountry.Football.findIndex((x) => x === country) > -1 ? 'active' : ''" -->
            <div
                class="category-country line-country"
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.Football"
                :key="`Football-${country}-${index}`"
                v-show="showSport === 'Football'"
            >
                <span class="category-contry-icon" @click="expandLeague('Football', country); moveCountry('Football', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Football', country); moveCountry('Football', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Football', country); moveCountry('Football', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Football.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Football' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Football.country[country].league"
                    :key="`Football-${country}-${league}-${j}`"
                    v-show="showCountry.Football.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Football&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Basketball'}" @click="expandCountry('Basketball'); moveSports('Basketball')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.Basketball"
                :key="`Basketball-${country}-${index}`"
                v-show="showSport === 'Basketball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Basketball', country); moveCountry('Basketball', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Basketball', country); moveCountry('Basketball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Basketball', country); moveCountry('Basketball', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Basketball.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Basketball' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Basketball.country[country].league"
                    :key="`Basketball-${country}-${league}-${j}`"
                    v-show="showCountry.Basketball.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Basketball&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Baseball'}" @click="expandCountry('Baseball'); moveSports('Baseball')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.Baseball"
                :key="`Baseball-${country}-${index}`"
                v-show="showSport === 'Baseball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Baseball', country); moveCountry('Baseball', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Baseball', country); moveCountry('Baseball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Baseball', country); moveCountry('Baseball', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Baseball.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Baseball' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Baseball.country[country].league"
                    :key="`Baseball-${country}-${league}-${j}`"
                    v-show="showCountry.Baseball.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Baseball&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Ice Hockey'}" @click="expandCountry('Ice Hockey'); moveSports('Ice Hockey')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category['Ice Hockey']"
                :key="`Ice Hockey-${country}-${index}`"
                v-show="showSport === 'Ice Hockey'"
            >
                <span class="category-contry-icon" @click="expandLeague('Ice Hockey', country); moveCountry('Ice Hockey', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Ice Hockey', country); moveCountry('Ice Hockey', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Ice Hockey', country); moveCountry('Ice Hockey', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['Ice Hockey'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Ice Hockey' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['Ice Hockey'].country[country].league"
                    :key="`Ice Hockey-${country}-${league}-${j}`"
                    v-show="showCountry['Ice Hockey'].findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Ice Hockey&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Volleyball'}" @click="expandCountry('Volleyball'); moveSports('Volleyball')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.Volleyball"
                :key="`Volleyball-${country}-${index}`"
                v-show="showSport === 'Volleyball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Volleyball', country); moveCountry('Volleyball', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Volleyball', country); moveCountry('Volleyball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Volleyball', country); moveCountry('Volleyball', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Volleyball.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Volleyball' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Volleyball.country[country].league"
                    :key="`Volleyball-${country}-${league}-${j}`"
                    v-show="showCountry.Volleyball.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Volleyball&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Rugby League'}" @click="expandCountry('Rugby League'); moveSports('Rugby League')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category['Rugby League']"
                :key="`Rugby League-${country}-${index}`"
                v-show="showSport === 'Rugby League'"
            >
                <span class="category-contry-icon" @click="expandLeague('Rugby League', country); moveCountry('Rugby League', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Rugby League', country); moveCountry('Rugby League', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Rugby League', country); moveCountry('Rugby League', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory['Rugby League'].country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Rugby League' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory['Rugby League'].country[country].league"
                    :key="`Rugby League-${country}-${league}-${j}`"
                    v-show="showCountry['Rugby League'].findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Rugby League&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'LoL'}" @click="expandCountry('LoL'); moveSports('LoL')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.LoL"
                :key="`LoL-${country}-${index}`"
                v-show="showSport === 'LoL'"
            >
                <span class="category-contry-icon" @click="expandLeague('LoL', country); moveCountry('LoL', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('LoL', country); moveCountry('LoL', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('LoL', country); moveCountry('LoL', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.LoL.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'LoL' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.LoL.country[country].league"
                    :key="`LoL-${country}-${league}-${j}`"
                    v-show="showCountry.LoL.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=LoL&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'Handball'}" @click="expandCountry('Handball'); moveSports('Handball')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.Handball"
                :key="`Handball-${country}-${index}`"
                v-show="showSport === 'Handball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Handball', country); moveCountry('Handball', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('Handball', country); moveCountry('Handball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('Handball', country); moveCountry('Handball', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.Handball.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'Handball' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.Handball.country[country].league"
                    :key="`Handball-${country}-${league}-${j}`"
                    v-show="showCountry.Handball.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=Handball&countryKor=${country}&league=${league}`)"
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
            <div class="category line" :class="{'active': showSport === 'MMA'}" @click="expandCountry('MMA'); moveSports('MMA')">
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
                :class="selectCountry === country ? 'active' : ''"
                v-for="(v, country, index) in category.MMA"
                :key="`MMA-${country}-${index}`"
                v-show="showSport === 'MMA'"
            >
                <span class="category-contry-icon" @click="expandLeague('MMA', country); moveCountry('MMA', country)">
                    ◎
                </span>
                <span class="category-country-content" @click="expandLeague('MMA', country); moveCountry('MMA', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                    {{ country }}
                </span>
                <span class="category-country-count" @click="expandLeague('MMA', country); moveCountry('MMA', country)">
                    <span class="count">
                        {{ $numeral(countOfCategory.MMA.country[country].countOfGame).format('0,0') }}
                    </span>
                </span>
                <div
                    class="category-league line-league"
                    :class="{'mt-5px': j === 0, 'active': $route.query.sport === 'MMA' && $route.query.league === league}"
                    v-for="(vv, league, j) in countOfCategory.MMA.country[country].league"
                    :key="`MMA-${country}-${league}-${j}`"
                    v-show="showCountry.MMA.findIndex((x) => x === country) > -1 && selectCountry === country"
                    @click="$tools.pushRouter(`/sports?page=1&sport=MMA&countryKor=${country}&league=${league}`)"
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
            <!-- <div class="category line" :class="{'active': showSport === 'CS:GO'}" @click="expandCountry('CS:GO')">
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
                    @click="$tools.pushRouter(`/sports?page=1&sport=CS:GO&league=${league}`)"
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
            </div> -->
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
                selectCountry: ''
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
                if(this.selectCountry === v) {
                    this.selectCountry = ''
                }
                else {
                    this.selectCountry = v
                }

                let index = this.showCountry[sport].findIndex((x) => x === v)
                if(index > -1) {
                    this.showCountry[sport].splice(index, 1)
                }
                else {
                    this.showCountry[sport].push(v)
                }
            },
            moveSports(sport) {
                if(this.showSport === sport) {
                    this.$tools.pushRouter(`/sports?page=1&sport=${sport}&countryKor=&league=`)
                }
                else {
                    this.$tools.pushRouter('/sports')
                }
            },
            moveCountry(sport, country) {
                // console.log(this.showCountry)
                // console.log(country)

                if(this.selectCountry === country) {
                    this.$tools.pushRouter(`/sports?page=1&sport=${sport}&countryKor=${country}&league=`)
                }
                else {
                    this.$tools.pushRouter(`/sports?page=1&sport=${sport}`)
                }
            }
        }
    }
</script>