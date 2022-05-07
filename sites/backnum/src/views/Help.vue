<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            고객센터 <span>CS CENTER</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-xl-5 d-none d-xl-block">
                <div class="row mt-3">
                    <div class="col">
                        <div class="board-list">
                            <div class="row">
                                <div class="col text-right pb-2">
                                    <button type="button" class="btn-board red" :disabled="loading" @click="deleteHelpAll()">
                                        전체삭제
                                        <!-- <span class="ml-1 d-none d-xl-inline">전체삭제</span> -->
                                    </button>
                                    <button type="button" class="btn-board ml-2" :disabled="loading" @click="getList()">
                                        새로고침
                                        <!-- <span class="ml-1 d-none d-xl-inline">새로고침</span> -->
                                    </button>
                                    <button type="button" class="btn-board dark ml-2" :disabled="loading" @click="requestChargeInformation()">
                                        계좌문의
                                        <!-- <span class="ml-1 d-none d-xl-inline">계좌문의</span> -->
                                    </button>
                                    <button type="button" class="btn-board ml-2" :disabled="loading" @click="$tools.pushRouter(`/help-write/${search.page}`)">
                                        문의하기
                                        <!-- <span class="ml-1 d-none d-xl-inline">문의하기</span> -->
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-1 mt-xl-2">
                                <div class="col px-0 px-xl-3">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-board text-nowrap table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="w-20 text-center">일시</th>
                                                    <th class="w-35 text-center">제목</th>
                                                    <th class="w-20 text-center">결과</th>
                                                    <th class="w-10 text-center">삭제</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in data" :key="index">
                                                    <td class="text-center">
                                                        {{ $moment(item.regDateTime).format('YYYY-MM-DD HH:mm') }}
                                                    </td>
                                                    <td class="text-center">
                                                        <span
                                                            class="cursor-pointer"
                                                            @click="$tools.pushRouter(`/help/detail/${item._id}/${search.page}`)"
                                                        >
                                                            {{ item.title }}
                                                        </span>
                                                    </td>
                                                    <td class="text-center" :class="$config.helpStatusClass[item.answerStatus]">
                                                        {{ $config.helpStatus[item.answerStatus] }}
                                                    </td>
                                                    <td class="text-center">
                                                        <button type="button" class="btn-board red delete" :disabled="loading" @click="deleteHelp(item._id)">삭제</button>
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
    import { mapGetters, mapActions } from 'vuex'

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Help',
        components: {
            UrgentNotice
        },
        computed: {
            ...mapGetters(['loading', 'helpReplace']),
            numberOfPages() {
                return Math.ceil(this.totalCount / this.$config.pageSize) === 0 ? 1 : Math.ceil(this.totalCount / this.$config.pageSize)
            }
        },
        watch: {
            '$route' () {
                this.setFromRouter()
            },
            helpReplace(newValue) {
                if(newValue) {
                    this.getList()
                    this.setHelpReplace(false)
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
            ...mapActions(['setHelpReplace']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-help-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            async deleteHelp(_id) {
                this.$sw.fire({
                    title: '문의 내역 삭제',
                    text: '문의 내역을 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-help', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '문의 내역 삭제 성공', '문의 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteHelpAll(_id) {
                this.$sw.fire({
                    title: '문의 내역 전체 삭제',
                    text: '문의 내역을 전체 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-help-all', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '문의 내역 삭제 성공', '문의 내역이 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async requestChargeInformation() {
                const rRequestChargeInformation = await this.$tools.requestChargeInformation()
                if(rRequestChargeInformation) {
                    this.getList()
                }
            }
        }
    }
</script>