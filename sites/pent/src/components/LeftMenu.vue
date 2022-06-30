<template>
    <div class="left-menu">
        <table class="w-100">
            <tr>
                <td class="top py-2" @click="$tools.pushRouter('/charge', true)">
                    <font-awesome-icon :icon="['fa', 'plus-square']" class="text-skyblue"/> 충전
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/exchange', true)">
                    <font-awesome-icon :icon="['fa', 'minus-square']" class="text-brown"/> 환전
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/help', true)">
                    <font-awesome-icon :icon="['fa', 'comments']" class="text-orange"/> 1:1문의
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/message', true)">
                    <font-awesome-icon :icon="['fa', 'envelope']" class="text-emerald"/> 쪽지
                </td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-1" @click="$tools.pushRouter('/sports', false)">해외형</td>
                <td class="py-2 menu-2" @click="$tools.pushRouter('/sportscross', false)">국내형</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-3 border-top-none" @click="$tools.pushRouter('/sportsspecial', false)">스페셜</td>
                <td class="py-2 menu-6 border-top-none" @click="$tools.pushRouter('/sportslivekor', false)">실시간</td>
                <td class="py-2 menu-4 border-top-none" @click="$tools.pushRouter('/sportslive', false)">라이브</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-4 border-top-none" @click="$tools.pushRouter('/coinpowerball', false)">코인 파워볼</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-3 border-top-none" @click="$tools.pushRouter('/betlist', true)">배팅내역</td>
                <td class="py-2 menu-1 border-top-none" @click="$tools.pushRouter('/gameresults', false)">경기결과</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-3 border-top-none" @click="$tools.pushRouter('/mypage', true)">정보수정</td>
                <td class="py-2 menu-1 border-top-none" @click="$tools.pushRouter('/friends', true)">추천인 현황</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-3 border-top-none" @click="$tools.pushRouter('/notice', true)">공지사항</td>
                <td class="py-2 menu-1 border-top-none" @click="$tools.pushRouter('/rules', false)">경기규정</td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-3 border-top-none" @click="$tools.pushRouter('/event', true)">이벤트</td>
                <td class="py-2 menu-1 border-top-none" @click="$tools.pushRouter('/attendance', false)">출석체크</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'LeftMenu',
        components: {
        },
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
            }
        },
        methods: {
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            }
        }
    }
</script>