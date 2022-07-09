<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col casino-page">
            <div class="row">
                <div class="col">
                    <div class="casino-page-header">
                        <font-awesome-icon :icon="['fa', 'futbol']"/>
                        스포츠게임 - <span>SPORTSGAMES</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="casino-list">
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img src="/images/sports-game-menu-sports.png" class="sub-banner img-fluid" alt="유럽형" title="유럽형">
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="$tools.pushRouter('/sports', false)">
                                        유럽형 스포츠
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img src="/images/sports-game-menu-sportscross.png" class="sub-banner img-fluid" alt="국내형" title="국내형">
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now"  @click="$tools.pushRouter('/sportscross', false)">
                                        국내형 스포츠
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img src="/images/sports-game-menu-sportslive.png" class="sub-banner img-fluid" alt="라이브" title="라이브" @click="$tools.pushRouter('/sportslive', false)">
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="$tools.pushRouter('/sportslive', false)">
                                        라이브 스포츠
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img src="/images/sports-game-menu-sportsspecial.png" class="sub-banner img-fluid" alt="스페셜" title="스페셜">
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="$tools.pushRouter('/sportsspecial', false)">
                                        스페셜 스포츠
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img src="/images/sports-game-menu-sportslivekor.png" class="sub-banner img-fluid" alt="실시간" title="실시간">
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="$tools.pushRouter('/sportslivekor', false)">
                                        실시간 스포츠
                                    </div>
                                </div>
                            </div>
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