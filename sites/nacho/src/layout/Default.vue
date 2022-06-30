<template>
    <div>
        <div class="header-layout d-none d-xl-block">
            <Header/>
        </div>
        <div class="header-mobile-layout d-xl-none">
            <HeaderMobile/>
        </div>
        <!-- <Header class="header d-none d-xl-block"/> -->
        <div class="left-layout d-none d-xl-block">
            <Left/>
        </div>
        <div class="main-layout">
            <div class="container-fluid">
                <slot/>
            </div>
        </div>
        <div class="right-layout d-none d-xl-block">
            <Right/>
        </div>
        <div class="fixed-bottom d-xl-none">
            <BetSlipMinigame v-show="betCart.length > 0 && !showSideBars && (this.router === 'Powerball' || this.router === 'Powerladder' || this.router === 'Kenoladder' || this.router === 'BoglePowerball' || this.router === 'Bogleladder' || this.router === 'GooglePowerball1' || this.router === 'GooglePowerball3' || this.router === 'EosPowerball1' || this.router === 'EosPowerball3' || this.router === 'EosPowerball' || this.router === 'CoinPowerball3' || this.router === 'CoinPowerball')"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Header from '../components/Header.vue'
    import HeaderMobile from '../components/HeaderMobile.vue'
    import Left from '../components/Left.vue'
    import Right from '../components/Right.vue'
    import BetSlipMinigame from '../components/BetSlipMinigame.vue'

    export default {
        name: "Default",
        components: {
            Header,
            HeaderMobile,
            Left,
            Right,
            BetSlipMinigame
        },
        computed: {
            ...mapGetters(['router', 'betCart', 'showSideBars'])
        }
    }
</script>