<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.underOverFirst5Innings && v.showConfig.underOverFirst5Innings &&
            v.games.underOverFirst5Innings.findIndex(x => x.status !== 'HIDE') > -1 &&
            v.games.underOverFirst5Innings.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 첫 5이닝 언더오버
        </div>
        <div class="row" :class="index > 0 && v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.underOverFirst5Innings" :key="index">
            <div class="col-5 px-1" v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                        'can-bet': v.games.underOverFirst5Innings[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'under') > -1
                    }"
                    @click="v.games.underOverFirst5Innings[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOverFirst5Innings',
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
            <div class="col-2 px-1" v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                    }"
                >
                    {{ vv.standard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.underOverFirst5Innings[index].showStatus && v.games.underOverFirst5Innings[index].status !== 'HIDE'">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.underOverFirst5Innings[index].status !== 'ACTIVE',
                        'can-bet': v.games.underOverFirst5Innings[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOverFirst5Innings' && x.standard === vv.standard && x.select === 'over') > -1
                    }"
                    @click="v.games.underOverFirst5Innings[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOverFirst5Innings',
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
    name: 'underOverFirst5Innings',
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