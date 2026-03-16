<template>
  <div class="orders-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>我的订单</span>
      </div>
      <el-timeline v-if="orders.length">
        <el-timeline-item
          v-for="o in orders"
          :key="o.id"
          :timestamp="o.createdAt"
          placement="top"
        >
          <el-card>
            <div class="order-header">
              <span>订单号：{{ o.id }}</span>
              <span>金额：<span class="price">￥{{ o.totalPrice.toFixed(2) }}</span></span>
            </div>
            <div>收货信息：{{ o.address }}</div>
            <div v-if="o.remark">备注：{{ o.remark }}</div>
            <el-table :data="o.items" size="mini" border style="margin-top: 8px">
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
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="empty-tip">暂无订单记录</div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Orders',
  computed: {
    ...mapGetters(['orderList']),
    orders() {
      return this.orderList;
    }
  }
};
</script>

<style scoped>
.orders-page {
  padding: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.empty-tip {
  text-align: center;
  color: #888;
  padding: 40px 0;
}

.price {
  color: #f56c6c;
  font-weight: bold;
}
</style>

