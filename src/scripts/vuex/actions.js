export const tabChanger = function({dispatch, state}, tabIndex) {
  dispatch('CHANGETAB', tabIndex);
};
export const staChanger = function({dispatch, state}, loginState,phone) {
  dispatch('CHANGESTA', loginState,phone);
};
