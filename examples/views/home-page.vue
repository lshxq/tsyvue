<template>
<div class="home-main">
  <m-viewer :markdown="c1"/>
</div>
</template>

<script>
export default {
  created() {
    this.c1 = `# tsyvue 可复用高效开发包
### 安装
\`\`\` shell
npm install tsyvue
\`\`\`

### 引入依赖
\`\`\` javascript
// Vue3
import { createApp } from 'vue'
import tsyvue from 'tsyvue'

const app = createApp(App)
app.use(tsyvue)
\`\`\`

一些组件，如pagin-data、 pagin-table、form-mixin、 options 会通过 axios 拉取后端数据，请在 应用初始化时将 axios绑定到 vue实例上。
\`\`\` javascript
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = '/api'
const myMixin = {
  created() {
    this.$axios = reqCfg => {
      return new Promise((res, rej) => {
        axios(reqCfg).then(res).catch(ex => {  // 如果远程调用失败，并且 reqCfg中传入了mock， 那就返回mock 数据
          const {
            mock
          } = reqCfg
          if (mock) {
            const buildResponse = data => {
              return { // moni axios返回的数据结构
                data
              }
            }
            
            let mockData = null
            if( typeof mock === 'function') {
              mockData=buildResponse(mock(reqCfg))
            } else {
              mockData = buildResponse(mock)
            }
            setTimeout(() => {           // 延时一段时间后返回 mock 数据
              console.log('调用接口失败，采用mock数据', mockData)
              res(mockData)
            }, 1000)
          } else {
            rej(ex)
          }
        })
      })
    }
  },
  methods: {
    goto(routeName, opt) {
      this.$router.push({
        name: routeName,
        ...opt
      })
    }
  }
}

const app = createApp(App)
app.use(tsyvue)

app.use(router)
app.component('m-viewer', MarkdownViewer)
app.mixin(myMixin)
app.mount('#app')
\`\`\`


### dependency
#### lodash@^4.17.21 
#### axios@^0.18.0 
`
  },
};
</script>

<style lang="css" scoped></style>
