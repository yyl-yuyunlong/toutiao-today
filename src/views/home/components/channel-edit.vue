<template>
  <div class="channel-container">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title-wrap" slot="title">
        <span class="title">我的频道</span>
        <span class="tip">点击进入频道</span>
      </div>
      <van-button
        type="danger"
        plain
        size="mini"
        round
        @click="isEdit = !isEdit"
        color="#e5615b"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>

    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        @click="onChannelActiveOrDelete(channel, index)"
      >
        <span class="text"
         :class="{ active: active === index }"
        >{{ channel.name }}</span>
        <van-icon
          v-show="isEdit && channel.name !== '推荐'"
          class="close-icon"
          name="close"
        />
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div class="title-wrap" slot="title">
        <span class="title">推荐频道</span>
        <span class="tip">点击添加频道</span>
      </div>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        @click="onChannelAdd(channel)"
      >
        <span class="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /推荐频道 -->
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: [] // 所有频道列表
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.userChannels.find(userItem => userItem.id === item.id)
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    onChannelActiveOrDelete (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        // 编辑状态，执行删除操作
        // this.userChannels.splice(index, 1)
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index)
        this.$emit('close')
      }
    },
    async deleteChannel (channel, index) {
      try {
        if (this.user) {
          // 已登录，删除线上数据
          await deleteChannel(channel.id)
          this.userChannels.splice(index, 1)
        } else {
          // 未登录，删除本地数据
          this.userChannels.splice(index, 1)
          setItem('channels', this.userChannels)
        }
        // 如果删除的是当前激活频道前面的频道，则更新激活频道
        if (index <= this.value) {
          this.$emit('input', this.value - 1)
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败，请稍后重试')
      }
    },
    async onChannelAdd (channel) {
      try {
        this.userChannels.push(channel)
        if (this.user) {
          // 已登录，将数据存储到线上
          await addChannel([{
            id: channel.id, // 频道 id
            seq: this.userChannels.length // 频道的 序号
          }])
        } else {
          // 未登录，将数据存储到本地
          setItem('channels', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('添加失败,请稍后重试')
      }
    },
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.title-wrap {
  .title {
    margin-right: 10px;
    font-size: 16px;
  }
  .tip {
    font-size: 12px;
    color: #ccc;
  }
}
.channel-item {
  height: 43px;
   .van-grid-item__content {
    background: #f4f5f6;
  }
  .text {
    font-size: 14px;
    color: #222;
  }
  /deep/ .active {
    color: #e5615b;
  }
  .close-icon {
    font-size: 15px;
    position: absolute;
    right: -3px;
    top: -4px;
  }
}
</style>
