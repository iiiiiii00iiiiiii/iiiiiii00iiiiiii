<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            포인트 전환 <span>EXCHANGE POINT</span>
                        </div>
                        <hr class="mt-5">
                        <div class="notice-box">
                            <div class="notice-box-title">
                                주의사항
                            </div>
                            <div class="notice-box-content">
                                <ul>
                                    <li><span>최소 1원</span> 이상부터 전환 가능 합니다.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="notice-box mt-3">
                            <div class="horizon-line"></div>
                            <div class="money-p text-center my-4">
                                <span class="text-dark-black fs-1rem pr-4">현재 보유 포인트 : <span class="text-imp pl-2">{{ $numeral(user.point).format('0,0') }}</span></span>
                                <button type="button" class="btn-function px-4" :disabled="loading" @click="exchangePoint()">포인트 전환</button>
                            </div>
                            <div class="horizon-line"></div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <div class="money-list">
                            <div class="row">
                                <div class="col text-right">
                                    <button type="button" class="btn-board red" :disabled="loading" @click="deletePointAll()">
                                        전체삭제
                                    </button>
                                    <button type="button" class="btn-board ml-2" :disabled="loading" @click="getList()">
                                        새로고침
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col text-center">
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-money text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>일시</th>
                                                    <th>이전 머니</th>
                                                    <th>전환 포인트</th>
                                                    <th>이후 머니</th>
                                                    <th>삭제</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in data" :key="index">
                                                    <td>
                                                        {{ $moment(item.regDateTime).format('YY.MM.DD HH:mm') }}
                                                    </td>
                                                    <td>
                                                        {{ $numeral(item.before).format('0,0') }}
                                                    </td>
                                                    <td>
                                                        {{ $numeral(item.process).format('0,0') }}
                                                    </td>
                                                    <td>
                                                        {{ $numeral(item.after).format('0,0') }}
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn-board red delete" :disabled="loading" @click="deletePoint(item._id)">삭제</button>
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
        name: 'Point',
        components: {
            UrgentNotice
        },
        computed: {
            ...mapGetters(['loading', 'user']),
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
            ...mapActions(['getInformation']),
            setFromRouter() {
                this.search.page = this.$route.query.page ? this.$route.query.page : 1
                this.getList()
            },
            linkGen(page) {
                return `?page=${page}`
            },
            async getList() {
                const r = await this.$http.get('/api/get-point-list', this.search)
                if(r.error) return

                this.data = r.data.recordSet
                this.totalCount = r.data.recordCount
            },
            // [포인트 전환]
            async exchangePoint() {
                const r = await this.$http.post('/api/exchange-point')
                if(r.error) return

                this.chargeAmount = 0
                this.$tools.sw('success', '포인트 전환 성공', '포인트 전환이 완료되었습니다.', null, this.getList)
                this.getInformation()
            },
            // [포인트 내역 삭제]
            async deletePoint(_id) {
                this.$sw.fire({
                    title: '포인트 내역 삭제',
                    text: '포인트 내역을 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-point', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '포인트 내역 삭제 성공', '포인트 내역이 삭제 되었습니다.', null, this.getList)
                    }
                })
            },
            async deletePointAll(_id) {
                this.$sw.fire({
                    title: '포인트 내역 전체 삭제',
                    text: '포인트 내역을 전체 삭제 하시겠습니까?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    focusConfirm: false
                }).then(async (result) => {
                    if(result.value) {
                        let rDelete = await this.$http.delete('/api/delete-point-all', {
                            _id
                        })
                        if(rDelete.error) return

                        this.$tools.sw('success', '포인트 내역 전체 삭제 성공', '포인트 내역이 전체 삭제 되었습니다.', null, this.getList)
                    }
                })
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