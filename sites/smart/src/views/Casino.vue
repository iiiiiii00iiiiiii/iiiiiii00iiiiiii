<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col casino-page">
            <div class="row">
                <div class="col">
                    <div class="casino-page-header">
                        <font-awesome-icon :icon="['fa', 'dice']"/>
                        라이브 카지노 - <span>LIVE CASINO</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="casino-list d-none d-xl-block">
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-evolution.png" 
                                    class="sub-banner img-fluid" alt="에볼루션" title="에볼루션" 
                                >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(1)">
                                        에볼루션 카지노
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-asia.png"
                                    class="sub-banner img-fluid" alt="아시아 게이밍" title="아시아 게이밍"
                                    >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(5)">
                                        아시아게이밍 카지노
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-sexy.png"
                                    class="sub-banner img-fluid" alt="섹시 게이밍" title="섹시 게이밍"
                                >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(9)">
                                        섹시게이밍 카지노
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-pragmatic.png"
                                    class="sub-banner img-fluid" alt="프라그마틱 플레이" title="프라그마틱 플레이"
                                >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(10)">
                                        프라그마틱 카지노
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-dream.png"
                                    class="sub-banner img-fluid" alt="드림 게이밍" title="드림 게이밍"
                                >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(6)">
                                        드림게이밍 카지노
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-big.png"
                                    class="sub-banner img-fluid" alt="빅 게이밍" title="빅 게이밍"
                                >
                                <div class="plar">
                                    <div class="plar-btn" data-hover="Play Now" @click="openKplay(2)">
                                        빅게이밍 카지노
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="casino-list d-xl-none">
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-evolution.png" 
                                    class="sub-banner img-fluid" alt="에볼루션" title="에볼루션" @click="openKplay(1)"
                                >
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-asia.png"
                                    class="sub-banner img-fluid" alt="아시아 게이밍" title="아시아 게이밍" @click="openKplay(5)"
                                >
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-sexy.png"
                                    class="sub-banner img-fluid" alt="섹시 게이밍" title="섹시 게이밍" @click="openKplay(9)"
                                >
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-pragmatic.png"
                                    class="sub-banner img-fluid" alt="프라그마틱 플레이" title="프라그마틱 플레이"  @click="openKplay(10)"
                                >
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-dream.png"
                                    class="sub-banner img-fluid" alt="드림 게이밍" title="드림 게이밍" @click="openKplay(6)"
                                >
                            </div>
                            <div class="col-12 col-xl-4 mt-3">
                                <img
                                    src="/images/sub-banner-big.png"
                                    class="sub-banner img-fluid" alt="빅 게이밍" title="빅 게이밍" @click="openKplay(2)"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Casino',
        components: {
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            overImage(img) {
                this.$refs[img].setAttribute('src', `/images/${img}-o.png`)
            },
            outImage(img) {
                this.$refs[img].setAttribute('src', `/images/${img}.png`)
            },
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            }
        }
    }
</script>