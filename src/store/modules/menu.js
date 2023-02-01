const state = {
    menuOpened: false,
}

const getters = {
    isMenuOpened(state) {
        return state.menuOpened
    },
}

const mutations = {
    setMenuOpened(state, payload) {
        state.menuOpened = payload
    },
}

const actions = {
    toggleMenu({state, commit}, payload) {
        commit('setMenuOpened', payload?.toggleValue ?? !state.menuOpened)
    },
    openMenu ({ commit }) {
        commit('setMenuOpened', true)
    },
    closeMenu({commit}) {
        commit('setMenuOpened', false)
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
};