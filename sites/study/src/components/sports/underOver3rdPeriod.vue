<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.underOver3rdPeriod && v.showConfig.underOver3rdPeriod"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 3피리어드 언더오버
        </div>
        <div class="row" :class="index > 0 && v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.underOver3rdPeriod" :key="index">
            <div class="col-5 px-1" v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'">
                <div
                    class="g-home can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'under') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOver3rdPeriod',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'under',
                        selectRate: vv.underRate,
                        standard: vv.standard
                    })"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        언더
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.underRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1" v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'">
                <div class="g-x">
                    {{ vv.standard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.underOver3rdPeriod[index].showStatus && v.games.underOver3rdPeriod[index].status !== 'HIDE'">
                <div
                    class="g-away can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'underOver3rdPeriod' && x.standard === vv.standard && x.select === 'over') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'underOver3rdPeriod',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'over',
                        selectRate: vv.overRate,
                        standard: vv.standard
                    })"
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
    name: 'underOver3rdPeriod',
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