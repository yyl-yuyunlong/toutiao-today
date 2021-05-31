<template>
    <div class="update-gender">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        :default-index="defaultIndex"
        @change="onGenderChange"
      />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 请求提交更新用户性别
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
</style>
