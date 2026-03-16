<template>
  <div class="home">
    <el-card class="filter-card">
      <el-form inline :model="filters" label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="filters.category" placeholder="全部分类" clearable @change="onFilterChange">
            <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格区间">
          <el-input-number
            v-model="filters.minPrice"
            :min="0"
            :max="9999"
            :step="5"
            placeholder="最低价"
            @change="onFilterChange"
          />
          <span class="price-sep">-</span>
          <el-input-number
            v-model="filters.maxPrice"
            :min="0"
            :max="9999"
            :step="5"
            placeholder="最高价"
            @change="onFilterChange"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="product-list">
      <el-row :gutter="20">
        <el-col v-for="p in products" :key="p.id" :xs="12" :sm="8" :md="6" :lg="6">
          <el-card class="product-card" shadow="hover">
            <img :src="p.img" :alt="p.name" class="product-img" />
            <div class="product-info">
              <div class="name">{{ p.name }}</div>
              <div class="desc">{{ p.desc }}</div>
              <div class="bottom">
                <span class="price">￥{{ p.price.toFixed(2) }}</span>
                <el-button type="primary" size="mini" @click="add(p)">加入购物车</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div v-if="!products.length" class="empty-tip">暂无符合条件的商品</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      filters: {
        category: '',
        minPrice: null,
        maxPrice: null
      }
    };
  },
  computed: {
    ...mapGetters(['filteredProducts', 'categories', 'cartItems']),
    products() {
      return this.filteredProducts;
    }
  },
  methods: {
    ...mapActions(['updateProductFilters', 'addToCart']),
    onFilterChange() {
      this.updateProductFilters(this.filters);
    },
    add(p) {
      this.addToCart(p);
      this.$message.success('已加入购物车');
    }
  }
};
</script>

<style scoped>
.home {
  padding: 16px;
}

.filter-card {
  margin-bottom: 16px;
}

.price-sep {
  margin: 0 8px;
}

.product-list {
  margin-top: 8px;
}

.product-card {
  margin-bottom: 16px;
}

.product-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  margin-top: 8px;
}

.name {
  font-weight: bold;
  margin-bottom: 4px;
}

.desc {
  font-size: 12px;
  color: #777;
  height: 32px;
  overflow: hidden;
}

.bottom {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #f56c6c;
  font-size: 16px;
}

.empty-tip {
  text-align: center;
  color: #888;
  padding: 40px 0;
}
</style>

