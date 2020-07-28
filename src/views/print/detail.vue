<template>
  <div>
    <iframe class="ifclass" :src="pdfUrl" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfDoc: '',
      pages: '',
      pdfUrl: ''
    }
  },
  methods: {
  },
  created() {

    var pdfPath = "https://zlzkyuxin.xyz/pdf/demo.pdf?r=" + new Date();
    // var pdfPath = "http://localhost:3000/pdf/oc1.pdf?r=" + new Date();
    let url = `/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfPath)}`
    console.log(url,'地址')
    // let url = `https://www.zlzkyuxin.xyz/yuxin/demo/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfPath)}`
    Object.assign(this, {pdfUrl: url})
  }
}
</script>

<style lang="scss" scoped>
  .ifclass {
    width: 100vw;
    height: 100vh;
  }
</style>
