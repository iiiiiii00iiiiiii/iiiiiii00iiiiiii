<template>
    <div>
        <div class="fixed-menu py-3">
            <div class="cursor-pointer" @click="link('ready')">
                <img src="/images/fixed-icon-kakao.png" alt="카카오톡">
                <div class="mt-2">카카오톡</div>
            </div>
            <div class="cursor-pointer" @click="link('ready')">
                <img src="/images/fixed-icon-telegram.png" alt="텔레그램">
                <div class="mt-2">텔레그램</div>
            </div>
            <div class="cursor-pointer" @click="link('exchangeCasino')">
                <img src="/images/fixed-icon-transfer.png" alt="머니이동">
                <div class="mt-2">머니이동</div>
            </div>
            <div class="cursor-pointer" @click="link('help')">
                <img src="/images/fixed-icon-help.png" alt="고객센터">
                <div class="mt-2">고객센터</div>
            </div>
            <div class="cursor-pointer" @click="link('guide')">
                <img src="/images/fixed-icon-guide.png" alt="이용가이드">
                <div class="mt-2">이용가이드</div>
            </div>
            <div class="cursor-pointer" @click="link('partner')">
                <img src="/images/fixed-icon-guide.png" alt="파트너">
                <div class="mt-2">파트너</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FixedMenu',
    methods: {
        link(link) {
            if(link === 'ready') {
                this.$tools.ready()
                return
            }

            if(!this.isLogin) {
                this.showModalLogin = true
                this.$tools.routerPush('/')
                return
            }

            if(link === 'exchangeCasino') {
                this.showModalExchangeCasino = true
                return
            }

            if(link === 'help') {
                this.showModalHelp = true
                return
            }

            if(link === 'guide') {
                this.showModalGuide = true
                return
            }

            if(link === 'partner') {
                if(this.isAgent) {
                    if(typeof(window.open) === 'function') {
                        window.open('http://p.back1111.com')
                    }
                    else {
                        window.location.href = 'http://p.back1111.com'
                    }
                }
                else {
                    this.$tools.sw('warning', '권한', '권한이 없습니다.')
                }

                return
            }

            this.$tools.routerPush(`/${link}`)
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        },
        isAgent() {
            return this.$store.state.user.isAgent
        },
        showModalLogin: {
            get() {
                return this.$store.state.showModalLogin
            },
            set(isShow) {
                this.$store.commit('setShowModalLogin', isShow)
            }
        },
        showModalExchangeCasino: {
            get() {
                return this.$store.state.showModalExchangeCasino
            },
            set(isShow) {
                this.$store.commit('setShowModalExchangeCasino', isShow)
            }
        },
        showModalHelp: {
            get() {
                return this.$store.state.showModalHelp
            },
            set(isShow) {
                this.$store.commit('setShowModalHelp', isShow)
            }
        },
        showModalGuide: {
            get() {
                return this.$store.state.showModalGuide
            },
            set(isShow) {
                this.$store.commit('setShowModalGuide', isShow)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .fixed-menu {
        position: fixed;
        top: 200px;
        right: 20px;
        width: 80px;
        z-index: 1080;

        border: 1px solid #1c1b1b;
        border-radius: 5px;
        background-color: #222222;
        color: #cccccc;
        font-size: 0.75rem;

        text-align: center;
        div:not(:first-child) {
            margin-top: 15px;
        }

        img {
            width: 28px;
        }
    }
</style>