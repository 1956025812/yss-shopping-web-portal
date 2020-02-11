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
        <!-- 右上：页面详情组件 -->
        <div>
          <MenuDetailPageComponent ref="MenuDetailPageComponentRef"></MenuDetailPageComponent>
        </div>

        <br />

        <!-- 右下: 子菜单列表  -->
        <div>
          <MenuChildrenPageComponent ref="MenuChildrenPageComponentRef"></MenuChildrenPageComponent>
        </div>
      </div>
    </Split>
  </div>
</template>
  

<script>
import { setToken, getToken, removeArrayElement } from "@/libs/util.js";
import MenuTreePageComponent from "_p/userManager/menu/menuTreePage.vue";
import MenuDetailPageComponent from "_p/userManager/menu/menuDetailPage.vue";
import MenuChildrenPageComponent from "_p/userManager/menu/menuChildrenPage.vue";

export default {
  components: {
    MenuTreePageComponent,
    MenuDetailPageComponent,
    MenuChildrenPageComponent
  },
  data() {
    return {
      leftRightSplit: 0.2
    };
  },

  methods: {
    /**
     * 点击菜单树节点事件
     */
    clickMenuTreeNode2ParentEvent(node) {
      // 查询右上侧菜单详情
      this.$options.methods.selectMenuDetail.bind(this)(node);

      // 查看右下侧子菜单列表
      this.$options.methods.selectMenuChildrenList.bind(this)(node);
    },

    /**
     * 查看菜单详情
     */
    selectMenuDetail(node) {
      this.$refs.MenuDetailPageComponentRef.selectMenuDetail(node);
    },

    /**
     * 查看子菜单列表
     */
    selectMenuChildrenList(node) {
      this.$refs.MenuChildrenPageComponentRef.selectMenuChildrenList(node);
    }
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
