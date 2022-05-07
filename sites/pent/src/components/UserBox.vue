<template>
    <div class="user-box">
        <table class="w-100">
            <tr>
                <td class="top w-30" rowspan="4">
                    <div class="text-center">
                        <img class="img-level" :src="`/images/icon-lv${user.grade}.png`">
                    </div>
                    <div class="text-center">
                        <img class="img" :src="`/images/lv${user.grade}.jpg`">
                    </div>
                </td>
                <td class="top w-70 text-left pl-2 py-5px">
                    <span class="user-nick" @click="$tools.pushRouter('/mypage')">{{ user.nick }} 님</span>

                    <button type="button" class="btn-logout float-right mr-1" :disabled="loading" @click="$tools.pushRouter('/logout', false)">
                        <font-awesome-icon :icon="['fa', 'power-off']"/> 로그아웃
                    </button>
                </td>
            </tr>
            <tr height="25">
                <td class="top w-70 text-left pl-2 py-5px">
                    <font-awesome-icon :icon="['fa', 'won-sign']"/>
                    <span class="user-info"> 스포츠 <span class="user-money">{{ $numeral(user.money).format('0,0') }}</span> 원</span>
                    <button type="button" class="btn-exchange-money float-right" :disabled="loading" @click="$tools.pushRouter('/transfermoney', true)">
                        <font-awesome-icon :icon="['fa', 'exchange-alt']"/>
                        전환
                    </button>
                </td>
            </tr>
            <tr height="25">
                <td class="top w-70 text-left pl-1 py-5px">
                    <font-awesome-icon :icon="['fa', 'won-sign']"/>
                    <span class="user-info"> 파워볼 <span class="user-money">{{ $numeral(user.minigameMoney).format('0,0') }}</span> 원</span>
                    <button type="button" class="btn-exchange-money float-right" :disabled="loading" @click="$tools.pushRouter('/transfermoney', true)">
                        <font-awesome-icon :icon="['fa', 'exchange-alt']"/>
                        전환
                    </button>
                </td>
            </tr>
            <tr height="25">
                <td class="top w-70 text-left pl-1 py-5px">
                    <font-awesome-icon :icon="['fa', 'coins']"/>
                    <span class="user-info"> 포인트 <span class="user-money">{{ $numeral(user.point).format('0,0') }}</span> 점</span>
                    <button type="button" class="btn-exchange-point float-right" :disabled="loading" @click="$tools.pushRouter('/point', true)">
                        <font-awesome-icon :icon="['fa', 'exchange-alt']"/>
                        전환
                    </button>
                </td>
            </tr>
        </table>
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

<style lang="scss" scoped>
    .user-box {
        padding: 2px;
        border: 1px solid #191919;
        border-radius: 3px;
        background-color: #2d343b;

        table {
            border-collapse: collapse;

            tr {
                td {
                    background-color: #212121;
                    color: #c2c2c2;
                    font-size: 0.75rem;
                    border: 1px solid #000;

                    .user-nick {
                        color: #ffcb5d;
                        cursor: pointer;
                    }
                    .user-info {
                        color: #17a2b8;
                    }
                    .user-money {
                        color: #c2c2c2;
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