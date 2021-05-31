<template>
  <div class="user-profile">
      <!-- 导航栏 -->
      <van-nav-bar
        class="app-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- /导航栏 -->
      <input
       type="file"
       hidden
       ref="file"
       accept="image/*"
       @change="onFileChange"
       />
      <!-- 单元格 -->
      <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image
          width="30"
          height="30"
          round
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isEditNameShow = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="user.gender === 0 ? '男' : '女'"
        @click="isEditGenderShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
        @click="isEditBirthdayShow = true"
      />

      <!-- 修改昵称-->
      <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!--
          当传递给子组件的数据既要使用又要修改时，
          这时可以使用 v-model 简写
          :name="user.name"
          @update-name="user.name = $event"
          v-model 只能使用一次
          如果用多个数据需要保持同步，就使用 .sync 修饰符
          例如  :gender.sunc="user.gender"
        -->
        <update-name
        v-if="isEditNameShow"
          v-model="user.name"
          @close="isEditNameShow = false"
        />
      </van-popup>
      <!-- /修改昵称 -->

      <!-- 修改性别 -->
      <van-popup
        v-model="isEditGenderShow"
        position="bottom"
      >
      <update-gender
       @close="isEditGenderShow = false"
       v-model="user.gender"
      />
      </van-popup>
      <!-- /修改性别 -->

      <!-- 修改生日 -->
      <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
      >
      <update-brithday
       @close="isEditBirthdayShow = false"
       v-model="user.birthday"
       v-if="isEditBirthdayShow = false"
      />
      </van-popup>
      <!-- /修改生日 -->

      <!-- 修改头像 -->
      <van-popup
        class="update-photo-popup"
        v-model="isEditPhotoShow"
        position="bottom"
        style="height: 100%"
      >
      <update-photo
      v-if="isEditPhotoShow"
       :file="previewImage"
       @close="isEditPhotoShow = false"
       @update-photo="user.photo = $event"
      />
      </van-popup>
      <!-- /修改头像-->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBrithday from './components/update-brithday'
import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBrithday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 控制编辑用户昵称的显示状态
      isEditGenderShow: false, // 控制编辑用户性别的显示状态
      isEditBirthdayShow: false, // 控制编辑用户生日的显示状态
      isEditPhotoShow: false, // 控制编辑用户头像的显示状态
      previewImage: null // 上传预览图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      console.log(data)
      this.user = data.data
    },
    onFileChange () {
      // 展示弹出层
      this.isEditPhotoShow = true
      // 在弹出层内预览图片
      /* const blob = window.URL.createObjectURL(this.$refs.file.files[0]) */
      const file = this.$refs.file.files[0]
      /* this.previewImage = blob */
      this.previewImage = file
      // 为了解决相同文件不触发 change 事件，所以这里手动清空 file 中的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}

</style>
