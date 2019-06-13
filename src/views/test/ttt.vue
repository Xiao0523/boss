<template>
  <section>
    <el-button size="small" type="primary" @click="showFn">点击上传</el-button>
    <Dialog
      :isShow="visible"
      @cancelFn="visible = false"
      @confirmFn="confirmFn"
    >
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
             accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <el-button type="primary" plain @click="changeScale(1)">+</el-button>
      <el-button type="success" plain  @click="changeScale(-1)">-</el-button>
      <el-button plain  @click="down('blob')">下载</el-button>
      <!--<input type="button" class="btn btn-blue" value="上传头像" @click="finish('blob')">-->

      <div class="dialogCover">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            @realTime="realTime"
            @imgLoad="imgLoad"
            @cropMoving="cropMoving"
            :enlarge="option.enlarge"
            :mode="option.mode"
          ></vueCropper>
        <div class="right">
          <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
							'margin': '5px'}">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </div>


    </Dialog>
  </section>
</template>
<script>
  import VueCropper from './vue-cropper/vue-cropper'

  import codes from './code'
  import Dialog from'@/components/common/dialog'

  export default {
    data() {
      return {
        visible:false,
        previews: {}, // 预览
        fileinfo: {},// 裁剪后图片信息
        uploadImgUrl:'http://www.my51share.com/boss/upload',
        option: {
          img: "",
          size: 1,
          full: false,
          outputType: "png",
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 200,
          autoCropHeight: 150,
          centerBox: true,
          high: true,
          cropData: {},
          enlarge: 1,
          mode: 'contain'
        },
      }
    },
    methods: {
      showFn(){
        this.visible=true
      },
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      finish (type) {  // 输出
        let formData = new FormData()
        type = 'blob'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var img = window.URL.createObjectURL(data)
            this.model = true
            this.modelSrc = img
            formData.append('multipartFile', data)
            this.$axios.post(this.uploadImgUrl, formData,
              {
                contentType: false,
                processData: false,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }).then(res => {
              this.$success('上传成功')
              this.visible = false
              this.option.img = ''
              this.$emit('uploadFileFn',res.data)

            }).catch(err => {
              console.log(err)
              this.$wran('上传失败')
              this.visible = false
            })
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
        }
      },
      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'author-img' // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = window.URL.createObjectURL(data)
            // aLink.download = this.downImg;
            aLink.href = window.URL.createObjectURL(data)
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },
      // 确定裁剪图片
      confirmFn(){
        this.finish()
      },
      //上传图片
      uploadImg(e, num) {
        // this.option.img
        var file = e.target.files[0];
        console.log(file.name)
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种");
          return false;
        }
        var reader = new FileReader();
        reader.onload = e => {
          let data;
          if (typeof e.target.result === "object") {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          if (num === 1) {
            this.option.img = data;
            console.log(this.option.img)
          } else if (num === 2) {
            this.example2.img = data;
          }
        };
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
      },
      // 实时预览函数
      realTime(data) {
        var previews = data;
        var h = 0.5;
        var w = 0.2;
        this.previews = data;
      },
      imgLoad(msg) {
        // console.log('imgLoad',msg);
      },
      cropMoving(data) {
        this.option.cropData = data;
        // console.log('cropData',this.option.cropData)
      }
    }
    ,
    components: {
      VueCropper,
      codes,
      Dialog
    }
  }


</script>

<style type="text/css" lang="scss">
.dialogCover{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

}
</style>
