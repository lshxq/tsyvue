<template>
<div class="pagin-table-example-main">
  <axios-required></axios-required>

  <m-viewer :markdown="c1"/>

  <div class="criteria-bar mb10">
    <input class="w200" v-model="query.keyword"/>&nbsp;
    <select class="w200" v-model="query.status">
      <option label="启动" value="up"></option>
      <option label="停止" value="down"></option>
    </select>
  </div>
  <sy-pagin-table url="/pagin/table/example" :query="query" :mock="mockDataFunc" :columns="columns" style="width:1000px" @data-loaded="dataLoaded" paginator-layout='total, sizes, prev, pager, next, jumper'>
    <template v-slot:age="scope">{{scope.data.row.age}}</template>
  </sy-pagin-table>
  
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
            <template v-if="scope.row.name == &quot;resp-data-mapper&quot;">
              <resp-data-mapper-comment> </resp-data-mapper-comment>
            </template>
          </template>
        </template>
      </sy-table>
    </div>
    <div class="mt100 mb100">
      <div class="h2">Events</div>
      <sy-table :columns="eventTableColumns" :data="eventTableData"></sy-table>
    </div>
  </div>
</div>
</template>

<script>
import ColumnDefineComment from "./components/column-define-object-comment.vue";
import commentMixin from "../mixins/comment-mixins.js";
import respDataMapperComment from "./components/pagin-table-resp-data-mapper-comment.vue";
import paginDataMapperComment from "./components/pagin-data-mapper-comment.vue";
import axiosRequired from "./components/axios-required.vue";

export default {
  components: {
    ColumnDefineComment,
    respDataMapperComment,
    paginDataMapperComment,
    axiosRequired,
  },
  mixins: [commentMixin],
  data() {
    return {
      query: {
        keyword: "关键字",
      },
    };
  },
  created() {
    this.c1 = `# 分页Table sy-pagin-table
因为大部分的查询页面是以表格的形式绘制的数据，所以把sy-pagin-data 和 sy-table 做了一下融合，形成了sy-pagin-table，支持的props 就是这两个组件的合集。

\`\`\` html
<div class="criteria-bar mb10">
  <input class="w200" v-model="query.keyword"></input>&nbsp;
  <select class="w200" v-model="query.status">
    <option label="启动" value="up"></option>
    <option label="停止" value="down"></option>
  </select>
</div>
<sy-pagin-table url="/pagin/table/example" :query="query" :mock="mockDataFunc" :columns="columns" style="width:1000px" @data-loaded="dataLoaded" paginator-layout='total, sizes, prev, pager, next, jumper'>
  <template v-slot:age="scope">{{scope.data.row.age}}</template>
</sy-pagin-table>
\`\`\`

在vue实例上绑定列定义
\`\`\` javascript
this.columns = [
  {
    label: "姓名",
    prop: "name",
    sorter: 'name'     // 这列可以排序，会上报指定 名称 作为排序条件 ， sorter=+name 或 sorter=-name 
  },
  {
    label: "性别",
    getContent(data) {
      return data.row.gender;
    },
    sorter: 'gender'
  },
  {
    label: "年龄",
    slot: "age",
  },
];
\`\`\`
如果在列定义中指定了sorter，那么sy-pagin-table会在该列上生成排序器， 并根据排序器状态，自动向后端接口上报 排序 信息。 排序信息作为 请求参数 以如下形式上报
sort=(+/-)sorkKey
其中减号代表降序，加号为升序，sortKey就是在列定义中指定的内容， sort=-name，表示按照名称降序排列，后端接口需要做对应处理
sort=-birthay 表示按照生日降序排列

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
        name: "columns",
        type: "Array<Column>",
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
      },
      {
        name: "stripe",
        type: "Boolean(true)",
        comment:
          "是否 在行号 为偶数的 行 显示背景色，隔行高亮， 斑马线，默认显示斑马线",
      },
      {
        name: "show-index",
        type: "Boolean(true)",
        comment: "是否 显示 行号，默认是显示",
      },
    ];

    this.columns = [
      {
        label: "姓名",
        prop: "name",
        sorter: 'name'
      },
      {
        label: "性别",
        getContent(data) {
          return data.row.gender;
        },
        sorter: 'gender'
      },
      {
        label: "年龄",
        slot: "age",
      },
    ];
    this.mockDataFunc = (cfg) => {
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
      return data;
    };
  },
  methods: {
    dataLoaded(respData) {
      console.log("当前页数据", respData);
    },
  },
};
</script>

<style lang="css" scoped>
.w200 {
  width: 200px;
}

</style>
