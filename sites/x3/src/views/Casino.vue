<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'dice']"/>
                            <span class="ml-2">라이브 카지노 LIVE CASINO</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="casino">
                        <div class="row">
                            <div class="col-6 col-xl-4 text-center">
                                <img
                                    src="/images/evolution.png"
                                    class="img-fluid cursor-pointer"
                                    ref="evolution"
                                    @mouseover="overImage('evolution')"
                                    @mouseout="outImage('evolution')"
                                    @click="openKplay(1)"
                                >
                            </div>
                            <div class="col-6 col-xl-4 text-center">
                                <img
                                    src="/images/asia.png"
                                    class="img-fluid cursor-pointer"
                                    ref="asia"
                                    @mouseover="overImage('asia')"
                                    @mouseout="outImage('asia')"
                                    @click="openKplay(5)"
                                >
                            </div>
                            <div class="col-6 col-xl-4 mt-2 mt-xl-0 text-center">
                                <img
                                    src="/images/dream.png"
                                    class="img-fluid cursor-pointer"
                                    ref="dream"
                                    @mouseover="overImage('dream')"
                                    @mouseout="outImage('dream')"
                                    @click="openKplay(6)"
                                >
                            </div>
                            <div class="col-6 col-xl-4 mt-2 text-center">
                                <img
                                    src="/images/sexy.png"
                                    class="img-fluid cursor-pointer"
                                    ref="sexy"
                                    @mouseover="overImage('sexy')"
                                    @mouseout="outImage('sexy')"
                                    @click="openKplay(9)"
                                >
                            </div>
                            <div class="col-6 col-xl-4 mt-2 text-center">
                                <img
                                    src="images/pragmatic.png"
                                    class="img-fluid cursor-pointer"
                                    ref="pragmatic"
                                    @mouseover="overImage('pragmatic')"
                                    @mouseout="outImage('pragmatic')"
                                    @click="openKplay(10)"
                                >
                            </div>
                            <div class="col-6 col-xl-4 mt-2 text-center">
                                <img
                                    src="images/big.png"
                                    class="img-fluid cursor-pointer"
                                    ref="big"
                                    @mouseover="overImage('big')"
                                    @mouseout="outImage('big')"
                                    @click="openKplay(2)"
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