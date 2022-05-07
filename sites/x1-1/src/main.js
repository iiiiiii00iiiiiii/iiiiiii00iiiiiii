import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { BModal, BPaginationNav, BToast, BOverlay, BTooltip, BSidebar, BCarousel, BCarouselSlide } from 'bootstrap-vue'
Vue.component('b-modal', BModal)
Vue.component('b-pagination-nav', BPaginationNav)
Vue.component('b-toast', BToast)
Vue.component('b-overlay', BOverlay)
Vue.component('b-tooltip', BTooltip)
Vue.component('b-sidebar', BSidebar)
Vue.component('b-carousel', BCarousel)
Vue.component('b-carousel-slide', BCarouselSlide)

// config
import config from './lib/config'
Vue.prototype.$config = config

// tools
import tools from './lib/tools'
Vue.prototype.$tools = tools

// http
import http from './lib/http'
Vue.prototype.$http = http

// moment
import moment from 'moment'
Vue.prototype.$moment = moment

// numeral
import numeral from 'numeral'
Vue.prototype.$numeral = numeral

import sw from 'sweetalert2'
Vue.prototype.$sw = sw

// cleave
import Cleave from 'cleave.js'
Vue.prototype.$cleave = Cleave

// aos
import AOS from 'aos'
import 'aos/dist/aos.css'

// vue cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// vue scrollto
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

// socket.io
import io from 'socket.io-client'
Vue.prototype.$io = io

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlusSquare, faMinusSquare, faComments, faEnvelope, faSignInAlt,
    faRedo, faUndo, faTrashAlt, faCogs, faTimes,
    faCubes, faPlus, faBars, faShoppingCart, faBan,
    faUserPlus, faWonSign, faCoins, faPowerOff, faCaretRight,
    faExchangeAlt, faBullhorn, faList, faGift,
    faPen, faCheckSquare, faEnvelopeOpen, faUser, faCalendarAlt,
    faQuestionCircle, faAngleDoubleLeft, faAngleDoubleRight, faBell, faFutbol,
    faChevronCircleDown, faGlobe, faWindowClose, faArrowUp, faArrowDown,
    faInfo, faChevronDown, faChevronUp, faStar, faGamepad,
    faSyncAlt, faDice, faHistory, faUsers
} from '@fortawesome/free-solid-svg-icons'
import {
    faBitcoin, faPinterestP
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([
    faPlusSquare, faMinusSquare, faComments, faEnvelope, faSignInAlt,
    faRedo, faUndo, faTrashAlt, faCogs, faTimes,
    faCubes, faPlus, faBars, faShoppingCart, faBan,
    faUserPlus, faWonSign, faCoins, faPowerOff, faCaretRight,
    faExchangeAlt, faBullhorn, faList, faGift, faPinterestP,
    faPen, faCheckSquare, faEnvelopeOpen, faUser, faCalendarAlt,
    faQuestionCircle, faAngleDoubleLeft, faAngleDoubleRight, faBell, faFutbol,
    faChevronCircleDown, faGlobe, faWindowClose, faBitcoin, faArrowUp,
    faArrowDown, faInfo, faChevronUp, faChevronDown, faStar,
    faGamepad, faSyncAlt, faDice, faHistory, faUsers
])
Vue.component('font-awesome-icon', FontAwesomeIcon)


// Layout
import Default from '@/layout/Default'
import Less from '@/layout/Less'

Vue.component('Default-Layout', Default)
Vue.component('Less-Layout', Less)

new Vue({
    created() {
        AOS.init({
            once: true
        })
    },
    router,
    store,
    render: h => h(App)
}).$mount('#app')