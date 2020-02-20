<template>
  <div class="demo-split">
    <Split v-model="leftRightSplit" min="280px">
      <div slot="left" class="demo-split-pane">角色列表页面</div>

      <div slot="left" class="demo-split-pane">
        <!-- 左：角色树列表组件 -->
        <RoleTreePageComponent
          ref="RoleTreePageComponentRef"
          v-on:clickRoleTreeNode2ParentEvent="clickRoleTreeNode2ParentEvent"
        ></RoleTreePageComponent>
      </div>

      <div slot="right" class="demo-split-pane">
        <!-- 右上：角色详情组件 -->
        <div>
          <RoleDetailPageComponent ref="RoleDetailPageComponentRef"></RoleDetailPageComponent>
        </div>

        <br />

        <!-- 右下: 子角色列表  -->
        <div>
          <!-- <RoleChildrenPageComponent ref="RoleChildrenPageComponentRef"></RoleChildrenPageComponent> -->
        </div>
      </div>
    </Split>
  </div>
</template>
  

<script>
import { setToken, getToken, removeArrayElement } from "@/libs/util.js";
import RoleTreePageComponent from "_p/userManager/role/roleTreePage.vue";
import RoleDetailPageComponent from "_p/userManager/role/roleDetailPage.vue";

export default {
  components: { RoleTreePageComponent, RoleDetailPageComponent },
  data() {
    return {
      leftRightSplit: 0.2
    };
  },

  methods: {
    /**
     * 点击角色树节点事件
     */
    clickRoleTreeNode2ParentEvent(node) {
      // 查询右上侧角色详情
      this.$options.methods.selectRoleDetail.bind(this)(node);

      // 查看右下侧子角色列表
      // this.$options.methods.selectRoleChildrenList.bind(this)(node);
    },

    /**
     * 查看角色详情
     */
    selectRoleDetail(node) {
      this.$refs.RoleDetailPageComponentRef.selectRoleDetail(node);
    },

    /**
     * 查看子角色列表
     */
    selectRoleChildrenList(node) {
      // this.$refs.RoleChildrenPageComponentRef.selectRoleChildrenList(node);
    }
  },

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
