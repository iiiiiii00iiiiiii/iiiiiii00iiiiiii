<template>
    <div class="left-menu">
        <table class="w-100">
            <tr>
                <td class="top py-2" @click="$tools.pushRouter('/charge', true)">
                    <font-awesome-icon :icon="['fa', 'plus-square']"/> 입금
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/exchange', true)">
                    <font-awesome-icon :icon="['fa', 'minus-square']"/> 출금
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/help', true)">
                    <font-awesome-icon :icon="['fa', 'comments']"/> 문의
                </td>
                <td class="top py-2" @click="$tools.pushRouter('/message', true)">
                    <font-awesome-icon :icon="['fa', 'envelope']"/> 쪽지
                </td>
            </tr>
        </table>
        <table class="w-100">
            <tr>
                <td class="menu-odd" @click="$tools.pushRouter('/mypage', true)">마이 페이지</td>
                <td class="menu-even" @click="$tools.pushRouter('/betlist', true)">배팅내역</td>
                <td class="menu-odd" @click="$tools.pushRouter('/gameresults', false)">경기결과</td>
            </tr>
            <tr>
                <td class="menu-even" @click="$tools.pushRouter('/notice', true)">공지사항</td>
                <td class="menu-odd" @click="$tools.pushRouter('/event', true)">이벤트</td>
                <td class="menu-even" @click="$tools.pushRouter('/powerball', false)">미니게임</td>
            </tr>
            <tr>
                <td class="menu-odd" @click="$tools.pushRouter('/friends', true)">추천인 현황</td>
                <td class="menu-even" @click="$tools.pushRouter('/casino', true)">카지노</td>
                <td class="menu-odd" @click="openKplay(0)">슬롯</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'LeftMenu',
        components: {
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

                if(r.error) {
                    if(r.error.response.status === 500) {
                        kplayWindow.close()
                    }
                }
                else {
                    kplayWindow.location = r.data.launch_url
                }
            }
        }
    }
</script>