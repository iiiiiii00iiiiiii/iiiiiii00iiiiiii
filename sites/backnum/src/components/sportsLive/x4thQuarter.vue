<template>
    <div class="col-12 mt-3" v-if="v.games.x4thQuarter && v.showConfig.x4thQuarter && v.games.x4thQuarter[0].status !== 'HIDE' && v.games.x4thQuarter[0].showStatus">
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 4쿼터 승무패
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                        'can-bet': v.games.x4thQuarter[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'home') > -1
                    }"
                    @click="v.games.x4thQuarter[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: v.games.x4thQuarter[0].homeRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.x4thQuarter[0].homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                        'can-bet': v.games.x4thQuarter[0].drawRate && v.games.x4thQuarter[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'draw') > -1
                    }"
                    @click="v.games.x4thQuarter[0].drawRate && v.games.x4thQuarter[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'draw',
                        selectRate: v.games.x4thQuarter[0].drawRate,
                        standard: null
                    }) : null"
                >
                    {{ v.games.x4thQuarter[0].drawRate ? $numeral(v.games.x4thQuarter[0].drawRate).format('0.00') : 'vs' }}
                </div>
            </div>
            <div class="col-5">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.x4thQuarter[0].status !== 'ACTIVE',
                        'can-bet': v.games.x4thQuarter[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'x' && x.standard === null && x.select === 'away') > -1
                    }"
                    @click="v.games.x4thQuarter[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'x',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: v.games.x4thQuarter[0].awayRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.x4thQuarter[0].awayRate).format('0.00') }}
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
    name: 'x4thQuarter',
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