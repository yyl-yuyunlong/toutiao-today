<template>
  <div class="search-suggestion">
    <van-cell
     :title="str"
     icon="search"
     v-for="(str, index) in suggestions"
     :key="index"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>

import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

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
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    // 属性名： 要监视的数据名称
    searchText: {
      handler: debounce(async function () {
        // 找到数据接口
        // 请求获取数据
        // 模板绑定展示
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // 用于设置回调在真挺开始之后立刻调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (str) {
      // 正则表达式中 /中间的内容/ 都会被当作字符串来对待
      /* str.replace(正则表达式, `<span style ="color:red">${this.searchText}</span>`) */
      // RegExp 是正则表达式的构造函数，参数1 :字符串；参数2 : 匹配模式；返回值：正则对象
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style ="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less"></style>
