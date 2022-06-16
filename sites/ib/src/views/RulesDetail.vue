<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="row">
                <div class="col">
                    <div class="page-content-header">
                        <font-awesome-icon :icon="['fa', 'info']"/>
                        경기규정 상세 <span>RULES DETAIL</span>
                        <span class="float-right">
                            <button type="button" class="btn-money" :disabled="loading" @click="$tools.pushRouter(`/rules/?page=${$route.params.page}`)">
                                <font-awesome-icon :icon="['fa', 'list']"/> 목록
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="list-content">
                        <div class="row">
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
        name: 'RulesDetail',
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
                const r = await this.$http.get('/api/get-rules-detail', {
                    _id: this.$route.params._id
                })
                if(r.error) {
                    this.$tools.pushRouter(`/rules/page=${this.$route.params.page}`)
                    return
                }

                if(!r.data) {
                    this.$tools.pushRouter(`/rules/page=${this.$route.params.page}`)
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