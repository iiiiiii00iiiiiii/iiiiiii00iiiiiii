<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'comments']"/>
                고객센터 상세 <span>HELP DETAIL</span>
                <span class="float-right">
                    <button type="button" class="btn-money" :disabled="loading" @click="$tools.pushRouter(`/help/?page=${$route.params.page}`)">
                        <font-awesome-icon :icon="['fa', 'list']"/> 목록
                    </button>
                </span>
            </div>
            <div class="list-content">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board text-nowrap">
                                <thead>
                                    <tr>
                                        <th>
                                            {{ title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-html="content"></td>
                                    </tr>
                                    <tr v-if="answerStatus">
                                        <td v-html="comment" class="board-content"></td>
                                    </tr>
                                </tbody>
                            </table>
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
        name: 'HelpDetail',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                title: '',
                content: '',
                answerStatus: false,
                regDateTime: '',
                comment: ''
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            async getDetail() {
                const r = await this.$http.get('/api/get-help-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/help/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data.help) {
                    this.$tools.pushRouter(`/help/?page=${this.$route.params.page}`)
                    return
                }

                //구현부분
                this.title = r.data.help.title
                this.content = r.data.help.content
                this.answerStatus = r.data.help.answerStatus
                this.regDateTime = r.data.help.regDateTime

                if(this.answerStatus) {
                    this.comment = `<p class="text-orange mb-3">ㄴ관리자 답변 - ${this.$moment(r.data.answer.regDateTime).format('YY-MM-DD HH:mm')}</p>${r.data.answer.comment}`
                }
            },
            async deleteHelp(_id) {
                this.$sw.fire({
                    title: '문의 내역 삭제',
                    text: '문의 내역을 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-help', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '문의 내역 삭제 성공', '문의 내역이 삭제 되었습니다.', null)
                        this.$tools.pushRouter(`/help/?page=${this.$route.params.page}`)
                    }
                })
            }
        }
    }
</script>