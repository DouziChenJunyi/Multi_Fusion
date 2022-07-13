<!-- 825night -->
<template>
  <div id="app">
    <div class="container">
      <el-container class="el_container">
        <el-header height="7.5%">
          <img src="../assets/header.png" style=" width: 100%; height: 100%;">
        </el-header>
        <el-container style="margin-top: -2%;">
          <el-aside width="36.5%" height="100%">
            <div id="aside_left" height="100%" width="100%" style="margin-top: 5%;">
              <div id="aside-left-top" height="41.2%" width="80%">
                <div id="nav-line">
                  <div id="nav_image">
                    <img src="../assets/multisrc.png" width="28%" @click="nav_multisrc">
                    <img src="../assets/multimodel.png" width="28%" @click="nav_multimodel">
                    <img src="../assets/multiview_highlight.png" width="28%" @click="nav_multiview">
                  </div>
                </div>
                <div id="nav-info">
                  <div id="info-box-head" style="margin-left: 30%; width: 100%; height: 100%;">
                    <div id="info-box-wrapper">
                      <img src="../assets/info_box_head.png" style="height: 4%; width: 4%; ">
                    </div>
                  </div>
                  <div id="info_box">
                    <div id="info-box-text-wrapper">
                      <div id="info-box-text">{{ info_box_text }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="aside-left-bottom">
                <div id="sptsrv">
                  <div id="sptsrv-head" width="80%" height="100%">
                    <div style="display: flex; margin-left: 34%; margin-top: -3%;">
                      <img id="support_survice_text" src="../assets/support_survice_text.png">
                    </div>
                  </div>
                  <div id="sptsrv_wrapper">
                    <div id="sptsrv-table">
                      <template>
                        <div class="table-wrapper">
                          <el-table
                            :row-style="getRowClass"
                            :data="activated_tableData"
                            :show-header="false"
                            :header-row-style="getHeaderRowClass"
                            :max-height="100"
                            :cell-style="sptsrv_table_getCellClass"
                          >
                            <el-table-column
                              :row-style="getRowClass"
                              label="序号"
                              prop="activated"
                              width="146%"
                            />
                            <el-table-column
                              label="序号"
                              prop="not_activated"
                              width="154%"
                            />
                          </el-table>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>

                <div id="dataspfct" style="margin-top: -2%;">
                  <div id="sptsrv-head" width="80%" height="100%">
                    <div style="display: flex; margin-left: 34%; margin-top: -3%;">
                      <img id="data_specification_text" src="../assets/data_specification_text.png">
                    </div>
                  </div>
                  <div id="sptsrv_wrapper">
                    <div id="sptsrv-table">
                      <template>
                        <div class="table-wrapper">
                          <el-table
                            :row-style="getRowClass"
                            :data="data_specification_tableData"
                            :show-header="false"
                            :header-row-style="getHeaderRowClass"
                            :max-height="100"
                            :cell-style="getCellClass"
                          >
                            <el-table-column
                              :row-style="getRowClass"
                              label="序号"
                              prop="kind"
                            />
                            <el-table-column
                              label="序号"
                              prop="method"
                              width="100%"
                            />
                            <el-table-column
                              label="序号"
                              prop="form"
                              width="100%"
                            />
                          </el-table>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-aside>

          <el-container width="100%">
            <el-aside width="39%">
              <div id="aside-right-top" />
              <div>
                <div style="display: flex; justify-content: space-around; margin-top: 2%;">
                  <div id="btn_wrapper" style="border: none;">
                    <el-button id="selectBiview_btn" type="primary" plain size="mini" @click="click_to_selectBiview">传入二路图</el-button>
                  </div>
                  <div id="btn_wrapper" style="border: none;">
                    <el-button id="selectMulview_btn" type="primary" plain size="mini" @click="click_to_selectMulview">传入多视图</el-button>
                  </div>
                </div>
                <input id="selectBiview_Input" type="file" style="display: none;" multiple @change="selectBiview($event)">
                <input id="selectMulview_Input" type="file" style="display: none;" multiple @change="selectMulview($event)">
                <div v-if="BivFusion_flag" id="Bivcarousel">
                  <template>
                    <div id="banner">
                      <!--动态将图片轮播图的容器高度设置成与图片一致-->
                      <el-carousel :height="bannerHeight2 + 'px'" :loop="true" :autoplay="true" trigger="click">
                        <!--遍历图片地址,动态生成轮播图-->
                        <el-carousel-item v-for="item in send_Bivimg_list" :key="item">
                          <img id="carousel_item_image" :src="item" alt="">
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </template>
                </div>
                <div v-if="MulvFusion_flag" id="Mulvcarousel">
                  <template>
                    <div id="banner">
                      <!--动态将图片轮播图的容器高度设置成与图片一致-->
                      <el-carousel :height="bannerHeight2 + 'px'" :loop="true" :autoplay="true" trigger="click">
                        <!--遍历图片地址,动态生成轮播图-->
                        <el-carousel-item v-for="(item, index) in send_Mulvimg_list" :key="index">
                          <img id="carousel_item_image" :src="item" alt="">
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </template>
                </div>

              </div>
              <div id="btn_layer">
                <div style="display: flex; justify-content: space-around; margin-top: 2%;">
                  <div id="btn_wrapper">
                    <el-button id="BivFusion_btn" plain size="mini" @click="BivFusion">二路图链接</el-button>
                  </div>
                  <div id="btn_wrapper">
                    <el-button id="MulvFusion_btn" plain size="mini" @click="MulvFusion">多视图融合</el-button>
                  </div>
                </div>
                <div id="" style="height: 80%;">
                  <div style="display: flex; justify-content: space-around; margin-top: -30%;">
                    <div id="popover_wrapper">
                      <div style="display: flex; justify-content: space-around;">
                        <template>
                          <el-popover
                            placement="top"
                            title=""
                            width="200"
                            trigger="click"
                            content="二路图链接指的是二路链接,多视图融合指的是多个视图融合"
                          >
                            <el-button id="Text_btn" slot="reference" type="info" round>简介显示</el-button>
                          </el-popover>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </el-aside>
            <el-main>
              <div id="main">
                <div id="result-head" width="80%" height="100%">
                  <div style="display: flex; margin-left: 34%;">
                    <img id="result_text" src="../assets/result.png">
                  </div>
                </div>
                <div id="reg_result_wrapper">
                  <div id="sptsrv-table">
                    <template>
                      <div class="table-wrapper">
                        <el-table
                          :row-style="getRowClass"
                          :data="result_tableData"
                          :show-header="false"
                          :header-row-style="getHeaderRowClass"
                          :max-height="100"
                          :cell-style="getCellClass"
                        >
                          <el-table-column
                            :row-style="getRowClass"
                            label="序号"
                            prop="id"
                          />
                          <el-table-column
                            label="序号"
                            prop="result_list"
                            width="100%"
                          />
                          <el-table-column
                            label="序号"
                            prop="result_num"
                            width="100%"
                          />
                        </el-table>
                      </div>
                    </template>
                  </div>
                </div>
                <div id="result_image">
                  <div id="result-head" width="80%" height="100%">
                    <div style="display: flex; margin-left: 32.5%; margin-top: -3%;">
                      <img id="result_img_text" src="../assets/result_img_text1.png">
                    </div>
                  </div>
                  <div id="carousel_wrapper" style="width:90%;margin: -4% 0 0 5.5%;">
                    <div style=" width:100%; height: 13.65rem;  background-color: black;">
                      <div id="" style="width: 100%; height: 100%;">
                        <div
                          id=""
                          style="width: 90%; height: 85%; color: #FFFFFF; text-align: left; font-weight: bold; font-size: 0.9rem; line-height:150%;padding: 1rem; overflow:scroll;white-space:pre-line; "
                        >
                          {{ request_result }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="margin: -8% 0 0 5%;">
                  <div id="timecnt" style="margin-top: 5%; display: flex;">
                    <div id="timecnt-text">识别时间:</div>
                    <div id="timecnt_boxlayer" style="display:inline-block; margin-top: -10.5%;">
                      <div id="number_box">{{ cost_time[4] }}</div>
                      <div id="number_box">{{ cost_time[3] }}</div>
                      <div id="number_box">{{ cost_time[2] }}</div>
                      <div id="number_box">{{ cost_time[1] }}</div>
                      <div id="number_box">{{ cost_time[0] }}</div>
                      <div id="number_box">m</div>
                      <div id="number_box">s</div>
                    </div>
                  </div>
                </div>

              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cost_time: [0, 0, 0, 0, 0],
      BivFusion_flag: false,
      MulvFusion_flag: true,
      request_form: {},
      request_result: '',
      activated_tableData: [{
        activated: '已启动',
        not_activated: '未启动'
      }, {
        activated: 'BoxGeneration',
        not_activated: 'PhysiologyExtraction'
      }, {
        activated: 'TargetSegmentation',
        not_activated: 'HealthEvaluation'
      }, {
        activated: 'Normalization',
        not_activated: 'EnvEvaluation'
      }, {
        activated: 'NoiseFilter',
        not_activated: 'EquipmentEvaluation'
      }, {
        activated: 'TargetMatching',
        not_activated: 'MICorComputation'
      }, {
        activated: 'Normalization',
        not_activated: 'CVEvaluation'
      }, {
        activated: 'Normalization',
        not_activated: 'InformationInquiry'
      }],
      data_specification_tableData: [{
        kind: '数据种类',
        method: '接入方式',
        form: '产品形式'
      }, {
        kind: '目标数据',
        method: '分队组网',
        form: '图像'
      }],
      result_tableData: [{
        id: '视图编号',
        result_list: '目标',
        result_num: '识别数量'
      }, {
        id: '暂无数据',
        result_list: '暂无数据',
        result_num: '暂无数据'
      }],
      info_box_text: '这是多视图数据融合，其功能是进行二路图链接识别及多视图融合识别。',
      send_Bivimg_list: [
        require('../assets/no_Biv1.png'),
        require('../assets/no_Biv2.png')
      ],
      send_Mulvimg_list: [
        require('../assets/no_Mulv1.png'),
        require('../assets/no_Mulv2.png'),
        require('../assets/no_Mulv3.png'),
        require('../assets/no_Mulv4.png'),
        require('../assets/no_Mulv5.png'),
        require('../assets/no_Mulv6.png'),
        require('../assets/no_Mulv7.png')
      ],
      // 图片父容器高度
      bannerHeight: 1000,
      bannerHeight2: 150,
      // 浏览器宽度
      screenWidth: 0
    }
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth
    this.setSize()
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.setSize()
    }
  },
  created() {
    this.request_form = new FormData()
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    sptsrv_table_getCellClass({ row, column, rowIndex, columnIndex }) {
      var styleJson = {}
      if (columnIndex === 0) {
        styleJson = {
          'text-align': 'center',
          'border': 'none',
          'color': 'green'
        }
      } else {
        styleJson = {
          'text-align': 'center',
          'border': 'none',
          'color': 'red'
        }
      }
      return styleJson
    },
    getCellClass({ row, column, rowIndex, columnIndex }) {
      const styleJson = {
        'text-align': 'center',
        'border': 'none'
      }

      return styleJson
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      const styleJson = {
        'color': '#FFFFFF',
        'font-weight': 'bold',
        'font-size': '0.8rem',
        'width': '80%',
        'background-color': '#030c60'
      }
      return styleJson
    },
    getHeaderRowClass() {
      const styleJson = {
        'height': '1rem'
      }
      return styleJson
    },
    nav_multisrc() {
      this.$router.replace({
        path: '/MultiSource',
        query: {
          t: +new Date()
        }
      })
    },
    nav_multimodel() {
      this.$router.replace({
        path: '/MultiModel',
        query: {
          t: +new Date()
        }
      })
    },
    nav_multiview() {
      this.$router.replace({
        path: '/MultiView',
        query: {
          t: +new Date()
        }
      })
    },
    click_to_selectMulview() {
      document.getElementById('selectMulview_Input').click()
      document.getElementById('selectMulview_btn').blur()
      document.getElementById('selectBiview_btn').style = 'background-color: #b3d8ff; color: #409EFF; background:#ecf5ff; border-color: #c2e7b0;'
    },
    click_to_selectBiview() {
      document.getElementById('selectBiview_Input').click()
      document.getElementById('selectBiview_btn').blur()
      document.getElementById('selectMulview_btn').style = 'background-color: #b3d8ff; color: #409EFF; background:#ecf5ff; border-color: #c2e7b0;'
    },
    selectBiview(e) {
      const file1 = e.target.files[0]
      const file2 = e.target.files[1]
      const that = this
      if (file1 && file2) {
        that.selectBiview_process1(e)
        that.selectBiview_process2(e)
        that.BivFusion_flag = true
        that.MulvFusion_flag = false
        document.getElementById('selectBiview_btn').style = 'background-color: #f0f9eb; color: #67C23A; border-color: #c2e7b0;'
      }
    },
    selectBiview_process1(e) {
      const that = this
      const file = e.target.files[0]
      this.request_form.append('photo_multi1', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Bivimg_list, 0, dataURL)
      }
    },
    selectBiview_process2(e) {
      const that = this
      const file = e.target.files[1]
      this.request_form.append('photo_multi2', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Bivimg_list, 1, dataURL)
      }
    },
    BivFusion() {
      if (this.request_form.has('mode')) {
        this.request_form.set('mode', 1)
      } else {
        this.request_form.append('mode', 1)
      }
      document.getElementById('BivFusion_btn').blur()
      if (this.request_form.has('photo_multi1') && this.request_form.has('photo_multi2')) {
        this.send_BivFusion_request()
      }
    },
    async send_BivFusion_request(mode) {
      try {
        const start_time = new Date()
        this.request_result = '正在进行二路图链接' + '\n' + '请耐心等待...' + '\n'
        const res = await this.$http.post('/upload_multiestimation', this.request_form)
        const end_time = new Date()
        const res_data = res.data
        const res_data_test_results = res_data['test_results']
        const object_num = res_data_test_results['object_num']
        const view1_res_num = res_data_test_results['view1_detected_result'].length
        const view1_detected_result = res_data_test_results['view1_detected_result']
        const view2_res_num = res_data_test_results['view2_detected_result'].length
        const view2_detected_result = res_data_test_results['view2_detected_result']
        this.result_tableData[1]['id'] = '视图1'
        this.result_tableData[1]['result_list'] = view1_detected_result.join(',')
        this.result_tableData[1]['result_num'] = view1_res_num
        this.result_tableData.push({ 'id': '视图2',
          'result_list': view1_detected_result.join(','), 'result_num': view1_res_num })
        const line1 = '视角个数：2\n'
        const line2 = '视角1识别目标数量：' + view1_res_num + '\n'
        const line3 = '目标id：' + view1_detected_result + '\n'
        const line4 = '视角2识别目标数量：' + view2_res_num + '\n'
        const line5 = '目标id：' + view2_detected_result + '\n'
        const line6 = '多视角目标数量预估：' + object_num + '\n'
        const request_result = line1 + line2 + line3 + line4 + line5 + line6
        this.request_result = request_result
        const total_time = end_time - start_time
        if (total_time > 99999) {
          for (var i = 0; i < 5; i++) {
            this.cost_time[i] = 9
          }
        } else {
          var temp1 = total_time
          var temp2 = 0
          var power = 1
          var j_num = 1
          if (total_time > 10000) {
            power = 10000
            j_num = 5
          } else if (total_time > 1000) {
            power = 1000
            j_num = 4
          } else if (total_time > 100) {
            power = 100
            j_num = 3
          } else if (total_time > 10) {
            power = 10
            j_num = 2
          }
          for (var j = 0; j < j_num; j++) {
            temp2 = Math.floor(temp1 / power)
            this.cost_time[j_num - j - 1] = temp2
            temp1 = temp1 % power
            power = power / 10
          }
        }
        this.loading_flag = false
      } catch (err) {
        console.log(err)
      }
    },
    selectMulview(e) {
      const file1 = e.target.files[0]
      const file2 = e.target.files[1]
      const file3 = e.target.files[2]
      const file4 = e.target.files[3]
      const file5 = e.target.files[4]
      const file6 = e.target.files[5]
      const file7 = e.target.files[6]
      const file8 = e.target.files[7]
      const that = this
      if (file1 && file2 && file3 && file4 && file5 && file6 && file7 && file8) {
        that.selectMulview_process1(e)
        that.selectMulview_process2(e)
        that.selectMulview_process3(e)
        that.selectMulview_process4(e)
        that.selectMulview_process5(e)
        that.selectMulview_process6(e)
        that.selectMulview_process7(e)
        that.selectMulview_process8(e)
        that.BivFusion_flag = false
        that.MulvFusion_flag = true
        document.getElementById('selectMulview_btn').style = 'background-color: #f0f9eb; color: #67C23A; border-color: #c2e7b0;'
      }
    },
    selectMulview_process1(e) {
      const that = this
      const file = e.target.files[0]
      this.request_form.append('photo_multi1', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 0, dataURL)
      }
    },
    selectMulview_process2(e) {
      const that = this
      const file = e.target.files[1]
      this.request_form.append('photo_multi2', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 1, dataURL)
      }
    },
    selectMulview_process3(e) {
      const that = this
      const file = e.target.files[2]
      this.request_form.append('photo_multi3', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 2, dataURL)
      }
    },
    selectMulview_process4(e) {
      const that = this
      const file = e.target.files[3]
      this.request_form.append('photo_multi4', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 3, dataURL)
      }
    },
    selectMulview_process5(e) {
      const that = this
      const file = e.target.files[4]
      this.request_form.append('photo_multi5', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 4, dataURL)
      }
    },
    selectMulview_process6(e) {
      const that = this
      const file = e.target.files[5]
      this.request_form.append('photo_multi6', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 5, dataURL)
      }
    },
    selectMulview_process7(e) {
      const that = this
      const file = e.target.files[6]
      this.request_form.append('photo_multi7', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 6, dataURL)
      }
    },
    selectMulview_process8(e) {
      const that = this
      const file = e.target.files[7]
      this.request_form.append('photo_multi8', file, file.name)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const dataURL = reader.result
        that.$set(that.send_Mulvimg_list, 7, dataURL)
      }
    },
    MulvFusion() {
      if (this.request_form.has('mode')) {
        this.request_form.set('mode', 2)
      } else {
        this.request_form.append('mode', 2)
      }
      if (this.request_form.has('num')) {
        this.request_form.set('num', 8)
      } else {
        this.request_form.append('num', 8)
      }
      document.getElementById('MulvFusion_btn').blur()
      if (this.request_form.has('photo_multi1') && this.request_form.has('photo_multi2') && this.request_form.has('photo_multi3') && this.request_form.has('photo_multi4') &&
          this.request_form.has('photo_multi5') && this.request_form.has('photo_multi6') && this.request_form.has('photo_multi7') && this.request_form.has('photo_multi8')) {
        this.send_MulvFusion_request()
      }
    },
    async send_MulvFusion_request(mode) {
      try {
        const start_time = new Date()
        this.request_result = '正在进行多视图融合' + '\n' + '请耐心等待...' + '\n'
        const res = await this.$http.post('/upload_multiestimation', this.request_form)
        const end_time = new Date()
        const res_data = res.data
        const object_num = res_data['object_num']
        const view0_res_num = res_data['view0_detected_result'].length
        const view0_detected_result = res_data['view0_detected_result']
        const view1_res_num = res_data['view1_detected_result'].length
        const view1_detected_result = res_data['view1_detected_result']
        const view2_res_num = res_data['view2_detected_result'].length
        const view2_detected_result = res_data['view2_detected_result']
        const view3_res_num = res_data['view3_detected_result'].length
        const view3_detected_result = res_data['view3_detected_result']
        const view4_res_num = res_data['view4_detected_result'].length
        const view4_detected_result = res_data['view4_detected_result']
        const view5_res_num = res_data['view5_detected_result'].length
        const view5_detected_result = res_data['view5_detected_result']
        const view6_res_num = res_data['view6_detected_result'].length
        const view6_detected_result = res_data['view6_detected_result']
        const view7_res_num = res_data['view7_detected_result'].length
        const view7_detected_result = res_data['view7_detected_result']
        this.result_tableData[1]['id'] = '视图1'
        this.result_tableData[1]['result_list'] = view0_detected_result.join(',')
        this.result_tableData[1]['result_num'] = view0_res_num
        this.result_tableData.push({ 'id': '视图2',
          'result_list': view1_detected_result.join(','), 'result_num': view1_res_num })
        this.result_tableData.push({ 'id': '视图3',
          'result_list': view2_detected_result.join(','), 'result_num': view2_res_num })
        this.result_tableData.push({ 'id': '视图4',
          'result_list': view3_detected_result.join(','), 'result_num': view3_res_num })
        this.result_tableData.push({ 'id': '视图5',
          'result_list': view4_detected_result.join(','), 'result_num': view4_res_num })
        this.result_tableData.push({ 'id': '视图3',
          'result_list': view5_detected_result.join(','), 'result_num': view5_res_num })
        this.result_tableData.push({ 'id': '视图3',
          'result_list': view6_detected_result.join(','), 'result_num': view6_res_num })
        this.result_tableData.push({ 'id': '视图3',
          'result_list': view7_detected_result.join(','), 'result_num': view7_res_num })
        const line1 = '视角个数：8\n'
        const line2 = '视角1识别目标数量：' + view0_res_num + '\n'
        const line3 = '目标id：' + view0_detected_result + '\n'
        const line4 = '视角2识别目标数量：' + view1_res_num + '\n'
        const line5 = '目标id：' + view1_detected_result + '\n'
        const line6 = '视角3识别目标数量：' + view2_res_num + '\n'
        const line7 = '目标id：' + view2_detected_result + '\n'
        const line8 = '视角4识别目标数量：' + view3_res_num + '\n'
        const line9 = '目标id：' + view3_detected_result + '\n'
        const line10 = '视角5识别目标数量：' + view4_res_num + '\n'
        const line11 = '目标id：' + view4_detected_result + '\n'
        const line12 = '视角6识别目标数量：' + view5_res_num + '\n'
        const line13 = '目标id：' + view5_detected_result + '\n'
        const line14 = '视角7识别目标数量：' + view6_res_num + '\n'
        const line15 = '目标id：' + view6_detected_result + '\n'
        const line16 = '视角8识别目标数量：' + view7_res_num + '\n'
        const line17 = '目标id：' + view7_detected_result + '\n'
        const line18 = '多视角目标数量预估：' + object_num + '\n'
        const request_result = line1 + line2 + line3 + line4 + line5 + line6 +
								line7 + line8 + line9 + line10 + line11 + line12 +
								line13 + line14 + line15 + line16 + line17 + line18
        this.request_result = request_result
        const total_time = end_time - start_time
        if (total_time > 99999) {
          for (var i = 0; i < 5; i++) {
            this.cost_time[i] = 9
          }
        } else {
          var temp1 = total_time
          var temp2 = 0
          var power = 1
          var j_num = 1
          if (total_time > 10000) {
            power = 10000
            j_num = 5
          } else if (total_time > 1000) {
            power = 1000
            j_num = 4
          } else if (total_time > 100) {
            power = 100
            j_num = 3
          } else if (total_time > 10) {
            power = 10
            j_num = 2
          }
          for (var j = 0; j < j_num; j++) {
            temp2 = Math.floor(temp1 / power)
            this.cost_time[j_num - j - 1] = temp2
            temp1 = temp1 % power
            power = power / 10
          }
        }
        this.loading_flag = false
      } catch (err) {
        console.log(err)
      }
    },
    setSize() {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = 400 / 1920 * this.screenWidth
    }
  }
}

</script>

<style  scoped>
.container{
	height: 100%;
}
#nav-info {
	height:58.8%;
	widt:100%;
	padding: 2% 0 0 0;
}
#nav_image, #info-box-wrapper {
	display: flex;
	justify-content: space-around
}
#aside-left-bottom {
	width: 93%;
	height: 100%;
	margin: 5% 0 0 3.2%	;
	background-image: url(survicebox.png);
	background-size: 100% 100%;
	padding-bottom: 6%;
}
#info-box-text {
	color: #FFFFFF;
	text-align: left;
	font-weight: bold;
	font-size: 0.8rem;
	line-height:150%;
	padding: 1rem;
}
#info-box-text-wrapper {
	display: flex;
	width: 80%;
	border: 0.1rem solid #0e6ad4;
	border-radius: 1rem;
	margin: 0 0 0 10%;
}
#sptsrv {
	height: 100%;
}
#sptsrv_wrapper{
	width: 82%;
	height: 100%;
	margin-left: 6.5%;
	margin-top: -1rem;
	padding: 1.3rem 0.5rem 0.5rem 0.5rem;
	background-image: url(tablebox.png);
	background-size: 100% 100%;
}
#reg_result_wrapper {
	width: 82%;
	height: 17.5%;
	margin-left: 6.5%;
	margin-top: -1.5rem;
	padding: 1.3rem 0.5rem 0.5rem 0.5rem;
	background-image: url(tablebox.png);
	background-size: 100% 100%;
}
#sptsrv-table{
	width: 100%;
	height: 100%;
	margin-left: -10%;
}
#aside-right-top {
	width: 100%;
	height: 54%;
	margin-top: -32%;
	margin-left: -10%;
	background-image: url(../assets/earth.png);
	background-size: 100% 100%;
}
#support_survice_text, #result_text{
	height: 45%;
	width: 45%;
	padding: 8% 0 4% 0;
}
#result_img_text {
	height: 55%;
	width: 60%;
	margin: 8% 0% 4% -5%;
}
#data_specification_text {
	height: 45%;
	width: 45%;
	padding: 8% 0 4% 0;
}
#main {
	width: 100%;
	height: 91%;
	background-image: url(survicebox.png);
	background-size: 100% 100%;
}
#number_box {
	width: 18px;
	height: 25px;
	border: 1px solid #81D5F2;
	border-radius: 2px;
	color: #FFFFFF;
	font-weight: bold;
	font-size: 0.8rem;
	line-height:150%;
	padding: 0.1rem;
	display:inline-block;
	margin-right: 0.5rem;
}
#timecnt-text {
	width: 30%;
	color: #FFFFFF;
	font-weight: bold;
	font-size: 1.1rem;
	line-height:600%;
}
.common_btn {
	color:#80c1ff;
	border: 0.05rem solid #8FC2FA;
	border-radius: 0.7rem;
	z-index: 10;
}
#MultiFusion, #BiFusion, #MultiFusion,
#btn_wrapper{
	border: 0.17rem dotted #13b7ff;
	border-radius: 15%;
	display: flex;
	height: 70%;
	padding: 0.15rem;
}
#carousel_item_image {
	width: 100%;
	height: inherit;
}
</style>
