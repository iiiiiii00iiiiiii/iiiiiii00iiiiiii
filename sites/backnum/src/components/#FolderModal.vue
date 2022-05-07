<template>
    <div class="FolderModal">
        <b-modal
            v-model="show"
            size="xl"
            title="폴더 내용 확인"
            hide-footer
            no-close-on-backdrop
            header-bg-variant="danger"
            header-text-variant="white"
            no-fade
            @show="folderDetail()"
            @hide="initForm()"
        >
            <template v-slot:modal-title>
                <div class="row ml-1">
                    <h6>{{ $config.convertSportsGameType(data.gameType) }} - {{ $moment(data.regDateTime).format('YYYY-MM-DD HH:mm:ss') }}</h6>
                </div>
            </template>
            <div class="row">
                <div class="col-12">
                    <b-overlay :show="overlay" rounded="lg" opacity="0.7" spinner-type="grow">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>경기시간</th>
                                                <th>리그</th>
                                                <th>홈팀vs원정팀</th>
                                                <th>경기타입</th>
                                                <th>배팅</th>
                                                <th>배당(선택/최종)</th>
                                                <th>상태</th>
                                                <th>결과</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(v) in data.detail" :key="v._id">
                                                <td>
                                                    {{ v.gameDateTime ? $moment(v.gameDateTime).format('MM/DD HH:mm') : '-' }}
                                                </td>
                                                <td>
                                                    <img :src="`http://img.thvmxm.com/icon-sports/icon-${v.sport.toLowerCase().replace(/[ :]/,'')}.png`" style="height:18px;width:18px">
                                                    {{ v.leagueKor ? v.leagueKor : '-' }}
                                                </td>
                                                <td>
                                                    {{ v.homeTeam }} vs {{ v.awayTeam }}
                                                </td>
                                                <td>
                                                    {{ $config.convertBetTypeSports[v.type] }}
                                                </td>
                                                <td>
                                                    <span>{{ $config.convertBetTypeSports[v.type] }}</span>
                                                    <span v-if="v.standard || v.standard === 0">
                                                        [{{
                                                            v.type === 'bothTeamsGoalWin' || v.type === 'bothTeamsGoalWinOrDraw' ? $config.convertBetStandard[v.standard] :
                                                            v.type === 'xWithUnderOver' ? $config.convertBetStandardXwithUnderOver(v.standard) : v.standard
                                                        }}]
                                                    </span>
                                                    <span v-if="v.type !== 'correctScoreFullTime'"> ({{ $config.convertBetSelectSports[v.select] }})</span>
                                                </td>
                                                <td>
                                                    {{ v.selectRate }} / {{ v.finalRate }}
                                                </td>
                                                <td :class="[{'text-primary':v.betResult === 'W'},{'text-warning':v.betResult === 'N'},{'text-danger':v.betResult === 'L'}]">
                                                    {{ $config.result[v.betResult] }}
                                                </td>
                                                <td>
                                                    {{ v.score && v.score.homeScore !== null ? v.score.homeScore : '-' }}:{{ v.score && v.score.awayScore !== null ? v.score.awayScore : '-' }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr>
                                    <table class="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>배팅금액</th>
                                                <th>예상당첨금액</th>
                                                <th>배팅후 잔액</th>
                                                <th>폴더</th>
                                                <th>배당총합</th>
                                                <th>최종결과</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {{ $numeral(data.betAmount).format('0,0') }}
                                                </td>
                                                <td :class="{'text-primary':data.betResult === 'W'}">
                                                    {{ $numeral($config.estimatedSportsBenefit(data.betAmount, data.detail)).format('0,0') }}
                                                </td>
                                                <td>
                                                    {{ $numeral(data.afterBetMoney).format('0,0') }}
                                                </td>
                                                <td>
                                                    {{ data.betCount }}
                                                </td>
                                                <td>
                                                    {{ $config.averageRate('select', data.detail) }} / {{ $config.averageRate('final', data.detail) }}
                                                </td>
                                                <td :class="[{'text-primary':data.betResult === 'W'},{'text-warning':data.betResult === 'N'},{'text-danger':data.betResult === 'L'}]">
                                                    {{ $config.result[data.betResult] }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="8">
                                                    <button type="button" class="btn btn-primary btn-xs float-right" @click="refresh()">새로고침</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'FolderModal',
    components: {
    },
    data() {
        return {
            data: {}
        }
    },
    created() {
    },
    mounted() {
        this.initForm()
    },
    methods: {
        initForm() {
            this.data = {}
        },
        async folderDetail() {
            let res = await this.$http.get('/api/bet-sports-detail', { _id: this._id })
            if(res.error) return

            this.data = res.data.recordSet
        },
        async refresh() {
            let res = await this.$http.get('/api/bet-sports-detail', { _id: this._id })
            if(res.error) return

            this.data = res.data.recordSet
        },


        // hideModal
        hideModal() {
            this.$store.commit('controlFolderModal', {
                show: false,
                _id: null
            })
            this.initForm()
        }
    },
    computed: {
        _id() {
            return this.$store.state.folderModal._id
        },
        show: {
            get() {
                return this.$store.state.folderModal.show
            },
            set(show) {
                this.$store.commit('setFolderModal', {
                    key: 'show',
                    value: show
                })
            }
        },
        overlay() {
            return this.$store.state.overlay
        },
        disabledButton() {
            return this.$store.state.disabledButton
        }
    }
}
</script>

<style lang="scss">

</style>