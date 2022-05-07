<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            라이브 카지노 <span>LIVE CASINO</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-4 mt-xl-5">
                <div class="row mt-xl-4">
                    <div class="col-12 col-xl-6 text-right">
                        <div class="row">
                            <div class="col-12">
                                <img src="/images/sub-banner-evolution.jpg" class="sub-banner img-fluid" alt="에볼루션" title="에볼루션" @click="openKplay(1)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-asia.jpg" class="sub-banner img-fluid" alt="아시아 게이밍" title="아시아 게이밍" @click="openKplay(5)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-sexy.jpg" class="sub-banner img-fluid" alt="섹시 게이밍" title="섹시 게이밍" @click="openKplay(9)">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6">
                        <div class="row">
                            <div class="col-12 mt-2 mt-xl-0">
                                <img src="/images/sub-banner-pragmatic.jpg" class="sub-banner img-fluid" alt="프라그마틱 플레이" title="프라그마틱 플레이" @click="openKplay(10)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-dream.jpg" class="sub-banner img-fluid" alt="드림 게이밍" title="드림 게이밍" @click="openKplay(6)">
                            </div>
                            <div class="col-12 mt-2">
                                <img src="/images/sub-banner-big.jpg" class="sub-banner img-fluid" alt="빅 게이밍" title="빅 게이밍" @click="openKplay(2)">
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
        name: 'Casino',
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
            async openKplay(id, needLogin) {
                let isMobile = true
                if(window.innerWidth >= 1200 ) {
                    isMobile = false
                }

                if(needLogin && !this.isLogin) {
                    if(isMobile) {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '', () => {
                            this.$tools.pushRouter('/login')
                        })
                    }
                    else {
                        this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '')
                    }
                    return
                }

                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                if(r.error.response.status === 500) {
                    kplayWindow.close()
                }
                else {
                    kplayWindow.location = r.data.launch_url
                }
            }
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