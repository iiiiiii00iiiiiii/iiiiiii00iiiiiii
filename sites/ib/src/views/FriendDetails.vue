<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'users']"/>
                추천인내역 <span>Recommender</span>
            </div>
            <div class="page-content-middle">
                <div class="row">
                    <div class="col-3">
                        <div class="title">상위추천인</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ recommend }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">총 지인수</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ $numeral(totalCount).format('0,0') }} 명</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-content">
                <div class="row my-2">
                    <div class="col text-white">
                        지인 이용내역 ( <span class="text-yellow">최근 7일이내 / 최대50개</span> )
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-money text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">상태</th>
                                        <th scope="col">아이디</th>
                                        <th scope="col">닉네임</th>
                                        <th scope="col">레벨</th>
                                        <th scope="col">충전금액</th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-violet-recommend">
                                    <tr v-for="(v, index) in data" :key="index">
                                        <td>
                                            {{ $config.userStatus[v.status] }}
                                        </td>
                                        <td>
                                            {{ v.id }}
                                        </td>
                                        <td>
                                            {{ v.nick }}
                                        </td>
                                        <td>
                                            {{ v.grade }}
                                        </td>
                                        <td>
                                            {{ $numeral(v.totalCharge).format('0,0') }}
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'FriendDetails',
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
            totalCount: 0,
            recommend: ''
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
            let rRecommend = await this.$http.get('/api/recommend', this.search)
            if(rRecommend.error) return

            // 구현부분
            this.data = rRecommend.data.recordSet
            this.totalCount = rRecommend.data.recordCount
            if(rRecommend.data.recommend.recommendTree.length === 0) {
                this.recommend = '-'
            }
            else {
                this.recommend = rRecommend.data.recommend.recommendTree[rRecommend.data.recommend.recommendTree.length - 1].id
            }
        },
    },
}
</script>