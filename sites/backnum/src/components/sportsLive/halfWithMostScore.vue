<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.halfWithMostScore && v.showConfig.halfWithMostScore && v.games.halfWithMostScore[0].status !== 'HIDE' && v.games.halfWithMostScore[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 최다골 시점
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                        'can-bet': v.games.halfWithMostScore[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half1st') > -1
                    }"
                    @click="v.games.halfWithMostScore[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'halfWithMostScore',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'half1st',
                        selectRate: v.games.halfWithMostScore[0].half1stRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        전반전
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.halfWithMostScore[0].half1stRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                        'can-bet': v.games.halfWithMostScore[0].drawEqualNumberRate && v.games.halfWithMostScore[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'drawEqualNumber') > -1
                    }"
                    @click="v.games.halfWithMostScore[0].drawEqualNumberRate && v.games.halfWithMostScore[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'halfWithMostScore',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'drawEqualNumber',
                        selectRate: v.games.halfWithMostScore[0].drawEqualNumberRate,
                        standard: null
                    }) : null"
                >
                    {{ v.games.halfWithMostScore[0].drawEqualNumberRate ? $numeral(v.games.halfWithMostScore[0].drawEqualNumberRate).format('0.00') : 'vs' }}
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.halfWithMostScore[0].status !== 'ACTIVE',
                        'can-bet': v.games.halfWithMostScore[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'halfWithMostScore' && x.standard === null && x.select === 'half2nd') > -1
                    }"
                    @click="v.games.halfWithMostScore[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'halfWithMostScore',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'half2nd',
                        selectRate: v.games.halfWithMostScore[0].half2ndRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.halfWithMostScore[0].half2ndRate).format('0.00') }}
                    </div>
                    <div class="float-right pr-2 g-away-team-mobile">
                        후반전
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'halfWithMostScore',
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