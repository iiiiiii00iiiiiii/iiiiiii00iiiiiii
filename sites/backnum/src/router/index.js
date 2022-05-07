import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
import store from '@/store'
import http from '@/lib/http'

Vue.use(VueRouter)

let getInformation = () => async (to, from, next) => {
    if(localStorage.getItem('access-token')) {
        const r = await http.get('/api/get-user-info', null, false)
        if (r.error) {
            next()
            return
        }

        if(r.data) {
            store.dispatch('setUser', r.data)
            next()
            return
        }
        else {
            store.dispatch('delUser')
            next('/')
            return
        }
    }

    if (to.name !== 'Home') {
        let isMobile = true
        if (window.innerWidth >= 1200) {
            isMobile = false
        }

        next(isMobile ? '/login' : '/')
    }
    else {
        next()
    }
}

const getInformationWithout = () => async (to, from, next) => {
    if (localStorage.getItem('access-token')) {
        const r = await http.get('/api/get-user-info', null, false)
        if (r.error) {
            next()
            return
        }

        if(r.data) {
            store.dispatch('setUser', r.data)
        }
        else {
            store.dispatch('delUser')
        }

        next()
        return
    }

    next()

    // if (to.name !== 'Home') {
    //     let isMobile = true
    //     if (window.innerWidth >= 1200) {
    //         isMobile = false
    //     }

    //     next(isMobile ? '/login' : '/')
    // }
    // else {
    //     next()
    // }
}

const getPopup = async () => {
    const r = await http.get('/api/get-popups', null, false)
    if (r.error) {
        return
    }

    store.dispatch('setPopup', r.data)
}

let logout = () => (to, from, next) => {
    store.dispatch('delUser')
    next('/')
}

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'Main' },
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/sports',
        name: 'Sports',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Sports" */ '../views/games/Sports.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportslive',
        name: 'SportsLive',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "SportsLive" */ '../views/games/SportsLive.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportscross',
        name: 'SportsCross',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "SportsCross" */ '../views/games/SportsCross.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportsspecial',
        name: 'SportsSpecial',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "SportsSpecial" */ '../views/games/SportsSpecial.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportslivekor',
        name: 'SportsLiveKor',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "SportsLiveKor" */ '../views/games/SportsLiveKor.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/minigamemenu',
        name: 'MinigameMenu',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "MinigameMenu" */ '../views/MinigameMenu.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/powerball',
        name: 'Powerball',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Powerball" */ '../views/games/Powerball.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/powerladder',
        name: 'Powerladder',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Powerladder" */ '../views/games/Powerladder.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/kenoladder',
        name: 'Kenoladder',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Kenoladder" */ '../views/games/Kenoladder.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/boglepowerball',
        name: 'BoglePowerball',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "BoglePowerball" */ '../views/games/BoglePowerball.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/bogleladder',
        name: 'Bogleladder',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Bogleladder" */ '../views/games/Bogleladder.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/googlepowerball1',
        name: 'GooglePowerball1',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "GooglePowerball1" */ '../views/games/GooglePowerball1.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/googlepowerball3',
        name: 'GooglePowerball3',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "GooglePowerball3" */ '../views/games/GooglePowerball3.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/eospowerball1',
        name: 'EosPowerball1',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "EosPowerball1" */ '../views/games/EosPowerball1.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/eospowerball3',
        name: 'EosPowerball3',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "EosPowerball3" */ '../views/games/EosPowerball3.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/eospowerball',
        name: 'EosPowerball',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "EosPowerball" */ '../views/games/EosPowerball.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/coinpowerball3',
        name: 'CoinPowerball3',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "CoinPowerball3" */ '../views/games/CoinPowerball3.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/coinpowerball',
        name: 'CoinPowerball',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "CoinPowerball" */ '../views/games/CoinPowerball.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/speedladder',
        name: 'Speedladder',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Speedladder" */ '../views/games/Speedladder.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/casino',
        name: 'Casino',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Casino" */ '../views/Casino.vue'),
        beforeEnter: getInformationWithout()
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Maintenance" */ '../views/etc/Maintenance.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        meta: { layout: 'Sub' },
        beforeEnter: logout()
    },
    //////////////////////////////////////NEW작업
    {
        path: '/login',
        name: 'Login',
        meta: { layout: 'Less' },
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    },
    {
        path: '/join',
        name: 'Join',
        meta: { layout: 'Less' },
        component: () => import(/* webpackChunkName: "Join" */ '../views/Join.vue'),
    },
    {
        path: '/charge',
        name: 'Charge',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Charge" */ '../views/Charge.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/exchange',
        name: 'Exchange',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Exchange" */ '../views/Exchange.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/chargewithdraw',
        name: 'ChargeWithdraw',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "ChargeWithdraw" */ '../views/ChargeWithdraw.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/exchangecasino',
        name: 'ExchangeCasino',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "ExchangeCasino" */ '../views/ExchangeCasino.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/point',
        name: 'Point',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Point" */ '../views/Point.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/help',
        name: 'Help',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Help" */ '../views/Help.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/help/detail/:_id/:page',
        name: 'HelpDetail',
        component: () => import(/* webpackChunkName: "HelpDetail" */ '../views/HelpDetail.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/help-write/:page',
        name: 'HelpWrite',
        component: () => import(/* webpackChunkName: "HelpWrite" */ '../views/HelpWrite.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/notice',
        name: 'Notice',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Notice" */ '../views/Notice.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/notice/detail/:_id/:page',
        name: 'NoticeDetail',
        component: () => import(/* webpackChunkName: "NoticeDetail" */ '../views/NoticeDetail.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/event',
        name: 'Event',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Event" */ '../views/Event.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/event/detail/:_id/:page',
        name: 'EventDetail',
        component: () => import(/* webpackChunkName: "EventDetail" */ '../views/EventDetail.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/faq',
        name: 'FAQ',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "FAQ" */ '../views/FAQ.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/faq/detail/:_id/:page',
        name: 'FAQDetail',
        component: () => import(/* webpackChunkName: "FAQDetail" */ '../views/FAQDetail.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/guide',
        name: 'Guide',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Guide" */ '../views/Guide.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/betlist',
        name: 'BetList',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "BetList" */ '../views/BetList.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/mypage',
        name: 'Mypage',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Mypage" */ '../views/Mypage.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/message',
        name: 'Message',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Message" */ '../views/Message.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/message/detail/:_id/:page',
        name: 'MessageDetail',
        component: () => import(/* webpackChunkName: "MessageDetail" */ '../views/MessageDetail.vue'),
        meta: { layout: 'Sub' },
        beforeEnter: getInformation()
    },
    {
        path: '/frienddetails',
        name: 'FriendDetails',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "FriendDetails" */ '../views/FriendDetails.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/attendance',
        name: 'Attendance',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Attendance" */ '../views/Attendance.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/sportsresult',
        name: 'SportsResult',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "SportsResult" */ '../views/SportsResult.vue'),
        beforeEnter: getInformation()
    },
    {
        path: '/slot',
        name: 'Slot',
        meta: { layout: 'Sub' },
        component: () => import(/* webpackChunkName: "Slot" */ '../views/Slot.vue'),
        beforeEnter: getInformation()
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    if(document.getElementsByTagName('body')[0].classList.contains('overflow-hidden')) {
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
    }

    if(to.name !== 'Logout') {
        store.dispatch('deleteBetInfo')
        getPopup()
        next()
    }
    else {
        next()
    }
})

export default router