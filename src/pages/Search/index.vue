<template>
<div>
  <h2>Search</h2>
  <p>query参数: keyword={{$route.query.keyword}}</p>
  <p>params参数: keyword={{$route.params.keyword}}</p>
  <p>params==>props: keyword={{keyword1}}</p>
  <p>query==>props: keyword={{keyword2}}</p>
</div>
</template>

<script>
export default {
  name: 'Search',
  //声明接收
  props: ['keyword1', 'keyword2']
}
</script>

<style lang="less" scoped>

</style>
