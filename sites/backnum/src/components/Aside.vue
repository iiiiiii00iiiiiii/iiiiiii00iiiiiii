<template>
    <div>
        <div class="aside">
            <table class="w-100">
                <tr v-if="from === 'm'">
                    <td class="top py-2" @click="$tools.routerPush('/charge')">
                        <font-awesome-icon class="text-skyblue" :icon="['fa', 'plus-square']"/> 입금
                    </td>
                    <td class="top py-2" @click="$tools.routerPush('/exchange')">
                        <font-awesome-icon class="text-brown" :icon="['fa', 'minus-square']"/> 출금
                    </td>
                    <td class="top py-2" @click="$tools.routerPush('/help')">
                        <font-awesome-icon class="text-orange" :icon="['fa', 'comments']"/> 문의
                    </td>
                    <td class="top py-2" @click="$tools.routerPush('/message')">
                        <font-awesome-icon class="text-emerald" :icon="['fa', 'envelope']"/> 쪽지
                    </td>
                </tr>
                <tr>
                    <td class="py-2 menu-1" @click="$tools.routerPush('/sports')">스포츠</td>
                    <td class="py-2 menu-2" @click="$tools.routerPush('/sportscross')">크로스</td>
                    <td class="py-2 menu-3" @click="$tools.routerPush('/sportslive')">라이브</td>
                    <td class="py-2 menu-5" @click="$tools.routerPush('/sportsspecial')">스페셜</td>
                </tr>
                <tr>
                    <td class="py-2 menu-4" @click="$tools.routerPush('/sportslivekor')">실시간</td>
                    <td class="py-2 menu-5" @click="$tools.routerPush('/powerball')">미니게임</td>
                    <td class="py-2 menu-6" @click="$tools.routerPush('/casino')">카지노</td>
                    <td class="py-2 menu-7" @click="$tools.routerPush('/betlist')">배팅내역</td>

                </tr>
                <tr>
                    <td class="py-2 menu-3" @click="$tools.routerPush('/gameresults')">경기결과</td>
                    <td class="py-2 menu-1" @click="$tools.routerPush('/notice')">공지사항</td>
                    <td class="py-2 menu-2" @click="$tools.routerPush('/event')">이벤트</td>
                    <td class="py-2 menu-8" @click="$tools.routerPush('/point')">포인트</td>
                </tr>
                <tr>
                    <td class="py-2 menu-5" @click="$tools.routerPush('/mypage')">내정보</td>
                    <td
                        v-if="$store.state.user.isAgent"
                        class="py-2 menu-4"
                        @click="$tools.routerPush(`/partner/?page=1&_id=${_id}&categorySort=user`)"
                    >파트너</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Aside',
    props: {
        from: {
            type: String,
            default: 'm'
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    computed: {
        _id() {
            return this.$store.state.user._id
        }
    }
}
</script>

<style lang="scss" scoped>
    /* Aside */
    .aside {
        border: 1px solid #191919;
        border-radius: 3px;
        background-color: #2d343b;
        padding: 2px;

        table {
            border-collapse: collapse;

            tr {
                td {
                    width: 25%;
                    cursor: pointer;
                    color: #ffffff;
                    text-align: center;

                    &.top { background-color: #20262c; }
                    &.menu-1 { background-color: #1a5679; }
                    &.menu-2 { background-color: #005050; }
                    &.menu-3 { background-color: #383e5d; }
                    &.menu-4 { background-color: #163d60; }
                    &.menu-5 { background-color: #c94845; }
                    &.menu-6 { background-color: #398fa8; }
                    &.menu-7 { background-color: #7b8822; }
                    &.menu-8 { background-color: #7b500d; }

                    border: 1px solid #000000;
                }
            }
        }
    }
</style>