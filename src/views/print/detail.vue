<template>
  <div v-loading="loading">
    <iframe class="ifclass" :src="pdfUrl" frameborder="0" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      pdfDoc: '',
      pages: '',
      pdfUrl: ''
    }
  },
  mounted() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      var pdfPath = 'https://zlzkyuxin.xyz/pdf/demo.pdf?r=' + new Date()
      // var pdfPath = "http://localhost:3000/pdf/oc1.pdf?r=" + new Date();
      // const url = `/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfPath)}`
      const url = `https://www.zlzkyuxin.xyz/yuxin/demo/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfPath)}`
      console.log(url, '地址')
      Object.assign(this, { pdfUrl: url })
    }, 5000)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .ifclass {
    width: 100vw;
    height: 100vh;
  }
</style>
