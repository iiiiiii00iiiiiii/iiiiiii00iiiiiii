<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.underOver1stInning && v.showConfig.underOver1stInning &&
            v.games.underOver1stInning.findIndex(x => x.status !== 'HIDE') > -1 &&
            v.games.underOver1stInning.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 1이닝 언더오버
        </div>
        <div class="row" :class="index > 0 && v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.underOver1stInning" :key="index">
            <div class="col-5 px-1" v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                        'can-bet': v.games.underOver1stInning[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'under') > -1
                    }"
                    @click="v.games.underOver1stInning[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOver1stInning',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'under',
                        selectRate: vv.underRate,
                        standard: vv.standard
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        언더
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.underRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1" v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                    }"
                >
                    {{ vv.standard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.underOver1stInning[index].showStatus && v.games.underOver1stInning[index].status !== 'HIDE'">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.underOver1stInning[index].status !== 'ACTIVE',
                        'can-bet': v.games.underOver1stInning[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver1stInning' && x.standard === vv.standard && x.select === 'over') > -1
                    }"
                    @click="v.games.underOver1stInning[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOver1stInning',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'over',
                        selectRate: vv.overRate,
                        standard: vv.standard
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(vv.overRate).format('0.00') }}
                    </div>
                    <div class="float-right pr-2 g-away-team-mobile">
                        오버
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'underOver1stInning',
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