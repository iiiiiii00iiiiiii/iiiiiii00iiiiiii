<template>
    <div>
        <div class="mt-2">
            <div class="row">
                <div class="col-12 bg-title-wrap">
                    <div class="row p-2">
                        <div class="col-12 rounded bg-title py-2 font-weight-bold text-1rem text-white">
                            <font-awesome-icon :icon="['fa', 'sign-in-alt']"/> 로그인 MEMBER LOGIN
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-content">
                    <div class="row">
                        <div class="col-12 col-lg-6 offset-lg-3 py-4">
                            <div class="login-box">
                                <div class="title">
                                    <font-awesome-icon class="text-skyblue" :icon="['fa', 'sign-in-alt']"/> MEMBER LOGIN
                                </div>
                                <div class="mt-2">
                                    <form @submit.prevent="login">
                                        <div class="form-group">
                                            <input
                                                type="text"
                                                class="form-control input-login"
                                                placeholder="아이디"
                                                maxlength="20"
                                                v-model="id"
                                            >
                                        </div>
                                        <div class="form-group">
                                            <input
                                                type="password"
                                                class="form-control input-login"
                                                placeholder="비밀번호"
                                                maxlength="50"
                                                v-model="password"
                                            >
                                        </div>
                                        <button
                                            type="submit"
                                            class="btn btn-primary btn-block font-weight-bold"
                                            :disabled="disabledButton"
                                        >
                                            <font-awesome-icon :icon="['fa', 'sign-in-alt']"/> 로그인
                                        </button>
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
    name: 'Login',
    data() {
        return {
            id: '',
            password: ''
        }
    },
    created() {
        this.$cookies.remove('_U_')
        this.$cookies.remove('_D_')
    },
    methods: {
        async login() {
            let resultLogin = await this.$http.get('/api/login', {
                id: this.id,
                password: this.password
            }, 'Login')

            if(resultLogin.error) {
                if(resultLogin.error.response.status === 401) {
                    this.$tools.sw('warning', '로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.')
                }
                else if(resultLogin.error.response.status === 403) {
                    this.$tools.sw('warning', '로그인 실패', '관리자에게 문의하세요.')
                }
                return
            }

            //구현부분
            this.$store.dispatch('getInformation')

            this.$tools.routerPush('/')
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
    .login-box {
        background-color: rgba(0, 0, 0, 0.4);
        padding: 1rem;
        border: 1px solid #323232;

        .title {
            font-weight: 600;
            font-size: 1.75rem;
            color: #ffffff;
        }

        .input-login {
            background-color: #ffffffe0;
        }
    }
</style>