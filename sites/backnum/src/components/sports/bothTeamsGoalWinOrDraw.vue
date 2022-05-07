<template>
    <div
        class="col-12 mt-3"
        v-if="v.games.bothTeamsGoalWinOrDraw && v.showConfig.bothTeamsGoalWinOrDraw"
    >
        <div class="mb-1 sports-detail-title">
            <font-awesome-icon :icon="['fa', 'chevron-circle-down']" class="text-warning"/> 양팀 득점 + 더블찬스
        </div>
        <div
            class="row"
            v-if="v.games.bothTeamsGoalWinOrDraw[0] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[0].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[0].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+홈승 또는 무승부
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[0].yesRate,
                        standard: 'firstTeamWinOrDraw'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrDraw' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[0].noRate,
                        standard: 'firstTeamWinOrDraw'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[0].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row mt-1"
            v-if="v.games.bothTeamsGoalWinOrDraw[1] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[1].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[1].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+홈승 또는 원정승
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[1].yesRate,
                        standard: 'firstTeamWinOrSecondTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'firstTeamWinOrSecondTeamWin' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[1].noRate,
                        standard: 'firstTeamWinOrSecondTeamWin'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[1].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row mt-1"
            v-if="v.games.bothTeamsGoalWinOrDraw[2] && v.showConfig.bothTeamsGoalWinOrDraw && v.games.bothTeamsGoalWinOrDraw[2].status === 'ACTIVE' && v.games.bothTeamsGoalWinOrDraw[2].showStatus"
        >
            <div class="col-6 px-1">
                <div class="pl-2 g-explain">
                    양팀 득점+원정승 또는 무승부
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-yes can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'yes') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'yes',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[2].yesRate,
                        standard: 'secondTeamWinOrDraw'
                    })"
                >
                    <div class="float-left pl-2">
                        예
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].yesRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
            <div class="col-3 px-1">
                <div
                    class="g-no can-bet clearfix"
                    :class="{
                        'selectBet': betCart.findIndex((x) => x._id === v._id && x.type === 'bothTeamsGoalWinOrDraw' && x.standard === 'secondTeamWinOrDraw' && x.select === 'no') > -1
                    }"
                    @click="$emit('setBet', {
                        _id: v._id,
                        sport: v.sport,
                        type: 'bothTeamsGoalWinOrDraw',
                        homeTeam: v.homeTeamKor ? v.homeTeamKor : v.homeTeam,
                        awayTeam: v.awayTeamKor ? v.awayTeamKor : v.awayTeam,
                        select: 'no',
                        selectRate: v.games.bothTeamsGoalWinOrDraw[2].noRate,
                        standard: 'secondTeamWinOrDraw'
                    })"
                >
                    <div class="float-left pl-2">
                        아니오
                    </div>
                    <div class="float-right pr-2">
                        {{ $numeral(v.games.bothTeamsGoalWinOrDraw[2].noRate).format('0,0.00') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bothTeamsGoalWinOrDraw',
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