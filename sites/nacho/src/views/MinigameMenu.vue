<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'dice']"/>
                            <span class="ml-2">미니게임</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="casino">
                        <div class="row">
                            <div class="col-12 col-xl-6 text-center">
                                <img
                                    src="/images/sub-banner-boglepowerball.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/boglepowerball')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 mt-xl-0 text-center">
                                <img
                                    src="/images/sub-banner-bogleladder.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/bogleladder')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="/images/sub-banner-coinpowerball3.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/coinpowerball3')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="/images/sub-banner-coinpowerball5.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/coinpowerball')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-eospowerball1.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/eospowerball1')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-eospowerball3.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/eospowerball3')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-eospowerball5.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/eospowerball')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-speedladder.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/speedladder')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-googlepowerball1.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/googlepowerball1')"
                                >
                            </div>
                            <div class="col-12 col-xl-6 mt-2 text-center">
                                <img
                                    src="images/sub-banner-googlepowerball3.png"
                                    class="img-fluid cursor-pointer rounded"
                                    @click="$tools.pushRouter('/googlepowerball3')"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MinigameMenu',
        components: {
        }
    }
</script>