<template>
<div class="tsy-form-mixin-example">
  <m-viewer :markdown="c1"/>

  <div class="mt100 mb100">基于form-mixins的例子入口
    <button @click="goto(&quot;user-form-new&quot;)">新建</button>
    <button @click="goto(&quot;user-form-update&quot;, {params: {id:123}})">编辑</button>
  </div>
</div>
</template>

<script setup>
const c1 = `# FormMixin

通常新建 和 编辑 表单 的 layout 和 行为 都 高度雷同， 而且每个页面 新建 和 编辑 表单 的行为也 高度雷同， 对相同的 数据加载、数据验证、表单提交 做了统一的分装。
大大提升表单页面的开发效率。


## 核心form
首先你需要开发一个核心form，这里定义了表单的layout，注册了表单验证逻辑， 最后 通过mixin 混入了 FormMixins，从而获得了 表单能力。

user-form.vue
\`\`\` html
<template>
  <div class="tsy-form-mixin-example-main-form" v-loading="locking">
    <el-form :model="modified" label-width="80px" ref="formRef" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input class="w400" :disabled="!!id" v-model.trim="modified.name" show-word-limit="show-word-limit" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="modified.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input class="w300" v-model.trim="modified.phone" show-word-limit="show-word-limit" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input class="w400" v-model.trim="modified.email" show-word-limit="show-word-limit" :maxlength="120"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="modified.birth" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="apply">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
\`\`\`

\`\`\` javascript
import tsy from '/packages'
const {
  FormMixin
} = tsy

export default {
  mixins: [FormMixin],
  created() {
    this.rules = {
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
      ],
      phone: [
        { required: true, message: "请输入电话号码", trigger: "blur" },
        {
          min: 5,
          max: 20,
          message: "电话号码必须在在 5 到 20 个字符之间",
          trigger: "blur",
        },
      ],
    };
  },
  data() {
    return {
      modified: {
        name: "",
        gender: "1",
        phone: "",
        email: "",
        wechat: "",
      },
    };
  },
  methods: {
    beforePost(data) {
      if (data.phone) {
        data.phone = data.phone.replace(/\\s/g, "");
      }
      return data;
    },
    dataLoaded(data) {
      data.gender = \`\${data.gender}\`;
      return data;
    },
    submitted() {
      this.goto("form-mixin");
    },
    cancel() {
      this.goto("form-mixin");
    },
    
  },
}
\`\`\`


## 新建表单
user-form-new.vue
\`\`\` html
<template>
  <div class="user-form-new-main">
    <div class="h1">新建用户 表单展示</div>
    <user-form url="/member"></user-form>
  </div>
</template>
\`\`\` 

\`\`\` javascript
import UserForm from "./user-form.vue";

export default {
  components: {
    UserForm,
  },
};
\`\`\`


## 编辑表单
user-form-update.vue
\`\`\` html
<template>
  <div class="user-form-update-main">
    <div class="h1">编辑用户表单展示</div>
    <user-form v-if="memberId" url="/member" :id="\`\${memberId}\`" :mock="mockData" get-data-url='/get/data/url/menber'></user-form>
    <div class="no-member-id-panel" v-else>无法获得会员ID</div>
    <div class="mt100">因为没有后端，所以数据拉取的/member/:id会404，我在axios上实现了一个mock数据的方式，这里在404后使用的是mock数据填充的表单。</div>
  </div>
</template>
\`\`\`

\`\`\` javascript
import UserForm from "./user-form.vue";
export default {
  components: {
    UserForm,
  },
  computed: {
    memberId() {
      return this.$route.params.id;
    },
    mockData() {
      return {
        name: 'tsy',
        gender: 1,
        phone: '18XXXXX5821',
        email: 'lshxqwww@gmail.com',
        birth: '1983-6-5'
      }
    }
  },
};
\`\`\`



下载例子工程，亲自体验一下这种开发模式。
[https://github.com/lshxq/examples_tsyvue](https://github.com/lshxq/examples_tsyvue)


|钩子函数|说明|
|-|-|
|dataLoaded|在编辑的场合，当待编辑数据加载后，会先调用这个函数用来数据处理，可能会牵扯到数据变形。默认行为是直接返回服务器的数据。|
|beforePost|在提交数据时调用，接受的待提交的数据，期待返回处理后的数据，用于提价前数据变形，以满足接口要求。默认行为是不做任何处理。|
|submitted|数据提交完成后 的处理，默认不做任何操作。通常是用来页面迁移|
|serverError|在调用接口时，接口返回失败，默认打印了错误信息。|
`

</script>