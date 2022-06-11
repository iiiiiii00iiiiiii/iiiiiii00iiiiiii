<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">게시판 BOARD</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-list">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board ml-2" :disabled="loading" @click="getList()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                    <!-- 새로고침 -->
                                </button>
                                <button type="button" class="btn-write ml-2" :disabled="loading" @click="$tools.pushRouter(`/free-write/${search.page}`)">
                                    <font-awesome-icon :icon="['fa', 'comments']"/> 글쓰기
                                    <!-- 글쓰기 -->
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>제목</th>
                                                <th class="w-10">글쓴이</th>
                                                <th class="w-10">일시</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td>
                                                    <span
                                                        class="cursor-pointer"
                                                        @click="$tools.pushRouter(`/free/detail/${item._id}/${search.page}`)"
                                                    >
                                                        {{ item.title }} <span class="text-yellow">({{ item.commentsCount }})</span>
                                                        <span class="badge badge-danger ml-1" v-if="item.gameID">BET</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <img class="comment-level" :src="`/images/icon-lv${ item.writerGrade ? item.writerGrade : 1 }.png`">
                                                    {{ item.writerNick }}
                                                </td>
                                                <td>
                                                    {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
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
                                    pills
                                    size="sm"
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Free',
        components: {
        },
        computed: {
            ...mapGetters(['loading', 'freeReplace']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
            },
            freeReplace(newValue) {
                if(newValue) {
                    this.getList()
                    this.setFreeReplace(false)
                }
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
            ...mapActions(['setFreeReplace']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-free-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            }
        }
    }
</script>