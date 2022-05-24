<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'envelope']"/>
                쪽지 상세 <span>MESSAGE DETAIL</span>
                <span class="float-right">
                    <button type="button" class="btn-money" :disabled="loading" @click="$tools.pushRouter(`/message/?page=${$route.params.page}`)">
                        <font-awesome-icon :icon="['fa', 'list']"/> 목록
                    </button>
                </span>
            </div>
            <div class="list-content">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board">
                                <thead>
                                    <tr>
                                        <th>
                                            <span class="text-white">
                                                {{ title }}
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