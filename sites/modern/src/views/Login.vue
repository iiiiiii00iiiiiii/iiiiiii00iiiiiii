<template>
    <div class="row">
        <div class="col">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-xl-4 offset-xl-4 mt-0">
                        <div class="login">
                            <div class="logo-wrap">
                                <img src="/images/logo.png" class="cursor-pointer">
                            </div>
                            <div class="login-title">
                                로그인 후 다양한 혜택을 누리실 수 있습니다.
                            </div>
                            <div class="mt-4">
                                <form class="row" @submit.prevent="login()">
                                    <div class="col-12">
                                        <label for="id">아이디</label>
                                        <div class="form-group">
                                            <input
                                                type="text"
                                                class="form-control form-control-sm login-input"
                                                id="id"
                                                tabindex="1"
                                                maxlength="20"
                                                placeholder="아이디를 입력하세요."
                                                v-model="id"
                                            >
                                        </div>
                                        <label for="password">비밀번호</label>
                                        <div class="form-group">
                                            <input
                                                type="password"
                                                class="form-control form-control-sm login-input"
                                                tabindex="2"
                                                id="password"
                                                maxlength="50"
                                                placeholder="비밀번호를 입력하세요."
                                                autocomplete="new-password"
                                                v-model="password"
                                            >
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <button
                                                type="button"
                                                class="btn-cancel-login"
                                                tabindex="12"
                                                :disabled="loading"
                                                @click="$tools.pushRouter('/')"
                                            >
                                                <font-awesome-icon :icon="['fa', 'ban']" />
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <button type="submit" class="btn-login" tabindex="11" :disabled="loading">
                                                <font-awesome-icon :icon="['fa', 'sign-in-alt']" />
                                                로그인
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-1 text-light-brown">
                                        <span class="cursor-pointer" @click="$tools.pushRouter('/join')">아직 회원이 아니세요? 회원가입</span>
                                    </div>
                                </form>
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
        name: 'Login',
        data() {
            return {
                id: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(['loading'])
        },
        methods: {
            ...mapActions(['setRouter']),
            async login() {
                let r = await this.$http.get('/api/login', {
                    id: this.id,
                    password: this.password
                }, true)

                if(r.error) return

                localStorage.setItem('access-token', r.headers['access-token'])
                localStorage.setItem('duplicate', r.headers['duplicate'])

                // 구현부분
                this.$store.commit('setUser', {
                    _id: r.data._id,
                    id: r.data.id,
                    nick: r.data.nick,
                    bankOwner: r.data.bankOwner,
                    grade: r.data.grade,
                    status: r.data.status,
                    recommendCount: r.data.recommendCount,
                    recommendLevel: r.data.recommendLevel,
                    money: r.data.money,
                    point: r.data.point,
                    isAgent: r.data.isAgent
                })

                this.id = ''
                this.password = ''

                this.$tools.pushRouter('/home')
            }
        }
    }
</script>