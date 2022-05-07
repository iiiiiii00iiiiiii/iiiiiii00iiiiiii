<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="quick-menu-box">
                    <div class="quick-menu-title">
                        Qulck Menu
                    </div>
                    <div class="battery">
                        <div class="battery-charging" @click="$tools.routerPush('charging')">
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <img src="/images/ns-battery-1.png">
                                충전신청
                            </div>
                        </div>
                        <div class="battery-exchange" @click="$tools.routerPush('exchange')">
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <img src="/images/ns-battery-2.png">
                                환전신청
                            </div>
                        </div>
                    </div>
                    <div class="quick-menu-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span @click="link('sportscross')">국내형</span>
                                    </td>
                                    <td>
                                        <span @click="link('sportsspecial')">스페셜</span>
                                    </td>
                                    <td>
                                        <span @click="link('sportslivekor')">실시간</span>
                                    </td>
                                    <td>
                                        <span @click="openGame('evolution_9')">에볼루션</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span @click="$tools.ready()">슬롯게임</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('sportsresult')">경기결과</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('notice')">공지사항</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('exchangecasino')">머니이동</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span @click="$tools.routerPush('event')">이벤트</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('faq')">FAQ</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.ready()">이용규정</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('Help')">고객센터</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span @click="$tools.routerPush('betlist')">배팅내역</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('help')">1:1문의</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('attendance')">출석체크</span>
                                    </td>
                                    <td>
                                        <span @click="$tools.routerPush('frienddetails')">지인현황</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="category-box mt-xl-2">
                    <div class="category-title">
                        BET Cloud
                    </div>
                    <div class="category-search-form">
                        <input type="text" class="input-search" placeholder="검색">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </div>
                    <div class="category-tmp">
                         <div class="row">
                             <div class="col-2">
                                 <img src="/images/sports-icon.png" class="img-fluid">
                             </div>
                            <div
                                class="col-10 sports-menu"
                                :class="select === 1 ? 'active' : ''"
                                @click="change(1)"
                            >
                                스포츠
                            </div>
                            <div class="col-12" v-show="select === 1">
                                <!-- 축구 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Football'}" @click="expandCountry('Football')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-football.png">
                                        </div>
                                        <div class="col-7">
                                            축구
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Football ? countOfCategory.Football.countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry.Football.findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category.Football"
                                    :key="`Football-${i}`"
                                    v-show="drSport === 'Football'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Football', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Football', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Football', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Football.country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry.Football.findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory.Football.country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Football&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Football' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory.Football.country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 농구 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Basketball'}" @click="expandCountry('Basketball')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-basketball.png">
                                        </div>
                                        <div class="col-7">
                                            농구
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Basketball ? countOfCategory.Basketball.countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry.Basketball.findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category.Basketball"
                                    :key="`Basketball-${i}`"
                                    v-show="drSport === 'Basketball'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Basketball', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Basketball', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Basketball', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Basketball.country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry.Basketball.findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory.Basketball.country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Basketball&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Basketball' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory.Basketball.country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 야구 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Baseball'}" @click="expandCountry('Baseball')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-baseball.png">
                                        </div>
                                        <div class="col-7">
                                            야구
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Baseball ? countOfCategory.Baseball.countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry.Baseball.findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category.Baseball"
                                    :key="`Baseball-${i}`"
                                    v-show="drSport === 'Baseball'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Baseball', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Baseball', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Baseball', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Baseball.country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry.Baseball.findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory.Baseball.country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Baseball&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Baseball' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory.Baseball.country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 배구 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Volleyball'}" @click="expandCountry('Volleyball')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-volleyball.png">
                                        </div>
                                        <div class="col-7">
                                            배구
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Volleyball ? countOfCategory.Volleyball.countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry.Volleyball.findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category.Volleyball"
                                    :key="`Volleyball-${i}`"
                                    v-show="drSport === 'Volleyball'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Volleyball', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Volleyball', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Volleyball', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory.Volleyball.country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry.Volleyball.findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory.Volleyball.country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Volleyball&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Volleyball' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory.Volleyball.country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 아이스하키 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Ice Hockey'}" @click="expandCountry('Ice Hockey')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-icehockey.png">
                                        </div>
                                        <div class="col-7">
                                            아이스하키
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory['Ice Hockey'] ? countOfCategory['Ice Hockey'].countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry['Ice Hockey'].findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category['Ice Hockey']"
                                    :key="`Ice Hockey-${i}`"
                                    v-show="drSport === 'Ice Hockey'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Ice Hockey', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Ice Hockey', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Ice Hockey', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory['Ice Hockey'].country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry['Ice Hockey'].findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory['Ice Hockey'].country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Ice Hockey&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Ice Hockey' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory['Ice Hockey'].country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 미식축구 -->
                                <div class="category-tmp" :class="{'active': drSport === 'Rugby Usa'}" @click="expandCountry('Rugby Usa')">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="category-img" src="/images/icon-rugbyusa.png">
                                        </div>
                                        <div class="col-7">
                                            미식축구
                                        </div>
                                        <div class="col-3 text-right">
                                            <span class="badge badge-count">
                                                {{ countOfCategory['Rugby Usa'] ? countOfCategory['Rugby Usa'].countOfGame : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="category-country"
                                    :class="{'active': drCountry['Rugby Usa'].findIndex((x) => x === country) > -1}"
                                    v-for="(v, country, i) in category['Rugby Usa']"
                                    :key="`Rugby Usa-${i}`"
                                    v-show="drSport === 'Rugby Usa'"
                                >
                                    <div class="row">
                                        <div class="col-2 text-right c-blank" @click="expandLeague('Rugby Usa', country)">
                                            ◎
                                        </div>
                                        <div class="col-7 c-country" @click="expandLeague('Rugby Usa', country)">
                                            <img class="category-country-img mr-1" :src="`http://img.thvmxm.com/${countryOID[country]}.png`">
                                            {{ country }}
                                        </div>
                                        <div class="col-3 text-right c-count" @click="expandLeague('Rugby Usa', country)">
                                            <span class="badge badge-count">
                                                {{ countOfCategory['Rugby Usa'].country[country].countOfGame }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-12 px-4"
                                            v-show="drCountry['Rugby Usa'].findIndex((x) => x === country) > -1"
                                        >
                                            <div
                                                class="row category-league-tmp"
                                                v-for="(vv, league, j) in countOfCategory['Rugby Usa'].country[country].league" :key="j"
                                                @click="link(`sports?page=1&sport=Rugby Usa&league=${league}`)"
                                            >
                                                <div class="col-2"></div>
                                                <div
                                                    class="col-7 l-league"
                                                    :class="{'active': $route.query.sport === 'Rugby Usa' && $route.query.league === league}"
                                                    :title="league"
                                                >
                                                    > {{ league }}
                                                </div>
                                                <div class="col-3 text-right">
                                                    <span class="badge badge-count">
                                                        {{ countOfCategory['Rugby Usa'].country[country].league[league] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="category-tmp">
                         <div class="row">
                             <div class="col-2">
                                 <img src="/images/mini-game-icon.png" class="img-fluid">
                             </div>
                            <div 
                                class="col-10 sports-menu"
                                :class="select === 2? 'active' : ''"
                                @click="change(2)"
                            >
                                미니게임
                             </div>
                             <div class="col-12" v-show="select === 2">
                                <div class="row category-tmp" @click="link('powerball')">
                                    <div class="col-2">
                                        <img src="/images/icon-powerball.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        파워볼
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="link('powerladder')">
                                    <div class="col-2">
                                        <img src="/images/icon-powerladder.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        파워사다리
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="link('kenoladder')">
                                    <div class="col-2">
                                        <img src="/images/icon-keno-ladder.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        키노사다리
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="$tools.ready()">
                                    <div class="col-2">
                                        <img src="/images/icon-bubble.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        보글파워볼
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="$tools.ready()">
                                    <div class="col-2">
                                        <img src="/images/icon-bubble.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        보글사다리
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="$tools.ready()">
                                    <div class="col-2">
                                        <img src="/images/icon-google.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        구글 1분 파워볼
                                    </div>
                                </div>
                                <div class="row category-tmp" @click="$tools.ready()">
                                    <div class="col-2">
                                        <img src="/images/icon-google.png" class="category-img">
                                    </div>
                                    <div class="col-10">
                                        구글 3분 파워볼
                                    </div>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Category',
    data() {
        return {
            select: 0 ,
            category: {},
            countOfCategory: {},
            countryOID: {},
            drSport: '',
            drCountry: {
                Football: [],
                Basketball: [],
                Baseball: [],
                Volleyball: [],
                'Ice Hockey': [],
                Tennis: [],
                'Table Tennis': [],
                Darts: [],
                Boxing: [],
                MMA: [],
                'Rugby League': [],
                'Rugby Union': [],
                Golf: [],
                Handball: [],
                'CS:GO': [],
                'Dota 2': [],
                LoL: [],
                FIFA: []
            },
        }
    },
    created() {
        this.getCategory()
    },
    methods: {
        async getCategory() {
            let rCategory = await this.$http.get('/api/category')
            if(rCategory.error) return

            //구현부분
            this.category = rCategory.data.category
            this.countOfCategory = rCategory.data.countOfCategory
            this.countryOID = rCategory.data.countryOID
        },
        expandCountry(v) {
            if(this.drSport === v) {
                this.drSport = ''
                return
            }
            this.drSport = v
        },
        expandLeague(sport, v) {
            let index = this.drCountry[sport].findIndex((x) => x === v)
            if(index > -1) {
                this.drCountry[sport].splice(index, 1)
            }
            else {
                this.drCountry[sport].push(v)
            }
        },
        link(link) {
            if(link === 'ready') {
                this.$tools.ready()
                return
            }

            if(!this.isLogin) {
                this.showModalLogin = true
                this.$tools.routerPush('/')
                return
            }
            // if(link === 'mypage') {
            //     this.showModalMyPage = true
            //     return
            // }
            // if(link === 'pointExchange') {
            //     this.showModalPoint = true
            //     return
            // }
            // if(link === 'notice') {
            //     this.showModalNotice = true
            //     return
            // }
            // if(link === 'event') {
            //     this.showModalEvent = true
            //     return
            // }
            // if(link === 'message') {
            //     this.showModalMessage = true
            //     return
            // }
            // if(link === 'point') {
            //     this.showModalPointHistory = true
            //     return
            // }
            // if(link === 'charge') {
            //     this.showModalCharge = true
            //     return
            // }
            // if(link === 'exchange') {
            //     this.showModalExchange = true
            //     return
            // }
            // if(link === 'help') {
            //     this.showModalHelp = true
            //     return
            // }
            // if(link === 'free') {
            //     this.showModalFree = true
            //     return
            // }
            // if(link === 'casino') {
            //     this.casinoMode = link
            //     this.showModalCasino = true
            //     return
            // }
            // if(link === 'slot') {
            //     this.casinoMode = link
            //     this.showModalCasino = true
            //     return
            // }
            // if(link === 'sportsBetList') {
            //     this.showModalSportsBetList = true
            //     return
            // }
            // if(link === 'minigamesBetList') {
            //     this.showModalMinigamesBetList = true
            //     return
            // }
            // if(link === 'sportsResult') {
            //     this.showModalSportsResult = true
            //     return
            // }
            // if(link === 'recommend') {
            //     this.showModalRecommend = true
            //     return
            // }
            // if(link === 'exchangeCasino') {
            //     this.showModalExchangeCasino = true
            //     return
            // }
            // if(link === 'attendance') {
            //     this.showModalAttendance = true
            //     return
            // }
            // if(link === 'guide') {
            //     this.showModalGuide = true
            //     return
            // }

            this.$tools.routerPush(`/${link}`)
        },
        async openGame(id) {
            let res = await this.$http.get('/api/casino-url', { id: id, kind: 'casino' })
            if(res.error) return

            id = window.open(res.data.url, 'casino', '_blank')
        },
        change(i) {
            this.select = i
        },
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        },
        thisRouter() {
            return this.$store.state.router
        },
        showModalLogin: {
            get() {
                return this.$store.state.showModalLogin
            },
            set(isShow) {
                this.$store.commit('setShowModalLogin', isShow)
            }
        },
        showModalJoin: {
            get() {
                return this.$store.state.showModalJoin
            },
            set(isShow) {
                this.$store.commit('setShowModalJoin', isShow)
            }
        },
        // showModalMyPage: {
        //     get() {
        //         return this.$store.state.showModalMyPage
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalMyPage', isShow)
        //     }
        // },
        // showModalPoint: {
        //     get() {
        //         return this.$store.state.showModalPoint
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalPoint', isShow)
        //     }
        // },
        // showModalNotice: {
        //     get() {
        //         return this.$store.state.showModalNotice
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalNotice', isShow)
        //     }
        // },
        // showModalEvent: {
        //     get() {
        //         return this.$store.state.showModalEvent
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalEvent', isShow)
        //     }
        // },
        // showModalMessage: {
        //     get() {
        //         return this.$store.state.showModalMessage
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalMessage', isShow)
        //     }
        // },
        // showModalPointHistory: {
        //     get() {
        //         return this.$store.state.showModalPointHistory
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalPointHistory', isShow)
        //     }
        // },
        // showModalCharge: {
        //     get() {
        //         return this.$store.state.showModalCharge
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalCharge', isShow)
        //     }
        // },
        // showModalExchange: {
        //     get() {
        //         return this.$store.state.showModalExchange
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalExchange', isShow)
        //     }
        // },
        // showModalHelp: {
        //     get() {
        //         return this.$store.state.showModalHelp
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalHelp', isShow)
        //     }
        // },
        // showModalFree: {
        //     get() {
        //         return this.$store.state.showModalFree
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalFree', isShow)
        //     }
        // },
        // showModalCasino: {
        //     get() {
        //         return this.$store.state.showModalCasino
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalCasino', isShow)
        //     }
        // },
        // showModalSportsBetList: {
        //     get() {
        //         return this.$store.state.showModalSportsBetList
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalSportsBetList', isShow)
        //     }
        // },
        // showModalMinigamesBetList: {
        //     get() {
        //         return this.$store.state.showModalMinigamesBetList
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalMinigamesBetList', isShow)
        //     }
        // },
        // showModalSportsResult: {
        //     get() {
        //         return this.$store.state.showModalSportsResult
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalSportsResult', isShow)
        //     }
        // },
        // showModalRecommend: {
        //     get() {
        //         return this.$store.state.showModalRecommend
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalRecommend', isShow)
        //     }
        // },
        // casinoMode: {
        //     get() {
        //         return this.$store.state.casinoMode
        //     },
        //     set(mode) {
        //         this.$store.commit('setCasinoMode', mode)
        //     }
        // },
        // showModalExchangeCasino: {
        //     get() {
        //         return this.$store.state.showModalExchangeCasino
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalExchangeCasino', isShow)
        //     }
        // },
        // showModalAttendance: {
        //     get() {
        //         return this.$store.state.showModalAttendance
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalAttendance', isShow)
        //     }
        // },
        // showModalGuide: {
        //     get() {
        //         return this.$store.state.showModalGuide
        //     },
        //     set(isShow) {
        //         this.$store.commit('setShowModalGuide', isShow)
        //     }
        // },
        money() {
            return this.$store.state.user.money
        },
        point() {
            return this.$store.state.user.point
        },
    }
}
</script>

<style lang="scss" scoped>

.quick-menu-box {
    border-radius: 5px 5px 0px 0px;
    border: 1px solid #2d2d2d;
    color: #fff;
    font-weight: 600;

    .quick-menu-title {
        background-color: #151e2d;
        font-size: 1.25rem;
        text-indent: 10px;
    }
    .battery {
        background: linear-gradient(rgb(27, 39, 48), rgb(22, 31, 44));
        box-shadow: inset 0px 0px 10px rgba(200, 155, 245, 0.20);
        font-size: 1.25rem;
        cursor: pointer;


        .battery-charging {
            border: 1px solid #525558;
            position: relative;

            &:hover , :active {
                span:nth-child(1) {
                    width: 100%;
                }
                span:nth-child(2) {
                    height: 100%;

                }
                span:nth-child(3) {
                    width: 100%;

                }
                span:nth-child(4) {
                    height: 100%;

                }
            }
            span {
                display: block;
                position: absolute;
                background: #5dc84e;
                transition: all .5s;
                z-index: 2;

                &:nth-child(1) {
                    top: 0;
                    height: 2px;
                    width: 0;
                }
                &:nth-child(2) {
                    top: 0;
                    right: 0;
                    height: 0;
                    width: 2px;
                }
                &:nth-child(3) {
                    bottom: 0;
                    right: 0;
                    height: 2px;
                    width: 0;
                }
                &:nth-child(4) {
                    bottom: 0;
                    left: 0;
                    height: 0;
                    width: 2px;
                }
            }

        }

        .battery-exchange {
            position: relative;
            border: 1px solid #525558;


            &:hover , :active {
                span:nth-child(1) {
                    width: 100%;
                }
                span:nth-child(2) {
                    height: 100%;

                }
                span:nth-child(3) {
                    width: 100%;

                }
                span:nth-child(4) {
                    height: 100%;

                }
            }
            span {
                display: block;
                position: absolute;
                background: #ff1616;
                transition: all .5s;
                z-index: 2;

                &:nth-child(1) {
                    top: 0;
                    height: 2px;
                    width: 0;
                }
                &:nth-child(2) {
                    top: 0;
                    right: 0;
                    height: 0;
                    width: 2px;
                }
                &:nth-child(3) {
                    bottom: 0;
                    right: 0;
                    height: 2px;
                    width: 0;
                }
                &:nth-child(4) {
                    bottom: 0;
                    left: 0;
                    height: 0;
                    width: 2px;
                }
            }

        }

        img {
            width: 160px;
        }
    }

    .quick-menu-table {
        background-color: #141414;
        font-size: 0.75rem;


        table {
            text-align: center;
            width: 280px;
            height: 130px;

            span {
                display: block;
                cursor: pointer;
                padding-left: 15px;

                &:hover , :active {
                    color: #02996a;
                    transition: all linear 0.3s;
                    transform: scale(1.5);
                }
            }
        }
    }
}

.category-box {
    background-color: #131313;
    background-image: url(/images/ns-leftsidemenu-bg.jpg);
    background-repeat: none;
    background-size: cover;
    border-radius: 5px 5px 0px 0px;
    font-size: 0.875rem;
    //padding-top: 10px;


    .category-title {
        background-color: #151e2d;
        border-radius: 5px 5px 0px 0px;
        color: #fff;
        font-weight: 600;
        padding: 10px;
        //border-radius: 8px 8px 0 0;
    }
    .category-search-form {
        background-color: #20262c;
        color: #fff;
        font-weight: 600;
        padding: 10px;
        border-radius: 0 0 5px 5px;

        .input-search {
            background-color: #1a1a1a;
            border-radius: 5px;
            border: 0;
            width: 100%;
            height: 33px;
            color: #fff;
            padding-left: 40px;
            font-weight: 600;

            &::placeholder {
                color: #fff;
            }

            &:focus {
                outline: none;
            }
        }

        .bi-search {
            position: absolute;
            left: 25px;
            top: 365px;

            @media (min-width: 1200px) {
                left: 25px;
                top: 375px;
            }
        }
    }
}

    .category-live, .category-top, .category-hot {
        background-color: #191c1f91;
        border-radius: 3px;
        padding: 8px 10px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;

         &:hover, :active {
            opacity: .50;
            color: #b6b7d3;
        }

        .text-live{
            background-color: #007def;
            border-radius: 5px;
            padding: 2px 7px;
            font-weight: 600;
        }
        .live-numbes {
            border: 1px solid #0085ff;
            color: #0085ff;
        }
        .text-top {
            background-color: #07f8be;
            border-radius: 5px;
            padding: 2px 7px;
            font-weight: 600;
        }
        .top-number{
            color: #07f8be;
            border: 1px solid #07f8be;
        }
        .text-hot{
            background-color: #db1111;
            border-radius: 5px;
            padding: 2px 7px;
            font-weight: 600;
        }
        .hot-number {
            color: #db1111;
            border: 1px solid #db1111;
        }
    }
    .category-tmp {
        border-top: 2px solid #191919;
        padding: 8px 10px;
        background-color: #191c1f91;
        color: #fff;
        font-weight: 600;
        cursor: pointer;

        .category-img {
            width: 24px;
            vertical-align: top;
        }

        &:hover, &.active {
            color: #28ead5;

            .k-count {
                .badge-count{
                    color: #b6b7d3;
                }
            }
        }
    }
    .category-country {
        border-top: 1px solid #191919;
        padding: 0 10px;
        background-color: #191c1f;
        color: #fff;
        cursor: pointer;

        .category-country-img {
            width: 20px;
        }

        &:hover, &.active {
            background-color: #191c1f;
            color: #b6b7d3;
            opacity: .50;

            .c-count {
                .badge-count{
                    color: #b6b7d3;
                }
            }
        }

        .c-blank, .c-country, .c-count {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .category-league-tmp {
            padding: 10px 0;
            background-color: #191c1f;

            &:hover, &.active {
                background-color: #191c1f;
                color: #b6b7d3;

                .l-count {
                    .badge-count{
                        color: #b6b7d3;
                    }
                }
            }

            .l-league {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .badge-count {
        background-color: #000;
        color: #fff;
        min-width: 50px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-weight: 600;
        font-size: 100%;
    }
.sports-menu {
    font-size: 1rem;
    padding: 5px 10px;

    &:hover, &.active {
        color: #02996a;
        padding: 8px 10px;
    }
}
</style>

<style>
    [v-cloak] { display:none }
</style>