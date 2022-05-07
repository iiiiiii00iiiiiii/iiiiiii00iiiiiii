<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            이벤트 <span>EVENT</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5 d-none d-xl-block">
                <div class="row mt-xl-3">
                    <div class="col">
                        <div class="board-list">
                            <div class="row">
                                <div class="col text-right pb-2">
                                        <!-- <button type="button" class="btn-board" :disabled="loading" @click="getList()">
                                            <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                        </button> -->
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col px-0 px-xl-3">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-board text-nowrap table-hover">
                                        <thead>
                                            <tr>
                                                <th class="w-15 text-center pl-4 pl-xl-0">종류</th>
                                                <th class="w-10 text-center">구분</th>
                                                <th class="w-50 text-center">제목</th>
                                                <th class="w-25 text-center">작성자</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td class="text-center pl-4 pl-xl-0">
                                                    이벤트
                                                </td>
                                                <td class="text-inf text-center">
                                                    <span v-if="item.header" :style="item.headerColor !== '#000000' ? `color: ${item.headerColor}` : ''">[{{ item.header }}]</span>
                                                </td>
                                                <td class="text-center">
                                                    <span
                                                        class="cursor-pointer"
                                                        :style="item.titleColor !== '#000000' ? `color: ${item.titleColor}` : ''"
                                                        @click="$tools.pushRouter(`/event/detail/${item._id}/${search.page}`)"
                                                    >
                                                        {{ item.title }}
                                                    </span>
                                                </td>
                                                <td class="text-center">
                                                    <span class="font-weight-bold text-inf">OCEAN</span>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Event',
        components: {
            UrgentNotice
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

<style lang="scss" scoped>
.table-responsive {

    th {
        background: #052C53;
        color: #FFFFFF;
        font-weight: bold;
    }
}
</style>