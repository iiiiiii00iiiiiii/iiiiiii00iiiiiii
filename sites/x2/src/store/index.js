import Vue from 'vue'
import Vuex from 'vuex'
import tools from '../lib/tools'
import http from '../lib/http'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 버튼 상태
        loading: false,
        // 현재 라우터
        router: '',
        // 모바일
        isMobile: false,
        // 회원
        user: {
            _id: null,
            id: null,
            nick: null,
            bankOwner: null,
            grade: 1,
            status: 1,
            recommendCount: 0,
            recommendLevel: 0,
            money: 0,
            point: 0,
            isAgent: false
        },
        // 로그인 상태
        isLogin: false,
        // 팝업
        popup: [],
        // 쪽지 개수
        messageCount: 0,
        // 고객센터 개수
        helpCount: 0,
        // 고객센터 리스트 replace
        helpReplace: false,
        // 배팅 카트
        betCart: [],
        // 배팅 한도 금액
        betInfo: {
            min: 0,
            max: 0,
            benefit: 0
        },
        // 미니게임 배팅 내역
        minigameBetListRecent: [],
        // 사이드바 보이기 여부
        showSideBars: false,
        // 한줄공지
        shortNotice: ''
    },
    getters: {
        // 버튼 상태
        loading: state => {
            return state.loading
        },
        // 현재 라우터
        router: state => {
            return state.router
        },
        // 모바일
        isMobile: state => {
            return state.isMobile
        },
        // 회원
        user: state => {
            return state.user
        },
        // 로그인 상태
        isLogin: state => {
            return state.isLogin
        },
        // 팝업
        popup: state => {
            return state.popup
        },
        // 쪽지 개수
        messageCount: state => {
            return state.messageCount
        },
        // 고객센터 개수
        helpCount: state => {
            return state.helpCount
        },
        // 고객센터 리스트 replace
        helpReplace: state => {
            return state.helpReplace
        },
        // 배팅 카트
        betCart: state => {
            return state.betCart
        },
        // 배팅 한도 금액
        betInfo: state => {
            return state.betInfo
        },
        // 미니게임 배팅 내역
        minigameBetListRecent: state => {
            return state.minigameBetListRecent
        },
        // 사이드바 보이기 여부
        showSideBars: state => {
            return state.showSideBars
        },
        // 한줄공지
        shortNotice: state => {
            return state.shortNotice
        }
    },
    mutations: {
        // 버튼 상태
        setLoading: (state, payload) => {
            state.loading = payload
        },
        // 현재 라우터
        setRouter: (state, payload) => {
            state.router = payload
        },
        // 모바일
        setIsMobile: (state, payload) => {
            state.isMobile = payload
        },
        // 회원 로그인
        setUser(state, user) {
            state.isLogin = true
            state.user = tools.deepClone(user)
        },
        // 회원 로그아웃
        delUser: (state) => {
            state.isLogin = false
            state.user = tools.deepClone({
                _id: null,
                id: null,
                nick: null,
                bankOwner: null,
                grade: 1,
                status: 1,
                recommendCount: 0,
                recommendLevel: 0,
                money: 0,
                point: 0,
                isAgent: false
            })
        },
        // 로그인 상태
        setIsLogin: (state, payload) => {
            state.isLogin = payload
        },
        // 팝업
        setPopup: (state, payload) => {
            state.popup = tools.deepClone(payload)
        },
        // 쪽지 개수
        setMessageCount: (state, payload) => {
            state.messageCount = payload
        },
        // 고객센터 개수
        setHelpCount: (state, payload) => {
            state.helpCount = payload
        },
        // 고객센터 리스트 replace
        setHelpReplace: (state, payload) => {
            state.helpReplace = payload
        },
        // 배팅 카트
        setBetCart: (state, payload) => {
            state.betCart.push(payload)
        },
        // 배팅 카트 변경
        changeBetCart: (state, payload) => {
            try {
                state.betCart.splice(payload.index, 1)
                state.betCart.splice(payload.index, 0, payload.bet)
            } catch (error) {
                return
            }
        },
        // 배팅 카트 삭제
        deleteBetCart: (state, payload) => {
            state.betCart.splice(payload, 1)
        },
        // 배팅 카트 전체 삭제
        deleteBetCartAll: (state) => {
            state.betCart = []
        },
        // 배팅 한도 금액
        setBetInfo: (state, payload) => {
            state.betInfo = tools.deepClone(payload)
        },
        // 배팅 한도 금액 삭제
        deleteBetInfo: (state) => {
            state.betInfo = tools.deepClone({
                min: 0,
                max: 0,
                benefit: 0
            })
        },
        // 미니게임 배팅 내역
        getMinigameBetListRecent: (state, payload) => {
            state.minigameBetListRecent = payload
        },
        // 미니게임 배팅 카트 설정
        setCartMinigames: (state, payload) => {
            state.betCart = []
            state.betCart.push(payload)
        },
        // 사이드바 보이기 여부
        setShowSideBars: (state, payload) => {
            state.showSideBars = payload
        },
        // 한줄공지
        setShortNotice: (state, payload) => {
            state.shortNotice = payload
        }
    },
    actions: {
        // 버튼 상태
        setLoading: ({ commit }, payload) => {
            commit('setLoading', payload)
        },
        // 현재 라우터
        setRouter: ({ commit }, payload) => {
            commit('setRouter', payload)
        },
        // 모바일
        setIsMobile: ({ commit }, payload) => {
            commit('setIsMobile', payload)
        },
        // 회원 로그인
        setUser: ({ commit }, payload) => {
            commit('setUser', payload)
        },
        // 회원 로그아웃
        delUser: ({ commit }) => {
            localStorage.removeItem('access-token')
            localStorage.removeItem('duplicate')
            commit('delUser')
        },
        // 로그인 상태
        setIsLogin: ({ commit }, payload) => {
            commit('setIsLogin', payload)
        },
        // 팝업
        setPopup: ({ commit }, payload) => {
            commit('setPopup', payload)
        },
        // 쪽지 개수
        setMessageCount: ({ commit }, payload) => {
            commit('setMessageCount', payload)
        },
        // 고객센터 개수
        setHelpCount: ({ commit }, payload) => {
            commit('setHelpCount', payload)
        },
        // 고객센터 리스트 replace
        setHelpReplace: ({ commit }, payload) => {
            commit('setHelpReplace', payload)
        },
        // 배팅 카트
        setBetCart: ({ commit }, payload) => {
            commit('setBetCart', payload)
        },
        // 배팅 카트 변경
        changeBetCart: ({ commit }, payload) => {
            commit('changeBetCart', payload)
        },
        // 배팅 카트 삭제
        deleteBetCart: ({ commit }, payload) => {
            commit('deleteBetCart', payload)
        },
        // 배팅 카트 전체 삭제
        deleteBetCartAll: ({ commit }, payload) => {
            commit('deleteBetCartAll', payload)
        },
        // 배팅 한도 금액
        setBetInfo: ({ commit }, payload) => {
            commit('setBetInfo', payload)
        },
        // 배팅 한도 금액 삭제
        deleteBetInfo: ({ commit }) => {
            commit('deleteBetInfo')
        },
        // 미니게임 배팅 내역
        getMinigameBetListRecent: async ({ commit }) => {
            const r = await http.get('/api/get-minigame-bet-list-recent')
            if(r.error) return

            commit('getMinigameBetListRecent', r.data)
        },
        // 미니게임 배팅 카트 설정
        setCartMinigames: ({ commit }, payload) => {
            commit('setCartMinigames', payload)
        },
        // 사이드바 보이기 여부
        setShowSideBars: ({ commit }, payload) => {
            commit('setShowSideBars', payload)
        },
        // 회원정보 가져오기
        getInformation: async ({ commit }) => {
            const r = await http.get('/api/get-user-info', null, false)
            if(r.error) return

            commit('setUser', r.data)
        },
        // 한줄공지
        setShortNotice: ({ commit }, payload) => {
            commit('setShortNotice', payload)
        }
    },
    modules: {
    }
})