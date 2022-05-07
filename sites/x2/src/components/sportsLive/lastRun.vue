<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.lastRun && v.showConfig.lastRun && v.games.lastRun[0].status !== 'HIDE' && v.games.lastRun[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 마지막 득점 팀
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.lastRun[0].status !== 'ACTIVE',
                        'can-bet': v.games.lastRun[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'home') > -1
                    }"
                    @click="v.games.lastRun[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'lastRun',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: v.games.lastRun[0].homeRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.lastRun[0].homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.lastRun[0].status !== 'ACTIVE'
                    }"
                >
                    vs
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.lastRun[0].status !== 'ACTIVE',
                        'can-bet': v.games.lastRun[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastRun' && x.standard === null && x.select === 'away') > -1
                    }"
                    @click="v.games.lastRun[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'lastRun',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: v.games.lastRun[0].awayRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.lastRun[0].awayRate).format('0.00') }}
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
    name: 'lastRun',
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