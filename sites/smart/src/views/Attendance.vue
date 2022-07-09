<template>
    <div class="row" data-aos="fade-in" data-aos-duration="1500">
        <div class="col page-content">
            <div class="page-content-header">
                <font-awesome-icon :icon="['fa', 'calendar-alt']"/>
                출석체크 - <span>Attendance</span>
            </div>
            <div class="content-notice">
                <div>하루최소 <span>30,000</span> 충전 시 출석체크를 하실 수 있습니다.</div>
                <div>자세한 내용은 이벤트란 참고하시기 바랍니다.</div>
            </div>
            <div class="attendance-calendar">
                <div class="row">
                    <div class="col-12 col-xl-10 offset-xl-1">
                        <div class="row">
                            <div class="col">
                                <div class="attendance-calendar-month-selector">
                                    <span>{{ $moment(month).format('YYYY년 M월') }}</span> 총 <span class="attendance-count">{{ monthlyCount }}</span>번 출석 하셨습니다.
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="attendance-calendar-month-selector">
                                    <font-awesome-icon class="mr-2 cursor-pointer" :icon="['fa', 'angle-double-left']" @click="changeMonth(-1)"/>
                                    {{ month }}
                                    <font-awesome-icon class="ml-2 cursor-pointer" :icon="['fa', 'angle-double-right']" @click="changeMonth(1)"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <div class="attendance-calendar-week red">일</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week">월</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week">화</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week">수</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week">목</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week">금</div>
                                    </div>
                                    <div class="col">
                                        <div class="attendance-calendar-week blue">토</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2 attendance-calendar-day" v-for="(arr, i) in calendar" :key="i">
                            <div class="col" v-for="(date, j) in arr" :key="j">
                                <div>
                                    <div class="date pb-3" :class="attendance.findIndex(x => x == date) > -1 ? '' : date === today ? 'cursor-pointer' : ''" @click="setAttendance(date)">
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
            async setAttendance(date, ) {
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
