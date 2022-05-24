<template>
    <div class="container-fluid">
        <div class="row" v-if="isLogin">
            <div class="col footer-mobile-menu">
                <div class="footer-mobile-menu-wrap">
                    <div class="row">
                        <div class="col mobile-menu" @click="$tools.pushRouter('/charge', false)">
                            <img src="/images/footer-mobile-menu-charge.png" alt="충전">
                            <div>충전</div>
                        </div>
                        <div class="col mobile-menu" @click="$tools.pushRouter('/exchange', false)">
                            <img src="/images/footer-mobile-menu-exchange.png" alt="환전">
                            <div>환전</div>
                        </div>
                        <div class="col mobile-menu" @click="$tools.pushRouter('/help', false)">
                            <img src="/images/footer-mobile-menu-help.png" alt="문의">
                            <div>문의</div>
                        </div>
                        <div class="col mobile-menu" @click="$tools.pushRouter('/betList', false)">
                            <img src="/images/footer-mobile-menu-betList.png" alt="베팅내역">
                            <div>베팅내역</div>
                        </div>
                        <div class="col mobile-menu" @click="$tools.pushRouter('/gameresults', false)">
                            <img src="/images/footer-mobile-menu-gameresults.png" alt="경기결과">
                            <div>경기결과</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'FooterMobileMenu',
        computed: {
            ...mapGetters(['isLogin', 'user'])
        },
        methods: {
            ...mapActions(['setRouter'])
        }
    }
</script>