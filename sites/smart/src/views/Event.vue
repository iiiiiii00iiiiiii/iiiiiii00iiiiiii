<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'gift']"/>
                이벤트 - <span>EVENT</span>
            </div>
            <div class="list-content">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board text-nowrap">
                                <thead>
                                    <tr>
                                        <th class="w-10">종류</th>
                                        <th class="w-60">제목</th>
                                        <th>작성자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td class="en">
                                            이벤트
                                        </td>
                                        <td>
                                            <span class="text-white" v-if="item.header">[{{ item.header }}]</span>
                                            <span
                                                class="cursor-pointer text-white"
                                                :class="item.header ? 'ml-2' : ''"
                                                @click="$tools.pushRouter(`/event/detail/${item._id}/${search.page}`)"
                                            >
                                                {{ item.title }}
                                            </span>
                                        </td>
                                        <td>
                                            <img src="/images/logo.png" class="admin-logo">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
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
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Event',
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
                const r = await this.$http.get('/api/get-event-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            }
        }
    }
</script>