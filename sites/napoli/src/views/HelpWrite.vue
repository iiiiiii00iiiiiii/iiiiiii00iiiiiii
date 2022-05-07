<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'comments']"/>
                            <span class="ml-2">고객센터 문의 HELP</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-write">
                        <div class="row mt-2">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control form-control-sm board-input"
                                    placeholder="제목"
                                    maxlength="100"
                                    tabindex="1"
                                    v-model="title"
                                >
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col">
                                <textarea
                                    class="form-control form-control-sm board-input"
                                    placeholder="내용"
                                    rows="10"
                                    maxlength="500"
                                    tabindex="2"
                                    v-model="content"
                                ></textarea>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col text-right">
                                <button type="button" class="btn-board py-2" :disabled="loading" tabindex="4" @click="$tools.pushRouter(`/help/?page=${$route.params.page}`)">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 취소
                                </button>
                                <button type="button" class="btn-write ml-2 py-2" :disabled="loading" tabindex="3" @click="submit()">
                                    <font-awesome-icon :icon="['fa', 'pen']"/> 문의 등록
                                </button>
                            </div>
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
        name: 'HelpWrite',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                title: '',
                content: ''
            }
        },
        methods: {
            async submit() {
                let rHelp = await this.$http.post('/api/help', {
                    title: this.title,
                    content: this.content
                })
                if(rHelp.error) return

                this.$tools.sw('success', '문의하기 성공', '문의내역이 등록 되었습니다.', 'html')
                this.$tools.pushRouter(`/help/?page=${this.$route.params.page}`)
            }
        }
    }
</script>