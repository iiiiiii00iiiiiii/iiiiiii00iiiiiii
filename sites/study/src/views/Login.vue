<template>
    <div class="row mt-3 mt-xl-5">
        <div class="col-12 col-xl-4"></div>
        <div class="col-12">
            <div class="row">
                <div class="col-12 text-center">
                    <img src="/images/study.png" class="img-fluid cursor-pointer" @click="$tools.pushRouter('/')">
                </div>
            </div>
            <form class="row mt-3" @submit.prevent="login()">
                <div class="col-12 col-xl-4 offset-xl-4 px-3 px-xl-5">
                    <div class="login-box px-xl-5">
                        <div class="row">
                            <div class="col">
                                <div class="title">
                                    로그인
                                </div>
                                <div class="sub-title">
                                    로그인 후 사이트 이용이 가능 합니다.
                                </div>
                                <div class="join-login">
                                    <span
                                        @click="$tools.pushRouter('/join')"
                                    >
                                        회원가입 <font-awesome-icon :icon="['fa', 'chevron-right']"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <label class="item-title" for="id">아이디</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="id"
                                        tabindex="1"
                                        maxlength="20"
                                        placeholder="아이디를 입력하세요."
                                        v-model="id"
                                    >
                                </div>
                                <label class="item-title" for="password">비밀번호</label>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        class="form-control input"
                                        tabindex="2"
                                        id="password"
                                        maxlength="50"
                                        placeholder="비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="password"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <button type="submit" class="btn-login">로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-12 col-xl-4"></div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Login',
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                id: '',
                password: ''
            }
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

                this.$tools.pushRouter('/')
            }
        }
    }
</script>