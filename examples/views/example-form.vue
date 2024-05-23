<template>


<div class="examples-sy-form-main">
  <div>这个组件需要是element-ui的扩展，需要el-form等一些列组件的支持，只能在有element-ui的环境下使用。</div>
  <div>除了form-mixins,我们还可以直接通过纯数据的方式构造表单。</div>
  <p>form-mixin 需要自己构建layout，这样比较灵活，但是不利于统一的表单样式，而且开发layout也是有成本的。</p>
  <div>为了进一步减轻页面的开发成本，我提供了基于数据的sy-form。使用该组件只要通过inputs传入表单内容即可。
    <div class="code-block"> 
      <div class="intend">// 新建场合</div>
      <div class="intend">sy-form(:inputs='formInputs' 
        <div class="intend">url='/example/form/url'</div>
        <div class="intend">@submitted='formSubmitted'</div>
        <div class="intend">@canceled='formCanceled')</div>
      </div>
    </div>
    <div class="code-block mt20">
      <div class="intend">// 编辑场合，传入ID</div>
      <div class="intend">sy-form(:inputs='formInputs' 
        <div class="intend">id='test'</div>
        <div class="intend">url='/example/form/url'</div>
        <div class="intend">:data-loaded-handler='dataLoadedHandler'</div>
        <div class="intend">:before-post-handler='beforePostHandler'</div>
        <div class="intend">@submitted='formSubmitted'</div>
        <div class="intend">@canceled='formCanceled')</div>
      </div>
    </div>
    <p>formInputs 定义了表单的输入项目</p>
    <m-viewer :markdown="formInputsCode"/>
    <p><img src="../assets/form-inputs.jpg"/></p>
    <p>目前支持的input如下</p>
    <ul> 
      <li>input, 标准el-input的输入框，支持el-input的常用属性透传，如placeholder，maxlength等 </li>
      <li>options，options具体配置参考 sy-options，主要是能根据url初始化备选项，能指定单选多选多种外观。</li>
      <li>datepicker， 日期选择器</li>
    </ul>
    <div class="mt100">
      <div class="h2">Props</div>
      <sy-table :columns="propTableColumns" :data="propTableData">
        <template v-slot:comment="scope"> 
          <template v-if="scope.row.comment">{{scope.row.comment}}</template>
          <template v-else-if="scope.row.name == &quot;url&quot;">
            <p>后端接口的基础地址, </p>
            <p>新建：最终会以post方式提交到url指定位置</p>
            <p>编辑：首先通过get的方式 在url/id的位置拉取待编辑数据。最后会以patch的方式，在url/id的位置提交增量更新数据。</p>
          </template>
        </template>
      </sy-table>
    </div>
    <div class="mt100">
      <div class="h2">Events</div>
      <sy-table :columns="eventTableColumns" :data="eventTableData"></sy-table>
    </div>
    <div class="mt100">通过下面入口进入表单的用例 
      <sy-button @click="goto(&quot;sy-form-create&quot;)" type="primary">新建表单</sy-button>
      <sy-button @click="goto(&quot;sy-form-update&quot;)" type="primary">编辑表单</sy-button>
    </div>
    <div class="mt100"> 
      <div class="h2">Inputs定义</div>
      <p>通过一个json对象来描述input，</p>
      <div class="code-block">
        <div class="intend">{
          <div class="intend">type: String, // 可选值 input（输入框）, options(备选项),datepicker(日期选择器) </div>
          <div class="intend">name: String, // model中的名字，待编辑字段的名字</div>
          <div class="intend">value: String, // 该字段默认值</div>
          <div class="intend">label: String, // 该字段在表单中展示的名称</div>
          <div class="intend">meta: Object    // 用于配置该输入框的附件信息，每种输入框的附加信息不同。</div>
        </div>
        <div class="intend">}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommnetMixins from '../mixins/comment-mixins.js'
export default {
  mixins: [CommnetMixins],
  created() {
    this.formInputsCode = `
# 新建表单的例子
\`\`\` html
<div class="tsy-example-form-create-main">
  <div class="h2">新建表单用例</div>
  <sy-form :inputs="formInputs" url="/example/syform/submit-url" @submitted="createSubmitted" @canceled="createCanceled"></sy-form>
</div>
\`\`\`


\`\`\` javascript
export default {
  created() {
    this.formInputs = [
      {
        type: "input",
        name: "xingming",
        value: "tsy",
        label: "姓名",
        meta: {
          placeholder: "请输入姓名",
          width: 300,
          maxlength: 30,
        },

        rule: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      {
        type: "options",
        name: "gender",
        value: "male",
        label: "性别",
        meta: {
          url: "/example/gender/options",
          type: 2,
          mock() {
            return [
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ];
          },
        },
      },
      {
        type: "options",
        name: "xueli",
        value: "bachelor",
        label: "学历",
        meta: {
          options: [
            {
              label: "中学",
              value: "highschool",
            },
            {
              label: "大专",
              value: "college",
            },
            {
              label: "大学（本科）",
              value: "bachelor",
            },
            {
              label: "研究生",
              value: "master",
            },
          ],
        },
      },
      {
        type: "options",
        kind: 2,
        name: "xingqu",
        label: "兴趣",
        meta: {
          url: "/example/xingqu/options",
          type: 2,
          multiple: true,
          mock() {
            return [
              {
                label: "篮球",
                value: "lanqiu",
              },
              {
                label: "足球",
                value: "zuqiu",
              },
              {
                label: "乒乓",
                value: "pingpang",
              },
            ];
          },
        },
      },
      {
        type: "options",
        name: "gangwei",
        label: "岗位",
        meta: {
          url: "/example/gangwei/options",
          multiple: true,
          mock() {
            return [
              {
                label: "前端工程师",
                value: "FE",
              },
              {
                label: "后端工程师",
                value: "BE",
              },
              {
                label: "技术经理",
                value: "MGR",
              },
            ];
          },
        },
      },
      {
        type: "datepicker",
        name: "birthday",
        label: "生日",
        value: "1983-7-4",
      },
    ];
  },
  methods: {
    createSubmitted(data) {
      console.log(data)
      this.$message.success('新建表单提交完成')
    },
    createCanceled() {
      this.$message.error('新建表单取消了')
      setTimeout(() => {
        this.goto("sy-form")
      }, 1500)
    },
  }
};
\`\`\`

# 编辑表单的例子
\`\`\` html
<div class="tsy-example-form-update-main">
  <div class="h2">编辑表单用例</div>
  <sy-form :inputs="formInputs" id="test" url="/example/syform/submit-url" :data-loaded-handler="dataLoadedHandler" :before-post-handler="beforePostHandler" :mock="loadDataMock" @submitted="updateSubmitted" @canceled="updateCanceled"></sy-form>
</div>
\`\`\`


\`\`\` javascript
export default {
  created() {
    this.loadDataMock = {
      xingming: 'TSYVUE',
      gender: 'female',
      xueli: 'bachelor',
      xingqu: ['lanqiu', 'zuqiu'],
      gangwei: 'MGR',
      birthday: '2022-3-23'
    }
    this.formInputs = [
      {
        type: "input",
        name: "xingming",
        value: "tsy",
        label: "姓名",
        meta: {
          placeholder: "请输入姓名",
          width: 300,
          maxlength: 30,
        },

        rule: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      {
        type: "options",
        name: "gender",
        value: "male",
        label: "性别",
        meta: {
          url: "/example/gender/options",
          type: 2,
          mock() {
            return [
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ];
          },
        },
      },
      {
        type: "options",
        name: "xueli",
        value: "bachelor",
        label: "学历",
        meta: {
          options: [
            {
              label: "中学",
              value: "highschool",
            },
            {
              label: "大专",
              value: "college",
            },
            {
              label: "大学（本科）",
              value: "bachelor",
            },
            {
              label: "研究生",
              value: "master",
            },
          ],
        },
      },
      {
        type: "options",
        kind: 2,
        name: "xingqu",
        label: "兴趣",
        meta: {
          url: "/example/xingqu/options",
          type: 2,
          multiple: true,
          mock() {
            return [
              {
                label: "篮球",
                value: "lanqiu",
              },
              {
                label: "足球",
                value: "zuqiu",
              },
              {
                label: "乒乓",
                value: "pingpang",
              },
            ];
          },
        },
      },
      {
        type: "options",
        name: "gangwei",
        label: "岗位",
        meta: {
          url: "/example/gangwei/options",
          multiple: true,
          mock() {
            return [
              {
                label: "前端工程师",
                value: "FE",
              },
              {
                label: "后端工程师",
                value: "BE",
              },
              {
                label: "技术经理",
                value: "MGR",
              },
            ];
          },
        },
      },
      {
        type: "datepicker",
        name: "birthday",
        label: "生日",
        value: "1983-7-4",
      },
    ];
  },
  methods: {
    updateSubmitted(data) {
      console.log(data)
      this.$message.success('编辑表单提交完成')
    },
    updateCanceled() {
      this.$message.error('编辑表单取消了')
      setTimeout(() => {
        this.goto("sy-form")
      }, 1500)
    },
    dataLoadedHandler(data) {
      this.$message.info('数据加载完成' + JSON.stringify(data))
      return data
    }, 
    beforePostHandler(data) {
      this.$message.info('加工提交数据' + JSON.stringify(data))
      return data
    }
  }
};
\`\`\`
`

    this.propTableData = [
      {
        name: 'url',
        type: 'String',
      },
      {
        name: 'inputs',
        type: 'Array[Input]',
        comment: '表单输入项目的定义数组，关于输入项目定义，本文底部的说明'
      },
      {
        name: 'id',
        type: 'String',
        comment: '待编辑数据的ID，如果指定了ID，表单改为编辑模式，默认是新建模式，两个模式的提交方式不一样，新建是以POST方式全量提交，编辑是以Patch方式增量提交。'
      },
      {
        name: 'data-loaded-handler',
        type: 'Function',
        comment: '在编辑模式下，会通过get方式在url/id的位置拉取待编辑数据，但是数可能和表单要求的数据格式不一样，这时候需要做数据变形，通过传入这个函数，可以在数据填充页面之前，进行数据变形，接收接口返回的数据，并返回处理后的数据。'
      },
      {
        name: 'before-post-handler',
        type: 'Function',
        comment: '表单数据提交之前，通过这个函数完成数据变形，以满足接口要求。表单数据的格式可能和接口要求的格式不一致，这时候可以通过这个函数做提交前的数据处理'
      }
    ]
    this.eventTableData = [
      {
        name: 'submitted',
        comment: '当表单完成验证，提交后端后，如果后端返回正常（http 2XX），则触发这个事件，并把后端返回作为参数传过来。开发者可以在这里做页面迁移等动作。'
      },
      {
        name: 'canceled',
        comment: '当用户点击取消按钮时触发这个事件。'
      }
    ]
  },
  methods: {
    
  }
};
</script>
