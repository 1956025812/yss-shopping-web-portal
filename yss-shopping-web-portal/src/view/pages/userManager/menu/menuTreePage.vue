<template>
  <Tree :data="menuTreeData"></Tree>
</template>
<script>
import { getToken } from "@/libs/util.js";
import { selectSysMenuListAPI } from "@/api/userManager/menu.js";

export default {
  name: "MenuTreePageComponent",
  data() {
    return {
      menuTreeData: []
    };
  },

  methods: {
    /**
     * 初始化系统树数据
     */
    initMenuTreeData() {
      this.menuTreeData = [];

      let params = new Object();
      params.type = 1;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          let sysMenuOutVOList = res.data.data;
          if (null != sysMenuOutVOList && sysMenuOutVOList.length > 0) {
            sysMenuOutVOList.forEach(eachSysMenuOutVO => {
              let menuTreeNode = new Object();
              menuTreeNode.loading = false;
              menuTreeNode.expand = false;
              menuTreeNode.mid = eachSysMenuOutVO.mid;
              menuTreeNode.level = eachSysMenuOutVO.level;
              menuTreeNode.menuCode = eachSysMenuOutVO.menuCode;
              menuTreeNode.title = eachSysMenuOutVO.menuName;
              menuTreeNode.parentId = eachSysMenuOutVO.parentId;

              // TODO 怎么按层级结构拼接
              this.menuTreeData.push(menuTreeNode);
            });
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 初始化左侧系统树数据
    this.$options.methods.initMenuTreeData.bind(this)();
  }
};
</script>