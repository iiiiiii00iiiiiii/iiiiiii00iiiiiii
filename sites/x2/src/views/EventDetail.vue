<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            이벤트 상세 <span>EVENT DETAIL</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5 d-none d-xl-block">
                <div class="row mt-3">
                    <div class="col">
                        <div class="board-detail">
                            <div class="row">
                                <div class="col text-right px-2 px-xl-3">
                                    <button type="button" class="btn-board" :disabled="loading" @click="$tools.pushRouter(`/event/?page=${$route.params.page}`)">
                                        목록
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col px-0 px-xl-3">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-board text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th class="pl-4">
                                                        <span v-if="header" :style="headerColor !== '#000000' ? `color: ${headerColor}` : ''">[{{ header }}]</span>
                                                        <span :class="header ? 'ml-2' : ''" :style="titleColor !== '#000000' ? `color: ${titleColor}` : ''">
                                                            {{ title }}
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td v-html="content" class="board-content pl-4"></td>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'EventDetail',
        components: {
            UrgentNotice
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
                const r = await this.$http.get('/api/get-event-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/event/?page=${this.$route.params.page}`)
                    return
                }

                if(!r.data) {
                    this.$tools.pushRouter(`/event/?page=${this.$route.params.page}`)
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