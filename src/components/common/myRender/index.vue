<template>
    <div>{{msg}}</div>
    <!--<someComponent></someComponent>-->
</template>

<script>
  export default {
    functional: true,
    props: {
      row: Object,
      render: Function
    },
    render: (h, ctx) => {
      const params = {
        row: ctx.props.row,
        index: ctx.props.index
      };
      return ctx.props.render(h, params);
    }
  };
</script>

<style lang="scss" scoped>

</style>
