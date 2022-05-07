<template>
    <div>
        <div class="row">
            <div class="col bg-dark-gray" style="height:1000px;">
                asdfasdf
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            id: '',
            password: ''
        }
    },
    created() {
        this.$store.commit('delUser')
    },
    methods: {
        async login() {
            // let resultLogin = await this.$http.get('/api/login', {
            //     id: this.id,
            //     password: this.password
            // }, 'Login')

            // if(resultLogin.error) {
            //     if(resultLogin.error.response.status === 401) {
            //         this.$tools.sw('warning', '로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.')
            //     }
            //     else if(resultLogin.error.response.status === 403) {
            //         this.$tools.sw('warning', '로그인 실패', '관리자에게 문의하세요.')
            //     }
            //     return
            // }

            // //구현부분
            // this.$store.dispatch('getInformation')

            // this.$tools.routerPush('/')
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
        }
    }
}
</script>
<style lang="scss" scoped>

</style>