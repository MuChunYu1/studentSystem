<template>
  <div class="forget-container">
    <el-form ref="formName" :model="messageInfo" :rules="forgetRules" class="forget-form" label-width="80px">
      <div class="title-container">
        <h3 class="title">问题反馈</h3>
      </div>

      <!-- 账号 -->
      <el-form-item prop="userId" label="账号" required>
        <el-input ref="userId" v-model="messageInfo.userId" placeholder="请输入账号" name="userId"
          type="text" />
      </el-form-item>
      <!-- 姓名 -->
      <el-form-item prop="userName" label="姓名" required>
        <el-input ref="userName" v-model="messageInfo.userName" placeholder="姓名" name="userName" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <!-- 反馈问题 -->
      <el-form-item prop="issue" label="问题类型">
        <el-select v-model="messageInfo.issue" placeholder="请选择问题" style="width: 100%;" disabled>
          <el-option label="忘记密码" value="忘记密码"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情描述" prop="detail">
        <el-input type="textarea" v-model="messageInfo.detail" disabled :style="{ color: 'black' }"></el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary"
        style="width:35%;margin-bottom:30px; margin-left:90px; font-weight:600;" @click="addMessage()">提交</el-button>
      <el-button
        style="width:35%;margin-bottom:30px; margin-left:30px; font-weight:600;" @click="goToLogin()">返回</el-button>
    </el-form>

    <!-- 图形验证码 -->
    <div v-show="isShowSlide" style="background-color: rgba(0, 0, 0, .2); position: absolute;
    height: 100vh; width: 100%;top:0;left: 0;">
      <div style="background-color: white; width: 360px; padding: 5px 10px; margin: 38vh auto;">
        <div style="height: 40px;  border-bottom: 1px silver solid; margin-bottom: 3px;">
          <span style="line-height: 40px;">请完成安全验证</span> <span style="float: right; line-height: 40px; cursor: pointer;"
            @click="close">X</span>
        </div>
        <div class="verify">
          <slide-verify ref="slideblock" :l="30" :r="5" @success="onSuccess" @fail="onFail" :imgs="puzzleImgList"
            :accuracy="accuracy" :slider-text="text">
          </slide-verify>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",
  data() {
    return {
      // 表单信息
      messageInfo: {
        userId: '',
        userName: '',
        issue: '忘记密码',
        detail: '忘记密码'
      },
      // 表单约束
      forgetRules: {
        userName: [
          { required: true, message: '请输入本人账号', trigger: "blur" }
        ],
      },
      // 控制提交按钮时否还在加载状态
      loading: false,
      isShowSlide: false,// 图形验证码显示/隐藏
      isLogin: false, // 验证是否登录
      redirect: undefined,
      puzzleImgList: [
        require("@/assets/verify/1.jpg"),
        require("@/assets/verify/2.jpg"),
        require("@/assets/verify/3.jpg"),
        require("@/assets/verify/4.jpg"),
        require("@/assets/verify/5.jpg"),
        require("@/assets/verify/6.jpg"),
        require("@/assets/verify/7.jpg"),
        require("@/assets/verify/8.jpg"),
      ],
      text: "向右滑动完成验证",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
    };
  },
  methods: {
    // 添加信息
    async addMessage() {
      this.isShowSlide = true
      if (this.isLogin) {
        try {
          // 获取添加账号信息
          let result = await this.$store.dispatch('message/getAddMessage', this.messageInfo);
          if (result.code === 200) {
            // 添加成功后 关闭弹出层
            this.$message.success('提交成功')
            this.loading = false;
            this.$router.push({ path: "/login" || undefined });
          }
        } catch (error) {
          this.$message.error(`${error.message}`)
        }
      }
    },
    goToLogin(){
      this.$router.push({ path: "/login" || undefined });
    },
    close() {
      this.isShowSlide = false
      this.loading = false
    },
    // 验证成功，触发该方法
    onSuccess(times) {
      this.isLogin = true
      this.addMessage()
      /* let ms = (times / 1000).toFixed(1);
      this.$message({
        message: "验证成功, 耗时 " + ms + "s",
        type: 'success'
      }) */
    },
    onFail() {
      this.isLogin = false
      this.$message({
        message: "验证失败，请重新尝试",
        type: 'error'
      })
    },
    // 用户注册
    /* addMEssage() {
      this.$refs.formName.validate(async isTrue => {
        if (isTrue) {
          try {
            let result = await this.$store.dispatch("studentAdminAccount/getUserForget", this.messageInfo);
            if (result.code === 200) {
              this.$message({
                message: "反馈成功",
                type: "success"
              })
              this.$router.push("/login");
            }
          } catch (error) {
            this.$message.error(`${error.message}`);
          }
        } else {
          return false
        }
      })
    } */
  }
};
</script>
<style lang="less">
.forget-container {
.el-form-item__label {
  color: rgb(255, 255, 255);
}

.el-form-item__content {
  display: flow-root;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}

.el-input.is-disabled .el-input__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #151618;
  cursor: not-allowed;
}

.el-textarea.is-disabled .el-textarea__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #000000;
  cursor: not-allowed;
}
}
</style>
<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;


.forget-container {
  // min-height: 100%;
  height: 100vh;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .forget-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

}
</style>
