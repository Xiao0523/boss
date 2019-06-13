<template>
  <div id="msg-dependencies" v-if="msgCount == 0">
  </div>
</template>

<script>
    // import someComponent from './someComponent'
    export default {
        name: "Msg",
        components: {
// someComponent
        },
        computed: {
          msgCount(){
            var type = this.$store.state.msg.type;
            var msg = this.$store.state.msg.content;
            if(msg !== "") {
              var param = { "type":type, message:msg };
              console.log("message param:",param)
              this.$message(param);
            }
            return this.$store.state.msg.count;
          }
        },
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        methods: {},
        created() {
        }

    }
</script>

<style lang="scss" scoped>

</style>
