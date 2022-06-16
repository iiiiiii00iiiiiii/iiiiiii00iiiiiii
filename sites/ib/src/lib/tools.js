import router from '@/router'
import store from '@/store'

import sw from 'sweetalert2'
import rfdc from 'rfdc/default'

import http from './http'

const tools = {
    // deep clone object
    deepClone(payload) {
        return rfdc(payload)
    },
    // 라우터 이동
    pushRouter: (path, needLogin, callback) => {
        let isMobile = true
        if(window.innerWidth >= 1200 ) {
            isMobile = false
        }

        if(needLogin && !store.state.isLogin) {
            if(isMobile) {
                tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '', () => {
                    router.push(path).catch(() => {
                        if(callback) {
                            callback()
                        }
                    })
                })
            }
            else {
                tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.', '', () => {
                    if(callback) {
                        callback()
                    }
                })
            }
            return
        }

        router.push(path).catch(() => {
            if(callback) {
                callback()
            }
        })
    },
    replaceRouter: (url) => {
        window.location.replace(url)
    },
    reloadRouter: () => {
        window.location.reload()
    },
    historyGo: (num) => {
        router.go(num)
    },
    openNewTab: (url) => {
        window.open(url, '_blank')
    },
    sw: (icon, title, message, type, cb) => {
        let swProp = {
            title,
            icon,
            text: message,
            html: ''
        }

        if(type === 'html') {
            delete swProp.text
            swProp.html = message
        }

        sw.fire(swProp).then(() => {
            store.commit('setLoading', false)
            if(cb) cb()
        })
    },
    setLoading: (status) => {
        if(status === false) {
            store.commit('setLoading', false)
            return
        }
        store.commit('setLoading', true)
    },
    ready: () => {
        tools.sw('warning', '점검 중', '해당 서비스는 점검 중입니다.')
    },
    left: (v, length) => {
        if(!v || !length) return ''

        if(v.length <= length) {
            return v
        }
        else {
            return v.substring(0, length)
        }
    },
    right: (v, length) => {
        if(!v || !length) return ''

        if(v.length <= length) {
            return v
        }
        else {
            return v.substring(v.length - length, v.length)
        }
    },
    cut: (v, length, symbol) => {
        if(v.length > length) {
            return `${v.substring(0, length)}${symbol}`
        }
        else {
            return v
        }
    },
    // 입금 계좌 문의
    requestChargeInformation: () => {
        return new Promise((resolve) => {
            sw.fire({
                title: '입금계좌 문의',
                text: '입금계좌 문의를 하시겠습니까?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니오',
                focusConfirm: false
            }).then(async (result) => {
                if(result.value) {
                    let rChargeInformation = await http.post('/api/charge-information')
                    if(rChargeInformation.error) {
                        resolve(false)
                        return
                    }

                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }
}

export default tools