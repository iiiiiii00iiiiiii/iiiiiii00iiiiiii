<template>
    <div>
        <!-- <div class="banner">
            <div>
                <img src="/images/banner-domain.png" @click="link('double')">
            </div>
            <div class="mt-1">
                <img src="/images/banner-live.png">
            </div>
            <div class="mt-1">
                <img src="/images/banner-telegram.png">
            </div>
            <div class="mt-1">
                <img src="/images/banner-kakao.png">
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'Banner',
    methods: {
        link(link) {
            if(link === 'ready') {
                this.$tools.ready()
                return
            }

            if(link === 'double') {
                if(typeof(window.open) === 'function') {
                    window.open('http://더블주소.com')
                }
                else {
                    window.location.href = 'http://더블주소.com'
                }
                return
            }

            this.$tools.routerPush(`/${link}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .banner {
        padding: 4px 0;
        background-color: #191919;

        img {
            cursor: pointer;
        }
    }
</style>