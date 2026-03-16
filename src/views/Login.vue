<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2 class="title">账号登录</h2>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.loading = true;
        this.login(this.form)
          .then(() => {
            this.$message.success('登录成功');
            const redirect = this.$route.query.redirect || '/';
            this.$router.replace(redirect);
          })
          .catch(err => {
            this.$message.error(err.message || '登录失败');
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.login-card {
  width: 360px;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}
</style>

