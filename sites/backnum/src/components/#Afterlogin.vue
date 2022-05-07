<template>
    <div>
        <div class="logo-partner mb-2">
            <div class="row">
                <div class="col-6">
                    <img src="images/ns-partner-logo.png" alt="" class="img-fluid">
                </div>
                <div class="col-6 mt-1">
                    <a href="#">
                        파트너 관리
                    </a>
                </div>
            </div>
        </div>
        <div class="user-box">
            <div class="user-level-box">
                <div class="row">
                    <div class="col-4">
                        <img class="img-level" :src="`../../images/clv${grade}.png`">
                    </div>
                    <div class="col-4 pt-3 pl-2">
                        <div class="nick">{{ nick }}</div>
                        <div class="level">LEVEL {{ grade }}</div>
                        <div class="mt-1"><strong class="nickname">닉네임</strong>님</div>
                    </div>
                    <div class="col-4 pt-3">
                        <div class="mt-1">
                            <a href="#" class="signout" @click="$tools.routerPush('/logout')">로그아웃</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-info-box">
                <div class="row">
                    <div class="col-4">
                        <a href="#" @click="link('mypage')">
                            <img src="images/ns-icon-info.png" alt="" class="img-fluid">
                            <div class="user-info-text">회원정보</div>
                        </a>
                    </div>
                    <div class="col-4" @click="link('message')">
                        <a href="#">
                            <img src="images/ns-icon-noteu.png" alt="" class="img-fluid">
                            <div class="user-info-text">쪽지&nbsp;<strong>0개</strong></div>
                        </a>
                    </div>
                    <div class="col-4 border-0">
                        <a href="#">
                            <img src="images/ns-icon-point.png" alt="" class="img-fluid">
                            <div class="user-info-text">포인트내역</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="money-info-box px-2">
                <div class="row bt py-2">
                    <div class="col-5">
                        <img src="/images/icon-userbox-money.png" class="mr-1" alt="보유머니">
                        보유머니
                    </div>
                    <div class="col-4 text-primary">
                        {{ $numeral(money).format('0,0') }}
                        <span>원</span>
                    </div>
                    <div class="col-3">
                        <span class="badge bg-primary" @click="link('charge')">입금</span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-5">
                        <img src="/images/icon-userbox-point.png?1" class="mr-1" alt="포인트">
                        포인트
                    </div>
                    <div class="col-4 text-warning">
                        {{ $numeral(point).format('0,0') }}
                        <span>P</span>
                    </div>
                    <div class="col-3">
                        <span class="badge bg-warning" @click="link('pointExchange')">전환</span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-5">
                        <img src="/images/icon-userbox-casino.png" class="mr-1" alt="카지노머니">
                        카지노머니
                    </div>
                    <div class="col-4 text-danger">
                        {{ $numeral(casinoMoney).format('0,0') }}
                        <span>원</span>
                    </div>
                    <div class="col-3">
                        <span class="badge bg-danger" @click="link('exchangeCasino')">이동</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="link-info">
            <div class="row text-center">
                <div class="col pr-0">
                    <div class="py-2 br cursor-pointer" @click="link('charge')">
                        <div>
                            <img src="/images/icon-userbox-charge.png" alt="입금">
                        </div>
                        <div class="mt-1">
                            입금
                        </div>
                    </div>
                </div>
                <div class="col px-0">
                    <div class="py-2 br cursor-pointer" @click="link('exchange')">
                        <div>
                            <img src="/images/icon-userbox-exchange.png" alt="출금">
                        </div>
                        <div class="mt-1">
                            출금
                        </div>
                    </div>
                </div>
                <div class="col px-0">
                    <div class="py-2 br cursor-pointer" @click="link('help')">
                        <div>
                            <img src="/images/icon-userbox-help.png" alt="문의">
                        </div>
                        <div class="mt-1">
                            문의
                        </div>
                    </div>
                </div>
                <div class="col pl-0">
                    <div class="py-2 cursor-pointer" @click="link('message')">
                        <div>
                            <img src="/images/icon-userbox-message.png" alt="쪽지">
                        </div>
                        <div class="mt-1">
                            쪽지
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'LoginBox',
    data() {
        return {
            id: '',
            password: ''
        }
    },
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

            if(link === 'mypage') {
                this.showModalMyPage = true
                return
            }

            if(link === 'pointExchange') {
                this.showModalPoint = true
                return
            }

            if(link === 'help') {
                this.showModalHelp = true
                return
            }

            if(link === 'message') {
                this.showModalMessage = true
                return
            }

            if(link === 'charge') {
                this.showModalCharge = true
                return
            }

            if(link === 'exchange') {
                this.showModalExchange = true
                return
            }

            if(link === 'exchangeCasino') {
                this.showModalExchangeCasino = true
                return
            }

            this.$tools.routerPush(`/${link}`)
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        },
        disabledButton: {
            get() {
                return this.$store.state.disabledButton
            },
            set(status) {
                this.$store.commit('setDisabledButton', status)
            }
        },
        nick() {
            return this.$store.state.user.nick
        },
        grade() {
            return this.$store.state.user.grade
        },
        money() {
            return this.$store.state.user.money
        },
        point() {
            return this.$store.state.user.point
        },
        casinoMoney() {
            return this.$store.state.user.casinoMoney
        },
        showModalLogin: {
            get() {
                return this.$store.state.showModalLogin
            },
            set(isShow) {
                this.$store.commit('setShowModalLogin', isShow)
            }
        },
        showModalPoint: {
            get() {
                return this.$store.state.showModalPoint
            },
            set(isShow) {
                this.$store.commit('setShowModalPoint', isShow)
            }
        },
        showModalMessage: {
            get() {
                return this.$store.state.showModalMessage
            },
            set(isShow) {
                this.$store.commit('setShowModalMessage', isShow)
            }
        },
        showModalCharge: {
            get() {
                return this.$store.state.showModalCharge
            },
            set(isShow) {
                this.$store.commit('setShowModalCharge', isShow)
            }
        },
        showModalExchange: {
            get() {
                return this.$store.state.showModalExchange
            },
            set(isShow) {
                this.$store.commit('setShowModalExchange', isShow)
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
        showModalMyPage: {
            get() {
                return this.$store.state.showModalMyPage
            },
            set(isShow) {
                this.$store.commit('setShowModalMyPage', isShow)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .logo-partner {
        background-color: #151e2d;
        padding: 10px;
        font-size: 1.25rem;
        font-weight: 600;
        a {
            text-decoration:none;
            color: #fff;
        }
    }
    .user-box {
        border:1px solid #37383b;

        .user-level-box {
            background-color: #0a1014;
            padding: 20px 0px;
            color: #fff;

            .img-level {
                width: 100%;
                height: auto;
            }
            .nick {
                font-size: 1rem;
            }
            .level {
                font-size: 0.875rem;
                color: #bfbfc0;
            }
            .nickname {
                font-size: 1.10rem;
                color: #0085ff;
            }
            a {
                text-decoration:none;
                color: #fff;
            }
            .signout {
                background-color: #151e2d;
                width: 20px;
                cursor: pointer;
                padding: 5px 5px;
                border-radius: 3px;
            }
        }
        .user-info-box {
            background-color: #151e2d;
            padding: 10px;
            text-align: center;
            a {
                text-decoration:none;
                color: #fff;
                
            }
            .col-4 {
                border-right: 1px solid #3d4551;
            }
            img {
                width: 50px;
                height: auto;
            }
            .user-info-text {
                font-size: 0.75rem;
                font-weight: 600;
                color: #fff;

                strong {
                    color: #0085ff;
                }
            }
        }
        .money-info-box {
            background-color: #0a1014;
            font-size: 0.75rem;
            font-weight: 600;
            color: #fff;
            padding: 10px 0px;

            .text-primary,.text-warning,
            .text-danger{
                text-align: right;
            }
            span {
                color: #fff;
                
            }
            .badge {
                cursor: pointer;
                padding: 6px 10px;
            }
        }
    }
    
    

    .link-info {
        font-size: 0.75rem;
        background-color: #2c1f30;
        color: #fff;

        .br {
            border-right: 1px solid #191919;
        }
    }
</style>