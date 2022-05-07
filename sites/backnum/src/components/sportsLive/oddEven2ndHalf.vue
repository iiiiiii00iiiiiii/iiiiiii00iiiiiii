<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.oddEven2ndHalf && v.showConfig.oddEven2ndHalf && v.games.oddEven2ndHalf[0].status !== 'HIDE' && v.games.oddEven2ndHalf[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 후반전 홀짝
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE',
                        'can-bet': v.games.oddEven2ndHalf[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'odd') > -1
                    }"
                    @click="v.games.oddEven2ndHalf[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'oddEven2ndHalf',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'odd',
                        selectRate: v.games.oddEven2ndHalf[0].oddRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        홀
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.oddEven2ndHalf[0].oddRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE'
                    }"
                >
                    vs
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.oddEven2ndHalf[0].status !== 'ACTIVE',
                        'can-bet': v.games.oddEven2ndHalf[0].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndHalf' && x.standard === null && x.select === 'even') > -1
                    }"
                    @click="v.games.oddEven2ndHalf[0].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'oddEven2ndHalf',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'even',
                        selectRate: v.games.oddEven2ndHalf[0].evenRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.oddEven2ndHalf[0].evenRate).format('0.00') }}
                    </div>
                    <div class="float-right pr-2 g-away-team-mobile">
                        짝
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'oddEven2ndHalf',
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