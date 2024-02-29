<template>
  <div>
    <!-- 弹出层 -->
    <el-dialog style="margin-top:-100px;" title="修改学生" :visible.sync="updateDialogFormVisible">
      <el-form :rules="rules" :model="studentInfo" ref="ruleForm">
        <el-form-item label="添加照片" :label-width="formLabelWidth">
          <!-- action="/api/test" -->
          <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/api/student/test" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img style="width:80px;height:120px;" v-if="studentInfo.studentPhoto" :src="studentInfo.studentPhoto"
              class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName" :label-width="formLabelWidth">
          <el-input size style="width:50%;" v-model.trim="studentInfo.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-radio v-model="studentInfo.sex" label="男"></el-radio>
          <el-radio v-model="studentInfo.sex" label="女"></el-radio>
        </el-form-item>
        <el-form-item label="学号" prop="studentNumber" :label-width="formLabelWidth">
          <el-input size style="width:50%;" v-model.trim="studentInfo.studentNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="studentTel" :label-width="formLabelWidth">
          <el-input size style="width:50%;" v-model.number="studentInfo.studentTel"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="region" :label-width="formLabelWidth">
          <el-cascader size="large" style="width: 50%;" :options="options" v-model="studentInfo.region" filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="系部" prop="department" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.department" @change="getDepartment" placeholder="请选择系部" filterable>
            <el-option v-for="(item, index) in optionData.department" :key="index" :value="item.value"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.grade" placeholder="请选择年级" filterable allow-create>
            <el-option label="2024级" value="2024级"></el-option>
            <el-option label="2023级" value="2023级"></el-option>
            <el-option label="2022级" value="2022级"></el-option>
            <el-option label="2021级" value="2021级"></el-option>
            <el-option label="2020级" value="2020级"></el-option>
            <el-option label="2019级" value="2019级"></el-option>
            <el-option label="2018级" value="2018级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.major" placeholder="请选择专业" filterable>
            <el-option v-for="(item, index) in myMajor" :key="index" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="className" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.className" placeholder="请选择班级" filterable allow-create>
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
            <el-option label="4班" value="4班"></el-option>
            <el-option label="5班" value="5班"></el-option>
            <el-option label="6班" value="6班"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系QQ" prop="studentQQ" :label-width="formLabelWidth">
          <el-input style="width: 30%;" v-model.trim="studentInfo.studentQQ"
            @keyup.enter.native="updateStudent"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="close()">取 消</el-button>
          <el-button type="primary" @click="updateStudent">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog style="margin-top:-100px;" title="添加学生" :visible.sync="addDialogFormVisible">
      <el-form :rules="rules" :model="studentInfo" ref="ruleForm">
        <el-form-item label="添加照片" :label-width="formLabelWidth">
          <!-- action="/api/test" -->
          <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/api/student/test" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img style="width:80px;height:120px;" v-if="studentInfo.studentPhoto" :src="studentInfo.studentPhoto"
              class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName" :label-width="formLabelWidth">
          <el-input size style="width:50%;" v-model.trim="studentInfo.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-radio v-model="studentInfo.sex" label="男"></el-radio>
          <el-radio v-model="studentInfo.sex" label="女"></el-radio>
        </el-form-item>
        <el-form-item label="学号" prop="studentNumber" :label-width="formLabelWidth" disabled="false">
          <el-input size style="width:50%;" v-model.trim="studentInfo.studentNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="studentTel" :label-width="formLabelWidth">
          <el-input size style="width:50%;" v-model.number="studentInfo.studentTel"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="region" :label-width="formLabelWidth">
          <el-cascader size="large" style="width: 50%;" :options="options" v-model="studentInfo.region" filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="系部" prop="department" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.department" @change="getDepartment" placeholder="请选择系部" filterable>
            <el-option v-for="(item, index) in optionData.department" :key="index" :value="item.value"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.grade" placeholder="请选择年级" filterable allow-create>
            <el-option label="2024级" value="2024级"></el-option>
            <el-option label="2023级" value="2023级"></el-option>
            <el-option label="2022级" value="2022级"></el-option>
            <el-option label="2021级" value="2021级"></el-option>
            <el-option label="2020级" value="2020级"></el-option>
            <el-option label="2019级" value="2019级"></el-option>
            <el-option label="2018级" value="2018级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.major" placeholder="请选择专业" filterable>
            <el-option v-for="(item, index) in myMajor" :key="index" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="className" :label-width="formLabelWidth">
          <el-select v-model="studentInfo.className" placeholder="请选择班级" filterable allow-create>
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
            <el-option label="4班" value="4班"></el-option>
            <el-option label="5班" value="5班"></el-option>
            <el-option label="6班" value="6班"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系QQ" prop="studentQQ" :label-width="formLabelWidth">
          <el-input style="width: 30%;" v-model.trim="studentInfo.studentQQ" @keyup.enter.native="addStudent"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="close()">取 消</el-button>
          <el-button type="primary" @click="addStudent">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { pcaTextArr } from 'element-china-area-data'

export default {
  name: "addOrUpdateStudent",
  props: ["getData"],
  data() {
    // 手机号验证
    let checkPhone = (rule, value, callback) => {
      if (value) {
        const reg = /^1[3456789]\d{9}$/;
        reg.test(value)
          ? callback()
          : callback(new Error("请输入正确的手机号"));
      }
    };
    // 学号验证
    let studentNumber = (rule, value, callback) => {
      if (value) {
        const reg = /^\d{11,12}$/;
        reg.test(value)
          ? callback()
          : callback(new Error("请输入正确的学号"));
      }
    };
    // QQ验证
    let studentQQ = (rule, value, callback) => {
      if (value) {
        const reg = /^\d{6,12}$/;
        reg.test(value)
          ? callback()
          : callback(new Error("长度为6-10个字符的数字"));
      }
    };
    return {
      // 控制输入宽宽度
      formLabelWidth: "120px",
      // 控制弹出层是否显示
      updateDialogFormVisible: false,
      addDialogFormVisible: false,
      // 存储单个学生信息
      studentInfo: {
        currentPage: '',
        studentPhoto: "",
        studentName: "",
        sex: "男",
        studentTel: "",
        department: "",
        className: "",
        major: "",
        studentNumber: "",
        studentQQ: "",
        grade: "",
        region: [],
      },
      /* selectData: {
        com1: "",
        com2: "",
        com3: "",
      }, */
      // 表单校验约束
      rules: {
        studentName: [{ required: true, message: "请输入学生姓名" }],
        sex: [{ required: true, message: "请选择性别" }],
        studentTel: [
          { required: true, message: "请输入手机号" },
          { validator: checkPhone, trigger: "blur" }
        ],
        department: [{ required: true, message: "请选择系部" }],
        major: [{ required: true, message: "请选择专业" }],
        grade: [{ required: true, message: "请选择年级" }],
        className: [{ required: true, message: "请选择班级" }],
        studentNumber: [
          { required: true, message: "请输入学号" },
          { validator: studentNumber, trigger: "blur" }
        ],
        studentQQ: [
          { required: true, message: "请输入学生QQ", trigger: "blur" },
          { validator: studentQQ, trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择家庭地址" },],
      },
      // 用于暂时存在照片
      imgUrl: '',
      options: pcaTextArr,
      myMajor: [],
      optionData: {
        department: [
          { value: "hgc", name: "核工程与新能技术系" },
          { value: "tm", name: "资源勘查与土木工程系" },
          { value: "zdh", name: "自动化工程系" },
          { value: "dzxx", name: "电子信息与计算机工程系" },
          { value: "jj", name: "经济系" },
          { value: "gl", name: "管理与传媒系" },
          { value: "wy", name: "外语系" },
          { value: "ys", name: "艺术系" },
          { value: "ty", name: "体育系" },
        ],
        major: {
          hgc: [
            { value: "A1", name: "新能源材料与器件" },
            { value: "A2", name: "核工程与核技术" },
            { value: "A3", name: "环境工程" },
            { value: "A4", name: "能源与动力工程" },
            { value: "A5", name: "应用物理学" },
            { value: "A6", name: "水利水电工程" },
          ],
          tm: [
            { value: "B1", name: "智能建造" },
            { value: "B2", name: "工程管理" },
            { value: "B3", name: "工程造价" },
            { value: "B4", name: "安全工程" },
            { value: "B5", name: "地质学" },
            { value: "B6", name: "城乡规划" },
            { value: "B7", name: "地理信息科学" },
          ],
          zdh: [
            { value: "C1", name: "电气工程及其自动化" },
            { value: "C2", name: "机械工程" },
            { value: "C2", name: "自动化" },
            { value: "C2", name: "机器人工程" },
            { value: "C2", name: "汽车服务工程" },
            { value: "C2", name: "智能制造工程" },
            { value: "C2", name: "机械电子工程" },
            { value: "C2", name: "智能车辆工程" },
          ],
          dzxx: [
            { value: "D1", name: "电子信息工程" },
            { value: "D2", name: "电子科学与技术" },
            { value: "D3", name: "通信工程" },
            { value: "D4", name: "人工智能" },
            { value: "D5", name: "计算机科学与技术" },
            { value: "D6", name: "软件工程" },
            { value: "D7", name: "物联网工程" },
            { value: "D8", name: "数据科学与大数据技术" },
            { value: "D9", name: "数字媒体技术" },
          ],
          jj: [
            { value: "E1", name: "会计学" },
            { value: "E2", name: "审计学" },
            { value: "E3", name: "税收学" },
            { value: "E4", name: "财务管理" },
            { value: "E5", name: "国际经济与贸易" },
            { value: "E6", name: "大数据与会计" },
          ],
          gl: [
            { value: "F1", name: "网络与新媒体" },
            { value: "F2", name: "工商管理" },
            { value: "F3", name: "电子商务" },
            { value: "F4", name: "旅游管理" },
            { value: "F5", name: "物流管理" },
          ],
          wy: [
            { value: "G1", name: "英语" },
            { value: "G2", name: "日语" },
          ],
          ys: [
            { value: "H1", name: "视觉传达设计" },
            { value: "H2", name: "环境设计" },
            { value: "H3", name: "数字媒体艺术" },
            { value: "H4", name: "产品设计" },
            { value: "H5", name: "工业设计" },
          ],
          ty: [
            { value: "I1", name: "体闲体育" },
            { value: "I2", name: "社会体育" },
          ],
        },

      },
    };
  },
  mounted() {
    // 调用控制弹出层是否弹出
    this.showDialog();
  },
  watch: {
    studentInfo(val) {
      this.studentInfo = val
    },
     deep: true
  },
  methods: {
    // 全局事件总线获取父组件数据， 此作用： 用于控制弹出层是否弹出
    showDialog() {
      this.$bus.$on("showDialog", (showDialog, row) => {
        // showDialog === true
        // 使用浅拷贝： 作用： 当页面修改的时候不会立即改变数据，
        //（因为数据是 v-model 绑定的不管你有没有修改成功都会立即修改）
        // 当然这个修改只是页面内容发生了改变，但数据库中真正的数据还是未改变状态
        // 如有传递数据则存储
        if (row) {
          this.studentInfo = { ...row };
          // 将家庭住址转回多级联查格式
          this.studentInfo.region = { ...row }.region.split('-')
          this.updateDialogFormVisible = showDialog;
        } else {
          // 显示添加弹出层
          this.addDialogFormVisible = showDialog;
        }

      });
      this.$bus.$on('currentPage', (currentPage) => {
        this.studentInfo.currentPage = currentPage
      })
    },
    // 修改学生
    updateStudent() {
      // 表单校验是否ok
      this.$refs.ruleForm.validate(async isTrue => {
        if (isTrue) {
          // 加载组件
          const loading = this.$loading({
            lock: true,
            text: "请求中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          try {
            this.studentInfo.region = this.studentInfo.region.join('-')
            // 获取添加学生是否成功
            let result = await this.$store.dispatch("studentInfo/getUpdateStudent", this.studentInfo);
            // 当为 200 成功并加提示
            if (result.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              // 只有成功的时候才会关闭 控制显示框是否展示
              this.updateDialogFormVisible = false;
              // 当成功后加载立即关闭
              loading.close();
              // 再次获取数据
              this.studentInfo.currentPage ? this.getData(this.studentInfo.currentPage) : this.getData()

            }
          } catch (error) {
            // 错误提示出现之前先关闭
            loading.close();
            // 失败时提示信息
            this.$message({
              message: this.studentInfo.studentId
                ? `${error.message}`
                : `${error.message}`,
              type: "error"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加学生
    addStudent() {
      // 表单校验是否ok
      this.$refs.ruleForm.validate(async isTrue => {
        if (isTrue) {
          // 加载组件
          const loading = this.$loading({
            lock: true,
            text: "请求中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          try {
            this.studentInfo.region = this.studentInfo.region.join('-')
            // 获取添加学生是否成功
            let result = await this.$store.dispatch("studentInfo/getAddStudent", this.studentInfo);
            // 当为 200 成功并加提示
            if (result.code === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              // 只有成功的时候才会关闭 控制显示框是否展示
              this.addDialogFormVisible = false;
              // 当成功后加载立即关闭
              loading.close();
              // 再次获取数据
              this.studentInfo.currentPage ? this.getData(this.studentInfo.currentPage) : this.getData()

            }
          } catch (error) {
            // 错误提示出现之前先关闭
            loading.close();
            // 失败时提示信息
            this.$message({
              message: this.studentInfo.studentId
                ? `${error.message}`
                : `${error.message}`,
              type: "error"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 照片上传成功事件
    handleAvatarSuccess(res, file) {
      // console.log(res,file)
      // URL.createObjectURL: 创建图片路径
      this.imgUrl = URL.createObjectURL(file.raw);
      this.studentInfo.studentPhoto = this.imgUrl
    },
    // 图片上传成功之前
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 给父组件传递方法 每次进入清楚表单校验
    clearCheck() {
      // 第一次以上来 this.$refs.ruleForm 是 undefined,
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
    },
    // 系-专业
    getDepartment(val) {
      //根据第一个控件所选项确定第二个控件下拉内容的对象数组，并使默认为第一个数组项
      // this.studentInfo.major = this.optionData.major[val][0].name; 
      this.optionData.department.forEach((item, index) => {
        if (this.optionData.department[index].value == val) {
          this.studentInfo.department = item.name
          this.myMajor = this.optionData.major[val]
        }
      })
    },
    close() {
      this.addDialogFormVisible = false
      this.updateDialogFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
// 上传图片样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #cecaca;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>