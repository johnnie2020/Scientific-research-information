const { defineConfig } = require('@vue/cli-service')
// 使用@vue、cli-servic提供的defineConfig帮手函数，以获得更好地类型提示
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'nav-bar-background-color': '#007bff',
            'nav-bar-title-text-color': '#fff',
            'tabs-bottom-bar-color': '#007bff'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          }
        }
      }
    }
  }
})
