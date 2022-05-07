<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.correctScoreFullTime && v.showConfig.correctScoreFullTime &&
            v.games.correctScoreFullTime.findIndex(x => x.status !== 'HIDE') > -1 &&
            v.games.correctScoreFullTime.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 정확한 점수
        </div>
        <div class="row">
            <div
                class="col-4 px-1"
                :class="index > 2 ? 'mt-1' : ''"
                v-for="(vv, index) in v.games.correctScoreFullTime" :key="index"
            >
                <div
                    class="g-home clearfix"
                    :class="{
                        'n': vv.status !== 'ACTIVE',
                        'can-bet': vv.status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'correctScoreFullTime' && x.standard === `${vv.homeScore}:${vv.awayScore}` && x.select === `${vv.homeScore}:${vv.awayScore}`) > -1
                    }"
                    @click="vv.status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'correctScoreFullTime',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: `${vv.homeScore}:${vv.awayScore}`,
                        selectRate: vv.rate,
                        standard: `${vv.homeScore}:${vv.awayScore}`
                    }) : null"
                >
                    <div class="float-left pl-2">
                        {{ vv.homeScore }}
                        :
                        {{ vv.awayScore }}
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.rate).format('0.00') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'correctScoreFullTime',
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