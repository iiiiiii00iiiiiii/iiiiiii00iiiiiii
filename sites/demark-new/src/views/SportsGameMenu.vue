<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col casino-page">
            <div class="row">
                <div class="col">
                    <div class="casino-page-header">
                        <font-awesome-icon :icon="['fa', 'futbol']"/>
                        스포츠게임 <span>SPORTSGAMES</span>
                    </div>
                </div>
            </div>
            <div class="row mb-5 mt-2">
                <div class="col-12 col-xl-6">
                    <div class="row">
                        <div class="col-12">
                            <img src="/images/sports-game-menu-sports.png" class="sub-banner img-fluid" alt="유럽형" title="유럽형" @click="$tools.pushRouter('/sports', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sports-game-menu-sportslive.png" class="sub-banner img-fluid" alt="라이브" title="라이브" @click="$tools.pushRouter('/sportslive', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sports-game-menu-sportslivekor.png" class="sub-banner img-fluid" alt="실시간" title="실시간" @click="$tools.pushRouter('/sportslivekor', false)">
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-5 col-xl-6">
                    <div class="row">
                        <div class="col-12 mt-2 mt-xl-0">
                            <img src="/images/sports-game-menu-sportscross.png" class="sub-banner img-fluid" alt="국내형" title="국내형" @click="$tools.pushRouter('/sportscross', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sports-game-menu-sportsspecial.png" class="sub-banner img-fluid" alt="스페셜" title="스페셜" @click="$tools.pushRouter('/sportsspecial', false)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'SportsGameMenu',
        components: {
            
        },
        computed: {
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>