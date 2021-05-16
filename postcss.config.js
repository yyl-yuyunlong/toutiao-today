/**
 * PostCSS的配置文件
 * PostCSS是基于 Node.js 运行的一个处理 CSS 的工具
 * 所以它的配置文件也是运行在 Node.js 中
 */
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    // VueClI 已经在内部默认配置了 autoprefixer
    /* autoprefixer: {
    // browsers 用来配置要兼容到的系统（浏览器）环境
      // 但VueClI 已经通过 .browserslistrc 文件配置了要兼容的环境信息了
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    // 把 px 转为 rem
    'postcss-pxtorem': {
      // 转换的根元素的基准值 正常情况下按照你的设计稿来
      // 750 宽的设计稿：750 / 10 = 75 375 宽的设计稿：375 / 10 = 37.5
      // vant 组件是基于逻辑像素 375 宽写的 移动端页面一般都是以 iPhone 6/7/8 为原型设计的
      // 所以 设置值为 75，就可以按照设计稿中的测量的像素直接写 但是 vant 的样式会变小
      // 所以必须设置值为 37.5 但设计稿中的测量的要 /2
      rootValue: 37.5,
      // 需要转换的 CSS 属性 .* 就是所有属性都要转换
      propList: ['*']
    }
  }
}
