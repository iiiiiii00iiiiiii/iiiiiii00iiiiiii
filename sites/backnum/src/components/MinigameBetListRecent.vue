<template>
    <div class="row mb-5" data-aos="fade-in" data-aos-duration="1500">
        <div class="col mb-3">
            <div class="row mt-3">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            베팅내역 (<span>최근7일이내/최대50개</span>)
                        </div>
                    </div>
                </div>
                <div class="col text-right d-none d-xl-block">
                    <button type="button" class="btn-board red px-4 py-2" :disabled="loading" @click="deleteBetAll()">
                        전체삭제
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="board-list">
                        <div class="row">
                            <div class="col px-0 text-center">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th class="">종류</th>
                                                <th>회차/배팅</th>
                                                <th>배팅머니</th>
                                                <th>당첨금</th>
                                                <th>결과</th>
                                                <th class="w-10">삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in minigameBetListRecent" :key="index">
                                                <td>
                                                    {{ $config.convertMiniGameType[item.gameKind] }}
                                                </td>
                                                <td>
                                                    {{ item.round }} ({{ item.rotation }}) {{ betSelectConvert(item.betType, item.betSelect) }} <span v-if="item.isFollow" class="badge badge-info">F</span>
                                                </td>
                                                <td>{{ $numeral(item.betAmount).format('0,0') }}</td>
                                                <td :class="item.betResult === 'W' ? 'text-blue' : item.betResult === 'L' ? 'text-pink' : ''">{{ item.betResult === 'W' ? $numeral(item.betBenefit).format(0,0) : item.betResult === 'L' ? 0 : '진행중' }}</td>
                                                <td :class="item.betResult === 'W' ? 'text-blue' : item.betResult === 'L' ? 'text-red' : ''">{{ item.betResult === 'W' ? '당첨' : item.betResult === 'L' ? '미당첨' : '' }}</td>
                                                <td>
                                                    <span class="badge badge-danger p-1 cursor-pointer" @click="deleteBet(item._id)">삭제</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'MinigameBetListRecent',
        computed: {
            ...mapGetters(['loading', 'minigameBetListRecent'])
        },
        data() {
            return {

            }
        },
        methods: {
            ...mapActions(['getMinigameBetListRecent']),
            async deleteBet(_id) {
                let resultDelete = await this.$http.delete('/api/delete-minigames-bet', { _id })
                if(resultDelete.error) return

                this.getMinigameBetListRecent()
            },
            async deleteBetAll() {
                let resultDeleteAll = await this.$http.delete('/api/delete-minigames-bet-all')
                if(resultDeleteAll.error) return

                this.getMinigameBetListRecent()
            },
            betSelectConvert(type, select) {
                let resultType = ''
                if(type === 'PWBPOE' || type === 'PWBPUO' || type === 'PWBPCOMBO') { resultType = '파워' }
                if(type === 'PWBNOE' || type === 'PWBNUO' || type === 'PWBNCOMBO' || type === 'PWBBMS' || type === 'PWBBMSCOMBO') { resultType = '일반' }
                if(type === 'PWBRNAPOE' || type === 'PWBRNCOMBO') { resultType = '역' }

                let resultSelect = ''
                if(select === 'Odd') resultSelect = '홀'
                if(select === 'Even') resultSelect = '짝'
                if(select === 'Under') resultSelect = '언더'
                if(select === 'Over') resultSelect = '오버'
                if(select === 'OddUnder') resultSelect = '홀+언더'
                if(select === 'EvenUnder') resultSelect = '짝+언더'
                if(select === 'OddOver') resultSelect = '홀+오버'
                if(select === 'EvenOver') resultSelect = '짝+오버'
                if(select === 'Big') resultSelect = '대'
                if(select === 'Middle') resultSelect = '중'
                if(select === 'Small') resultSelect = '소'
                if(select === 'OddBig') resultSelect = '홀+대'
                if(select === 'OddMiddle') resultSelect = '홀+중'
                if(select === 'OddSmall') resultSelect = '홀+소'
                if(select === 'EvenBig') resultSelect = '짝+대'
                if(select === 'EvenMiddle') resultSelect = '짝+중'
                if(select === 'EvenSmall') resultSelect = '짝+소'
                if(select === 'OddUnderOdd') resultSelect = '홀+언더/홀'
                if(select === 'OddUnderEven') resultSelect = '홀+언더/짝'
                if(select === 'OddOverOdd') resultSelect = '홀+오버/홀'
                if(select === 'OddOverEven') resultSelect = '홀+오버/짝'
                if(select === 'EvenUnderOdd') resultSelect = '짝+언더/홀'
                if(select === 'EvenUnderEven') resultSelect = '짝+언더/짝'
                if(select === 'EvenOverOdd') resultSelect = '짝+오버/홀'
                if(select === 'EvenOverEven') resultSelect = '짝+오버/짝'
                if(select === 'Left') resultSelect = '좌출'
                if(select === 'Right') resultSelect = '우출'
                if(select === 'Three') resultSelect = '3줄'
                if(select === 'Four') resultSelect = '4줄'
                if(select === 'LeftThree') resultSelect = '좌3'
                if(select === 'LeftFour') resultSelect = '좌4'
                if(select === 'RightThree') resultSelect = '우3'
                if(select === 'RightFour') resultSelect = '우4'

                return `${resultType} [${resultSelect}]`
            }
        }
    }
</script>