<template>
    <div class="left-category">
        <div class="category-wrap">
            <div class="category line-bottom py-1" :class="{'active': router === 'EosPowerball1'}" @click="$tools.pushRouter('/eospowerball1', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-8.png" alt="이오스 1분 파워볼" title="이오스 1분 파워볼">
                </span>
                <span class="category-name">
                    이오스 1분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'EosPowerball3'}" @click="$tools.pushRouter('/eospowerball3', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-8.png" alt="이오스 3분 파워볼" title="이오스 3분 파워볼">
                </span>
                <span class="category-name">
                    이오스 3분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'EosPowerball'}" @click="$tools.pushRouter('/eospowerball', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-8.png" alt="이오스 5분 파워볼" title="이오스 5분 파워볼">
                </span>
                <span class="category-name">
                    이오스 5분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'BoglePowerball'}" @click="$tools.pushRouter('/boglepowerball', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-5.png" alt="보글 파워볼" title="보글 파워볼">
                </span>
                <span class="category-name">
                    보글 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'Bogleladder'}" @click="$tools.pushRouter('/bogleladder', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-5.png" alt="보글 사다리" title="보글 사다리">
                </span>
                <span class="category-name">
                    보글 사다리
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'Speedladder'}" @click="$tools.pushRouter('/speedladder', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-4.png" alt="스피드 사다리" title="스피드 사다리">
                </span>
                <span class="category-name">
                    스피드 사다리
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'CoinPowerball3'}" @click="$tools.pushRouter('/coinpowerball3', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-7.png" alt="코인 3분 파워볼" title="코인 3분 파워볼">
                </span>
                <span class="category-name">
                    코인 3분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'CoinPowerball'}" @click="$tools.pushRouter('/coinpowerball', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-7.png" alt="코인 5분 파워볼" title="코인 5분 파워볼">
                </span>
                <span class="category-name">
                    코인 5분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'GooglePowerball1'}" @click="$tools.pushRouter('/googlepowerball1', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-6.png" alt="구글 1분 파워볼" title="구글 1분 파워볼">
                </span>
                <span class="category-name">
                    구글 1분 파워볼
                </span>
            </div>
            <div class="category line-bottom py-1" :class="{'active': router === 'GooglePowerball3'}" @click="$tools.pushRouter('/googlepowerball3', false)">
                <span class="category-icon">
                    <img src="/images/icon-nav-minigame-6.png" alt="구글 3분 파워볼" title="구글 3분 파워볼">
                </span>
                <span class="category-name">
                    구글 3분 파워볼
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'LeftMinigameCategory',
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