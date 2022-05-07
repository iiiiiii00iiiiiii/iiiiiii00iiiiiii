<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="px-1">
                    <form @submit.prevent="login()">
                        <div class="row">
                            <div class="col-12">
                                <input
                                    type="text"
                                    class="w-100 input-login"
                                    placeholder="아이디"
                                    tabindex="1"
                                    maxlength="20"
                                    v-model="id"
                                >
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <input
                                    type="password"
                                    class="w-100 input-login"
                                    placeholder="비밀번호"
                                    tabindex="2"
                                    maxlength="50"
                                    v-model="password"
                                >
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-6 pr-2">
                                <button type="submit" class="btn-login-login">로그인</button>
                            </div>
                            <div class="col-6 pl-2">
                                <button type="button" class="btn-login-join" @click="$tools.pushRouter('/join', false)">회원가입</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 px-0">
                <div class="left-mini-menu">
                    <table class="w-100">
                        <tr>
                            <td class="item-menu" @click="$tools.routerPush('/charge')">
                                입금
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.routerPush('/exchange')">
                                출금
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.routerPush('/help')">
                                문의
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.routerPush('/message')">
                                쪽지
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'LoginBox',
        computed: {
                ...mapGetters(['loading', 'user'])
            },
        data() {
            return {
                id: '',
                password: ''
            }
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
                    min: r.data.betInfo[`lv${this.user.grade}`] ? r.data.betInfo[`lv${this.user.grade}`].min : 0,
                    max: r.data.betInfo[`lv${this.user.grade}`] ? r.data.betInfo[`lv${this.user.grade}`].max : 0,
                    benefit: r.data.betInfo[`lv${this.user.grade}`] ? r.data.betInfo[`lv${this.user.grade}`].benefit : 0
                })

                this.id = ''
                this.password = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-mini-menu {
        margin-top: 68px;
    }
</style>
