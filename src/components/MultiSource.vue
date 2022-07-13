<!-- 请求成功的版本 -->
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
                    <img src="../assets/multisrc_highlight.png" width="28%" @click="nav_multisrc">
                    <img src="../assets/multimodel.png" width="28%" @click="nav_multimodel">
                    <img src="../assets/multiview.png" width="28%" @click="nav_multiview">
                  </div>
                </div>
                <div id="nav-info">
                  <div id="info-box-head" style="margin-left: -30%; width: 100%; height: 100%;">
                    <div id="info-box-wrapper">
                      <img src="../assets/info_box_head.png" style="height: 4%; width: 4%;">
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
                              prop="activated"
                              width="146%"
                            />
                            <el-table-column
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
                              prop="kind"
                              width="146%"
                            />
                            <el-table-column
                              prop="form"
                              width="154%"
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
                <div style="display: none;">
                  <form action="" method="post" enctype="multipart/form-data">
                    <input id="select_VIS_Input" type="file" accept="image/jpeg,image/x-png,image/gif" size="30" name="photo_UAV" @change="selectVIS($event)">
                    <input id="select_IR_Input" type="file" size="30" name="photo_InfraRed" @change="selectIR($event)">
                    <input id="mode_Input" type="text" class="txt_input" name="mode" style="margin-top:15px;">
                  </form>
                </div>

                <div style="display: flex; justify-content: space-around; margin-top: 2%;">
                  <div id="btn_wrapper" style="border: none;">
                    <el-button id="select_VIS_btn" type="primary" plain size="mini" @click="click_to_selectVIS">传入可见光图</el-button>
                  </div>
                  <div id="btn_wrapper" style="border: none;">
                    <el-button id="select_IR_btn" type="primary" plain size="mini" @click="click_to_selectIR"> 传入红外线图</el-button>
                  </div>
                </div>
                <div id="carousel">
                  <template>
                    <div id="banner">
                      <el-carousel :height="bannerHeight2 + 'px'" trigger="click" :autoplay="false" :initial-index="send_carousel_initial_index">
                        <el-carousel-item v-for="item in send_img_list" :key="item">
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
                    <el-button id="VIS_btn" plain size="mini" @click="VISRegc">可见光识别</el-button>
                  </div>
                  <div id="btn_wrapper">
                    <el-button id="IR_btn" plain size="mini" @click="IRRegc">红外识别</el-button>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-around; margin-top: 2%;">
                  <div id="btn_wrapper">
                    <el-button id="Fusion_btn" plain size="mini" @click="FusionRegc">融合识别</el-button>
                  </div>
                </div>
                <div v-if="loading_flag" style=" width:100%; height: 2rem;  background-color: black;">
                  <div id="" style="width: 100%; height: 100%;">
                    <div
                      id=""
                      style="width: 100%; height:100%; color: #FFFFFF; text-align: center; font-weight: bold; font-size: 0.9rem; line-height:150%;padding: 0.4rem; overflow:scroll;white-space:pre-line; "
                    >
                      正在进行识别，请耐心等候...
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
                <div id="sptsrv_wrapper2">
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
                            prop="index"
                            width="72%"
                          />
                          <el-table-column
                            prop="class_name"
                            width="72%"
                          />
                          <el-table-column
                            prop="confidence"
                            width="72%"
                          />
                          <el-table-column
                            prop="position"
                            width="140%"
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
                    <div id="carousel">
                      <template>
                        <div id="banner">
                          <!--动态将图片轮播图的容器高度设置成与图片一致-->
                          <el-carousel :height="bannerHeight + 'px'" trigger="click" :initial-index="get_carousel_initial_index">
                            <!--遍历图片地址,动态生成轮播图-->
                            <el-carousel-item v-for="item in get_img_list" :key="item">
                              <img id="carousel_item_image" :src="item" alt="">
                            </el-carousel-item>
                          </el-carousel>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>

                <div style="margin: -10% 0 0 5%;">
                  <div id="timecnt" style="margin-top: 10%; display: flex;">
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
      loading_flag: false,
      mode: 0,
      request_form: {},
      send_carousel_initial_index: 0,
      get_carousel_initial_index: 0,
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
        index: '编号',
        class_name: '类别',
        confidence: '置信度',
        position: '位置'
      }, {
        index: '暂无数据',
        class_name: '暂无数据',
        confidence: '暂无数据',
        position: '暂无数据'
      }],
      // info_box_text: '这是多源数据融合，其功能是进行可见光图像数据与红外图像数据的融合识别。',
      info_box_text: '这是多模态数据融合，其功能是进行文本数据及可见光图像数据的融合处理。',
      send_img_list: [
        require('../assets/no_VIS.png'),
        require('../assets/no_IR.png')
      ],
      get_img_list: [
        require('../assets/no_VIS_res.png'),
        require('../assets/no_IR_res.png'),
        require('../assets/no_result.png')
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
    getCellClass() {
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
    click_to_selectVIS() {
      document.getElementById('select_VIS_Input').click()
      document.getElementById('select_VIS_btn').blur()
    },
    click_to_selectIR() {
      document.getElementById('select_IR_Input').click()
      document.getElementById('select_IR_btn').blur()
    },
    selectVIS(e) {
      const that = this
      const file = e.target.files[0]
      if (file) {
        this.request_form.append('photo_UAV', file, file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          const dataURL = reader.result
          that.$set(that.send_img_list, 0, dataURL)
        }
        document.getElementById('select_VIS_btn').style = 'background-color: #f0f9eb; color: #67C23A; border-color: #c2e7b0;'
        this.send_carousel_initial_index = 1
      }
    },
    selectIR(e) {
      const that = this
      const file = e.target.files[0]
      if (file) {
        this.request_form.append('photo_InfraRed', file, file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          const dataURL = reader.result
          that.$set(that.send_img_list, 1, dataURL)
        }
        document.getElementById('select_IR_btn').style = 'background-color: #f0f9eb; color: #67C23A; border-color: #c2e7b0;'
        this.send_carousel_initial_index = 1
      }
    },
    VISRegc() {
      if (this.request_form.has('mode')) {
        this.request_form.set('mode', 1)
      } else {
        this.request_form.append('mode', 1)
      }
      document.getElementById('VIS_btn').blur()
      if (this.request_form.has('photo_UAV')) {
        this.send_VIS_request()
        this.get_carousel_initial_index = 2
      }
    },
    IRRegc() {
      if (this.request_form.has('mode')) {
        this.request_form.set('mode', 2)
      } else {
        this.request_form.append('mode', 2)
      }
      document.getElementById('IR_btn').blur()
      if (this.request_form.has('photo_InfraRed')) {
        this.send_IR_request()
        this.get_carousel_initial_index = 2
      }
    },
    FusionRegc() {
      if (this.request_form.has('mode')) {
        this.request_form.set('mode', 3)
      } else {
        this.request_form.append('mode', 3)
      }
      document.getElementById('Fusion_btn').blur()
      if (this.request_form.has('photo_UAV')) {
        if (this.request_form.has('photo_InfraRed')) {
          this.send_Fusion_request()
          this.get_carousel_initial_index = 2
        }
      }
    },
    async send_VIS_request(mode) {
      try {
        const start_time = new Date()
        this.loading_flag = true
        const res = await this.$http.post('/upload_image', this.request_form)
        const obj_array = res.data.boxes
        const obj_array_len = obj_array.length
        for (var obj_idx = 0; obj_idx < obj_array_len; obj_idx++) {
          if (obj_idx === 0) {
            console.log('....')
            this.result_tableData[1].index = obj_idx + 1
            this.result_tableData[1].class_name = obj_array[obj_idx].classes
            this.result_tableData[1].confidence = obj_array[obj_idx].confidence
            this.result_tableData[1].position = obj_array[obj_idx].coordinates.join(',')
          } else {
            console.log('-----')
            this.result_tableData.push({ 'index': obj_idx + 1,
              'class_name': obj_array[obj_idx].classes, 'confidence': obj_array[obj_idx].confidence, 'position': obj_array[obj_idx].coordinates.join(',') })
          }
        }
        const get_image_url = res.data.image_url
        const res2 = await this.$http.get('/send_image', {
          params: { url: get_image_url, t: +new Date() },
          responseType: 'blob'
        })
        try {
          const obj = res2.data
          const objectURL = URL.createObjectURL(obj)
          this.$set(this.get_img_list, 0, objectURL)
          const end_time = new Date()
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
      } catch (err) {
        console.log(err)
      }
    },
    async send_IR_request(mode) {
      try {
        this.loading_flag = true
        const start_time = new Date()
        const res = await this.$http.post('/upload_image', this.request_form)
        const obj_array = res.data.boxes
        const obj_array_len = obj_array.length
        for (var obj_idx = 0; obj_idx < obj_array_len; obj_idx++) {
          if (obj_idx === 0) {
            console.log('....')
            this.result_tableData[1].index = obj_idx + 1
            this.result_tableData[1].class_name = obj_array[obj_idx].classes
            this.result_tableData[1].confidence = obj_array[obj_idx].confidence
            this.result_tableData[1].position = obj_array[obj_idx].coordinates.join(',')
          } else {
            console.log('-----')
            this.result_tableData.push({ 'index': obj_idx + 1,
              'class_name': obj_array[obj_idx].classes, 'confidence': obj_array[obj_idx].confidence, 'position': obj_array[obj_idx].coordinates.join(',') })
          }
        }
        const get_image_url = res.data.image_url
        const res2 = await this.$http.get('/send_image', {
          params: { url: get_image_url, t: +new Date() },
          responseType: 'blob'
        })
        try {
          const obj = res2.data
          const objectURL = URL.createObjectURL(obj)
          this.$set(this.get_img_list, 1, objectURL)
          const end_time = new Date()
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
      } catch (err) {
        console.log(err)
      }
    },
    async send_Fusion_request(mode) {
      try {
        const start_time = new Date()
        this.loading_flag = true
        const res = await this.$http.post('/upload_image', this.request_form)
        const obj_array = res.data.boxes
        const obj_array_len = obj_array.length
        for (var obj_idx = 0; obj_idx < obj_array_len; obj_idx++) {
          if (obj_idx === 0) {
            console.log('....')
            this.result_tableData[1].index = obj_idx + 1
            this.result_tableData[1].class_name = obj_array[obj_idx].classes
            this.result_tableData[1].confidence = obj_array[obj_idx].confidence
            this.result_tableData[1].position = obj_array[obj_idx].coordinates.join(',')
          } else {
            console.log('-----')
            this.result_tableData.push({ 'index': obj_idx + 1,
              'class_name': obj_array[obj_idx].classes, 'confidence': obj_array[obj_idx].confidence, 'position': obj_array[obj_idx].coordinates.join(',') })
          }
        }

        const get_image_url = res.data.image_url
        const res2 = await this.$http.get('/send_image', {
          params: { url: get_image_url, t: +new Date() },
          responseType: 'blob'
        })
        try {
          const obj = res2.data
          const objectURL = URL.createObjectURL(obj)
          this.$set(this.get_img_list, 2, objectURL)
          this.loading_flag = false
          const end_time = new Date()
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
            this.loading_flag = false
          }
        } catch (err) {
          console.log(err)
        }
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
	margin: 4.5% 0 0 3.2%;
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
#sptsrv_wrapper2 {
	width: 82%;
	height: 18%;
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
	height: 91.4%;
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
