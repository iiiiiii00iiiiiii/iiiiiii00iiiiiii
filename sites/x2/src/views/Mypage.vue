<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col-12">
                        <div class="title">
                            마이페이지 <span>MYPAGE</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5 d-none d-xl-block">
                <div class="row mt-4 mt-xl-3">
                    <div class="col-12 px-0 px-xl-3">
                        <div class="notice-box">
                            <div class="notice-box-title">
                                주의사항
                            </div>
                            <div class="notice-box-content">
                                <ul>
                                    <li>비밀번호 및 출금비밀번호 수정이 가능합니다. <span class="red">(최소 4자 이상 입력해주세요.)</span></li>
                                    <li>타인에게 계정양도 및 아이디 대여시 <span class="red">정지 또는 탈퇴처리 됩니다.</span></li>
                                    <li>출금계좌 변경은 고객센터로 문의주시기 바랍니다.</li>
                                    <li>정기적으로 비밀번호 및 출금비밀번호를 변경하시길 권장 합니다.</li>
                                    <li>개인정보 도용 및 악의적인 사용자에 의해 피해를 최대한 방지하기 위해서 쉽게 추측이 가능한 비밀번호 사용을 자제 하시기 바랍니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="horizon-line my-xl-3"></div>
                <div class="row mt-xl-4">
                    <div class="col-12 col-xl-4 offset-xl-4 change-info">
                        <div class="row">
                            <div class="col">
                                <div class="title">정보변경</div>
                                <div class="title-sub">
                                    <span>{{ user.nick }}</span> 님의 회원정보 입니다
                                </div>
                            </div>
                        </div>
                        <hr class="mt-4">
                        <div class="row">
                            <div class="col-10 offset-1">
                                <div class="mypage">
                                    <form @submit.prevent="editUser()">
                                        <div class="row">
                                            <label class="col-12 col-xl-4 pt-xl-2" for="id">아이디</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="text"
                                                    class="form-control join-input"
                                                    id="id"
                                                    tabindex="1"
                                                    maxlength="20"
                                                    readonly
                                                    :value="user.id"
                                                >
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <label class="col-12 col-xl-4 pt-xl-2" for="nick">닉네임</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="text"
                                                    class="form-control join-input"
                                                    id="nick"
                                                    tabindex="2"
                                                    maxlength="20"
                                                    readonly
                                                    :value="user.nick"
                                                >
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <label class="col-12 col-xl-4 pt-xl-2" for="passwordNow">현재 비밀번호</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="password"
                                                    class="form-control join-input"
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
                                            <label class="col-12 col-xl-4 pt-xl-2" for="password">변경 비밀번호</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="password"
                                                    class="form-control join-input"
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
                                            <label class="col-12 col-xl-4 pt-xl-2" for="passwordRe">비밀번호 확인</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="password"
                                                    class="form-control join-input"
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
                                            <label class="col-12 col-xl-4 pt-xl-2" for="passwordRe">출금 비밀번호</label>
                                            <div class="col-12 col-xl-8">
                                                <input
                                                    type="password"
                                                    class="form-control join-input"
                                                    id="passwordExchange"
                                                    tabindex="6"
                                                    maxlength="50"
                                                    placeholder="출금 비밀번호를 입력하세요."
                                                    autocomplete="new-password"
                                                    v-model="passwordExchange"
                                                >
                                            </div>
                                        </div>
                                        <div class="row mt-4 mb-5">
                                            <div class="col-12 text-center">
                                                <button type="submit" class="btn-board btn-block" tabindex="7" :disabled="loading">
                                                    변경하기
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
    import { mapGetters } from 'vuex'

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'Mypage',
        components: {
            UrgentNotice
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

<style lang="scss" scoped>

    .change-info {
        border: 1px solid #fff;
        padding-bottom: 30px;

        @media (min-width: 1200px) {
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        }

        .title {
            color: #333;
            font-size: 1.25rem;
            text-align: center;
            margin-top: 20px;

            @media (min-width: 1200px) {
                font-size: 1.5625rem;
            }
        }
        .title-sub {
            color: #909090;
            font-size: 0.8125rem;
            text-align: center;

            span {
                color: #0E3B72;
                font-size: 0.8125rem;

                @media (min-width: 1200px) {
                    font-size: 0.875rem;
                }
            }
        }
        .btn-board {
            background-color: #052C53;
            font-size: 0.9375rem;
            padding: 12px 0;
        }
    }
    input {
        font-size: 0.625rem;
    }
</style>