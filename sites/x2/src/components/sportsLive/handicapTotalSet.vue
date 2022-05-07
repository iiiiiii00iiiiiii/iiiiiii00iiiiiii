<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.handicapTotalSet && v.showConfig.handicapTotalSet &&
            v.games.handicapTotalSet.findIndex(x => x.status !== 'HIDE') > -1 &&
            v.games.handicapTotalSet.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 핸디캡
        </div>
        <div class="row" :class="index > 0 && v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.handicapTotalSet" :key="index">
            <div class="col-5 px-1" v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'">
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                        'can-bet': v.games.handicapTotalSet[index] === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                    }"
                    @click="v.games.handicapTotalSet[index] === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicapTotalSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: vv.homeRate,
                        standard: vv.homeStandard
                    }) : null"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1" v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'">
                <div
                    class="g-x"
                    :class="{
                        'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                    }"
                >
                    {{ vv.homeStandard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.handicapTotalSet[index].showStatus && v.games.handicapTotalSet[index].status !== 'HIDE'">
                <div
                    class="g-away clearfix"
                    :class="{
                        'n': v.games.handicapTotalSet[index] !== 'ACTIVE',
                        'can-bet': v.games.handicapTotalSet[index] === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicapTotalSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                    }"
                    @click="v.games.handicapTotalSet[index] === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicapTotalSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: vv.awayRate,
                        standard: vv.homeStandard
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ $numeral(vv.awayRate).format('0.00') }}
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
    name: 'handicapTotalSet',
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