<template>
    <div class="right-login-wrap">
        <div class="login-header">
            <font-awesome-icon :icon="['fa', 'user']" style="color: #fff"/> Member Login
        </div>
        <div class="login-form">
            <form @submit.prevent="login()">
                <table class="w-100">
                    <tr>
                        <td class="login-form-icon">
                            <font-awesome-icon :icon="['fa', 'user']" style="color: #fff"/>
                        </td>
                        <td>
                            <input
                                type="text"
                                class="w-100 px-2 input-login"
                                placeholder="아이디"
                                tabindex="1"
                                maxlength="20"
                                v-model="id"
                            >
                        </td>
                        <td rowspan="2">
                            <button
                                type="submit"
                                class="input-submit"
                                tabindex="3"
                                :disabled="loading"
                            >
                                Login
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <font-awesome-icon :icon="['fa', 'lock']" style="color: #fff"/>
                        </td>
                        <td>
                            <input
                                type="password"
                                class="w-100 px-2 input-login"
                                placeholder="패스워드"
                                tabindex="2"
                                maxlength="50"
                                v-model="password"
                            >
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="outlogin-button">
            <span class="register-form" @click="$tools.pushRouter('/join', false)">
                <font-awesome-icon :icon="['fa', 'user-plus']" style="color: #fff"/> 회원가입
            </span>
            <span class="unknown-customer-form" @click="$tools.ready('/', true)">
                <font-awesome-icon :icon="['fa', 'pen-square']" style="color: #fff"/> 비회원문의
            </span>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
        },
        data() {
            return {
                id: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(['loading', 'user'])
        },
        methods: {
            ...mapActions(['setRouter', 'setBetInfo']),
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

                this.setBetInfo({
                    min: r.data.betInfo[`lv${this.user.grade}`].min,
                    max: r.data.betInfo[`lv${this.user.grade}`].max,
                    benefit: r.data.betInfo[`lv${this.user.grade}`].benefit
                })

                this.id = ''
                this.password = ''
            }
        }
    }
</script>
