<template>
    <div>
        <div class="popup" :style="`top:${top}px;left:${left}px;width:${width}px;height:auto;`" v-show="show">
            <img :src="image" class="img-fluid">
            <div class="popup-close">
                <label class="mx-2 cursor-pointer" @click="closePopupDay()">오늘 하루 보지 않기</label>
                <span class="badge close-button" @click="closePopup()">닫기</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Popup',
    props: {
        id: {
            type: String
        },
        top: {
            type: Number
        },
        left: {
            type: Number
        },
        image: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    },
    components: {
    },
    data() {
        return {
            show: true
        }
    },
    created() {
    },
    methods: {
        closePopup() {
            // if(this.closeDay) {
            //     this.$cookies.set(`pop-${this.id}`, true, 60 * 60 * 24)
            // }
            this.show = false
        },
        closePopupDay() {
            this.$cookies.set(`pop-${this.id}`, true, 60 * 60 * 24)
            this.show = false
        }
    },
    computed: {
    },
    watch: {
        $route() {
            this.show = true
        }
    }
}
</script>