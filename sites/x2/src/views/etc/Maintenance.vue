<template>
    <div>
        <div class="row py-5 bg-sports-wrap text-white">
            <div class="col-12 text-center">
                <img src="../../assets/images/maintenance.png" class="img-fluid">
            </div>
            <div class="col-12 mt-2 text-center text-dark">
                <strong>
                    점검시간 : {{ maintenance.startDateTime }} ~ {{ maintenance.endDateTime }}
                </strong>
            </div>
            <div class="col-12 mt-2 text-center text-dark" v-html="maintenance.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Maintenance',
    data() {
        return {
            maintenance: {
                startDateTime: null,
                endDateTime: null,
                content: null
            }
        }
    },
    created() {
        this.checkMaintenance()
    },
    methods: {
        async checkMaintenance() {
            let maintenance = await this.$http.get('/api/get-maintenance')
            if(maintenance.error) return

            if(maintenance.data.isMaintenance) {
                this.maintenance.startDateTime = this.$moment(maintenance.data.maintenance.startDateTime).format('YYYY년 MM월 DD일 HH시mm분')
                this.maintenance.endDateTime = this.$moment(maintenance.data.maintenance.endDateTime).format('YYYY년 MM월 DD일 HH시mm분')
                this.maintenance.content = maintenance.data.maintenance.content.replace(/\n/gi, '<br>')
            }
            else {
                this.$tools.replaceRouter('/')
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>