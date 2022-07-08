import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import http from '@/lib/http'

Vue.use(VueRouter)

const getInformation = () => async (to, from, next) => {
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

    // next()

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

const logout = () => (to, from, next) => {
    store.dispatch('delUser')
    next('/')
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/join',
        name: 'Join',
        component: () => import(/* webpackChunkName: "join" */ '../views/Join.vue'),
        meta: { layout: 'Less' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: { layout: 'Less' }
    },
    {
        path: '/mypage',
        name: 'Mypage',
        component: () => import(/* webpackChunkName: "mypage" */ '../views/Mypage.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    // money
    {
        path: '/charge',
        name: 'Charge',
        component: () => import(/* webpackChunkName: "charge" */ '../views/Charge.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/exchange',
        name: 'Exchange',
        component: () => import(/* webpackChunkName: "exchange" */ '../views/Exchange.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/point',
        name: 'Point',
        component: () => import(/* webpackChunkName: "point" */ '../views/Point.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/transfermoney',
        name: 'TransferMoney',
        component: () => import(/* webpackChunkName: "transfermoney" */ '../views/TransferMoney.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },

    // board
    {
        path: '/notice',
        name: 'Notice',
        component: () => import(/* webpackChunkName: "notice" */ '../views/Notice.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/notice/detail/:_id/:page',
        name: 'NoticeDetail',
        component: () => import(/* webpackChunkName: "noticedetail" */ '../views/NoticeDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/rules',
        name: 'Rules',
        component: () => import(/* webpackChunkName: "rules" */ '../views/Rules.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/rules/detail/:_id/:page',
        name: 'RulesDetail',
        component: () => import(/* webpackChunkName: "rulesdetail" */ '../views/RulesDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/faq',
        name: 'Faq',
        component: () => import(/* webpackChunkName: "faq" */ '../views/Faq.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/faq/detail/:_id/:page',
        name: 'FaqDetail',
        component: () => import(/* webpackChunkName: "faqdetail" */ '../views/FaqDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/event',
        name: 'Event',
        component: () => import(/* webpackChunkName: "event" */ '../views/Event.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/event/detail/:_id/:page',
        name: 'EventDetail',
        component: () => import(/* webpackChunkName: "eventdetail" */ '../views/EventDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    // help
    {
        path: '/help',
        name: 'Help',
        component: () => import(/* webpackChunkName: "help" */ '../views/Help.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/help/detail/:_id/:page',
        name: 'HelpDetail',
        component: () => import(/* webpackChunkName: "helpdetail" */ '../views/HelpDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/help-write/:page',
        name: 'HelpWrite',
        component: () => import(/* webpackChunkName: "helpwrite" */ '../views/HelpWrite.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    // message
    {
        path: '/message',
        name: 'Message',
        component: () => import(/* webpackChunkName: "message" */ '../views/Message.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/message/detail/:_id/:page',
        name: 'MessageDetail',
        component: () => import(/* webpackChunkName: "messagedetail" */ '../views/MessageDetail.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    // attendance
    {
        path: '/attendance',
        name: 'Attendance',
        component: () => import(/* webpackChunkName: "attendance" */ '../views/Attendance.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    // sports
    {
        path: '/sports',
        name: 'Sports',
        component: () => import(/* webpackChunkName: "sports" */ '../views/Sports.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportscross',
        name: 'SportsCross',
        component: () => import(/* webpackChunkName: "sportscross" */ '../views/SportsCross.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportslive',
        name: 'SportsLive',
        component: () => import(/* webpackChunkName: "sportslive" */ '../views/SportsLive.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportsspecial',
        name: 'SportsSpecial',
        component: () => import(/* webpackChunkName: "sportsspecial" */ '../views/SportsSpecial.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/sportslivekor',
        name: 'SportsLiveKor',
        component: () => import(/* webpackChunkName: "sportslivekor" */ '../views/SportsLiveKor.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/gameresults',
        name: 'GameResults',
        component: () => import(/* webpackChunkName: "GameResults" */ '../views/GameResults.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    // minigames
    {
        path: '/powerball',
        name: 'Powerball',
        component: () => import(/* webpackChunkName: "powerball" */ '../views/Powerball.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/powerladder',
        name: 'Powerladder',
        component: () => import(/* webpackChunkName: "powerladder" */ '../views/Powerladder.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/kenoladder',
        name: 'Kenoladder',
        component: () => import(/* webpackChunkName: "kenoladder" */ '../views/Kenoladder.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/bogleladder',
        name: 'Bogleladder',
        component: () => import(/* webpackChunkName: "bogleladder" */ '../views/Bogleladder.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/boglepowerball',
        name: 'BoglePowerball',
        component: () => import(/* webpackChunkName: "boglepowerball" */ '../views/BoglePowerball.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/googlepowerball1',
        name: 'GooglePowerball1',
        component: () => import(/* webpackChunkName: "googlepowerball1" */ '../views/GooglePowerball1.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/googlepowerball3',
        name: 'GooglePowerball3',
        component: () => import(/* webpackChunkName: "googlepowerball3" */ '../views/GooglePowerball3.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/coinpowerball3',
        name: 'CoinPowerball3',
        component: () => import(/* webpackChunkName: "coinpowerball3" */ '../views/CoinPowerball3.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/coinpowerball',
        name: 'CoinPowerball',
        component: () => import(/* webpackChunkName: "coinpowerball" */ '../views/CoinPowerball.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/eospowerball3',
        name: 'EosPowerball3',
        component: () => import(/* webpackChunkName: "eospowerball3" */ '../views/EosPowerball3.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    {
        path: '/eospowerball',
        name: 'EosPowerball',
        component: () => import(/* webpackChunkName: "eospowerball" */ '../views/EosPowerball.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformationWithout()
    },
    // betlist
    {
        path: '/betlist',
        name: 'BetList',
        component: () => import(/* webpackChunkName: "betlist" */ '../views/BetList.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/logout',
        name: 'Logout',
        beforeEnter: logout()
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: () => import(/* webpackChunkName: "maintenance" */ '../views/Maintenance.vue'),
        meta: { layout: 'Less' }
    },
    // casino
    {
        path: '/casino',
        name: 'Casino',
        component: () => import(/* webpackChunkName: "casino" */ '../views/Casino.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    },
    {
        path: '/friends',
        name: 'Friends',
        component: () => import(/* webpackChunkName: "friends" */ '../views/Friends.vue'),
        meta: { layout: 'Default' },
        beforeEnter: getInformation()
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
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