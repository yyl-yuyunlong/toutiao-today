<template>
  <div class="search-suggestion">
    <van-cell title="黑马程序员..." icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {
    // 属性名： 要监视的数据名称
    searchText: {
      handler () {
        // 找到数据接口
        // 请求获取数据
        // 模板绑定展示
        console.log('object')
      },
      // 用于设置回调在真挺开始之后立刻调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
