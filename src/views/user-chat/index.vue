<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          :src="item.photo"
        />
        <div class="title">
          <span>{{ item.message }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="onSendMessage"
          >发送</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null,
      // [ { message: '消息数据', isMe: true, photo: '头像' }, ]
      messages: getItem('chat-messages') || [] // 存储所有的消息列表
    }
  },
  watch: {
    messages (newValue) {
      setItem('chat-messages', newValue)
      // 让列表滚动到最底部
      const messageList = this.$refs['message-list']

      this.$nextTick(() => {
        messageList.scrollTop = messageList.scrollHeight
      })
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')

    // 把 socket 存储到 data 中，然后就可以在 methods 中访问到了
    this.socket = socket

    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      console.log('建立连接成功！')
    })
    // 监听接收服务端消息
    socket.on('message', data => {
      console.log('收到服务器消息：', data)
      this.messages.push({
        message: data.msg,
        isMe: false,
        photo: 'http://toutiao.meiduo.site/FkBUsGwtrHKjoF0NPLzeilckol1-'
      })
    })
  },
  mounted () {
    const messageList = this.$refs['message-list']
    messageList.scrollTop = messageList.scrollHeight
  },
  methods: {
    onSendMessage () {
      const message = this.message.trim()
      if (!message) {
        return
      }

      // 发送消息
      this.socket.emit('message', {
        msg: message,
        timestamp: Date.now()
      })

      // 把消息存储到数组中
      this.messages.push({
        message,
        isMe: true,
        photo: 'https://img.yzcdn.cn/vant/cat.jpeg'
      })

      // 清空文本框
      this.message = ''
    }
  }
}
</script>
<style scoped lang="less">
  .message-list {
      position: fixed;
      left: 0;
      right: 0;
      top: 46px;
      bottom: 44px;
  }
  .send-message {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
  }
</style>
