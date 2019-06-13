<template>
    <div>{{msg}}</div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    // import someComponent from './someComponent'
    export default {
        name: "member",
        components: {
// someComponent
        },
        computed: {},
        data() {
            return {
                msg: "Hello Vue.js2"
            }
        },
        methods: {},
        created() {
        }

    }
</script>

<style lang="scss" scoped>

</style>
