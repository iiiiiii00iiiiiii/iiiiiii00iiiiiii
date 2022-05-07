<template>
    <div class="left-menu">
        <table class="w-100">
            <tr>
                <td class="top py-2" @click="$tools.pushRouter('/charge', true)">
                    <font-awesome-icon :icon="['fa', 'plus-square']" class="text-skyblue"/> 입금
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/exchange', true)">
                    <font-awesome-icon :icon="['fa', 'minus-square']" class="text-brown"/> 출금
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/help', true)">
                    <font-awesome-icon :icon="['fa', 'comments']" class="text-orange"/> 문의
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/message', true)">
                    <font-awesome-icon :icon="['fa', 'envelope']" class="text-emerald"/> 쪽지
                </td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="py-2 menu-1" @click="$tools.pushRouter('/sports', false)">스포츠</td>
                <td class="py-2 menu-2" @click="$tools.pushRouter('/sportscross', false)">크로스</td>
                <td class="py-2 menu-3" @click="$tools.pushRouter('/sportslive', false)">라이브</td>
                <td class="py-2 menu-5" @click="$tools.pushRouter('/sportsspecial', false)">스페셜</td>
            </tr>
            <tr>
                <td class="py-2 menu-4" @click="$tools.pushRouter('/sportslivekor', false)">실시간</td>
                <td class="py-2 menu-5" @click="$tools.pushRouter('/powerball', false)">미니게임</td>
                <td class="py-2 menu-6" @click="$tools.pushRouter('/casino', true)">카지노</td>
                <td class="py-2 menu-7" @click="openKplay(0)">슬롯</td>

            </tr>
            <tr>
                <td class="py-2 menu-3" @click="$tools.pushRouter('/betlist', true)">배팅내역</td>
                <td class="py-2 menu-1" @click="$tools.pushRouter('/gameresults', false)">경기결과</td>
                <td class="py-2 menu-2" @click="$tools.pushRouter('/notice', true)">공지사항</td>
                <td class="py-2 menu-8" @click="$tools.pushRouter('/event', true)">이벤트</td>

            </tr>
            <tr>
                <td class="py-2 menu-5" @click="$tools.pushRouter('/rules', true)">이용규정</td>
                <td class="py-2 menu-3" @click="$tools.pushRouter('/point', true)">포인트</td>
                <td class="py-2 menu-6" @click="$tools.pushRouter('/mypage', true)">내정보</td>
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
            async openKplay(id, needLogin) {
                let isMobile = true
                if(window.innerWidth >= 1200 ) {
                    isMobile = false
                }

                if(needLogin && !this.isLogin) {
                    if(isMobile) {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '', () => {
                            this.$tools.pushRouter('/login')
                        })
                    }
                    else {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '')
                    }
                    return
                }

                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                if(r.error.response.status === 500) {
                    kplayWindow.close()
                }
                else {
                    kplayWindow.location = r.data.launch_url
                }
            }
        }
    }
</script>