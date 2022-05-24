<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 footer-content">
                <div class="payment-banner">
                    <img src="/images/banner-payment.png" class="img-fluid" alt="PAYMENT METHOD" title="PAYMENT METHOD">
                </div>
                <div class="sports-banner">
                    <img src="/images/banner-sports.png" class="img-fluid" alt="SPORTS" title="SPORTS">
                </div>
                <div class="copyright">
                    Copyright © 믿을 수 있는 <span class="text-yellow">DEMARK BET</span> SLUMBERS ALL RIGHTS RESERVE.<br>Solution By SOFT365.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Footer",
        components: {

        },
        computed: {
            ...mapGetters(['router'])
        }
    }
</script>