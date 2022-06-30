<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'envelope']"/>
                            <span class="ml-2">쪽지 상세 MESSAGE DETAIL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-detail">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-delete" :disabled="loading" @click="deleteMessage($route.params._id)">
                                    <font-awesome-icon :icon="['fa', 'trash-alt']"/> 삭제
                                </button>
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="$tools.pushRouter(`/message/?page=${$route.params.page}`)">
                                    <font-awesome-icon :icon="['fa', 'list']"/> 목록
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <span>
                                                        {{ title }}
                                                    </span>
                                                    <span class="float-right">
                                                        {{ $moment(regDateTime).format('YY.MM.DD HH:mm') }}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td v-html="content" class="board-content"></td>
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'MessageDetail',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                title: '',
                content: '',
                regDateTime: ''
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            async getDetail() {
                const r = await this.$http.get('/api/get-message-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/message/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data) {
                    this.$tools.pushRouter(`/message/?page=${this.$route.params.page}`)
                    return
                }

                //구현부분
                this.title = r.data.title
                this.content = r.data.content
                this.regDateTime = r.data.regDateTime
            },
            async deleteMessage(_id) {
                this.$sw.fire({
                    title: '쪽지 삭제',
                    text: '쪽지를 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-message', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '쪽지 삭제 성공', '쪽지가 삭제 되었습니다.', null)
                        this.$tools.pushRouter(`/message/?page=${this.$route.params.page}`)
                    }
                })
            }
        }
    }
</script>