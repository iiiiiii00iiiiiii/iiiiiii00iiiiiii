<template>
    <div>
        <LoginBox v-show="!isLogin"/>
        <UserBox v-show="isLogin"/>
        <BetSlip class="mt-1" from="pc"/>
        <BannerRight/>
    </div>
</template>

<script>
    import LoginBox from '../components/LoginBox.vue'
    import UserBox from '../components/UserBox.vue'
    import BetSlip from '../components/BetSlip.vue'
    import BannerRight from '../components/BannerRight.vue'

    import { mapGetters } from 'vuex'

    export default {
        name: "Right",
        components: {
            LoginBox,
            UserBox,
            BetSlip,
            BannerRight
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['isLogin', 'user'])
        }
    }
</script>