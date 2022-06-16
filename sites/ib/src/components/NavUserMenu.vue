<template>
    <div class="sports-minigame d-none d-md-block">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col sports-menu" @click="$tools.pushRouter('/charge', false)">
                                <img src="/images/footer-mobile-menu-charge.png" alt="충전">
                                충전신청
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/exchange', false)">
                                <img src="/images/footer-mobile-menu-exchange.png" alt="환전">
                                환전신청
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/help', false)">
                                <img src="/images/footer-mobile-menu-help.png" alt="문의">
                                고객센터
                            </div>
                            <div class="col sports-menu" @click="$tools.pushRouter('/notice', false)">
                                <img src="/images/footer-mobile-menu-notice.png" alt="공지사항">
                                공지사항
                            </div>
                            <div class="col sports-menu-second" @click="$tools.pushRouter('/event', false)">
                                <img src="/images/footer-mobile-menu-event.png" alt="이벤트">
                                이벤트
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
    name: 'NavUserMenu',
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