<template>
    <div id="app">
        <div class="row">
            <div class="col">
                <div class="head-line">
                    <marquee width="100%" height="100%" direction="left">
                        This is a sample scrolling text that has scrolls texts to left.
                    </marquee>
                </div>
            </div>
        </div>
        <div id="nav">
            <component v-if="layout !== 'Null-Layout'" :is="layout">
                <router-view/>
            </component>
        </div>
        <Popup
            v-for="(v, index) in popup" :key="index"
            v-show="!$cookies.isKey(`pop-${v._id}`)"
            :id="v._id"
            :top="v.location.TOP"
            :left="v.location.LEFT"
            :image="v.images[0].path"
            :width="v.popupSize.X"
            :height="v.popupSize.Y"
        />
        <b-toast
            id="toast-answer"
            variant="warning"
            auto-hide-delay=10000
            toaster="b-toaster-bottom-right"
            solid
            title="고객센터"
            v-model="showToastAnswer"
        >
            <div class="text-center">
                <span class="font-weight-bold">
                    <font-awesome-icon :icon="['fa', 'bell']"/>
                    고객센터 답변이 등록되었습니다.
                </span>
                <button
                    class="btn btn-dark mt-2"
                    @click="$tools.pushRouter('/help', true); showToastAnswer=false"
                >답변 확인하기</button>
            </div>
        </b-toast>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import Popup from '@/components/Popup'

    export default {
        name: 'App',
        components: {
            Popup
        },
        computed: {
            ...mapGetters(['router', 'popup', 'isLogin']),
            layout() {
                return `${ this.$route.meta.layout || 'Null' }-Layout`
            }
        },
        watch: {
            $route(to) {
                this.setRouter(to.name)
            }
        },
        data() {
            return {
                showToastAnswer: false
            }
        },
        mounted() {
            this.checkDuplicateAndEvent()
        },
        methods: {
            ...mapActions(['setRouter', 'setMessageCount', 'setHelpCount', 'setHelpReplace']),
            async checkDuplicateAndEvent() {
                if(this.isLogin) {
                    let rCheckDuplicateAndEvent = await this.$http.get('/api/check-duplicate-and-event', null, false)
                    if(rCheckDuplicateAndEvent.error) {
                        setTimeout(() => {
                            this.checkDuplicateAndEvent()
                        }, 5000)
                        return
                    }

                    this.setMessageCount(rCheckDuplicateAndEvent.data.messageCount)
                    this.setHelpCount(rCheckDuplicateAndEvent.data.helpCount)

                    if(rCheckDuplicateAndEvent.data.helpCount > 0 && !this.showToastAnswer && this.router !== 'Help') {
                        this.showToastAnswer = true
                    }
                    else if(rCheckDuplicateAndEvent.data.helpCount > 0 && this.router === 'Help') {
                        this.setHelpReplace(true)
                    }

                    if(rCheckDuplicateAndEvent.data.messageCount > 0 && (this.router !== 'Message' && this.router !== 'MessageDetail')) {
                        let swProp = {
                            title: '쪽지',
                            icon: 'info',
                            text: '쪽지가 도착 하였습니다.'
                        }

                        this.$sw.fire(swProp).then(() => {
                            this.$tools.pushRouter('/message')
                        })
                    }
                }

                setTimeout(() => {
                    this.checkDuplicateAndEvent()
                }, 5000)
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/styles/app.scss";
</style>