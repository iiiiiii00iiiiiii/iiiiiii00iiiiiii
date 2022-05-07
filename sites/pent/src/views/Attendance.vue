<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="page-title-wrap">
                        <div class="page-title">
                            <font-awesome-icon :icon="['fa', 'calendar-alt']"/>
                            <span class="ml-2">출석부 Attendance</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col">
                    <div class="board-list">
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn-board" :disabled="loading" @click="getAttendance()">
                                    <font-awesome-icon :icon="['fa', 'redo']"/> 새로고침
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col monthly-count">
                                <span>{{ $moment(month).format('YYYY년 M월') }}</span> 총 <span class="attendance-count">{{ monthlyCount }}</span>번 출석 하셨습니다.
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col select-month">
                                <font-awesome-icon class="mr-2 change-month" :icon="['fa', 'angle-double-left']" @click="changeMonth(-1)"/>
                                {{ month }}
                                <font-awesome-icon class="ml-2 change-month" :icon="['fa', 'angle-double-right']" @click="changeMonth(1)"/>
                            </div>
                        </div>
                        <div class="row my-3 my-xl-3 p-xl-2">
                            <div class="col-12 col-xl-8 offset-xl-2">
                                <div class="row">
                                    <div class="col">
                                        <div class="attendance-title">일</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">월</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">화</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">수</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">목</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">금</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-title">토</div>
                                    </div>
                                </div>
                                <div class="row mt-2" v-for="(arr, i) in calendar" :key="i">
                                    <div class="col" v-for="(date, j) in arr" :key="j">
                                        <div>
                                            <div class="date" :class="attendance.findIndex(x => x == date) > -1 ? '' : date === today ? 'cursor-pointer' : ''" @click="setAttendance(date)">
                                                <div class="day" :class="date === today ? 'today' : $moment(date).date() < $moment(today).date() ? 'before' : ''">
                                                    {{ $moment(date).date() }}
                                                </div>
                                                <div class="stamp-wrap" v-if="attendance.findIndex(x => x == date) > -1">
                                                    <img src="/images/attendance.png" class="stamp" alt="stamp" title="stamp">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Attendance',
        components: {
        },
        computed: {
            ...mapGetters(['loading'])
        },
        data() {
            return {
                month: '',
                calendar: [],
                attendance: [],
                monthlyCount: 0,
                today: ''
            }
        },
        created() {
            this.month = this.$moment().format('YYYY-MM')
            this.getAttendance()
        },
        methods: {
            ...mapActions(['getInformation']),
            async getAttendance() {
                const r = await this.$http.get('/api/get-attendance', { month: this.month })
                if(r.error) return

                this.calendar = r.data.calendar
                this.attendance = r.data.attendance
                this.monthlyCount = r.data.monthlyCount
                this.today = r.data.today
            },
            async setAttendance(date) {
                if(date !== this.today) return
                const exist = this.attendance.findIndex(x => x == date) > -1
                if(exist) return

                let rAttendance = await this.$http.post('/api/set-attendance', { setDate: date })
                if(rAttendance.error) return

                this.$tools.sw('success', '출석 성공', '출석해 주셔서 감사합니다.')
                this.getInformation()
                this.getAttendance()
            },
            changeMonth(n) {
                if(this.loading) return
                this.month = this.$moment(this.month).add(n, 'month').format('YYYY-MM')
                this.getAttendance()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .monthly-count {
        text-align: center;
        font-size: 1rem;
        color: #c2c2c2;

        span {
            color: #deb97d;
        }
        .attendance-count {
            color: #deb97d;
            font-weight: 800;
        }
    }
    .select-month {
        text-align: center;
        color: #c2c2c2;

        font-size: 1.5rem;
    }
    .change-month {
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .attendance-title {
        padding-top: 10px;
        padding-bottom: 10px;
        border: 0;
        border-radius: 5px;
        color: #979696;
        font-weight: 800;
        text-shadow: 2px 2px 2px #111;
        background-color: #111;
        text-align: center;
    }
    .date {
        width: 100%;
        position: relative;

         &::after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        .day {
            position: absolute;
            z-index: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            border: 0;
            border-radius: 5px;
            color: #706f6f;
            font-weight: 800;
            text-shadow: 2px 2px 2px #111;
            background-color: #111;

            font-size: 1rem;
            @media (min-width: 1200px) {
                font-size: 1.5rem;
            }

            &.today {
                color: #deb97d !important;
            }
        }

        .stamp-wrap {
            position: absolute;
            top: 20%;
            left: 20%;

            .stamp {
                opacity: 0.5;
                width: 80% !important;
                height: 80% !important;
            }
        }
    }
</style>