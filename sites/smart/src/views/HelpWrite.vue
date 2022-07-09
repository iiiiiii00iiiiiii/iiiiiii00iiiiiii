<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'pen']"/>
                글쓰기 - <span>Write</span>
            </div>
            <div class="content-board-write-header">
                <div class="row mt-2">
                    <div class="col">
                        <input
                            type="text"
                            class="write-board-title"
                            placeholder="제목을 입력하세요"
                            maxlength="100"
                            tabindex="1"
                            v-model="title"
                        >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <textarea
                            class="note-codable"
                            placeholder="내용"
                            rows="10"
                            maxlength="500"
                            tabindex="2"
                            v-model="content"
                        ></textarea>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col text-center">
                        <button type="button" class="btn-select-denim py-2" :disabled="loading" tabindex="3" @click="submit()">
                            <font-awesome-icon :icon="['fa', 'pen']"/> 글쓰기
                        </button>
                        <button type="button" class="btn-select-cinnabar ml-2 py-2" :disabled="loading" tabindex="4" @click="$tools.pushRouter(`/help/?page=${$route.params.page}`)">
                            <font-awesome-icon :icon="['fa', 'ban']"/> 취소하기
                        </button>
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