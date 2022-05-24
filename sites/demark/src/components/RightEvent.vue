<template>
    <div class="event-wrap">
        <div class="event-header">
            <font-awesome-icon :icon="['fa', 'gift']" style="color: #fff"/> Event
        </div>
        <div class="event-list">
            <ul>
                <li v-for="(item, index) in event" :key="index">
                    <span
                        class="cursor-pointer"
                        :class="item.header ? 'ml-2' : ''"
                        @click="$tools.pushRouter(`/event/detail/${item._id}/1`, true)"
                    >
                        {{ item.title }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'RightEvent',
        components: {
        },
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
                bannerIndex: null,
                selectBoard: 'notice',
                notice: [],
                event: [],
                faq: []
            }
        },
        created() {
            this.getDashboard()
        },
        methods: {
            async getDashboard() {
                const r = await this.$http.get('/api/get-home', { n: 100 })
                if(r.error) return


                this.event = r.data.dashboard.event
            },
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            }
        }
    }
</script>
