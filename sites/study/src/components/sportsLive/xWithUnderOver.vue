<template>
    <div
        class="col-12 mt-3"
        v-if="
            v.games.xWithUnderOver && v.showConfig.xWithUnderOver &&
			v.games.xWithUnderOver.findIndex(x => x.status !== 'HIDE') > -1 &&
			v.games.xWithUnderOver.findIndex(x => x.showStatus) > -1
        "
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 승무패/언더오버
        </div>
        <div class="row" :class="index > 0 && v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE' ? 'mt-1' : ''" v-for="(vv, index) in v.games.xWithUnderOver" :key="index">
            <div class="col-6 px-1" v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'">
                <div
                    class="pl-2 g-explain"
                    :class="{
                        'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                    }"
                >
                    <span v-if="vv.team === 'home'">홈승</span>
                    <span v-else-if="vv.team === 'draw'">무승부</span>
                    <span v-else-if="vv.team === 'away'">원정승</span>
                    /
                    <span v-if="vv.type === 'Under'">언더</span>
                    <span v-else-if="vv.type === 'Over'">오버</span>
                    <span class="text-primary ml-1">({{ vv.standard }})</span>
                </div>
            </div>
            <div class="col-3 px-1" v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'">
                <div
                    class="g-yes clearfix"
                    :class="{
                        'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                        'can-bet': v.games.xWithUnderOver[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'yes') > -1
                    }"
                    @click="v.games.xWithUnderOver[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'xWithUnderOver',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: vv.yesRate,
                        standard: `${vv.team}${vv.type}-${vv.standard}`
                    }) : null"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1" v-if="v.games.xWithUnderOver[index].showStatus && v.games.xWithUnderOver[index].status !== 'HIDE'">
                <div
                    class="g-no clearfix"
                    :class="{
                        'n': v.games.xWithUnderOver[index].status !== 'ACTIVE',
                        'can-bet': v.games.xWithUnderOver[index].status === 'ACTIVE',
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'xWithUnderOver' && x.standard === `${vv.team}${vv.type}-${vv.standard}` && x.select === 'no') > -1
                    }"
                    @click="v.games.xWithUnderOver[index].status === 'ACTIVE' ? $emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'xWithUnderOver',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: vv.noRate,
                        standard: `${vv.team}${vv.type}-${vv.standard}`
                    }) : null"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(vv.noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'xWithUnderOver',
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