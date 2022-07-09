<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'user']"/>
                마이 페이지 - <span>MYPAGE</span>
            </div>
            <div class="page-content-middle">
                <div class="row">
                    <div class="col-3">
                        <div class="title">아이디</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.id }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">닉네임</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.nick }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">예금주</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.bankOwner }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">계좌정보</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.bankOwner }} / {{ user.bank }} / {{ user.bankAccount }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="title">휴대폰번호</div>
                    </div>
                    <div class="col-9">
                        <div class="content">
                            <span>{{ user.cell }}</span>
                        </div>
                    </div>
                </div>
                <div class="set-money">
                    <button
                        type="button"
                        class="btn-select-denim"
                        @click="change(1)"
                    >
                        P 포인트내역
                    </button>
                    <button
                        type="submit"
                        class="btn-select-cinnabar ml-1"
                        @click="change(2)"
                    >
                        <font-awesome-icon :icon="['fa', 'cog']"/> 비밀번호변경
                    </button>
                </div>
            </div>
            <div class="list-content" v-show="select === 1">
                <div class="row mt-2">
                    <div class="col">
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
                                            <button type="button" class="btn-delete" :disabled="loading" @click="deletePoint(item._id)">삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col text-center">
                        <button type="button" class="btn-select-cinnabar" :disabled="loading" @click="deletePointAll()">
                            <font-awesome-icon :icon="['fa', 'trash-alt']"/> 전체삭제
                        </button>
                    </div>
                </div>
                <div class="row mt-4">
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
            <div class="page-content-middle" v-show="select === 2">
                <form @submit.prevent="editUser()">
                    <div class="row">
                        <div class="col-3">
                            <div class="title">현재비밀번호</div>
                        </div>
                        <div class="col-9">
                            <div class="content">
                                <span>
                                    <input
                                        type="password"
                                        tabindex="1"
                                        id="passwordNow"
                                        maxlength="50"
                                        placeholder="현재비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordNow"
                                    >
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="title">새 비밀번호</div>
                        </div>
                        <div class="col-9">
                            <div class="content">
                                <span>
                                    <input
                                        type="password"
                                        tabindex="2"
                                        id="password"
                                        maxlength="50"
                                        placeholder="새 비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="password"
                                    >
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="title">새 비밀번호확인</div>
                        </div>
                        <div class="col-9">
                            <div class="content">
                                <span>
                                    <input
                                        type="password"
                                        id="passwordRe"
                                        tabindex="3"
                                        maxlength="50"
                                        placeholder="새 비밀번호를 다시입력해주세요."
                                        autocomplete="new-password"
                                        v-model="passwordRe"
                                    >
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="title">출금 비밀번호</div>
                        </div>
                        <div class="col-9">
                            <div class="content">
                                <span>
                                    <input
                                        type="password"
                                        id="passwordExchange"
                                        tabindex="4"
                                        maxlength="50"
                                        placeholder="출금 비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordExchange"
                                    >
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="set-money">
                        <button 
                            type="submit" 
                            class="btn-set-money" 
                            tabindex="6" 
                            :disabled="loading">
                            <font-awesome-icon :icon="['fa', 'user']" />
                            변경하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Mypage',
        components: {
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
                passwordNow: '',
                password: '',
                passwordRe: '',
                passwordExchange: '',
                select: 1,
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
            },
            async editUser() {
                const r = await this.$http.put('/api/edit-user', {
                    passwordNow: this.passwordNow,
                    password: this.password,
                    passwordRe: this.passwordRe,
                    passwordExchange: this.passwordExchange
                })
                if(r.error) return

                this.passwordNow = ''
                this.password = ''
                this.passwordRe = ''
                this.passwordExchange = ''

                this.$tools.sw('success', '회원 정보 수정 성공', '회원 정보가 수정 되었습니다.', 'html')
            },
            change(i) {
                this.select = i
            },
        }
    }
</script>