<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">게시판 상세 BOARD DETAIL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-detail">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="getDetail()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="$tools.pushRouter(`/free/?page=${$route.params.page}`)">
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
                                                    <div class="float-left">{{ title }}</div>
                                                    <div class="float-right text-yellow">
                                                        <img class="comment-level" :src="`/images/icon-lv${ writerGrade ? writerGrade : 1 }.png`">
                                                        {{ writerNick }}
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ content }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control form-control-sm board-input"
                                    placeholder="댓글"
                                    maxlength="100"
                                    tabindex="1"
                                    v-model="commentContent"
                                >
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn-write" style="height: 28px;" :disabled="loading" @click="submit()">
                                    <font-awesome-icon :icon="['fa', 'pen']"/> 등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="board-comment">
                        <div v-for="(item, index) in comment" :key="index" :class="index > 0 ? 'comment-top': ''">
                            <div class="text-gray">
                                <img class="comment-level" :src="`/images/icon-lv${ item.writerGrade ? item.writerGrade : 1 }.png`">
                                {{ item.writerNick }} {{ $moment(item.regDateTime).format('YYYY-MM-DD') }}
                            </div>
                            <div class="text-white mt-1">{{ $striptags(item.comment) }}</div>
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
        name: 'FreeDetail',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                title: '',
                content: '',
                regDateTime: '',
                writerGrade: 1,
                writerNick: 1,
                comment: [],
                commentContent: ''
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            async getDetail() {
                const r = await this.$http.get('/api/get-free-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/free/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data.free) {
                    this.$tools.pushRouter(`/free/?page=${this.$route.params.page}`)
                    return
                }

                //구현부분
                this.title = r.data.free.title
                this.content = r.data.free.content
                this.regDateTime = r.data.free.regDateTime
                this.writerGrade = r.data.free.writerGrade
                this.writerNick = r.data.free.writerNick

                this.comment = r.data.answer
            },
            async submit() {
                let rFree = await this.$http.post('/api/free-comment', {
                    _id: this.$route.params._id,
                    commentContent: this.commentContent
                })
                if(rFree.error) return

                this.$tools.sw('success', '댓글 성공', '작성하신 댓글이 등록 되었습니다.')
                this.getDetail()

            },
        }
    }
</script>