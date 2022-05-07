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
                                <div class="col menu-item" :class="router === 'Sports' ? 'active' : ''" @click="$tools.pushRouter('/sports', false)">
                                    해외형 스포츠
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'SportsCross' ? 'active' : ''" @click="$tools.pushRouter('/sportscross', false)">
                                    국내형 스포츠
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'SportsLive' ? 'active' : ''" @click="$tools.pushRouter('/sportslive', false)">
                                    라이브 스포츠
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'SportsSpecial' ? 'active' : ''" @click="$tools.pushRouter('/sportsspecial', false)">
                                    스페셜
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'SportsLiveKor' ? 'active' : ''" @click="$tools.pushRouter('/sportslivekor', false)">
                                    실시간
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'Casino' ? 'active' : ''" @click="$tools.ready()">
                                    카지노
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" @click="$tools.ready()">
                                    슬롯
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'Powerball' || router === 'Powerladder' || router === 'Kenoladder' ? 'active' : ''" @click="$tools.pushRouter('/powerball'), false">
                                    미니게임
                                </div>
                                <div class="line-vertical"></div>
                                <div class="col menu-item" :class="router === 'Rules' ? 'active' : ''" @click="$tools.pushRouter('/rules'), true">
                                    이용규정
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
            ...mapGetters(['user', 'router'])
        },
        methods: {
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            }
        }
    }
</script>