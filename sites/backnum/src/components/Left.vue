<template>
    <div>
        <div class="logo-wrap">
            <img src="/images/ocean.png" class="logo" alt="LOGO" title="LOGO" @click="$tools.pushRouter('/')">
        </div>
        <LoginBox class="mt-4" v-show="!isLogin"/>
        <UserBox class="mt-4" v-show="isLogin"/>
        <GameCategory/>
        <CommunityCategory/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import LoginBox from '@/components/LoginBox.vue'
    import UserBox from '@/components/UserBox.vue'
    import GameCategory from '@/components/GameCategory.vue'
    import CommunityCategory from '@/components/CommunityCategory.vue'

    export default {
        name: "Left",
        components: {
            LoginBox,
            UserBox,
            GameCategory,
            CommunityCategory
        },
        computed: {
            ...mapGetters(['isLogin', 'user'])
        }
    }
</script>