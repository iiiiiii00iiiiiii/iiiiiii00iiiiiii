<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="userbox-wrap">
                            <div class="row">
                                <div class="col-12 mt-2 d-xl-none">
                                    <div class="mobile-partner-box">
                                        <div class="mobile-partner" @click="$tools.openNewTab('https://p.mt-11.com')">
                                            META <span>PARTNERSHIP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2 mt-xl-0">
                                <div class="col-8 pr-0">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="level-image-wrap">
                                                    <img :src="`/images/lv${user.grade}.png`" alt="level" title="level">
                                                </td>
                                                <td class="user-info-wrap">
                                                    <span class="user-level">Level {{ user.grade }}</span>
                                                    <div class="user-nick" @click="$tools.pushRouter('/mypage', true)">
                                                        {{ user.nick }}<span>님</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-4">
                                    <div class="user-logout mt-2">
                                        <div class="btn-logout">
                                            <span :disabled="loading" @click="$tools.pushRouter('/logout', false)">로그아웃</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-12">
                        <div class="moneybox-wrap">
                            <div class="row">
                                <div class="col-6">
                                    <img src="/images/icon-money.png" alt="money" title="money">
                                    <span class="money-title">보유머니</span>
                                </div>
                                <div class="col-6 clearfix pr-3">
                                    <div class="money-amount">{{ $numeral(user.money).format('0,0') }}</div>
                                    <div class="money-icon">
                                        <img src="/images/icon-add-money.png" alt="charge money" title="charge money" @click="$tools.pushRouter('/charge', true)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-12">
                        <div class="moneybox-wrap">
                            <div class="row">
                                <div class="col-6">
                                    <img src="/images/icon-point.png" alt="point" title="point">
                                    <span class="money-title">포인트</span>
                                </div>
                                <div class="col-6 clearfix pr-3">
                                    <div class="money-point">{{ $numeral(user.point).format('0,0') }}</div>
                                    <div class="money-icon">
                                        <img src="/images/icon-add-point.png" alt="charge point" title="charge point" @click="$tools.pushRouter('/point', true)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 px-0">
                <div class="left-mini-menu">
                    <table class="w-100">
                        <tr>
                            <td class="item-menu" @click="$tools.pushRouter('/charge', true)">
                                입금
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.pushRouter('/exchange')">
                                출금
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.pushRouter('/help')">
                                문의
                            </td>
                            <td class="line-vertical">
                                <img src="/images/vertical-line.jpg">
                            </td>
                            <td class="item-menu" @click="$tools.pushRouter('/message')">
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
        name: 'UserBox',
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
    .left-mini-menu {
        margin-top: 23px;
        .item-menu {

            &:hover {
                color: #e5e5e5;
            }
        }
    }
    .mobile-partner-box {

        .mobile-partner {
            background: linear-gradient(90deg, #AF246D 0%, #0053B6 100%);
            border-radius: 5px;
            color: #fff;
            font-size: 0.9375rem;
            padding: 0.5rem 0;
            text-align: center;
            cursor: pointer;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            span {
                margin-left: 5px;
            }
        }
    }
</style>