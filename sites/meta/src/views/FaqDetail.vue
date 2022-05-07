<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'question-circle']"/>
                            <span class="ml-2">자주 묻는 질문 상세 FAQ DETAIL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-detail">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="$tools.pushRouter(`/faq/?page=${$route.params.page}`)">
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
                                                    <span v-if="header" :style="headerColor !== '#000000' ? `color: ${headerColor}` : ''">[{{ header }}]</span>
                                                    <span class="cursor-pointer" :class="header ? 'ml-2' : ''" :style="titleColor !== '#000000' ? `color: ${titleColor}` : ''">
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
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'FaqDetail',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                header: '',
                headerColor: '',
                title: '',
                titleColor: '',
                content: '',
                regDateTime: ''
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            async getDetail() {
                const r = await this.$http.get('/api/get-faq-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/faq/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data) {
                    this.$tools.pushRouter(`/faq/?page=${this.$route.params.page}`)
                    return
                }

                //구현부분
                this.header = r.data.header
                this.headerColor = r.data.headerColor
                this.title = r.data.title
                this.titleColor = r.data.titleColor
                this.content = r.data.content
                this.regDateTime = r.data.regDateTime
            }
        }
    }
</script>