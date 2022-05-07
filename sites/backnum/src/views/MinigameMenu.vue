<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            미니게임 <span>MINIGAMES</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-4 mt-xl-5">
                <div class="row mb-5 mt-xl-4">
                    <div class="col-12 col-xl-6 text-right">
                        <div class="row">
                            <div class="col-12">
                                <img src="/images/sub-banner-powerball.jpg" class="sub-banner img-fluid" alt="파워볼" title="파워볼" @click="$tools.pushRouter('/powerball', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-powerladder.jpg" class="sub-banner img-fluid" alt="파워 사다리" title="파워 사다리" @click="$tools.pushRouter('/powerladder', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-kenoladder.jpg" class="sub-banner img-fluid" alt="키노 사다리" title="키노 사다리" @click="$tools.pushRouter('/kenoladder', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-speedladder.jpg" class="sub-banner img-fluid" alt="스피드 사다리" title="스피드 사다리" @click="$tools.pushRouter('/speedladder', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-eospowerball1.jpg" class="sub-banner img-fluid" alt="이오스 1분 파워볼" title="이오스 1분 파워볼" @click="$tools.pushRouter('/eospowerball1', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-eospowerball3.jpg" class="sub-banner img-fluid" alt="이오스 3분 파워볼" title="이오스 3분 파워볼" @click="$tools.pushRouter('/eospowerball3', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-eospowerball5.jpg" class="sub-banner img-fluid" alt="이오스 5분 파워볼" title="이오스 5분 파워볼" @click="$tools.pushRouter('/eospowerball', false)">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-5 col-xl-6">
                        <div class="row">
                            <div class="col-12 mt-2 mt-xl-0">
                                <img src="/images/sub-banner-boglepowerball.jpg" class="sub-banner img-fluid" alt="보글 파워볼" title="보글 파워볼" @click="$tools.pushRouter('/boglepowerball', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-bogleladder.jpg" class="sub-banner img-fluid" alt="보글 사다리" title="보글 사다리" @click="$tools.pushRouter('/bogleladder', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-googlepowerball1.jpg" class="sub-banner img-fluid" alt="구글 1분 파워볼" title="구글 1분 파워볼" @click="$tools.pushRouter('/googlepowerball1', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-googlepowerball3.jpg" class="sub-banner img-fluid" alt="구글 3분 파워볼" title="구글 3분 파워볼" @click="$tools.pushRouter('/googlepowerball3', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-coinpowerball3.jpg" class="sub-banner img-fluid" alt="코인 3분 파워볼" title="코인 3분 파워볼" @click="$tools.pushRouter('/coinpowerball3', false)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-coinpowerball5.jpg" class="sub-banner img-fluid" alt="코인 5분 파워볼" title="코인 5분 파워볼" @click="$tools.pushRouter('/coinpowerball', false)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'MinigameMenu',
        components: {
            UrgentNotice
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

<style lang="scss" scoped>
    .sub-banner {
        height: 80px;
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
        border-radius: 10px;
        cursor: pointer;

        @media (min-width: 1200px) {
            height: 120px;
        }
    }
</style>