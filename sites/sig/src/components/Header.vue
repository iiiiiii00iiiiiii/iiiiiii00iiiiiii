<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col px-0">
                        <div class="header-top">
                            <div class="row">
                                <div class="col">
                                    <img src="/images/logo.png" class="logo" alt="로고" title="로고" data-aos="flip-up" data-aos-duration="1500" @click="$tools.pushRouter('/', false)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 px-0">
                        <div class="header-menu">
                            <div class="row">
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/sports', false)">
                                    해외형 스포츠
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/sportscross', false)">
                                    국내형 크로스
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/sportslive', false)">
                                    라이브 스포츠
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/sportsspecial', false)">
                                    스페셜
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/sportslivekor', false)">
                                    실시간
                                </div>
                                <div class="line-vertical"></div>
                                <!-- <div class="col menu-item" @click="$tools.pushRouter('/casino', true)"> -->
                                <div class="col menu-item" @click="$tools.pushRouter('/casino', true)">
                                    카지노
                                </div>
                                <div class="line-vertical"></div>
                                <!-- <div class="col menu-item" @click="openKplay(0, true)"> -->
                                <div class="col menu-item" @click="openKplay(0, true)">
                                    슬롯
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.pushRouter('/powerball'), false">
                                    미니게임
                                </div>
                                <div class="line-vertical"></div>
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
        name: 'Header',
        computed: {
            ...mapGetters(['user', 'isLogin'])
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

                if(r.error) {
                    if(r.error.response.status === 500) {
                        kplayWindow.close()
                    }
                }
                else {
                    kplayWindow.location = r.data.launch_url
                }
            }
        }
    }
</script>