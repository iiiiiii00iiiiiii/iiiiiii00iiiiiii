<template>
    <div>
        <div class="header-mobile-layout d-xl-none">
            <Header/>
        </div>
        <div class="left-layout d-none d-xl-block">
            <Left/>
        </div>
        <div class="sub-layout">
            <div class="container-fluid">
                <slot/>
            </div>
        </div>
        <div class="right-layout d-none d-xl-block">
            <Right/>
        </div>
        <div class="footer-mobile-layout d-xl-none">
            <FooterMobileMenu/>
        </div>
        <div class="fixed-bottom d-xl-none">
            <BetSlipMinigame v-show="betCart.length > 0 && !showSideBars && 
                (this.router === 'Powerball' || 
                this.router === 'Powerladder' || 
                this.router === 'Kenoladder' || 
                this.router === 'BoglePowerball' || 
                this.router === 'Bogleladder' || 
                this.router === 'GooglePowerball1' || 
                this.router === 'GooglePowerball3' ||
                this.router === 'EosPowerball' ||
                this.router === 'EosPowerball1' ||
                this.router === 'EosPowerball3' ||
                this.router === 'CoinPowerball' ||
                this.router === 'CoinPowerball3' ||
                this.router === 'Speedladder'
                )"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Header from '@/components/Header.vue'
    import Left from '@/components/Left.vue'
    import Right from '@/components/Right.vue'
    import BetSlipMinigame from '@/components/BetSlipMinigame.vue'
    import FooterMobileMenu from '@/components/FooterMobileMenu.vue'
    

    export default {
        name: "SubLayout",
        components: {
            Header, 
            Left,
            Right,
            BetSlipMinigame,
            FooterMobileMenu
        },
        computed: {
            ...mapGetters(['router', 'betCart', 'showSideBars'])
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        -ms-flex: 0 0 290px;
        flex: 0 0 290px;

        top: 0;
        height: calc(100vh - 1rem);
        overflow-y: auto;

        box-shadow: 3px 0 15px 0 #e7e8ea;

        &::-webkit-scrollbar {
            // width: 5px;
            display: none;
        }
        /* Track */
        &::-webkit-scrollbar-track {
            background: #111416;
        }
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #000000;
        }
    }
    .sidebars {
        -ms-flex: 0 0 290px;
        flex: 0 0 290px;

        top: 0;
        height: calc(100vh - 1rem);
        overflow-y: auto;

        box-shadow: 3px 0 15px 0 #e7e8ea;
        padding-top: 15px;

        &::-webkit-scrollbar {
            // width: 5px;
            display: none;
        }
        /* Track */
        &::-webkit-scrollbar-track {
            background: #111416;
        }
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #000000;
        }
    }
</style>