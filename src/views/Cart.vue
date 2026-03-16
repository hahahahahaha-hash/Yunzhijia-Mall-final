<template>
  <div class="cart-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>购物车</span>
      </div>
      <el-table v-if="items.length" :data="items" border>
        <el-table-column prop="name" label="商品" />
        <el-table-column label="图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" :alt="scope.row.name" class="cart-img" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">￥{{ scope.row.price.toFixed(2) }}</template>
        </el-table-column>
        <el-table-column label="数量" width="160">
          <template slot-scope="scope">
            <el-input-number
              :min="1"
              :max="999"
              v-model="scope.row.quantity"
              @change="q => changeQty(scope.row.id, q)"
            />
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template slot-scope="scope">
            ￥{{ (scope.row.quantity * scope.row.price).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="remove(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-else class="empty-tip">购物车还是空的，快去选购吧～</div>

      <div class="cart-footer" v-if="items.length">
        <div class="left">
          合计：<span class="price">￥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="right">
          <el-button @click="clear">清空购物车</el-button>
          <el-button type="primary" @click="goCheckout">去结算</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartItems', 'cartTotalPrice']),
    items() {
      return this.cartItems;
    },
    totalPrice() {
      return this.cartTotalPrice;
    }
  },
  methods: {
    ...mapActions(['updateItemQuantity', 'removeFromCart', 'clearCart']),
    changeQty(id, quantity) {
      this.updateItemQuantity({ id, quantity });
    },
    remove(id) {
      this.removeFromCart(id);
      this.$message.success('已移除商品');
    },
    clear() {
      this.$confirm('确定清空购物车吗？', '提示', { type: 'warning' })
        .then(() => {
          this.clearCart();
          this.$message.success('已清空购物车');
        })
        .catch(() => {});
    },
    goCheckout() {
      this.$router.push({ name: 'Checkout' }).catch(() => {});
    }
  }
};
</script>

<style scoped>
.cart-page {
  padding: 16px;
}

.cart-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.empty-tip {
  text-align: center;
  padding: 40px 0;
  color: #888;
}

.cart-footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
}
</style>

