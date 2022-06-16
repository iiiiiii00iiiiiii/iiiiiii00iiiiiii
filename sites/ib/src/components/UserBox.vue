<template>
    <div class="right-login-wrap">
        <div class="login-header">
            <font-awesome-icon :icon="['fa', 'user']" style="color: #fff"/> Member Info
        </div>
        <div class="user-box">
            <div class="user-info">
                <table class="w-100 mt-1">
                    <tr>
                        <td class="w-25 level-image-wrap">
                            <img class="img-level" :src="`/images/icon-lv${user.grade}.png`">
                        </td>
                        <td class="w-40 text-center cursor-pointer">
                            <span @click="$tools.pushRouter('/mypage')">{{ user.nick }} 님</span>
                        </td>
                        <td class="w-35 text-right pr-1">
                            <span class="login-out" :disabled="loading" @click="$tools.pushRouter('/logout', false)">
                                <font-awesome-icon :icon="['fa', 'sign-out-alt']"/> 로그아웃
                            </span>
                        </td>
                    </tr>
                </table>
                <table class="w-100">
                    <tr>
                        <td class="w-40 text-left">
                            <img src="/images/icon-money.png" alt="money" title="money">
                            <span>보유머니</span>
                        </td>
                        <td class="w-50 text-right pr-2">
                            <span class="user-money">{{ $numeral(user.money).format('0,0') }}</span>
                        </td>
                        <td class="w-10 cursor-pointer" @click="$tools.pushRouter('/charge', true)">
                            <img src="/images/icon-add-money.png" alt="money" title="money">
                        </td>
                    </tr>
                    <tr>
                        <td class="w-40 text-left">
                            <img src="/images/icon-point.png" alt="point" title="point">
                            <span>포인트</span>
                        </td>
                        <td class="w-50 text-right pr-2"
                            @click="$tools.pushRouter('/point', true)"
                        >
                            <span class="user-money point">{{ $numeral(user.point).format('0,0') }}</span>
                        </td>
                        <td class="w-10 cursor-pointer" @click="$tools.pushRouter('/point', true)">
                            <img src="/images/icon-add-point.png" alt="point" title="point">
                        </td>
                    </tr>
                </table>
            </div>
            <div class="user-quick-menu">
                <table class="w-100">
                    <tr>
                        <td class="cursor-pointer" @click="$tools.pushRouter('/charge', true)">
                            <img src="/images/right-quick-menu-icon.png">
                            <div>충전</div>
                        </td>
                        <td class="cursor-pointer" @click="$tools.pushRouter('/exchange', true)">
                            <img src="/images/right-quick-menu-icon-1.png">
                            <div>환전</div>
                        </td>
                        <td class="cursor-pointer" @click="$tools.pushRouter('/help', true)">
                            <img src="/images/right-quick-menu-icon-2.png">
                            <div>문의</div>
                        </td>
                        <td class="cursor-pointer" @click="$tools.pushRouter('/message', true)">
                            <img src="/images/right-quick-menu-icon-3.png">
                            <div>쪽지</div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="user-button-box">
                <table class="w-100 my-1">
                    <tr>
                        <td class="w-50" @click="$tools.pushRouter('/mypage', true)">
                            <span class="user-button-blue">
                                <font-awesome-icon :icon="['fa', 'user']"/> 마이페이지
                            </span>
                        </td>
                        <td class="w-50" @click="$tools.pushRouter('/frienddetails', true)">
                            <span class="user-button-red">
                                <font-awesome-icon :icon="['fa', 'users']"/> 추천인내역
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-50" @click="$tools.pushRouter('/betlist', true)">
                            <span class="user-button-blue">
                                <font-awesome-icon :icon="['fa', 'bars']"/> 베팅내역
                            </span>
                        </td>
                        <td class="w-50" @click="$tools.pushRouter('/attendance', true)">
                            <span class="user-button-red">
                                <font-awesome-icon :icon="['fa', 'clipboard-check']"/> 출석체크
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-50" @click="$tools.pushRouter('/notice', true)">
                            <span class="user-button-blue">
                                <font-awesome-icon :icon="['fa', 'bullhorn']"/> 공지사항
                            </span>
                        </td>
                        <td class="w-50" @click="$tools.pushRouter('/event', true)">
                            <span class="user-button-red">
                                <font-awesome-icon :icon="['fa', 'gift']"/> 이벤트
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
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
            ...mapActions(['setRouter'])
        }
    }
</script>
