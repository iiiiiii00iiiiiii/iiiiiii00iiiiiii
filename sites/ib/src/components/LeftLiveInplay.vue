<template>
    <div class="left-category">
        <div class="left-live-header">
            <span>
                <font-awesome-icon :icon="['fa', 'bell']"/> 실시간 Live
            </span>
            <span>
                {{ $moment().format('YYYY-MM-DD')}}
            </span>
        </div>
        <div class="left-game-list">
            <div class="game-item" :class="{'active': showSport === 'Football'}" @click="expandCountry('Football')">
                <span class="game-icon ">
                    <img src="/images/icon-football-gray.png" alt="축구" title="축구">
                </span>
                <span class="game-name">
                    축구
                </span>
                <span class="game-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country"
                :class="showCountry.Football.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Football"
                :key="`Football-${country}-${index}`"
                v-show="showSport === 'Football'"
            >
                <span class="category-contry-icon" @click="expandLeague('Football', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                </span>
                <span class="category-country-content" @click="expandLeague('Football', country)">
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
            <div class="game-item" :class="{'active': showSport === 'Basketball'}" @click="expandCountry('Basketball')">
                <span class="game-icon ">
                    <img src="/images/icon-basketball-gray.png" alt="농구" title="농구">
                </span>
                <span class="game-name">
                    농구
                </span>
                <span class="game-count">
                    <span class="count">
                        {{ countOfCategory.Basketball ? $numeral(countOfCategory.Basketball.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country"
                :class="showCountry.Basketball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Basketball"
                :key="`Basketball-${country}-${index}`"
                v-show="showSport === 'Basketball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Basketball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                </span>
                <span class="category-country-content" @click="expandLeague('Basketball', country)">
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
            <div class="game-item" :class="{'active': showSport === 'Baseball'}" @click="expandCountry('Baseball')">
                <span class="game-icon ">
                    <img src="/images/icon-baseball-gray.png" alt="야구" title="야구">
                </span>
                <span class="game-name">
                    야구
                </span>
                <span class="game-count">
                    <span class="count">
                        {{ countOfCategory.Baseball ? $numeral(countOfCategory.Baseball.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country"
                :class="showCountry.Baseball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Baseball"
                :key="`Baseball-${country}-${index}`"
                v-show="showSport === 'Baseball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Baseball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                </span>
                <span class="category-country-content" @click="expandLeague('Baseball', country)">
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
            <div class="game-item" :class="{'active': showSport === 'Volleyball'}" @click="expandCountry('Volleyball')">
                <span class="game-icon ">
                    <img src="/images/icon-volleyball-gray.png" alt="배구" title="배구">
                </span>
                <span class="game-name">
                    배구
                </span>
                <span class="game-count">
                    <span class="count">
                        {{ countOfCategory.Volleyball ? $numeral(countOfCategory.Volleyball.countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country"
                :class="showCountry.Volleyball.findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category.Volleyball"
                :key="`Volleyball-${country}-${index}`"
                v-show="showSport === 'Volleyball'"
            >
                <span class="category-contry-icon" @click="expandLeague('Volleyball', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                </span>
                <span class="category-country-content" @click="expandLeague('Volleyball', country)">
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
            <div class="game-item" :class="{'active': showSport === 'Ice Hockey'}" @click="expandCountry('Ice Hockey')">
                <span class="game-icon ">
                    <img src="/images/icon-icehockey-gray.png" alt="아이스하키" title="아이스하키">
                </span>
                <span class="game-name">
                    아이스하키
                </span>
                <span class="game-count">
                    <span class="count">
                        {{ countOfCategory['Ice Hockey'] ? $numeral(countOfCategory['Ice Hockey'].countOfGame).format('0,0') : 0 }}
                    </span>
                </span>
            </div>
            <div
                class="category-country"
                :class="showCountry['Ice Hockey'].findIndex((x) => x === country) > -1 ? 'active' : ''"
                v-for="(v, country, index) in category['Ice Hockey']"
                :key="`Ice Hockey-${country}-${index}`"
                v-show="showSport === 'Ice Hockey'"
            >
                <span class="category-contry-icon" @click="expandLeague('Ice Hockey', country)">
                    <img class="country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                </span>
                <span class="category-country-content" @click="expandLeague('Ice Hockey', country)">
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
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'LeftLiveInplay',
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