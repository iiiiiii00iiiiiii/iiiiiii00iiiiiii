<template>
    <div class="container-fluid">
        <div class="game-category">
            <div class="row mt-3">
                <div class="col px-2">
                    <div class="game-category-title">
                        META GAMES
                    </div>
                </div>
            </div>
            <div class="row mt-3 cursor-pointer-meragames" @click="$tools.pushRouter('/sports', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-sports.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        유럽형 스포츠
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/sportscross', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-sports-kor.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        국내형 스포츠
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/sportslive', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-sports-live.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        라이브
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/sportsspecial', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-sports-special.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        스페셜
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/sportslivekor', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-sports-live-kor.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        실시간
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/minigamemenu', false)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-minigames.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        미니게임
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="$tools.pushRouter('/casino', true)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-casino.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        라이브 카지노
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
            <div class="row mt-2 cursor-pointer-meragames" @click="openKplay(0)">
                <div class="col-3">
                    <div class="game-category-icon">
                        <img src="/images/icon-slots.png">
                    </div>
                </div>
                <div class="col-7">
                    <div class="game-category-sub-title">
                        슬롯게임
                    </div>
                </div>
                <div class="col-2">
                    <div class="game-category-dot">
                        <img src="/images/icon-dot.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'GameCategory',
        components: {
        },
        computed: {
            ...mapGetters(['user'])
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