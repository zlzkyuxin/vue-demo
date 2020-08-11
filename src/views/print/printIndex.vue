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
        <!-- <el-select
          v-model="form.standards"
          placeholder="请选择活动区域"
        >
          <el-option
            label="国五(声明五行)"
            value="国五(声明五行)"
          />
          <el-option
            label="国五(声明六行)"
            value="国五(声明六行)"
          />
          <el-option
            label="国六"
            value="国六"
          />
        </el-select> -->
      </el-form-item>

      <!-- <el-form-item label="选择打印模版">
        <el-select
          v-model="form.template"
          placeholder="请选择活动区域"
        >
          <el-option
            label="模板一"
            value="template1"
          />
          <el-option
            label="模板二"
            value="template2"
          />
          <el-option
            label="模板三"
            value="template3"
          />
          <el-option
            label="模板四"
            value="template4"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item
        label="选择VIN报送表"
        label-width="120px"
      >
        <el-upload
          class="upload-demo"
          accept=".xlsx,.xls,docx,doc"
          action=""
          :limit="1"
          :auto-upload="false"
          :on-change="fileUpload"
          :on-exceed="exceedFunc"
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
          :limit="1"
          :auto-upload="false"
          :on-change="fileUpload1"
          :on-exceed="exceedFunc"
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
import { pdf, print } from '@/api/print'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      headers: { // 请求头
        // authorization:'Bearer '+Cookies.get('authorization'),
        appKey: 'PC'
      },
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
    'form.vinStart' (newVal) {
      if (newVal) {
        this.form.vinAll = '0'
      }
    },
    'form.vinEnd' (newVal) {
      if (newVal) {
        this.form.vinAll = '0'
      }
    },
    'form.vinAll' (newVal) {
      if (newVal === '1') {
        this.form.vinStart = ''
        this.form.vinEnd = ''
      }
    }
  },
  methods: {
    exceedFunc () {
      this.$message({
        showClose: true,
        message: '警告，仅允许上传一个附件',
        type: 'warning'
      })
    },
    //  文件上传
    fileUpload (file, fileList) {
      this.form.sysAttachments = file.raw
      console.log(file, '上传的文件')
      // console.log(fileList, '上传的文件list')
    },
    //  文件上传
    fileUpload1 (file, fileList) {
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
    pdfPrint () {
      // if (!this.check()) { return }
      // this.$axios({
      //   methods: 'get',
      //   url: 'https://www.zlzkyuxin.xyz/yuxin/demo/demo.pdf',
      //   responseType: 'blob'
      // }).then((response) => {
      //   console.log(response)
      //   var newWin = window.open('https://www.zlzkyuxin.xyz/yuxin/demo/demo.pdf')
      //   newWin.document.close()
      //   newWin.focus()
      //   newWin.print()
      // })

      // this.$router.push({ path: '/detail' })

      // const params = { id: 'val' }
      // const routeData = this.$router.resolve({ name: 'Detail', query: params })
      // window.open(routeData.href, '_blank')

      if (!this.check()) { return }
      this.loading = true
      let formData = new FormData()
      formData.append('tempFile', this.form.sysAttachments1)
      formData.append('vinFile', this.form.sysAttachments)
      formData.append('allVin', this.form.vinAll === '1' ? true : false)
      formData.append('stage', this.form.standards)

      if (this.form.vinAll !== '1') {
        formData.append('vinFrom', this.form.vinStart)
        formData.append('vinTo', this.form.vinEnd)
      }
      console.log(formData, '传给后台的数据')

      // print(formData).then(response => {
      //   this.loading = false
      //   console.log(response, '返回的数据')
      // }).catch(err => {
      //   this.loading = false
      // })

      this.$axios({
        method: 'post',
        url: 'http://10.33.3.45:8080/v1/epp/print',
        data: formData,
        headers: {
          Authorization: getToken()
        },
        // responseType: 'blob'
      }).then((response) => {
        this.loading = false
        console.log(response, '打印接口返回')
        debugger
        const content = response.data
        if (content.code === 'F.999') {
          this.$message.error(content.msg)
        } else {
          const blob = new Blob([content]) // 构造一个blob对象来处理数据
          const fileName = new Date().getTime() + '.docx' // 导出文件名
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
            const link = document.createElement('a') // 创建a标签
            link.download = fileName // a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            console.log(link.href, '下载文件地址为')
            document.body.appendChild(link)
            link.click() // 执行下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link) // 释放标签
            window.open(link.href)
          } else { // 其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })

    },
    // 批量下载
    downloading () {
      if (!this.check()) { return }
      this.loading = true
      let formData = new FormData()
      formData.append('tempFile', this.form.sysAttachments1)
      formData.append('vinFile', this.form.sysAttachments)
      formData.append('allVin', this.form.vinAll === '1' ? true : false)
      formData.append('stage', this.form.standards)

      if (this.form.vinAll !== '1') {
        formData.append('vinFrom', this.form.vinStart)
        formData.append('vinTo', this.form.vinEnd)
      }
      console.log(formData, '传给后台的数据')
      // pdf(formData).then(response => {

      //   this.loading = false
      //   console.log(response, '返回的数据')
      // }).catch(err => {

      //   this.loading = false
      // })

      this.$axios({
        methods: 'get',
        url: 'https://www.zlzkyuxin.xyz/yuxin/demo/demo.pdf',
        responseType: 'blob'
      }).then((response) => {
        console.log(response)
        const content = response.data
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = new Date().getTime() + '.zip' // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          console.log(link.href, '下载文件地址为')
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    check () {
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
      if ((!this.form.vinAll || this.form.vinAll === '0') &&
        (!this.form.vinStart || !this.form.vinEnd)) {
        this.$message.error('请填写或选择VIN区间')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 15px;
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
