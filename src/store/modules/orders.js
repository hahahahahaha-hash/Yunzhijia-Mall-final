const state = {
  list: []
};

const getters = {
  orderList(state) {
    return state.list;
  }
};

const mutations = {
  ADD_ORDER(state, order) {
    state.list.unshift(order);
  }
};

const actions = {
  createOrder({ commit, rootGetters }, { address, remark }) {
    const cartItems = rootGetters.cartItems;
    const totalPrice = rootGetters.cartTotalPrice;
    const userInfo = rootGetters.userInfo;

    const order = {
      id: 'OD' + Date.now(),
      user: userInfo.username,
      items: cartItems,
      totalPrice,
      address,
      remark,
      createdAt: new Date().toLocaleString()
    };

    commit('ADD_ORDER', order);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};

