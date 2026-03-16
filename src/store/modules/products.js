const state = {
  all: [
    {
      id: 1,
      name: '柔软抽纸家庭装',
      category: '日用品',
      price: 19.9,
      stock: 100,
      img: require('@/assets/product-tissue.png'),
      desc: '三层加厚，柔软亲肤，家庭装 24 包。'
    },
    {
      id: 2,
      name: '厨房纸巾吸油纸',
      category: '厨房',
      price: 15.9,
      stock: 80,
      img: require('@/assets/product-kitchen-towel.png'),
      desc: '强力吸油，厨房清洁好帮手。'
    },
    {
      id: 3,
      name: '洗衣液家庭装 3kg',
      category: '清洁',
      price: 39.9,
      stock: 60,
      img: require('@/assets/product-detergent.png'),
      desc: '低泡易漂洗，护色护形。'
    },
    {
      id: 4,
      name: '保温杯 500ml',
      category: '生活',
      price: 89.0,
      stock: 50,
      img: require('@/assets/product-thermos.png'),
      desc: '长效保温，便携设计。'
    }
  ],
  keyword: '',
  categoryFilter: '',
  minPrice: null,
  maxPrice: null
};

const getters = {
  filteredProducts(state) {
    return state.all.filter(p => {
      const matchKeyword =
        !state.keyword ||
        p.name.toLowerCase().includes(state.keyword.toLowerCase()) ||
        p.category.toLowerCase().includes(state.keyword.toLowerCase());
      const matchCategory = !state.categoryFilter || p.category === state.categoryFilter;
      const matchMin = state.minPrice == null || p.price >= state.minPrice;
      const matchMax = state.maxPrice == null || p.price <= state.maxPrice;
      return matchKeyword && matchCategory && matchMin && matchMax;
    });
  },
  categories(state) {
    return [...new Set(state.all.map(p => p.category))];
  }
};

const mutations = {
  SET_KEYWORD(state, keyword) {
    state.keyword = keyword || '';
  },
  SET_FILTERS(state, { category, minPrice, maxPrice }) {
    state.categoryFilter = category || '';
    state.minPrice = minPrice != null ? minPrice : null;
    state.maxPrice = maxPrice != null ? maxPrice : null;
  }
};

const actions = {
  searchProductsByKeyword({ commit }, keyword) {
    commit('SET_KEYWORD', keyword);
  },
  updateProductFilters({ commit }, filters) {
    commit('SET_FILTERS', filters);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};

