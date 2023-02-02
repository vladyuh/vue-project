export const MOBILE = 600
export const TABLET = 960
export const LAPTOP = 1152
export const DESKTOP = 1280

function changeSizeFlagMethod(state) {
    if (window.innerWidth <= state.bMobile) {
        state.isMobile = true
    }

    if (window.innerWidth <= state.bTablet) {
        state.isTablet = true
    }

    if (window.innerWidth <= state.bLaptop) {
        state.isLaptop = true
    }

    if (window.innerWidth > state.bLaptop) {
        state.isDesktop = true
    }
}

const state = {
    bMobile: MOBILE,
    bTablet: TABLET,
    bLaptop: LAPTOP,
    bDesktop: DESKTOP,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
};

const getters = {
    isMobile(state) {
        return state.isMobile
    },
    isTablet(state) {
        return state.isTablet
    },
    isLaptop(state) {
        return state.isLaptop
    },
    isDesktop(state) {
        return state.isDesktop
    },
};

const mutations = {
    changeSizeFlag (state) {
        changeSizeFlagMethod(state)
    },
    resetSizeFlags (state) {
        state.isMobile = false
        state.isTablet = false
        state.isLaptop = false
        state.isDesktop = false
    }
};

const actions = {
    changeSizeFlag ({ commit }) {
        commit('resetSizeFlags')
        commit('changeSizeFlag')
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};