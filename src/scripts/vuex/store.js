const state = {
  tabIndex: 0,
  loginState: false,
  phone: ''
}

const mutations = {
  CHANGETAB (state, currentTabindex) {
    state.tabIndex = currentTabindex;
  },
  CHANGESTA (state, currentTabindex,phone) {
    state.loginState = currentTabindex;
    state.phone = phone;
  }
}

export default new Vuex.Store({
  state,
  mutations
});
