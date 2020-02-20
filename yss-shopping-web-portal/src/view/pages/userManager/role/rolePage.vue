<template>
  <div class="demo-split">
    <Split v-model="leftRightSplit" min="280px">
      <div slot="left" class="demo-split-pane">角色列表页面</div>

      <div slot="left" class="demo-split-pane">
        <!-- 左：角色树列表组件 -->
        <RoleTreePageComponent ref="RoleTreePageComponentRef"></RoleTreePageComponent>
      </div>
    </Split>
  </div>
</template>
  

<script>
import { setToken, getToken, removeArrayElement } from "@/libs/util.js";
import RoleTreePageComponent from "_p/userManager/role/roleTreePage.vue";

export default {
  components: { RoleTreePageComponent },
  data() {
    return {
      leftRightSplit: 0.2
    };
  },

  methods: {},

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
