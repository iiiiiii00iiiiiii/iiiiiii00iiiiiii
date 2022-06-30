<template>
    <div class="login-box">
        <form @submit.prevent="login()">
            <table class="w-100">
                <tr height="30">
                    <td class="w-70">
                        <input
                            type="text"
                            class="w-100 px-2 input-login"
                            placeholder="아이디"
                            tabindex="1"
                            maxlength="20"
                            v-model="id"
                        >
                    </td>
                    <td class="w-30" rowspan="2">
                        <button
                            type="submit"
                            class="input-submit"
                            tabindex="3"
                            :disabled="loading"
                        >
                            <font-awesome-icon :icon="['fa', 'sign-in-alt']" class="text-skyblue"/> 로그인
                        </button>
                    </td>
                </tr>
                <tr height="30">
                    <td class="w-70">
                        <input
                            type="password"
                            class="w-100 px-2 input-login"
                            placeholder="비밀번호"
                            tabindex="2"
                            maxlength="50"
                            v-model="password"
                        >
                    </td>
                </tr>
                <tr height="30">
                    <td class="pl-1" colspan="2">
                       <span class="cursor-pointer" @click="$tools.pushRouter('/join', false)">나초 회원가입</span>
                    </td>
                </tr>
            </table>
        </form>
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

<style lang="scss" scoped>
    .login-box {
        padding: 2px;
        border: 1px solid #080500;
        border-radius: 3px;
        background-color: #212121;

        table {
            border-collapse: collapse;

            tr {
                td {
                    background-color: #242a30;
                    color: #c2c2c2;
                    font-size: 0.75rem;
                    border: 1px solid #191919;

                    .input-login {
                        background-color: #080500;
                        color: #f3d29c;
                        border: 0;
                        height: 30px;

                        &::placeholder {
                            color: #c2c2c2;
                        }

                        &:focus {
                            outline: 0;
                            box-shadow: none;
                        }
                    }
                    .input-submit {
                        padding: 0;
                        width: 100%;
                        height: 63px;
                        border: 0;
                        color: #fff;
                        font-weight: 800;
                        background-color: #212121;
                        transition: 0.3s;

                        &:hover {
                            color: #f3d29c;
                            transition: 0.5s;
                        }

                        &:focus {
                            outline: 0;
                            box-shadow: none;
                        }
                    }
                }
            }
        }

        .img-level {
            width: 50px;
            margin-bottom: 5px;
        }
    }
</style>