<template>
  <div>页面菜单树列表</div>
</template>
<script>
import { getToken } from "@/libs/util.js";

export default {
  name: "MenuTreePageComponent",
  data() {
    return {};
  },

  methods: {
    /**
     * 初始化系统树数据
     */
    initMenuTreeData() {}
  },

  created() {
    // 初始化左侧系统树数据
    this.$options.methods.initMenuTreeData.bind(this)();
  }
};
</script>