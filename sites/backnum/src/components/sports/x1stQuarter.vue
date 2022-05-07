<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.x1stQuarter && v.showConfig.x1stQuarter && v.games.x1stQuarter[0].status === 'ACTIVE' && v.games.x1stQuarter[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 1쿼터 승무패
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'home') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x1stQuarter',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: v.games.x1stQuarter[0].homeRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.x1stQuarter[0].homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'can-bet': v.games.x1stQuarter[0].drawRate,
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'draw') > -1
                    }"
                    @click="v.games.x1stQuarter[0].drawRate ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x1stQuarter',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'draw',
                        selectRate: v.games.x1stQuarter[0].drawRate,
                        standard: null
                    }) : null"
                >
                    {{ v.games.x1stQuarter[0].drawRate ? $numeral(v.games.x1stQuarter[0].drawRate).format('0.00') : 'vs' }}
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x1stQuarter' && x.standard === null && x.select === 'away') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x1stQuarter',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: v.games.x1stQuarter[0].awayRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.x1stQuarter[0].awayRate).format('0.00') }}
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
    name: 'x1stQuarter',
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