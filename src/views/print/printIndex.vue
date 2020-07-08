<template>
  <div class="container">
    <el-form ref="form" :model="form" label-position="right" label-width="120px">
      <el-form-item label="排放阶段">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="国五(声明五行)" value="1"></el-option>
          <el-option label="国五(声明六行)" value="2"></el-option>
          <el-option label="国六" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择打印模版">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择VIN报送表">
        <el-upload
          class="upload-demo"
          accept=".xlsx,.xls"
          limit=1
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          on-exceed="exceedFunc"
        >
          <!-- <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->

        <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">VIN报送表只能上传xls/xlsx格式的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="VIN开始数">
        <!-- <el-col :span="6" offset="2"> -->
          <el-input v-model="form.vinStart" placeholder="请输入内容"></el-input>
        <!-- </el-col> -->
        <!-- <el-col :span="6" offset="2"> -->
        <!-- </el-col> -->
      </el-form-item>
      <el-form-item label="VIN结束数">
        <el-input v-model="form.vinEnd" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
          <el-radio v-model="form.vinAll" label="1">VIN全选</el-radio>
      </el-form-item>
    </el-form>
    <div class="bottom-container">
      <el-button
        size="small"
        type="primary"
        class="btn"
      >批量打印</el-button>
      <el-button
        size="small"
        type="primary"
        class="btn"
      >批量下载</el-button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: '猪猪侠', value: 0 },
        { label: '灰太狼', value: 1 },
        { label: '小灰灰', value: 2 },
        { label: '铁甲小宝', value: 3 },
        { label: '咸蛋超人', value: 4 }
      ],
      value: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        vinStart: '',
        vinEnd: '',
        vinAll: '1',
      }
    }
  },
  methods: {
    change(index) {
      console.log(this.options[index].label)
    },
    onSubmit() {
      console.log('submit!');
    },
    exceedFunc() {
      this.$message({
        showClose: true,
        message: '警告，仅允许上传一个附件',
        type: 'warning'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 15px;
    .bottom-container {
      margin: 15px;
      .btn {
        margin-right: 15px;
      }
    }
  }


</style>
