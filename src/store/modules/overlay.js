const documentHtml = document.documentElement
const documentBody = document.body
const isTouch = 'ontouchstart' in documentHtml

const state = {
    isOverlay: false,
    overflowHidden: false,
    overlayType: ''
}

const getters = {
    isOverflowHidden (state) {
        return state.overflowHidden
    }
}

const mutations = {
    setOverflowHidden (state, payload) {
        state.overflowHidden = payload
    },
    setIsOverlay (state, payload) {
        state.isOverlay = payload
    },
    setOverlayType (state, payload) {
        state.overlayType = payload
    }
}

const actions = {
    openOverlay ({ commit, dispatch }, payload) {
        dispatch('addBodyOverflow', { scrollBar: payload?.scrollBar })
        commit('setIsOverlay', true)
        commit('setOverlayType', payload?.type || '')
    },
    closeOverlay ({ commit, dispatch }) {
        dispatch('removeBodyOverflow')
        commit('setIsOverlay', false)
        commit('setOverlayType', '')
    },
    toggleBodyOverflow ({ state, dispatch }, payload) {
        if (state.overflowHidden) {
            dispatch('removeBodyOverflow')

            return
        }

        dispatch('addBodyOverflow', payload)
    },
    addBodyOverflow ({ commit }, payload) {
        if (isTouch) {
            /*const previousScrollY = window.scrollY
            documentBody.classList.add('overflow--hidden-fixed')
            documentBody.style.marginTop = `-${ previousScrollY }px`*/
        } else {
            documentBody.classList.add('overflow--hidden')
        }
        if (payload?.scrollBar) {
            documentBody.classList.add('overflow--hidden-scrollBar')
        }
        commit('setOverflowHidden', true)
    },
    removeBodyOverflow ({ commit, rootGetters }) {
        if (rootGetters['hasOpenedModal']) {
            return
        }

        if (isTouch) {
            const bodyMarginTop = parseInt(documentBody.style.marginTop, 10)

            documentBody.classList.remove('overflow--hidden-fixed', 'overflow--hidden-scrollBar')

            documentBody.style.marginTop = ''

            if (bodyMarginTop || bodyMarginTop === 0) {
                window.scrollTo(0, -bodyMarginTop)
            }
        } else {
            documentBody.classList.remove('overflow--hidden', 'overflow--hidden-scrollBar')
        }

        commit('setOverflowHidden', false)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};