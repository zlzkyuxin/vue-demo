<template>
  <div
    v-loading="loading"
    class="container"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="排放阶段">
        <el-radio
          v-model="form.standards"
          label="G51"
        >国五(声明五行)</el-radio>
        <el-radio
          v-model="form.standards"
          label="G52"
        >国五(声明六行)</el-radio>
        <el-radio
          v-model="form.standards"
          label="G6"
        >国六</el-radio>
      </el-form-item>

      <el-form-item
        label="选择VIN报送表"
        label-width="120px"
      >
        <el-upload
          class="upload-demo"
          accept=".xlsx,.xls,docx,doc"
          action=""
          :auto-upload="false"
          :on-change="fileUpload"
          multiple
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >VIN报送表只能上传xls/xlsx格式的文件</div>
        </el-upload>
        <!-- <input
          type="file"
          @change="fileUpload"
        ></input> -->
      </el-form-item>

      <el-form-item
        label="选择打印模板"
        label-width="120px"
      >
        <el-upload
          class="upload-demo"
          accept=".doc,.docx"
          action=""
          :auto-upload="false"
          :on-change="fileUpload1"
          multiple
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >打印模板只能上传doc/docx格式的文件</div>
        </el-upload>
        <!-- <input
          type="file"
          @change="fileUpload1"
        ></input> -->
      </el-form-item>

      <el-form-item label="VIN开始数">
        <el-col :span="6">
          <el-input
            v-model="form.vinStart"
            placeholder="请输入内容"
          />
        </el-col>
        <el-col :span="3">
          <span class="vin-end">VIN结束数</span>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="form.vinEnd"
            placeholder="请输入内容"
          />
        </el-col>
        <el-col
          :span="6"
          :offset="1"
        >
          <el-radio
            v-model="form.vinAll"
            label="1"
          >VIN全选</el-radio>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="bottom-container">
      <el-button
        size="small"
        type="primary"
        class="btn"
        @click="pdfPrint"
      >打印</el-button>
      <el-button
        size="small"
        type="primary"
        class="btn"
        @click="downloading"
      >生成PDF并下载</el-button>
    </div>
  </div>
</template>

<script>
// import { pdf, print } from '@/api/print'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      headers: {
        // 请求头
        // authorization:'Bearer '+Cookies.get('authorization'),
        appKey: 'PC'
      },
      baseurl: process.env.VUE_APP_BASE_API,
      limit: 1,
      state: '',
      value: '',
      loading: false,
      form: {
        standards: '', // 排放标准
        template: '', //  打印模板
        vinStart: '', //  VIN开始数
        vinEnd: '', //  VIN结束数
        vinAll: '1', //  全部VIN
        sysAttachments: '', //  报送表附件数组
        sysAttachments1: '' //  打印模板附件数组
      }
    }
  },
  watch: {
    'form.vinStart'(newVal) {
      if (newVal) {
        this.form.vinAll = '0'
      }
    },
    'form.vinEnd'(newVal) {
      if (newVal) {
        this.form.vinAll = '0'
      }
    },
    'form.vinAll'(newVal) {
      if (newVal === '1') {
        this.form.vinStart = ''
        this.form.vinEnd = ''
      }
    }
  },
  methods: {
    exceedFunc(file, fileList) {
      console.log(file, fileList)
      // this.$message({
      //   showClose: true,
      //   message: '警告，仅允许上传一个附件',
      //   type: 'warning'
      // })

    },
    //  文件上传
    fileUpload(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.form.sysAttachments = file.raw
      console.log(file, '上传的文件')
      // console.log(fileList, '上传的文件list')
    },
    //  文件上传
    fileUpload1(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.form.sysAttachments1 = file.raw
      console.log(file, '上传的文件')
      // console.log(fileList, '上传的文件list')
    },
    // //  文件上传
    // fileUpload (event) {
    //   let fileList = event.target.files
    //   this.form.sysAttachments = fileList[0]
    //   console.log(fileList[0], '上传的文件')
    //   // console.log(fileList, '上传的文件list')
    // },
    // //  文件上传
    // fileUpload1 (event) {
    //   let fileList = event.target.files
    //   this.form.sysAttachments1 = fileList[0]
    //   console.log(fileList[0], '上传的文件')
    //   // console.log(fileList, '上传的文件list')
    // },

    // 批量打印
    pdfPrint() {
      this.postFile(true)
    },
    // 批量下载
    downloading() {
      this.postFile(false)
    },
    check() {
      console.log(this.form, '检查前form数据')
      if (!this.form.standards) {
        this.$message.error('请选择排放阶段')
        return false
      }
      if (!this.form.sysAttachments) {
        this.$message.error('请上传VIN报送表')
        return false
      }
      if (!this.form.sysAttachments1) {
        this.$message.error('请上传打印模板')
        return false
      }
      if (
        (!this.form.vinAll || this.form.vinAll === '0') &&
        (!this.form.vinStart || !this.form.vinEnd)
      ) {
        this.$message.error('请填写或选择VIN区间')
        return false
      }
      return true
    },
    postFile(type) {
      let self = this
      console.log(process.env.VUE_APP_BASE_API, '请求地址')
      if (!this.check()) {
        return
      }
      this.loading = true
      const formData = new FormData()
      formData.append('tempFile', this.form.sysAttachments1)
      formData.append('vinFile', this.form.sysAttachments)
      formData.append('allVin', this.form.vinAll === '1' ? 'true' : 'false')
      formData.append('stage', this.form.standards)

      if (this.form.vinAll !== '1') {
        formData.append('vinFrom', this.form.vinStart)
        formData.append('vinTo', this.form.vinEnd)
      }
      console.log(formData, '传给后台的数据')

      // pdf生成压缩包 print打印
      var url
      if (type) {
        url = process.env.VUE_APP_BASE_API + 'v1/epp/print'
      } else {
        url = process.env.VUE_APP_BASE_API + 'v1/epp/epp/pdf'
      }
      console.log(url, '请求地址')
      this.$axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      })
        .then(response => {
          console.log(response)
          this.loading = false
          const content = response.data
          let contentType = response.headers['content-type']
          if (contentType.indexOf('application/json') !== -1) {

            let reader = new FileReader(); // 创建读取文件对象
            reader.addEventListener("loadend", function () { // 
              let res = JSON.parse(reader.result); // 返回的数据
              self.$message.error(res.msg)
            });
            reader.readAsText(content, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
          } else {
            const blob = new Blob([content]) // 构造一个blob对象来处理数据
            let contentName = response.headers['content-disposition'] // 导出文件名
            let arr = contentName.split('filename="')
            let finalName = arr[1]
            const fileName = finalName.substring(0, finalName.lastIndexOf('\"')) // 导出文件名
            console.log(response.headers, '后台返回的头信息')
            console.log(fileName, '后台返回的文件名')
            // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            // IE10以上支持blob但是依然不支持download
            if (type) { //pdf预览打印

              // // 支持a标签download的浏览器
              // const link = document.createElement('a') // 创建a标签
              // link.download = fileName // a标签添加属性
              // link.style.display = 'none'
              // link.href = URL.createObjectURL(blob)

              // document.body.appendChild(link)
              // link.click() // 执行下载
              // URL.revokeObjectURL(link.href) // 释放url
              // document.body.removeChild(link) // 释放标签

              let pdfurl = URL.createObjectURL(blob)
              console.log(pdfurl, 'pdf预览地址')

              window.open(`/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfurl)}`)
            } else {
              if ('download' in document.createElement('a')) {
                // 支持a标签download的浏览器
                const link = document.createElement('a') // 创建a标签
                link.download = fileName // a标签添加属性
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)

                document.body.appendChild(link)
                link.click() // 执行下载
                URL.revokeObjectURL(link.href) // 释放url
                document.body.removeChild(link) // 释放标签
              } else {
                // 其他浏览器
                navigator.msSaveBlob(blob, fileName)
              }
            }
          }
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  margin: '15px';
  .vin-end {
    float: right;
    padding-right: 12px;
    color: #606266;
    font-weight: 700;
  }
  .bottom-container {
    margin: 15px;
    .btn {
      margin-right: 15px;
    }
  }
}
</style>
