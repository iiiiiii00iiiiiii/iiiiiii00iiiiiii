<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.handicap2ndSet && v.showConfig.handicap2ndSet"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 2세트 핸디캡
        </div>
        <div class="row" :class="index > 0 && v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.handicap2ndSet" :key="index">
            <div class="col-5 px-1" v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'">
                <div
                    class="g-home can-bet clearfix py-3"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'home') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicap2ndSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'home',
                        selectRate: vv.homeRate,
                        standard: vv.homeStandard
                    })"
                >
                    <div class="float-left pl-2 g-home-team-mobile">
                        {{ v.homeTeamKor ? v.homeTeamKor : v.homeTeam }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.homeRate).format('0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-2 px-1" v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'">
                <div class="g-x py-3">
                    {{ vv.homeStandard }}
                </div>
            </div>
            <div class="col-5 px-1" v-if="v.games.handicap2ndSet[index].showStatus && v.games.handicap2ndSet[index].status !== 'HIDE'">
                <div
                    class="g-away can-bet clearfix py-3"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'handicap2ndSet' && x.standard === vv.homeStandard && x.select === 'away') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'handicap2ndSet',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'away',
                        selectRate: vv.awayRate,
                        standard: vv.homeStandard
                    })"
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
    name: 'handicap2ndSet',
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