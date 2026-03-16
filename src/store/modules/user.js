const USER_KEY = 'yunzhijia_user';

const state = {
  token: '',
  info: null
};

const getters = {
  isLogin(state) {
    return !!state.token;
  },
  userInfo(state) {
    return state.info || {};
  }
};

const mutations = {
  SET_USER(state, { token, info }) {
    state.token = token;
    state.info = info;
  },
  CLEAR_USER(state) {
    state.token = '';
    state.info = null;
  }
};

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        reject(new Error('请输入用户名和密码'));
        return;
      }
      const token = 'mock-token-' + Date.now();
      const info = { username };
      commit('SET_USER', { token, info });
      window.localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          token,
          info
        })
      );
      resolve();
    });
  },
  logout({ commit }) {
    commit('CLEAR_USER');
    window.localStorage.removeItem(USER_KEY);
  },
  restoreLogin({ commit }) {
    const raw = window.localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.token) {
          commit('SET_USER', parsed);
        }
      } catch (e) {
        window.localStorage.removeItem(USER_KEY);
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

