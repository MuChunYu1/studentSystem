<template>
  <div>
    <el-card>
      <div slot="header"><span style="font-size:20px;">角色管理</span></div>
      <div>
        <el-table border :data="authList" style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="roleName" label="角色名" width="200"></el-table-column>
          <el-table-column align="center" prop="roles" label="权限" width="width">
            <template slot-scope="{row}">
              <el-tag type="primary" v-for="(auth,index) in row.roles.split(',')" :key="index">{{auth}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminRole",
  data() {
    return {
      // 权限信息
      roleInfo: {},
      // 权限列表
      authList: [],
    };
  },
  mounted() {
    this.getRoleInfo()
  },
  methods: {
    // 获取角色信息
    async getRoleInfo(){
      try {
        let result = await this.$store.dispatch('roleAdmin/getFindRole');
        console.log(result,'权限');
        if(result.code === 200) this.authList = result.data
      } catch (error) {
        this.$message.error(`${error.message}`)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
}
</style>