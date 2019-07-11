<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!--<img src="../../../../assets/imgs/logo.png" alt="图片">-->
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :menu="menu"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { setInterval, clearInterval } from 'timers';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // let routes=[]
      // for(let i=0;i<this.menu.length;i++){
      //   for(let j=0;j<this.$router.options.routes.length;j++){
      //     if(this.menu[i]==this.$router.options.routes[j].path||this.menu[i]==this.$router.options.routes[j].redirect){
      //       routes.push(this.$router.options.routes[j]);
      //       break;
      //     }
      //   }
      // }
      // console.log(routes);
      return this.$router.options.routes
    },
    isCollapse() {
      return false
      // return !this.sidebar.opened
    }
  },
  data(){
    return{
      menu:[]
    }
  },
  created(){
    console.log(this.$req);
    //
    let timer=setInterval(()=>{
      if(window.localStorage['userInfo']!=undefined){
        this.$req.get(`menu/${JSON.parse(JSON.parse(window.localStorage['userInfo'])).bossUserId}`).then(res=>{
          this.menu=res.data.data
        })
        clearInterval(timer);
      }
    })
  }
}
</script>
