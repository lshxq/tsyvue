<template>


<div class="pagin-data-example-main">
  <axios-required></axios-required>

  <m-viewer :markdown="c1"/>

  <sy-left-right left-width="600">
    <template v-slot:left>
      <div class="criteria-bar">
        <input class="w200" v-model="query.keyword"/>&nbsp;
        <select class="w200" v-model="query.status">
          <option label="启动" value="up"></option>
          <option label="停止" value="down"></option>
        </select>
      </div>
    </template>
    <template v-slot:right>
      <span class="red bold">检索条件区域</span>
    </template>
  </sy-left-right>
  
  <sy-left-right left-width="600">
    <template v-slot:left>
      <sy-pagin-data url="/user/list" :query="query" :mock="mockDataFunc" :pagin-data-mapper="paginDataMapper" style="width: 500px">
        <template v-slot:="scope"> 
          <div class="data-row" v-for="(row, idx) of scope.data" :key="idx">{{row}}</div>
        </template>
      </sy-pagin-data>
    </template>
    <template v-slot:right>
      <div class="red bold">数据展示区</div>
    </template>
  </sy-left-right>
  

  <div> 
    <div class="mt100">
      <div class="h2">Props</div>
      <sy-table :columns="propTableColumns" :data="propTableData">
        <template v-slot:comment="scope"> 
          <template v-if="scope.row.comment">{{scope.row.comment}}</template>
          <template v-else>
            <template v-if="scope.row.name == &quot;columns&quot;">
              <column-define-comment></column-define-comment>
            </template>
            <template v-if="scope.row.name == &quot;pagin-data-mapper&quot;">
              <pagin-data-mapper-comment></pagin-data-mapper-comment>
            </template>
          </template>
        </template>
      </sy-table>
    </div>
  </div>
  <div class="mt100">
    <div class="h2">Events</div>
    <sy-table :columns="eventTableColumns" :data="eventTableData"></sy-table>
  </div>
</div>
</template>

<script>
import axiosRequired from "./components/axios-required.vue";
import commentMixin from "../mixins/comment-mixins.js";
import paginDataMapperComment from "./components/pagin-data-mapper-comment.vue";

export default {
  components: {
    paginDataMapperComment,
    axiosRequired,
  },
  mixins: [commentMixin],
  data() {
    return {
      query: {
        keyword: "keyword",
        status: "",
      },
    };
  },
  created() {
    this.c1 = `# 分页数据组件 sy-pagin-data
\`\`\` html
<div class="criteria-bar">
  <input class="w200" v-model="query.keyword"></input>&nbsp;
  <select class="w200" v-model="query.status">
    <option label="启动" value="up"></option>
    <option label="停止" value="down"></option>
  </select>
</div>
<sy-pagin-data url="/user/list" :query="query" :mock="mockDataFunc" :pagin-data-mapper="paginDataMapper" style="width: 800px">
  <template v-slot:="scope"> 
    <div class="data-row" v-for="(row, idx) of scope.data" :key="idx">{{row}}</div>
  </template>
</sy-pagin-data>
\`\`\`

上面代码中， div.criteria-bar 定义检索框, 检索条件 query 都是通过 v-model双向绑定到 data中，之后把query传给 sy-pagin-data 实现自动 检索。

sy-pagin-data 把query对象提交给 指定的url自动拉取当前页数据， 并把服务器返回的数据 并定到 未命名 插槽上 v-slot:="scope"。

url: 返回数据的接口地址。
接口应为get请求，如果不是，可以通过传入requestMethod:String 指定请求方法
接口应返回这样的数据格式。
\`\`\` javascript
{
  data: Array, // 检索结果的集合
  total: Number // 匹配检索条件的记录总数
}
\`\`\`
如果服务器返回数据接口不满足上面的要求，可以通过传入respDataMapper:Function 对返回的数据做处理,并返回处理结果
组件会在url的请求参数中自动添加pageNo:Number(当前页码) 和 pageSize:Number(请求数据数)，如果后端接口使用的不是这两个名称，可以通过传入paginDataMapper:Function 来替换成相应的名称。
    `

    this.eventTableData = [
      {
        name: "data-loaded",
        comment: "分页数据加载完成后触发，并把服务器返回结果作为参数返回。",
      },
    ];

    this.propTableData = [
      {
        name: "url",
        type: "String",
        comment: "检索接口的地址",
      },
      {
        name: "request-method",
        type: "String('GET')",
        comment: "调用接口的请求方法,默认为GET",
      },
      {
        name: "query",
        type: "Plain Object",
        comment: "检索条件对象，发起ajax请求时作为参数传给后端",
      },
      {
        name: 'paginator-layout',
        type: 'String',
        comment: '配置分页器的布局，参考 element-ui的pagination的layout属性，默认值 total, sizes, prev, pager, next, jumper'
      },
      {
        name: "pagin-data-mapper",
        type: "Function",
      },
      {
        name: "resp-data-mapper",
        type: "Function",
        comment:
          "服务器返回的应答，在传入slot之前，会通过这个钩子函数处理，参数是原始应答数据，返回值是处理后的结果。",
      },
    ];


    this.mockDataFunc = (cfg) => {
      console.log(cfg);
      const { params } = cfg;
      const { pageNo, pageSize } = params;
      const data = [];
      for (let idx = 0; idx < pageSize; idx++) {
        data.push({
          name: `${pageNo} name`,
          gender: `${pageNo} gender`,
          age: `${pageNo} age`,
        });
      }
      return {
        data,
        total: 993,
      };
    };
    this.paginDataMapper = (data) => {
      console.log(data);
      return data;
    };
  },
};
</script>

<style lang="css" scoped>
.w200 {
  width: 200px;
}

.criteria-bar {
  margin-bottom: 20px;
}

.data-row {
  margin-bottom: 10px;
  user-select: none;
}

.data-row:hover {
  background-color: #e0e0e0;
}

.p {
  padding: 10px;
}
</style>
