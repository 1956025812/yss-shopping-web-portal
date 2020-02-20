<template>
  <div>
    <Card>
      <p slot="title">角色列表</p>
      <Button slot="extra" type="primary">新增角色</Button>
      <div>
        <Tree ref="RoleTreePageRef" :data="roleTreeData" @on-select-change="clickRoleTreeNode"></Tree>
      </div>
    </Card>
  </div>
</template>
<script>
import { getToken } from "@/libs/util.js";
import { selectSysRoleListAPI } from "@/api/userManager/role.js";

export default {
  name: "RoleTreePageComponent",
  components: {},
  data() {
    return {
      roleTreeData: []
    };
  },

  methods: {
    /**
     * 初始化角色数据
     */
    initRoleTreeData() {
      this.roleTreeData = [];

      let params = new Object();
      selectSysRoleListAPI(params).then(res => {
        if (res.data.code == 1) {
          let sysRoleOutVOList = res.data.data;
          if (null != sysRoleOutVOList && sysRoleOutVOList.length > 0) {
            // 递归方式拼接树状结构数据
            this.roleTreeData = this.$options.methods.makeupTreeData(
              sysRoleOutVOList,
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
            rid: eachData.rid,
            level: eachData.level,
            title: eachData.roleName,
            parentId: eachData.parentId,
            children: this.makeupTreeData(dataList, eachData.rid)
          };
          treeDataArray.push(newNode);
        }
      });
      return treeDataArray;
    },

    /**
     * 点击角色树节点事件
     */
    clickRoleTreeNode(nodes, node) {
      // 通过自定义的方法传递选中的节点数据到父组件中
      this.$emit("clickRoleTreeNode2ParentEvent", node);
    }
  },

  created() {
    // 初始化左侧角色树数据
    this.$options.methods.initRoleTreeData.bind(this)();

    // 监听全局事件flushRoleTreeComponentEvent  刷新左侧角色树全局事件
    let _this = this;
    this.bus.$on("flushRoleTreeComponentEvent", function(data) {
      _this.$options.methods.initRoleTreeData.bind(_this)();
    });
  }
};
</script>