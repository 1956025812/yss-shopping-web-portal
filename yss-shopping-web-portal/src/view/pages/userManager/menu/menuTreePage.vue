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
            // 递归方式拼接树状结构数据
            let makeupMenuTreeData = function(dataList, parentId) {
              let treeDataArray = [];
              dataList.forEach(eachData => {
                if (eachData.parentId == parentId) {
                  let newNode = {
                    loading: false,
                    expand: false,
                    mid: eachData.mid,
                    level: eachData.level,
                    menuCode: eachData.menuCode,
                    title: eachData.menuName,
                    parentId: eachData.parentId,
                    children: makeupMenuTreeData(dataList, eachData.mid)
                  };
                  treeDataArray.push(newNode);
                }
              });
              return treeDataArray;
            };
            this.menuTreeData = makeupMenuTreeData(sysMenuOutVOList, 0);
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