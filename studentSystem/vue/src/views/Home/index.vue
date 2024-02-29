<template>
  <div class="home">
    <!--  头部 -->
    <el-card style="margin-bottom:10px;" class="header">
      <div slot="header">
        <!-- @tab-click="handleClick": 切换时的事件 -->
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="系部统计" name="department"></el-tab-pane>
          <el-tab-pane label="专业统计" name="major"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- v-model="value2" :picker-options="pickerOptions"-->
      <!-- 日期 -->
    </el-card>
    <el-card>
      <div class="main">
        <el-row :gutter="10">
          <el-col style="padding-right:10px;" :span="16">
            <div ref="barEcharts" class="top" style="width:100%;height:500px;"></div>
          </el-col>
          <el-col style="border-left:1px solid #DDD;" :span="8">
            <div ref="pieEcharts" class="top" style="width:100%;height:500px;"></div>
          </el-col>
        </el-row>
      </div>

    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs';
export default {
  name: "Home",
  data() {
    return {
      activeName: 'department',
      barEcharts: null,
      pieEcharts: null,
      mapEcharts: null,
      newRes: [],// 整体数据
      grade: [],// 年级
      gradeValue: [],// 年级数
      department: [],// 系
      departmentValue: [],// 系数
      major: [],// 专业
      majorValue: [],// 专业数
      className: [],// 班级
      classNameValue: [],// 班级数
      sex: [],// 性别
      sexValue: [],// 性别数
      // 饼状图数据
      objGrade: [],// 年级
      objDepartment: [],// 系
      objMajor: [],// 专业
      objClass: [],// 班级
      objSex: [],// 性别
      // 柱形图切换
      barTitleText: '系部人员统计',
      barX: [],
      barY: [],
      // 饼状图切换
      pieTitleText: '系部人员占比',
      pieSeriesData: {},
    };
  },
  mounted() {
    this.getData()
    this.changTable('department')
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
  },
  methods: {
    // 处理数据
    mergeGrade(arr) {
      if (!Array.isArray(arr)) return []
      let grade = []
      let department = []
      let major = []
      let className = []
      let sex = []
      let region = []
      // 将各数据存储到数组中，方便后续使用
      for (let i = 0; i < arr.length; i++) {
        grade.push(arr[i].grade)
        department.push(arr[i].department)
        major.push(arr[i].major)
        className.push(arr[i].className)
        sex.push(arr[i].sex)
        region.push(arr[i].region)
      }
      // 去重计数，形成一个对象 {2020级: 43}
      let objG = grade.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++
        } else {
          pre[cur] = 1
        }
        return pre
      }, {})
      // 拆分对象，形成数组，获取相应数据 
      for (let k in objG) {
        this.grade.push(k)
        this.gradeValue.push(objG[k])
      }
      // 数据重组，形成对象 {name：2020级, value: 43}
      for (let i = 0; i < this.grade.length; i++) {
        let grade = {}
        grade.name = this.grade[i]
        grade.value = this.gradeValue[i]
        this.objGrade.push(grade)
      }

      let objD = department.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++
        } else {
          pre[cur] = 1
        }
        return pre
      }, {})
      for (let k in objD) {
        this.department.push(k)
        this.departmentValue.push(objD[k])
      }
      for (let i = 0; i < this.department.length; i++) {
        let department = {}
        department.name = this.department[i]
        department.value = this.departmentValue[i]
        this.objDepartment.push(department)
      }

      let objM = major.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++
        } else {
          pre[cur] = 1
        }
        return pre
      }, {})
      for (let k in objM) {
        this.major.push(k)
        this.majorValue.push(objM[k])
      }
      for (let i = 0; i < this.major.length; i++) {
        let major = {}
        major.name = this.major[i]
        major.value = this.majorValue[i]
        this.objMajor.push(major)
      }

      let objC = className.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++
        } else {
          pre[cur] = 1
        }
        return pre
      }, {})
      for (let k in objC) {
        this.className.push(k)
        this.classNameValue.push(objC[k])
      }
      for (let i = 0; i < this.className.length; i++) {
        let className = {}
        className.name = this.className[i]
        className.value = this.classNameValue[i]
        this.objClass.push(className)
      }

      let objS = sex.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++
        } else {
          pre[cur] = 1
        }
        return pre
      }, {})
      for (let k in objS) {
        this.sex.push(k)
        this.sexValue.push(objS[k])
      }
      for (let i = 0; i < this.sex.length; i++) {
        let sex = {}
        sex.name = this.sex[i]
        sex.value = this.sexValue[i]
        this.objSex.push(sex)
      }
      /* // 整合同系 同专业
      const newRes = []
      this.newRes = newRes
      arr.forEach(item => {
        const index = newRes.findIndex(subItem => subItem.department === item.department)
        if (index > -1) {
          newRes[index].major.push(item.major)
          newRes[index].grade.push(item.grade)
          newRes[index].className.push(item.className)
        } else {
          newRes.push({
            department: item.department,
            major: [item.major],
            grade: [item.grade],
            className: [item.className],
          })
        }
      })
      console.log(newRes, 'aa')
      for (let i = 0; i < newRes.length; i++) {
        let myObj={}
        let myArr=[]
        let myValue=[]
        // 专业
        for (let j = 0; j < newRes[i].major.length; j++) {
          myObj = newRes[i].major.reduce((pre, cur) => {
            if (cur in pre) {
              pre[cur]++
            } else {
              pre[cur] = 1
            }
            return pre
          }, {})
        }
        for (let k in myObj) {
          myArr.push(k)
          myValue.push(myObj[k])
        }
        newRes[i].major = []
        for (let p = 0; p < myArr.length; p++) {
          let major = {}
          major.name = myArr[p]
          major.value = myValue[p]
          newRes[i].major.push(major)
        }
        myObj={}
        myArr=[]
        myValue=[]
        // 班级
        for (let j = 0; j < newRes[i].className.length; j++) {
          myObj = newRes[i].className.reduce((pre, cur) => {
            if (cur in pre) {
              pre[cur]++
            } else {
              pre[cur] = 1
            }
            return pre
          }, {})
        }
        for (let k in myObj) {
          myArr.push(k)
          myValue.push(myObj[k])
        }
        newRes[i].className = []
        for (let p = 0; p < myArr.length; p++) {
          let major = {}
          major.name = myArr[p]
          major.value = myValue[p]
          newRes[i].className.push(major)
        }
        myObj={}
        myArr=[]
        myValue=[]
        // 年级
        for (let j = 0; j < newRes[i].grade.length; j++) {
          myObj = newRes[i].grade.reduce((pre, cur) => {
            if (cur in pre) {
              pre[cur]++
            } else {
              pre[cur] = 1
            }
            return pre
          }, {})
        }
        for (let k in myObj) {
          myArr.push(k)
          myValue.push(myObj[k])
        }
        newRes[i].grade = []
        for (let p = 0; p < myArr.length; p++) {
          let major = {}
          major.name = myArr[p]
          major.value = myValue[p]
          newRes[i].grade.push(major)
        }
      } */
    },
    async getData() {
      let result = await this.$store.dispatch("studentInfo/getStudentInfo", this.pagination)
      this.mergeGrade(result.data)
      this.initChart()
    },
    initChart() {
      // 柱状图
      this.barEcharts = echarts.init(this.$refs.barEcharts, null, { devicePixelRatio: 2.5 })
      this.barEcharts.setOption({
        legend: {
          top: "2%",
          left: "right",

        },
        title: {
          text: this.barTitleText,
          top: 10,
          left: 20
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          padding: [8, 15],
          backgroundColor: "#05050F", // 提示框背景色
          borderColor: "rgba(3, 11, 44, 0.5)",
          textStyle: {
            color: "rgba(255, 255, 255, 1)",
          },
        },
        grid: {
          right: "4%",
          left: "19%",
          top: "15%",
          containLabel: false,
        },
        // 缩放滚动组件
        dataZoom: [
          {
            type: "inside", //滑动条
            show: true, //开启
            xAxisIndex: 0,
            startValue: 0,
            endValue: 14,
            height: 4,
            bottom: 0,
            handleSize: "300%",
            left: "93%", //滑动条位置
            start: 0, //初始化时，滑动条宽度开始标度
            end: 58, //初始化时，滑动条宽度结束标度
          },
          // 内置滑动
          {
            type: "inside", //内置滑动，随鼠标滚轮展示
            // yAxisIndex: 0,
            startValue: 0,
            endValue: 10,
            filterMode: "filter",
            height: 4,
            bottom: 10,
            handleSize: "300%",
            start: 0, //初始化时，滑动条宽度开始标度
            end: 18, //初始化时，滑动条宽度结束标度
          },
        ],
        yAxis: [{
          type: "value",
          name: "单位(人)",
          nameTextStyle: {
            fontSize: 13,
            color: '#000',
          },
          show: true,
          // 坐标值
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000',
              fontSize: 13,
            },
          },
          // 轴线
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(98, 162, 205, 0.4)",
            },
          },
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(98, 162, 205, 0.4)",
              type: "dashed",
            },
          },
        },
        ],
        xAxis: [
          //设置title 
          {
            type: "category",
            //显示
            show: true,
            //数据
            data: this.barX,
            // 轴标签
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 13,
              },
              rotate: 45, //控制柱状图X轴label是否倾斜显示
              formatter: function (params) {
                var val = '';
                if (params.length > 6) {
                  val = params.substr(0, 3) + '...'
                  return val
                } else {
                  return params
                }
              }
            },
            //轴线样式
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(98, 162, 205, 0.4)",
              },
            },
            //坐标轴刻度
            axisTick: {
              show: true,
            },
            //设置网格线
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(98, 162, 205, 0.4)",
                type: "dashed",
              },
            },
          },
        ],
        series: {
          name: '',
          type: "bar",
          stack: 'Ad',
          barWidth: "26",
          barGap: "10%", // Make series be overlap
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
              {
                offset: 0,
                color: "#0373DA",
              },
              {
                offset: 1,
                color: "#64A9E8",
              },
            ]),
            opacity: 1,
          },
          data: this.barY,
        },
      })
      // 饼图
      this.pieEcharts = echarts.init(this.$refs.pieEcharts, null, { devicePixelRatio: 2.5 });
      let option = {
        title: {
          text: this.pieTitleText,
          top: "10"
        },
        // 鼠标移上显示提示信息
        tooltip: {
          show: true,
          formatter(param) {
            var name = param.data.name
            var val = ''
            if (param.data.name.length > 6) {
              val = name.substr(0, 3) + '...' + ' (' + param.percent + '%)'
              return val
            } else {
              return name + ' (' + param.percent + '%)'
            }
          },
        },
        legend: {
          top: "85%"
        },

        // 右上角工具箱
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "人数",
            type: "pie",
            radius: [20, 100], // 半径
            center: ["50%", "50%"],
            // roseType: "area", // 类型
            itemStyle: {
              borderRadius: 8 // 圆角半径
            },
            data: this.pieSeriesData,
            // 修饰引导线样式
            labelLine: {
              // show:false,
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10
            },
            label: {
              formatter(param) {
                var name = param.data.name
                var val = ''
                if (param.data.name.length > 6) {
                  val = name.substr(0, 3) + '...' + ' (' + param.percent + '%)'
                  return val
                } else {
                  return name + ' (' + param.percent + '%)'
                }
              },
            }
          }
        ]
      }
      this.pieEcharts.setOption(option);
      this.handleChartLoop(option, this.pieEcharts)
    },
    handleChartLoop(option, myChart) {
      if (!myChart) {
        return
      }
      let changePieInterval = setInterval(selectPie, 2500)
      let currentIndex = -1 // 当前高亮图形在饼图数据中的下标
      // 取消所有高亮并高亮当前图形
      function highlightPie() {
        // 遍历饼图数据，取消所有图形的高亮效果
        for (var idx in option.series[0].data) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: idx
          })
        }
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }
      // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
      myChart.on('mouseover', (params) => {
        if (params.componentType == 'graphic') {
          return
        }
        clearInterval(changePieInterval)
        currentIndex = params.dataIndex
        highlightPie()
      })
      // 用户鼠标移出时，重新开始自动切换
      myChart.on('mouseout', () => {
        if (changePieInterval) {
          clearInterval(changePieInterval)
        }
        changePieInterval = setInterval(selectPie, 2500)
      })
      // 高亮效果切换到下一个图形
      function selectPie() {
        var dataLen = option.series[0].data.length
        currentIndex = (currentIndex + 1) % dataLen
        highlightPie()
      }
    },

    changTable(val) {
      if (val === 'major') {
        this.barTitleText = '专业人员统计'
        this.barX = this.major
        this.barY = this.majorValue
        this.pieTitleText = '专业人员占比'
        this.pieSeriesData = this.objMajor
        this.flag = false
      } else if (val === 'department') {
        this.barTitleText = '系部人员统计'
        this.barX = this.department
        this.barY = this.departmentValue
        this.pieTitleText = '系部人员占比'
        this.pieSeriesData = this.objDepartment
        this.flag = false
      }
      this.initChart()
    }
  },
  watch: {
    // 监听table栏
    activeName(val) {
      this.changTable(val)
    }, deep: true,
  }
};
</script>

<style lang="less" scoped>
.dateHandler {
  display: inline-block;
}

.date {
  cursor: pointer;
}

.home {
  width: 100%;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .tab {
      width: 1000%;
    }
  }

  .block {
    // display: flex;
    margin-top: 9px;

    span {
      position: relative;
      // top: 5px;
      z-index: 999;
      margin: 0 10px;
      font-size: 14px;
    }
  }
}
</style>