<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'envelope']"/>
                쪽지 - <span>MESSAGE</span>
            </div>
            <div class="list-content">
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table table-borderless table-board text-nowrap">
                                <thead>
                                    <tr>
                                        <th class="w-10">#</th>
                                        <th class="w-10">일시</th>
                                        <th>제목</th>
                                        <th >삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in data" :key="index"
                                    >
                                        <td :class="item.checkStatus">
                                            <font-awesome-icon :icon="['fa', item.checkStatus ? 'envelope-open' : 'envelope']"/>
                                        </td>
                                        <td :class="item.checkStatus">
                                            {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
                                        </td>
                                        <td :class="item.checkStatus">
                                            <span
                                                class="cursor-pointer text-white"
                                                @click="$tools.pushRouter(`/message/detail/${item._id}/${search.page}`)"
                                            >
                                                {{ item.title }}
                                            </span>
                                        </td>
                                        <td>
                                            <button type="button" class="btn-delete" :disabled="loading" v-if="item.checkStatus" @click="deleteMessage(item._id)">삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col text-right">
                        <button type="button" class="btn-select-denim" :disabled="loading" @click="checkMessageAll()">
                            <font-awesome-icon :icon="['fa', 'check-square']"/> 전체읽기
                        </button>
                        <button type="button" class="btn-select-cinnabar ml-2" :disabled="loading" @click="deleteMessageAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체삭제
                        </button>
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
        name: 'Message',
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
                const r = await this.$http.get('/api/get-message-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            async checkMessageAll(_id) {
                let rCheck = await this.$http.put('/api/check-message-all', {
                    _id
                })
                if(rCheck.error) return

                this.$tools.sw('success', '쪽지 읽기 성공', '쪽지가 읽기 되었습니다.', null, this.getList)
            },
            async deleteMessage(_id) {
                this.$sw.fire({
                    title: '쪽지 삭제',
                    text: '쪽지를 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-message', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '쪽지 삭제 성공', '쪽지가 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deleteMessageAll(_id) {
                this.$sw.fire({
                    title: '쪽지 전체 삭제',
                    text: '쪽지를 전체 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-message-all', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '쪽지 전체 삭제 성공', '쪽지가 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
            }
        }
    }
</script>