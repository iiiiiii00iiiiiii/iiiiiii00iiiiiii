<template>
    <div class="User">
        <div class="row mb-3">
            <div class="col-12 py-2 bg-light border-bottom">
                <span class="page-title">마이페이지</span>
            </div>
        </div>

        <div class="row px-2">
            <div class="col-12 bg-white rounded pt-3">
                <form @submit.prevent="submit()">
                    <div class="form-group row">
                        <label for="userID" class="col-lg-2 col-form-label"><b>아이디</b></label>
                        <div class="col-lg-10">
                            <input
                                type="text"
                                class="form-control"
                                id="userID"
                                placeholder="아이디"
                                maxlength="20"
                                v-model="saveData.userID"
                                readonly
                            >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="joinUserNick" class="col-lg-2 col-form-label"><b>닉네임</b></label>
                        <div class="col-lg-10">
                            <input
                                type="text"
                                class="form-control"
                                id="joinUserNick"
                                placeholder="닉네임"
                                maxlength="20"
                                v-model="saveData.joinUserNick"
                                readonly
                            >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="userPassNow" class="col-lg-2 col-form-label"><b>현재 비밀번호</b></label>
                        <div class="col-lg-10">
                            <input
                                type="password"
                                class="form-control"
                                id="userPassNow"
                                placeholder="현재 비밀번호"
                                maxlength="50"
                                v-model="saveData.userPassNow"
                            >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="userPass" class="col-lg-2 col-form-label"><b>비밀번호</b></label>
                        <div class="col-lg-10">
                            <input
                                type="password"
                                class="form-control"
                                id="userPass"
                                placeholder="비밀번호"
                                maxlength="50"
                                v-model="saveData.userPass"
                            >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="userPassRe" class="col-lg-2 col-form-label"><b>비밀번호 확인</b></label>
                        <div class="col-lg-10">
                            <input
                                type="password"
                                class="form-control"
                                id="userPassRe"
                                placeholder="비밀번호 확인"
                                maxlength="50"
                                v-model="saveData.userPassRe"
                            >
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12 text-right">
                            <button type="submit" class="btn btn-info px-5" :disabled="disabledButton">수정</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'User',
    components: {
    },
    data() {
        return {
            disabledButton: false,
            saveData: {

            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        submit() {
            this.disabledButton = true

            this.$axios.put('/api/user-update', this.saveData).then(() => {
                this.saveData = {}
                this.$sw.fire({
                    title: '수정완료',
                    text: '회원정보가 수정 되었습니다.',
                    icon: 'success'
                }).then(() => {
                    this.disabledButton = false
                })
            }).catch((err) => {
                if(err.response.status === 500) {
                    this.$sw.fire({
                        title: '서버오류',
                        text: '지속적인 오류발생시 관리자에게 문의하세요.',
                        icon: 'error'
                    }).then(() => {
                        this.disabledButton = false
                    })
                }
                else if(err.response.status === 400) {
                    let r = err.response.data
                    this.$sw.fire({
                        title: '수정 실패',
                        text: r.validate[r.firstError.field].message[r.firstError.rule],
                        icon: 'warning'
                    }).then(() => {
                        this.disabledButton = false
                    })
                }
            })
        }
    },
    computed: {
    },
    watch: {

    }
}
</script>

<style lang="scss" scope>

</style>