<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'users']"/>
                            <span class="ml-2">추천인 현황 <span class="text-yellow">(총 {{totalCount}}명 추천)</span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-list">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="getList()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th class="w-10">아이디</th>
                                                <th class="w-10">닉네임</th>
                                                <th>충전금액</th>
                                                <th>환전금액</th>
                                                <th>최근 로그인</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td>
                                                    {{ item.id }}
                                                </td>
                                                <td>
                                                    {{ item.nick }}
                                                </td>
                                                <td>
                                                    {{ $numeral(item.totalCharge).format('0,0') }}
                                                </td>
                                                <td>
                                                    {{ $numeral(item.totalExchange).format('0,0') }}
                                                </td>
                                                <td>
                                                    {{ item.lastLoginDateTime ? $moment(item.lastLoginDateTime).format('YY.MM.DD HH:mm:ss') : '-' }}
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'Friends',
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
                const r = await this.$http.get('/api/get-friends-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            }
        }
    }
</script>