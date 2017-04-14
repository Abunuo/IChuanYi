const state = {
  tabIndex: 0,
  // loginState: false,
  // phone: ''
  loginState: true,
  phone: '15712880306'
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
