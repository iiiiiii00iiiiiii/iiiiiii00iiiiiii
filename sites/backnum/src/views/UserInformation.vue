<template>
    <div>
        <div class="row px-xl-3">
            <div class="col-12 userinfo-bg">
                <div class="row p-xl-3">
                    <div class="col-12 mt-4 userinfo-title">
                        마이페이지 <span>INFORMATION</span>
                    </div>
                </div>
                <hr>
                <div class="row mt-3 mt-xl-0 px-xl-3">
                    <div class="col-12 money-info-box">
                        <div class="money-info-title">
                            <span>주의사항</span>
                        </div>
                        <ul class="money-info-content mt-2">
                            <li>※ 타인에게 <span>계정양도 및 대여는 불가하며, 출금계좌 변경시 고객센터로 문의</span> 주시기바랍니다.</li>
                            <li>※ 본페이지는 <span>비밀번호 및 출금비밀번호</span> 수정이 가능합니다.</li>
                            <li>※ 수정하실 <span>비밀번호 및 출금비밀번호</span> 입력 후 정보수정 해주시기 바랍니다.</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="row px-xl-3">
                    <div class="col-12 userinfo-guide">
                        <span>정보수정 안내</span>
                    </div>
                </div>
                <div class="row my-xl-4">
                    <div class="col-12 col-xl-6 offset-xl-3">
                        <div class="mypage-box py-xl-4">
                            <form @submit.prevent="submit">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mypage-content mt-xl-2">
                                            {{ nick }} <span>님의 회원정보 입니다.</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-xl-8 offset-xl-2">
                                        <div class="form-group row mt-5">
                                            <label class="col-5 col-xl-4 col-form-label">아이디</label>
                                            <div class="col-7 col-xl-8 pt-1 font-weight-bold text-center">
                                                {{ id }}
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-5 col-xl-4 col-form-label">닉네임</label>
                                            <div class="col-7 col-xl-8 pt-1 font-weight-bold text-center">
                                                {{ nick }}
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordNow" class="col-5 col-xl-4 col-form-label">현재 비밀번호</label>
                                            <div class="col-7 col-xl-8">
                                                <input type="password" class="form-control form-control-sm textbox-mypage" id="passwordNow" v-model="passwordNow">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="password" class="col-5 col-xl-4 col-form-label">변경 비밀번호</label>
                                            <div class="col-7 col-xl-8">
                                                <input type="password" class="form-control form-control-sm textbox-mypage" id="password" v-model="password">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordRe" class="col-5 col-xl-4 col-form-label">비밀번호 확인</label>
                                            <div class="col-7 col-xl-8">
                                                <input type="password" class="form-control form-control-sm textbox-mypage" id="passwordRe" v-model="passwordRe">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="passwordExchange" class="col-5 col-xl-4 col-form-label">출금 비밀번호</label>
                                            <div class="col-7 col-xl-8">
                                                <input type="password" class="form-control form-control-sm textbox-mypage" id="passwordExchange" v-model="passwordExchange">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row mb-5">
                                    <div class="col-12 text-center pt-3">
                                        <button class="btn btn-lg btn-amount">정보수정</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInformation',
    data() {
        return {
            passwordNow: '',
            password: '',
            passwordRe: '',
            passwordExchange: '',
        }
    },
    created() {
    },
    methods: {
        async submit() {
            let resultUpdate = await this.$http.put('/api/mypage', {
                passwordNow: this.passwordNow,
                password: this.password,
                passwordRe: this.passwordRe,
                passwordExchange: this.passwordExchange,
            })

            if(resultUpdate.error) return

            this.initForm()

            this.showModalMyPage = false
            this.$tools.sw('success', '수정완료', '회원정보가 수정 되었습니다.')
        },
        hideModal() {
            this.showModalMyPage = false
            this.initForm()
        },
        initForm() {
            this.passwordNow = ''
            this.password = ''
            this.passwordRe = ''
            this.passwordExchange = ''
        }
    },
    computed: {
        disabledButton: {
            get() {
                return this.$store.state.disabledButton
            },
            set(status) {
                this.$store.commit('setDisabledButton', status)
            }
        },
        id() {
            return this.$store.state.user.id
        },
        nick() {
            return this.$store.state.user.nick
        },
        bankOwner() {
            return this.$store.state.user.bankOwner
        }
    }
}
</script>
<style lang="scss" scoped>
.userinfo-bg {
    background-color: #fafbfc;
    border: 1px solid #e1e4e8;
    border-radius: 5px 5px 0px 0px;
    
    @media (min-width: 1200px) {
        margin-top: 30px;
    }
}
.userinfo-title {
    color: #27384D;
    font-size: 1.375rem;
    font-weight: 600;

    @media (min-width: 1200px) {
        font-size: 1.875rem;
    }

    span {
        color: #909090;
        font-size: 0.75rem;

        @media (min-width: 1200px) {
            font-size: 0.9375rem;
        }
    }
}
.money-info-box {

    .money-info-title {
        background-color: #163588;
        border-radius: 5px;
        padding: 5px 0;
        span {
            color: #fff;
            margin-left: 10px;
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin-left: 5px;
            font-weight: 500;
            span {
                color: #d32f2f;
            }
        }
    }
}
.userinfo-guide {
    background-color: #27384D;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 0;

    span {
        margin-left: 10px;
    }
    @media (min-width: 1200px) {
        font-size: 1.25rem;
    }
}
.board-info-title {
    font-size: 1rem;
    font-weight: 600;
}
.mypage-content {
    color: #27384D;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;

    span {
        color: #909090;
    }

    @media(min-width: 1200px) {
        font-size: 1.25rem;
    }
}

.mypage-box {
    background-color: #f7f7f7;
    color: #27384D;
    border-radius: 5px;
    padding: 1rem;
    font-size: 0.9375rem;

    .col-form-label {
        font-weight: 600;
    }

    .textbox-mypage {
        border: 0;
        box-shadow: none;
        border: 1px solid #26282e; 
        background-color: #272b2e;
        color: #fff;

    }
}
.btn-amount {
    background-color: #27384D;
    border-radius: 5px;
    color: #fff;
    padding: 10px 100px;
}
hr {
    background-color: #27384D;
    width: 98%;
}

    .textbox-mypage-id {
        background: url('/images/icon-text-id.png') left center no-repeat;
    }
    .textbox-mypage-nick {
        background: url('/images/icon-text-nick.png') left center no-repeat;
    }
    .textbox-mypage-cell {
        background: url('/images/icon-text-cell.png') left center no-repeat;
    }
    .textbox-mypage-password, .textbox-mypage-bank, .textbox-mypage-bankowner, .textbox-mypage-bankaccount {
        background: url('/images/icon-text-pw.png') left center no-repeat;
    }
    .textbox-mypage-recommendcode {
        background: url('/images/icon-text-recommendcode.png') left center no-repeat;
    }
    .btn-mypage {

        &:focus {
            outline: none;
        }
    }
    .mypage-info-title {
        color: #b7b6b6;
        font-size: 1.25rem;
        font-weight: 600;
    }
    .mypage-info-content {
        color: #b7b6b6;
        font-size: 1rem;
        font-weight: 600;
    }
    
</style>