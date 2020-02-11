<template>
  <div class="demo-split">
    <Split v-model="leftRightSplit" min="280px">
      <div slot="left" class="demo-split-pane">
        <!-- 左：菜单树列表组件 -->
        <MenuTreePageComponent
          ref="MenuPageComponentRef"
          v-on:clickMenuTreeNode2ParentEvent="clickMenuTreeNode2ParentEvent"
        ></MenuTreePageComponent>
      </div>

      <div slot="right" class="demo-split-pane">
        <!-- 右上：系统或菜单详情组件 -->
        <div>系统或菜单详情组件</div>

        <br />

        <!-- 右下: 子菜单列表或按钮组件  -->
        <div>子菜单列表组件</div>
      </div>
    </Split>
  </div>
</template>
  

<script>
import { setToken, getToken, removeArrayElement } from "@/libs/util.js";
import MenuTreePageComponent from "_p/userManager/menu/menuTreePage.vue";

export default {
  components: { MenuTreePageComponent },
  data() {
    return {
      leftRightSplit: 0.2
    };
  },

  methods: {
    clickMenuTreeNode2ParentEvent(node) {
      // 查询右上侧菜单详情TODO
      console.log(JSON.stringify(node));
    },


  },

  /**
   * 初始化页面 页面加载的时候执行
   */
  created() {}
};
</script>

<style>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
