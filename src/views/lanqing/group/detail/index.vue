<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" class="img-box">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="phone" label="手机号" />
    </el-table>
  </div>
</template>

<script>
import { getGroupView } from '@/api/group'
import classSelect from '@/components/classSelect'

export default {
  name: 'BannerEdit',
  components: {
    classSelect
  },
  data() {
    return {
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      list: []
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      this.getView(id)
    }
  },
  methods: {
    getView(id) {
      const getObj = {
        id: id
      }
      getGroupView(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.list = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.img-box {
  width: 60px;
  height: 60px;
}
.novel {
  width: 50%;
  textarea {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    resize: none;
    min-height: 90px;
  }
}

.img-uploader {
    width: 100px;
    &-wraper{
      display: flex;
      align-items: flex-start;
    }
    & /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.img-uploader .el-upload:hover {
  border-color: #409eff;
}
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.novel_img {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: contain;
}

.sponser{
  position: relative;
  & /deep/ .el-input{
    // width: 85%;
    margin-bottom: 20px;
  }
  &-del{
    margin-left: 20px;
  }
  &-btn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
  }
  .del-wraper{
    position: relative;
    height: 100%;
  }
}

.work-uploader{
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
}
.uploader {
  width: 128px;
  & /deep/ {
    & .el-upload {
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: rgba(250, 250, 251, 1);
      &:hover {
        border-color: rgba(0,210,165,1);
      }
    }
  }
  .uploader-icon {
    font-size: 18px;
    color:rgba(222,226,233,1);
    width: 128px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 80px;
    display: block;
    object-fit: scale-down;
  }
}
.course-uploader{
  width: 80px;
  .uploader-icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
}
.logosFlex {
  display: flex;
  .add {
    margin-top: 25px;
    i {
      font-size: 20px;
    }
  }
}
</style>
