<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.oddEven2ndSet && v.showConfig.oddEven2ndSet && v.games.oddEven2ndSet[0].status === 'ACTIVE' && v.games.oddEven2ndSet[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 2세트 홀짝
        </div>
        <div class="row">
            <div class="col-5 px-1">
                <div
                    class="g-home can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'odd') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'oddEven2ndSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'odd',
                        selectRate: v.games.oddEven2ndSet[0].oddRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        홀
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.oddEven2ndSet[0].oddRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1">
                <div class="g-x">
                    vs
                </div>
            </div>
            <div class="col-5 px-1">
                <div
                    class="g-away can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'oddEven2ndSet' && x.standard === null && x.select === 'even') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'oddEven2ndSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'even',
                        selectRate: v.games.oddEven2ndSet[0].evenRate,
                        standard: null
                    })"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(v.games.oddEven2ndSet[0].evenRate).format('0.00') }}
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
    name: 'oddEven2ndSet',
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