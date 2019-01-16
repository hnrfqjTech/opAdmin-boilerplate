<template>
  <div class="file-importer-page" v-loading="loading2" element-loading-text="上传中...">
    <span class="upload-btn-text">点击上传</span>
    <input class="my-uploader" @change="uploadFile" id="myUploader" type="file" :accept="accept"/>
  </div>
</template>

<script>
export default {
  name: 'file-importer',
  props: ['importUrl', 'accept'],
  data () {
    return {
      selectedFile: false,
      uploadElement: false,
      importError: false,
      loading2: false,
    };
  },
  methods: {
    uploadFile(el) {
      this.importError = false;

      const event = el.target || el.srcElement;
      const file = event.files[0];
      if (file.size > 10240000) {
        this.$message('上传文件不能超过10M');
        event.value = '';
      } else {
        this.loading2 = true;
        this.uploadElement = event;
        this.selectedFile = file;
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('file', file);
        this.$http.post(this.importUrl, formData)
          .then((result) => {
            this.loading2 = false;
            if (result.code === 0) {
              const res = result;
              res.importError = false;
              this.setImortResult(res);
              this.resetElement();
              this.importError = false;
            } else {
              const res = result;
              res.importError = true;
              this.setImortResult(res);
              this.resetElement();
              this.importError = true;
            }
          })
          .catch((error) => {
            this.loading2 = false;
            this.finishUpload();
            const result = error;
            result.importError = true;
            this.setImortResult(result);
            this.importError = true;
          });
      }
    },
    finishUpload() {
      this.resetElement();
    },
    resetElement() {
      this.uploadElement.value = '';
      this.selectedFile = false;
    },
    setImortResult(res) {
      this.$emit('rCallback', res);
    },
  },
};
</script>

<style lang='scss'>
.file-importer-page {
  .el-loading-text {
    text-align: center;
  }
}
.upload-btn-text {
  width: 100%;
  height: 100%;
  opacity: 1;
  position: absolute;
  z-index: 98;
  left: 0;
  top: 0;
  cursor: pointer;
  overflow: hidden;
}
.my-uploader {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
  cursor: pointer;
  overflow: hidden;
}
</style>
