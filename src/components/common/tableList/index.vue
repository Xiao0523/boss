<template>
  <el-table
    :data="tableData"
    :default-sort="tableConfig.defaultSort"
    :max-height="tableConfig.maxHeight"
    empty-text="暂无数据"
    style="width: 100%"
    border
    @row-click="rowClickFn"
    @cell-click="cellClickFn"
    header-align="center"
    :show-summary="tableConfig.hasSummary"
    :summary-method="tableConfig.getSummaries"
    :header-cell-style="tabHeader"
    :cell-style=this.$parent.setTbStyleFn
    @selection-change="handleSelected"
  >
    <!--多选-->
    <el-table-column
      v-if="tableConfig.hasSelect"
      type="selection"
     >
    </el-table-column>
    <!--列-->
    <template  v-for="{ prop, label,operate,fixed,showOverflowTooltip,sortable,isSwitch,popover} in columns">
      <el-table-column
        v-if="label !='列表显示' "
        :key="prop"
        :prop="prop"
        :label="label"
        :fixed="fixed"
        :showOverflowTooltip = showOverflowTooltip
        :sortable = sortable
        align="center"
      >
      </el-table-column>
      <!--switch-->
      <el-table-column
        v-if="isSwitch"
        :label="label"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.shifoutixing"
            active-value="1"
            inactive-value="0"
            active-text="显示"
            inactive-text="禁止"
            @change="changeFn($event,scope.$index,scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </template>
    <!--操作列-->
    <el-table-column
      v-if="operation"
      :label="operation.label"
      align="center"
      :fixed="operation.fixed"
     >
      <template slot-scope="scope">
        <div class="btn-box">
          <el-button class="btn"
                     v-for="item in operation.data"
                     :key="item.id"
                     size="mini"
                     :type="item.type"
                     @click.stop="item.Fun(scope.$index, scope.row, item.id)">{{ item.label }}
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import  myRender from '@/components/common/myRender'
  export default {
    name: "table-list",
    components: {
      myRender
    },
    computed:{
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    props: {
      tableData: {
        type: Array
      },
      columns: Array,
      pageNum: { type: Number, default: 1 },
      pageSize: { type: Number, default: 10 },
      totalPage:{ type: Number, default:0},
      operation: Object,
      tableConfig: {
        type: Object,
        default() {
          return {}
        }
      }

    },
    data() {
      return {

        tabHeader: {
          "background-color": "#F4F4F4",
          'color': "#666666",
          'border-top': "1px solid #BBBBBB",
          'border-bottom': "1px solid #BBBBBB",
          "font-size": "16px",
          "text-align": "center"
        },
      }
    },
    methods: {
      // 文章列表的switch事件
      changeFn($event, index, row) {
//        console.log($event, index, row)
//        console.log(this.userInfo.realname);
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('updateremind', {
          id: row.id, shifoutixing: $event, updateBy: realname
        }).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }).catch(err => {
          console.log(err);
        })
      },
      // 多选
      handleSelected(val) {
    let ids = val.map(item=>item.id)
        this.$emit('changeSelectedFn', ids)
      },
      // 点击行
      rowClickFn(row, event, column) {
        this.$emit('rowClickFn', row, event, column);
      },
      // 点击单元格
      cellClickFn(row, column, cell, event) {
        // console.log('行'+JSON.stringify(row));
        // console.log('列'+ JSON.stringify(column));
        // console.log('单元格'+JSON.stringify(cell) );
        // console.log('事件对象'+ JSON.stringify(event));
        // 获取label
        this.$emit('cellClickFn', row, column, cell, event);
      }
    },
    watch:{
    },
    mounted() {
//      console.log(this.userInfo);

    },
    created() {
      console.log('tableData', this.tableData);
//        setTimeout(function () {
//          console.log('tableData', this.tableData);
//          console.log('columns',this.columns);
//        }.bind(this), 1000)

    },
  }
</script>

<style lang="scss" scoped>
.btn-box{
  display: flex;
  flex-direction: row;
}
</style>
