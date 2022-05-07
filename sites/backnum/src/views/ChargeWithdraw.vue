<template>
    <div>
        <div class="row p-xl-3">
            <div class="col-12 mt-4 exchange-title">
                충/환전내역 <span>CHARGE / WITHDRAW</span>
            </div>
        </div>
        <div class="row p-xl-3">
            <div class="col-12">
                <div class="modal-title">
                    <div class="row">
                        <div class="col">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-purple px-3">
                                충/환전내역
                            </button>
                        </div>
                        <div class="col text-right">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-purple mr-2 px-3"
                                :disabled="disabledButton"
                                @click="initList()"
                            >
                                <font-awesome-icon class="cursor-pointer" :icon="['fa', 'sync-alt']"/> <span class="d-none d-xl-inline">새로고침</span>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger px-3"
                                :disabled="disabledButton"
                                @click="deleteChargeExchangeAll()"
                            >
                                <font-awesome-icon class="cursor-pointer" :icon="['fa', 'trash-alt']"/> <span class="d-none d-xl-inline">전체삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-xl-3">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table text-center">
                        <thead class="thead-violet-exchange">
                            <tr>
                                <th scope="col">일시</th>
                                <th scope="col">종류</th>
                                <th scope="col">금액</th>
                                <th scope="col">상태</th>
                                <th scope="col">삭제</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-violet-exchange">
                            <tr v-for="(v, index) in data" :key="index">
                                <td>
                                    {{ $moment(v.regDateTime).format('YYYY-MM-DD HH:mm') }}
                                </td>
                                <td :class="v.type === 'C' ? 'text-light-green' : 'text-pink'">
                                    {{ v.type === 'C' ? '충전' : '환전' }}
                                </td>
                                <td>
                                    {{ $numeral(v.money).format('0,0') }}
                                </td>
                                <td :class="v.type === 'C' ? $config.statusChargeClass[v.status] : $config.statusExchangeClass[v.status]">
                                    {{ v.type === 'C' ? $config.statusCharge[v.status] : $config.statusExchange[v.status] }}
                                </td>
                                <td>
                                    <button
                                        class="btn btn-outline-purple btn-xs  bg-danger"
                                        v-if="v.status !== 0"
                                        @click="deleteChargeExchange(v._id)"
                                    >
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'trash-alt']"/> 삭제
                                    </button>
                                    <span v-if="v.status === ''">-</span>
                                </td>
                            </tr>
                            <!-- <tr v-for="(v, index) in data" :key="index">
                                <td>
                                    {{ $moment(v.regDateTime).format('YYYY-MM-DD HH:mm') }}
                                </td>
                                <td class="text-light-green">
                                    충전
                                </td>
                                <td>
                                    {{ $numeral(v.money).format('0,0') }}
                                </td>
                                <td :class="$config.statusChargeClass[v.status]">
                                    {{ $config.statusCharge[v.status] }}
                                </td>
                                <td>
                                    <button
                                        class="btn btn-outline-purple bg-danger btn-xs"
                                        v-if="v.status !== 0"
                                        @click="deleteCharge(v._id)"
                                    >
                                        <font-awesome-icon class="cursor-pointer" :icon="['fa', 'trash-alt']"/> 삭제
                                    </button>
                                    <span v-if="v.status === ''">-</span>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body bg-pagination">
                        <b-pagination
                            first-class="first-class"
                            last-class="last-class"
                            prev-class="prev-class"
                            next-class="next-class"
                            ellipsis-class="ellipsis-class"
                            page-class="page-class"
                            :total-rows="totalCount"
                            :per-page="$config.pageSize"
                            :limit="$config.pageLimit"
                            align="center"
                            v-model="search.page"
                            @change="linkGen"
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChargeWithdraw',
    data() {
        return {
            search: {
                page: 1
            },
            data: [],
            totalCount: 0,
            beforeAmount: 0,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            let rExchange = await this.$http.get('/api/charge-exchange-list', this.search)
            if(rExchange.error) return

            // 구현부분
            this.data = rExchange.data.recordSet
            this.totalCount = rExchange.data.recordCount
        },
        initList() {
            this.page = 1
            this.getList()
        },
        linkGen(pageNum) {
            this.search.page = pageNum
            this.getList()
        },
        // 출금내역 삭제
        async deleteChargeExchange(_id) {
            let rDelete = await this.$http.delete('/api/charge-exchange-delete', {
                _id
            })
            if(rDelete.error) return

            this.$tools.sw('success', '내역 삭제 성공', '내역이 삭제 되었습니다.')
            this.getList()
        },
        // 내역 전체삭제
        async deleteChargeExchangeAll() {
            let rDelete = await this.$http.delete('/api/charge-exchange-delete-all')
            if(rDelete.error) return

            this.$tools.sw('success', '내역 삭제 성공', '내역이 삭제 되었습니다.')
            this.getList()
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
        showModalExchange: {
            get() {
                return this.$store.state.showModalExchange
            },
            set(isShow) {
                if(this.showModalExchange) {
                    this.$store.commit('setShowModalExchange', isShow)
                }
            }
        },
    }
}
</script>
<style lang="scss" scoped>

.exchange-title {
    font-size: 1.375rem;
    font-weight: 600;

    @media (min-width: 1200px) {
        font-size: 1.875rem;
    }

    span {
        color: #7286A6;
        font-size: 0.75rem;

        @media (min-width: 1200px) {
            font-size: 0.9375rem;
        }
    }
}
</style>