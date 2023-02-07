let isDark = JSON.parse(localStorage.getItem('darkmode'))

const state = {
    isDarkMode: isDark,
}

const getters = {
    isDarkModeOn(state) {
        return state.isDarkMode
    },
}

const mutations = {
    setDarkMode(state, payload) {
        localStorage.setItem('darkmode', JSON.stringify(payload))
        state.isDarkMode = payload

        payload
            ? document.documentElement.classList.add('dark-mode')
            : document.documentElement.classList.remove('dark-mode')
    },
}

const actions = {
    setDarkModeOn ({ commit }) {
        commit('setDarkMode', true)
    },
    setDarkModeOff({commit}) {
        commit('setDarkMode', false)
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
};