<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div
        slot="title"
        class="channel-title"
      >我的频道</div>
      <van-button
        size="mini"
        round
        type="danger"
        plain
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
    <van-cell :border="false">
      <div
        slot="title"
        class="channel-title"
      >频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in 68"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道数据列表
    }
  },
  computed: {
    // 推荐的频道列表
    recommendChannels () {
      // 思路: 所有频道 - 我的频道 = 剩下的推荐频道
      // filter 方法： 过滤数据，根据方法返回的布尔值 true 来收集数据
      return this.allChannels.filter(channel => {
        // 判断 channel 是否属于用户频道
        return !this.userChannels.find(userChannel => {
          // 找到满足该条件的元素
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding-top: 54px;
  .channel-title {
      font-size: 16px;
      color: #333;
  }
  .channel-item {
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
      }
    }
  }
}
</style>
