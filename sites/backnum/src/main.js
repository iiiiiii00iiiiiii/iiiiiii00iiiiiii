import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBtc, faPinterestP } from '@fortawesome/free-brands-svg-icons'
import {
    faWonSign, faEnvelope, faSignOutAlt,
    faComments, faPowerOff, faUser, faBars, faShoppingCart,
    faSignInAlt, faCog, faDice, faCoins, faTrashAlt,
    faCheckSquare, faBullhorn, faCalendarAlt, faCube, faStar,
    faRedo, faCogs, faTimes, faUserPlus, faFutbol,
    faAngleDoubleRight, faChevronCircleDown, faArrowDown, faArrowUp, faHistory,
    faSyncAlt, faUsers, faChevronUp, faChevronDown, faMoneyBillAlt,
    faBell, faUndo, faList, faEnvelopeOpen, faCheck,
    faExchangeAlt, faQuestionCircle, faPlusCircle, faPenNib, faAngleDown,
    faAngleUp, faAngleLeft, faUserLock, faClipboardList, faBan,
    faChevronRight, faAngleDoubleLeft, faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faPlusSquare, faMinusSquare} from '@fortawesome/free-regular-svg-icons'
library.add([
    faWonSign, faBtc, faPinterestP, faEnvelope, faSignOutAlt,
    faPlusSquare, faMinusSquare, faComments, faPowerOff, faClock,
    faUser, faBars, faShoppingCart, faSignInAlt, faCog,
    faDice, faCoins, faTrashAlt, faCheckSquare, faBullhorn,
    faCalendarAlt, faCube, faStar, faRedo, faCogs,faBan,
    faTimes, faUserPlus, faFutbol, faAngleDoubleRight, faChevronCircleDown,
    faArrowDown, faArrowUp, faHistory, faSyncAlt, faUsers,
    faChevronUp, faChevronDown, faMoneyBillAlt, faBell, faUndo,
    faList, faEnvelopeOpen, faCheck, faExchangeAlt, faQuestionCircle,
    faPlusCircle, faPenNib, faAngleDown, faAngleUp, faAngleLeft,faUserLock,
    faClipboardList, faChevronRight, faAngleDoubleLeft, faGlobe
])

Vue.component('font-awesome-icon', FontAwesomeIcon)

// axios
import axios from 'axios'
Vue.prototype.$axios = axios

// vue cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// sweetalert2
import sweetalert2 from 'sweetalert2'
Vue.prototype.$sw = sweetalert2

// numeral
import numeral from 'numeral'
Vue.prototype.$numeral = numeral

// moment
import moment from 'moment'
moment.locale('ko')
Vue.prototype.$moment = moment

// cleave
import Cleave from 'cleave.js'
Vue.prototype.$cleave = Cleave

// bootstrap
import {
    BModal, BPaginationNav, BNavbar, BNavbarNav, BNavbarBrand,
    BNavbarToggle, BNavItemDropdown, BDropdownItem, BCollapse, BTooltip,
    BNavItem, BCarousel, BCarouselSlide, BOverlay, BSidebar,
    BFormDatepicker, BToast, BPagination
} from 'bootstrap-vue'

Vue.component('b-modal', BModal)
Vue.component('b-pagination-nav', BPaginationNav)
Vue.component('b-navbar', BNavbar)
Vue.component('b-navbar-nav', BNavbarNav)
Vue.component('b-navbar-brand', BNavbarBrand)
Vue.component('b-navbar-toggle', BNavbarToggle)
Vue.component('b-nav-item-dropdown', BNavItemDropdown)
Vue.component('b-dropdown-item', BDropdownItem)
Vue.component('b-collapse', BCollapse)
Vue.component('b-tooltip', BTooltip)
Vue.component('b-nav-item', BNavItem)
Vue.component('b-carousel', BCarousel)
Vue.component('b-carousel-slide', BCarouselSlide)
Vue.component('b-overlay', BOverlay)
Vue.component('b-sidebar', BSidebar)
Vue.component('b-form-datepicker', BFormDatepicker)
Vue.component('b-toast', BToast)
Vue.component('b-pagination', BPagination)


// config
import config from './config'
Vue.prototype.$config = config

// tools
import tools from './lib/tools'
Vue.prototype.$tools = tools

// http
import http from './lib/http'
Vue.prototype.$http = http

// socket.io
import io from 'socket.io-client'
Vue.prototype.$io = io

// Vue-scrollto
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

// vue-mq
import VueMq from 'vue-mq'
Vue.use(VueMq, {
    breakpoints: { // default breakpoints - customize this
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: Infinity,
    },
    defaultBreakpoint: 'xs' // customize this for SSR
})


//.Layout
import Sub from '@/layout/Sub'
import Main from '@/layout/Main'
import Less from '@/layout/Less'


Vue.component('Sub-Layout', Sub)
Vue.component('Main-Layout', Main)
Vue.component('Less-Layout', Less)

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
