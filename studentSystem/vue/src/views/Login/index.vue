<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">欢迎来到学生信息管理系统</h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="userName">
        <span class="svg-container">
          <i style="font-size:20px;" class="el-icon-user-solid"></i>
        </span>
        <el-input ref="userName" v-model.trim="loginForm.userName" placeholder="账号" name="userName" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <!-- 密码框 -->
      <el-form-item prop="userPassword">
        <span class="svg-container">
          <i style="font-size:20px;" class="el-icon-lock"></i>
        </span>
        <el-input :key="passwordType" ref="password" v-model.trim="loginForm.userPassword" :type="passwordType"
          placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <img style="width:25px;vertical-align: middle;" v-if="passwordType" src="./images/闭眼睛.png" alt />
          <img style="width:25px;vertical-align: middle;" v-else src="./images/眼睛_显示.png" alt />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <a style="color:red;margin-left:200px;cursor: pointer;" @click="$router.push('/forget')">忘记密码？联系管理员</a>
      </div>
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
          <slide-verify ref="slideblock" :l="30" :r="5" @success="onSuccess" @fail="onFail" :imgs="puzzleImgList" :accuracy="accuracy" :slider-text="text">
          </slide-verify>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  /* components: {
    SlideVerify,//注册组件
  }, */
  data() {
    // 自定义用户名判断
    const validateUserName = (rule, value, callback) => {
      let trimValue = value.trim()
      if (!trimValue.trim()) {
        callback(new Error("账号或密码错误"));
      } else {
        callback();
      }
    };
    // 自定义密码判断
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("账号或密码错误"));
      } else {
        callback();
      }
    };
    return {
      isShowSlide: false,// 图形验证码显示/隐藏
      isLogin: false, // 验证是否登录
      // 表单信息
      loginForm: {
        userName: "",
        userPassword: "",
        roles:''
      },
      // 表单约束
      loginRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateUserName }
        ],
        userPassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      // 控制提交按钮时否还在加载状态
      loading: false,
      // 定义密码的类型（是否显示）
      passwordType: "password",
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
  watch: {
    // 监听路由
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      // 一上来先监听一次
      immediate: true
    }
  },
  methods: {
    // 查看密码
    showPwd() {
      // 判断密码显示与隐藏来回切换
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      // 点击完后自动获取焦点
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录事件
    handleLogin() {
      // 验证表单是否通过
      this.$refs.loginForm.validate(async valid => {
        // 当表单信息正确时
        if (valid) {
          // 按钮点击进入加载中
          this.loading = true;
          try {
            // 获取用户登录信息
            let result = await this.$store.dispatch("studentAdminAccount/getUserLogin", this.loginForm);
            sessionStorage.setItem('userName', this.loginForm.userName)
            
            this.isShowSlide = true
            if (this.isLogin) {
              if (result.code === 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                // 登录成功路由跳转
                this.$router.push({ path: "/" || undefined });
                // 关闭按钮加载
                this.loading = false;
              }
            }
          } catch (error) {
            this.loading = false;
            this.$message.error(`${error.message}`)
          }
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    /* hideSlide() {
      setTimeout(() => {
        this.isShowSlide = false;
      }, 5000);
    },
    sendSmsCode() {
      setTimeout(() => {
        this.$api
          .getSendForgetSmsCode({
            mobile: this.form.account,
          })
          .then((res) => {
            this.isShowSlide = false;
            if (res.data.success) {
              this.handleLogin();
              this.$message.success("登录成功");
            } else {
              this.$message.error(res.data);
            }
          })
          .catch((err) => { });
      }, 5000);
    }, */
    close() {
      this.isShowSlide = false
      this.loading = false
    },
    // 验证成功，触发该方法
    onSuccess(times) {
      this.handleLogin()
      this.isLogin = true
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
  }
};
</script>

<style lang="less">
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.verify {
  // position: absolute;
  // top:45%;
  // left:25%;
  align-items: center;
  width: 310px;
  margin: 0 auto;
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  // min-height: 100%;
  height: 100vh;
  width: 100%;
  background-color: @bg;
  background: url('./images/x.jpg') 0 -20px no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
