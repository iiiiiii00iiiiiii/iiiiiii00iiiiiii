<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.bothTeamsGoalWin && v.showConfig.bothTeamsGoalWin"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 양팀 득점 + 승무패
        </div>
        <div
            class="row"
            v-if="v.games.bothTeamsGoalWin[1] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[1].status === 'ACTIVE' && v.games.bothTeamsGoalWin[1].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+홈승
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWin[1].yesRate,
                        standard: 'firstTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[1].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'firstTeamWin' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamsGoalWin[1].noRate,
                        standard: 'firstTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[1].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row mt-1"
            v-if="v.games.bothTeamsGoalWin[0] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[0].status === 'ACTIVE' && v.games.bothTeamsGoalWin[0].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+무승부
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWin[0].yesRate,
                        standard: 'draw'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[0].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'draw' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamScore[0].noRate,
                        standard: 'draw'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[0].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row mt-1"
            v-if="v.games.bothTeamsGoalWin[2] && v.showConfig.bothTeamsGoalWin && v.games.bothTeamsGoalWin[2].status === 'ACTIVE' && v.games.bothTeamsGoalWin[2].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+원정승
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWin[2].yesRate,
                        standard: 'secondTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[2].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWin' && x.standard === 'secondTeamWin' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWin',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamsGoalWin[2].noRate,
                        standard: 'secondTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWin[2].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bothTeamsGoalWin',
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