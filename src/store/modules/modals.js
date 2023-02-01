const state = {
    opened: []
}

const getters = {
    hasOpenedModal (state, getters){
        return getters.getOpenedModals.length > 0
    },
    currentModal (state, getters) {
        if (!getters.hasOpenedModal) {
            return null
        }

        const openedModals = getters.getOpenedModals

        return openedModals.slice(-1).pop()
    },
    getOpenedModals (state) {
        return state.opened ?? []
    },
    getOpenedModalName (state, getters) {
        return getters.hasOpenedModal ? getters.getOpenedModals[0].name : ''
    },
    getModalByName (state, getters) {
        return function (name) {

            const modal = getters.getOpenedModals.find(function (item) {
                return item.name === name;
            });

            if (modal) {
                return modal;
            }

            return getters.getOpenedModals.slice(-1).pop();
        };
    }
}

const mutations = {
    setOpenedModal (state, payload) {
        state.opened = payload
    }
}

const actions = {
    openModal ({ commit, dispatch, getters }, { name, props, component, isShrink = false, replace = true }) {
        const openedModals = getters.getOpenedModals
        let opened

        if (replace) {
            opened = [...openedModals]
            opened.pop()
            opened.push({ name, props, component, isShrink })
        } else {
            const filtered = openedModals.filter((item) => item.name !== name)

            opened = [
                ...filtered,
                { name, props, component, isShrink }
            ]
        }

        commit('setOpenedModal', opened)
        dispatch('addBodyOverflow', {}, { root: true })
    },
    closeModal ({ commit, dispatch, getters }, payload) {
        if (!getters.hasOpenedModal) {
            return
        }

        const modalName = payload?.name ?? ''

        const modal = getters.getModalByName(modalName)

        if (modal.isShrink && !modalName) {
            return
        }

        let changedOpenedModalsArray = [...getters.getOpenedModals]

        if (modal.name) {
            changedOpenedModalsArray = changedOpenedModalsArray.filter(item => item.name !== modal.name)
        } else {
            changedOpenedModalsArray.pop()
        }

        commit('setOpenedModal', changedOpenedModalsArray)

        if (!getters.hasOpenedModal || getters.currentModal?.isShrink) {
            dispatch('removeBodyOverflow', {}, { root: true })
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};