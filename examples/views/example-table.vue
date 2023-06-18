<template>
<div class="tsy-table-example-main">
  <m-viewer :markdown="content"/>

  <p> 
    <sy-table :columns="tableColumn" :data="tableData" @sort="sorterChanged" style="width: 1000px">
      <template v-slot:third="scope">{{scope.row.third}}</template>
    </sy-table>
  </p>
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
          </template>
        </template>
      </sy-table>
    </div>
    <div class="mt100">
      <div class="h2">Events</div>
      <sy-table :columns="eventTableColumns" :data="eventTableData"></sy-table>
    </div>
  </div>
</div>
</template>

<script>
import Utils from "../../packages/utils";
import ColumnDefineComment from "./components/column-define-object-comment.vue";
import commentMixin from "../mixins/comment-mixins.js";

export default {
  name: "SyTableExample",
  mixins: [commentMixin],
  components: {
    ColumnDefineComment,
  },
  created() {
    this.content = `# 基础Table sy-table
数据化的table

\`\`\` html
<sy-table :columns="tableColumn" 
          :data="tableData" 
          @sort="sorterChanged" 
          style="width: 1000px">
  <template v-slot:third="scope">{{scope.row.third}}</template>
</sy-table>
\`\`\`

\`\`\` javascript
computed: {
  tableData() {  // 用于展示的数据
    return [
      {
        first: Utils.randomStr(20),  // 列first
        second: Utils.randomStr(30), // 列second
        third: Utils.randomStr(),    // 列third
      },
      {
        first: Utils.randomStr(30),
        second: Utils.randomStr(50),
        third: Utils.randomStr(),
      },
      ....
      {
        first: Utils.randomStr(20),
        second: Utils.randomStr(40),
        third: Utils.randomStr(),
      },
    ];
  },
  tableColumn() {   // 列定义
    return [
      {
        label: "第一列",     // 列的展示名称 
        prop: "first",       // 通过prop first 在行数据中取值
        sorter: "diyilie",   // 排序用的关键字
        width: 220,          // 列宽度
      },
      {
        label: "第2列",
        getContent(data) {    // 接受当前的行数据data， 返回值用来展示，可以组合多列内容，或者数据加工
          return data.row.second;
        },
        width: "20%",         // 列宽度
        sorter: "dierlie",
      },
      {
        label: "第三列", 
        slot: "third",        // 第3列使用命名插槽实现， 插槽名为 third， 方便通过html模板开发 复杂的交互 按钮
      },
    ];
  },
},
\`\`\`
    `

    this.eventTableData = [
      {
        name: "sort",
        comment: "在列定义中通过sorter指定列key后，该列就可以触发sort事件，会把列key和order作为事件参数传入",
      },
    ];

    this.propTableData = [
      {
        name: "columns",
        type: "Array<Column>",
      },
      {
        name: "data",
        type: "Array[Object]",
        comment: "数组的每个元素代表一行",
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
      {
        name: "index-base",
        type: "Number(1)",
        comment: "行号起始值，默认值1，当处理分页的时候，可以指定这个值。",
      },
    ];
  },
  computed: {
    tableData() {
      return [
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(50),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(20),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(50),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(35),
          second: Utils.randomStr(25),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
      ];
    },
    tableColumn() {
      return [
        {
          label: "第一列",
          prop: "first",
          sorter: "diyilie",
          width: 220,
        },
        {
          label: "第2列",
          getContent(data) {
            return data.row.second;
          },
          width: "20%",
          sorter: "dierlie",
        },
        {
          label: "第三列",
          slot: "third",
        },
      ];
    },
  },
  methods: {
    sorterChanged(sorter) {
      console.log(sorter);
    },
  },
};
</script>

<style>
.tsy-table-example-main {
  padding: 0 0 120px 0;
}
</style>

