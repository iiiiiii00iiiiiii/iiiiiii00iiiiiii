<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="header-top">
                    <div class="row">
                        <div class="col-2">
                            
                        </div>
                        <div class="col-3 header-menu">
                            <div class="row">
                                <div class="col-12 menu-box">
                                    <ul>
                                        <li @click="$tools.pushRouter('/sportsgamemenu', true)">
                                            스포츠
                                        </li>
                                        <li @click="$tools.pushRouter('/minigamemenu', true)">
                                            미니게임
                                        </li>
                                        <li @click="$tools.pushRouter('/casino', true)">
                                            카지노
                                        </li>
                                        <li @click="openKplay(0)">
                                            슬롯
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <img src="/images/logo.png" class="logo" alt="로고" title="로고" data-aos="flip-up" data-aos-duration="1500" @click="$tools.pushRouter('/', false)">
                        </div>
                        <div class="col-3 header-menu">
                            <div class="row">
                                <div class="col-12 menu-box">
                                    <ul>
                                        <li @click="$tools.pushRouter('/notice', true)">
                                            공지사항
                                        </li>
                                        <li  @click="$tools.pushRouter('/event', true)">
                                            이벤트
                                        </li>
                                        <li @click="$tools.pushRouter('/help', true)">
                                            고객센터
                                        </li>
                                        <li @click="$tools.pushRouter('/gameresults', true)">
                                            경기결과
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 header-time">
                            {{ $moment().format('YYYY-MM-DD HH:mm:ss')}}
                            <span><img src="/images/kor-flag.png" alt="깃발" class="header-flag"></span>
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
        data() {
            return {

            }
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
