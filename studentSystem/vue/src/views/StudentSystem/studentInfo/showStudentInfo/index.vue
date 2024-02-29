<template>
  <!-- 抽屉 查看详细学生信息 -->
  <el-drawer size="35%" style="font-size:20px;" title="学生详细信息" :visible.sync="isShowDrawer" :before-close="handleClose">
    <el-row style="margin-bottom:10px;">
      <el-col :span="6">
        <div>学生照片：</div>
      </el-col>
       <el-col :span="16">
        <div class="demo-basic--circle">
          <div class="block">
             <!-- shape="square": 设置图片的形状 -->
            <el-avatar v-if="!studentDetailInfo.studentPhoto" :size="120" :src="squareUrl"></el-avatar>
            <img v-else :src="studentDetailInfo.studentPhoto" alt="照片加载失败啦" class="studentPhoto">
          </div>
        </div>
      </el-col>  
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>学生姓名：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.studentName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>性别：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.sex}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>联系电话：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.studentTel}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>家庭住址：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.region}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>所在系部：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.department}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>年级：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.grade}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>专业：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.major}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>所在班级：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.className}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>联系QQ：</div>
      </el-col>
      <el-col :span="16">
        <div>{{studentDetailInfo.studentQQ}}</div>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name:'ShowStudentInfo',
  props:['studentDetailInfo'],
  data() {
    return {
      // 控制抽屉是否显示
      isShowDrawer: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"]
    }
  },
  mounted() {
    this.ShowDrawer()
  },
  methods: {
    // 显示抽屉学生信息
    ShowDrawer(){
      this.$bus.$on('isShowDrawer',(flag) => {
        this.isShowDrawer = flag
      })
    },
    // 关闭抽屉
    handleClose(done) {
      done();
    }
  },
};
</script>

<style lang="less" scoped>
// 头像显示样式
  .studentPhoto{
    display: inline-block;
    min-width: 120px;
    min-height: 120px;
    max-width: 300px;
    max-height: 200px;
    color:red !important;
  }
  // 抽屉样式
  .el-row .el-col:nth-child(1) {
    text-align: right;
    margin: 0 10px 30px 0;
    color: #333;
    font-size: 16px;
  }
  .el-row .el-col:nth-child(2) {
    font-size: 18px;
    font-weight: 600;
    color: rgb(215, 127, 51);
  }
</style>