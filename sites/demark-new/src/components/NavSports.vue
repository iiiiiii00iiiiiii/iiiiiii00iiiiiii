<template>
    <div class="sports-minigame d-none d-xl-block">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col sports-menu" @click="$tools.pushRouter('/sports', false)">
                                <img src="/images/icon-sports-menu.png" alt="유럽형">
                                유럽형
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/sportscross', false)">
                                <img src="/images/icon-sports-menu-1.png" alt="국내형">
                                국내형
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/sportslive', false)">
                                <img src="/images/icon-sports-menu-2.png" alt="라이브">
                                라이브
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/sportsspecial', false)">
                                <img src="/images/icon-sports-menu-3.png" alt="스페셜">
                                스페셜
                            </div>
                            <div class="col sports-menu-second" @click="$tools.pushRouter('/sportslivekor', false)">
                                <img src="/images/icon-sports-menu-4.png" alt="실시간">
                                실시간
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavSports',
    data() {
        return {
            
        }
    },
    created() {

    },
    methods: {

    },
    computed: {
        thisRouter() {
            return this.$store.state.router
        },
        isLogin() {
            return this.$store.state.isLogin
        },
    }
}
</script>