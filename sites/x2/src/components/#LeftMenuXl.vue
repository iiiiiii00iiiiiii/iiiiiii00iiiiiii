<template>
    <div class="col-12 xl-left">
        <div class="wrap-logo px-2">
            <img src="/images/study-logo.png" class="img-fluid cursor-pointer" @click="$tools.routerPush('/')">
        </div>
        <div class="user-box" v-if="isLogin">
            <div class="user-level-box">
                <div class="row">
                    <div class="col">
                        <img class="img-level" :src="`../../images/clv${grade}.png`">
                    </div>
                    <div class="col-5 pt-3">
                        <div class="level">LEVEL {{ grade }}</div>
                        <div class="nickname"><strong>{{ nick }}</strong> 님</div>
                    </div>
                    <div class="col">
                        <div class="pt-4">
                            <span class="signout" @click="$tools.routerPush('/logout')">로그아웃</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3 px-2">
                <div class="col-12 user-money-info">
                    <div class="row">
                        <div class="col-6 px-0 pl-3">
                            <img src="/images/icon-logged-money.png" class="img-fluid">
                            보유머니
                        </div>
                        <div class="col-6 cursor-pointer text-right px-0 pr-4" @click="$tools.routerPush('charging')">
                            <span class="text-orange">{{ $numeral(money).format('0,0') }}</span>
                            <span class="pl-2">
                                <img src="/images/icon-add-money.png">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2 px-2">
                <div class="col-12 user-money-info">
                    <div class="row">
                        <div class="col-6 px-0 pl-3">
                            <img src="/images/icon-logged-point.png" class="img-fluid">
                            보유포인트
                        </div>
                        <div class="col-6 cursor-pointer text-right px-0 pr-4" @click="$tools.routerPush('point')">
                            <span class="text-blue ">{{ $numeral(point).format('0,0') }}</span>
                            <span class="cursor-pointer pl-2">
                                <img src="/images/icon-add-point.png">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2 px-2">
                <div class="col-12 user-money-info">
                    <div class="row">
                        <div class="col-6 px-0 pl-3">
                            <img src="/images/icon-logged-casino.png" class="img-fluid">
                            카지노머니
                        </div>
                        <div class="col-6 cursor-pointer text-right px-0 pr-4" @click="$tools.routerPush('exchangecasino')">
                            <span class="text-lose">{{ $numeral(casinoMoney).format('0,0') }}</span>
                            <span class="cursor-pointer pl-1">
                                <img src="/images/icon-add-casino.png">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xl-login-box px-2" v-if="!isLogin">
            <form @submit.prevent="login()">
                <div class="row">
                    <div class="col-12">
                        <input type="text" class="login-input" maxlength="20" placeholder="아이디" v-model="id">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-1">
                        <input type="password" class="login-input" maxlength="50" placeholder="비밀번호" v-model="password">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 pr-1">
                        <button type="submit" class="btn-login btn-block py-2" :disabled="disabledButton">
                            <img src="/images/icon-login.png" class="w-20"> 로그인
                        </button>
                    </div>
                    <div class="col-6 pl-1" @click="$tools.routerPush('/Join')">
                        <button type="button" class="btn-joins btn-block py-2">
                            <img src="/images/ico-join.png" class="w-20"> 회원가입
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="row mt-3 px-2">
            <div class="col-12 quick-menu-box">
                <div class="row mt-3">
                    <div class="col cursor-pointer" @click="link('charging')">
                        <img src="/images/left-quick-menu-icon.png" class="img-fluid">
                        <div class="title">입금</div>
                    </div>
                    <div class="col cursor-pointer" @click="link('exchange')">
                        <img src="/images/left-quick-menu-icon-1.png" class="img-fluid">
                        <div class="title">출금</div>
                    </div>
                    <div class="col cursor-pointer" @click="link('help')">
                        <img src="/images/left-quick-menu-icon-2.png" class="img-fluid">
                        <div class="title">문의</div>
                    </div>
                    <div class="col cursor-pointer" @click="link('message')">
                        <img src="/images/left-quick-menu-icon-3.png" class="img-fluid">
                        <div class="title">쪽지</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 game-list">
                GAME LIST
            </div>
        </div>
        <div class="row xl-game-menu-box">
            <div class="col-12 pb-2 cursor-pointer">
                <div class="category-tmp">
                    <div class="row">
                        <div class="col-2">
                            <img src="/images/sports-icon.png" class="img-fluid">
                        </div>
                        <div
                            class="col-10 sports-menu"
                            :class="select === 0 ? 'active' : ''"
                            @click="change(0)"
                        >
                            스포츠
                        </div>
                        <div class="col-12 sub-menu" v-show="select === 0">
                            <div class="category-tmp" @click="link('sportscross')">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/domestic-game-icon.png">
                                    </div>
                                    <div class="col-7">
                                        크로스
                                    </div>
                                    <!-- <div class="col-3">
                                        <div class="games-number">251</div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="category-tmp" @click="link('sportslivekor')">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/real-time-game-icon.png">
                                    </div>
                                    <div class="col-7">
                                        실시간
                                    </div>
                                    <!-- <div class="col-3">
                                        <div class="games-number">251</div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="category-tmp" @click="link('sportsspecial')">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/special-game-icon.png">
                                    </div>
                                    <div class="col-7">
                                        스페셜
                                    </div>
                                    <!-- <div class="col-3">
                                        <div class="games-number">251</div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-tmp">
                    <div class="row">
                        <div class="col-2">
                            <img src="/images/mini-game-icon.png" class="img-fluid">
                        </div>
                        <div
                            class="col-10 sports-menu"
                            :class="select === 1? 'active' : ''"
                            @click="change(1)"
                        >
                            미니게임
                        </div>
                        <div class="col-12" v-show="select === 1">
                            <div class="row category-tmp" @click="link('powerball')">
                                <div class="col-2">
                                    <img src="/images/icon-powerball.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    파워볼
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row category-tmp" @click="link('powerladder')">
                                <div class="col-2">
                                    <img src="/images/icon-powerladder.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    파워사다리
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row category-tmp" @click="link('boglepowerball')">
                                <div class="col-2">
                                    <img src="/images/icon-bubble.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    보글파워볼
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row category-tmp" @click="link('bogleladder')">
                                <div class="col-2">
                                    <img src="/images/icon-bubble.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    보글사다리
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row category-tmp" @click="link('googlepowerball1')">
                                <div class="col-2">
                                    <img src="/images/icon-google.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    구글 1분 파워볼
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row category-tmp" @click="link('googlepowerball3')">
                                <div class="col-2">
                                    <img src="/images/icon-google.png" class="img-fluid">
                                </div>
                                <div class="col-7">
                                    구글 3분 파워볼
                                </div>
                                <!-- <div class="col-3 px-0">
                                    <div class="row games-number">
                                        <div class="col-5">
                                            <img src="/images/games-time-icon.png" class="img-fluid">
                                        </div>
                                        <div class="col-7 text-danger pt-1">
                                            00:21
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-tmp">
                    <div class="row">
                        <div class="col-2">
                            <img src="/images/token-icon.png" class="img-fluid">
                        </div>
                        <div
                            class="col-10 sports-menu"
                            :class="select === 2 ? 'active' : ''"
                            @click="change(2)"
                        >
                            토큰게임
                        </div>
                        <div class="col-12 sub-menu" v-show="select === 2">
                            <div class="category-tmp" @click="$tools.ready()">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/token-high-low-icon.png">
                                    </div>
                                    <div class="col-7">
                                        토큰 하이로우
                                    </div>
                                    <!-- <div class="col-3 px-0">
                                        <div class="row games-number">
                                            <div class="col-5">
                                                <img src="/images/games-time-icon.png" class="img-fluid">
                                            </div>
                                            <div class="col-7 text-danger pt-1">
                                                00:21
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="category-tmp" @click="$tools.ready()">
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/token-roulette-icon.png">
                                    </div>
                                    <div class="col-7">
                                        토큰 룰렛
                                    </div>
                                    <!-- <div class="col-3 px-0">
                                        <div class="row games-number">
                                            <div class="col-5">
                                                <img src="/images/games-time-icon.png" class="img-fluid">
                                            </div>
                                            <div class="col-7 text-danger pt-1">
                                                00:21
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-tmp">
                    <div class="row">
                        <div class="col-2">
                            <img src="/images/casino-icon.png" class="img-fluid">
                        </div>
                        <div
                            class="col-10 sports-menu"
                            :class="select === 3 ? 'active' : ''"
                            @click="change(3)"
                        >
                            카지노
                        </div>
                        <div class="col-12" v-show="select === 3">
                            <div class="category-tmp" @click="openGame('evolution_9')">
                            <!-- <div class="category-tmp" @click="$tools.ready()"> -->
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/evolution-game-icon.png">
                                    </div>
                                    <div class="col-10">
                                        에볼루션
                                    </div>
                                </div>
                            </div>
                            <div class="category-tmp" @click="openGame('agNew_0')">
                            <!-- <div class="category-tmp" @click="$tools.ready()"> -->
                                <div class="row">
                                    <div class="col-2">
                                        <img class="img-fluid" src="/images/asia-game-icon.png">
                                    </div>
                                    <div class="col-10">
                                        아시아게이밍
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-tmp">
                    <div class="row" @click="$tools.ready()">
                        <div class="col-2">
                            <img src="/images/slot-icon.png" class="img-fluid">
                        </div>
                        <div class="col-10 sports-menu">
                            슬롯
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 game-list">
                CS MENU
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 pb-2">
                <div class="row xl-client-menu" @click="link('notice')">
                    <div class="col-12 client-menu">
                        공지사항
                    </div>
                </div>
                <div class="row xl-client-menu" @click="$tools.ready()">
                    <div class="col-12 client-menu">
                        FAQ
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('event')">
                    <div class="col-12 client-menu">
                        이벤트
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('attendance')">
                    <div class="col-12 client-menu">
                        출석부
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('userinformation')">
                    <div class="col-12 client-menu">
                        마이페이지
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('betlist')">
                    <div class="col-12 client-menu">
                        베팅내역
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('sportsresult')">
                    <div class="col-12 client-menu">
                        경기결과
                    </div>
                </div>
                <div class="row xl-client-menu" @click="link('frienddetails')">
                    <div class="col-12 client-menu">
                        지인추천현황
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'LeftMenuXl',
        data() {
            return {
                select: '',
                id: '',
                password: '',
                minute: null,
                second: null,
            }
        },
        created() {
        },
        methods: {
            link(link) {
                if(link === 'ready') {
                    this.$tools.ready()
                    return
                }

                if(!this.isLogin) {
                    this.$tools.routerPush('/login')
                    return
                }

                this.$tools.routerPush(`/${link}`)
            },
            change(num) {
                if(this.select === num) {
                    this.select = null
                    return
                }

                this.select = num
            },
            async login() {
                let rLogin = await this.$http.get('/api/login', {
                    id: this.id,
                    password: this.password
                }, 'Login')

                if(rLogin.error) {
                    if(rLogin.error.response.status === 401) {
                        this.$tools.sw('warning', '로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.')
                    }
                    else if(rLogin.error.response.status === 403) {
                        this.$tools.sw('warning', '로그인 실패', '관리자에게 문의하세요.')
                    }
                    return
                }

                // 구현부분
                this.$store.commit('setUser', {
                    _id: rLogin.data._id,
                    id: rLogin.data.id,
                    nick: rLogin.data.nick,
                    bankOwner: rLogin.data.bankOwner,
                    grade: rLogin.data.grade,
                    status: rLogin.data.status,
                    betStatus: rLogin.data.betStatus,
                    recommendCount: rLogin.data.recommendCount,
                    recommendLevel: rLogin.data.recommendLevel,
                    money: rLogin.data.money,
                    casinoMoney: rLogin.data.casinoMoney,
                    point: rLogin.data.point,
                    isAgent: rLogin.data.isAgent
                })

                this.$store.dispatch('getInformation')

                this.id = ''
                this.password = ''
                this.showModalLogin = false
            },
            async openGame(id) {
                let res = await this.$http.get('/api/casino-url', { id: id, kind: 'casino' })
                if(res.error) return

                id = window.open(res.data.url, 'casino', '_blank')
            },

        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin
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
            isAgent() {
                return this.$store.state.user.isAgent
            },
            casinoMoney() {
                return this.$store.state.user.casinoMoney
            },
            thisRouter() {
                return this.$store.state.router
            },
            disabledButton: {
                get() {
                    return this.$store.state.disabledButton
                },
                set(status) {
                    this.$store.commit('setDisabledButton', status)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .xl-left {
        background-color: #fff;
        min-width: 280px;
        max-width: 280px;
        padding-top: 30px;

        .wrap-logo {
            padding-bottom: 20px;
            text-align: center;
        }
        .xl-game-menu-box {
            margin-top: 10px;

            .category-tmp {
                padding: 8px 10px;
                color: #27384D;
                font-weight: 600;
                cursor: pointer;

                &:hover, &.active {
                    transition: .2s ease-out;
                    opacity: 1;
                    color: rgb(226, 178, 113);
                }
                .games-number {
                    background-color: #fafbfc;
                    box-shadow: inset 0px 0px 1px 1px rgba(240, 240, 240, 0.2), inset 0px 0px 1px 2px rgba(242, 242, 242, 0.24);
                    border-radius: 5px;
                    color: #27384d;
                    font-size: 0.8125rem;
                    font-weight: 900;
                    text-align: center;
                }
            }
            .sports-menu {
                font-size: 1rem;
                padding: 5px 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0);

                span {
                    display: inline-block;
                    font-size: 1rem;
                    padding: 5px 10px;
                }

                &:hover, &.active {
                    color: rgb(226, 178, 113);
                    padding: 5px 10px;
                }
            }
        }
        .xl-client-menu {
            padding: 3px 10px;

            .client-menu {
                border: 2px solid #e5e5e5;
                box-shadow: 1px 1px;
                border-radius: 8px;
                cursor: pointer;
                color: #27384D;
                font-weight: 600;
                font-size: 1rem;
                padding: 8px 10px;

                &:hover, &.active {
                    color: rgb(226, 178, 113);
                }
            }
        }
    }
.user-box {

    .user-level-box {
        padding: 5px 0px;
        color: #fff;

        .img-level {
            width: 100%;
            height: auto;
        }
        .level {
            font-size: 0.875rem;
            color: #fc9400;
            font-weight: 400;
        }
        .nickname {
            color: #27384D;
            font-size: 1.125rem;
            font-weight: 600;
        }
        a {
            text-decoration:none;
            color: #fff;
        }
        .signout {
            background-color: #575757;
            color: #fff;
            font-weight: 600;
            width: 20px;
            cursor: pointer;
            padding: 5px 5px;
            border-radius: 3px;
        }
    }
    .xl-login-box {
        font-size: 0.875rem;
        color: #27384D;
    }
    .user-money-info {
        background-color: #edecf2;
        border: 1px solid #e1e0e6;
        border-radius: 4px;
        padding: 0;

        span {
            display: inline-block;
            padding-top: 6px;
        }
    }
}
.quick-menu-box {
    border-top: 1px solid #e5e5e5;
    text-align: center;

    .title {
        color: #212121;
        font-size: 0.875 rem;
        font-weight: 600;
        margin-top: 8px;
    }
}
.game-list {
    background-color: #27384D;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 900;
    padding: 5px 20px;
    margin-top: 20px;
}
.btn-login {
    border: 0;
    background-color: #D3C18A;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;

    &:disabled {
        background-color: #D3C18A;
        color: #eee;
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
}
.btn-joins {
    border: 0;
    background-color: #575757;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;

    &:disabled {
        background-color: #575757;
        color: #eee;
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
}
.login-input, .join-input {
    width: 100%;
    border: 0;
    border-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 8px 5px;


    &:focus {
        outline: none;
        box-shadow: none;
    }

    &::placeholder {
        font-size: 0.75rem;
    }
}
</style>