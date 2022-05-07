<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'user']"/>
                            <span class="ml-2">마이 페이지 MYPAGE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="mypage">
                        <form @submit.prevent="editUser()">
                            <div class="row">
                                <label class="col-12 col-xl-2 pt-xl-2" for="id">아이디</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm join-input"
                                        id="id"
                                        tabindex="1"
                                        maxlength="20"
                                        readonly
                                        :value="user.id"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <label class="col-12 col-xl-2 pt-xl-2" for="nick">닉네임</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm join-input"
                                        id="nick"
                                        tabindex="2"
                                        maxlength="20"
                                        readonly
                                        :value="user.nick"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <label class="col-12 col-xl-2 pt-xl-2" for="passwordNow">현재 비밀번호</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm join-input"
                                        tabindex="3"
                                        id="passwordNow"
                                        maxlength="50"
                                        placeholder="비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordNow"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <label class="col-12 col-xl-2 pt-xl-2" for="password">변경 비밀번호</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm join-input"
                                        tabindex="4"
                                        id="password"
                                        maxlength="50"
                                        placeholder="변경 하실 비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="password"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <label class="col-12 col-xl-2 pt-xl-2" for="passwordRe">변경 비밀번호 확인</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm join-input"
                                        id="passwordRe"
                                        tabindex="5"
                                        maxlength="50"
                                        placeholder="변경 비밀번호 확인"
                                        autocomplete="new-password"
                                        v-model="passwordRe"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <label class="col-12 col-xl-2 pt-xl-2" for="passwordRe">출금 비밀번호</label>
                                <div class="col-12 col-xl-10">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm join-input"
                                        id="passwordExchange"
                                        tabindex="6"
                                        maxlength="50"
                                        placeholder="출금 비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordExchange"
                                    >
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-12 text-center">
                                    <button
                                        type="button"
                                        class="btn-cancel-mypage"
                                        tabindex="8"
                                        :disabled="loading"
                                        @click="$tools.historyGo(-1)"
                                    >
                                        <font-awesome-icon :icon="['fa', 'ban']" />
                                        취소
                                    </button>
                                    <button type="submit" class="btn-mypage ml-2" tabindex="7" :disabled="loading">
                                        <font-awesome-icon :icon="['fa', 'user']" />
                                        수정
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Mypage',
        components: {
        },
        computed: {
            ...mapGetters(['loading', 'user'])
        },
        data() {
            return {
                passwordNow: '',
                password: '',
                passwordRe: '',
                passwordExchange: ''
            }
        },
        methods: {
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
            }
        }
    }
</script>