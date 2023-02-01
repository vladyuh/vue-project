import { isOnlyLangChange } from '@/store/helpers/routes'

export const startHistoryLength = 0
export const historyLength = 0

const state = {
    startHistoryLength,
    historyLength
};

const getters = {
    getStartHistoryLength (state) {
        return state.startHistoryLength
    },
    getHistoryLength (state) {
        return state.historyLength
    }
};

const mutations = {
    setStartHistoryLength (state, payload) {
        state.startHistoryLength = payload
    },
    setHistoryLength (state, payload) {
        state.historyLength = state.historyLength + payload
    }
};

const actions = {
    setHistoryStartValues ({ commit }) {
        const historyLength = window?.history?.length || 0

        commit('setStartHistoryLength', historyLength)
        commit('setHistoryLength', historyLength)
    },
    setHistoryLength ({ commit }, payload) {
        commit('setHistoryLength', payload)
    },
    setHistoryLengthIfRouteChange ({ commit }, payload) {
        if (!payload.oldRoute.matched.length || isOnlyLangChange(payload.newRoute, payload.oldRoute)) {
            return
        }

        commit('setHistoryLength', payload.value)
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};