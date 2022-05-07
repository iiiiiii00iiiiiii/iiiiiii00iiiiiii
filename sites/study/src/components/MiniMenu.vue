<template>
    <div class="container-fluid px-0">
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
</template>