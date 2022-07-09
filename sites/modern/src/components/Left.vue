<template>
    <div>
        <LeftMenu/>
        <LeftMinigameCategory
            v-if="router === 'Powerball' ||
            router === 'Powerladder' ||
            router === 'Kenoladder' ||
            router === 'BoglePowerball' ||
            router === 'Bogleladder' ||
            router === 'GooglePowerball1' ||
            router === 'GooglePowerball3' ||
            router === 'EosPowerball3' ||
            router === 'EosPowerball' ||
            router === 'CoinPowerball3' ||
            router === 'CoinPowerball'"
        />
        <LeftCategory v-else/>
        <BannerLeft/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import LeftMenu from '../components/LeftMenu.vue'
    import LeftCategory from '../components/LeftCategory.vue'
    import LeftMinigameCategory from '../components/LeftMinigameCategory.vue'
    import BannerLeft from '../components/BannerLeft.vue'

    export default {
        name: "Left",
        components: {
            LeftMenu,
            LeftCategory,
            LeftMinigameCategory,
            BannerLeft
        },
        computed: {
            ...mapGetters(['router'])
        }
    }
</script>