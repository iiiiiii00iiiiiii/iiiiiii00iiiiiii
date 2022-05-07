<template>
    <div class="row notice-box">
        <div class="col-12 col-xl">
            <div class="row communication">
                <div class="col-12">
                    <div class="menu-wrap">
                        <span
                            class="title"
                            :class="selectCommunication === 0 ? 'active' : ''"
                            @click="changeCommunication(0)"
                        >
                            공지사항
                        </span>
                        <!-- <span
                            class="title"
                            :class="selectCommunication === 1 ? 'active' : ''"
                            @click="changeCommunication(1)"
                        >
                            이용규정
                        </span> -->
                        <span
                            class="title"
                            :class="selectCommunication === 2 ? 'active' : ''"
                            @click="changeCommunication(2)"
                        >
                            FAQ
                        </span>
                    </div>
                </div>
            </div>
            <div class="communication-list">
                <table v-show="selectCommunication === 0">
                    <tbody>
                        <tr v-for="(n, i) in notice" :key="i">
                            <td>
                                <span class="icon-title">N</span>
                            </td>
                            <td @click="$tools.routerPush('notice')">
                                {{ n.title }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-show="selectCommunication === 1">
                    <tbody>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="icon-title">G</span>
                            </td>
                            <td>
                                백넘버 이용규정 입니다.
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-show="selectCommunication === 2">
                    <tbody>
                        <tr v-for="(f, i) in faq" :key="i">
                            <td>
                                <span class="icon-title">F</span>
                            </td>
                            <td @click="$tools.routerPush('faq')">
                                {{ f.title }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-12 col-xl  mt-3 mt-xl-0">
            <div class="row communication">
                <div class="col-12">
                    <div class="menu-wrap">
                        <span class="title">이벤트</span>
                    </div>
                </div>
            </div>
            <div class="communication-list">
                <table>
                    <tbody>
                        <tr v-for="(e, i) in event" :key="i">
                            <td>
                                <span class="icon-title">E</span>
                            </td>
                            <td @click="$tools.routerPush('event')">
                                {{ e.title }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-12 col-xl-3 d-none d-xl-block">
            <div class="customer-lnquiry-box">
                <div class="contactus-img text-center">
                    <img src="/images/ns-contactus-bg.png" class="banner-img" @click="$tools.routerPush('help')">
                </div>
                <div class="question-img text-center mt-xl-3">
                    <img src="/images/ns-question-bg.png" class="banner-img" @click="$tools.routerPush('faq')">
                </div>
            </div>
        </div>
        <div class="col-12 d-block d-xl-none mt-3">
            <div class="row">
                <div class="col-6">
                    <img src="/images/ns-contactus-bg.png" class="banner-img" @click="$tools.routerPush('help')">
                </div>
                <div class="col-6">
                    <img src="/images/ns-question-bg.png" class="banner-img" @click="$tools.routerPush('faq')">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Communication',
    data() {
        return {
            selectCommunication: 0,
            notice: [],
            faq: [],
            event: []
        }
    },
    created(){
        this.getList()
    },
    mounted() {

    },
    methods: {
        async getList() {
            let nComm = await this.$http.get('/api/communication-list')
            if(nComm.error) return

            // 구현부분
            this.notice = nComm.data.notice
            this.faq = nComm.data.faq
            this.event = nComm.data.event
        },
        changeCommunication(i) {
            this.selectCommunication = i
        },
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
            if(link === 'help') {
                this.showModalHelp = true
                return
            }
            if(link === 'notice') {
                this.showModalNotice = true
                return
            }
            if(link === 'event') {
                this.showModalEvent = true
                return
            }
            this.$tools.routerPush(`/${link}`)
        },
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        },
        showModalLogin: {
            get() {
                return this.$store.state.showModalLogin
            },
            set(isShow) {
                this.$store.commit('setShowModalLogin', isShow)
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
        showModalNotice: {
            get() {
                return this.$store.state.showModalNotice
            },
            set(isShow) {
                this.$store.commit('setShowModalNotice', isShow)
            }
        },
        showModalEvent: {
            get() {
                return this.$store.state.showModalEvent
            },
            set(isShow) {
                this.$store.commit('setShowModalEvent', isShow)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .communication {
        .menu-wrap {
            border-top: 3px solid #0085ff;
            background-color: #0c1318;
            .title {
                color: #fff;
                font-size: 1.25rem;
                cursor: pointer;
                display: inline-block;

                padding: 10px 20px;

                &.active {
                    color: #0088ff;
                }
            }
        }
    }

    .communication-list {
        height: 273px;
        overflow-y: scroll;
        
        table {
            width: 100%;
            tr {
                &:nth-child(odd) {
                    background-color: #151e2d;
                }
                &:nth-child(even) {
                    background-color: #0c1318;
                }

                td {
                    padding: 7px 5px;
                    color: #fff;

                    &:not(:first-child) {
                        cursor: pointer;
                    }
                    &:first-child {
                        width: 18px;
                    }
                }
            }
        }
        .icon-title {
            display: inline-block;
            width: 25px;
            height: 25px;
            background-color: #0085ff;
            color: #fff;
            text-align: center;
            font-weight: 600;
            border-radius: 50%;
            padding-top: 2px;
        }
    }

    .banner-img {
        cursor: pointer;
        width: 100%;

        @media (min-width: 1200px) {
            width: initial;
            max-width: 100%;
            height: auto;
        }

        &:hover {
            filter: brightness(50%); 
            transition: all 1.5s;

        }
    }
</style>