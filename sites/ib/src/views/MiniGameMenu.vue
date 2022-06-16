<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col casino-page">
            <div class="row">
                <div class="col">
                    <div class="casino-page-header">
                        <font-awesome-icon :icon="['fa', 'dice']"/>
                        미니게임 <span>MINIGAMES</span>
                    </div>
                </div>
            </div>
            <div class="row mb-5 mt-2">
                <div class="col-12 col-xl-6">
                    <div class="row">
                        <div class="col-12">
                            <img src="/images/sub-banner-powerball.png" class="sub-banner img-fluid" alt="파워볼" title="파워볼" @click="$tools.pushRouter('/powerball', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-powerladder.png" class="sub-banner img-fluid" alt="파워 사다리" title="파워 사다리" @click="$tools.pushRouter('/powerladder', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-kenoladder.png" class="sub-banner img-fluid" alt="키노 사다리" title="키노 사다리" @click="$tools.pushRouter('/kenoladder', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-speedladder.png" class="sub-banner img-fluid" alt="스피드 사다리" title="스피드 사다리" @click="$tools.ready('/speedladder', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-eospowerball1.png" class="sub-banner img-fluid" alt="이오스 1분 파워볼" title="이오스 1분 파워볼" @click="$tools.ready('/eospowerball1', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-eospowerball3.png" class="sub-banner img-fluid" alt="이오스 3분 파워볼" title="이오스 3분 파워볼" @click="$tools.ready('/eospowerball3', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-eospowerball5.png" class="sub-banner img-fluid" alt="이오스 5분 파워볼" title="이오스 5분 파워볼" @click="$tools.ready('/eospowerball', false)">
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-5 col-xl-6">
                    <div class="row">
                        <div class="col-12 mt-2 mt-xl-0">
                            <img src="/images/sub-banner-boglepowerball.png" class="sub-banner img-fluid" alt="보글 파워볼" title="보글 파워볼" @click="$tools.ready('/boglepowerball', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-bogleladder.png" class="sub-banner img-fluid" alt="보글 사다리" title="보글 사다리" @click="$tools.ready('/bogleladder', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-googlepowerball1.png" class="sub-banner img-fluid" alt="구글 1분 파워볼" title="구글 1분 파워볼" @click="$tools.ready('/googlepowerball1', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-googlepowerball3.png" class="sub-banner img-fluid" alt="구글 3분 파워볼" title="구글 3분 파워볼" @click="$tools.ready('/googlepowerball3', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-coinpowerball3.png" class="sub-banner img-fluid" alt="코인 3분 파워볼" title="코인 3분 파워볼" @click="$tools.ready('/coinpowerball3', false)">
                        </div>
                        <div class="col-12 mt-2">
                            <img src="/images/sub-banner-coinpowerball5.png" class="sub-banner img-fluid" alt="코인 5분 파워볼" title="코인 5분 파워볼" @click="$tools.ready('/coinpowerball', false)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'MinigameMenu',
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