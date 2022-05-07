<template>
    <div>
        <div class="row">
            <div class="col-12 modal-wrap-casino">
                <div class="row">
                    <div class="col-12 casino-bg">
                        <div class="row p-xl-2">
                            <div class="col-12 col-xl-9 d-none d-xl-block">
                                <img src="/images/ns-bottom-logo.png" class="img-fluid w-30">
                            </div>
                            <div class="col-8 offset-4 col-xl-3 offset-xl-0 casino-menu">
                                <div class="row">
                                    <div class="col casino-icon"
                                    @click="$tools.routerPush('casino')">
                                        <img src="/images/ns-casino-icon.png">
                                        <div>카지노</div>
                                    </div>
                                    <div class="col casino-icon active"
                                    @click="$tools.routerPush('slot')">
                                        <img src="/images/ns-slots-icon.png">
                                        <div>슬롯</div>
                                    </div>
                                    <div class="col casino-icon"
                                    @click="$tools.routerPush('exchangecasino')">
                                        <img src="/images/ns-move-money.png">
                                        <div>머니이동</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="col-12 casino-title">
                                슬롯게임
                                <div>SLOT GAME</div>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-12 casino-title-text px-0">
                                ※ 슬롯 이용시 보유머니를 카지노머니로 전환 후 이용이 가능합니다 ※
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="casino-box">
                    <div class="row mt-3 slot-list">
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-pragmatic.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(8)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-isoft.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(13)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-bbin.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(15)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-rtg.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(19)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-microgaming.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(21)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-cq9.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(23)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-habanero.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(21)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-playstar.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(24)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-gameart.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(30)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-toptrend.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(29)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-genesis.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(32)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-playson.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(36)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-bng.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(37)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-bgaming.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(38)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-betsoft.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(39)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-evo.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(40)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-dreamtech.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(41)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-ag.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(44)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-playgo.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(51)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-bbtech.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(6)"
                            >
                        </div>
                        <div class="col-6 col-xl-4">
                            <img
                                src="/images/ns-slot-tpg.png"
                                class="img-fluid cursor-pointer"
                                @click="slotDetail(34)"
                            >
                        </div>
                    </div>
                    <!-- <div class="row mt-3 mt-xl-5 slot-detail-list" v-if="casinoMode === 'slotDetail'">
                        <div
                            class="col-4 col-lg-2 mt-2"
                            v-for="(v, index) in casinoSlotData"
                            :key="index"
                            @click="openGameSlot(v.id)"
                        >
                            <div class="row">
                                <div class="col-12">
                                    <img
                                        :src="v.img"
                                        class="casino-img img-fluid cursor-pointer"
                                    >
                                </div>
                                <div class="col-12 text-center mt-1 slot-text"><strong>{{ v.tKR }}</strong></div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slot',
    data() {
        return {
        }
    },
    methods: {
        async slotDetail(tp) {
            let res = await this.$http.get('/api/slot-detail', { tp })
            if(res.error) return

            this.casinoSlotData = res.data.recordSet
            this.casinoMode = 'slotDetail'
        },
        async openGame(id) {
            let res = await this.$http.get('/api/casino-url', { id: id, kind: 'slots' })
            if(res.error) return

            id = window.open(res.data.url, 'casino', '_blank')
        },
        async openGameSlot(id) {
            let res = await this.$http.get('/api/casino-url', { id: id })
            if(res.error) return

            id = window.open(res.data.url, 'slots', '_blank')
        }
    },
    computed: {
        showModalCasino: {
            get() {
                return this.$store.state.showModalCasino
            },
            set(isShow) {
                if(this.showModalCasino) {
                    this.$store.commit('setShowModalCasino', isShow)
                }
            }
        },
        casinoMode: {
            get() {
                return this.$store.state.casinoMode
            },
            set(mode) {
                this.$store.commit('setCasinoMode', mode)
            }
        },
        casinoSlotData: {
            get() {
                return this.$store.state.casinoSlotData
            },
            set(data) {
                this.$store.commit('setCasinoSlotData', data)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.casino-bg {
    background-image: url(/images/ns-casino-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-size: 100% 100%;
    color: #fff;
}
.casino-title {
    font-size: 1.875rem;
    text-align: center;

    div  {
        color: #979797;
        font-size: 0.9375rem;
    }
}
.casino-title-text {
    font-size: 0.75rem;
    text-align: center;
}
.casino-menu {
    background-color: #0f1520;
    border-radius: 20px;
    text-align: center;
    align-self: center;
    cursor: pointer;
    
    .casino-icon {
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 15px;

        @media(min-width: 1200px) {
            padding-top: 15px;
            padding-bottom: 15px;
            border-radius: 20px;
        }

        &:active {
            background-color: #0787FD;
        }
        &.active {
            background-color: #0787FD !important;
        }
    }
}
hr {
    border: 1px solid #37383B;
    width: 98%;
}
.casino-box {
    margin-bottom: 100px;
}
.cursor-pointer {

    &:hover {
        opacity: 0.5;
    }
}
</style>