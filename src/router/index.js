import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Cart from '@/views/Cart.vue';
import Checkout from '@/views/Checkout.vue';
import Orders from '@/views/Orders.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
    { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

