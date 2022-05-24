<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="row">
                <div class="col">
                    <div class="page-content-header">
                        <font-awesome-icon :icon="['fa', 'info']"/>
                        이용규정 <span>RULES</span>
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
                                                <th class="w-10">종류</th>
                                                <th>제목</th>
                                                <th>작성자</th>
                                                <th class="w-10">작성일자</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td class="en">
                                                    이용규정
                                                </td>
                                                <td>
                                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                                    <span
                                                        class="cursor-pointer"
                                                        :class="item.header ? 'ml-2' : ''"
                                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                                        @click="$tools.pushRouter(`/rules/detail/${item._id}/${search.page}`)"
                                                    >
                                                        {{ item.title }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <img src="/images/logo.png" class="admin-logo">
                                                </td>
                                                <td>
                                                    {{ $moment(item.regDateTime).format('YY.MM.DD') }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <b-pagination-nav
                                    first-class="first-class"
                                    last-class="last-class"
                                    prev-class="prev-class"
                                    next-class="next-class"
                                    ellipsis-class="ellipsis-class"
                                    page-class="page-class"
                                    :link-gen="linkGen"
                                    :number-of-pages="numberOfPages"
                                    align="center"
                                    :limit="$config.pageLimit"
                                    use-router
                                    v-model="search.page"
                                ></b-pagination-nav>
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
        name: 'Rules',
        components: {
        },
        computed: {
            ...mapGetters(['loading']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
            }
        },
        data() {
            return {
                search: {
                    page: 1
                },
                data: [],
                totalCount: 0
            }
        },
        created() {
            this.setFromRouter()
        },
        methods: {
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-rules-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            }
        }
    }
</script>