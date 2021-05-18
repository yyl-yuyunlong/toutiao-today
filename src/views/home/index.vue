<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <!--
      标签页组件有一个功能，只有你第1次查看标签页的时候才会渲染里面的内容
     -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
       :title="channel.name"
       v-for="channel in channels"
       :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
        <!-- /文章列表 -->
      </van-tab>
      <div
       slot="nav-right"
       class="wap-nav-placeholder"
      ></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon
         name="wap-nav"
        />
      </div>
    </van-tabs>
    <!-- /文章频道列表 -->

    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
    <channel-edit
     :user-channels="channels"
    />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // 请求获取频道数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
  .home-container {
    /deep/ .van-nav-bar__title{
      max-width: none;
    }
    .search-btn {
       width: 277px;
       height: 32px;
       background-color: #5babfb;
       border: none;
       .van-icon {
         font-size: 16px;
       }
       .van-button__text {
         font-size: 14px;
       }
    }
    .channel-tabs {
      /deep/ .van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/ .van-tabs__line {
        width: 15px;
        height: 3px;
        bottom: 20px;
        background-color: #3296fa;
      }
    }
    .wap-nav-placeholder {
      width: 33px;
      flex-shrink: 0;
    }
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .9;
      z-index: 99;
      .van-icon {
        font-size: 24px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 43px;
        background: url("./line.png") no-repeat;
        background-size: contain;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
