<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 mb-5 d-none d-xl-block">
                <div class="row">
                    <div class="col">
                        <div class="title">
                            고객센터 문의 <span>CS CENTER</span>
                        </div>
                    </div>
                </div>
                <hr class="mt-5">
                <div class="row mt-3">
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
                                    <button type="button" class="btn-board red" :disabled="loading" tabindex="4" @click="$tools.pushRouter(`/help/?page=${$route.params.page}`)">
                                        취소
                                    </button>
                                    <button type="button" class="btn-board ml-2" :disabled="loading" tabindex="3" @click="submit()">
                                        문의 등록
                                    </button>
                                </div>
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

    import UrgentNotice from '@/components/UrgentNotice.vue'

    export default {
        name: 'HelpWrite',
        components: {
            UrgentNotice
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