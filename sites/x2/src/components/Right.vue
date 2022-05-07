<template>
    <div>
        <div class="partner-box my-2 mt-3">
            <div class="partner" @click="$tools.openNewTab('https://p.mt-11.com')">
                META <span>PARTNERSHIP</span>
            </div>
        </div>
        <BetSlip from="pc"/>
    </div>
</template>

<script>
    import BetSlip from '../components/BetSlip.vue'

    import { mapGetters } from 'vuex'

    export default {
        name: "Right",
        components: {
            BetSlip
        },
        computed: {
            ...mapGetters(['isLogin', 'user'])
        }
    }
</script>