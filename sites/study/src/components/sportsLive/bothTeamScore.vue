<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.bothTeamScore && v.showConfig.bothTeamScore && v.games.bothTeamScore[0].status !== 'HIDE' && v.games.bothTeamScore[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 양팀 득점
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.bothTeamScore[0].status !== 'ACTIVE',
                        'can-bet': v.games.bothTeamScore[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'yes') > -1
                    }"
                    @click="v.games.bothTeamScore[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamScore',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamScore[0].yesRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        득점
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamScore[0].yesRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.bothTeamScore[0].status !== 'ACTIVE'
                    }"
                >
                    vs
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.bothTeamScore[0].status !== 'ACTIVE',
                        'can-bet': v.games.bothTeamScore[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamScore' && x.standard === null && x.select === 'no') > -1
                    }"
                    @click="v.games.bothTeamScore[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamScore',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamScore[0].noRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.bothTeamScore[0].noRate).format('0.00') }}
                    </div>
                    <div class="float-right pr-2 g-away-team-mobile">
                        무득점
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bothTeamScore',
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