<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="address" label="收货地址" />
      <el-table-column align="center" prop="id" label="获奖编号" />
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="phone" label="手机号码" />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="statusDescription" label="状态描述" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="diglogFlag"
      title="审核"
      width="30%"
      center
    >
      <span>
        <el-form>
          <el-form-item label="运单编号">
            <el-input v-model="waybillNo"/>
          </el-form-item>
          <el-form-item label="运单照片">
            <el-upload
              :action="UploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="uploader"
              name="multipartFile"
            >
              <img v-if="waybillPic" :src="waybillPic" class="avatar">
              <i v-else class="el-icon-picture uploader-icon" />
            </el-upload>
            <input type="hidden">
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
        <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRewardList, getRewardStatus } from '@/api/rewardList'
import pageNum from '@/components/pageNum'
import { UploadUrl } from '@/http/url'
export default {
  name: 'Tuition',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return val == 0 ? '未申请' : val == 1 ? '已申请，待平台发放' : val == 2 ? '已发放' : '涉嫌作弊不发放'
    }
  },
  data() {
    return {
      UploadUrl: UploadUrl,
      list: [], // 列表数据
      totalNum: null, // 数据总条数
      pageNo: 1, // 当前页
      pageSize: 10, // 每页的条数
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      diglogFlag: false,
      pid: '',
      waybillNo: '',
      waybillPic: ''
    }
  },
  created() {
    const id = this.$route.query.id
    if (!id) {
      this.$router.back(-1)
    }
    this.pid = id
    this.fetchList()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.waybillPic = res.data
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    audit(obj) {
      this.activeAudit = obj
      if (obj.status != 1) {
        this.$message({
          message: '请选择已申请的数据',
          type: 'warning'
        })
        return
      }
      this.diglogFlag = true
    },
    // 审核弹框选择
    handelDiglogClick(flag) {
      const activeAudit = this.activeAudit
      if (!activeAudit.id) return
      const auditObj = {
        id: this.activeAudit.id
      }
      auditObj.status = flag === 'success' ? 2 : 3
      if (auditObj.status == 3) {
        thi.waybillNo = ''
        this.waybillPic = ''
      }
      if (auditObj.status == 2) {
        if (!this.waybillNo || !this.waybillPic) {
          this.$message.error('请填写运单编号和图片')
          return
        }
        auditObj.waybillNo = this.waybillNo
        auditObj.waybillPic = this.waybillPic
      }
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    auditFn(obj) {
      getRewardStatus(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.fetchList()
      })
    },
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchList()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchList()
    },

    // 获取文章列表
    fetchList() {
      const argsObj = {
        id: this.pid
      }

      getRewardList(argsObj).then(res => {
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
.table-box {
  margin-top: 20px;
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}
.el-dialog--center .el-dialog__body {
  padding: 0 !important;
}

.diglog-textarea {
  display: block;
  width: 100%;
  textarea {
    display: block;
    width: 100%;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 30px;
    height: 120px;
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
</style>
