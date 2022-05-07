<template>
    <div class="left-category">
        <div class="category-wrap">
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/powerball', false)">
                <span class="category-icon">
                    <img src="/images/icon-powerball.png" alt="파워볼" title="파워볼">
                </span>
                <span class="category-name">
                    파워볼
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/powerladder', false)">
                <span class="category-icon">
                    <img src="/images/icon-powerladder.png" alt="파워 사다리" title="파워 사다리">
                </span>
                <span class="category-name">
                    파워 사다리
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/kenoladder', false)">
                <span class="category-icon">
                    <img src="/images/icon-kenoladder.png" alt="키노 사다리" title="키노 사다리">
                </span>
                <span class="category-name">
                    키노 사다리
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/boglepowerball', false)">
                <span class="category-icon">
                    <img src="/images/icon-boglePowerball.png" alt="보글 파워볼" title="보글 파워볼">
                </span>
                <span class="category-name">
                    보글 파워볼
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/bogleladder', false)">
                <span class="category-icon">
                    <img src="/images/icon-boglePowerball.png" alt="보글 사다리" title="보글 사다리">
                </span>
                <span class="category-name">
                    보글 사다리
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/googlepowerball1', false)">
                <span class="category-icon">
                    <img src="/images/icon-googlePowerball1.png" alt="구글 1분 파워볼" title="구글 1분 파워볼">
                </span>
                <span class="category-name">
                    구글 1분 파워볼
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
            </div>
            <div class="category line-bottom py-1" @click="$tools.pushRouter('/googlepowerball3', false)">
                <span class="category-icon">
                    <img src="/images/icon-googlePowerball3.png" alt="구글 3분 파워볼" title="구글 3분 파워볼">
                </span>
                <span class="category-name">
                    구글 3분 파워볼
                </span>
                <!-- <span class="category-count">
                    <span class="count">
                        {{ countOfCategory.Football ? $numeral(countOfCategory.Football.countOfGame).format('0,0') : 0 }}
                    </span>
                </span> -->
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