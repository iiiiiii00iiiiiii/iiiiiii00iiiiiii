<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.handicap9thInning && v.showConfig.handicap9thInning &&
            v.games.handicap9thInning.findIndex(x => x.status !== 'HIDE') > -1 &&
            v.games.handicap9thInning.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 9이닝 핸디캡
        </div>
        <div class="row" :class="index > 0 && v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.handicap9thInning" :key="index">
            <div class="col-5 px-1" v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.handicap9thInning[index].status !== 'ACTIVE',
                        'can-bet': v.games.handicap9thInning[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap9thInning' && x.standard === vv.homeStandard && x.select === 'home') > -1
                    }"
                    @click="v.games.handicap9thInning[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicap9thInning',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: vv.homeRate,
                        standard: vv.homeStandard
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1" v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.handicap9thInning[index].status !== 'ACTIVE'
                    }"
                >
                    {{ vv.homeStandard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.handicap9thInning[index].showStatus && v.games.handicap9thInning[index].status !== 'HIDE'">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.handicap9thInning[index].status !== 'ACTIVE',
                        'can-bet': v.games.handicap9thInning[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap9thInning' && x.standard === vv.homeStandard && x.select === 'away') > -1
                    }"
                    @click="v.games.handicap9thInning[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicap9thInning',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: vv.awayRate,
                        standard: vv.homeStandard
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(vv.awayRate).format('0.00') }}
                    </div>
                    <div class="float-right pr-2 g-away-team-mobile">
                        {{ v.awayTeamKor ? v.awayTeamKor : v.awayTeam }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'handicap9thInning',
    props: {
        v: {
            type: Object
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    computed: {
        betCart: {
            get() {
                return this.$store.state.betCart
            },
            set(v) {
                this.$store.commit('setBetCart', v)
            }
        }
    }
}
</script>