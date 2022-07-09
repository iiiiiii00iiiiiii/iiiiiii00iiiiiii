<template>
    <div class="right-login-wrap">
        <div class="login-header">
            <font-awesome-icon :icon="['fa', 'user']" style="color: #fff"/> Member Info
        </div>
        <div class="user-box">
            <div class="user-info">
                <table class="w-100 mt-1">
                    <tr>
                        <td class="w-50 level-image-wrap text-left pl-2">
                            <img class="img-level pb-1" :src="`/images/icon-lv${user.grade}.png`">
                            <span class="cursor-pointer pl-2" @click="$tools.pushRouter('/mypage')">{{ user.nick }} 님</span>
                        </td>
                        <td class="w-50 text-right pr-2">
                            <span class="login-out" :disabled="loading" @click="$tools.pushRouter('/logout', false)">
                                <font-awesome-icon :icon="['fa', 'sign-out-alt']"/> 로그아웃
                            </span>
                        </td>
                    </tr>
                </table>
                <table class="w-100 user-money-list">
                    <tr>
                        <td class="w-50 text-left pl-2">
                            <font-awesome-icon :icon="['fa', 'won-sign']"/> 보유머니
                        </td>
                        <td class="w-50 text-right pr-2">
                            <span class="user-money">{{ $numeral(user.money).format('0,0') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-50 text-left pl-2">
                            <font-awesome-icon :icon="['fa', 'parking']"/> 포인트
                        </td>
                        <td class="w-50 text-right pr-2"
                            @click="$tools.pushRouter('/point', true)"
                        >
                            <span class="user-money cursor-pointer">{{ $numeral(user.point).format('0,0') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-50 text-left pl-2">
                            <font-awesome-icon :icon="['fa', 'envelope']"/> 쪽지함
                        </td>
                        <td class="w-50 text-right pr-2"
                            @click="$tools.pushRouter('/message', true)"
                        >
                            <span class="user-money cursor-pointer">{{ $numeral(user.message).format('0,0') }}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="user-button-box">
                <table class="w-100 my-1">
                    <tr>
                        <td class="w-50" @click="$tools.pushRouter('/charge', true)">
                            <span class="user-button-blue">
                                <font-awesome-icon :icon="['fa', 'plus-square']"/> 충전신청
                            </span>
                        </td>
                        <td class="w-50" @click="$tools.pushRouter('/exchange', true)">
                            <span class="user-button-red">
                                <font-awesome-icon :icon="['fa', 'minus-square']"/> 환전신청
                            </span>
                        </td>
                    </tr>
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
                        <td class="w-50" @click="$tools.pushRouter('/help', true)">
                            <span class="user-button-blue">
                                <font-awesome-icon :icon="['fa', 'comments']"/> 고객센터
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
