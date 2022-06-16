<template>
    <div class="col-12">
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="d-row">
                <div class="col-12 text-center">
                    <font-awesome-icon :icon="['fa', 'cogs']" class="icon-maintenence text-light-brown"/>
                </div>
                <div class="col-12 mt-3">
                    <div class="text-center text-light-brown">
                        <strong>
                            점검시간 : {{ startDateTime }} ~ {{ endDateTime }}
                        </strong>
                    </div>
                </div>
                <div class="col-12 mt-3 text-center text-light" v-html="content"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Maintenance',
        data() {
            return {
                startDateTime: '',
                endDateTime: '',
                content: ''
            }
        },
        mounted() {
            this.maintenance()
        },
        methods: {
            async maintenance() {
                let rMaintenance = await this.$http.get('/api/get-maintenance')

                if(rMaintenance.error) return

                rMaintenance = rMaintenance.data
                if(rMaintenance.isMaintenance) {
                    this.startDateTime = this.$moment(rMaintenance.maintenance.startDateTime).format('YYYY년 MM월 DD일 HH시mm분')
                    this.endDateTime = this.$moment(rMaintenance.maintenance.endDateTime).format('YYYY년 MM월 DD일 HH시mm분')
                    this.content = rMaintenance.maintenance.content.replace(/\n/gi, '<br>')
                }
                else {
                    this.$tools.pushRouter('/')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon-maintenence {
        font-size: 10rem;
    }
</style>