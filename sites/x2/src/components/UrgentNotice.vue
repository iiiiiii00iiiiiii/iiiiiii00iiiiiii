<template>
    <div class="container-fluid d-none d-xl-block">
        <div class="row">
            <div class="col-12 nrgent-notice">
                <div class="row">
                    <div class="col-1 px-4">
                        <div class="notice-button">긴급공지</div>
                    </div>
                    <div class="col-11 notice">
                        <marquee direction="left">{{ shortNotice }}</marquee>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['shortNotice'])
        }
    }
</script>

<style lang="scss" scoped>
    .nrgent-notice {
        margin-top: 20px;
        .notice-button {
            background-color: #0E3B72;
            color: #fff;
            border-radius: 2px;
            font-size: 0.8125rem;
            text-align: center;
            padding: 3px 0;
        }
        .notice {
            color: #333;
            font-size: 0.75rem;
            line-height: 25px;
        }
    }
</style>