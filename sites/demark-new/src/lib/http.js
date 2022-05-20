import store from '@/store'
import axios from 'axios'
import tools from './tools'

const http = {
    get: (url, params, loading = true) => {
        return new Promise((resolve) => {
            if(loading) store.dispatch('setLoading', true)

            let r = {
                error: null,
                headers: null,
                data: null
            }

            let token = localStorage.getItem('access-token')
            let duplicate = localStorage.getItem('duplicate')

            let options = {
                headers: {
                    Pragma: 'no-cache',
                    'access-token': token,
                    'duplicate': duplicate,
                },
                params
            }

            axios.get(url, options).then((res) => {
                r.data = res.data
                r.headers = res.headers

                if(loading) store.dispatch('setLoading', false)
                resolve(r)
            }).catch((err) => {
                let resData = err.response.data

                if(err.response.status === 500) {
                    if(resData.errorTitle) tools.sw('error', resData.errorTitle, `지속적인 오류발생시 관리자에게 문의하세요.<br>${url}`, 'html')
                }
                else if(err.response.status === 400) {
                    if(resData.errorTitle) tools.sw('warning', resData.errorTitle, resData.validates[resData.firstError.field].message[resData.firstError.rule], 'html')
                }
                else if(err.response.status === 401) {
                    store.dispatch('delUser')
                    // tools.replaceRouter('/')
                }
                // else if(err.response.status === 503) {
                //     store.dispatch('delUser')
                //     tools.replaceRouter('/maintenance')
                // }

                if(loading) store.dispatch('setLoading', false)
                r.error = err
                resolve(r)
            })
        })
    },
    post: (url, formData, loading = true) => {
        return new Promise((resolve) => {
            if(loading) store.dispatch('setLoading', true)

            let r = {
                error: null,
                headers: null,
                data: null
            }

            let token = localStorage.getItem('access-token')
            let duplicate = localStorage.getItem('duplicate')

            let options = {
                headers: {
                    Pragma: 'no-cache',
                    'access-token': token,
                    'duplicate': duplicate,
                }
            }

            axios.post(url, formData, options).then((res) => {
                r.data = res.data
                r.headers = res.headers

                if(loading) store.dispatch('setLoading', false)
                resolve(r)
            }).catch((err) => {
                let resData = err.response.data

                if(err.response.status === 500) {
                    if(resData.errorTitle) tools.sw('error', resData.errorTitle, `지속적인 오류발생시 관리자에게 문의하세요.<br>${url}`, 'html')
                }
                else if(err.response.status === 400) {
                    if(resData.errorTitle) tools.sw('warning', resData.errorTitle, resData.validates[resData.firstError.field].message[resData.firstError.rule], 'html')
                }
                else if(err.response.status === 401) {
                    store.dispatch('delUser')
                    tools.replaceRouter('/')
                }
                // else if(err.response.status === 503) {
                //     store.dispatch('delUser')
                //     tools.replaceRouter('/maintenance')
                // }

                if(loading) store.dispatch('setLoading', false)
                r.error = err
                resolve(r)
            })
        })
    },
    put: (url, formData, loading = true) => {
        return new Promise((resolve) => {
            if(loading) store.dispatch('setLoading', true)

            let r = {
                error: null,
                headers: null,
                data: null
            }

            let token = localStorage.getItem('access-token')
            let duplicate = localStorage.getItem('duplicate')

            let options = {
                headers: {
                    Pragma: 'no-cache',
                    'access-token': token,
                    'duplicate': duplicate,
                }
            }

            axios.put(url, formData, options).then((res) => {
                r.data = res.data
                r.headers = res.headers

                if(loading) store.dispatch('setLoading', false)
                resolve(r)
            }).catch((err) => {
                let resData = err.response.data

                if(err.response.status === 500) {
                    if(resData.errorTitle) tools.sw('error', resData.errorTitle, `지속적인 오류발생시 관리자에게 문의하세요.<br>${url}`, 'html')
                }
                else if(err.response.status === 400) {
                    if(resData.errorTitle) tools.sw('warning', resData.errorTitle, resData.validates[resData.firstError.field].message[resData.firstError.rule], 'html')
                }
                else if(err.response.status === 401) {
                    store.dispatch('delUser')
                    tools.replaceRouter('/')
                }
                // else if(err.response.status === 503) {
                //     store.dispatch('delUser')
                //     tools.replaceRouter('/maintenance')
                // }

                if(loading) store.dispatch('setLoading', false)
                r.error = err
                resolve(r)
            })
        })
    },
    delete: (url, params, loading = true) => {
        return new Promise((resolve) => {
            if(loading) store.dispatch('setLoading', true)

            let r = {
                error: null,
                headers: null,
                data: null
            }

            let token = localStorage.getItem('access-token')
            let duplicate = localStorage.getItem('duplicate')

            let options = {
                headers: {
                    Pragma: 'no-cache',
                    'access-token': token,
                    'duplicate': duplicate,
                },
                params
            }

            axios.delete(url, options).then((res) => {
                r.data = res.data
                r.headers = res.headers

                if(loading) store.dispatch('setLoading', false)
                resolve(r)
            }).catch((err) => {
                let resData = err.response.data

                if(err.response.status === 500) {
                    if(resData.errorTitle) tools.sw('error', resData.errorTitle, `지속적인 오류발생시 관리자에게 문의하세요.<br>${url}`, 'html')
                }
                else if(err.response.status === 400) {
                    if(resData.errorTitle) tools.sw('warning', resData.errorTitle, resData.validates[resData.firstError.field].message[resData.firstError.rule], 'html')
                }
                else if(err.response.status === 401) {
                    store.dispatch('delUser')
                    tools.replaceRouter('/')
                }
                // else if(err.response.status === 503) {
                //     store.dispatch('delUser')
                //     tools.replaceRouter('/maintenance')
                // }

                if(loading) store.dispatch('setLoading', false)
                r.error = err
            })
        })
    }
}

export default http