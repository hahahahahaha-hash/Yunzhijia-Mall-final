<template>
  <div class="checkout-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>订单结算</span>
      </div>
      <el-row :gutter="20">
        <el-col :md="14" :sm="24">
          <h3>收货信息</h3>
          <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="收件人" prop="receiver">
              <el-input v-model="form.receiver" />
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input type="textarea" v-model="form.address" rows="3" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.remark" rows="2" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="10" :sm="24">
          <h3>商品清单</h3>
          <el-table :data="items" size="small" border>
            <el-table-column prop="name" label="商品" />
            <el-table-column label="数量" width="80">
              <template slot-scope="scope">x{{ scope.row.quantity }}</template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="scope">
                ￥{{ (scope.row.quantity * scope.row.price).toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
          <div class="total">
            合计金额：<span class="price">￥{{ totalPrice.toFixed(2) }}</span>
          </div>
          <el-button type="primary" :disabled="!items.length" @click="submit">提交订单</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Checkout',
  data() {
    return {
      form: {
        receiver: '',
        mobile: '',
        address: '',
        remark: ''
      },
      rules: {
        receiver: [{ required: true, message: '请输入收件人', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      }
    };
  },
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
    ...mapActions(['createOrder', 'clearCart']),
    submit() {
      if (!this.items.length) {
        this.$message.warning('购物车为空');
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.createOrder({
          address: `${this.form.receiver}，${this.form.mobile}，${this.form.address}`,
          remark: this.form.remark
        });
        this.clearCart();
        this.$message.success('下单成功');
        this.$router.replace({ name: 'Orders' });
      });
    }
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 16px;
}

h3 {
  margin-bottom: 12px;
}

.total {
  margin: 16px 0;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
}
</style>

