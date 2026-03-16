<template>
  <div id="app">
    <el-container class="layout">
      <el-header class="header">
        <div class="logo">云之家在线商城</div>
        <el-input
          v-model="keyword"
          placeholder="搜索商品（名称 / 分类）"
          class="search-input"
          clearable
          @keyup.enter.native="onSearch"
        >
          <el-button slot="append" icon="el-icon-search" @click="onSearch" />
        </el-input>
        <div class="header-right">
          <el-badge :value="cartCount" class="cart-badge">
            <el-button type="text" @click="goCart">
              <i class="el-icon-shopping-cart-full"></i> 购物车
            </el-button>
          </el-badge>
          <el-dropdown v-if="isLogin" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i> {{ userInfo.username }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goOrders">我的订单</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-else type="primary" size="small" @click="goLogin">登录 / 注册</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="footer">
        © {{ year }} 云之家在线商城 - 示例项目
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      keyword: ''
    };
  },
  computed: {
    ...mapGetters(['cartTotalCount', 'isLogin', 'userInfo']),
    cartCount() {
      return this.cartTotalCount;
    },
    year() {
      return new Date().getFullYear();
    }
  },
  created() {
    this.loadPersistCart();
    this.restoreLogin();
  },
  methods: {
    ...mapActions(['searchProductsByKeyword', 'loadPersistCart', 'restoreLogin', 'logout']),
    onSearch() {
      this.searchProductsByKeyword(this.keyword);
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home', query: { keyword: this.keyword } }).catch(() => {});
      }
    },
    goCart() {
      this.$router.push({ name: 'Cart' }).catch(() => {});
    },
    goLogin() {
      this.$router.push({ name: 'Login' }).catch(() => {});
    },
    goOrders() {
      this.$router.push({ name: 'Orders' }).catch(() => {});
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #409eff, #66b1ff);
  color: #fff;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

.search-input {
  max-width: 400px;
  flex: 1;
  margin: 0 40px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-badge {
  margin-right: 8px;
}

.footer {
  text-align: center;
  font-size: 12px;
  color: #666;
}
</style>

