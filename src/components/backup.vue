<template>
  <div id="app">
    <div class="container">
      <el-container class="el_container">
        <el-header height="7.5%">
          <img src="../assets/header.png" style=" width: 100%; height: 100%;">
        </el-header>
        <el-container>
          <el-aside width="33%" height="100%">
            <div id="aside_left" height="100%" width="100%">
              <div id="aside-left-top" height="41.2%" width="80%">
                <div id="nav-line" style="padding: 0 0 0 2rem;">
                  <div id="nav_image" style="display: flex; justify-content: space-around;">
                    <img src="../assets/multisrc.png" width="28%">
                    <img src="../assets/multimodel.png" width="28%">
                    <img src="../assets/multiview.png" width="28%">
                  </div>
                </div>
                <div id="nav-info" height="58.8%" width="100%" style=" padding: 0.6rem 0 0 2.3rem; margin-left: 0.5rem;">
                  <div id="info-box-head" width="100%" height="100%">
                    <div style="display: flex; align-items:center; justify-content:center;">
                      <img src="../assets/info_box_head.png" style="height: 4%; width: 4%;">
                    </div>
                  </div>
                  <div id="info_box">
                    <div style="display: flex; width: 80%; border: 0.1rem solid #0e6ad4; border-radius: 1rem; margin: 0 0 0 2rem">
                      <div style="color: #FFFFFF; text-align: left ;font-weight: bold; font-size: 15px; line-height:150%; padding: 1rem;">{{ info_box_text }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="aside-left-bottom">
                <div id="sptsrv">
                  <div id="sptsrv-head" width="100%" height="100%">
                    <div style="display: flex; margin-left: 8.5rem;">
                      <img src="../assets/support_survice_text.png" style="height: 45%; width: 45%; padding: 1.4rem 0 1rem 0;">
                    </div>
                  </div>
                  <div id="sptsrv_wrapper">
                    <div id="sptsrv-table">
                      <template>
                        <div class="table-wrapper">
                          <el-table
                            :row-style="getRowClass"
                            :header-row-style="getRowClass"
                            :header-cell-style="getRowClass"
                            :data="tableData"
                            :show-header="false"
                            :max-height="140"
                          >
                            <el-table-column
                              :row-style="getRowClass"
                              label="序号"
                              prop="list"
                              style="width: 100%;"
                            />
                            <el-table-column
                              label="序号"
                              prop="list"
                              width="88"
                            />
                          </el-table>
                        </div>
                      </template>
                    </div>
                  </div>

                </div>
                <div id="dataspfct">
                  <div id="sptsrv-head" width="100%" height="100%">
                    <div style="display: flex; margin-left: 8.5rem;">
                      <img src="../assets/data_specification_text.png" style="height: 45%; width: 45%">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-aside>

          <el-container width="100%">
            <el-aside width="50%">
              <div id="aside-right-top" />
              <div id="aside-right-bottom">
                <img src="../assets/support_survice_text.png" style="height: 50%; width: 50%;">
              </div>
            </el-aside>
            <el-main>Main</el-main>
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
      tableData: [{
        list: '1'
      }, {
        list: '2'
      }, {
        list: '3'
      }, {
        list: '4'
      }],
      info_box_text: '这是多源数据融合，其功能是进行可见光图像数据源及红外对象数据源的融合处理。这是多源数据融合，其功能是进行可见光图像数。'
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return 'background:#030c60'
      // const styleJson = {
      //   'width': '80%',
      //   'background-color': '#030c60'
      // }
      // return styleJson
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}

</script>

<style  scoped>
	.container{
		height: 100%;
	}

   #aside-left-bottom {
	width: 100%;
	height: 100%;
	margin: 2rem 0 0 3rem;
	background-image: url(survicebox.png);
	background-size: 90% 100%;
   }
   #sptsrv_wrapper{
    width: 22.8rem;
    height: 8.7rem;
	margin-left: 2rem;
	margin-top: -1rem;
	padding: 1.3rem 0.5rem 0.5rem 0.5rem;
	background-image: url(tablebox.png);
	background-size: 100% 100%;
   }
   #sptsrv-table{
	width: 100%;
	height: 100%;
	margin-left: -2rem;
/* 	background-image: url(tablebox.png);
 background-size: 100% 100%; */
   }
   #aside-right-top {
	width: 100%;
	height: 65%;
	margin-top: -5rem;
	margin-left: -2rem;
	background-image: url(../assets/earth.png);
	background-size: 100% 100%;
   }
</style>
