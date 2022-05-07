<template>
    <div>
        <div class="mt-2">
            <div class="row">
                <div class="col-12 bg-title-wrap">
                    <div class="row p-2">
                        <div class="col-12 rounded bg-title py-2 font-weight-bold text-1rem text-white">
                            <font-awesome-icon :icon="['fa', 'user']"/> 마이페이지 MYPAGE
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-content">
                    <div class="row">
                        <div class="col-12 col-lg-6 offset-lg-3 py-4">
                            <div class="join-box">
                                <div class="title">
                                    <font-awesome-icon class="text-info" :icon="['fa', 'user']"/> MYPAGE
                                </div>
                                <div class="mt-3">
                                    <form @submit.prevent="submit">
                                        <div class="form-group row">
                                            <label for="id" class="col-lg-3 col-form-label">아이디</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                    id="id"
                                                    placeholder="아이디"
                                                    maxlength="20"
                                                    :value="$store.state.user.id"
                                                    readonly
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="nick" class="col-lg-3 col-form-label">닉네임</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                    id="nick"
                                                    placeholder="닉네임"
                                                    maxlength="20"
                                                    :value="$store.state.user.nick"
                                                    readonly
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordNow" class="col-lg-3 col-form-label">현재 비밀번호</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-sm"
                                                    id="passwordNow"
                                                    placeholder="현재 비밀번호"
                                                    maxlength="50"
                                                    v-model="passwordNow"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="password" class="col-lg-3 col-form-label">비밀번호</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-sm"
                                                    id="password"
                                                    placeholder="비밀번호"
                                                    maxlength="50"
                                                    v-model="password"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordRe" class="col-lg-3 col-form-label">비밀번호 확인</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-sm"
                                                    id="passwordRe"
                                                    placeholder="비밀번호 확인"
                                                    maxlength="50"
                                                    v-model="passwordRe"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordExchange" class="col-lg-3 col-form-label">출금 비밀번호</label>
                                            <div class="col-lg-9">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-sm"
                                                    id="passwordExchange"
                                                    placeholder="출금 비밀번호"
                                                    maxlength="50"
                                                    v-model="passwordExchange"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="offset-lg-3 col-lg-9">
                                                <button
                                                    type="submit"
                                                    class="btn btn-sm btn-info btn-block font-weight-bold"
                                                    :disabled="disabledButton"
                                                >
                                                    <font-awesome-icon :icon="['fa', 'user']"/> 수정
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
export default {
    name: 'Mypage',
    data() {
        return {
            passwordNow: '',
            password: '',
            passwordRe: '',
            passwordExchange: ''
        }
    },
    methods: {
        async submit() {
            let resultUpdate = await this.$http.put('/api/mypage', {
                passwordNow: this.passwordNow,
                password: this.password,
                passwordRe: this.passwordRe,
                passwordExchange: this.passwordExchange
            })

            if(resultUpdate.error) return
            this.$tools.sw('success', '수정완료', '회원정보가 수정 되었습니다.')

            this.passwordNow = ''
            this.password = ''
            this.passwordRe = ''
            this.passwordExchange = ''
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
        }
    }
}
</script>
<style lang="scss" scoped>
    .join-box {
        background-color: rgba(0, 0, 0, 0.4);
        padding: 1rem;
        border: 1px solid #323232;

        .title {
            font-weight: 600;
            font-size: 1.75rem;
            color: #ffffff;
        }

        label {
            font-weight: 600;
            color: #ffffff;
        }
    }
</style>