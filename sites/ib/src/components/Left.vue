<template>
    <div>
        <LeftLiveInplay/>
        <LeftCategory/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import LeftLiveInplay from '../components/LeftLiveInplay.vue'
    import LeftCategory from '../components/LeftCategory.vue'

    export default {
        name: "Left",
        components: {
            LeftLiveInplay,
            LeftCategory,
        },
        computed: {
            ...mapGetters(['router'])
        }
    }
</script>