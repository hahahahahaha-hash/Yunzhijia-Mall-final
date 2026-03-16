const CART_KEY = 'yunzhijia_cart';

const state = {
  items: []
};

const getters = {
  cartItems(state) {
    return state.items;
  },
  cartTotalCount(state) {
    return state.items.reduce((sum, i) => sum + i.quantity, 0);
  },
  cartTotalPrice(state) {
    return state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  }
};

const mutations = {
  SET_CART(state, items) {
    state.items = items || [];
  },
  ADD_TO_CART(state, product) {
    const existing = state.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1
      });
    }
  },
  UPDATE_ITEM_QUANTITY(state, { id, quantity }) {
    const item = state.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
  },
  REMOVE_FROM_CART(state, id) {
    state.items = state.items.filter(i => i.id !== id);
  },
  CLEAR_CART(state) {
    state.items = [];
  }
};

const actions = {
  addToCart({ commit, dispatch }, product) {
    commit('ADD_TO_CART', product);
    dispatch('persistCart');
  },
  updateItemQuantity({ commit, dispatch }, payload) {
    commit('UPDATE_ITEM_QUANTITY', payload);
    dispatch('persistCart');
  },
  removeFromCart({ commit, dispatch }, id) {
    commit('REMOVE_FROM_CART', id);
    dispatch('persistCart');
  },
  clearCart({ commit, dispatch }) {
    commit('CLEAR_CART');
    dispatch('persistCart');
  },
  persistCart({ state }) {
    window.localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  },
  loadPersistCart({ commit }) {
    const raw = window.localStorage.getItem(CART_KEY);
    if (raw) {
      try {
        const items = JSON.parse(raw);
        commit('SET_CART', items);
      } catch (e) {
        commit('SET_CART', []);
      }
    }
  }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};

