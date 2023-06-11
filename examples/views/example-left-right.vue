<template>
<div>
  <div class="h1">左右布局 sy-left-right</div>
  <div class="mt30">
    <sy-left-right width="500">
      <template v-slot:left><div>left content</div></template>
      <template v-slot:right><div>right content</div></template>
    </sy-left-right>
  </div>
  <div class='mt30'>我们时常会遇到左右布局的场合，比如标题栏左面是icon，右面是button，每次都写相同的样式很烦，做一个组件，提供 left和right的两个slot</div>
  <div class="mt30">支持width 和 left-width 两个props， 纯数字， 单位为px。默认样式是100% 和 平分</div>
</div>
</template>