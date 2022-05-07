<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.xDouble && v.showConfig.xDouble && v.games.xDouble[0].status !== 'HIDE' && v.games.xDouble[0].showStatus"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 더블찬스
        </div>
        <div class="row">
            <div class="col-4">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].homeDrawRate,
                        'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeDrawRate,
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeDraw') > -1
                    }"
                    @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeDrawRate ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'xDouble',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'homeDraw',
                        selectRate: v.games.xDouble[0].homeDrawRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        <span class="d-sm-none">
                            홈 / 무
                        </span>
                        <span class="d-none d-sm-inline">
                            홈승 또는 무승부
                        </span>
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.xDouble[0].homeDrawRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="g-center clearfix"
                    :class="{
                        'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].homeAwayRate,
                        'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeAwayRate,
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'homeAway') > -1
                    }"
                    @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].homeAwayRate ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'xDouble',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'homeAway',
                        selectRate: v.games.xDouble[0].homeAwayRate,
                        standard: null
                    }): null"
                >
                    <div class="float-left pl-2">
                        <span class="d-sm-none">
                            홈 / 원
                        </span>
                        <span class="d-none d-sm-inline">
                            홈승 또는 원정승
                        </span>
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.xDouble[0].homeAwayRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.xDouble[0].status !== 'ACTIVE' || !v.games.xDouble[0].awayDrawRate,
                        'can-bet': v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].awayDrawRate,
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xDouble' && x.standard === null && x.select === 'awayDraw') > -1
                    }"
                    @click="v.games.xDouble[0].status === 'ACTIVE' && v.games.xDouble[0].awayDrawRate ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'xDouble',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'awayDraw',
                        selectRate: v.games.xDouble[0].awayDrawRate,
                        standard: null
                    }) : null"
                >
                    <div class="float-left pl-2">
                        <span class="d-sm-none">
                            원 / 무
                        </span>
                        <span class="d-none d-sm-inline">
                            원정승 또는 무승부
                        </span>
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.xDouble[0].awayDrawRate).format('0.00') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'xDouble',
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