<template>
<div>
  <div class="crop-demo">
    <div v-if="imageUrl==''"  class="pre-img">（文字提示）
      <input class="crop-input" id="file_uploade" type="file" name="image" accept="image/*" @change="setImage"/></div>
    <img v-if="imageUrl!=''" :src="imageUrl" class="pre-img">
    <input class="crop-input"  v-if="imageUrl!=''" type="file" name="image" accept="image/*" @change="setImage"/>  //如果已经上传显示这个框定位到图片上方则可以实现点击图片重新上传
  </div>
  <el-dialog title="裁剪图片（鼠标滚轮缩放，可拖动裁切）"
             :visible.sync="dialogVisible" width="30%">
    <vue-cropper ref='cropper' :aspectRatio="option.aspectRatio" :viewMode="option.viewMode" :dragMode="option.dragMode" :cropBoxResizable="option.cropBoxResizable" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" style="width:100%;height:300px;"></vue-cropper>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCrop">取 消</el-button>
        <el-button type="primary" @click="uploadImg">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      return {
        imgSrc: '',
        action: 'https://www.my51share.com/boss/upload',
        cropImg: '',
        cropper: '',
        param: {multipartFile:''},//表单要提交的参数
        dialogVisible: false,
        imageUrl: '',//上传成功返回的图片放在这
        option: {
          img: '',
          outputSize: 1, //剪切后的图片质量（0.1-1）
          full: false,//输出原图比例截图 props名full
          outputType: 'png',
          cropBoxResizable: false, //是否可以重置
          canMove: true,
          dragMode: 'move',
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 260,
          autoCropHeight: 174,
          minContainerWidth: 260,
          minContainerHeight: 174,
          minCropBoxWidth: 260,
          minCropBoxHeight: 174,
          minCanvasWidth: 260,
          minCanvasHeight: 174,
          aspectRatio: 2.21, //长宽比例
          fixedBox: true,
          viewMode: 1,
        }
      }
    },
    methods: {
      setImage(e) {
        var that = this;
        const file = e.target.files[0];
        let url = window.URL || window.webkitURL;
        let img = new Image();//手动创建一个Image对象
        img.src = url.createObjectURL(file);//创建Image的对象的url
        const isLt2M = file.size / 1024 / 1024;  //获取图片大小
        img.onload = function () {
          if (isLt2M > 1) {
            that.$message.error('上传图片大小不能超过1MB!');
            that.dialogVisible = false;
          } else {
            if (!file.type.includes('image/')) {
              return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
              that.dialogVisible = true;
              that.imgSrc = event.target.result;
              that.$refs.cropper && that.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
          }
        }
      },
      cropImage() {   //裁切
        //////console.log(2)
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      cancelCrop() { //关闭
        this.dialogVisible = false;
        this.cropImg = '';
      },
      uploadImg() {
        let that = this,
          Img = new Image();
        Img.src = this.cropImg;
        Img.onload = function () {
          let w = this.naturalWidth,
            h = this.naturalHeight,
            resizeW = 0,
            resizeH = 0;
          //压缩设置
          let maxSize = {
            width: 765,
            height: 350,
            level: 0.9   //图片保存质量
          };
          //计算压缩比例
          if (w > maxSize.width || h > maxSize.height) {
            let multiple = Math.max(w / maxSize.width, h / maxSize.height);
            resizeW = w / multiple;
            resizeH = h / multiple;
          } else {
            resizeW = w;
            resizeH = h;
          }
          let canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d');
          if (window.navigator.userAgent.indexOf('iphone') > 0) {
            canvas.width = resizeH;
            canvas.height = resizeW;
            ctx.retate(90 * Math.PI / 180);
            ctx.drawImage(Img, 0, -resizeH, resizeW, resizeH);
          } else {
            canvas.width = resizeW;
            canvas.height = resizeH;
            ctx.drawImage(Img, 0, 0, resizeW, resizeH);
          }
          that.set_head = canvas.toDataURL('image/jpeg', maxSize.level);
          //////console.log(that.set_head)
          var arr = that.set_head.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var aa = new File([u8arr], '123.jpg', {type: mime});
          //////console.log(aa)
          that.param = new FormData();
          that.param.append('imgFile', aa, aa.set_head);
          var names = that.form.imgFile;
          that.param.append('message', names);
          //////console.log(that.param)
          /**将base64转化成FormData end */
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          that.$req.post(that.action, that.param, config).then(function (res) {
            if (res.data.invokeResultCode == 200) {
              that.$message.success("图片上传成功");
              //////console.log(res.data.data.url);
              that.imageUrl = res.data.data.imgUrl;
              that.dialogVisible = false;
            } else {
              that.$message.error(res.data.invokeResultMessage);
            }
          }).catch((res) => {
            that.$message.error('请稍候重试或联系管理员');
          })
        }
      },

      imageuploaded(res) {
        //////console.log(4)
        //////console.log(res)
      },
      handleError() {
        //////console.log(5)
        this.$notify.error({
          title: '上传失败',
          message: '图片上传接口上传失败，可更改为自己的服务器接口'
        });
      }
    }
  }
</script>

<style scoped>

</style>
