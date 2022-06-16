<template>
    <div class="right-category">
        <LoginBox v-show="!isLogin"/>
        <UserBox v-show="isLogin"/>
        <BetSlip from="pc"/>
        <RightEvent/>
    </div>
</template>

<script>
    import LoginBox from '../components/LoginBox.vue'
    import UserBox from '../components/UserBox.vue'
    import BetSlip from '../components/BetSlip.vue'
    import RightEvent from '../components/RightEvent.vue'

    import { mapGetters } from 'vuex'

    export default {
        name: "Right",
        components: {
            LoginBox,
            UserBox,
            BetSlip,
            RightEvent
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