<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.lastScoreTeam && v.showConfig.lastScoreTeam && v.games.lastScoreTeam[0].status === 'ACTIVE' && v.games.lastScoreTeam[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 마지막골 팀 (무: 0-0 노골)
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'home') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'lastScoreTeam',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: v.games.lastScoreTeam[0].homeRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.lastScoreTeam[0].homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'can-bet': v.games.lastScoreTeam[0].neitherRate,
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'neither') > -1
                    }"
                    @click="v.games.lastScoreTeam[0].neitherRate ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'lastScoreTeam',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'neither',
                        selectRate: v.games.lastScoreTeam[0].neitherRate,
                        standard: null
                    }) : null"
                >
                    {{ v.games.lastScoreTeam[0].neitherRate ? $numeral(v.games.lastScoreTeam[0].neitherRate).format('0.00') : 'vs' }}
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'lastScoreTeam' && x.standard === null && x.select === 'away') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'lastScoreTeam',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: v.games.lastScoreTeam[0].awayRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.lastScoreTeam[0].awayRate).format('0.00') }}
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
    name: 'lastScoreTeam',
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