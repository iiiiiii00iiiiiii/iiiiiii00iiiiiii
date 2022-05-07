<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col-12">
                        <div class="title">지인추천현황 <span>FRIEND DETAILS</span></div>
                    </div>
                </div>
                <hr class="mt-5 d-none d-xl-block">
                <div class="row mt-4">
                    <div class="col-12 px-0 px-xl-3">
                        <div class="row">
                            <div class="col-12 mt-xl-4 col-xl-3 frienddetails">
                                <div class="row">
                                    <div class="col-12 recommend-box">
                                        상위추천인
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 recommend">
                                        {{ recommend }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-2 mt-xl-4 col-xl-3 mx-xl-5 frienddetails">
                                <div class="row">
                                    <div class="col-12 recommend-box">
                                        총 지인수
                                    </div>
                                </div>
                                <div class="recommend">
                                    {{ $numeral(totalCount).format('0,0') }} 명
                                </div>
                            </div>
                            <div class="col-12 col-xl caution-box mt-2 mt-xl-4">
                                <div class="row">
                                    <div class="col-12 caution-title">
                                        <span>주의사항</span>
                                    </div>
                                </div>
                                <div class="row notice-box">
                                    <div class="col-12 notice-box-content">
                                        <ul>
                                            <li> 실제 지인만 추천이 가능합니다<span class="red">(추천인코드발급은 고객센터로 문의주시기 바랍니다.)</span></li>
                                            <li> 슈어맨,다음드 각종 커뮤니티에서 <span class="red">코드를 사고파는 행위는 절대 금지</span>합니다.</li>
                                            <li> <span class="red">지인추천은 연대책임</span>이며, 실제지인이 아닐경우 불이익이 있을 수 있습니다.</li>
                                            <li> 무분별한 <span class="red">코드남발,추천등 코드발급이 제한</span>될 수 있습니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="d-none d-xl-block">
                <div class="row mt-2">
                    <div class="col px-0 px-xl-3">
                        <div class="money-list">
                            <div class="row mb-2 mb-xl-0">
                                <div class="col title">
                                    지인 이용내역 ( <span>최근 7일이내 / 최대50개</span> )
                                </div>
                                <!-- <div class="col text-right">
                                    <button type="button" class="btn-board ml-1 ml-xl-2" :disabled="loading" @click="getList()">
                                        <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                    </button>
                                </div> -->
                            </div>
                            <div class="row">
                                <div class="col px-0">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead class="thead-violet-recommend">
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
            </div>
        </div>
    </div>
</template>

<script>

import UrgentNotice from '@/components/UrgentNotice.vue'

export default {
    name: 'FriendDetails',
    components: {
            UrgentNotice
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
        this.getList()
    },
    methods: {
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
        initList() {
            this.page = 1
            this.getList()
        },
        linkGen(pageNum) {
            this.search.page = pageNum
            this.getList()
        },
        hideModal() {
            this.showModalRecommend = false
            this.page = 1
        }
    },
    computed: {
        disabledButton: {
            get() {
                return this.$store.state.disabledButton
            },
            set(status) {
                this.$store.commit('setDisabledButton', status)
            }
        },
        showModalRecommend: {
            get() {
                return this.$store.state.showModalRecommend
            },
            set(isShow) {
                if(this.showModalRecommend) {
                    this.$store.commit('setShowModalRecommend', isShow)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.friend-title {
    color: #27384D;
    font-size: 1.375rem;
    font-weight: 700;

    @media (min-width: 1200px) {
        font-size: 1.5625rem;
    }

    span {
        color: #909090;
        font-size: 0.75rem;

        @media (min-width: 1200px) {
            font-size: 0.8125rem;
        }
    }
}
.frienddetails {
    background-color: #F1F5F9;
    color: #3f3f3f;
    text-align: center;
    padding-bottom: 20px;

    @media (min-width: 1200px) {
        padding-bottom: 50px;
    }

    .recommend-box {
        padding: 8px 15px;
        background: #052C53;
        border-radius: 3px 3px 0 0;
        color: #fff;
        font-size: 0.9375rem;

        @media (min-width: 1200px) {
            font-size: 0.9375rem;

        }
    }
    .recommend {
        font-size: 1.375rem;
        padding-top: 25px;

        @media (min-width: 1200px) {
            font-size: 1.5625rem;
            padding-top: 35px;
        }
    }
}
.caution-box {
    background-color: #F1F5F9;

    .caution-title {
        padding: 8px 0;
        background: #0E3B72;
        border-radius: 3px 3px 0 0;
        color: #fff;
        font-size: 0.9375rem;

        @media (min-width: 1200px) {
            padding: 8px 15px;
            font-size: 0.9375rem;
        }

        span {
            color: #fff;
            margin-left: 20px;
        }
    }
    .caution-contents {
        color: #777;
        font-size: 0.625rem;

        @media (min-width: 1200px) {
            font-size: 0.8125rem;
            margin-left: 5px;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                padding: 1px 0;
                @media (min-width: 1200px) {
                    padding: 3px 0;
                }
            }
        }
        span {
            color: #A31616;
        }
    }
}
.history-title {
    color: #333;
    font-size: 0.9375rem;

    span {
        color: #3B7CCC;
    }
}
.money-list {

        .title {
            color: #333;
            font-size: 0.9375rem;
            line-height: 35px;

            span{
                color: #3B7CCC;
            }
        }
    }

</style>