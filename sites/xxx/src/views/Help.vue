<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">고객센터 HELP</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-list">
                        <div class="row">
                            <div class="col button-list">
                                <button type="button" class="btn-board" :disabled="loading" @click="deleteHelpAll()">
                                    <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체삭제
                                </button>
                                <button type="button" class="btn-board ml-1 ml-md-2" :disabled="loading" @click="getList()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                                <button type="button" class="btn-write ml-1 ml-md-2" :disabled="loading" @click="requestChargeInformation()">
                                    <font-awesome-icon :icon="['fa', 'comments']"/> 입금계좌 문의
                                </button>
                                <button type="button" class="btn-write ml-1 ml-md-2" :disabled="loading" @click="$tools.pushRouter(`/help-write/${search.page}`)">
                                    <font-awesome-icon :icon="['fa', 'comments']"/> 문의하기
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-board text-nowrap">
                                        <thead>
                                            <tr>
                                                <th class="w-10">일시</th>
                                                <th>제목</th>
                                                <th class="w-10">상태</th>
                                                <th class="w-10">삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in data" :key="index">
                                                <td>
                                                    {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
                                                </td>
                                                <td>
                                                    <span
                                                        class="cursor-pointer"
                                                        @click="$tools.pushRouter(`/help/detail/${item._id}/${search.page}`)"
                                                    >
                                                        {{ item.title }}
                                                    </span>
                                                </td>
                                                <td :class="$config.helpStatusClass[item.answerStatus]">
                                                    {{ $config.helpStatus[item.answerStatus] }}
                                                </td>
                                                <td>
                                                    <button type="button" class="btn-delete" :disabled="loading" @click="deleteHelp(item._id)">삭제</button>
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
        name: 'Help',
        components: {
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