<template>
    <div class="row mt-3 mt-xl-5">
        <div class="col-12 col-xl-4"></div>
        <div class="col-12">
            <div class="row">
                <!-- <div class="col border-stye"></div> -->
                <div class="col-12 text-center">
                    <img src="/images/study.png" class="img-fluid cursor-pointer" @click="$tools.pushRouter('/')">
                </div>
                <!-- <div class="col border-stye"></div> -->
            </div>
            <form class="row mt-3" @submit.prevent="join()">
                <div class="col-12 col-xl-4 offset-xl-4 px-3 px-xl-1">
                    <div class="join-box">
                        <div class="row">
                            <div class="col">
                                <div class="title">
                                    회원가입
                                </div>
                                <div class="sub-title">
                                    가입 후 다양한 혜택을 누리실 수 있습니다.
                                </div>
                                <div class="join-login">
                                    <span
                                        @click="$tools.pushRouter('/login')"
                                    >
                                        로그인 <font-awesome-icon :icon="['fa', 'chevron-right']"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 col-xl-6">
                                <label class="item-title" for="id">아이디</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="id"
                                        tabindex="1"
                                        maxlength="20"
                                        placeholder="아이디를 입력하세요."
                                        v-model="id"
                                    >
                                </div>
                                <label class="item-title" for="nick">닉네임</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="nick"
                                        tabindex="2"
                                        maxlength="20"
                                        placeholder="닉네임을 입력하세요."
                                        v-model="nick"
                                    >
                                </div>
                                <label class="item-title" for="password">비밀번호</label>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        class="form-control input"
                                        tabindex="3"
                                        id="password"
                                        maxlength="50"
                                        placeholder="비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="password"
                                    >
                                </div>
                                <label class="item-title" for="passwordRe">비밀번호 확인</label>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        class="form-control input"
                                        id="passwordRe"
                                        tabindex="4"
                                        maxlength="50"
                                        placeholder="비밀번호를 다시 한번 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordRe"
                                    >
                                </div>
                                <label class="item-title" for="passwordExchange">출금 비밀번호</label>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        class="form-control input"
                                        id="passwordExchange"
                                        tabindex="5"
                                        maxlength="50"
                                        placeholder="출금 비밀번호를 입력하세요."
                                        autocomplete="new-password"
                                        v-model="passwordExchange"
                                    >
                                </div>
                            </div>
                            <div class="col-12 col-xl-6">
                                <label class="item-title" for="cell">전화번호</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="cell"
                                        tabindex="6"
                                        maxlength="20"
                                        placeholder="전화번호를 입력하세요."
                                        v-model="cell"
                                    >
                                </div>
                                <label class="item-title" for="bank">은행</label>
                                <div class="form-group">
                                    <select class="form-control input" id="bank" tabindex="7" v-model="bank">
                                        <option value="">-은행선택-</option>
                                        <option value="산업은행">산업은행</option>
                                        <option value="기업은행">기업은행</option>
                                        <option value="국민은행">국민은행</option>
                                        <option value="외환은행">외환은행</option>
                                        <option value="수협중앙회">수협중앙회</option>
                                        <option value="수출입은행">수출입은행</option>
                                        <option value="농협중앙회">농협중앙회</option>
                                        <option value="우리은행">우리은행</option>
                                        <option value="신한은행">신한은행</option>
                                        <option value="SC제일은행">SC제일은행</option>
                                        <option value="하나은행">하나은행</option>
                                        <option value="한국씨티은행">한국씨티은행</option>
                                        <option value="대구은행">대구은행</option>
                                        <option value="부산은행">부산은행</option>
                                        <option value="광주은행">광주은행</option>
                                        <option value="제주은행">제주은행</option>
                                        <option value="전북은행">전북은행</option>
                                        <option value="경남은행">경남은행</option>
                                        <option value="새마을금고">새마을금고</option>
                                        <option value="신협중앙회">신협중앙회</option>
                                        <option value="상호신용금고">상호신용금고</option>
                                        <option value="홍콩상하이은행">홍콩상하이은행</option>
                                        <option value="우체국">우체국</option>
                                        <option value="동양종합금융증권">동양종합금융증권</option>
                                        <option value="미래에셋증권">미래에셋증권</option>
                                        <option value="대우증권">대우증권</option>
                                        <option value="삼성증권">삼성증권</option>
                                        <option value="한국투자증권">한국투자증권</option>
                                        <option value="우리투자증권">우리투자증권</option>
                                        <option value="하이투자증권">하이투자증권</option>
                                        <option value="에이치엠씨투자증권">에이치엠씨투자증권</option>
                                        <option value="에스케이증권">에스케이증권</option>
                                        <option value="대신증권">대신증권</option>
                                        <option value="한화증권">한화증권</option>
                                        <option value="하나대투증권">하나대투증권</option>
                                        <option value="유진투자증권">유진투자증권</option>
                                        <option value="현대증권">현대증권</option>
                                        <option value="메리츠증권">메리츠증권</option>
                                        <option value="엔에이치투자증권">엔에이치투자증권</option>
                                        <option value="카카오뱅크">카카오뱅크</option>
                                        <option value="케이뱅크">케이뱅크</option>
                                    </select>
                                </div>
                                <label class="item-title" for="bankAccount">계좌번호</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="bankAccount"
                                        tabindex="8"
                                        maxlength="20"
                                        placeholder="계좌번호를 입력하세요."
                                        v-model="bankAccount"
                                    >
                                </div>
                                <label class="item-title" for="bankOwner">예금주</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="bankOwner"
                                        tabindex="9"
                                        maxlength="20"
                                        placeholder="예금주를 입력하세요."
                                        v-model="bankOwner"
                                    >
                                </div>
                                <label class="item-title" for="recommendCode">가입코드(추천인)</label>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control input"
                                        id="recommendCode"
                                        tabindex="10"
                                        maxlength="20"
                                        placeholder="가입코드를 입력하세요."
                                        v-model="recommendCode"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <button type="submit" class="btn-join">가입하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-12 col-xl-4"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Join',
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                id: '',
                password: '',
                passwordRe: '',
                passwordExchange: '',
                nick: '',
                cell: '',
                bank: '',
                bankOwner: '',
                bankAccount: '',
                recommendCode: ''
            }
        },
        methods: {
            async join() {
                const r = await this.$http.post('/api/join', {
                    id: this.id,
                    password: this.password,
                    passwordRe: this.passwordRe,
                    passwordExchange: this.passwordExchange,
                    nick: this.nick,
                    cell: this.cell,
                    bank: this.bank,
                    bankAccount: this.bankAccount,
                    bankOwner: this.bankOwner,
                    recommendCode: this.recommendCode
                })

                if(r.error) return

                this.id = '',
                this.password = '',
                this.passwordRe = '',
                this.passwordExchange = '',
                this.nick = '',
                this.cell = '',
                this.bank = '',
                this.bankOwner = '',
                this.bankAccount = '',
                this.recommendCode = ''

                this.$tools.sw('success', '가입성공', '가입해 주셔서 감사합니다.<br>잠시 후 가입 승인 절차 완료 되시면, 정상이용 가능 합니다.', 'html')
            }
        }
    }
</script>