<template>
    <div>{{msg}}</div>
    <!--<someComponent></someComponent>-->
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: "AppCat",
    components: {
// someComponent
    },
    computed: {},
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
