<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">게시판 작성 BOARD</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-write">
                        <div class="row mt-2">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control form-control-sm board-input"
                                    placeholder="제목"
                                    maxlength="100"
                                    tabindex="1"
                                    v-model="title"
                                >
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <textarea
                                    class="form-control form-control-sm board-input"
                                    placeholder="내용"
                                    rows="10"
                                    maxlength="500"
                                    tabindex="2"
                                    v-model="content"
                                ></textarea>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <select class="form-control form-control-sm board-input" id="betList" tabindex="7" v-model="id">
                                    <option value="">배팅선택</option>
                                    <option v-for="(item, index) in betList" :key="index" :value="item._id">
                                        {{ `[${$moment(item.regDateTime).format('MM/DD ')}] ${$config.convertSportsGameType[item.gameType]} - ${item.betCount}폴더 (${$numeral(item.betAmount).format('0,0')})` }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col text-right">
                                <button type="button" class="btn-board py-2" :disabled="loading" tabindex="4" @click="$tools.pushRouter(`/free/?page=${$route.params.page}`)">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 취소
                                </button>
                                <button type="button" class="btn-write ml-2 py-2" :disabled="loading" tabindex="3" @click="submit()">
                                    <font-awesome-icon :icon="['fa', 'pen']"/> 등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'FreeWrite',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        mounted() {
            this.getBetListBoard()
        },
        data() {
            return {
                title: '',
                content: '',
                id: '',
                betList: []
            }
        },
        methods: {
            async submit() {
                let rFree = await this.$http.post('/api/free', {
                    title: this.title,
                    content: this.content,
                    id: this.id
                })
                if(rFree.error) return

                this.$tools.sw('success', '글작성 성공', '작성하신 글이 등록 되었습니다.', 'html')
                this.$tools.pushRouter(`/free/?page=${this.$route.params.page}`)
            },
            async getBetListBoard() {
                let rBet = await this.$http.get('/api/get-board-bet-list')
                if(rBet.error) return

                this.betList = rBet.data.recordSet
            }
        }
    }
</script>