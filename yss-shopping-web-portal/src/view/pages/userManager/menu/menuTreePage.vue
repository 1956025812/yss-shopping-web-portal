<template>
  <div>
    <Card>
      <p slot="title">页面列表</p>
      <Button slot="extra" type="primary" @click="openMenuPageSavePageModal">新增页面</Button>
      <div>
        <Tree ref="MenuTreePageRef" :data="menuTreeData" @on-select-change="clickMenuTreeNode"></Tree>
      </div>
    </Card>

    <!-- 新增菜单页面弹窗组件 -->
    <MenuPageSavePageComponent ref="MenuPageSavePageComponentRef" style="display: none"></MenuPageSavePageComponent>
  </div>
</template>
<script>
import { getToken } from "@/libs/util.js";
import { selectSysMenuListAPI } from "@/api/userManager/menu.js";
import MenuPageSavePageComponent from "_p/userManager/menu/menuPageSavePage.vue";

export default {
  name: "MenuTreePageComponent",
  components: {
    MenuPageSavePageComponent
  },
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
            this.menuTreeData = this.$options.methods.makeupTreeData(
              sysMenuOutVOList,
              0
            );
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 递归方式拼接树状结构数据
     */
    makeupTreeData(dataList, parentId) {
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
            children: this.makeupTreeData(dataList, eachData.mid)
          };
          treeDataArray.push(newNode);
        }
      });
      return treeDataArray;
    },

    /**
     * 点击菜单树节点事件
     */
    clickMenuTreeNode(nodes, node) {
      // 通过自定义的方法传递选中的节点数据到父组件中
      this.$emit("clickMenuTreeNode2ParentEvent", node);
    },

    /**
     * 打开新增菜单页面弹窗组件
     */
    openMenuPageSavePageModal() {
      this.$refs.MenuPageSavePageComponentRef.openMenuPageSavePageModal();
    }
  },

  created() {
    // 初始化左侧系统树数据
    this.$options.methods.initMenuTreeData.bind(this)();

    // 监听全局事件flushMenuTreeComponentEvent  刷新左侧菜单树全局事件
    let _this = this;
    this.bus.$on("flushMenuTreeComponentEvent", function(data) {
      _this.$options.methods.initMenuTreeData.bind(_this)();
    });
  }
};
</script>